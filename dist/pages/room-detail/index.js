"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dec, _class;

var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _api = require("../../utils/api.js");

var _index3 = require("../../npm/@tarojs/redux/index.js");

var _index4 = require("../../store/index.js");

var _index5 = _interopRequireDefault(_index4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(0, _index3.setStore)(_index5.default);

if (_index3.ReduxContext.Provider) {
  _index3.ReduxContext.Provider({
    store: _index5.default
  });
  _index3.ReduxContext.Provider({
    store: _index5.default
  });
}

var shareImage = "/assets/logo2.png";
var noticeImg = "/assets/room/notice.png";
var fileImg = "/assets/room/file.png";
var plusImg = "/assets/room/plus.png";
var moreImg = "/assets/room/more.png";
var qrImg = "/assets/room/qr_code.png";
var switchBtn = "/assets/room/switch_button.png";

var mapStateToProps = function mapStateToProps(_ref) {
  var navigation = _ref.navigation,
      room = _ref.room;

  return {
    navBarHeight: navigation.style.navHeight + navigation.style.statusBarHeight,
    basicRooms: room.basicRooms || [],
    viewingRoom: room.viewingRoom || {}
  };
};

var Home = (_dec = (0, _index3.connect)(mapStateToProps), _dec(_class = function (_BaseComponent) {
  _inherits(Home, _BaseComponent);

  function Home() {
    var _ref2,
        _this2 = this;

    var _temp, _this, _ret;

    _classCallCheck(this, Home);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = Home.__proto__ || Object.getPrototypeOf(Home)).call.apply(_ref2, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "viewingRoom", "$compid__19", "$compid__20", "roomtype", "noticeImg", "fileImg", "plusImg", "moreImg", "isChannel", "qrImg", "powerLevel", "messageTopping", "switchBtn", "isArchive", "scrollHeight", "hasMobile", "showNavBar", "searchTypes", "navBarHeight"], _this.checkoutConsultRoom = false, _this.config = {
      navigationStyle: 'custom'
    }, _this.handleClickBack = function () {
      return _index2.default.navigateBack();
    }, _this.handleArchive = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var itemList, res, action;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              itemList = ['确认归档'];
              _context.next = 3;
              return _index2.default.showActionSheet({
                itemList: itemList,
                itemColor: '#EE6464'
              });

            case 3:
              res = _context.sent;

              if (res) {
                action = itemList[res.tapIndex];

                if (action === '确认归档') {
                  (0, _api.archiveRoom)(_this.props.viewingRoom.id);
                }
              }

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this2);
    })), _this.handleCancleArchive = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var itemList, res, action;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              itemList = ['确认恢复'];
              _context2.next = 3;
              return _index2.default.showActionSheet({
                itemList: itemList,
                itemColor: '#EE6464'
              });

            case 3:
              res = _context2.sent;

              if (res) {
                action = itemList[res.tapIndex];

                if (action === '确认恢复') {
                  (0, _api.cancleArchiveRoom)(_this.props.viewingRoom.id);
                }
              }

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, _this2);
    })), _this.handleQuitChannel = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var itemList, res, action;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              itemList = ['确认删除'];
              _context3.next = 3;
              return _index2.default.showActionSheet({
                itemList: itemList,
                itemColor: '#EE6464'
              });

            case 3:
              res = _context3.sent;

              if (res) {
                action = itemList[res.tapIndex];

                if (action === '确认删除') {
                  (0, _api.quitRoom)(_this.props.viewingRoom.id);
                }
              }

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, _this2);
    })), _this.handleQuitGroup = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var itemList, res, action;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              itemList = ['确认删除'];
              _context4.next = 3;
              return _index2.default.showActionSheet({
                itemList: itemList,
                itemColor: '#EE6464'
              });

            case 3:
              res = _context4.sent;

              if (res) {
                action = itemList[res.tapIndex];

                if (action === '确认删除') {
                  (0, _api.quitRoom)(_this.props.viewingRoom.id);
                }
              }

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, _this2);
    })), _this.switchMessageTop = function () {
      _this.setState({
        messageTopping: !_this.state.messageTopping
      });
    }, _this.customComponents = ["NavBar", "RoomAvatar"], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Home, [{
    key: "_constructor",
    value: function _constructor() {
      _get(Home.prototype.__proto__ || Object.getPrototypeOf(Home.prototype), "_constructor", this).call(this);
      this.state = {
        scrollHeight: 0,
        hasMobile: false,
        showNavBar: true,
        searchTypes: ['通讯录', '频道', '消息', '小程序', '网盘', '知识库', '标签'],
        messageTopping: false
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
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function componentDidShow() {
        return _ref7.apply(this, arguments);
      }

      return componentDidShow;
    }()
  }, {
    key: "componentDidHide",
    value: function componentDidHide() {}
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;
      var $compid__19 = (0, _index.genCompid)(__prefix + "$compid__19");
      var $compid__20 = (0, _index.genCompid)(__prefix + "$compid__20");

      var _state = this.__state,
          scrollHeight = _state.scrollHeight,
          hasMobile = _state.hasMobile,
          showNavBar = _state.showNavBar,
          searchHeight = _state.searchHeight,
          messageTopping = _state.messageTopping;
      var _props = this.__props,
          _props$viewingRoom = _props.viewingRoom,
          viewingRoom = _props$viewingRoom === undefined ? {} : _props$viewingRoom,
          navBarHeight = _props.navBarHeight;
      var isArchive = viewingRoom.isArchive,
          isChannel = viewingRoom.isChannel,
          isDirect = viewingRoom.isDirect,
          isNormalRobot = viewingRoom.isNormalRobot,
          isCrossDomain = viewingRoom.isCrossDomain,
          federate = viewingRoom.federate,
          publicChannel = viewingRoom.publicChannel,
          isSecret = viewingRoom.isSecret,
          isGroup = viewingRoom.isGroup,
          powerLevel = viewingRoom.powerLevel;

      var roomtype = isCrossDomain ? '@外部' : isChannel && federate ? '共享' : isChannel && publicChannel ? '公开' : isChannel ? '私密' : isGroup && isSecret ? '保密' : '';
      console.log(viewingRoom);
      var anonymousState__temp = (0, _index.internal_inline_style)({ 'margin-top': navBarHeight + "px" });
      _index.propsManager.set({
        "title": isChannel ? '频道详情' : isGroup ? '群详情' : '',
        "showBackBtn": true,
        "onClickBack": this.handleClickBack
      }, $compid__19);
      _index.propsManager.set({
        "room": viewingRoom
      }, $compid__20);
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp,
        viewingRoom: viewingRoom,
        $compid__19: $compid__19,
        $compid__20: $compid__20,
        roomtype: roomtype,
        noticeImg: noticeImg,
        fileImg: fileImg,
        plusImg: plusImg,
        moreImg: moreImg,
        isChannel: isChannel,
        qrImg: qrImg,
        powerLevel: powerLevel,
        switchBtn: switchBtn,
        isArchive: isArchive
      });
      return this.__state;
    }
  }]);

  return Home;
}(_index.Component)) || _class);
Home.$$events = ["switchMessageTop", "handleCancleArchive", "handleArchive", "handleQuitChannel", "handleQuitGroup"];
Home.$$componentPath = "pages/room-detail/index";
exports.default = Home;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Home, true));