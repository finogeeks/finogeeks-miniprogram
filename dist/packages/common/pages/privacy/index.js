"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require("../../../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _ext = require("../../../../utils/ext.js");

var _ext2 = _interopRequireDefault(_ext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// const mapStateToProps = ({navigation}) => {
//   return {
//     navBarHeight: navigation.style.height + navigation.style.paddingTop,
//   }
// }

// @connect(mapStateToProps)
var Privacy = function (_BaseComponent) {
  _inherits(Privacy, _BaseComponent);

  function Privacy() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Privacy);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Privacy.__proto__ || Object.getPrototypeOf(Privacy)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["navBarHeight"], _this.config = {
      navigationBarTitleText: '隐私声明',
      navigationBarBackgroundColor: _ext2.default.THEME_COLOR.NAV_bg,
      navigationBarTextStyle: 'black'
      // disableScroll: true
    }, _this.customComponents = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Privacy, [{
    key: "_constructor",
    value: function _constructor() {
      // this.state = {
      //   scrollHeight: 0,
      // }

      this.$$refs = [];
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      var systemInfo = _index2.default.getSystemInfoSync();
      var windowHeight = systemInfo.windowHeight;

      var scrollHeight = windowHeight - this.props.navBarHeight;
      console.log(scrollHeight);
      // this.setState({ scrollHeight })
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;
      Object.assign(this.__state, {});
      return this.__state;
    }
  }]);

  return Privacy;
}(_index.Component);

Privacy.$$events = [];
Privacy.$$componentPath = "packages/common/pages/privacy/index";
exports.default = Privacy;

Component(require('../../../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Privacy, true));