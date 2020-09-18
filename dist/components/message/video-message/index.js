"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _index = require("../../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var videoPlayImage = "/assets/message/room_video_play.svg";

var VideoMessage = function (_BaseComponent) {
  _inherits(VideoMessage, _BaseComponent);

  function VideoMessage() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, VideoMessage);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = VideoMessage.__proto__ || Object.getPrototypeOf(VideoMessage)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["_$anonymousState__temp", "message", "_$anonymousState__temp2", "poster", "videoPlayImage"], _this.customComponents = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(VideoMessage, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(VideoMessage.prototype.__proto__ || Object.getPrototypeOf(VideoMessage.prototype), "_constructor", this).call(this, props);
      this.$$refs = [];
    }
  }, {
    key: "getImageWH",
    value: function getImageWH() {
      var message = this.props.message;


      var w = message.content.info.w || message.content.info.thumbnail_info.w;
      var h = message.content.info.h || message.content.info.thumbnail_info.h;

      var maxW = w / h > 2 ? 300 : w / h > 1 ? 240 : 180;
      if (w > maxW) {
        h = h * maxW / w;
        w = maxW;
      }

      return {
        width: Math.floor(w) + "px",
        height: Math.floor(h) + "px"
      };
    }
  }, {
    key: "playVideo",
    value: function playVideo(video) {
      this.props.onVideo(video);
    }
  }, {
    key: "_createData",
    value: function _createData() {
      var _$anonymousState__temp, _$anonymousState__temp2;

      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;

      var message = this.__props.message;

      if (!message || !message.content || !message.content.info) {
        return null;
      }
      var url = message.content.url.replace('?', '/mp4?');
      var poster = message.content.info.thumbnail_url;
      var name = message.content.body;
      var style = this.getImageWH();

      if (!message.content.flag) {
        _$anonymousState__temp = (0, _index.internal_inline_style)(style ? "width: " + style.width + "; height: " + style.height + ";" : '');
        _$anonymousState__temp2 = {
          url: url,
          poster: poster,
          name: name
        };
      }
      Object.assign(this.__state, {
        _$anonymousState__temp: _$anonymousState__temp,
        message: message,
        _$anonymousState__temp2: _$anonymousState__temp2,
        poster: poster,
        videoPlayImage: videoPlayImage
      });
      return this.__state;
    }
  }]);

  return VideoMessage;
}(_index.Component);

VideoMessage.$$events = ["playVideo"];
VideoMessage.$$componentPath = "components/message/video-message/index";
exports.default = VideoMessage;

Component(require('../../../npm/@tarojs/taro-weapp/index.js').default.createComponent(VideoMessage));