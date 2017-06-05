// location.js
var app = getApp();
var request = require('../../utils/util').request;

Page({
  data: {
    location: null
  },
  onLoad: function (options) {
    app.getLocation(() => this.setData({ location: app.globalData.address }));
    console.log(location);
  }
})