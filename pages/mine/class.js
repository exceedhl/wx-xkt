const http = require('../../js/http.js');

var app = getApp();
Page({
  data: {
  },
  onShow: function () {
    const that = this;
    http.get('/classes', function(res) {
      that.setData({createdClasses: res.data});
    });
    http.get('/joinedClasses', function(res) {
      that.setData({joinedClasses: res.data});
    });
  }
});
