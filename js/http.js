// const url = 'http://localhost:3031';
// const wsurl = 'ws://localhost:3031';
const url = 'https://xkt.tronclass.tech';
const wsurl = 'wss://xkt.tronclass.tech';

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

function connectWebSocket(path) {
  wx.connectSocket({
    url: wsurl + path
  });
}

function checkSuccessResponse(res) {
  return new RegExp('^2[0-9]{2}$', 'g').test(res.statusCode.toString())
}

module.exports.rootURL = url;
module.exports.checkSuccessResponse = checkSuccessResponse;
module.exports.get = get;
module.exports.post = post;
module.exports.put = put;
module.exports.delete = http_delete;
module.exports.connectWebSocket = connectWebSocket;
