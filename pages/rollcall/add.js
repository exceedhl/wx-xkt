const http = require('../../js/http.js');

var app = getApp()
Page({
  data: {
  },

  radioChange: function (e) {
      var radioItems = this.data.classes;
      for (var i = 0, len = radioItems.length; i < len; ++i) {
          radioItems[i].checked = radioItems[i].value == e.detail.value;
      }

      this.setData({
          classes: radioItems
      });
  },

  createRollCall: function(e) {
    http.post("/rollcalls", e.detail.value);
    wx.navigateBack();
  },

  onShow: function () {
    const that = this;
    http.get('/classes', function(res) {
      let classes = [];
      res.data.forEach(c => {
        classes.push({name: c.name, value: c.id, checked: false});
      });

      if (classes.length > 0) {
        classes[0].checked = true;
      }

      that.setData({classes: classes});
    });
  }
})
