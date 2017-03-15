const http = require('../../js/http.js');
const util = require('../../js/util.js');

var app = getApp();

let timer = null;

Page({
  data: {
    seconds: null,
    timerStarted: false
  },

  onLoad: function(params) {
    this.setData({id: params.id});
    http.connectWebSocket('/call-ws');

    wx.onSocketOpen(function(res) {
      wx.sendSocketMessage({data: JSON.stringify({message: 'Auth', payload: {'authorization': 'Bearer ' + wx.getStorageSync('authToken')}})});
      wx.sendSocketMessage({data: JSON.stringify({message: 'JoinCall', payload: {rollcallId: params.id}})});
    });

    const that = this;
    wx.onSocketMessage(function(res) {
      let data = JSON.parse(res.data);
      switch (data.message) {
        case 'TimerStarted':
          if (data.payload.rollcallId == that.data.id) {
            that.setData({timerStarted: true, seconds: data.payload.seconds});
            util.showToast('计时开始');
            timer = setInterval(function() {
              if (that.data.seconds > 0) {
                that.setData({seconds: that.data.seconds - 1});
              }
            }, 1000);
          }
          break;
        case 'CodeCompare':
          clearInterval(timer);
          util.showToast('点名成功');
          wx.navigateBack();
          break;
        case 'TimeOut':
          if (data.payload.rollcallId == that.data.id) {
            util.showToast('点名超时');
            clearInterval(timer);
          }
          break;
        case 'EndCall':
          if (data.payload.rollcallId == that.data.id) {
            util.showToast('老师已经结束点名');
            clearInterval(timer);
            wx.navigateBack();
          }
          break;
        default:
      }
    });
  },

  sendCode: function(e) {
    wx.sendSocketMessage({data: JSON.stringify({message: 'InputCode', payload: {rollcallId: this.data.id, code: e.detail.value.code}})});
  },
})
