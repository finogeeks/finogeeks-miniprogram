"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _index = require("../../../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CWidget = function (_BaseComponent) {
  _inherits(CWidget, _BaseComponent);

  function CWidget() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CWidget);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CWidget.__proto__ || Object.getPrototypeOf(CWidget)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "$compid__59", "$compid__60", "$compid__61", "$compid__62", "$compid__63", "$compid__64", "$compid__65", "type", "widget"], _this.handleWidgetTap = function () {
      _this.props.onWidgetTap({
        widget: _extends({}, _this.props.widget)
      });
    }, _this.customComponents = ["CHeader", "CFooter", "CItem", "CButton", "CLine", "CHyperText", "CRadioButton"], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CWidget, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(CWidget.prototype.__proto__ || Object.getPrototypeOf(CWidget.prototype), "_constructor", this).call(this, props);

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
      var $compid__59 = (0, _index.genCompid)(__prefix + "$compid__59");
      var $compid__60 = (0, _index.genCompid)(__prefix + "$compid__60");
      var $compid__61 = (0, _index.genCompid)(__prefix + "$compid__61");
      var $compid__62 = (0, _index.genCompid)(__prefix + "$compid__62");
      var $compid__63 = (0, _index.genCompid)(__prefix + "$compid__63");
      var $compid__64 = (0, _index.genCompid)(__prefix + "$compid__64");
      var $compid__65 = (0, _index.genCompid)(__prefix + "$compid__65");

      var _props$widget = this.__props.widget,
          type = _props$widget.type,
          title = _props$widget.title,
          params = _props$widget.params;

      var _ref2 = params || {},
          action = _ref2.action,
          value = _ref2.value,
          payload = _ref2.payload,
          icon = _ref2.icon,
          date = _ref2.date,
          href = _ref2.href,
          height = _ref2.height,
          margin = _ref2.margin,
          color = _ref2.color,
          background = _ref2.background,
          show = _ref2.show,
          size = _ref2.size;

      var anonymousState__temp = (0, _index.internal_inline_style)({
        display: show === 'staff' ? 'none' : 'block'
      });
      type === 'header' && _index.propsManager.set({
        "title": title,
        "icon": icon,
        "date": date,
        "href": href
      }, $compid__59);
      type === 'footer' && _index.propsManager.set({
        "title": title,
        "icon": icon,
        "date": date,
        "href": href
      }, $compid__60);
      type === 'item' && _index.propsManager.set({
        "title": title,
        "action": action
      }, $compid__61);
      type === 'button' && _index.propsManager.set({
        "title": title,
        "action": action,
        "value": value,
        "payload": payload
      }, $compid__62);
      type === 'line' && _index.propsManager.set({
        "title": title,
        "height": height,
        "margin": margin,
        "color": color
      }, $compid__63);
      type === 'hypertext' && _index.propsManager.set({
        "title": title,
        "action": action,
        "href": href
      }, $compid__64);
      type === 'radioButton' && _index.propsManager.set({
        "title": title,
        "action": action,
        "href": href,
        "value": value,
        "background": background,
        "color": color,
        "height": height,
        "show": show,
        "size": size,
        "icon": icon
      }, $compid__65);
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp,
        $compid__59: $compid__59,
        $compid__60: $compid__60,
        $compid__61: $compid__61,
        $compid__62: $compid__62,
        $compid__63: $compid__63,
        $compid__64: $compid__64,
        $compid__65: $compid__65,
        type: type
      });
      return this.__state;
    }
  }]);

  return CWidget;
}(_index.Component);

CWidget.$$events = ["handleWidgetTap"];
CWidget.$$componentPath = "components/message/convo-ui/widget/index";


CWidget.defaultProps = {
  widget: {
    expriation: -1,
    title: '',
    type: '',
    params: {}
  },
  onWidgetTap: function onWidgetTap() {}
};

exports.default = CWidget;

Component(require('../../../../npm/@tarojs/taro-weapp/index.js').default.createComponent(CWidget));