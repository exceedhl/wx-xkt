//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
  },

  onLoad: function () {
  },

  onShareAppMessage: function () {
    return {
      title: '点名邀请',
      desc: '我发起了一个点名，各位同学请加入进来参与点名',
      path: '/page/user?id=123'
    }
  }
})
