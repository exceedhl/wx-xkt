const http = require('../../js/http.js');
const BasePage = require('../../js/base_page.js');

var app = getApp()
BasePage({
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
    http.post("/rollcalls", e.detail.value, function(res) {
      wx.redirectTo({url: 'owner_ongoing?id=' + res.data.id});
    });
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
