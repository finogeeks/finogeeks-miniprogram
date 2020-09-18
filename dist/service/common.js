'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkJwt = exports.getPosterLogo = exports.getStaffInfo = exports.getPosition = exports.joinRoom = exports.getSceneData = exports.countBinding = exports.shareActivityDaily = exports.getActivityDaily = exports.getGeoInfo = exports.sendSmsCode = undefined;

var _httpClient = require('../utils/http-client.js');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// import { getExtInfo } from '../utils/ext';
var sendSmsCode = exports.sendSmsCode = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(phone) {
    var response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _httpClient.request)({
              url: '/api/v1/platform/sms',
              method: 'POST',
              data: {
                phone: phone
              }
            });

          case 2:
            response = _context.sent;
            return _context.abrupt('return', response.data);

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function sendSmsCode(_x) {
    return _ref.apply(this, arguments);
  };
}();
var getGeoInfo = exports.getGeoInfo = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(lat, lng) {
    var response;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _httpClient.request)({
              url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + lat + ',' + lng + '&key=KHNBZ-JSAWP-DPSD4-LUCLI-HUQRK-L7BO2',
              method: 'GET'
            });

          case 2:
            response = _context2.sent;
            return _context2.abrupt('return', response.data);

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getGeoInfo(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();
var getActivityDaily = exports.getActivityDaily = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var response;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _httpClient.request)({
              url: '/api/v1/lottery/activityDaily?from=WECHAT',
              method: 'GET'
            });

          case 2:
            response = _context3.sent;
            return _context3.abrupt('return', response.data);

          case 4:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function getActivityDaily() {
    return _ref3.apply(this, arguments);
  };
}();
var shareActivityDaily = exports.shareActivityDaily = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var response;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _httpClient.request)({
              url: '/api/v1/lottery/activityDaily/share?from=WECHAT',
              method: 'POST'
            });

          case 2:
            response = _context4.sent;
            return _context4.abrupt('return', response.data);

          case 4:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function shareActivityDaily() {
    return _ref4.apply(this, arguments);
  };
}();
var countBinding = exports.countBinding = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    var response;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return (0, _httpClient.request)({
              url: '/api/v1/lottery/activityDaily/wechatBind?from=WECHAT',
              method: 'POST'
            });

          case 2:
            response = _context5.sent;
            return _context5.abrupt('return', response.data);

          case 4:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function countBinding() {
    return _ref5.apply(this, arguments);
  };
}();
var getSceneData = exports.getSceneData = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(sceneId) {
    var response;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return (0, _httpClient.request)({
              url: '/api/v1/wechat-service/wxa/share/' + sceneId,
              method: 'GET'
            });

          case 2:
            response = _context6.sent;
            return _context6.abrupt('return', response.data);

          case 4:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function getSceneData(_x4) {
    return _ref6.apply(this, arguments);
  };
}();
var joinRoom = exports.joinRoom = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(roomId, user_id, qrcode) {
    var response;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return (0, _httpClient.request)({
              url: '/api/v1/channel/rooms/' + roomId + '/privateJoin',
              method: 'POST',
              data: {
                user_id: user_id,
                qrcode: qrcode
              },
              needToken: true
            });

          case 2:
            response = _context7.sent;
            return _context7.abrupt('return', response.data);

          case 4:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  }));

  return function joinRoom(_x5, _x6, _x7) {
    return _ref7.apply(this, arguments);
  };
}();
/**
 * 获取位置信息
 * @param longitude
 * @param latitude
 * @returns {AxiosPromise}
 */
var getPosition = exports.getPosition = function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(longitude, latitude) {
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            return _context8.abrupt('return', {});

          case 1:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  }));

  return function getPosition(_x8, _x9) {
    return _ref8.apply(this, arguments);
  };
}();
/**
 * 获取投顾信息
 * @param staffId
 * @returns {AxiosPromise}
 */
var getStaffInfo = exports.getStaffInfo = function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(staffId) {
    var response;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return (0, _httpClient.request)({
              url: '/api/v1/swan/manager/staff/' + staffId,
              method: 'GET'
            });

          case 2:
            response = _context9.sent;
            return _context9.abrupt('return', response.data);

          case 4:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, undefined);
  }));

  return function getStaffInfo(_x10) {
    return _ref9.apply(this, arguments);
  };
}();
/**
 * 获取产品海报logo
 * @param staffId
 * @returns {AxiosPromise}
 */
var getPosterLogo = exports.getPosterLogo = function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
    var response;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return (0, _httpClient.request)({
              url: '/api/v1/adviserZone/poster/logo',
              method: 'GET'
            });

          case 2:
            response = _context10.sent;
            return _context10.abrupt('return', response.data);

          case 4:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, undefined);
  }));

  return function getPosterLogo() {
    return _ref10.apply(this, arguments);
  };
}();
/**
 * 获取产品海报logo
 * @param staffId
 * @returns {AxiosPromise}
 */
var checkJwt = exports.checkJwt = function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
    var response;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return (0, _httpClient.request)({
              url: '/api/v1/swan/gearing/config/version',
              method: 'GET'
            });

          case 2:
            response = _context11.sent;
            return _context11.abrupt('return', response);

          case 4:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, undefined);
  }));

  return function checkJwt() {
    return _ref11.apply(this, arguments);
  };
}();
exports.default = {
  sendSmsCode: sendSmsCode,
  getGeoInfo: getGeoInfo,
  getActivityDaily: getActivityDaily,
  countBinding: countBinding,
  getSceneData: getSceneData,
  joinRoom: joinRoom
};