//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    rollcalls: [
      {'yearMonth': '2016年12月', 'days': [
        {'day': '15日', 'weekDay': '周二', 'calls': [
          {'name': '14:00的点名', 'class': '物流管理基础一班', 'status': 'done', 'peopleAttend': 28, 'peopleAll': 40},
          {'name': '16:00的点名', 'class': '物流管理基础三班', 'status': 'ongoing'}
        ]},
        {'day': '14日', 'weekDay': '周一', 'calls': [
          {'name': '14:00的点名', 'class': '物流管理基础一班', 'status': 'done', 'peopleAttend': 40, 'peopleAll': 40}
        ]}
      ]},
      {'yearMonth': '2016年11月', 'days': [
        {'day': '15日', 'weekDay': '周二', 'calls': [
          {'name': '14:00的点名', 'class': '物流管理基础一班', 'status': 'done', 'peopleAttend': 22, 'peopleAll': 40},
          {'name': '16:00的点名', 'class': '物流管理基础二班', 'status': 'todo'}
        ]},
        {'day': '12日', 'weekDay': '周一', 'calls': [
          {'name': '14:00的点名', 'class': '物流管理基础一班', 'status': 'done', 'peopleAttend': 13, 'peopleAll': 40}
        ]}
      ]}
    ]
  },
  onLoad: function () {
    console.log(this);
  }
})
