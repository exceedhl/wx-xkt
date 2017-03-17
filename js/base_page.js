module.exports = function(obj) {
  Page(Object.assign({
    onPullDownRefresh: function() {
      wx.stopPullDownRefresh();
    }
  }, obj));
}
