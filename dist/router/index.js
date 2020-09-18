"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _navigation = require("../store/actions/navigation.js");

var _tool = require("../utils/tool.js");

var _index = require("../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _navigation2 = require("../constants/navigation.js");

var _index3 = require("../store/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WxRouter = function () {
  function WxRouter() {
    _classCallCheck(this, WxRouter);
  }

  _createClass(WxRouter, [{
    key: "navigateTo",
    value: function navigateTo(url, params) {
      // webview 不支持自定义 navbar, 特殊处理
      if (url === _navigation2.NAV_PAGES.WEBVIEW) {
        var pageUrl = (0, _tool.formatUrlParams)(url, params);
        return _index2.default.navigateTo({ url: pageUrl });
      }
      return _index4.default.dispatch((0, _navigation.navigateTo)(url, params));
    }
  }, {
    key: "navigateBack",
    value: function navigateBack() {
      return _index4.default.dispatch((0, _navigation.navigateBack)());
    }
  }, {
    key: "redirectTo",
    value: function redirectTo(url, params) {
      if (url === _navigation2.NAV_PAGES.WEBVIEW) {
        var pageUrl = (0, _tool.formatUrlParams)(url, params);
        return _index2.default.redirectTo({ url: pageUrl });
      }
      return _index4.default.dispatch((0, _navigation.redirectTo)(url, params));
    }
  }, {
    key: "switchTab",
    value: function switchTab(url, params) {
      return _index4.default.dispatch((0, _navigation.switchTab)(url, params));
    }
  }, {
    key: "initNavigation",
    value: function initNavigation(initPages, initStyle) {
      return _index4.default.dispatch((0, _navigation.initNavigation)(initPages, initStyle));
    }
  }]);

  return WxRouter;
}();

var wxRouter = new WxRouter();

exports.default = wxRouter;