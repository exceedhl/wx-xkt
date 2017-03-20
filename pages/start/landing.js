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
        if (res.data) {
          wx.switchTab({url: '../rollcall/index'});
        }
      }
    });
  }
});
