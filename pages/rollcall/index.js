const moment = require('../../js/we-moment-with-locales');
const http = require('../../js/http');
const BasePage = require('../../js/base_page');

moment.locale('zh-CN');
const dateKeyFormat = 'YYYY年MMMDo';

function groupCallsByDay(calls) {
  let callsByDays = {};
  calls.forEach(call => {
    let key = call.dateKey;
    if (!callsByDays[key]) {
      callsByDays[key] = [];
    }
    callsByDays[key].push(call);
  });
  return callsByDays;
}

function groupDayCallsByYearMonth(callsByDays) {
  let months = {};
  Object.keys(callsByDays).forEach(date => {
    const createdAt = moment(date, dateKeyFormat);
    const yearMonth = createdAt.format('YYYY年MMM');
    const day = createdAt.format('Do');
    const weekDay = createdAt.format('ddd');
    if (!months[yearMonth]) {
      months[yearMonth] = [];
    }
    months[yearMonth].push({'calls': callsByDays[date], 'day': day, 'weekDay': weekDay});
  });
  let callsByYearMonth = [];
  Object.keys(months).forEach(yearMonth => {
    callsByYearMonth.push({'yearMonth': yearMonth, 'days': months[yearMonth]});
  })
  return callsByYearMonth;
}

function compareTimeDesc(a, b) {
  return b.timeStamp - a.timeStamp;
}

var app = getApp();
BasePage({
  data: {
    statuses: {'todo': '未开始', 'ongoing': '进行中', 'done': '已结束'}
  },

  fetchRollCalls: function(success) {
    const that = this;
    http.get('/rollcalls', function(res) {
      let calls = res.data;
      for (let call of calls) {
        let createdAt = moment(call.createdAt);
        call.dateKey = createdAt.format(dateKeyFormat);
        call.timeStamp = createdAt.valueOf();
      }
      calls = calls.sort(compareTimeDesc);
      that.setData({'rollcalls': groupDayCallsByYearMonth(groupCallsByDay(calls))});
      if (success) success();
    });
  },

  onPullDownRefresh: function() {
    this.fetchRollCalls(() => {
      wx.stopPullDownRefresh();
    });
  },

  onShow: function() {
    this.fetchRollCalls();
  }
});
