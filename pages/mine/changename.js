const http = require('../../js/request.js');

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
