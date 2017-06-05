// location.js
var app = getApp();
var request = require('../../utils/util').request;

Page({
  data: {
    location: null,
    area: []
  },
  selectLoc: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    console.log(index);
    app.setLocation(this.data.area[index]);
    wx.navigateBack({
      delta: 1
    })
  },
  onLoad: function (options) {
    app.getLocation(() => this.setData({ location: app.globalData.location }));
    var that = this;
    request({
      url: 'api/area',
      success: function (res) {
        that.setData({
          area: res
        });
      }
    });
  }
})