// pages/uploadinfo/uploadinfo.js
var util = require('../../utils/util.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    customItem: '全部',
    temp: '',
    list: [{
        id: 'baseinfo',
        name: '基本信息',
        open: false,
        pages: ['base_info'],

      },
      {
        id: 'reportinfo',
        name: '填报信息',
        open: false,
        pages: ['report_info'],

      },
      {
        id: 'dailyinfo',
        name: '每日信息',
        open: false,
        pages: ['daily_info'],

      },
    ],
    templatedata: {
      quarantine_tag: 'false',
      personal_status_other_tag: 'false',
      family_status_other_tag: 'false',
      out_work_tag: 'false',
      native_place: ['广东省', '广州市', '海珠区'],
      live_before_return: ['广东省', '深圳市', '南山区'],
      department: ['开发部', '财务部', '采购部', '传感器车间', '电子车间', '计量部', '客服部'],
      departIndex: '0',
      personal_travel: ['留深', '反深', '在老家', '北京办', '上海办', '郑州办', '长沙办'],
      personal_travel_index: '0',
      today_status: ['复工', '在深隔离', '留深居家', '在办事处隔离', '在老家隔离', '反深途中', '反办事处途中','反深隔离完成'],
      today_status_index: '0',
      address: '请点击获取地址',
      return_date: '',
      quarantine_date_start: '',
      quarantine_date_end: '',
      fill_time: '',
      vehicle_items: [{
          name: 'no',
          value: '无'
        },
        {
          name: 'vehicle ',
          value: '铁路'
        },
        {
          name: 'airplane',
          value: '飞机'
        },
        {
          name: 'bus',
          value: '汽车'
        },
        {
          name: 'self-driving',
          value: '自驾车'
        },
        {
          name: 'subway',
          value: '地铁'
        },
      ],
      out_work_vehicle_items: [
        {
          name: 'bus',
          value: '公交'
        },
        {
          name: 'subway',
          value: '地铁'
        },
        {
          name: 'self-driving',
          value: '私家车'
        },
        {
          name: 'vehicle ',
          value: '铁路'
        },
        {
          name: 'cycling',
          value: '骑行'
        },
        {
          name: 'walk',
          value: '步行'
        },
      ],
     
    },
  },



  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    var time = util.formatDate(new Date())
    var time1 = util.formatTime(new Date())
    this.setData({
      ['templatedata.return_date']: time,
      ['templatedata.quarantine_date_start']: time,
      ['templatedata.quarantine_date_end']: time,
      ['templatedata.fill_time']: time1,
    })
  },


  bindRegionChange: function(e) {
    switch (e.currentTarget.id) {
      case "native_place":
        this.setData({
          ['templatedata.native_place']: e.detail.value
        })
        break;
      case "live_before_return":
        this.setData({
          ['templatedata.live_before_return']: e.detail.value
        })
        break;
    }

  },
  radio_changed: function(e) {

    switch (e.currentTarget.id) {
      case "sex":

        break;
      case "pneumonia":

        break;
      case "quarantine":
        if (e.detail.value == 'no') {
          this.setData({
            ['templatedata.quarantine_tag']: 'false'
          })
        } else {
          this.setData({
            ['templatedata.quarantine_tag']: ''
          })
        }
      case "personal_status":
        if (e.detail.value == 'yes') {
          this.setData({
            ['templatedata.personal_status_other_tag']: 'false'
          })
        } else {
          this.setData({
            ['templatedata.personal_status_other_tag']: ''
          })
        }
        break;
      case "out_work":
        if (e.detail.value == 'no') {
          this.setData({
            ['templatedata.out_work_tag']: 'false'
          })
        } else {
          this.setData({
            ['templatedata.out_work_tag']: ''
          })
        }

        break;
      case "family_status":
        if (e.detail.value == 'yes') {
          this.setData({
            ['templatedata.family_status_other_tag']: 'false'
          })
        } else {
          this.setData({
            ['templatedata.family_status_other_tag']: ''
          })
        }

        break;
    }
  },
  bindDateChange: function(e) {

    switch (e.currentTarget.id) {
      case "return_date":
        this.setData({
          ['templatedata.return_date']: e.detail.value
        })
        break;
      case "quarantine_date_start":
        this.setData({
          ['templatedata.quarantine_date_start']: e.detail.value
        })
        break;
      case "quarantine_date_end":
        this.setData({
          ['templatedata.quarantine_date_end']: e.detail.value
        })
        break;
    }

 

  },

  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为' + e.currentTarget.id)
    switch (e.currentTarget.id) {
      case "department":
        this.setData({
          ['templatedata.departIndex']: e.detail.value
        })
        break;
      case "personal_travel":
        this.setData({
          ['templatedata.personal_travel_index']: e.detail.value
        })
        break;
      case "today_status":
        this.setData({
          ['templatedata.today_status_index']: e.detail.value
        })
        break;
    }
  },
  kindToggle: function(e) {
    var id = e.currentTarget.id,
      list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
  },

  onclick: function() {
    this.getLocation()
  },


  getLocation: function() {
    app.getLocation(this.showAddress);
  },
  showAddress: function(address) {

    this.setData({
      ['templatedata.address']: address
    })


  },
 

  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.getLocation()
    this.calendar = this.selectComponent("#calendar");
  },




  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})