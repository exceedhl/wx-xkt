const http = require('../../js/http.js');
const BasePage = require('../../js/base_page.js');

var app = getApp()
BasePage({
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
