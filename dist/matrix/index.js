"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
// import sdk from '@finogeeks/matrix-js-sdk-miniprogram';
// const sdk = require('@finogeeks/matrix-js-sdk-miniprogram');


var _dispatch = require("./modules/dispatch.js");

var _dispatch2 = _interopRequireDefault(_dispatch);

var _room = require("./modules/room.js");

var _room2 = _interopRequireDefault(_room);

var _user = require("./modules/user.js");

var _user2 = _interopRequireDefault(_user);

var _timeline = require("./modules/timeline.js");

var _timeline2 = _interopRequireDefault(_timeline);

var _main = require("../npm/@finogeeks/finchat-js-sdk-miniprogram/dist/main.js");

var _main2 = _interopRequireDefault(_main);

var _index = require("./stores/index.js");

var _index2 = _interopRequireDefault(_index);

var _store = require("../utils/store.js");

var _request = require("./utils/request.js");

var _request2 = _interopRequireDefault(_request);

var _ext = require("../utils/ext.js");

var _navigation = require("../constants/navigation.js");

var _auth = require("../model/auth.js");

var _auth2 = _interopRequireDefault(_auth);

var _index3 = require("../npm/@tarojs/taro-weapp/index.js");

var _index4 = _interopRequireDefault(_index3);

var _refreshjwt = require("../utils/refreshjwt.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Matrix = function () {
  function Matrix() {
    var _this = this;

    _classCallCheck(this, Matrix);

    this.start = function () {
      return new Promise(function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resolve) {
          var localConfig, opts;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  localConfig = (0, _store.getCacheSync)('userSession');

                  if (!localConfig) {
                    console.log('need auth first');
                    resolve(false);
                  }
                  _this.myUserId = localConfig.userId;
                  _this.mxClient = _main2.default.createClient({
                    baseUrl: _this.baseUrl,
                    accessToken: localConfig.accessToken,
                    userId: localConfig.userId,
                    deviceId: localConfig.deviceId,
                    timelineSupport: true,
                    request: _request2.default
                  });
                  _this.store = new _index2.default();
                  opts = {
                    baseUrl: _this.baseUrl,
                    accessToken: localConfig.accessToken,
                    userId: localConfig.userId,
                    deviceId: localConfig.deviceId,
                    jwt: localConfig.jwt,
                    store: _this.store
                  };

                  _this.mxClient.on("sync", function () {
                    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(state, prevState, data) {
                      return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              _context.t0 = state;
                              _context.next = _context.t0 === "ERROR" ? 3 : _context.t0 === "SYNCING" ? 11 : _context.t0 === "PREPARED" ? 12 : 18;
                              break;

                            case 3:
                              if (!(data.error.statusCode === 401)) {
                                _context.next = 10;
                                break;
                              }

                              (0, _refreshjwt.stopJwtRefresh)();
                              // this.stop();
                              _context.next = 7;
                              return _auth2.default.clearAuth();

                            case 7:
                              // wxRouter.redirectTo(NAV_PAGES.LOGIN);
                              _index4.default.reLaunch({
                                url: _navigation.NAV_PAGES.LOGIN
                              });
                              console.log('当前token已失效,请重新登录    sync');
                              _index4.default.showToast({ title: '当前token已失效,请重新登录', icon: 'none' });

                            case 10:
                              return _context.abrupt("break", 19);

                            case 11:
                              return _context.abrupt("break", 19);

                            case 12:
                              console.log('PREPARED');
                              // console.log(data);
                              // // the client instance is ready to be queried.
                              _context.next = 15;
                              return _this.init(opts);

                            case 15:
                              _this.ready = true;
                              resolve(true);
                              // setTimeout(() => {
                              //   resolve(true)
                              // }, 4000);
                              return _context.abrupt("break", 19);

                            case 18:
                              return _context.abrupt("break", 19);

                            case 19:
                            case "end":
                              return _context.stop();
                          }
                        }
                      }, _callee, _this);
                    }));

                    return function (_x2, _x3, _x4) {
                      return _ref2.apply(this, arguments);
                    };
                  }());
                  _this.mxClient.startClient({
                    debug: false,
                    pollTimeout: 30000,
                    initialSyncLimit: 20
                  });

                case 8:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, _this);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());
    };

    this.ready = false;
    this.baseUrl = (0, _ext.getExtInfo)().BASE_URL;
    // sdk = sdk
  }

  _createClass(Matrix, [{
    key: "stop",
    value: function stop() {
      this.mxClient.stopClient();
      this.mxClient = null;
      this.room = null;
      this.dispatch = null;
      this.user = null;
      this.timeline = null;
      this.store = null;
      this.ready = false;
    }
  }, {
    key: "reStart",
    value: function reStart() {
      this.stop();
      this.start();
    }
  }, {
    key: "init",
    value: function init(opts) {
      // 因 Room 对象依赖 User 对象，故此处最好先初始化User对象；
      this.user = new _user2.default(this.mxClient, opts);
      this.room = new _room2.default(this.mxClient, opts);
      this.dispatch = new _dispatch2.default(this.mxClient, opts);
      this.timeline = new _timeline2.default(this.mxClient, opts);
      this.ready = true;
    }
  }]);

  return Matrix;
}();

var matrix = new Matrix();
exports.default = matrix;