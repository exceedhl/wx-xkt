const http = require('../../js/http.js');

var app = getApp();
Page({
  data: {
  },

  onLoad: function (params) {
    const that = this;
    this.setData({'id': params.id});
    http.get('/rollcalls/' + params.id + '/barcode', function(res) {
      that.setData({barcodeUrl: 'data:image/jpeg;base64,' + res.data});
    });
  },

  deleteCall: function() {
    http.delete('/rollcalls/' + this.data.id);
    wx.navigateBack();
  },

  onShareAppMessage: function () {
    return {
      title: '点名邀请',
      desc: '我发起了一个点名，各位同学请加入进来参与点名',
      path: '/pages/rollcall/ongoing?id=' + this.data.id
    }
  }
});
