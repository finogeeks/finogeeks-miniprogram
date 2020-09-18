"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import { Events } from "@finogeeks/finchat-js-sdk";
// import service from '@/services';

// import { DISPATCH_STATE } from '@/services/dispatch-service';
// import Activity from "@/components/activity";

// import store from '@/store';

// import { bindActionCreators } from 'redux'
// import { NAV_PAGES } from '@/constants/navigation';
// import { ROOMTYPES } from '@/constants/room';
// import RoomItem from './components/room-item';

// import '../../finochat-app.scss';

var shareImage = "/assets/logo2.png";

// const mapStateToProps = ({ navigation, room }) => {
//   return {
//     navBarHeight: navigation.style.navHeight + navigation.style.statusBarHeight,
//     basicRooms: room.basicRooms || [],
//   };
// };

// @connect(mapStateToProps)

var Home = function (_BaseComponent) {
  _inherits(Home, _BaseComponent);

  function Home() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Home);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Home.__proto__ || Object.getPrototypeOf(Home)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "$compid__14", "showNavBar", "scrollHeight", "hasMobile", "basicRooms"], _this.checkoutConsultRoom = false, _this.isShow = false, _this.config = {
      // navigationBarTitleText: '消息',
      // navigationBarBackgroundColor: service.config.THEME_COLOR.NAV_bg,
      // navigationBarTextStyle: 'black',
      // disableScroll: true,
      navigationStyle: 'custom'
    }, _this.handleClickBack = function () {
      // console.log(Taro.getCurrentPages());
      // this.setState({ showNavBar: false });
      // pages/index/index
      // Taro.navigateBack();
      _index2.default.navigateBack();
      // Taro.switchTab({ url: '/pages/index/index' });
      // Taro.navigateBack({
      //   delta: 2
      // });
    }, _this.customComponents = ["NavBar"], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Home, [{
    key: "_constructor",
    value: function _constructor() {
      _get(Home.prototype.__proto__ || Object.getPrototypeOf(Home.prototype), "_constructor", this).call(this);
      this.state = {
        // rooms: [],
        scrollHeight: 0,
        hasMobile: false,
        showNavBar: true
        // pageTitle: '消息'
      };
      this.$$refs = [];
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {}
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {}
  }, {
    key: "componentDidShow",
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentDidShow() {
        return _ref2.apply(this, arguments);
      }

      return componentDidShow;
    }()
  }, {
    key: "componentDidHide",
    value: function componentDidHide() {}
  }, {
    key: "onShareAppMessage",
    value: function onShareAppMessage() {
      return {
        title: '消息',
        path: 'pages/login/index',
        imageUrl: shareImage
      };
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;
      var $compid__14 = (0, _index.genCompid)(__prefix + "$compid__14");

      var _state = this.__state,
          scrollHeight = _state.scrollHeight,
          hasMobile = _state.hasMobile,
          showNavBar = _state.showNavBar;
      var basicRooms = this.__props.basicRooms;

      console.log('===========basicRooms======123=========');
      console.log(basicRooms);
      var roomList = basicRooms || [];
      // console.log('roomList', roomList);
      var anonymousState__temp = (0, _index.internal_inline_style)({ height: scrollHeight + "px" });
      showNavBar && _index.propsManager.set({
        "title": '通讯录',
        "onClickBack": this.handleClickBack
      }, $compid__14);
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp,
        $compid__14: $compid__14
      });
      return this.__state;
    }
  }]);

  return Home;
}(_index.Component);

Home.$$events = [];
Home.$$componentPath = "pages/contacts/index";
exports.default = Home;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Home, true));