"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../npm/classnames/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScrollLoading = function (_BaseComponent) {
  _inherits(ScrollLoading, _BaseComponent);

  function ScrollLoading() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ScrollLoading);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ScrollLoading.__proto__ || Object.getPrototypeOf(ScrollLoading)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["rootClass", "loading", "hasMore", "loadingText", "noMoreText", "className"], _this.customComponents = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ScrollLoading, [{
    key: "_constructor",
    value: function _constructor() {
      _get(ScrollLoading.prototype.__proto__ || Object.getPrototypeOf(ScrollLoading.prototype), "_constructor", this).apply(this, arguments);

      this.state = {};
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
          className = _props.className,
          hasMore = _props.hasMore,
          loadingText = _props.loadingText,
          noMoreText = _props.noMoreText,
          loading = _props.loading;

      var rootClass = (0, _index4.default)('scroll-loading', className);
      Object.assign(this.__state, {
        rootClass: rootClass,
        loading: loading,
        hasMore: hasMore,
        loadingText: loadingText,
        noMoreText: noMoreText
      });
      return this.__state;
    }
  }]);

  return ScrollLoading;
}(_index.Component);

ScrollLoading.$$events = [];
ScrollLoading.options = { addGlobalClass: true };
ScrollLoading.$$componentPath = "components/scroll-loading/index";


ScrollLoading.defaultProps = {
  className: '',
  hasMore: true,
  loadingText: '加载中...',
  noMoreText: '已加载全部',
  loading: false
};

exports.default = ScrollLoading;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(ScrollLoading));