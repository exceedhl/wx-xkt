function showToast(message) {
  wx.showToast({
    title: message,
    icon: 'success',
    duration: 1000
  });
}

function delayExec(f) {
  setTimeout(function() {
    f();
  },1000);
}

module.exports.showToast = showToast;
module.exports.delayExec = delayExec;
