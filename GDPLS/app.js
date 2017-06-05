
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var that = this;
    
  },

  getLocation: function(cb) {
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        wx.request({
          url: 'https://movie.kaocat.com/api/area/' + res.latitude + "/" + res.longitude,
          method: 'GET',
          success: function (res) {
            console.log(res.data.data);
            that.globalData.address = res.data.data;
            typeof cb == "function" && cb();
          },
        })
      }
    })
  },

  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },

  setLocation: function(location) {
    var that = this;
    that.globalData.address = location;
  },

  globalData:{
    userInfo: null,
    address: null
  }
})