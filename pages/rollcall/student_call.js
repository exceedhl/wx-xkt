const http = require('../../js/http.js');
const util = require('../../js/util.js');
const BasePage = require('../../js/base_page.js');

var app = getApp();

let timer = null;

BasePage({
  data: {
    seconds: null,
    timerStarted: false
  },

  quitCall: function() {
    clearInterval(timer);
    wx.closeSocket();
    util.delayExec(() => {
      wx.switchTab({url: 'index'});
    });
  },

  startInterval: function(page) {
    return setInterval(function() {
      if (page.data.seconds > 0) {
        page.setData({seconds: page.data.seconds - 1});
      }
    }, 1000);
  },

  onLoad: function(params) {
    this.setData({id: params.id});
    http.connectWebSocket('/call-ws');

    wx.onSocketOpen(function(res) {
      wx.sendSocketMessage({data: JSON.stringify({message: 'Auth', payload: {'authorization': 'Bearer ' + wx.getStorageSync('authToken')}})});
      wx.sendSocketMessage({data: JSON.stringify({message: 'JoinCall', payload: {rollcallId: params.id}})});
    });

    const that = this;
    wx.onSocketMessage((res) => {
      let data = JSON.parse(res.data);
      switch (data.message) {
        case 'CurrentState':
          if (data.payload.incall) {
            that.setData({timerStarted: true, seconds: data.payload.seconds});
            timer = that.startInterval(that);
          }
          break;
        case 'TimerStarted':
          if (data.payload.rollcallId == that.data.id) {
            that.setData({timerStarted: true, seconds: data.payload.seconds});
            util.showToast('计时开始');
            clearInterval(timer);
            timer = that.startInterval(that);
          }
          break;
        case 'CodeCompare':
          if (data.payload.result) {
            util.showToast('点名成功');
            that.quitCall();
          } else {
            util.showToast('点名码错误');
          }
          break;
        case 'TimeOut':
          if (data.payload.rollcallId == that.data.id) {
            util.showToast('点名超时');
            that.setData({timerStarted: false});
            clearInterval(timer);
          }
          break;
        case 'EndCall':
          if (data.payload.rollcallId == that.data.id) {
            util.showToast('老师已经结束点名');
            that.quitCall();
          }
          break;
        default:
      }
    });
  },

  onUnload: function() {
    clearInterval(timer);
    wx.closeSocket();
  },

  sendCode: function(e) {
    wx.sendSocketMessage({data: JSON.stringify({message: 'InputCode', payload: {rollcallId: this.data.id, code: e.detail.value.code}})});
  },
})
