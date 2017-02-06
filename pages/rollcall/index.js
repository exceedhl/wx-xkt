const http = require('../../js/request.js');

//index.js
//获取应用实例
var app = getApp();
Page({
  data: {
  },

  fetchRollCalls: function() {
    const that = this;
    http.get('/rollcalls', function(res) {
      that.setData({'rollcalls': res.data});
    });
  },

  onShow: function () {
    console.log('on show')
    this.fetchRollCalls();
  },

  onReady: function() {
    console.log('on ready')
  },

  onPullDownRefresh: function() {
    // this not work because I used scroll view here.
    console.log('on pull down')
    this.fetchRollCalls();
  }
});
