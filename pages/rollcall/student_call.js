const http = require('../../js/http.js');

var app = getApp();

const seconds = 20;
let timer = null;

Page({
  data: {
    focus: [true, false, false, false],
    code1: '',
    code2: '',
    code3: '',
    code4: '',
    seconds: seconds
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
        case 'CodeCompare':
          wx.showToast({
            title: '点名成功',
            icon: 'success',
            duration: 1000
          });
          wx.navigateBack();
          break;
        case 'TimeOut':
          if (data.payload.rollcallId == that.data.id) {
            wx.showToast({
              title: '点名超时',
              icon: 'success',
              duration: 1000
            });
          }
          break;
        case 'EndCall':
          if (data.payload.rollcallId == that.data.id) {
            wx.showToast({
              title: '老师已经结束点名',
              icon: 'success',
              duration: 1000
            });
            wx.navigateBack();
          }
          break;
        default:
      }
    });
  },

  inputOne: function(e) {
    this.setData({focus: [true, false, false, false]});
  },

  inputTwo: function(e) {
    this.setData({focus: [false, true, false, false]});
  },

  inputThree: function(e) {
    this.setData({focus: [false, false, true, false]});
  },

  inputFour: function(e) {
    this.setData({focus: [false, false, false, true]});
    let code = this.data.code1 + this.data.code2 + this.data.code3 + this.data.code4;
    wx.sendSocketMessage({data: JSON.stringify({message: 'InputCode', payload: {rollcallId: this.data.id, code: code}})});
  },

  clear: function(e) {
    return '';
  },

})
