"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @Author: yiwenqi
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @Date: 2019-08-08 09:25:59
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @LastEditTime: 2019-08-11 15:23:38
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @LastEditors: yiwenqi
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @Description:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

// import matrix from '@/matrix';


var _index = require("../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _isEqual = require("../utils/lodash-local/is-equal.js");

var _isEqual2 = _interopRequireDefault(_isEqual);

var _index3 = require("../npm/qs/lib/index.js");

var _index4 = _interopRequireDefault(_index3);

var _store = require("../utils/store.js");

var _user = require("../store/actions/user.js");

var _index5 = require("../store/index.js");

var _index6 = _interopRequireDefault(_index5);

var _index7 = require("../service/index.js");

var _index8 = _interopRequireDefault(_index7);

var _refreshjwt = require("../utils/refreshjwt.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

console.log('isEqual', (0, _isEqual2.default)([], []));

var Auth = function () {
  function Auth() {
    var _this = this;

    _classCallCheck(this, Auth);

    this.wxlogin = function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(nick_name, avatar, code, encrypted_data, iv) {
        var systeminfo, wxUserDetail, diviceId, authRes;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                systeminfo = _index2.default.getSystemInfoSync();
                // console.log('~~~~~~~~systeminfo~~~~~~~~', systeminfo);
                // let loginRes = { code: '' };
                // loginRes = await Taro.login();

                _context.next = 3;
                return _index2.default.getUserInfo({ withCredentials: true, lang: 'zh_CN' });

              case 3:
                wxUserDetail = _context.sent;

                _this.wxUserInfo = wxUserDetail.userInfo;
                // const { iv, encryptedData } = wxUserDetail;
                diviceId = "mini-" + Date.now();
                _context.next = 8;
                return _index8.default.user.wxlogin(nick_name, avatar, code, encrypted_data, iv, systeminfo, diviceId);

              case 8:
                authRes = _context.sent;

                _this.userSession = {
                  accessToken: authRes.access_token,
                  jwt: authRes.jwt,
                  userId: authRes.user_id,
                  homeServer: authRes.home_server,
                  deviceId: authRes.device_id,
                  accountType: authRes.payload.accountType,
                  accountId: authRes.payload.accountId,
                  openId: authRes.payload.openId,
                  unionId: authRes.payload.unionId,
                  refresh_token: authRes.refresh_token,
                  expires_in: authRes.expires_in,
                  appType: 'RETAIL'
                };
                _index8.default.setAuth({
                  accessToken: _this.userSession.accessToken,
                  jwt: _this.userSession.jwt,
                  userId: _this.userSession.userId
                });
                // await this.syncUserInfo();
                (0, _store.setCacheSync)('userSession', _this.userSession);
                (0, _store.setCacheSync)('wxUserInfo', _this.wxUserInfo);
                // store.dispatch(setUserSession(this.__userSession));
                _this.isAuth = true;
                (0, _refreshjwt.startJwtRefresh)();
                return _context.abrupt("return", _this.userSession);

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this);
      }));

      return function (_x, _x2, _x3, _x4, _x5) {
        return _ref.apply(this, arguments);
      };
    }();

    this.login = function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(userName, userPassWord) {
        var systeminfo, loginRes, wxUserDetail, diviceId, authRes;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                systeminfo = _index2.default.getSystemInfoSync();

                console.log('~~~~~~~~systeminfo~~~~~~~~', systeminfo);
                loginRes = { code: '' };

                if (systeminfo.inFinChat) {
                  _context2.next = 11;
                  break;
                }

                _context2.next = 6;
                return _index2.default.login();

              case 6:
                loginRes = _context2.sent;
                _context2.next = 9;
                return _index2.default.getUserInfo({ withCredentials: true, lang: 'zh_CN' });

              case 9:
                wxUserDetail = _context2.sent;

                _this.wxUserInfo = wxUserDetail.userInfo;

              case 11:
                // const { iv, encryptedData } = wxUserDetail;
                diviceId = "mini-" + Date.now();
                _context2.next = 14;
                return _index8.default.user.login(loginRes.code, diviceId, userName, userPassWord, systeminfo);

              case 14:
                authRes = _context2.sent;

                _this.userSession = {
                  accessToken: authRes.access_token,
                  jwt: authRes.jwt,
                  userId: authRes.user_id,
                  homeServer: authRes.home_server,
                  deviceId: authRes.device_id,
                  accountType: authRes.payload.accountType,
                  accountId: authRes.payload.accountId,
                  openId: authRes.payload.openId,
                  unionId: authRes.payload.unionId,
                  refresh_token: authRes.refresh_token,
                  expires_in: authRes.expires_in,
                  appType: 'RETAIL'
                };
                _index8.default.setAuth({
                  accessToken: _this.userSession.accessToken,
                  jwt: _this.userSession.jwt,
                  userId: _this.userSession.userId
                });
                // await this.syncUserInfo();
                (0, _store.setCacheSync)('userSession', _this.userSession);
                (0, _store.setCacheSync)('wxUserInfo', _this.wxUserInfo);
                // store.dispatch(setUserSession(this.__userSession));
                _this.isAuth = true;
                (0, _refreshjwt.startJwtRefresh)();
                return _context2.abrupt("return", _this.userSession);

              case 22:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, _this);
      }));

      return function (_x6, _x7) {
        return _ref2.apply(this, arguments);
      };
    }();

    this.checkAuth = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref4$checkJwt = _ref4.checkJwt,
          checkJwt = _ref4$checkJwt === undefined ? true : _ref4$checkJwt,
          _ref4$checkAuth = _ref4.checkAuth,
          checkAuth = _ref4$checkAuth === undefined ? true : _ref4$checkAuth;

      var _ref5, _ref6, jwtRes, tokenRes;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!_this.isAuth) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt("return", true);

            case 2:
              if (_this.userSession) {
                _context3.next = 4;
                break;
              }

              return _context3.abrupt("return", false);

            case 4:
              if (!_index8.default.isAuth) {
                _index8.default.setAuth({
                  accessToken: _this.userSession.accessToken,
                  jwt: _this.userSession.jwt,
                  userId: _this.userSession.userId
                });
              }
              _context3.prev = 5;
              _context3.next = 8;
              return Promise.all([checkJwt ? _index8.default.common.checkJwt() : { statusCode: 200 }, checkAuth ? _index8.default.user.whoami() : { statusCode: 200 }]);

            case 8:
              _ref5 = _context3.sent;
              _ref6 = _slicedToArray(_ref5, 2);
              jwtRes = _ref6[0];
              tokenRes = _ref6[1];

              if (!(jwtRes.statusCode !== 200 || tokenRes.statusCode !== 200)) {
                _context3.next = 14;
                break;
              }

              return _context3.abrupt("return", false);

            case 14:
              _context3.next = 19;
              break;

            case 16:
              _context3.prev = 16;
              _context3.t0 = _context3["catch"](5);
              return _context3.abrupt("return", false);

            case 19:
              _this.isAuth = true;
              return _context3.abrupt("return", true);

            case 21:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, _this, [[5, 16]]);
    }));

    this.getCurAccount = function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(fcid) {
        var accounts, searchIndex;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (fcid) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt("return", null);

              case 2:
                _context4.prev = 2;
                _context4.next = 5;
                return _index8.default.user.getAccount(fcid);

              case 5:
                accounts = _context4.sent;
                searchIndex = accounts.findIndex(function (account) {
                  return account.accountType === 'icbc';
                });

                if (!(searchIndex > -1)) {
                  _context4.next = 11;
                  break;
                }

                return _context4.abrupt("return", accounts[searchIndex]);

              case 11:
                return _context4.abrupt("return", accounts.find(function (account) {
                  return account.accountType === 'weixin';
                }));

              case 12:
                _context4.next = 18;
                break;

              case 14:
                _context4.prev = 14;
                _context4.t0 = _context4["catch"](2);

                console.log(_context4.t0);
                return _context4.abrupt("return", null);

              case 18:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, _this, [[2, 14]]);
      }));

      return function (_x9) {
        return _ref7.apply(this, arguments);
      };
    }();

    this.getUserPosition = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      var wxPosition, longitude, latitude, position;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _index2.default.getLocation();

            case 3:
              wxPosition = _context5.sent;
              longitude = wxPosition.longitude, latitude = wxPosition.latitude;
              _context5.next = 7;
              return _index8.default.common.getPosition(longitude, latitude);

            case 7:
              position = _context5.sent;

              _index6.default.dispatch((0, _user.setUserLocaton)(_extends({
                longitude: longitude,
                latitude: latitude
              }, position)));
              _context5.next = 13;
              break;

            case 11:
              _context5.prev = 11;
              _context5.t0 = _context5["catch"](0);

            case 13:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, _this, [[0, 11]]);
    }));

    this.triggerAuthCompelte = function () {
      var eventBus = _index2.default.getApp().globalData.eventBus;

      eventBus.emit('AUTH_READY', _this.isAuth);
      _this.authReadyResolve && _this.authReadyResolve(_this.isAuth);
    };

    this.goToAuthPage = function () {
      return new Promise(function (resolve) {
        var query = {
          type: 'AUTH'
        };
        var authPageUrl = "/pages/login/index";
        _index2.default.navigateTo({
          url: authPageUrl + "?" + _index4.default.stringify(query)
        });
        _this.authReadyResolve = resolve;
      });
    };

    this.getUserInfo = function () {
      return _this.userInfo;
    };

    this.getUserSession = function () {
      return _this.userSession;
    };

    this.reFreshUserInfo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return _this.syncUserInfo({ reSync: true });

            case 2:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, _this);
    }));

    this.isAuth = false;

    this.userSession = (0, _store.getCacheSync)('userSession') || null;
    this.userInfo = (0, _store.getCacheSync)('userInfo') || null;
    this.wxUserInfo = (0, _store.getCacheSync)('wxUserInfo') || null;
    if (this.userSession && this.userInfo) {
      _index6.default.dispatch((0, _user.setUserSession)(this.userSession));
      _index6.default.dispatch((0, _user.setUserInfo)(this.userInfo));
    }
  }

  _createClass(Auth, [{
    key: "clearAuth",
    value: function clearAuth() {
      this.isAuth = false;
      this.userSession = null;
      this.userInfo = null;
      this.wxUserInfo = null;
      if (_index6.default.getState().user.info) {
        _index6.default.dispatch((0, _user.setUserInfo)(this.userInfo));
      }
      if (_index6.default.getState().user.session) {
        _index6.default.dispatch((0, _user.setUserSession)(this.userSession));
      }
      (0, _store.removeCacheSync)('userSession');
      (0, _store.removeCacheSync)('userInfo');
      (0, _store.removeCacheSync)('wxUserInfo');
    }
  }]);

  return Auth;
}();

var authModel = new Auth();
exports.default = authModel;