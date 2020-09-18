"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultAvatarImage = "/assets/message/avatar_default.png";

var Avatar = function (_BaseComponent) {
  _inherits(Avatar, _BaseComponent);

  function Avatar() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Avatar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Avatar.__proto__ || Object.getPrototypeOf(Avatar)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "anonymousState__temp2", "url", "avatarError", "size", "circle", "defaultAvatar", "outterCircle", "radius"], _this.componentWillUnmount = function () {
      _this.setState({
        avatarError: false
      });
    }, _this.onAvatarError = function () {
      _this.setState({
        avatarError: true
      });
    }, _this.customComponents = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Avatar, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(Avatar.prototype.__proto__ || Object.getPrototypeOf(Avatar.prototype), "_constructor", this).call(this, props);
      this.state = {
        // defaultAvatarImage,
        avatarError: false
      };
      this.$$refs = [];
    }

    // componentDidMount = () => {
    //   this.setState({
    //     avatarError: false,
    //   });
    // }

    // componentDidUpdate = () => {
    //   this.setState({
    //     avatarError: false,
    //   });
    // }

  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;

      var avatarError = this.__state.avatarError;
      var _props = this.__props,
          url = _props.url,
          size = _props.size,
          circle = _props.circle,
          defaultAvatar = _props.defaultAvatar,
          outterCircle = _props.outterCircle,
          radius = _props.radius;

      var circleStyle = circle ? {
        borderRadius: circle ? '50%' : '0',
        border: circle ? '1px solid transparent' : 'none'
      } : radius ? {
        borderRadius: '10rpx'
      } : {};
      // console.log(`~~~~~~~~Avatar url:${url} avatarError:${avatarError}~~~~~~~~~`);
      var anonymousState__temp = (0, _index.internal_inline_style)({ width: size + "rpx", height: size + "rpx", borderRadius: outterCircle ? '50%' : 0 });
      var anonymousState__temp2 = (0, _index.internal_inline_style)(circleStyle);
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp,
        anonymousState__temp2: anonymousState__temp2,
        url: url
      });
      return this.__state;
    }
  }]);

  return Avatar;
}(_index.Component);

Avatar.$$events = ["onAvatarError"];
Avatar.$$componentPath = "components/avatar/index";


Avatar.defaultProps = {
  url: null,
  size: 64,
  circle: false,
  defaultAvatar: defaultAvatarImage
};

exports.default = Avatar;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Avatar));