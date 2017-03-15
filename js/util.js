function showToast(message) {
  wx.showToast({
    title: message,
    icon: 'success',
    duration: 1000
  });
}

module.exports.showToast = showToast;
