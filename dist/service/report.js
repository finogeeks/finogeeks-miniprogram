'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reportCallPhone = exports.reportWxPhome = exports.reportPresence = exports.reportFormId = undefined;

var _httpClient = require('../utils/http-client.js');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var reportFormId = exports.reportFormId = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(roomId, msgType, formId, openId, fcid) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', {});

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function reportFormId(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();
var reportPresence = exports.reportPresence = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(fcid, isOnline) {
    var response;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _httpClient.request)({
              url: '/api/v1/swan/observe/presence/' + fcid + '/status',
              method: 'PUT',
              data: {
                presence: isOnline ? 'online' : 'offline'
              }
            });

          case 2:
            response = _context2.sent;
            return _context2.abrupt('return', response);

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function reportPresence(_x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();
// 上报用户手机号加密数据
var reportWxPhome = exports.reportWxPhome = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref3) {
    var appId = _ref3.appId,
        code = _ref3.code,
        encryptedData = _ref3.encryptedData,
        iv = _ref3.iv,
        retailId = _ref3.retailId;
    var response;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _httpClient.request)({
              url: '/api/v1/swan/retail/wxPhone',
              method: 'POST',
              data: {
                retailId: retailId,
                appId: appId,
                code: code,
                encryptedData: encryptedData,
                iv: iv
              }
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

  return function reportWxPhome(_x8) {
    return _ref4.apply(this, arguments);
  };
}();
/**
 * 上报客户试图打电话
 * @param {*} ts
 */
var reportCallPhone = exports.reportCallPhone = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_ref5) {
    var staffId = _ref5.staffId,
        retailId = _ref5.retailId,
        resourceType = _ref5.resourceType,
        resourceId = _ref5.resourceId;
    var response;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _httpClient.request)({
              url: '/api/v1/adviserZone/_report/_call-phone',
              method: 'POST',
              data: {
                staffId: staffId,
                retailId: retailId,
                resourceType: resourceType,
                resourceId: resourceId
              }
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

  return function reportCallPhone(_x9) {
    return _ref6.apply(this, arguments);
  };
}();