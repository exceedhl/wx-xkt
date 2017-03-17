const http = require('../../js/http.js');
const BasePage = require('../../js/base_page.js');

var app = getApp();
BasePage({
  data: {
  },

  onLoad: function () {
  },

  createClass: function(e) {
    http.post("/classes", e.detail.value);
    wx.navigateBack();
  }
});
