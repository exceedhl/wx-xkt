const http = require('../../js/http.js');
const BasePage = require('../../js/base_page.js');

var app = getApp();
BasePage({
  data: {
    call: {
      peopleAttend: 22, peopleAll: 40
    }
  },

  onLoad: function (params) {
    const that = this;
    this.setData({id: params.id});
    http.get('/rollcalls/' + params.id + '/detail', function(res) {
      that.setData({'people': res.data});
    });

    http.get('/rollcalls/' + params.id + '/summary', function(res) {
      that.setData({'call': res.data});
    });
  }

})
