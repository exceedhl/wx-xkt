//app.js
App({
  onLaunch: function () {
    wx.getStorage({
      key: 'authToken',
      success: function(res) {
        if (!res.data) {
          this.loginAndGetUserInfo();
        }
      }
    });
  },

  login: function(iv, encryptedData) {
    const that = this;
    wx.login({
      success: function (res) {
        const code = res.code;
        wx.request({
          url: 'https://localhost:8443/wx-login',
          method: 'POST',
          header: {
            'content-type': 'application/json',
            'x-wx-app-id': 'wx-app'
          },
          data: {iv: iv, encryptedData: encryptedData, code: code},
          success: function(res) {
            wx.setStorage({key: 'authToken', data: res.data});
          }
        });
      }
    })
  },

  loginAndGetUserInfo: function() {
    const that = this;
    wx.getUserInfo({
      success: function (res) {
        that.login(res.iv, res.encryptedData);
      }
    })
  },

  globalData: {
  }
})
