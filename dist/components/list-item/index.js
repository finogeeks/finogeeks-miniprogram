"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var activeStyle = {
  backgroundColor: '#EEEEEE'
};

var ListItem = function (_BaseComponent) {
  _inherits(ListItem, _BaseComponent);

  function ListItem() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ListItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ListItem.__proto__ || Object.getPrototypeOf(ListItem)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "anonymousState__temp2", "isActive", "padding", "activeStyle", "icon", "name", "statusText", "hasNotif", "hasRightArrow"], _this.handleTouchStart = function () {
      _this.setState({ isActive: true });
    }, _this.handleTouchEnd = function () {
      _this.setState({ isActive: false });
    }, _this.customComponents = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ListItem, [{
    key: "_constructor",
    value: function _constructor() {
      this.state = {
        isActive: false
      };
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

      var padding = this.__props.padding;

      var listStyle = {
        padding: "40rpx " + (padding || 30) + "rpx",
        backgroundColor: this.__props.activeStyle && this.__state.isActive && '#EEEEEE' || '#FFFFFF'
      };
      var anonymousState__temp = (0, _index.internal_inline_style)(listStyle);
      var anonymousState__temp2 = this.__props.statusText ? (0, _index.internal_inline_style)({ color: '9B9B9B' }) : null;
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp,
        anonymousState__temp2: anonymousState__temp2
      });
      return this.__state;
    }
  }, {
    key: "funPrivatepohdM",
    value: function funPrivatepohdM() {
      return this.props.onClick.apply(undefined, Array.prototype.slice.call(arguments, 1));
    }
  }]);

  return ListItem;
}(_index.Component);

ListItem.$$events = ["funPrivatepohdM", "handleTouchStart", "handleTouchEnd"];
ListItem.$$componentPath = "components/list-item/index";


ListItem.defaultProps = {
  icon: '',
  name: '',
  statusText: '',
  hasRightArrow: false,
  hasNotif: false,
  activeStyle: false,
  onClick: function onClick() {}
};

exports.default = ListItem;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(ListItem));