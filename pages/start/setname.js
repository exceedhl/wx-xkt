const http = require('../../js/http.js');
const BasePage = require('../../js/base_page.js');

var app = getApp();
BasePage({
  data: {
  },

  onLoad: function() {
    const that = this;
    wx.getStorage({
      key: 'authToken',
      success: function(res) {
        if (!res.data) {
          that.login();
        } else {
          wx.switchTab({url: '../rollcall/index'});
        }
      },
      fail: function(res) {
        that.login();
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
            that.setData({userInfo: res.userInfo});
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
                  if (callback) callback();
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

  changeName: function(e) {
    http.put('/changename', e.detail.value, function(res) {
      wx.switchTab({url: '../rollcall/index'});
    });
  }
});
