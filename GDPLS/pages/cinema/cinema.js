//cinema.js
var app = getApp();
var request = require('../../utils/util').request;

Page({
  data: {
    cinema: [],
    location: null,
    lat: null,
    lng: null,
    distance: []
  },
  selectLocation: function () {
    wx.navigateTo({
      url: '../location/location'
    })
  },
  selectSession: function(e) {
    var index = parseInt(e.currentTarget.dataset.index);
    wx.navigateTo({
      url: '../session/session?id=' + this.data.cinema[index].id
    })
  },
  onShow: function () {
    app.getLocation(() => this.setData({
      location: app.globalData.area,
      lat: app.globalData.latitude,
      lng: app.globalData.longtitude
    }));
    var that = this;
    app.getLocation(() => this.setData({
      location: app.globalData.area,
      lat: app.globalData.latitude,
      lng: app.globalData.longtitude
    }));
    request({
      url: 'api/cinema/' + this.data.location.id + "/" + this.data.lat + "/" + this.data.lng,
      success: function (res) {
        // 求距离
        var temp = res.map(item => {
          // 转化为弧度制
          var radLat1 = item.lat * Math.PI / 180.0;
          var radLat2 = that.data.lat * Math.PI / 180.0;
          var radLon1 = item.lng * Math.PI / 180.0;
          var radLon2 = that.data.lng * Math.PI / 180.0;
          // 地球半径：单位m
          var R = 6370996.81;
          var dis = Math.ceil(R * Math.acos(Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radLon1 - radLon2) + Math.sin(radLat1) * Math.sin(radLat2)));
          if (dis>1000) dis = Math.floor(dis/100) * 100;
          else if (dis>10000) dis = Math.floor(dis/10000) * 100000;
          return dis;
        });
        that.setData({
          cinema: res,
          distance: temp
        });
      }
    });
  }
})
