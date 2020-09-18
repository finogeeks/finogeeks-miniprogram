"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.refresh = exports.upload = exports.fetch = exports.request = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require("../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _base = require("../npm/js-base64/base64.js");

var _index3 = require("../npm/qs/lib/index.js");

var _index4 = _interopRequireDefault(_index3);

var _ext = require("./ext.js");

var _index5 = require("../npm/url-parse/index.js");

var _index6 = _interopRequireDefault(_index5);

var _util = require("./util.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// const urlEntity = new UrlParse(getExtInfo().BASE_URL, true);
// const domain = urlEntity.hos
var localBase64Meta = _base.Base64.encode(JSON.stringify({
  appType: 'RETAIL',
  terminal: 'wxapplet',
  plaform: 'ios',
  domain: (0, _ext.getExtInfo)().HS_DOMAIN
}));

var HttpClient = function () {
  function HttpClient() {
    var _this = this;

    _classCallCheck(this, HttpClient);

    this.fetch = function (_ref) {
      var _ref$url = _ref.url,
          url = _ref$url === undefined ? '' : _ref$url,
          opts = _objectWithoutProperties(_ref, ["url"]);

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

          url: url.startsWith('http') ? url : "" + _this.baseUrl + url
        }, opts));
      });
    };

    this.request = function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
        var url = _ref2.url,
            data = _ref2.data,
            method = _ref2.method,
            _ref2$needAuth = _ref2.needAuth,
            needAuth = _ref2$needAuth === undefined ? true : _ref2$needAuth,
            _ref2$needToken = _ref2.needToken,
            needToken = _ref2$needToken === undefined ? false : _ref2$needToken;
        var urlEntity, parseUrl, reqData, header, channelId, reqOptions;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                urlEntity = new _index6.default(_this.baseUrl, true);
                parseUrl = url.startsWith('http') ? url : "" + _this.baseUrl + url;
                reqData = null;

                if (method === 'GET') {
                  parseUrl = _this.formateDataToUrlQuery(parseUrl, data);
                } else {
                  reqData = data;
                }
                if (needToken) {
                  if (parseUrl.includes('?')) {
                    parseUrl = parseUrl + "&access_token=" + _this.accessToken;
                  } else {
                    parseUrl = parseUrl + "?access_token=" + _this.accessToken;
                  }
                }
                header = {
                  'content-type': 'application/json',
                  'X-Consumer-Custom-ID': _this.userId || "@retail_visitor:" + _this.hsDomain
                };

                if (!needAuth) {
                  _context.next = 11;
                  break;
                }

                if (_this.auth) {
                  _context.next = 10;
                  break;
                }

                console.error('not Authorization');
                return _context.abrupt("return", { data: null });

              case 10:
                header = _extends({}, header, {
                  'Authorization': _this.auth || ''
                });

              case 11:
                channelId = _index2.default.getStorageSync('__channelId__') || '';

                header = _extends({}, header, {
                  'X-Consumer-User-Meta': _this.localBase64Meta || '',
                  'X-Consumer-User-Channel': channelId || '',
                  // TODO: 根据页面停留生成唯一Operation ID
                  'X-Consumer-Operation-ID': (0, _util.generateUuid)()
                });
                reqOptions = {
                  url: parseUrl,
                  data: reqData,
                  header: header,
                  method: method
                };
                return _context.abrupt("return", _this.fetch(reqOptions));

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this);
      }));

      return function (_x) {
        return _ref3.apply(this, arguments);
      };
    }();

    this.upload = function (payload) {
      return _this.uploadFile(_extends({}, payload, {
        uploadUrl: _this.makeUploadUrl(payload)
      }));
    };

    this.makeUploadUrl = function (payload) {
      var _payload$content = payload.content,
          content = _payload$content === undefined ? {} : _payload$content,
          _payload$params = payload.params,
          params = _payload$params === undefined ? {} : _payload$params;

      var prefix = _this.baseUrl;
      var suffix = _index4.default.stringify(_extends({
        type: content.msgtype,
        content_type: content.info.mimetype,
        content: content,
        jwt: _this.jwt
      }, params));
      console.log('~~~~~~~makeUploadUrl~~~~~~~', suffix, _this.accessToken, _this.jwt);
      if (payload.roomId) {
        return prefix + "/api/v1/netdisk/upload/room/" + payload.roomId + "?" + suffix;
      }
      return prefix + "/api/v1/netdisk/upload/self?" + suffix;
    };

    this.uploadFile = function (_ref4) {
      var _ref4$uploadUrl = _ref4.uploadUrl,
          uploadUrl = _ref4$uploadUrl === undefined ? '' : _ref4$uploadUrl,
          _ref4$path = _ref4.path,
          path = _ref4$path === undefined ? '' : _ref4$path,
          meta = _ref4.meta,
          callback = _ref4.callback;

      var header = {
        'Authorization': _this.auth,
        'X-Consumer-Custom-ID': _this.userId,
        'X-Consumer-User-Meta': _this.localBase64Meta,
        'X-Consumer-User-Channel': _this.channelId
      };
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
        task.progress(function (_ref5) {
          var progress = _ref5.progress,
              totalBytesSent = _ref5.totalBytesSent,
              totalBytesExpectedToSend = _ref5.totalBytesExpectedToSend;

          callback && callback({
            loaded: totalBytesSent,
            total: totalBytesExpectedToSend,
            percentage: progress,
            meta: meta
          });
        });
      });
    };

    this.netdiskThumb = function (netdiskId) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'middle';

      return _this.baseUrl + "/api/v1/netdisk/thumbnail/" + netdiskId + "?jwt=" + _this.jwt + "&type=" + type;
    };

    this.netdiskDownload = function (netdiskId) {
      return _this.baseUrl + "/api/v1/netdisk/download/" + netdiskId + "?jwt=" + _this.jwt;
    };

    this.netdiskVideo = function (netdiskId) {
      return _this.baseUrl + "/api/v1/netdisk/download/" + netdiskId + "/qt?jwt=" + _this.jwt;
    };

    this.formateDataToUrlQuery = function (url, data) {
      if (!data) return url;
      var hasQuery = url.indexOf('?') !== -1;
      var res = hasQuery ? url + "&" : url + "?";
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          var value = data[key];
          res += key + "=" + value + "&";
        }
      }
      return res;
    };

    this.baseUrl = (0, _ext.getExtInfo)().BASE_URL;
    this.localBase64Meta = localBase64Meta;
    this.hsDomain = (0, _ext.getExtInfo)().HS_DOMAIN;
  }

  _createClass(HttpClient, [{
    key: "setAuth",
    value: function setAuth(config) {
      this.jwt = config.jwt;
      this.accessToken = config.accessToken;
      this.userId = config.userId;
      var domain = config.userId.substring(config.userId.indexOf(':') + 1);
      var localBase64Meta = _base.Base64.encode(JSON.stringify({
        appType: 'RETAIL',
        terminal: 'wxapplet',
        plaform: 'ios',
        domain: domain
      }));
      this.auth = "Bearer " + config.jwt;
    }
  }, {
    key: "refresh",
    value: function refresh(jwt) {
      this.jwt = jwt;
      this.auth = jwt;
    }
  }]);

  return HttpClient;
}();

var httpClient = new HttpClient();
console.log('getExtInfo().BASE_URL: ', (0, _ext.getExtInfo)().BASE_URL);
var request = exports.request = httpClient.request.bind(httpClient);
var fetch = exports.fetch = httpClient.fetch.bind(httpClient);
var upload = exports.upload = httpClient.upload.bind(httpClient);
var refresh = exports.refresh = httpClient.refresh.bind(httpClient);
exports.default = httpClient;