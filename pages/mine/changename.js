const http = require('../../js/http.js');

var app = getApp()
Page({
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
