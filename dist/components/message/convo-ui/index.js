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

var ConvoUI = function (_BaseComponent) {
  _inherits(ConvoUI, _BaseComponent);

  function ConvoUI() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ConvoUI);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ConvoUI.__proto__ || Object.getPrototypeOf(ConvoUI)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["$compid__49", "$compid__50", "$compid__51", "$compid__52", "type", "message"], _this.onWidgetTap = function (payload) {
      var widget = payload.widget;
      var message = _this.props.message;

      _this.props.onConvo({
        widget: widget,
        content: message.content
      });
    }, _this.customComponents = ["Clinear", "CTable", "CGrid", "Composite"], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ConvoUI, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(ConvoUI.prototype.__proto__ || Object.getPrototypeOf(ConvoUI.prototype), "_constructor", this).call(this, props);

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
      var $compid__49 = (0, _index.genCompid)(__prefix + "$compid__49");
      var $compid__50 = (0, _index.genCompid)(__prefix + "$compid__50");
      var $compid__51 = (0, _index.genCompid)(__prefix + "$compid__51");
      var $compid__52 = (0, _index.genCompid)(__prefix + "$compid__52");

      var _props$message$conte = this.__props.message.content.layout,
          type = _props$message$conte.type,
          title = _props$message$conte.title,
          params = _props$message$conte.params;

      type === 'linear' && _index.propsManager.set({
        "title": title,
        "params": params,
        "onWidgetTap": this.onWidgetTap
      }, $compid__49);
      type === 'table' && _index.propsManager.set({
        "title": title,
        "params": params,
        "onWidgetTap": this.onWidgetTap
      }, $compid__50);
      type === 'grid' && _index.propsManager.set({
        "title": title,
        "params": params,
        "onWidgetTap": this.onWidgetTap
      }, $compid__51);
      type === 'composite' && _index.propsManager.set({
        "title": title,
        "params": params,
        "onWidgetTap": this.onWidgetTap
      }, $compid__52);
      Object.assign(this.__state, {
        $compid__49: $compid__49,
        $compid__50: $compid__50,
        $compid__51: $compid__51,
        $compid__52: $compid__52,
        type: type
      });
      return this.__state;
    }
  }]);

  return ConvoUI;
}(_index.Component);

ConvoUI.$$events = [];
ConvoUI.$$componentPath = "components/message/convo-ui/index";


ConvoUI.defaultProps = {
  message: {
    content: {
      body: '',
      layout: {
        type: 'linear',
        title: '',
        display: {
          type: 'inplace'
        },
        params: {
          text: '',
          widgets: []
        }
      }
    }
  },
  onConvo: function onConvo() {}
};

exports.default = ConvoUI;

Component(require('../../../npm/@tarojs/taro-weapp/index.js').default.createComponent(ConvoUI));