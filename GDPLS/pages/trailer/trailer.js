Page({
  data: {
    video: ""
  },
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: options.name + " 预告片",
      success: function (res) {
        that.setData({
          video: options.video
        })
      }
    })
  }
})