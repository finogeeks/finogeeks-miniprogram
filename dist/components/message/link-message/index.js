"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _index = require("../../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _auth = require("../../../model/auth.js");

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LinkMessage = function (_BaseComponent) {
  _inherits(LinkMessage, _BaseComponent);

  function LinkMessage() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, LinkMessage);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = LinkMessage.__proto__ || Object.getPrototypeOf(LinkMessage)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["message", "icon", "image", "title", "url"], _this.handleHistory = function (url) {
      var reg = /(\w*)$/gi;
      var result = url && url.match(reg);
      _this.props.onLink && _this.props.onLink("/packages/common/pages/history/index?orderId=" + result[0]);
    }, _this.handleOpenLink = function () {
      var message = _this.props.message;
      var _message$content$info = message.content.info,
          url = _message$content$info.url,
          domain = _message$content$info.domain,
          title = _message$content$info.title;


      if (domain === '聊天记录') {
        _this.handleHistory(url);
        return;
      }

      // const businessUrls = extInfo.BUSINESS_URL;
      // if (businessUrls && !businessUrls.some(bUrl => url.startsWith(bUrl))) {
      //   Taro.showModal({
      //     title: '提示',
      //     content: '小程序暂不支持外部链接的跳转',
      //     showCancel: false,
      //     confirmText: '知道了',
      //   });
      //   return;
      // }

      var userSession = _auth2.default.getUserSession();
      var prefix = url;

      if (prefix.indexOf('jwt') < 0) {
        if (prefix.indexOf('?') < 0) {
          prefix = url + "?jwt=" + userSession.jwt;
        } else {
          prefix = url + "&jwt=" + userSession.jwt;
        }
      }
      _this.props.onLink && _this.props.onLink("/packages/common/pages/webview/index?url=" + encodeURIComponent(prefix) + "&title=" + encodeURIComponent(title));
    }, _this.getContentInfo = function (info) {
      if (info.domain === '聊天记录') {
        return {
          title: info.title,
          url: info.title,
          icon: 'history'
        };
      } else if (info.domain) {
        return _extends({}, info, {
          url: info.domain
        });
      } else if (info.source) {
        return _extends({}, info, {
          url: info.source
        });
      }

      return info;
    }, _this.customComponents = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(LinkMessage, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(LinkMessage.prototype.__proto__ || Object.getPrototypeOf(LinkMessage.prototype), "_constructor", this).call(this, props);

      this.$$refs = [];
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;

      var message = this.__props.message;

      if (!message || !message.content || !message.content.info) {
        return null;
      }

      // console.log(message);

      var _getContentInfo = this.getContentInfo(message.content.info),
          title = _getContentInfo.title,
          image = _getContentInfo.image,
          url = _getContentInfo.url,
          icon = _getContentInfo.icon;

      Object.assign(this.__state, {
        message: message,
        icon: icon,
        image: image,
        title: title,
        url: url
      });
      return this.__state;
    }
  }]);

  return LinkMessage;
}(_index.Component);

LinkMessage.$$events = ["handleOpenLink"];
LinkMessage.$$componentPath = "components/message/link-message/index";
exports.default = LinkMessage;

Component(require('../../../npm/@tarojs/taro-weapp/index.js').default.createComponent(LinkMessage));