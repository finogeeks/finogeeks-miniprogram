"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeCache = exports.getCache = exports.setCache = exports.removeCacheSync = exports.getCacheSync = exports.setCacheSync = undefined;

var _index = require("../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var setCacheSync = exports.setCacheSync = function setCacheSync(key, data) {
  try {
    _index2.default.setStorageSync(key, data);
    return null;
  } catch (error) {
    throw new Error(error);
  }
};

var getCacheSync = exports.getCacheSync = function getCacheSync(key) {
  try {
    return _index2.default.getStorageSync(key);
  } catch (error) {
    throw new Error(error);
  }
};

var removeCacheSync = exports.removeCacheSync = function removeCacheSync(key) {
  try {
    return _index2.default.removeStorageSync(key);
  } catch (error) {
    throw new Error(error);
  }
};

var setCache = exports.setCache = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(key, data) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", _index2.default.setStorage({ key: key, data: data }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function setCache(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getCache = exports.getCache = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(key) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", _index2.default.getStorage({ key: key }));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getCache(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

var removeCache = exports.removeCache = function removeCache(key) {
  return _index2.default.removeStorage({ key: key });
};

exports.default = {
  setCacheSync: setCacheSync,
  getCacheSync: getCacheSync,
  removeCacheSync: removeCacheSync,
  setCache: setCache,
  getCache: getCache,
  removeCache: removeCache
};