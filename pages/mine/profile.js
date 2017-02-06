const http = require('../../js/request.js');

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
