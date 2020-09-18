"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initNavigation = exports.redirectTo = exports.changeParams = exports.switchTab = exports.navigateBack = exports.navigateTo = undefined;

var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _tool = require("../../utils/tool.js");

var _navigation = require("../../constants/navigation.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var navigateTo = exports.navigateTo = function navigateTo(url, params) {
  return function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch) {
      var pageUrl;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              pageUrl = (0, _tool.formatUrlParams)(url, params);

              dispatch({
                type: _navigation.NAV_TO,
                page: {
                  url: url,
                  params: params
                }
              });
              _context.next = 5;
              return _index2.default.navigateTo({ url: pageUrl });

            case 5:
              _context.next = 9;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, undefined, [[0, 7]]);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
};

var navigateBack = exports.navigateBack = function navigateBack() {
  return function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(dispatch) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;

              dispatch({
                type: _navigation.NAV_BACK
              });
              _context2.next = 4;
              return _index2.default.navigateBack();

            case 4:
              _context2.next = 8;
              break;

            case 6:
              _context2.prev = 6;
              _context2.t0 = _context2["catch"](0);

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[0, 6]]);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }();
};

var switchTab = exports.switchTab = function switchTab(url, params) {
  console.log('switchtab: ', params);
  return function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(dispatch, getState) {
      var _getState, navigation, pageUrl;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _getState = getState(), navigation = _getState.navigation;
              // console.log(navigation.curPage.url, url);
              // if (navigation.curPage.url === url) return;

              _context3.prev = 1;
              pageUrl = (0, _tool.formatUrlParams)(url, params);
              _context3.next = 5;
              return dispatch({
                type: _navigation.NAV_SWITCH_TAB,
                page: {
                  url: url,
                  params: params
                }
              });

            case 5:
              _context3.next = 7;
              return _index2.default.switchTab({ url: pageUrl });

            case 7:
              _context3.next = 11;
              break;

            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3["catch"](1);

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, undefined, [[1, 9]]);
    }));

    return function (_x3, _x4) {
      return _ref3.apply(this, arguments);
    };
  }();
};

var changeParams = exports.changeParams = function changeParams(url) {
  return function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(dispatch, getState) {
      var pageUrl;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              pageUrl = (0, _tool.formatUrlParams)(url, params);
              _context4.next = 4;
              return dispatch({
                type: CHANGE_PARAMS,
                page: {
                  url: url,
                  params: null
                }
              });

            case 4:
              _context4.next = 8;
              break;

            case 6:
              _context4.prev = 6;
              _context4.t0 = _context4["catch"](0);

            case 8:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, undefined, [[0, 6]]);
    }));

    return function (_x5, _x6) {
      return _ref4.apply(this, arguments);
    };
  }();
};

var redirectTo = exports.redirectTo = function redirectTo(url, params) {
  return function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(dispatch) {
      var pageUrl;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              pageUrl = (0, _tool.formatUrlParams)(url, params);

              dispatch({
                type: _navigation.NAV_REDIRECT,
                page: {
                  url: url,
                  params: params
                }
              });
              _context5.next = 5;
              return _index2.default.redirectTo({ url: pageUrl });

            case 5:
              _context5.next = 9;
              break;

            case 7:
              _context5.prev = 7;
              _context5.t0 = _context5["catch"](0);

            case 9:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, undefined, [[0, 7]]);
    }));

    return function (_x7) {
      return _ref5.apply(this, arguments);
    };
  }();
};

var initNavigation = exports.initNavigation = function initNavigation(initPages, initStyle) {
  return function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(dispatch) {
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              try {
                dispatch({
                  type: _navigation.NAV_INIT,
                  initPages: initPages,
                  initStyle: initStyle
                });
              } catch (error) {}

            case 1:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, undefined);
    }));

    return function (_x8) {
      return _ref6.apply(this, arguments);
    };
  }();
};