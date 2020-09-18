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

var Composite = function (_BaseComponent) {
  _inherits(Composite, _BaseComponent);

  function Composite() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Composite);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Composite.__proto__ || Object.getPrototypeOf(Composite)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["loopArray16", "layouts", "onWidgetTap"], _this.customComponents = ["Clinear", "CTable", "CGrid"], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Composite, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(Composite.prototype.__proto__ || Object.getPrototypeOf(Composite.prototype), "_constructor", this).call(this, props);

      this.$$refs = [];
    }
  }, {
    key: "_createData",
    value: function _createData() {
      var _this2 = this;

      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;

      var layouts = this.__props.params.layouts;

      var loopArray16 = layouts.map(function (layout, idx) {
        layout = {
          $original: (0, _index.internal_get_original)(layout)
        };

        var _layout$$original = layout.$original,
            type = _layout$$original.type,
            title = _layout$$original.title,
            params = _layout$$original.params;

        var isComposite = true;
        var $compid__56 = (0, _index.genCompid)(__prefix + "QuGkgytFZv" + idx);
        type === 'linear' && _index.propsManager.set({
          "title": title,
          "isComposite": isComposite,
          "params": params,
          "onWidgetTap": _this2.__props.onWidgetTap
        }, $compid__56);
        var $compid__57 = (0, _index.genCompid)(__prefix + "CRvIBZZFkv" + idx);
        type === 'table' && _index.propsManager.set({
          "title": title,
          "isComposite": isComposite,
          "params": params,
          "onWidgetTap": _this2.__props.onWidgetTap
        }, $compid__57);
        var $compid__58 = (0, _index.genCompid)(__prefix + "EcEpBqtGZp" + idx);
        type === 'grid' && _index.propsManager.set({
          "title": title,
          "isComposite": isComposite,
          "params": params,
          "onWidgetTap": _this2.__props.onWidgetTap
        }, $compid__58);
        return {
          type: type,
          title: title,
          params: params,
          isComposite: isComposite,
          $compid__56: $compid__56,
          $compid__57: $compid__57,
          $compid__58: $compid__58,
          $original: layout.$original
        };
      });
      Object.assign(this.__state, {
        loopArray16: loopArray16,
        layouts: layouts
      });
      return this.__state;
    }
  }]);

  return Composite;
}(_index.Component);

Composite.$$events = [];
Composite.$$componentPath = "components/message/convo-ui/layouts/composite/index";


Composite.defaultProps = {
  title: '',
  params: {
    layouts: []
  },
  onWidgetTap: function onWidgetTap() {}
};

exports.default = Composite;

Component(require('../../../../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Composite));