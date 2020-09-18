"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dec, _class;

var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../service/index.js");

var _index4 = _interopRequireDefault(_index3);

var _store = require("../../utils/store.js");

var _dispatch = require("../../constants/dispatch.js");

var _auth = require("../../model/auth.js");

var _auth2 = _interopRequireDefault(_auth);

var _im = require("../../model/im.js");

var _im2 = _interopRequireDefault(_im);

var _ext = require("../../utils/ext.js");

var _ext2 = _interopRequireDefault(_ext);

var _index5 = require("../../npm/@tarojs/redux/index.js");

var _index6 = require("../../store/index.js");

var _index7 = _interopRequireDefault(_index6);

var _room = require("../../store/actions/room.js");

var _api = require("../../utils/api.js");

var _globaldata = require("../../utils/globaldata.js");

var _navigation = require("../../store/actions/navigation.js");

var _index8 = require("../../router/index.js");

var _index9 = _interopRequireDefault(_index8);

var _navigation2 = require("../../constants/navigation.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var shareImage = "/assets/logo2.png";

function mapStateToProps(state) {
  return {
    navigation: state.navigation
  };
}

var Home = (_dec = (0, _index5.connect)(mapStateToProps), _dec(_class = function (_BaseComponent) {
  _inherits(Home, _BaseComponent);

  function Home() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    _classCallCheck(this, Home);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Home.__proto__ || Object.getPrototypeOf(Home)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "loopArray0", "showList", "rooms", "basicRooms", "scrollHeight", "hasMobile", "isInit", "isAuth", "navigation"], _this.checkoutConsultRoom = false, _this.config = {
      navigationBarTitleText: '消息',
      navigationBarBackgroundColor: _ext2.default.THEME_COLOR.NAV_bg,
      navigationBarTextStyle: 'black',
      disableScroll: true
      // navigationStyle: 'custom',
    }, _this.handleRoom = function (e) {
      console.log('handleRoom = e => {');
      var basicRooms = e.basicRooms;

      _this.setState({ basicRooms: [].concat(_toConsumableArray(basicRooms)) });
    }, _this.initRoomInfo = function () {
      console.log('initRoomInfo');
      _im2.default.updateUnreadBadge();
      var basicRooms = _im2.default.getBasicRooms();
      _this.setState({ basicRooms: basicRooms });
      _im2.default.on('ROOM', _this.handleRoom);
      _this.setState({ isInit: true });
      console.log("this.setState({ basicRooms });");
    }, _this.initBasicInfo = function () {
      // const {
      //   navHeight,
      //   statusBarHeight,
      //   maxTitleWidth,
      // } = this.props.navigation.style;
      var systemInfo = _index2.default.getSystemInfoSync();
      // Taro 暂未实现此功能
      // const actionButtonInfo = Taro.getMenuButtonBoundingClientRect();
      var statusBarHeight = systemInfo.statusBarHeight,
          windowWidth = systemInfo.windowWidth;

      var navHeight = 88 * windowWidth / 750;
      navHeight = navHeight < 44 ? 44 : navHeight;
      // const maxTitleWidth = (actionButtonInfo.left - windowWidth / 2) * 2;

      var _Taro$getSystemInfoSy = _index2.default.getSystemInfoSync(),
          windowHeight = _Taro$getSystemInfoSy.windowHeight;
      // const scrollHeight = windowHeight - navHeight - statusBarHeight;


      var scrollHeight = windowHeight;
      console.log("~~~~~~scrollHeight:" + scrollHeight + "~~~windowHeight:" + windowHeight + "~~~navHeight:" + navHeight + "~~~~statusBarHeight:" + statusBarHeight + "~~~~~");
      _this.setState({ scrollHeight: scrollHeight });
    }, _this.initMobile = function () {
      var userInfo = _auth2.default.getUserInfo();
      if (!userInfo) {
        return;
      }var hasMobile = !!userInfo.mobile || !!(userInfo.accountData && userInfo.accountData.phone);
      _this.setState({ hasMobile: hasMobile });
    }, _this.setUpQuestionTypes = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var res;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (_auth2.default.isAuth) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return");

            case 2:
              _context.next = 4;
              return _index4.default.adviser.getAdviceQuestionType();

            case 4:
              res = _context.sent;

              if (res) {
                _context.next = 7;
                break;
              }

              return _context.abrupt("return");

            case 7:
              (0, _store.setCache)('questionTypes', res.types);
              // service
              //   .getMxClient()
              //   .getAdviceQuestionType()
              //   .then(res => {
              //     if (!res) return;
              //     setCache('questionTypes', res.types);
              //   });

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this2);
    })), _this.handleConsult = function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(forceConsult) {
        var _imModel$getDispatchD, dispatchState, from, dispatchRoomId, advisorRoomData;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!_this.checkoutConsultRoom) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return");

              case 2:
                // const questionTypes = getCacheSync("questionTypes");
                // if (!questionTypes || questionTypes.length === 0) {
                //   Taro.showToast({
                //     title: "业务类型获取失败，请重重试",
                //     icon: "none",
                //     mask: true
                //   });
                //   this.setUpQuestionTypes();
                //   return;
                // }
                _imModel$getDispatchD = _im2.default.getDispatchData(), dispatchState = _imModel$getDispatchD.dispatchState, from = _imModel$getDispatchD.from, dispatchRoomId = _imModel$getDispatchD.dispatchRoomId;

                if (!(dispatchState === _dispatch.DISPATCH_STATE.dispatching && from === 'customer-bot')) {
                  _context2.next = 7;
                  break;
                }

                _index2.default.showToast({
                  title: '您有咨询消息正在处理中，请稍等...',
                  icon: 'none',
                  mask: true
                });
                _this.checkoutConsultRoom = false;
                return _context2.abrupt("return");

              case 7:
                _this.checkoutConsultRoom = true;

                if (!(dispatchState === _dispatch.DISPATCH_STATE.dispatching)) {
                  _context2.next = 12;
                  break;
                }

                console.log('checkout dispatching room', dispatchRoomId, from);
                _im2.default.enterRoom(dispatchRoomId);
                return _context2.abrupt("return", dispatchRoomId);

              case 12:
                _context2.next = 14;
                return _index4.default.adviser.getAdvisorRoomInfo({
                  pattern: 'B',
                  retailId: _auth2.default.getUserSession().userId
                });

              case 14:
                _context2.t0 = _context2.sent;

                if (_context2.t0) {
                  _context2.next = 17;
                  break;
                }

                _context2.t0 = {};

              case 17:
                advisorRoomData = _context2.t0;

                console.log('get dispatch advisor room: ', advisorRoomData.roomId);

                if (advisorRoomData.roomId) {
                  _context2.next = 23;
                  break;
                }

                _index2.default.showToast({
                  title: '咨询失败，请重试',
                  icon: 'none',
                  mask: true
                });
                _this.checkoutConsultRoom = false;
                return _context2.abrupt("return");

              case 23:
                if (_this.state.hasMobile || forceConsult) {
                  _im2.default.enterRoom(advisorRoomData.roomId);
                } else {
                  _this.checkoutConsultRoom = false;
                }
                return _context2.abrupt("return", advisorRoomData.roomId);

              case 25:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }));

      return function (_x) {
        return _ref3.apply(this, arguments);
      };
    }(), _this.myCatchTouch = function () {
      console.log('stop user scroll it!');
      return;
    }, _this.handleSubmit = function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(e) {
        var roomId, userSession, openId;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _this.handleConsult();

              case 2:
                roomId = _context3.sent;

                if (roomId) {
                  _context3.next = 5;
                  break;
                }

                return _context3.abrupt("return");

              case 5:
                userSession = _auth2.default.getUserSession();
                openId = userSession.openId;

                console.log('formid', e.detail.formId);
                console.log('openid', openId);
                console.log('roomId', roomId);
                _index4.default.report.reportFormId(roomId, 'adviser', e.detail.formId, openId, userSession.userId).catch(function (error) {
                  console.log('reportFormId error', error);
                });

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, _this2);
      }));

      return function (_x2) {
        return _ref4.apply(this, arguments);
      };
    }(), _this.onGetPhoneMumber = function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(e) {
        var _e$target, iv, encryptedData, _ref6, code;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                console.log('phone e', e);

                if (e.target.encryptedData) {
                  _context5.next = 4;
                  break;
                }

                if (_ext2.default.CUSTOM_CONFIG.FEATURE_FORCE_CONSULTING_WITH_PHONE) {
                  _index2.default.showModal({
                    content: '拒绝授权，您将无法正常使用我们的功能',
                    showCancel: false
                  });
                } else {
                  _this.handleConsult(true);
                }
                return _context5.abrupt("return");

              case 4:
                _e$target = e.target, iv = _e$target.iv, encryptedData = _e$target.encryptedData;
                _context5.prev = 5;
                _context5.next = 8;
                return _index4.default.report.reportWxPhome({
                  appId: _ext2.default.APP_ID,
                  code: _this.state.code,
                  encryptedData: encryptedData,
                  iv: iv
                });

              case 8:
                _context5.next = 19;
                break;

              case 10:
                _context5.prev = 10;
                _context5.t0 = _context5["catch"](5);

                _index2.default.showToast({
                  title: '上报手机号失败，请重试',
                  icon: 'none',
                  mask: true
                });
                _context5.next = 15;
                return _index2.default.login();

              case 15:
                _ref6 = _context5.sent;
                code = _ref6.code;

                _this.setState({ code: code });
                return _context5.abrupt("return");

              case 19:
                _this.setState({ hasMobile: true }, _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                  return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          _this.handleConsult();
                          _context4.next = 3;
                          return _auth2.default.reFreshUserInfo();

                        case 3:
                        case "end":
                          return _context4.stop();
                      }
                    }
                  }, _callee4, _this2);
                })));
                // console.log('res', res);
                // this.$store.dispatch('getUserMobile', {
                //   code: this.code,
                //   encryptedData,
                //   iv,
                // }).then(mobile => {
                //   if (!mobile) return;
                //   this.$router.push(`/pages/activity/ActivityJoin?id=${this.id}&phone=${mobile}`);
                // })

              case 20:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, _this2, [[5, 10]]);
      }));

      return function (_x3) {
        return _ref5.apply(this, arguments);
      };
    }(), _this.enterSearch = function () {
      _index2.default.navigateTo({
        url: '/pages/globalsearch/index'
      });
    }, _this.customComponents = ["RoomItem"], _temp), _possibleConstructorReturn(_this, _ret);
  }
  // isShow = false;


  _createClass(Home, [{
    key: "_constructor",
    value: function _constructor() {
      _get(Home.prototype.__proto__ || Object.getPrototypeOf(Home.prototype), "_constructor", this).call(this);
      this.state = {
        // rooms: [],
        basicRooms: [],
        scrollHeight: 0,
        hasMobile: false,
        isInit: false,
        isAuth: true
        // pageTitle: '消息'
      };
      this.$$refs = [];
    }
  }, {
    key: "componentWillMount",
    value: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _index2.default.showLoading({ title: '加载中' });
                console.log('HOME PAGE: componentWillMount');
                console.log(this.$router.params);
                // console.log('this.props.navigation: ', this.props.navigation);
                // const curPage = this.props.navigation.curPage;
                // // console.log(curPage.params.roomId);
                // Taro.showLoading({ title: '加载中' });
                // if (curPage.params && curPage.params.roomId) {
                //   imModel.on('ROOM', this.handleRoom);
                //   const rooms = this.state.basicRooms.filter(e => !e.isArchive);
                //   const hasEnteringRoom = rooms.find(e => e.id == curPage.params.roomId);
                //   console.log('hasEnteringRoom: ', hasEnteringRoom);
                //   if (hasEnteringRoom) {
                //     imModel.enterRoom(curPage.params.roomId);
                //   } else {
                //     // console.log('curPage.params.roomId: ', curPage.params.roomId);
                //     const room = await getChannelDetail(curPage.params.roomId);
                //     console.log('getChannelDetail: ', room);
                //     store.dispatch(addViewingRoom(room));
                //     // console.log('store.dispatch(addViewingRoom(room))');
                //     // console.log(store.viewingRoom);
                //     Taro.navigateTo({
                //       url: '/pages/join-room/index',
                //     });
                //   }
                // }
                this.initBasicInfo();
                if (_im2.default.isReady) {
                  this.initRoomInfo();
                }
                // Taro.showLoading({ title: '加载中' });

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function componentWillMount() {
        return _ref8.apply(this, arguments);
      }

      return componentWillMount;
    }()
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      console.log('HOME PAGE: componentWillUnmount');
      var isAuth = _auth2.default.isAuth;
      this.setState({ isAuth: isAuth });
      _index2.default.onAppShow(function (options) {
        console.log('Taro.onAppShow');
        console.log(options);
      });
    }
  }, {
    key: "initChannelShare",
    value: function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var curPage, basicRooms, hasEnteringRoom, room;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                console.log('this.props.navigation: ', this.props.navigation);
                curPage = this.props.navigation.curPage;

                _index7.default.dispatch((0, _navigation.changeParams)(curPage.url));
                // console.log(curPage.params.enterRoom);

                if (!(curPage.params && curPage.params.enterRoom)) {
                  _context7.next = 19;
                  break;
                }

                basicRooms = this.state.basicRooms;
                hasEnteringRoom = basicRooms.find(function (e) {
                  return e.id == curPage.params.enterRoom;
                });

                console.log('hasEnteringRoom: ', hasEnteringRoom);

                if (!hasEnteringRoom) {
                  _context7.next = 11;
                  break;
                }

                _im2.default.enterRoom(curPage.params.enterRoom);
                _context7.next = 18;
                break;

              case 11:
                _context7.next = 13;
                return (0, _api.getChannelDetail)(curPage.params.enterRoom);

              case 13:
                room = _context7.sent;

                room.fcid = curPage.params.fcid;
                console.log('getChannelDetail: ', room);
                _index7.default.dispatch((0, _room.addViewingRoom)(room));
                // console.log('store.dispatch(addViewingRoom(room))');
                // console.log(store.viewingRoom);
                // Taro.navigateTo({
                //   url: '/pages/join-room/index',
                // });
                _index9.default.navigateTo(_navigation2.NAV_PAGES.JOINROOM);

              case 18:
                (0, _globaldata.set)('hasEnterRoom', true);
                // imModel.off('ROOM', this.onceRoomEvent);

              case 19:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function initChannelShare() {
        return _ref9.apply(this, arguments);
      }

      return initChannelShare;
    }()
  }, {
    key: "onceRoomEvent",
    value: function () {
      var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(e) {
        var basicRooms, hasEnteringRoom, room;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                basicRooms = e.basicRooms;
                hasEnteringRoom = basicRooms.find(function (e) {
                  return e.id == curPage.params.roomId;
                });

                console.log('hasEnteringRoom: ', hasEnteringRoom);

                if (!hasEnteringRoom) {
                  _context8.next = 7;
                  break;
                }

                _im2.default.enterRoom(curPage.params.roomId);
                _context8.next = 13;
                break;

              case 7:
                _context8.next = 9;
                return (0, _api.getChannelDetail)(curPage.params.roomId);

              case 9:
                room = _context8.sent;

                console.log('getChannelDetail: ', room);
                _index7.default.dispatch((0, _room.addViewingRoom)(room));
                // console.log('store.dispatch(addViewingRoom(room))');
                // console.log(store.viewingRoom);
                _index2.default.navigateTo({
                  url: '/pages/join-room/index'
                });

              case 13:
                _im2.default.off('ROOM', this.onceRoomEvent);

              case 14:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function onceRoomEvent(_x4) {
        return _ref10.apply(this, arguments);
      }

      return onceRoomEvent;
    }()
  }, {
    key: "componentDidShow",
    value: function () {
      var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(args) {
        var _this3 = this;

        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _index2.default.showLoading({ title: '加载中' });
                console.log('HOME PAGE: componentDidShow');
                if ((0, _globaldata.get)('firstRenderHome') && _im2.default.isReady) {
                  this.initRoomInfo();
                }
                if (_im2.default.isReady) {
                  _im2.default.updateUnreadBadge();
                }
                _index2.default.hideLoading();
                setTimeout(function () {
                  _this3.initChannelShare();
                }, 0);
                (0, _globaldata.set)('showRoomList', true);
                (0, _globaldata.set)('firstRenderHome', false);

              case 8:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function componentDidShow(_x5) {
        return _ref11.apply(this, arguments);
      }

      return componentDidShow;
    }()
  }, {
    key: "componentDidHide",
    value: function componentDidHide() {
      console.log('HOME PAGE: componentDidHide');
      // this.isShow = false;
      this.setState({
        showList: false
      });
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

      console.log('HOME PAGE BEGIN RENDER');
      var _state = this.__state,
          scrollHeight = _state.scrollHeight,
          hasMobile = _state.hasMobile,
          basicRooms = _state.basicRooms,
          isAuth = _state.isAuth;

      var showList = (0, _globaldata.get)('showRoomList');
      console.log('============showList=========', showList);
      var fakeBasicRoom = [{
        id: 'smartRoom',
        name: '智能客服',
        avatar: _ext2.default.BASE_URL + "/statics/images/message/smart_bot.png",
        unread: 0,
        lastMessage: ''
      }, {
        id: 'msg-bot',
        name: '通知助手',
        avatar: _ext2.default.BASE_URL + "/statics/images/message/notification_assistant.png",
        unread: 0,
        lastMessage: ''
      }];
      var rooms = isAuth ? basicRooms.filter(function (e) {
        return !e.isArchive && !e.isDelete;
      }) : fakeBasicRoom;
      console.log('HOME PAGE AFTER RENDER');
      console.log(rooms);
      var anonymousState__temp = showList ? (0, _index.internal_inline_style)({ height: scrollHeight + "px" }) : null;
      var loopArray0 = showList ? rooms.map(function (room, _anonIdx) {
        room = {
          $original: (0, _index.internal_get_original)(room)
        };
        var $compid__0 = (0, _index.genCompid)(__prefix + "DwiNUROAIS" + _anonIdx);
        showList && _index.propsManager.set({
          "room": room.$original
        }, $compid__0);
        return {
          $compid__0: $compid__0,
          $original: room.$original
        };
      }) : [];
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp,
        loopArray0: loopArray0,
        showList: showList,
        rooms: rooms
      });
      return this.__state;
    }
  }]);

  return Home;
}(_index.Component)) || _class);
Home.$$events = [];
Home.$$componentPath = "pages/home/index";
exports.default = Home;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Home, true));