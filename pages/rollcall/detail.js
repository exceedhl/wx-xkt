const http = require('../../js/http.js');

var app = getApp();
Page({
  data: {
    call: {
      peopleAttend: 22, peopleAll: 40
    }
  },

  onLoad: function (params) {
    const that = this;
    http.get('/rollcalls/' + params.id, function(res) {
      that.setData({'people': res.data});
    });

    http.get('/rollcalls/' + params.id + '/summary', function(res) {
      that.setData({'call': res.data});
    });
  }
})
