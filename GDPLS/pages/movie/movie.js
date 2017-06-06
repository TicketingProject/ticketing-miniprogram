var request = require('../../utils/util').request;

Page({
  data: {
    logs: [],
    detail: [],
    photos: [],
    comments: [],
    imageList: [],
    hideIntro: true
  },
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.imageList // 需要预览的图片http链接列表  
    })
  },
  turnToTrailer: function (e) {
    wx.navigateTo({
      url: '../trailer/trailer?name=' + this.data.detail.nm + '&video=' + this.data.detail.vd
    })
  },
  dealWithIntroduct: function() {
    var temp = !this.data.hideIntro;
    this.setData({
      hideIntro: temp
    });
  },
  onLoad: function (options) {
    var that = this;
    request({
      url: 'api/movie/' + options.id,
      success: function (res) {
        var temp = res.photos;
        temp = temp.map(item=>{
          item.src = item.src.replace(/w.h/, "800.450");
          return item;
        });
        var temp2 = temp.map(item=>item.src);
        that.setData({
          detail: res.detail,
          photos: temp,
          imageList: temp2,
          comments: res.comments
        });
      }
    });
  }
})
