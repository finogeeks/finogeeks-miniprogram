'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _index = require('../../../npm/@tarojs/taro-weapp/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var primaryIconStyle = {
  color: '1951AE'
};

var progressStyle = {
  color: 'E5D8D8',
  backgroundColor: 'E5D8D8'
};

var AudioMessage = function (_BaseComponent) {
  _inherits(AudioMessage, _BaseComponent);

  function AudioMessage() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, AudioMessage);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AudioMessage.__proto__ || Object.getPrototypeOf(AudioMessage)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "anonymousState__temp2", "anonymousState__temp3", "anonymousState__temp4", "message", "isMy", "isPlaying", "progress"], _this.getBubbleWidth = function () {
      var message = _this.props.message;

      var duration = message.content.info ? message.content.info.duration : 0;
      return Math.floor(duration / 1000) * 6 + 200 + "rpx";
    }, _this.customComponents = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(AudioMessage, [{
    key: '_constructor',
    value: function _constructor(props) {
      _get(AudioMessage.prototype.__proto__ || Object.getPrototypeOf(AudioMessage.prototype), '_constructor', this).call(this, props);
      this.state = {
        isPlaying: false,
        progress: 0
      };
      this.$$refs = [];
    }
  }, {
    key: 'playVoice',
    value: function playVoice() {
      var _this2 = this;

      var message = this.props.message;

      if (this.state.isPlaying) {
        this.innerAudioContext && this.innerAudioContext.stop();
        return;
      }
      var innerAudioContext = _index2.default.createInnerAudioContext();
      this.innerAudioContext = innerAudioContext;
      innerAudioContext.autoplay = false;
      innerAudioContext.src = message.content.url + "&mp3=true";
      innerAudioContext.onPlay(function () {
        console.log('playing');
        _this2.setState({
          isPlaying: true
        });
      });
      innerAudioContext.onStop(function () {
        console.log('stop');
        _this2.setState({
          isPlaying: false
        });
      });
      innerAudioContext.onEnded(function () {
        console.log('end');
        _this2.setState({
          isPlaying: false
        });
      });
      innerAudioContext.onError(function (res) {
        console.log(res.errMsg);
        console.log(res.errCode);
        _this2.setState({
          isPlaying: false
        });
      });
      innerAudioContext.onTimeUpdate(function () {
        var progress = Math.ceil(innerAudioContext.currentTime / innerAudioContext.duration * 100);
        progress = progress < 2 ? 2 : progress;
        progress = progress > 100 ? 100 : progress;
        _this2.setState({
          progress: progress
        });
      });
      innerAudioContext.play();
    }
  }, {
    key: '_createData',
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;

      var _state = this.__state,
          isPlaying = _state.isPlaying,
          progress = _state.progress;
      var _props = this.__props,
          message = _props.message,
          isMy = _props.isMy;

      if (!message || !message.content || !message.content.info) {
        return null;
      }
      var anonymousState__temp = (0, _index.internal_inline_style)({ width: this.getBubbleWidth() });
      var anonymousState__temp2 = "" + Math.floor((message.content.info.duration || 0) / 1000);
      var anonymousState__temp3 = (0, _index.internal_inline_style)(isMy || isPlaying ? primaryIconStyle : '');
      var anonymousState__temp4 = isPlaying ? (0, _index.internal_inline_style)(isMy ? _extends({}, progressStyle, { width: progress + "%" }) : { width: progress + "%" }) : null;
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp,
        anonymousState__temp2: anonymousState__temp2,
        anonymousState__temp3: anonymousState__temp3,
        anonymousState__temp4: anonymousState__temp4,
        message: message,
        isMy: isMy
      });
      return this.__state;
    }
  }]);

  return AudioMessage;
}(_index.Component);

AudioMessage.$$events = ["playVoice"];
AudioMessage.$$componentPath = "components/message/audio-message/index";
exports.default = AudioMessage;

Component(require('../../../npm/@tarojs/taro-weapp/index.js').default.createComponent(AudioMessage));