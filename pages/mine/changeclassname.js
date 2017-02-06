const http = require('../../js/request.js');

var app = getApp()
Page({
  data: {
  },
  onLoad: function (option) {
    this.setData({id: option.id});
  },
  changeName: function(e) {
    http.put('/classes/' + this.data.id, e.detail.value, function(res) {
      wx.navigateBack();
    });
  }
})
