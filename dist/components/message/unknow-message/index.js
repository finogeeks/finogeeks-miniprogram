"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _index = require("../../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../../router/index.js");

var _index4 = _interopRequireDefault(_index3);

var _navigation = require("../../../constants/navigation.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import { checkUrl } from '@/utils/tool'


var TextMessage = function (_BaseComponent) {
  _inherits(TextMessage, _BaseComponent);

  function TextMessage() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TextMessage);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TextMessage.__proto__ || Object.getPrototypeOf(TextMessage)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["message"], _this.handleLink = function (url) {
      // 临时取消 url 校验
      // const businessUrls = extInfo.BUSINESS_URL || [];
      // if (businessUrls && !businessUrls.some(bUrl => url.startsWith(bUrl))) {
      //   Taro.showModal({
      //     title: '提示',
      //     content: '小程序暂不支持外部链接的跳转',
      //     showCancel: false,
      //     confirmText: '知道了',
      //   });
      //   return;
      // }
      _index4.default.navigateTo(_navigation.NAV_PAGES.WEBVIEW, { url: encodeURIComponent(url) });
    }, _this.customComponents = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TextMessage, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(TextMessage.prototype.__proto__ || Object.getPrototypeOf(TextMessage.prototype), "_constructor", this).call(this, props);

      this.$$refs = [];
    }
  }, {
    key: "getNodes",
    value: function getNodes(text) {
      var urlRegExp = /(https?:\/\/|finchat:\/\/|www\.)[-a-zA-Z0-9@:%_+.~#?!&../../..//=\u4e00-\u9fa5]{2,1024}/gi;
      var urls = text.match(urlRegExp);
      if (urls && urls.length > 0) {
        urls.map(function (url, index) {
          text = text.replace(url, "[TEMP_LINK" + index + "]");
        });
        var textRegExp = /\[TEMP_LINK(\w)\]/gi;
        var nodes = text.split(textRegExp);
        return nodes.map(function (node) {
          if (node.length === 1 && urls[node]) {
            var url = urls[node];
            if (url.startsWith('www')) {
              url = "http://" + url;
            }
            return {
              type: 'url',
              value: urls[node]
            };
          }
          return {
            type: 'text',
            value: node
          };
        });
      }
      return [{
        type: 'text',
        value: text
      }];
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
      // if (!message || !message.content || !message.content) {
      //   return;
      // }
      // const nodes = this.getNodes(message.content.body);
      // console.log('UNKNOW MESSAGE');
      // console.log(message);

      Object.assign(this.__state, {
        message: message
      });
      return this.__state;
    }
  }]);

  return TextMessage;
}(_index.Component);

TextMessage.$$events = [];
TextMessage.$$componentPath = "components/message/unknow-message/index";
exports.default = TextMessage;

Component(require('../../../npm/@tarojs/taro-weapp/index.js').default.createComponent(TextMessage));