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

var CGrid = function (_BaseComponent) {
  _inherits(CGrid, _BaseComponent);

  function CGrid() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CGrid);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CGrid.__proto__ || Object.getPrototypeOf(CGrid)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["loopArray15", "widgets", "params", "onWidgetTap"], _this.customComponents = ["CWidget"], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CGrid, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(CGrid.prototype.__proto__ || Object.getPrototypeOf(CGrid.prototype), "_constructor", this).call(this, props);

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

      var widgets = this.__props.params.widgets;

      var loopArray15 = widgets.map(function (row, idx) {
        row = {
          $original: (0, _index.internal_get_original)(row)
        };
        var $anonymousCallee__5 = row.$original.map(function (widget, index) {
          widget = {
            $original: (0, _index.internal_get_original)(widget)
          };
          var $compid__55 = (0, _index.genCompid)(__prefix + "xcPpdWbgfP" + idx + "-" + index);
          _index.propsManager.set({
            "className": "text",
            "widget": widget.$original,
            "onWidgetTap": _this2.__props.onWidgetTap
          }, $compid__55);
          return {
            $compid__55: $compid__55,
            $original: widget.$original
          };
        });
        return {
          $anonymousCallee__5: $anonymousCallee__5,
          $original: row.$original
        };
      });
      Object.assign(this.__state, {
        loopArray15: loopArray15,
        widgets: widgets
      });
      return this.__state;
    }
  }]);

  return CGrid;
}(_index.Component);

CGrid.$$events = [];
CGrid.$$componentPath = "components/message/convo-ui/layouts/grid/index";


CGrid.defaultProps = {
  title: '',
  params: {
    text: '',
    widgets: [[]]
  },
  onWidgetTap: function onWidgetTap() {}
};

exports.default = CGrid;

Component(require('../../../../../npm/@tarojs/taro-weapp/index.js').default.createComponent(CGrid));