const http = require('../../js/http.js');
const BasePage = require('../../js/base_page.js');

var app = getApp();

const seconds = 20;
let timer = null;

BasePage({
  data: {
    disableStartTimerButton: false,
    disableRefreshButton: false,
    seconds: seconds,
    studentsCalled: 0
  },

  onLoad: function(params) {
    this.setData({id: params.id});
    this.refreshCode();
    http.put('/rollcalls/' + params.id, {status: 'ongoing'});

    http.connectWebSocket('/call-ws');

    wx.onSocketOpen(function(res) {
      wx.sendSocketMessage({data: JSON.stringify({message: 'Auth', payload: {'authorization': 'Bearer ' + wx.getStorageSync('authToken')}})});
      wx.sendSocketMessage({data: JSON.stringify({message: 'JoinCall', payload: {rollcallId: params.id}})});
    });

    const that = this;
    wx.onSocketMessage(function(res) {
      let data = JSON.parse(res.data);
      switch (data.message) {
        case 'TimeOut':
          if (data.payload.rollcallId == that.data.id) {
            clearInterval(timer);
            that.setData({disableStartTimerButton: false, disableRefreshButton: false, seconds: seconds});
          }
          break;
        case 'Attends':
          if (data.payload.rollcallId == that.data.id) {
            that.setData({studentsCalled: data.payload.no});
          }
        default:
      }
    });
  },

  startTimer: function() {
    const that = this;
    wx.sendSocketMessage({data: JSON.stringify({message: 'StartTimer', payload: {rollcallId: this.data.id, code: this.data.code, seconds: seconds}})});
    this.setData({disableStartTimerButton: true, disableRefreshButton: true});
    timer = setInterval(function() {
      if (that.data.seconds > 0) {
        that.setData({seconds: that.data.seconds - 1});
      }
    }, 1000);
  },

  endCall: function() {
    clearInterval(timer);
    wx.sendSocketMessage({data: JSON.stringify({message: 'EndCall', payload: {rollcallId: this.data.id}})});
    http.put('/rollcalls/' + this.data.id, {status: 'done'}, function(res) {
      wx.switchTab({url: 'index'});
    });
  },

  setCode: function(code) {
    this.setData({code: code});
    let codes = [];
    for (let n of code.toString()) {
      codes.push(n);
    }
    this.setData({codes: codes});
  },

  refreshCode: function() {
    this.setCode(Math.floor(1000 + Math.random() * 9000));
  },

  showDetail: function() {
    wx.navigateTo({url: 'detail?id=' + this.data.id});
  }
})
