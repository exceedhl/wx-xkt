const http = require('js/http.js');

App({
  onLaunch: function () {
    const that = this;
    wx.getStorage({
      key: 'authToken',
      success: function(res) {
        if (!res.data) {
          that.login();
        }
      },
      fail: function(res) {
        that.login();
      }
    });
  },

  login: function(iv, encryptedData) {
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
                  wx.setStorage({key: 'authToken', data: res.data});
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

  globalData: {
  }
})
