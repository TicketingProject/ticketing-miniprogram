//cinema.js
var app = getApp();
var request = require('../../utils/util').request;

Page({
  data: {
    cinema: []
  },
  onLoad: function () {
    var that = this;
    request({
      url: 'api/cinema',
      success: function (res) {
        console.log(res);
        that.setData({ cinema: res });
      }
    });
  }
})
