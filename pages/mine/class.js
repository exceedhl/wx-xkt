const http = require('../../js/http.js');
const BasePage = require('../../js/base_page.js');

var app = getApp();
BasePage({
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
