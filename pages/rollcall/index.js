const http = require('../../js/http.js');
const BasePage = require('../../js/base_page.js');

var app = getApp();
BasePage({
  data: {
    statuses: {'todo': '未开始', 'ongoing': '进行中', 'done': '已结束'}
  },

  fetchRollCalls: function(success) {
    const that = this;
    http.get('/rollcalls', function(res) {
      that.setData({'rollcalls': res.data});
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
