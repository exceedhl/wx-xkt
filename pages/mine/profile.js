const http = require('../../js/http.js');
const BasePage = require('../../js/base_page.js');

var app = getApp();
BasePage({
  data: {
  },

  onShow: function() {
    const that = this;
    http.get('/profile', function(res) {
      that.setData({userInfo: res.data});
    });
  }
})
