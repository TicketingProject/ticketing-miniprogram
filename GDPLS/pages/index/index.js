var app = getApp();
var request = require('../../utils/util').request;

Page({
  data: {
    navTab: ["热映", "待映"],
    currentNavtab: true,
    hotMoive: [],
    comingMoive: [],
    location: null
  },
  //事件处理函数
  HotMovieViewTap: function(e) {
    var index = parseInt(e.currentTarget.dataset.index);
    wx.navigateTo({
      url: '../movie/movie?id=' + this.data.hotMoive[index].id
    })
  },
  ComingMovieViewTap: function(e) {
    var index = parseInt(e.currentTarget.dataset.index);
    wx.navigateTo({
      url: '../movie/movie?id=' + this.data.comingMoive[index].id
    })
  },
  turnToTrailer: function(e) {
    // TODO
    // var index = parseInt(e.currentTarget.dataset.index);
    // wx.navigateTo({
    //   url: '../movie/movie?name=' + this.data.comingMoive[index].nm + "&video=" + this.data.comingMoive[index].video;
    // })
  },
  selectLocation: function() {
    wx.navigateTo({
      url: '../location/location'
    })
  },
  onLoad: function () {
    var that = this;
    request({
      url: 'api/movie',
      success: function (res) {
        var temp1 = res.filter(item=>item.preSale == 0);
        var temp2 = res.filter(item=>item.preSale == 1);
        that.setData({
          hotMoive: temp1,
          comingMoive: temp2
        });
      }
    });
  },
  onShow: function() {
    app.getLocation(() => this.setData({ location: app.globalData.area }));
  },
  switchTab1: function(){
    this.setData({
      currentNavtab: true
    });
  },
  switchTab2: function () {
    this.setData({
      currentNavtab: false
    });
  }
})
