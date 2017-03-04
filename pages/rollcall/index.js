const http = require('../../js/http.js');

var app = getApp();
Page({
  data: {
  },

  fetchRollCalls: function(success) {
    const that = this;
    http.get('/rollcalls', function(res) {
      that.setData({'rollcalls': res.data});
      if (success) success();
    });
  },

  onReady: function() {
    console.log('on ready')
  },

  onPullDownRefresh: function() {
    this.fetchRollCalls(() => {
      wx.stopPullDownRefresh();
    });
  },

  onShow: function() {
    const that = this;
    wx.getStorage({
      key: 'authToken',
      success: function(res) {
        if (!res.data) {
          that.login(() => {that.fetchRollCalls();});
        } else {
          that.fetchRollCalls();
        }
      },
      fail: function(res) {
        that.login(() => {that.fetchRollCalls();});
      }
    });
  },

  login: function(callback) {
    const that = this;
    wx.login({
      success: function (res) {
        const code = res.code;
        wx.getUserInfo({
          success: function (res) {
            let iv = res.iv;
            let encryptedData = res.encryptedData;
            wx.request({
              url: http.rootURL + '/wx-login',
              method: 'POST',
              header: {
                'content-type': 'application/json',
                'x-wx-app-id': 'wx-app'
              },
              data: {iv: iv, encryptedData: encryptedData, code: code},
              success: function(res) {
                if (http.checkSuccessResponse(res)) {
                  wx.setStorageSync('authToken', res.data);
                  callback();
                } else {
                  console.log(res)
                }
              }
            });
          },
          fail: function(res) {
            console.log(res);
          }
        })
      }
    })
  },
});
