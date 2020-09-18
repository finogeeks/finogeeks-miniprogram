"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dec, _class;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../npm/@tarojs/redux/index.js");

var _redux = require("../../npm/redux/lib/redux.js");

var _navigation = require("../../store/actions/navigation.js");

var navActions = _interopRequireWildcard(_navigation);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var backImage = "/assets/navbar/arrow_back.png";
var homeImage = "/assets/navbar/arrow_back.png";
var roomDetailImg = "/assets/room/room_detail.png";

function mapStateToProps(state) {
  return {
    navigation: state.navigation
  };
}
function mapDispatchToProps(dispatch) {
  return _extends({}, (0, _redux.bindActionCreators)(navActions, dispatch));
}

var NavBar = (_dec = (0, _index3.connect)(mapStateToProps, mapDispatchToProps), _dec(_class = function (_BaseComponent) {
  _inherits(NavBar, _BaseComponent);

  function NavBar() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, NavBar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = NavBar.__proto__ || Object.getPrototypeOf(NavBar)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "anonymousState__temp2", "showBackBtn", "backImage", "title", "navigateBack", "showDetailBtn", "navigation"], _this.handleClick = function () {
      _this.props.navigateBack();
    }, _this.handleClickBack = function () {
      _this.props.onClickBack();
      // this.props.navigateBack();
    }, _this.handleCheckDetail = function () {
      _this.props.onCheckDetail();
    }, _this.customComponents = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(NavBar, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(NavBar.prototype.__proto__ || Object.getPrototypeOf(NavBar.prototype), "_constructor", this).call(this, props);
      this.$$refs = [];
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {}
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;

      var _props = this.__props,
          showBackBtn = _props.showBackBtn,
          showDetailBtn = _props.showDetailBtn;
      var _props$navigation$st = this.__props.navigation.style,
          navHeight = _props$navigation$st.navHeight,
          statusBarHeight = _props$navigation$st.statusBarHeight,
          maxTitleWidth = _props$navigation$st.maxTitleWidth;
      var title = this.__props.title;

      var anonymousState__temp = (0, _index.internal_inline_style)({ paddingTop: statusBarHeight + "px", height: navHeight + "px" });
      var anonymousState__temp2 = (0, _index.internal_inline_style)({ width: maxTitleWidth + "px", textAlign: 'center' });
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp,
        anonymousState__temp2: anonymousState__temp2,
        showBackBtn: showBackBtn,
        backImage: backImage,
        title: title
      });
      return this.__state;
    }
  }]);

  return NavBar;
}(_index.Component)) || _class);
NavBar.$$events = ["handleClickBack"];
NavBar.$$componentPath = "components/nav-bar/index";


NavBar.defaultProps = {
  title: '',
  showBackBtn: false,
  showHomeBtn: false,
  showDetailBtn: false
};

exports.default = NavBar;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(NavBar));