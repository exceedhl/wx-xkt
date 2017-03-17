const http = require('../../js/http.js');
const BasePage = require('../../js/base_page.js');

var app = getApp()
BasePage({
  data: {
  },
  onLoad: function () {
  },
  changeName: function(e) {
    http.put('/changename', e.detail.value, function(res) {
      wx.navigateBack();
    });
  }
})
