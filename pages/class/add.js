const http = require('../../js/request.js');

var app = getApp();
Page({
  data: {
  },

  onLoad: function () {
  },

  createClass: function(e) {
    http.post("/classes", e.detail.value);
    wx.navigateBack();
  }
});
