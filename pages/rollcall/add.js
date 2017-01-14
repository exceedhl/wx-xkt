//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    radioItems: [
        {name: '物流管理基础一班', value: '0'},
        {name: '物流管理基础二班', value: '1', checked: true}
    ]
  },
  radioChange: function (e) {
      console.log('radio发生change事件，携带value值为：', e.detail.value);

      var radioItems = this.data.radioItems;
      for (var i = 0, len = radioItems.length; i < len; ++i) {
          radioItems[i].checked = radioItems[i].value == e.detail.value;
      }

      this.setData({
          radioItems: radioItems
      });
  },
  onLoad: function () {
  }
})
