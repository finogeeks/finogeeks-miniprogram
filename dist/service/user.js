"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.whoami = exports.getSwanInfo = exports.updateSwan = exports.bindAccount = exports.getAccount = exports.wxlogin = exports.login = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _httpClient = require("../utils/http-client.js");

var _ext = require("../utils/ext.js");

var _auth = require("../model/auth.js");

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var login = exports.login = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(code, diviceId, userName, userPassWord, systeminfo) {
    var extInfo, wxUserInfo, display_name, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            extInfo = (0, _ext.getExtInfo)();
            wxUserInfo = _auth2.default.wxUserInfo;
            display_name = {
              loginTime: new Date().getTime(),
              system: systeminfo.system + ' - 小程序',
              clientType: '',
              deviceName: systeminfo.inFinChat ? 'fcuser' : wxUserInfo.nickName
            };
            _context.next = 5;
            return (0, _httpClient.request)({
              url: '/api/v1/registry/login',
              method: 'POST',
              data: {
                userId: userName,
                password: userPassWord,
                app_type: 'STAFF',
                login_type: 'pwd',
                // "display_name": "{\"loginTime\":1572918966267,\"system\":\"web\",\"clientType\":\"\",\"deviceName\":\"chrome: 78.0.3904.70\"}"
                display_name: JSON.stringify(display_name),
                device_type: 'mini',
                device_id: diviceId
              },
              needAuth: false
            });

          case 5:
            response = _context.sent;
            return _context.abrupt("return", _extends({}, response.data, { jwt: response.header.Authorization }));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function login(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();
var wxlogin = exports.wxlogin = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(nick_name, avatar, code, encrypted_data, iv, systeminfo, diviceId) {
    var display_name, response;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            display_name = {
              loginTime: new Date().getTime(),
              system: systeminfo.system + ' - 小程序',
              clientType: '',
              deviceName: systeminfo.inFinChat ? 'fcuser' : nick_name
            };
            _context2.next = 3;
            return (0, _httpClient.request)({
              url: '/api/v1/registry/login',
              method: 'POST',
              data: {
                app_type: 'STAFF',
                login_type: 'code',
                nick_name: nick_name,
                avatar: avatar,
                code: code,
                encrypted_data: encrypted_data,
                iv: iv,
                display_name: JSON.stringify(display_name),
                device_type: 'mini',
                device_id: diviceId
              },
              needAuth: false
            });

          case 3:
            response = _context2.sent;
            return _context2.abrupt("return", _extends({}, response.data, { jwt: response.header.Authorization }));

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function wxlogin(_x6, _x7, _x8, _x9, _x10, _x11, _x12) {
    return _ref2.apply(this, arguments);
  };
}();
var getAccount = exports.getAccount = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(fcid) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", {});

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function getAccount(_x13) {
    return _ref3.apply(this, arguments);
  };
}();
var bindAccount = exports.bindAccount = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_ref4) {
    var prev = _ref4.prev,
        accountId = _ref4.accountId,
        accountData = _ref4.accountData;
    var response;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _httpClient.request)({
              url: "/api/v1/uac/bind",
              method: 'PUT',
              data: {
                prev: prev,
                accountId: accountId,
                accountType: 'icbc',
                accountData: accountData
              }
            });

          case 2:
            response = _context4.sent;
            return _context4.abrupt("return", response);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function bindAccount(_x14) {
    return _ref5.apply(this, arguments);
  };
}();
var updateSwan = exports.updateSwan = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_ref6) {
    var retailId = _ref6.retailId,
        name = _ref6.name,
        avatar = _ref6.avatar,
        gender = _ref6.gender,
        region = _ref6.region,
        accountData = _ref6.accountData;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            return _context5.abrupt("return", {});

          case 1:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function updateSwan(_x15) {
    return _ref7.apply(this, arguments);
  };
}();
var getSwanInfo = exports.getSwanInfo = function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_ref8) {
    var fcid = _ref8.fcid;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            return _context6.abrupt("return", {});

          case 1:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function getSwanInfo(_x16) {
    return _ref9.apply(this, arguments);
  };
}();
var whoami = exports.whoami = function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
    var response;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return (0, _httpClient.request)({
              url: "/_matrix/client/r0/account/whoami",
              method: 'GET',
              needToken: true,
              needAuth: false
            });

          case 2:
            response = _context7.sent;
            return _context7.abrupt("return", response);

          case 4:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  }));

  return function whoami() {
    return _ref10.apply(this, arguments);
  };
}();