"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _promisifyWx = require("./utils/promisifyWx.js");

var _promisifyWx2 = _interopRequireDefault(_promisifyWx);

var _formateParams = require("./utils/formate-params.js");

var _formateParams2 = _interopRequireDefault(_formateParams);

var _compose = require("./utils/compose.js");

var _compose2 = _interopRequireDefault(_compose);

var _type = require("./utils/type.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var routerHandler = function routerHandler(routerFunc) {
  return function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url, query) {
      var formateUrl, res;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              formateUrl = (0, _formateParams2.default)(url, query);
              _context.prev = 1;
              _context.next = 4;
              return routerFunc({ url: formateUrl });

            case 4:
              res = _context.sent;

              console.log("combine router success: ", res);
              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](1);

              console.log('[MOCK] route to path: ', formateUrl);

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, undefined, [[1, 8]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
};

var _switchTab = (0, _compose2.default)(routerHandler, _promisifyWx2.default)(wx.switchTab);
var _navigateTo = (0, _compose2.default)(routerHandler, _promisifyWx2.default)(wx.navigateTo);
var _redirectTo = (0, _compose2.default)(routerHandler, _promisifyWx2.default)(wx.redirectTo);
var _navigateBack = (0, _compose2.default)(routerHandler, _promisifyWx2.default)(wx.switchTab);
var _reLaunch = (0, _compose2.default)(routerHandler, _promisifyWx2.default)(wx.reLaunch);

var CombineRouter = function () {
  /**
   * 构造函数
   * @param {*} routerConfig { HOME: '/pages/home/index'}
   */
  function CombineRouter(routerConfig) {
    _classCallCheck(this, CombineRouter);

    if (!(0, _type.isObject)(routerConfig)) {
      throw new Error('routerConfig must be Object');
    }
    this.__routerConfig = routerConfig;
    this.__extras = {};
  }

  _createClass(CombineRouter, [{
    key: "switchTab",
    value: function switchTab(_ref2) {
      var name = _ref2.name,
          path = _ref2.path,
          query = _ref2.query,
          extra = _ref2.extra;

      if (!this.__checkValidPath(name, path)) return;
      var url = this.__routerConfig[name] || path;
      if (extra) {
        this.__saveExtraData({ name: name, path: path, extra: extra });
      }
      _switchTab(url, query);
    }
  }, {
    key: "navigateTo",
    value: function navigateTo(_ref3) {
      var name = _ref3.name,
          path = _ref3.path,
          query = _ref3.query,
          extra = _ref3.extra;

      if (!this.__checkValidPath(name, path)) return;
      var url = this.__routerConfig[name] || path;
      if (extra) {
        this.__saveExtraData({ name: name, path: path, extra: extra });
      }
      _navigateTo(url, query);
    }
  }, {
    key: "redirectTo",
    value: function redirectTo(_ref4) {
      var name = _ref4.name,
          path = _ref4.path,
          query = _ref4.query,
          extra = _ref4.extra;

      if (!this.__checkValidPath(name, path)) return;
      if (extra) {
        this.__saveExtraData({ name: name, path: path, extra: extra });
      }
      var url = this.__routerConfig[name] || path;
      _redirectTo(url, query);
    }
  }, {
    key: "navigateBack",
    value: function navigateBack(delta) {
      _navigateBack(delta);
    }
  }, {
    key: "reLaunch",
    value: function reLaunch(_ref5) {
      var name = _ref5.name,
          path = _ref5.path,
          query = _ref5.query,
          extra = _ref5.extra;

      if (!this.__checkValidPath(name, path)) return;
      if (extra) {
        this.__saveExtraData({ name: name, path: path, extra: extra });
      }
      var url = this.__routerConfig[name] || path;
      _reLaunch(url, query);
    }
  }, {
    key: "getExtra",
    value: function getExtra(_ref6) {
      var name = _ref6.name,
          path = _ref6.path;

      var curName = name;
      if (!curName) {
        curName = this.__getNameFromPath(path);
      }
      var extra = this.__extras[curName] ? _extends({}, this.__extras[curName]) : {};
      delete this.__extras[curName];
      return extra;
    }
  }, {
    key: "__saveExtraData",
    value: function __saveExtraData(_ref7) {
      var name = _ref7.name,
          path = _ref7.path,
          extra = _ref7.extra;

      var curName = name;
      if (!curName) {
        curName = this.__getNameFromPath(path);
      }
      this.__extras[curName] = extra;
    }
  }, {
    key: "__getNameFromPath",
    value: function __getNameFromPath(path) {
      var name = '';
      if (!name) {
        Object.entries(this.__routerConfig).forEach(function (keyValuePair) {
          if (keyValuePair.includes(path) && !name) {
            name = keyValuePair[0];
          }
        });
      }
      return name;
    }
  }, {
    key: "__checkValidPath",
    value: function __checkValidPath(name, path) {
      var isValid = false;
      if (name && path) {
        isValid = !!this.__routerConfig[name] && this.__routerConfig[name] === path;
      } else {
        isValid = !!this.__routerConfig[name] || Object.values(this.__routerConfig).includes(path);
      }
      if (!isValid) {
        console.error('[CROUTE]: Error, invalid name or path');
      }

      return isValid;
    }
  }]);

  return CombineRouter;
}();

exports.default = CombineRouter;