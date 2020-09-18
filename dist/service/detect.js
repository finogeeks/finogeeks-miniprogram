"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDetectControl = exports.detectSensitiveWord = undefined;

var _httpClient = require("../utils/http-client.js");

var _navigation = require("../constants/navigation.js");

var _auth = require("../model/auth.js");

var _auth2 = _interopRequireDefault(_auth);

var _index = require("../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _refreshjwt = require("../utils/refreshjwt.js");

var _store = require("../utils/store.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * 过滤敏感词
 */
var detectSensitiveWord = exports.detectSensitiveWord = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(text) {
    var userSession, response;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            userSession = (0, _store.getCacheSync)('userSession');
            _context2.next = 3;
            return (0, _httpClient.request)({
              url: "/api/v1/platform/wechat/detect?jwt=" + userSession.jwt + "&access_token=" + userSession.access_token,
              method: 'put',
              needAuth: true,
              data: {
                content: text
              }
            }).catch(function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(err) {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        console.log('~~~~detectSensitiveWord~~~~~~~', err);
                        (0, _refreshjwt.stopJwtRefresh)();
                        _context.next = 4;
                        return _auth2.default.clearAuth();

                      case 4:
                        _index2.default.reLaunch({
                          url: _navigation.NAV_PAGES.LOGIN
                        });
                        console.log('当前token已失效,请重新登录    detectSensitiveWord');
                        _index2.default.showToast({ title: '当前token已失效,请重新登录', icon: 'none' });

                      case 7:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function (_x2) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 3:
            response = _context2.sent;

            console.log('~~~~~~~~~~detectSensitiveWord  12~~~~~~~~~~~', response);
            // const url = '/api/v1/platform/wechat/detect'
            // let response;
            // await new Promise((resolve, reject) => {
            //   Taro.request({
            //     success(res) {
            //       if (res.statusCode === 200) {
            //         resolve(res);
            //       } else {
            //         reject(res);
            //       }
            //     },
            //     fail(err) {
            //       reject(err);
            //     },
            //     url: url.startsWith('http') ? url : `${getExtInfo().BASE_URL}${url}`,
            //   });
            // }).then(res => {
            //   response = res;
            // }).catch(err => {
            //   response = err;
            // });
            return _context2.abrupt("return", response.data);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function detectSensitiveWord(_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * 获取敏感词过滤配置信息
 */
var getDetectControl = exports.getDetectControl = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", true);

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function getDetectControl() {
    return _ref3.apply(this, arguments);
  };
}();