"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _index = require("../../../../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CRadioButton = function (_BaseComponent) {
  _inherits(CRadioButton, _BaseComponent);

  function CRadioButton() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CRadioButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CRadioButton.__proto__ || Object.getPrototypeOf(CRadioButton)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "icon", "title", "background", "color", "height", "size", "show"], _this.customComponents = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CRadioButton, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(CRadioButton.prototype.__proto__ || Object.getPrototypeOf(CRadioButton.prototype), "_constructor", this).call(this, props);

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

      var _props = this.__props,
          title = _props.title,
          background = _props.background,
          color = _props.color,
          height = _props.height,
          size = _props.size,
          show = _props.show,
          icon = _props.icon;

      var anonymousState__temp = (0, _index.internal_inline_style)({
        color: color,
        backgroundColor: background,
        height: height + "px",
        fontSize: size + "px"
      });
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp,
        icon: icon,
        title: title
      });
      return this.__state;
    }
  }]);

  return CRadioButton;
}(_index.Component);

CRadioButton.$$events = [];
CRadioButton.$$componentPath = "components/message/convo-ui/widget/radio-button/index";


CRadioButton.defaultProps = {
  title: '',
  action: 'reply',
  value: '',
  payload: null,
  background: '#FFF',
  clickable: false,
  color: '#666666',
  height: 35,
  show: '',
  size: 14,
  icon: ''
};

exports.default = CRadioButton;

Component(require('../../../../../npm/@tarojs/taro-weapp/index.js').default.createComponent(CRadioButton));