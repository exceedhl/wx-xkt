const url = 'https://localhost:8443';

const header = {
  'content-type': 'application/json',
  'x-wx-app-id': 'wx-app',
  'Authorization': 'Bearer ' + wx.getStorageSync('authToken')
};

function get(path, success) {
  wx.request({
    url: url + path,
    method: 'GET',
    header: header,
    success: success
  });
}

function post(path, data, success) {
  wx.request({
    url: url + path,
    method: 'POST',
    header: header,
    data: data,
    success: success
  });
}

function put(path, data, success) {
  wx.request({
    url: url + path,
    method: 'PUT',
    header: header,
    data: data,
    success: success
  });
}

function http_delete(path) {
  wx.request({
    url: url + path,
    method: 'DELETE',
    header: header,
  });
}

module.exports.get = get;
module.exports.post = post;
module.exports.put = put;
module.exports.delete = http_delete;
