const http = require('../../js/http.js');
const util = require('../../js/util.js');
const BasePage = require('../../js/base_page.js');

let app = getApp();
let timer = null;
BasePage({
  data: {
  },

  checkCallStatus: function(id, callback) {
    http.get('/rollcalls/' + id, function(res) {
      if (callback) callback(res.data);
      if (res.data.status == 'ongoing') {
        util.showToast('点名已经开始');
        util.delayExec(() => {
          wx.redirectTo({url: 'student_call?id=' + id});
        });
      }

      if (res.data.status == 'done') {
        wx.switchTab({url: 'index'});
      }
    });
  },

  onLoad: function (params) {
    const that = this;
    this.setData({'id': params.id});
    this.checkCallStatus(params.id, (data) => {
      this.setData({callName: data.name, className: data.Class.name});
    });
    http.get('/rollcalls/' + params.id + '/barcode', function(res) {
      that.setData({barcodeUrl: 'data:image/jpeg;base64,' + res.data});
    });
    http.post('/rollcalls/' + params.id + '/join');
    timer = setInterval(() => {that.checkCallStatus(params.id)}, 5000);
  },

  onUnload: function() {
    clearInterval(timer);
  },

  onShareAppMessage: function () {
    return {
      title: '点名邀请',
      desc: '我发起了一个点名，各位同学请加入进来参与点名',
      path: '/pages/rollcall/student_ongoing?id=' + this.data.id
    }
  }
});
