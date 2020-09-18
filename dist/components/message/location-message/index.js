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

var LocationMessage = function (_BaseComponent) {
  _inherits(LocationMessage, _BaseComponent);

  function LocationMessage() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, LocationMessage);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = LocationMessage.__proto__ || Object.getPrototypeOf(LocationMessage)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["message", "name", "address"], _this.customComponents = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(LocationMessage, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(LocationMessage.prototype.__proto__ || Object.getPrototypeOf(LocationMessage.prototype), "_constructor", this).call(this, props);

      this.$$refs = [];
    }
  }, {
    key: "openAddress",
    value: function openAddress() {
      var message = this.props.message;
      var _message$content$info = message.content.info,
          latitude = _message$content$info.latitude,
          longitude = _message$content$info.longitude;

      this.props.onLocation && this.props.onLocation({
        latitude: latitude,
        longitude: longitude,
        scale: 18
      });
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

      var _message$content$info2 = message.content.info,
          address = _message$content$info2.address,
          name = _message$content$info2.name;

      Object.assign(this.__state, {
        message: message,
        name: name,
        address: address
      });
      return this.__state;
    }
  }]);

  return LocationMessage;
}(_index.Component);

LocationMessage.$$events = ["openAddress"];
LocationMessage.$$componentPath = "components/message/location-message/index";
exports.default = LocationMessage;

Component(require('../../../npm/@tarojs/taro-weapp/index.js').default.createComponent(LocationMessage));