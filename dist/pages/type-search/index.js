"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dec, _class;
// import { Events } from "@finogeeks/finchat-js-sdk";

// import Activity from "@/components/activity";

// import { bindActionCreators } from 'redux'
// import { NAV_PAGES } from '@/constants/navigation';
// import { ROOMTYPES } from '@/constants/room';
// import RoomItem from './components/room-item';

var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../npm/@tarojs/redux/index.js");

var _index4 = require("../../store/index.js");

var _index5 = _interopRequireDefault(_index4);

var _fetch = require("../../utils/fetch.js");

var _auth = require("../../model/auth.js");

var _auth2 = _interopRequireDefault(_auth);

var _im = require("../../model/im.js");

var _im2 = _interopRequireDefault(_im);

var _room = require("../../store/actions/room.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var shareImage = "/assets/logo2.png";
var moreImg = "/assets/room/more.png";
var channelDefault = "/assets/room/channel_default.png";

var mapStateToProps = function mapStateToProps(state) {
  var navigation = state.navigation,
      room = state.room,
      search = state.search;

  console.log(state);
  return {
    navBarHeight: navigation.style.navHeight + navigation.style.statusBarHeight,
    search: search
  };
};

var Home = (_dec = (0, _index3.connect)(mapStateToProps), _dec(_class = function (_BaseComponent) {
  _inherits(Home, _BaseComponent);

  function Home() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    _classCallCheck(this, Home);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Home.__proto__ || Object.getPrototypeOf(Home)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "anonymousState__temp2", "anonymousState__temp3", "loopArray4", "$compid__18", "showNavBar", "searchState", "searchResult", "searchTypes", "scrollHeight", "hasMobile", "search", "navBarHeight"], _this.checkoutConsultRoom = false, _this.isShow = false, _this.config = {
      navigationStyle: 'custom'
    }, _this.initBasicInfo = function () {
      var _Taro$getSystemInfoSy = _index2.default.getSystemInfoSync(),
          windowHeight = _Taro$getSystemInfoSy.windowHeight,
          windowWidth = _Taro$getSystemInfoSy.windowWidth;

      var consultHeight = 100 * windowWidth / 750;
      console.log('==============consultHeight==============');
      console.log(windowWidth, consultHeight);
      var searchHeight = 88 * windowWidth / 750;
      var scrollHeight = windowHeight - _this.props.navBarHeight - searchHeight;
      _this.setState({ scrollHeight: scrollHeight, searchHeight: searchHeight });
    }, _this.myCatchTouch = function () {
      console.log('stop user scroll it!');
      return;
    }, _this.handleClickBack = function () {
      // console.log(Taro.getCurrentPages());
      // this.setState({ showNavBar: false });
      // pages/index/index
      // Taro.navigateBack();
      return _index2.default.navigateBack();
      // Taro.switchTab({ url: '/pages/index/index' });
      // Taro.navigateBack({
      //   delta: 2
      // });
    }, _this.beginSearch = function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(eve) {
        var basicRooms, searchText, response, channelInfo, localChannelRoom, localGroupRoom, channelRoom, searchState, searchResult;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                basicRooms = _im2.default.getBasicRooms();
                searchText = eve.detail.value;
                _context.next = 4;
                return (0, _fetch.fetch)({
                  url: '/api/v1/platform/search?access_token=' + _auth2.default.getUserSession().accessToken + '&jwt=' + _auth2.default.getUserSession().jwt,
                  method: 'POST',
                  header: {
                    'content-type': 'application/json',
                    'X-Consumer-Custom-ID': _auth2.default.getUserSession().userId
                  },
                  data: {
                    type: "0",
                    keyword: searchText,
                    rooms: basicRooms.map(function (e) {
                      return e.id;
                    })
                  }
                });

              case 4:
                response = _context.sent;
                channelInfo = response.data.data.channelInfo;
                localChannelRoom = basicRooms.filter(function (e) {
                  return e.isChannel && e.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
                });

                localChannelRoom.forEach(function (e) {
                  return e.isLocal = true;
                });
                localGroupRoom = basicRooms.filter(function (e) {
                  return !(e.isChannel || e.isDirect) && e.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
                });

                localGroupRoom.forEach(function (e) {
                  return e.isLocal = true;
                });
                channelRoom = channelInfo.concat(localChannelRoom);
                searchState = channelRoom.length > 0 || localGroupRoom.length > 0 ? 'have' : 'none';
                searchResult = [];

                if (channelRoom.length > 0) {
                  searchResult.push({ list: channelRoom, shotrlist: channelRoom.slice(0, 3), type: 'channelRoom' });
                }if (localGroupRoom.length > 0) {
                  searchResult.push({ list: localGroupRoom, shotrlist: localGroupRoom.slice(0, 3), type: 'groupRoom' });
                }_this.setState({
                  searchResult: searchResult,
                  searchState: searchState
                });
                console.log(searchResult, searchState);

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }(), _this.enterRoom = function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(room) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (room.isLocal) {
                  _im2.default.enterRoom(room.id || room.room_id);
                } else {
                  _index5.default.dispatch((0, _room.addViewingRoom)(room));
                  // console.log('store.dispatch(addViewingRoom(room))');
                  // console.log(store.viewingRoom);
                  _index2.default.navigateTo({
                    url: '/pages/join-room/index'
                  });
                }

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }));

      return function (_x2) {
        return _ref3.apply(this, arguments);
      };
    }(), _this.customComponents = ["NavBar", "RoomAvatar"], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Home, [{
    key: "_constructor",
    value: function _constructor() {
      _get(Home.prototype.__proto__ || Object.getPrototypeOf(Home.prototype), "_constructor", this).call(this);
      this.state = {
        // rooms: [],
        scrollHeight: 0,
        hasMobile: false,
        showNavBar: true,
        searchTypes: {
          channelRoom: {
            cn: '频道'
          },
          groupRoom: {
            cn: '群聊'
          }
        },
        // pageTitle: '消息',
        searchResult: [],
        searchState: 'have' // begin:新进页面;have:有搜索结果;none:没有搜索结果
      };
      this.$$refs = [];
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      this.initBasicInfo();
      console.log(this.props);
      this.setState({
        searchResult: [this.props.search.searchResult]
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {}
  }, {
    key: "componentDidShow",
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function componentDidShow() {
        return _ref4.apply(this, arguments);
      }

      return componentDidShow;
    }()
  }, {
    key: "componentDidHide",
    value: function componentDidHide() {
      this.isShow = false;
    }
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
      var $compid__18 = (0, _index.genCompid)(__prefix + "$compid__18");

      var _state = this.__state,
          scrollHeight = _state.scrollHeight,
          hasMobile = _state.hasMobile,
          showNavBar = _state.showNavBar,
          searchHeight = _state.searchHeight,
          searchState = _state.searchState,
          searchTypes = _state.searchTypes,
          searchResult = _state.searchResult;

      var anonymousState__temp = (0, _index.internal_inline_style)({ top: this.__props.navBarHeight + "px" });
      var anonymousState__temp2 = (0, _index.internal_inline_style)({ height: scrollHeight + "px" });
      var anonymousState__temp3 = (0, _index.internal_inline_style)({ height: scrollHeight + "px", 'margin-top': searchHeight + "px" });
      var loopArray4 = !(searchState === 'none') ? searchResult.map(function (item, _anonIdx3) {
        item = {
          $original: (0, _index.internal_get_original)(item)
        };
        var $anonymousCallee__1 = !(searchState === 'none') ? item.$original.list.map(function (e, _anonIdx) {
          e = {
            $original: (0, _index.internal_get_original)(e)
          };
          var $compid__17 = (0, _index.genCompid)(__prefix + "rlleOvDwsV" + _anonIdx3 + "-" + _anonIdx);
          !(searchState === 'none') && _index.propsManager.set({
            "room": e.$original,
            "showBackImg": true
          }, $compid__17);
          return {
            $compid__17: $compid__17,
            $original: e.$original
          };
        }) : [];
        return {
          $anonymousCallee__1: $anonymousCallee__1,
          $original: item.$original
        };
      }) : [];
      showNavBar && _index.propsManager.set({
        "title": '搜索',
        "showBackBtn": true,
        "darkTitle": true,
        "onClickBack": this.handleClickBack
      }, $compid__18);
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp,
        anonymousState__temp2: anonymousState__temp2,
        anonymousState__temp3: anonymousState__temp3,
        loopArray4: loopArray4,
        $compid__18: $compid__18
      });
      return this.__state;
    }
  }]);

  return Home;
}(_index.Component)) || _class);
Home.$$events = ["enterSearch", "beginSearch", "handleClickBack", "enterRoom"];
Home.$$componentPath = "pages/type-search/index";
exports.default = Home;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Home, true));