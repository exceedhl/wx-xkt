const http = require('../../js/http.js');

var app = getApp();
Page({
  data: {
  },

  onShow: function() {
    const that = this;
    http.get('/profile', function(res) {
      that.setData({userInfo: res.data});
    });
  }
})
