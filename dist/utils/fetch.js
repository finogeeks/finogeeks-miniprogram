"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.downloadFile = exports.uploadFile = exports.matrix2Taro = exports.axios2Taro = exports.fetch = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _index = require("../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../npm/url-parse/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../npm/qs/lib/index.js");

var _index6 = _interopRequireDefault(_index5);

var _ext = require("./ext.js");

var _ext2 = _interopRequireDefault(_ext);

var _base = require("../npm/js-base64/base64.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// const { platform } = Taro.getSystemInfoSync();
// console.log('platform', platform);
var localBase64Meta = null;

var fetch = function fetch(_ref) {
  var _console;

  var _ref$url = _ref.url,
      url = _ref$url === undefined ? '' : _ref$url,
      opts = _objectWithoutProperties(_ref, ["url"]);

  (_console = console).log.apply(_console, _toConsumableArray(opts));
  return new Promise(function (resolve, reject) {
    _index2.default.request(_extends({
      success: function success(res) {
        if (res.statusCode === 200) {
          resolve(res);
        } else {
          reject(res);
        }
      },
      fail: function fail(err) {
        reject(err);
      },

      url: url.startsWith('http') ? url : "" + _ext2.default.BASE_URL + url
    }, opts));
  });
};

exports.fetch = fetch;
var axios2Taro = exports.axios2Taro = function axios2Taro() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var basic = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var userId = basic.userId;

  var channelId = _index2.default.getStorageSync('__channelId__') || '';
  console.log('DEBUG: axios2Taro => channelId', channelId);
  if (!localBase64Meta && userId) {
    var domain = userId.substring(userId.indexOf(':') + 1);
    // console.log(domain);
    var userMeta = {
      appType: 'RETAIL',
      terminal: 'wxapplet',
      plaform: 'ios',
      domain: domain
    };
    localBase64Meta = _base.Base64.encode(JSON.stringify(userMeta));
  }
  var header = _extends({}, opts.headers, {
    'X-Consumer-Custom-ID': basic.userId,
    'X-Consumer-User-Meta': localBase64Meta,
    'X-Consumer-User-Channel': channelId
  });
  var url = opts.uri || opts.url;
  var urlEntity = new _index4.default(url, true);
  var params = opts.params || {};
  var postfix = _index6.default.stringify(_extends({
    access_token: basic.accessToken,
    jwt: basic.jwt
  }, params));
  var keys = urlEntity.query && Object.keys(urlEntity.query) || [];
  postfix = "" + (keys.length > 0 ? '&' : '?') + postfix;
  var newOptions = {
    url: "" + opts.url + postfix,
    method: opts.method && opts.method.toUpperCase() || 'GET',
    header: header,
    dataType: opts.responseType || 'json',
    responseType: 'text',
    data: opts.data
  };
  return fetch(newOptions);
};

var matrix2Taro = exports.matrix2Taro = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
    var basic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var header, postfix, url, urlEntity, keys, newOptions, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            header = _extends({}, opts.headers, {
              'X-Consumer-Custom-ID': basic.userId
            });
            postfix = _index6.default.stringify(opts.qs || {}, opts.qsStringifyOptions);
            url = opts.uri || opts.url;
            urlEntity = new _index4.default(url, true);
            keys = urlEntity.query && Object.keys(urlEntity.query) || [];

            postfix = "" + (keys.length > 0 ? '&' : '?') + postfix;
            newOptions = {
              url: "" + url + postfix,
              method: opts.method && opts.method.toUpperCase() || 'GET',
              header: header,
              dataType: opts.json ? 'json' : 'text',
              responseType: 'text',
              data: opts.body
            };
            _context.prev = 7;
            _context.next = 10;
            return fetch(newOptions);

          case 10:
            response = _context.sent;

            callback(null, response, response.data);
            return _context.abrupt("return", response);

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](7);

            callback(_context.t0, _context.t0, null);
            return _context.abrupt("return", _context.t0);

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[7, 15]]);
  }));

  return function matrix2Taro() {
    return _ref2.apply(this, arguments);
  };
}();

var uploadFile = function uploadFile(_ref3) {
  var basic = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var _ref3$uploadUrl = _ref3.uploadUrl,
      uploadUrl = _ref3$uploadUrl === undefined ? '' : _ref3$uploadUrl,
      _ref3$path = _ref3.path,
      path = _ref3$path === undefined ? '' : _ref3$path,
      meta = _ref3.meta,
      callback = _ref3.callback,
      opts = _objectWithoutProperties(_ref3, ["uploadUrl", "path", "meta", "callback"]);

  var header = _extends({}, opts.headers, {
    'X-Consumer-Custom-ID': basic.userId
  });
  return new Promise(function (resolve) {
    var task = _index2.default.uploadFile({
      url: uploadUrl,
      filePath: path,
      name: path,
      header: header,
      success: function success(res) {
        try {
          var data = JSON.parse(res.data);
          var url = data.netdiskID;
          resolve({ url: url, meta: meta });
        } catch (error) {
          resolve({ url: '', meta: meta, error: error });
        }
      },
      fail: function fail(error) {
        resolve({ url: '', meta: meta, error: error });
      }
    });
    callback && callback({
      cancel: task.abort
    });
    task.onProgressUpdate = function (_ref4) {
      var progress = _ref4.progress,
          totalBytesSent = _ref4.totalBytesSent,
          totalBytesExpectedToSend = _ref4.totalBytesExpectedToSend;

      callback && callback({
        loaded: totalBytesSent,
        total: totalBytesExpectedToSend,
        percentage: progress,
        meta: meta
      });
    };
  });
};

exports.uploadFile = uploadFile;
var downloadFile = function downloadFile(_ref5) {
  var _ref5$url = _ref5.url,
      url = _ref5$url === undefined ? '' : _ref5$url,
      opts = _objectWithoutProperties(_ref5, ["url"]);

  return _index2.default.downloadFile(_extends({
    url: url.startsWith('http') ? url : "" + _ext2.default.BASE_URL + url
  }, opts));
};

exports.downloadFile = downloadFile;
exports.default = {
  axios2Taro: axios2Taro,
  matrix2Taro: matrix2Taro,
  fetch: fetch,
  uploadFile: uploadFile,
  downloadFile: downloadFile
};