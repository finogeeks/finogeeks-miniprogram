"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dec, _class;
// import { throttle } from '@/utils/util';
// import throttle from 'lodash.throttle';


var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _cloneDeep = require("../../utils/lodash-local/clone-deep.js");

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _isEqual = require("../../utils/lodash-local/is-equal.js");

var _isEqual2 = _interopRequireDefault(_isEqual);

var _throttle = require("../../utils/lodash-local/throttle.js");

var _throttle2 = _interopRequireDefault(_throttle);

var _index3 = require("../../service/index.js");

var _index4 = _interopRequireDefault(_index3);

var _ext = require("../../utils/ext.js");

var _ext2 = _interopRequireDefault(_ext);

var _file = require("../../utils/file.js");

var _store = require("../../utils/store.js");

var _index5 = require("../../npm/@tarojs/redux/index.js");

var _dispatch = require("../../constants/dispatch.js");

var _index6 = require("../../router/index.js");

var _index7 = _interopRequireDefault(_index6);

var _navigation = require("../../constants/navigation.js");

var _room = require("../../constants/room.js");

var _auth = require("../../model/auth.js");

var _auth2 = _interopRequireDefault(_auth);

var _im = require("../../model/im.js");

var _im2 = _interopRequireDefault(_im);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LOADING_FLAG = false;

var shareImage = "/assets/logo2.png";
// import mockData from './mock'

var INPUT_HEIGHT = 36;
var FOOTER_HEIGHT = 50;
var HEADER_HEIGHT = 70;
var EMOJI_HEIGHT = 180;
var UTIL_HEIGHT = 110;
// const IPHONEX = "iPhone X";

var mapStateToProps = function mapStateToProps(_ref) {
  var navigation = _ref.navigation,
      user = _ref.user,
      detect = _ref.detect;

  console.log('room mapStateToProps');
  console.log(navigation);
  var style = navigation.style;

  var _ref2 = user.location || {},
      city = _ref2.city,
      district = _ref2.district;

  var needDetect = detect.needDetect;

  var userCity = city + district || null;
  console.log(style.headerHeight);
  return {
    navBarHeight: style.headerHeight,
    userCity: userCity,
    needDetect: needDetect
  };
};

var mapActionToProps = function mapActionToProps(dispatch) {
  return {
    changeName: function changeName(room) {
      dispatch(updateRoom(room));
    }
  };
};

var Room = (_dec = (0, _index5.connect)(mapStateToProps, mapActionToProps), _dec(_class = function (_BaseComponent) {
  _inherits(Room, _BaseComponent);

  function Room() {
    var _ref3,
        _this2 = this;

    var _temp, _this, _ret;

    _classCallCheck(this, Room);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref3 = Room.__proto__ || Object.getPrototypeOf(Room)).call.apply(_ref3, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "anonymousState__temp6", "anonymousState__temp7", "anonymousState__temp8", "anonymousState__temp9", "anonymousState__temp10", "anonymousState__temp11", "anonymousState__temp12", "anonymousState__temp13", "anonymousState__temp14", "loopArray1", "loopArray2", "$compid__6", "$compid__7", "$compid__8", "$compid__9", "$compid__10", "$compid__11", "$compid__12", "$compid__13", "canScrollY", "channelId", "video", "isLoading", "viewMsgId", "scrollTop", "loadingTimeline", "roomType", "ROOMTYPES", "questionType", "curTimeline", "input", "searchResult", "isBanSendMsg", "isArchive", "showMemberAt", "filtermembers", "showTypes", "inputFocus", "placeholder", "cursorPosition", "showEmoji", "showUtil", "isFullScreen", "room", "timeline", "platform", "windowHeight", "bottomHeight", "headerHeight", "footerHeight", "emojiHeight", "utilHeight", "inputHeight", "keyboardHeight", "radio", "showChannelActivity", "channelActivityImage", "activityDetail", "advisorInfo", "questionTypes", "dispatchInfo", "isSendingMsg", "hasMoreFront", "hasMoreBack", "curOrderId", "hasMobile", "showAddOne", "memberAtFilte", "atingMember", "userCity", "navBarHeight", "needDetect"], _this.config = {
      disableScroll: true,
      navigationBarTitleText: ''
      // navigationStyle: 'custom',
    }, _this.handleRoomUpdate = function (event) {
      var room = event.room;
      var roomId = _this.$router.params.roomId;

      if (room.id !== roomId) {
        return;
      }var oldRoom = _this.state.oldRoom || {};
      if ((0, _isEqual2.default)(room, oldRoom)) {
        return;
      }_this.setState({ room: room }, function () {
        if (room.name !== oldRoom.name) {
          _index2.default.setNavigationBarTitle({ title: room.name });
        };
        if (room.roomType !== oldRoom.roomType) {
          _this.handleRoomTypeChange(room.roomType);
        }
        if (!(0, _isEqual2.default)(room.orderInfo, oldRoom.orderInfo)) {
          _this.setState({ orderInfo: room.orderInfo });
        }
      });
    }, _this.handleDistpatch = function (event) {
      // console.log('event', event);
      var dispatchState = event.dispatchState,
          from = event.from,
          questionType = event.questionType;

      var dispatchInfo = {
        dispatchState: dispatchState,
        questionType: questionType,
        dispatchFrom: from
      };
      _this.setState({ dispatchInfo: dispatchInfo });
    }, _this.handleTimeline = function (_ref4) {
      var type = _ref4.type,
          timeline = _ref4.timeline,
          newMessage = _ref4.newMessage,
          paginateTimelie = _ref4.paginateTimelie;

      console.log('=======handleTimeline======');
      console.log(timeline);
      switch (type) {
        case 'NEW_MESSAGE':
        case 'MESSAGE_UPDATE':
          _this.setState({ timeline: [].concat(_toConsumableArray(timeline)) }, function () {
            if (type === 'NEW_MESSAGE') {
              setTimeout(function () {
                return _this.scrollToBottom();
              });
            }
          });
          break;
        default:
          break;
      }
    }, _this.initMobile = function () {
      var userInfo = _auth2.default.getUserInfo();
      var hasMobile = !!userInfo.mobile || !!(userInfo.accountData && userInfo.accountData.phone);
      _this.setState({ hasMobile: hasMobile });
    }, _this.initBasicInfo = function () {
      var userSession = (0, _store.getCacheSync)('userSession');
      // const questionTypes = getCacheSync('questionTypes') || [];
      var roomId = _this.$router.params.roomId;

      _this.leaveMsgUrl = "/packages/common/pages/leave-message/index?roomId=" + roomId;
      // this.setState({ questionTypes });
      _this.myId = userSession['userId'];
      _this.smartBotRoomId = _im2.default.getSmartBotRoomId();
      _this.smartBotRoomUrl = "/pages/room/index?roomId=" + _this.smartBotRoomId;
      _this.enterRoomTime = Date.now();
      _this.roomId = roomId;
    }, _this.initRoomInfo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var room, dispatchState;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.setState({
                hasMoreBack: true,
                hasMoreFront: true
              });
              room = _this.state.room || {
                roomType: '',
                orderInfo: {}
              };

              _im2.default.setReceipt(_this.roomId);
              dispatchState = _this.state.dispatchInfo.dispatchState;
              _context.t0 = room.roomType;
              _context.next = _context.t0 === _room.ROOMTYPES.smartBot ? 7 : _context.t0 === _room.ROOMTYPES.dispatch ? 8 : _context.t0 === _room.ROOMTYPES.advisor ? 9 : _context.t0 === _room.ROOMTYPES.channel ? 12 : 14;
              break;

            case 7:
              return _context.abrupt("break", 14);

            case 8:
              return _context.abrupt("break", 14);

            case 9:
              _context.next = 11;
              return _this.initAdvisorRoom(room.orderInfo.staffId);

            case 11:
              return _context.abrupt("break", 14);

            case 12:
              _this.initChannelRoom();
              return _context.abrupt("break", 14);

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this2);
    })), _this.initAdvisorRoom = function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(staffId) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", new Promise(function () {
                  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resolve) {
                    var staffUser, res, advisorInfo;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            staffUser = _im2.default.getUser(staffId);

                            _this.setState({ advisorInfo: {
                                avatar: staffUser.avatar,
                                name: staffUser.name
                              } });
                            _context2.next = 4;
                            return _index4.default.adviser.getAdvisorInfo({
                              retailId: _this.myId,
                              staffId: staffId
                            });

                          case 4:
                            res = _context2.sent;


                            if (!res) {
                              resolve(false);
                            }
                            advisorInfo = _extends({}, res, {
                              id: res.staffId,
                              avatar: staffUser.avatar,
                              name: staffUser.name
                            });

                            _this.setState({
                              advisorInfo: advisorInfo
                            }, function () {
                              return resolve(true);
                            });

                          case 8:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2, _this2);
                  }));

                  return function (_x2) {
                    return _ref7.apply(this, arguments);
                  };
                }()));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, _this2);
      }));

      return function (_x) {
        return _ref6.apply(this, arguments);
      };
    }(), _this.initDispatchRoom = function (dispatchState) {
      var questionTypes = (0, _store.getCacheSync)('questionTypes') || [];
      if (dispatchState === _dispatch.DISPATCH_STATE.close && questionTypes.length > 0) {
        _this.setState({
          showTypes: true
        });
      }
    }, _this.handleRoomTypeChange = function (roomType) {
      var _ref8 = _this.state.room || {
        orderInfo: {}
      },
          orderInfo = _ref8.orderInfo;

      if (roomType === _room.ROOMTYPES.advisor && !_this.state.advisorInfo.name) {
        console.log('!!!!!!!!!!!!room type change staffId: ', orderInfo.staffId);
        _this.initAdvisorRoom(orderInfo.staffId);
      }
    }, _this.handleReopenOrder = function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(lastMessage, staffId, roomId) {
        var res;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _index4.default.adviser.joinWorkOrderQueue({
                  pattern: 'B',
                  retailId: _this.myId,
                  staffId: staffId,
                  roomId: roomId,
                  question: JSON.stringify(lastMessage),
                  city: _this.props.userCity
                });

              case 2:
                res = _context4.sent;


                if (!res) {
                  // Taro.showToast({
                  //   title: "派单失败，请重试",
                  //   icon: "none",
                  //   mask: true
                  // });
                }
                return _context4.abrupt("return", res);

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, _this2);
      }));

      return function (_x3, _x4, _x5) {
        return _ref9.apply(this, arguments);
      };
    }(), _this.getScrollHeight = function () {
      var _this$state = _this.state,
          windowHeight = _this$state.windowHeight,
          footerHeight = _this$state.footerHeight,
          headerHeight = _this$state.headerHeight,
          input = _this$state.input,
          searchResult = _this$state.searchResult,
          bottomHeight = _this$state.bottomHeight,
          radio = _this$state.radio,
          keyboardHeight = _this$state.keyboardHeight;
      var navBarHeight = _this.props.navBarHeight;

      var _ref10 = _this.state.room || {},
          roomType = _ref10.roomType;

      var suggestion = input && searchResult ? searchResult.result.length * 88 : 0;
      var computedBottomHeight = keyboardHeight && _this.state.isFullScreen ? 0 : bottomHeight;
      // console.log('navBarHeight',navBarHeight);
      // let scrollViewHeight =
      //   windowHeight -
      //   navBarHeight * radio -
      //   footerHeight -
      //   computedBottomHeight -
      //   suggestion -
      //   keyboardHeight;
      var scrollViewHeight = windowHeight - footerHeight - computedBottomHeight - suggestion - keyboardHeight;

      if (roomType === _room.ROOMTYPES.advisor) {
        scrollViewHeight -= headerHeight;
      }
      console.log('======getScrollHeight======', scrollViewHeight);
      // console.log(computedBottomHeight, suggestion, radio);
      // console.log(windowHeight, navBarHeight, radio, footerHeight, computedBottomHeight, suggestion, keyboardHeight);
      // console.log(this.props);
      // console.log(this.windowHeight, footerHeight, headerHeight,bottom,suggestion, this.props.navBarHeight);
      return scrollViewHeight;
      // const systemInfo = Taro.getSystemInfoSync();
      // // Taro 暂未实现此功能
      // const actionButtonInfo = Taro.getMenuButtonBoundingClientRect();
      // const { statusBarHeight, windowWidth } = systemInfo;
      // let navHeight = (88 * windowWidth) / 750;
      // navHeight = navHeight < 44 ? 44 : navHeight;
      // const maxTitleWidth = (actionButtonInfo.left - windowWidth / 2) * 2;
      // const { windowHeight } = Taro.getSystemInfoSync();
      // const scrollHeight = windowHeight - navHeight - statusBarHeight - this.state.inputHeight;
      // return scrollHeight;
    }, _this.scrollToBottom = function () {
      var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(bottom) {
        var curTimeline, lastMessage, newViewMsgId, roomId;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                curTimeline = _this.state.timeline || null;

                if (!(!curTimeline || curTimeline.length === 0)) {
                  _context5.next = 3;
                  break;
                }

                return _context5.abrupt("return");

              case 3:
                lastMessage = curTimeline[curTimeline.length - 1];
                newViewMsgId = 'id' + ("" + lastMessage.id).replace(/[^\d]/g, '');

                console.log("~~~~~~~~~~~~newViewMsgId:" + newViewMsgId + "~~~~~~~~~~~~");
                if (newViewMsgId === _this.state.viewMsgId) {
                  _this.setState({ viewMsgId: '' }, function () {
                    return _this.setState({ viewMsgId: newViewMsgId });
                  });
                } else {
                  _this.setState({ viewMsgId: newViewMsgId });
                  roomId = _this.roomId;

                  _im2.default.setReceipt({ roomId: roomId });
                }

              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, _this2);
      }));

      return function (_x6) {
        return _ref11.apply(this, arguments);
      };
    }(), _this.sendTextMessage = (0, _throttle2.default)(function () {
      var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(text) {
        var _this$state2, input, isSendingMsg, _ref13, roomType, orderInfo, dispatchData, dispatchState, dispatchFrom, validateInput, validateText, textContent, queueRes, isDispatching, time, extend, orderId, _ref14, isSensitive;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _this$state2 = _this.state, input = _this$state2.input, isSendingMsg = _this$state2.isSendingMsg;
                _ref13 = _this.state.room || {
                  roomType: '',
                  orderInfo: {}
                }, roomType = _ref13.roomType, orderInfo = _ref13.orderInfo;

                if (!isSendingMsg) {
                  _context6.next = 4;
                  break;
                }

                return _context6.abrupt("return");

              case 4:
                _context6.prev = 4;

                _this.setState({ isSendingMsg: true });
                dispatchData = _im2.default.getDispatchData();
                dispatchState = dispatchData.dispatchState, dispatchFrom = dispatchData.from;
                validateInput = input && input.trim();
                validateText = typeof text === 'string' && text.trim();

                if (!(!validateInput && !validateText)) {
                  _context6.next = 13;
                  break;
                }

                _this.setState({ isSendingMsg: false });
                return _context6.abrupt("return");

              case 13:
                textContent = {
                  msgtype: 'm.text',
                  body: validateText || validateInput
                };
                // console.log('textContent', textContent);

                _context6.next = 16;
                return _this.checkNeedQueue(textContent);

              case 16:
                _context6.t0 = _context6.sent;

                if (_context6.t0) {
                  _context6.next = 19;
                  break;
                }

                _context6.t0 = {};

              case 19:
                queueRes = _context6.t0;
                isDispatching = dispatchState === 'DISPATCHING';
                // Mark: 由于部分性能较差的手机，清空了 input 之后依然会触发相同的 text input 事件，所以延迟 500 ms 清空

                time = _this.state.platform === 'android' ? 500 : 100;

                setTimeout(function () {
                  _this.setState({
                    input: '',
                    placeholder: ''
                  });
                }, time);
                extend = {};
                orderId = queueRes.orderId || orderInfo.orderId;

                if (orderId) {
                  extend.order_id = orderId;
                }
                if (isDispatching && dispatchFrom === 'customer-bot') {
                  extend.extra = {
                    stopBot: true
                  };
                }
                _context6.next = 29;
                return _index4.default.detect.detectSensitiveWord(validateText || validateInput);

              case 29:
                _ref14 = _context6.sent;
                isSensitive = _ref14.isSensitive;

                console.log('detectData: ', isSensitive);

                if (!(isSensitive && _this.props.needDetect)) {
                  _context6.next = 36;
                  break;
                }

                _index2.default.showToast({
                  title: '发送的内容含不合规信息',
                  icon: 'none',
                  mask: true
                });
                _context6.next = 38;
                break;

              case 36:
                _context6.next = 38;
                return _im2.default.sendTextMessage(_this.roomId, {
                  text: validateText || validateInput,
                  extend: extend
                });

              case 38:

                _this.setState({ isSendingMsg: false });

                if (dispatchState === _dispatch.DISPATCH_STATE.timeout && roomType === _room.ROOMTYPES.smartBot) {
                  _im2.default.closeDispatch();
                }
                _context6.next = 46;
                break;

              case 42:
                _context6.prev = 42;
                _context6.t1 = _context6["catch"](4);

                console.log(_context6.t1);
                _this.setState({ isSendingMsg: false });

              case 46:

                console.timeEnd('sendTextlocal');

              case 47:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, _this2, [[4, 42]]);
      }));

      return function (_x7) {
        return _ref12.apply(this, arguments);
      };
    }(), 200, { leading: true }), _this.sendConvoMessage = function () {
      var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(convoContent) {
        var isSendingMsg, _ref16, roomType, orderInfo, dispatchData, dispatchState, dispatchFrom, queueRes, extend, orderId;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                isSendingMsg = _this.state.isSendingMsg;
                _ref16 = _this.state.room || {
                  roomType: '',
                  orderInfo: {}
                }, roomType = _ref16.roomType, orderInfo = _ref16.orderInfo;

                if (!isSendingMsg) {
                  _context7.next = 4;
                  break;
                }

                return _context7.abrupt("return");

              case 4:
                _context7.prev = 4;

                _this.setState({ isSendingMsg: true });
                dispatchData = _im2.default.getDispatchData();
                dispatchState = dispatchData.dispatchState, dispatchFrom = dispatchData.from;
                _context7.next = 10;
                return _this.checkNeedQueue(convoContent);

              case 10:
                _context7.t0 = _context7.sent;

                if (_context7.t0) {
                  _context7.next = 13;
                  break;
                }

                _context7.t0 = {};

              case 13:
                queueRes = _context7.t0;
                extend = {};
                orderId = queueRes.orderId || orderInfo.orderId;

                if (orderId) {
                  extend.order_id = orderId;
                }
                _context7.next = 19;
                return _im2.default.sendConvoMessage(_this.roomId, _extends({}, convoContent, {
                  extend: extend
                }));

              case 19:

                _this.setState({ isSendingMsg: false });

                if (dispatchState === _dispatch.DISPATCH_STATE.timeout && roomType === _room.ROOMTYPES.smartBot) {
                  _im2.default.closeDispatch();
                }
                _context7.next = 27;
                break;

              case 23:
                _context7.prev = 23;
                _context7.t1 = _context7["catch"](4);

                console.log(_context7.t1);
                _this.setState({ isSendingMsg: false });

              case 27:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, _this2, [[4, 23]]);
      }));

      return function (_x8) {
        return _ref15.apply(this, arguments);
      };
    }(), _this.handleVideo = function (video) {
      _index7.default.navigateTo(_navigation.NAV_PAGES.MEDIA_PREVIEW, {
        type: 'video',
        url: encodeURIComponent(video.url),
        poster: encodeURIComponent(video.poster),
        name: video.name
      });
    }, _this.handleLink = function (url) {
      _index7.default.navigateTo(url);
    }, _this.handleLocation = function (data) {
      _index2.default.openLocation(data);
    }, _this.handleMessagePress = function () {
      var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(message) {
        var itemList, msgtype, diff, res, action;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                itemList = [];
                msgtype = message.content.msgtype;

                if (!(msgtype === 'fc.convo.ui')) {
                  _context8.next = 4;
                  break;
                }

                return _context8.abrupt("return");

              case 4:
                if (msgtype === 'm.text') {
                  itemList.push('复制');
                }

                diff = Math.round((new Date().getTime() - message.time) / 60000.0);

                if (diff < 3 && message.status === 'unknown' && message.user.id === _this.myId) {
                  itemList.push('撤回');
                }

                if (message.status === 'error') {
                  itemList.push('重新发送');
                }

                if (!(itemList.length > 0)) {
                  _context8.next = 13;
                  break;
                }

                _context8.next = 11;
                return _index2.default.showActionSheet({
                  itemList: itemList
                });

              case 11:
                res = _context8.sent;

                if (res) {
                  action = itemList[res.tapIndex];

                  if (action === '复制') {
                    _this.handleCopy(message);
                  } else if (action === '撤回') {
                    _this.handleRedact(message);
                  } else if (action === '重新发送') {
                    _this.handleResend(message);
                  }
                }

              case 13:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, _this2);
      }));

      return function (_x9) {
        return _ref17.apply(this, arguments);
      };
    }(), _this.handleCopy = function () {
      var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(message) {
        var res;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;
                _context9.next = 3;
                return _index2.default.setClipboardData({
                  data: message.content.body
                });

              case 3:
                res = _context9.sent;

                if (res) {
                  _index2.default.showToast({
                    title: '已复制到粘贴板',
                    icon: 'none',
                    mask: true
                  });
                }
                _context9.next = 10;
                break;

              case 7:
                _context9.prev = 7;
                _context9.t0 = _context9["catch"](0);

                _index2.default.showToast({
                  title: '复制失败',
                  icon: 'none',
                  mask: true
                });

              case 10:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, _this2, [[0, 7]]);
      }));

      return function (_x10) {
        return _ref18.apply(this, arguments);
      };
    }(), _this.handleRedact = function () {
      var _ref19 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(message) {
        var res;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.prev = 0;
                _context10.next = 3;
                return _im2.default.redactMessage(_this.roomId, message.id);

              case 3:
                res = _context10.sent;

                if (!res) {
                  _index2.default.showToast({
                    title: '撤回失败',
                    icon: 'none',
                    mask: true
                  });
                }
                _context10.next = 10;
                break;

              case 7:
                _context10.prev = 7;
                _context10.t0 = _context10["catch"](0);

                _index2.default.showToast({
                  title: '撤回失败',
                  icon: 'none',
                  mask: true
                });

              case 10:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, _this2, [[0, 7]]);
      }));

      return function (_x11) {
        return _ref19.apply(this, arguments);
      };
    }(), _this.handleResend = function () {
      var _ref20 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(message) {
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.prev = 0;
                _context11.next = 3;
                return _im2.default.resendMessage(_this.roomId, message.id);

              case 3:
                _context11.next = 8;
                break;

              case 5:
                _context11.prev = 5;
                _context11.t0 = _context11["catch"](0);

                console.log(_context11.t0);

              case 8:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, _this2, [[0, 5]]);
      }));

      return function (_x12) {
        return _ref20.apply(this, arguments);
      };
    }(), _this.handleMoreTimeLine = function () {
      var _ref21 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(dir) {
        var roomId, res, lastMessage, canPaginateFront, canPaginateBack, timeline, newViewMsgId;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                console.log('this.state.loadingTimeline', _this.state.loadingTimeline);
                console.log('this.state.hasMoreFront', _this.state.hasMoreFront);
                console.log('this.state.hasMoreBack', _this.state.hasMoreBack);
                console.log('LOADING_FLAG:  ', LOADING_FLAG);

                if (!LOADING_FLAG) {
                  _context12.next = 6;
                  break;
                }

                return _context12.abrupt("return");

              case 6:
                // Taro.showLoading({ title: '加载中' });
                LOADING_FLAG = true;
                // Taro.showModal({
                //   title: 'handleMoreTimeLine',
                // });

                // if (LOADING_FLAG) return;
                // LOADING_FLAG = true;

                if (!(_this.state.loadingTimeline || dir === 'BACKWORDS' && !_this.state.hasMoreBack || dir === 'FORWARDS' && !_this.state.hasMoreFront)) {
                  _context12.next = 10;
                  break;
                }

                LOADING_FLAG = false;
                return _context12.abrupt("return");

              case 10:
                ;
                _this.setState({ loadingTimeline: true });
                roomId = _this.roomId;
                _context12.next = 15;
                return _im2.default.loadMoreTimeline(roomId, dir);

              case 15:
                res = _context12.sent;

                if (res) {
                  _context12.next = 19;
                  break;
                }

                _this.setState({ loadingTimeline: false });
                return _context12.abrupt("return");

              case 19:
                lastMessage = dir === 'BACKWORDS' ? _this.state.timeline[0] : _this.state.timeline[_this.state.timeline.length - 1];
                // console.log('lastMessage', lastMessage);

                canPaginateFront = res.canPaginateFront, canPaginateBack = res.canPaginateBack, timeline = res.timeline;
                newViewMsgId = 'id' + ("" + lastMessage.id).replace(/[^\d]/g, '');

                console.log('newViewMsgId:', newViewMsgId);
                console.log('this.state.viewMsgId:', _this.state.viewMsgId);
                console.log('timeline:', timeline);
                // this.state.timeline.unshift(...timeline);
                _this.setState({
                  canScrollY: false
                }, function () {
                  var _this$setState;

                  _this.setState((_this$setState = {
                    viewMsgId: newViewMsgId,
                    timeline: (0, _cloneDeep2.default)(timeline),
                    hasMoreBack: canPaginateBack,
                    hasMoreFront: canPaginateFront
                  }, _defineProperty(_this$setState, "viewMsgId", newViewMsgId), _defineProperty(_this$setState, "loadingTimeline", false), _this$setState));
                });
                setTimeout(function () {
                  _this.setState({
                    viewMsgId: '',
                    canScrollY: true
                  }, function () {
                    setTimeout(function () {
                      _this.setState({
                        viewMsgId: newViewMsgId
                      });
                      LOADING_FLAG = false;
                    }, 1000);
                  });
                }, 200);

              case 27:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, _this2);
      }));

      return function (_x13) {
        return _ref21.apply(this, arguments);
      };
    }(), _this.handleInputArea = function () {
      console.log('input area', FOOTER_HEIGHT * _this.state.radio);
      _this.setState({
        showUtil: false,
        showEmoji: false,
        footerHeight: FOOTER_HEIGHT * _this.state.radio
      });
    }, _this.handleInput = function (event) {
      var value = event.detail.value;

      console.log('handleInput: ', value);
      if (value.substring(value.length - 1) === '@') {
        _this.setState({
          showMemberAt: true,
          atingMember: true
          // memberAtFilte: value.replace('@', '')
        });
      }
      if (_this.state.atingMember) {
        _this.setState({
          memberAtFilte: value.replace('@', '')
        });
        console.log('memberAtFilte');
        console.log(_this.state.memberAtFilte, value.replace('@', ''));
      } else {
        _this.setState({
          memberAtFilte: ''
        });
      }
      var dispatchInfo = _this.state.dispatchInfo;
      var roomType = _this.state.room.roomType;

      console.log('~~~~~~~~handleInput~~~~this.state.inputFocus~~~~~~', _this.state.inputFocus);
      // Mark: 安卓发送消息之后会触发一次旧的消息，即使设置了 input 为空
      if (!_this.state.inputFocus) {
        return;
      }
      _this.setState({
        input: value
      });
    }, _this.handleToggleUtil = function () {
      var utilHeight = _this.state.utilHeight;

      if (_this.state.showUtil) {
        _this.handleInputArea();
      } else {
        _this.setState({
          showUtil: true,
          showEmoji: false,
          footerHeight: FOOTER_HEIGHT * _this.state.radio + utilHeight
        }, function () {
          _this.scrollToBottom(true);
        });
      }
    }, _this.handleShowEmoji = function () {
      var emojiHeight = _this.state.emojiHeight;

      if (!_this.state.showEmoji) {
        _this.setState({
          showUtil: false,
          showEmoji: true,
          footerHeight: FOOTER_HEIGHT * _this.state.radio + emojiHeight
        }, function () {
          setTimeout(function () {
            _this.scrollToBottom(true);
          });
        });
      }
    }, _this.handleHideEmoji = function () {
      if (_this.state.showEmoji) {
        _this.handleInputArea();
        _this.handleInputFocus();
      }
    }, _this.handleEmojiSelect = function (emoji) {
      console.log("~~~~~~~~~~~~~~handleEmojiSelect~~~~~~~~~~~~~", _this.state.input, _this.state.input.trim());
      _this.setState({
        input: "" + _this.state.input.trim() + emoji + " "
      });
    }, _this.handleConvo = (0, _throttle2.default)(function () {
      var _ref23 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(_ref22) {
        var widget = _ref22.widget,
            content = _ref22.content;
        var dispatchInfo, dispatchState, dispatchFrom, type, title, params, action, value, href, clickable, roomId, queueRes, reg, result, userSession;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                dispatchInfo = _this.state.dispatchInfo;
                dispatchState = dispatchInfo.dispatchState, dispatchFrom = dispatchInfo.dispatchFrom;
                type = widget.type, title = widget.title, params = widget.params;
                action = params.action, value = params.value, href = params.href, clickable = params.clickable;

                // console.log('widget', widget);
                // console.log('content', content);

                roomId = _this.roomId;
                queueRes = null;

                if (!(type === 'radioButton' && !clickable)) {
                  _context13.next = 8;
                  break;
                }

                return _context13.abrupt("return");

              case 8:
                if (!(type === 'button')) {
                  _context13.next = 25;
                  break;
                }

                _context13.t0 = value;
                _context13.next = _context13.t0 === 'leaveMsg' ? 12 : _context13.t0 === 'switchCustomerService' ? 14 : _context13.t0 === 'unsolved' ? 24 : _context13.t0 === 'ok' ? 24 : 24;
                break;

              case 12:
                _index7.default.navigateTo(_navigation.NAV_PAGES.LEAVE_MESSAGE, { roomId: roomId });
                return _context13.abrupt("break", 25);

              case 14:
                if (!(dispatchState === _dispatch.DISPATCH_STATE.dispatching)) {
                  _context13.next = 17;
                  break;
                }

                _index2.default.showToast({
                  title: '您有咨询消息正在处理中，请稍等...',
                  icon: 'none',
                  mask: true
                });
                return _context13.abrupt("return");

              case 17:
                _context13.next = 19;
                return _this.handleQueue({
                  msgtype: 'm.text',
                  body: widget.params.payload.question || ''
                }, 'customer-bot');

              case 19:
                queueRes = _context13.sent;

                _this.setState({ curOrderId: queueRes.orderId });
                _context13.next = 23;
                return _index4.default.adviser.addDispatchQuestion({
                  pattern: 'B',
                  orderId: queueRes.orderId,
                  question: JSON.stringify({
                    msgtype: 'm.text',
                    body: widget.params.payload.question || '',
                    order_id: queueRes.orderId
                  } || {})
                });

              case 23:
                return _context13.abrupt("break", 25);

              case 24:
                return _context13.abrupt("break", 25);

              case 25:
                if (!(type === 'footer')) {
                  _context13.next = 35;
                  break;
                }

                _context13.t1 = title;
                _context13.next = _context13.t1 === '回复详情' ? 29 : _context13.t1 === '换一批' ? 33 : 34;
                break;

              case 29:
                reg = /(\w*)$/gi;
                result = href && href.match(reg);

                if (result && result[0]) {
                  _index7.default.navigateTo(_navigation.NAV_PAGES.MESSAGE_DETAIL, {
                    orderId: result[0]
                  });
                }
                return _context13.abrupt("break", 35);

              case 33:
                return _context13.abrupt("break", 35);

              case 34:
                return _context13.abrupt("break", 35);

              case 35:
                if (!(type === 'item')) {
                  _context13.next = 43;
                  break;
                }

                userSession = _auth2.default.getUserSession() || {};
                _context13.t2 = action;
                _context13.next = _context13.t2 === 'href' ? 40 : 43;
                break;

              case 40:
                console.log('url', href + "&jwt=" + userSession.jwt);
                _index2.default.navigateTo({
                  url: "/packages/common/pages/webview/index?url=" + encodeURIComponent(href + "&jwt=" + userSession.jwt)
                });
                return _context13.abrupt("break", 43);

              case 43:

                if (type === 'radioButton' && clickable) {
                  _this.handleRadioClick(widget, content);
                }

                if (action === 'reply' || action === 'sendConvReply') {
                  if (dispatchState === _dispatch.DISPATCH_STATE.dispatching && type === 'item' && dispatchFrom === 'customer-bot') {
                    _this.sendTextMessage(widget.title);
                  } else {
                    _im2.default.sendConvoReplyMessage(roomId, {
                      originContent: queueRes ? _extends({}, content, { orderId: queueRes.orderId }) : content,
                      reply: widget,
                      hide: type === 'radioButton',
                      extend: {
                        stopBot: dispatchState === _dispatch.DISPATCH_STATE.dispatching && dispatchFrom === 'customer-bot'
                      }
                    });
                  }
                }

              case 45:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, _this2);
      }));

      return function (_x14) {
        return _ref23.apply(this, arguments);
      };
    }(), 300), _this.handleRadioClick = function () {
      var _ref24 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(widget, content) {
        var params, value, payload, orderId, advisorInfo, roomId, staffId, msgid, userInfo, retailId;
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                params = widget.params;
                value = params.value, payload = params.payload;
                orderId = payload.orderId;
                advisorInfo = _this.state.advisorInfo;
                roomId = _this.roomId;
                staffId = advisorInfo.staffId;
                msgid = content.msgid;
                userInfo = _auth2.default.getUserInfo();
                retailId = userInfo.retailId;
                _context14.next = 11;
                return _index4.default.adviser.sendEvaluation({
                  orderId: orderId,
                  roomId: roomId,
                  staffId: staffId,
                  pattern: 'B',
                  score: parseInt(value),
                  note: '',
                  retailId: retailId
                });

              case 11:
                _context14.next = 13;
                return _index4.default.adviser.sendEvalMsg({
                  roomId: roomId,
                  msgId: msgid,
                  value: value,
                  orderId: orderId,
                  appType: 'retail',
                  staffId: staffId
                });

              case 13:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, _this2);
      }));

      return function (_x15, _x16) {
        return _ref24.apply(this, arguments);
      };
    }(), _this.handleQueue = function () {
      var _ref25 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(question) {
        var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'dispatch-bot';
        var userInfo, retailId, location, res;
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                userInfo = _auth2.default.getUserInfo();
                retailId = userInfo.retailId;
                location = null;
                _context15.prev = 3;
                _context15.next = 6;
                return _index2.default.getLocation();

              case 6:
                location = _context15.sent;
                _context15.next = 11;
                break;

              case 9:
                _context15.prev = 9;
                _context15.t0 = _context15["catch"](3);

              case 11:
                _context15.next = 13;
                return _index4.default.adviser.joinWorkOrderQueue({
                  pattern: 'B',
                  retailId: retailId,
                  from: from,
                  roomId: _this.roomId,
                  question: JSON.stringify(question || {}),
                  location: location,
                  questionType: _this.state.dispatchInfo.questionType,
                  city: _this.props.userCity
                });

              case 13:
                res = _context15.sent;

                if (res) {
                  _context15.next = 16;
                  break;
                }

                return _context15.abrupt("return", false);

              case 16:
                _this.setState({ curOrderId: res.orderId });
                return _context15.abrupt("return", res);

              case 18:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, _this2, [[3, 9]]);
      }));

      return function (_x18) {
        return _ref25.apply(this, arguments);
      };
    }(), _this.handleToolAction = function () {
      var _ref26 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(action) {
        var type, content, queueRes, roomId;
        return regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                type = action.type, content = action.content;
                queueRes = null;
                _context16.t0 = type;
                _context16.next = _context16.t0 === 'leave-message' ? 5 : _context16.t0 === 'image' ? 8 : _context16.t0 === 'location' ? 12 : 16;
                break;

              case 5:
                roomId = _this.roomId;

                _index7.default.navigateTo(_navigation.NAV_PAGES.LEAVE_MESSAGE, { roomId: roomId });
                return _context16.abrupt("break", 17);

              case 8:
                _context16.next = 10;
                return _this.handleImage(content);

              case 10:
                queueRes = _context16.sent;
                return _context16.abrupt("break", 17);

              case 12:
                _context16.next = 14;
                return _this.handleChooseLocation();

              case 14:
                queueRes = _context16.sent;
                return _context16.abrupt("break", 17);

              case 16:
                return _context16.abrupt("break", 17);

              case 17:
                return _context16.abrupt("return", queueRes);

              case 18:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, _this2);
      }));

      return function (_x19) {
        return _ref26.apply(this, arguments);
      };
    }(), _this.handleAdvisorDetail = function () {
      var id = _this.state.advisorInfo.staffId;
      // wxRouter.navigateTo(NAV_PAGES.ADVISOR, { staffId: id });

      var cRouter = _index2.default.getApp().globalData.cRouter;

      cRouter.navigateTo({
        name: 'STUDIO_STAFF',
        query: { fcid: id }
      });
    }, _this.handleCloseOrder = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17() {
      var roomId, _ref28, orderInfo, retailId, staffId, orderId, res;

      return regeneratorRuntime.wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              roomId = _this.roomId;
              _ref28 = _this.state.room || {
                roomType: '',
                orderInfo: {}
              }, orderInfo = _ref28.orderInfo;
              retailId = orderInfo.retailId, staffId = orderInfo.staffId, orderId = orderInfo.orderId;
              _context17.next = 5;
              return _index4.default.adviser.closeWorkOrder({
                retailId: retailId,
                staffId: staffId,
                orderId: orderId,
                roomId: roomId,
                pattern: 'B'
              });

            case 5:
              res = _context17.sent;

              if (!res) {
                _context17.next = 9;
                break;
              }

              _context17.next = 9;
              return _index4.default.adviser.sendEvalMsg({
                roomId: roomId,
                orderId: orderId,
                appType: 'retail',
                staffId: staffId
              });

            case 9:
            case "end":
              return _context17.stop();
          }
        }
      }, _callee17, _this2);
    })), _this.closeSelectModal = function () {
      _this.setState({
        showTypes: false
      });
    }, _this.onSelectType = function () {
      var _ref29 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(type, e) {
        var _e$target, iv, encryptedData, _ref30, code;

        return regeneratorRuntime.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                console.log('type', type);
                console.log('phone e', e);
                console.log('this.state.code', _this.state.code);

                if (e.target.encryptedData) {
                  _context19.next = 6;
                  break;
                }

                if (_ext2.default.CUSTOM_CONFIG.FEATURE_FORCE_CONSULTING_WITH_PHONE) {
                  _index2.default.showModal({
                    content: '拒绝授权，您将无法正常使用我们的功能',
                    showCancel: false
                  });
                } else {
                  _this.handleQuestionType(type);
                }
                return _context19.abrupt("return");

              case 6:
                _e$target = e.target, iv = _e$target.iv, encryptedData = _e$target.encryptedData;
                _context19.prev = 7;
                _context19.next = 10;
                return _index4.default.report.reportWxPhome({
                  appId: _ext2.default.APP_ID,
                  code: _this.state.code,
                  encryptedData: encryptedData,
                  iv: iv
                });

              case 10:
                _context19.next = 21;
                break;

              case 12:
                _context19.prev = 12;
                _context19.t0 = _context19["catch"](7);

                _index2.default.showToast({
                  title: '上报手机号失败，请重试',
                  icon: 'none',
                  mask: true
                });
                _context19.next = 17;
                return _index2.default.login();

              case 17:
                _ref30 = _context19.sent;
                code = _ref30.code;

                _this.setState({ code: code });
                return _context19.abrupt("return");

              case 21:
                _this.setState({ hasMobile: true }, _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18() {
                  return regeneratorRuntime.wrap(function _callee18$(_context18) {
                    while (1) {
                      switch (_context18.prev = _context18.next) {
                        case 0:
                          _this.handleQuestionType(type);
                          _context18.next = 3;
                          return _auth2.default.reFreshUserInfo();

                        case 3:
                        case "end":
                          return _context18.stop();
                      }
                    }
                  }, _callee18, _this2);
                })));

              case 22:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, _this2, [[7, 12]]);
      }));

      return function (_x20, _x21) {
        return _ref29.apply(this, arguments);
      };
    }(), _this.handleQuestionType = function (type) {
      if (_ext2.default.CUSTOM_CONFIG.FEATURE_AUTOMATIC_ADVISORY) {
        var text = "\u60A8\u597D\uFF0C\u6211\u60F3\u54A8\u8BE2" + type;
        _this.sendTextMessage(text);
      }
      _im2.default.selectDispachQuestionType(type);
      _this.setState({
        showTypes: false,
        inputFocus: true,
        placeholder: '请输入您需要咨询的问题'
      });
    }, _this.handleInputFocus = function (e) {
      console.log('input focus', e, FOOTER_HEIGHT * _this.state.radio);
      if (e) {
        var height = e.detail.height;
        // const height = 346;

        if (!_index2.default.getSystemInfo().inFinChat) {
          _this.setState({
            keyboardHeight: height * _this.state.radio,
            showUtil: false,
            showEmoji: false,
            footerHeight: FOOTER_HEIGHT * _this.state.radio
          }, function () {
            _this.scrollToBottom(true);
          });
        } else {
          _this.setState({
            // keyboardHeight: height * this.state.radio,
            showUtil: false,
            showEmoji: false,
            footerHeight: FOOTER_HEIGHT * _this.state.radio
          }, function () {
            _this.scrollToBottom(true);
          });
        }
      }
      // setTimeout(() => {
      _this.setState({
        inputFocus: true
      });
      // }, 500)
    }, _this.memberAtChose = function (m) {
      // this.setState({
      //   showMemberAt: false,
      //   inputFocus: true,
      //   input: `@${m.name}`,
      //   atingMember: false,
      // })
      var newvalue = "" + _this.state.input + m.name + " ";
      _this.setState({
        // showMemberAt: false,
        input: newvalue
        // inputFocus: true,
      });
      setTimeout(function () {
        _this.setState({
          showMemberAt: false
          // inputFocus: true,
        }, function () {
          _this.setState({
            atingMember: false,
            inputFocus: true,
            cursorPosition: newvalue.length
          });
        });
      }, 200);
      event.preventDefault();
    }, _this.handleInputBlur = function () {
      _this.setState({
        inputFocus: false,
        keyboardHeight: 0,
        showMemberAt: false,
        atingMember: false,
        memberAtFilte: ''
      });
      _index2.default.pageScrollTo({
        scrollTop: 0,
        duration: 0
      });
    }, _this.handleSearch = (0, _throttle2.default)(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20() {
      var input, res;
      return regeneratorRuntime.wrap(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              input = _this.state.input;
              _context20.next = 3;
              return _index4.default.adviser.searchKnowledgeByKey({
                key: input,
                size: 4
              });

            case 3:
              res = _context20.sent;

              if (res && res.result) {
                _this.setState({
                  searchResult: {
                    keyword: input,
                    result: res.result.source
                  }
                });
              } else {
                _this.setState({
                  searchResult: {
                    keyword: '',
                    result: []
                  }
                });
              }

            case 5:
            case "end":
              return _context20.stop();
          }
        }
      }, _callee20, _this2);
    })), 300), _this.handleSuggestSelect = function () {
      var _ref33 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21(text) {
        var roomType, res;
        return regeneratorRuntime.wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                // const { roomType } = this.state;
                roomType = _this.state.room.roomType;

                if (!(roomType === _room.ROOMTYPES.dispatch)) {
                  _context21.next = 7;
                  break;
                }

                if (_this.smartBotRoomId) {
                  _context21.next = 5;
                  break;
                }

                _index2.default.showToast({ title: '没找到智能客服房间', icon: 'none' });
                return _context21.abrupt("return");

              case 5:
                // wxRouter.redirectTo(NAV_PAGES.ROOM, {
                //   roomId: this.smartBotRoomId,
                //   sendText: text,
                // })
                _im2.default.enterRoom(_this.smartBotRoomId, {
                  sendMsg: {
                    msgtype: 'm.text',
                    body: text
                  },
                  redirect: true
                });
                return _context21.abrupt("return");

              case 7:
                _context21.next = 9;
                return _this.sendTextMessage(text);

              case 9:
                res = _context21.sent;

                if (res) {
                  _this.setState({
                    searchResult: {
                      keyword: '',
                      result: []
                    }
                  });
                }

              case 11:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21, _this2);
      }));

      return function (_x22) {
        return _ref33.apply(this, arguments);
      };
    }(), _this.handleChooseLocation = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee22() {
      var data, response, auth, res, extend, queueRes;
      return regeneratorRuntime.wrap(function _callee22$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              _context22.next = 2;
              return _index2.default.getSetting();

            case 2:
              data = _context22.sent;

              console.log('~~~~~~~~~~handleChooseLocation  Taro.getSetting()~~~~~~~~~~', data);

              if (data.authSetting['scope.userLocation']) {
                _context22.next = 24;
                break;
              }

              _context22.prev = 5;
              _context22.next = 8;
              return _index2.default.authorize({ scope: 'scope.userLocation' });

            case 8:
              _context22.next = 24;
              break;

            case 10:
              _context22.prev = 10;
              _context22.t0 = _context22["catch"](5);

              console.log(_context22.t0);
              _context22.next = 15;
              return _index2.default.showModal({
                title: '提示',
                content: '该功能需要地理位置授权'
              });

            case 15:
              response = _context22.sent;

              if (!response.confirm) {
                _context22.next = 23;
                break;
              }

              _context22.next = 19;
              return _index2.default.openSetting();

            case 19:
              auth = _context22.sent;

              if (auth.authSetting && auth.authSetting['scope.userLocation']) {
                _this.handleChooseLocation();
              }
              _context22.next = 24;
              break;

            case 23:
              return _context22.abrupt("return");

            case 24:
              _context22.next = 26;
              return _index2.default.chooseLocation();

            case 26:
              res = _context22.sent;
              extend = _this.getMessageExtend();
              _context22.next = 30;
              return _this.checkNeedQueue({
                body: '[位置信息]',
                msgtype: 'm.location',
                info: {
                  address: res.address,
                  latitude: res.latitude,
                  longitude: res.longitude,
                  name: res.name
                },
                extend: extend
              });

            case 30:
              queueRes = _context22.sent;

              if (queueRes) {
                extend.order_id = queueRes.orderId;
              }
              _im2.default.sendLocationMessage(_this.roomId, {
                name: res.name,
                address: res.address,
                latitude: res.latitude,
                longitude: res.longitude,
                extend: extend
              });

            case 33:
            case "end":
              return _context22.stop();
          }
        }
      }, _callee22, _this2, [[5, 10]]);
    })), _this.handleImage = function () {
      var _ref35 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee23(tempFiles) {
        var name, imageFile, imageInfo, mimetype, extend, queueRes, response;
        return regeneratorRuntime.wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                if (!(tempFiles.length !== 1)) {
                  _context23.next = 3;
                  break;
                }

                console.log('invalid image num');
                return _context23.abrupt("return");

              case 3:
                name = 'image';
                imageFile = tempFiles[0];
                _context23.next = 7;
                return _index2.default.getImageInfo({
                  src: imageFile.path
                });

              case 7:
                imageInfo = _context23.sent;
                mimetype = "image/" + imageInfo.type || (0, _file.getMimeType)(imageFile.path);
                extend = _this.getMessageExtend();
                _context23.next = 12;
                return _this.checkNeedQueue({
                  msgtype: 'm.image',
                  body: 'image',
                  url: '',
                  info: {
                    mimetype: mimetype,
                    h: imageInfo.height,
                    w: imageInfo.width,
                    thumbnail_info: {
                      mimetype: mimetype,
                      h: imageInfo.height,
                      w: imageInfo.width
                    },
                    thumbnail_url: ''
                  },
                  extend: extend
                });

              case 12:
                queueRes = _context23.sent;

                if (queueRes) {
                  extend.order_id = queueRes.orderId;
                }
                _context23.next = 16;
                return _im2.default.sendImageMessage(_this.roomId, {
                  name: name,
                  blob: imageFile.path,
                  path: imageFile.path,
                  mimetype: mimetype,
                  width: imageInfo.width,
                  height: imageInfo.height,
                  size: imageInfo.size,
                  extend: extend
                });

              case 16:
                response = _context23.sent;

                if (!response) {
                  _index2.default.showToast({
                    title: '发送失败',
                    icon: 'none',
                    mask: true
                  });
                }

              case 18:
              case "end":
                return _context23.stop();
            }
          }
        }, _callee23, _this2);
      }));

      return function (_x23) {
        return _ref35.apply(this, arguments);
      };
    }(), _this.getMessageExtend = function () {
      var _ref36 = _this.state.room || {
        roomType: '',
        orderInfo: {}
      },
          orderInfo = _ref36.orderInfo;

      var orderId = orderInfo.orderId;

      var extend = {};
      if (orderId) {
        extend.order_id = orderId;
      }
      return extend;
    }, _this.handleClickBack = function () {
      // const pages = Taro.getCurrentPages();
      // if (pages.length > 1) {
      //   Taro.navigateBack();
      //   return;
      // }
      // const fcid = this.state.advisorInfo.staffId;
      // console.log('DEBUG: handleClickBack => fcid', fcid);
      // const { cRouter } = Taro.getApp().globalData;
      // cRouter.navigateTo({
      //   name: 'STUDIO_TWEET',
      //   query: { fcid },
      // });
      _index7.default.switchTab(_navigation.NAV_PAGES.HOME);
    }, _this.checkNeedQueue = function () {
      var _ref37 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee24(content) {
        var _this$state3, dispatchInfo, advisorInfo, curOrderId, _ref38, roomType, orderInfo, dispatchState, questionType, staffId, isDispatching, isDispatchRoom, isRightRoom, needQueue, needReopenOreder, needSendQuestion, queueRes;

        return regeneratorRuntime.wrap(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                _this$state3 = _this.state, dispatchInfo = _this$state3.dispatchInfo, advisorInfo = _this$state3.advisorInfo, curOrderId = _this$state3.curOrderId;
                _ref38 = _this.state.room || {
                  roomType: '',
                  orderInfo: {}
                }, roomType = _ref38.roomType, orderInfo = _ref38.orderInfo;
                dispatchState = dispatchInfo.dispatchState, questionType = dispatchInfo.questionType;
                staffId = advisorInfo.staffId || orderInfo.staffId;
                isDispatching = dispatchState === 'DISPATCHING';
                isDispatchRoom = roomType === _room.ROOMTYPES.dispatch;
                isRightRoom = _this.isRightDispatchingRoom();
                needQueue = isDispatchRoom && !isDispatching;
                needReopenOreder = roomType === _room.ROOMTYPES.advisor && orderInfo.isClosed;
                needSendQuestion = needQueue || isDispatching && isRightRoom;
                queueRes = null;

                if (!needQueue) {
                  _context24.next = 15;
                  break;
                }

                _context24.next = 14;
                return _this.handleQueue(content);

              case 14:
                queueRes = _context24.sent;

              case 15:
                if (!needReopenOreder) {
                  _context24.next = 19;
                  break;
                }

                _context24.next = 18;
                return _this.handleReopenOrder(content, staffId, _this.roomId);

              case 18:
                queueRes = _context24.sent;

              case 19:
                if (!needSendQuestion) {
                  _context24.next = 22;
                  break;
                }

                _context24.next = 22;
                return _index4.default.adviser.addDispatchQuestion({
                  pattern: 'B',
                  orderId: !queueRes ? orderInfo.orderId || curOrderId : queueRes.orderId,
                  question: JSON.stringify(content || {})
                });

              case 22:
                return _context24.abrupt("return", queueRes);

              case 23:
              case "end":
                return _context24.stop();
            }
          }
        }, _callee24, _this2);
      }));

      return function (_x24) {
        return _ref37.apply(this, arguments);
      };
    }(), _this.goActivityHistory = function () {
      console.log('DEBUG: goActivityHistory');
      _index7.default.switchTab(_navigation.NAV_PAGES.HOME);
    }, _this.handleScroll = function (e) {
      console.log(e);
    }, _this.onCheckDetail = function () {
      _index7.default.navigateTo(_navigation.NAV_PAGES.ROOM_DETAIL);
    }, _this.triggleShowAddOne = function (val) {
      _this.setState({
        showAddOne: val
      });
    }, _this.customComponents = ["ScrollLoading", "Message", "SuggestBox", "Avatar", "EmojiList", "ToolBox"], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Room, [{
    key: "_constructor",
    value: function _constructor() {
      _get(Room.prototype.__proto__ || Object.getPrototypeOf(Room.prototype), "_constructor", this).call(this);
      this.loadMoreRetryTime = 0;
      this.myId = '';
      this.roomId = '';
      this.lastHeight = 0;
      // this.isFullScreenDevice = false;

      this.lastUpdateTime = Date.now();
      this.enterRoomTime = Date.now();
      this.state.platform = '';
      this.state = {
        // im
        room: null,
        timeline: null,
        loadingTimeline: false,

        // layouts
        platform: '',
        windowHeight: 0,
        bottomHeight: 0,
        headerHeight: 0,
        footerHeight: 0,
        emojiHeight: 0,
        utilHeight: 0,
        inputHeight: 0,
        keyboardHeight: 0,
        isFullScreen: false,
        radio: 0,

        scrollTop: 0,
        viewMsgId: '',

        // modals
        showUtil: false,
        showEmoji: false,
        showTypes: false,

        // channelActivity
        showChannelActivity: false,
        channelActivityImage: _ext2.default.BASE_URL + '/statics/images/activity_welcome.png',
        activityDetail: {},

        // input
        input: '',
        inputFocus: false,
        placeholder: '',

        // advisor
        advisorInfo: {
          account: '',
          avatar: '',
          name: '',
          employmentTime: '',
          hotline: '',
          staffId: '',
          roles: null,
          departments: null,
          visitingCard: null
        },

        // dispactchInfo
        questionTypes: [],
        dispatchInfo: {
          dispatchState: '',
          dispatchFrom: '',
          questionType: ''
        },

        // search
        searchResult: {
          keyword: '',
          result: []
        },

        // message
        isSendingMsg: false,
        // timeline: [],
        hasMoreFront: true,
        hasMoreBack: true,

        curOrderId: '',
        hasMobile: false,

        canScrollY: true,

        showAddOne: false,
        isLoading: false,

        showMemberAt: false,
        memberAtFilte: '',
        atingMember: false,
        cursorPosition: 0
      };
      this.$$refs = [];
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      _index2.default.showLoading();
      console.log('componentWillMount');
      this.setState({
        isLoading: true
      });
    }
  }, {
    key: "componentDidMount",
    value: function () {
      var _ref39 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee25() {
        return regeneratorRuntime.wrap(function _callee25$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
                console.log('componentDidMount');
                this.initLayouts();
                _context25.next = 4;
                return this.initIM();

              case 4:
                this.initBasicInfo();
                // this.initDispatchInfo();
                this.initRoomInfo();
                this.initActions();
                // this.handleTimeline(this.props.viewingTimeline, true);

              case 7:
              case "end":
                return _context25.stop();
            }
          }
        }, _callee25, this);
      }));

      function componentDidMount() {
        return _ref39.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.resetRoom();
    }
  }, {
    key: "componentDidHide",
    value: function componentDidHide() {}
  }, {
    key: "componentDidShow",
    value: function () {
      var _ref40 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee26() {
        var _ref41, code;

        return regeneratorRuntime.wrap(function _callee26$(_context26) {
          while (1) {
            switch (_context26.prev = _context26.next) {
              case 0:
                _context26.next = 2;
                return _index2.default.login();

              case 2:
                _ref41 = _context26.sent;
                code = _ref41.code;

                this.scrollToBottom(true);
                this.setState({ code: code });
                this.initMobile();

              case 7:
              case "end":
                return _context26.stop();
            }
          }
        }, _callee26, this);
      }));

      function componentDidShow() {
        return _ref40.apply(this, arguments);
      }

      return componentDidShow;
    }()
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {}
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      // this.handleTimeline(nextProps.viewingTimeline);
      // this.handleRoomTypeChange(nextProps.viewingRoom.roomType);
      // console.log('cur props', this.state.room);
      // console.log('next props', nextProps.viewingRoom);
    }
  }, {
    key: "initIM",
    value: function initIM() {
      var _this3 = this;

      return new Promise(function () {
        var _ref42 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee27(resolve) {
          var roomId, room, _ref43, timeline, canPaginateBack, canPaginateFront, dispatchData, dispatchState, from, questionType, dispatchInfo;

          return regeneratorRuntime.wrap(function _callee27$(_context27) {
            while (1) {
              switch (_context27.prev = _context27.next) {
                case 0:
                  roomId = _this3.$router.params.roomId;
                  room = _im2.default.getRoom(roomId);

                  _index2.default.setNavigationBarTitle({
                    title: room.name
                  });
                  _im2.default.on('ROOM', _this3.handleRoomUpdate);
                  _im2.default.on('TIMELINE', _this3.handleTimeline);
                  _im2.default.on('DISPATCH', _this3.handleDistpatch);
                  _context27.next = 8;
                  return _im2.default.addViewingRoom(roomId);

                case 8:
                  _ref43 = _context27.sent;
                  timeline = _ref43.timeline;
                  canPaginateBack = _ref43.canPaginateBack;
                  canPaginateFront = _ref43.canPaginateFront;

                  console.log('canPaginateBack', canPaginateBack);
                  console.log(timeline);
                  dispatchData = _im2.default.getDispatchData();
                  dispatchState = dispatchData.dispatchState, from = dispatchData.from, questionType = dispatchData.questionType;
                  dispatchInfo = {
                    dispatchState: dispatchState,
                    questionType: questionType,
                    dispatchFrom: from
                  };

                  console.log('~~~~~~~~~~~~~~~~room page initIM~~~~~~~~~~~~~~~~~~', new Date().getTime());
                  _this3.setState({
                    room: room,
                    dispatchInfo: dispatchInfo,
                    timeline: [].concat(_toConsumableArray(timeline)),
                    hasMoreBack: canPaginateBack,
                    hasMoreFront: canPaginateFront,
                    loadingTimeline: false
                  }, function () {
                    console.log('~~~~~~~~~~~~~~~~room page initIM setState~~~~~~~~~~~~~~~~~~', new Date().getTime());
                    _this3.setState({
                      isLoading: false
                    });
                    setTimeout(function () {
                      console.log('~~~~~~~~~~~~~~~~room page initIM settimeout~~~~~~~~~~~~~~~~~~', new Date().getTime());
                      _this3.scrollToBottom(true);
                      _index2.default.hideLoading();
                    });
                    resolve();
                  });
                  // this.scrollToBottom(true);

                case 19:
                case "end":
                  return _context27.stop();
              }
            }
          }, _callee27, _this3);
        }));

        return function (_x25) {
          return _ref42.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "initLayouts",
    value: function initLayouts() {
      // windowHeight: 0,
      // bottomHeight: 0,
      // scrollViewHeight: 0,
      // headerHeight: HEADER_HEIGHT,
      // footerHeight: FOOTER_HEIGHT,
      // emojiHeight: EMOJI_HEIGHT,
      // utilHeight: UTIL_HEIGHT,
      var _Taro$getSystemInfoSy = _index2.default.getSystemInfoSync(),
          screenHeight = _Taro$getSystemInfoSy.screenHeight,
          screenWidth = _Taro$getSystemInfoSy.screenWidth,
          windowHeight = _Taro$getSystemInfoSy.windowHeight,
          platform = _Taro$getSystemInfoSy.platform;

      var isFullScreen = screenHeight / screenWidth > 2;
      var radio = 750 / screenWidth;
      var bottomHeight = isFullScreen ? 34 : 0;

      this.setState({
        platform: platform,
        isFullScreen: isFullScreen,
        radio: radio,
        bottomHeight: bottomHeight * radio,
        windowHeight: windowHeight * radio,
        headerHeight: HEADER_HEIGHT * radio,
        footerHeight: FOOTER_HEIGHT * radio,
        emojiHeight: EMOJI_HEIGHT * radio,
        utilHeight: UTIL_HEIGHT * radio,
        inputHeight: INPUT_HEIGHT * radio
      });
    }
  }, {
    key: "onShareAppMessage",
    value: function onShareAppMessage() {
      var _this4 = this;

      var url = 'pages/login/index';
      var basicRooms = _im2.default.getBasicRooms();
      var viewingRoom = basicRooms.find(function (e) {
        return e.id === _this4.$router.params.roomId;
      });
      if (!viewingRoom.isGroup) {
        url += '?type=ENTER_ROOM&roomId=';
        // url += encodeURIComponent(JSON.stringify({roomId: this.roomId}));
        url += this.roomId;
        url += "&fcid=" + this.myId;
      }
      return {
        title: viewingRoom.name,
        path: url,
        imageUrl: shareImage
      };
    }
  }, {
    key: "initActions",
    value: function initActions() {
      var _$router$params = this.$router.params,
          roomId = _$router$params.roomId,
          reopenOrder = _$router$params.reopenOrder,
          staffId = _$router$params.staffId,
          dispatchQuestionType = _$router$params.dispatchQuestionType;

      if (dispatchQuestionType) {
        this.onSelectType(dispatchQuestionType);
      }

      var sendMsg = (0, _store.getCacheSync)('sendMsg');
      if (!sendMsg && reopenOrder) {
        this.handleReopenOrder({}, staffId, roomId);
      }
      if (sendMsg) {
        console.log('lllllll', sendMsg);
        (0, _store.removeCacheSync)('sendMsg');
        switch (sendMsg.msgtype) {
          case 'fc.applet':
            this.checkNeedQueue(sendMsg);
            _im2.default.sendMessage(this.roomId, sendMsg);
            break;
          case 'm.text':
            this.sendTextMessage(sendMsg.body);
            break;
          case 'fc.convo.ui':
            this.sendConvoMessage(sendMsg);
          default:
            break;
        }
      }
    }
  }, {
    key: "initChannelRoom",
    value: function initChannelRoom() {
      var firstEnterRoom = this.$router.params.firstEnterRoom;
      var _state$room$channelIn = this.state.room.channelInfo,
          type = _state$room$channelIn.type,
          detail = _state$room$channelIn.detail;

      if (type === 'activity') {
        this.setState({
          showChannelActivity: firstEnterRoom ? true : false,
          // showChannelActivity: true,
          activityDetail: detail
        });
      }
    }
  }, {
    key: "resetRoom",
    value: function resetRoom() {
      _im2.default.removeViewingRoom(this.roomId);
      _im2.default.off('ROOM', this.handleRoomUpdate);
      _im2.default.off('TIMELINE', this.handleTimeline);
      _im2.default.off('DISPATCH', this.handleDistpatch);
      var dispatchInfo = this.state.dispatchInfo;

      if (dispatchInfo.dispatchState !== _dispatch.DISPATCH_STATE.dispatching) {
        _im2.default.closeDispatch();
      }
    }
  }, {
    key: "isRightDispatchingRoom",
    value: function isRightDispatchingRoom() {
      var dispatchInfo = this.state.dispatchInfo;

      var _ref44 = this.state.room || {},
          roomType = _ref44.roomType;

      var dispatchFrom = dispatchInfo.dispatchFrom;


      var isDispatchRoom = roomType === _room.ROOMTYPES.dispatch;
      var isSmartBotRoom = roomType === _room.ROOMTYPES.smartBot;

      var isFormSmartBot = dispatchFrom === 'customer-bot';
      var isFormDispatchRoom = dispatchFrom === 'dispatch-bot';

      return isFormSmartBot && isSmartBotRoom || isDispatchRoom && isFormDispatchRoom;
    }
  }, {
    key: "closeActivityModal",
    value: function closeActivityModal() {
      this.setState({ showChannelActivity: false });
    }
  }, {
    key: "goActivityDetail",
    value: function goActivityDetail() {
      // console.log(ENV_VERSION);
      // console.log(service.config);
      var STUDIO_ACTIVITY_DETAIL = 'STUDIO_ACTIVITY_DETAIL';
      var app = _index2.default.getApp();
      var cRouter = app.globalData.cRouter;
      var activityDetail = this.state.activityDetail;

      var pages = _index2.default.getCurrentPages();
      var previousPage = pages[pages.length - 2];

      var prefixPath = function prefixPath(path) {
        var prefix = path.startsWith('/') ? '' : '/';
        return "" + prefix + path;
      };

      if (previousPage && prefixPath(previousPage.route) === prefixPath(_navigation.MERGE_ROUTE_CONFIG[STUDIO_ACTIVITY_DETAIL])) {
        _index2.default.navigateBack();
        return;
      }
      cRouter.navigateTo({
        name: STUDIO_ACTIVITY_DETAIL,
        query: {
          fcid: activityDetail.adviserId,
          id: activityDetail.id
        }
      });
      // wxRouter.navigateTo(NAV_PAGES.ACTIVITY_DETAIL, {
      //   fcid: activityDetail.adviserId,
      //   id: activityDetail.id,
      // })
      // Taro.navigateToMiniProgram({
      //   appId: extInfo.WORK_APP_ID,
      //   path: `pages/activity/ActivityDetail?fcid=${activityDetail.adviserId}&id=${activityDetail.id}`,
      //   envVersion: ENV_VERSION,
      // })
    }
  }, {
    key: "_createData",
    value: function _createData() {
      var _this5 = this;

      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;
      var $compid__6 = (0, _index.genCompid)(__prefix + "$compid__6");
      var $compid__7 = (0, _index.genCompid)(__prefix + "$compid__7");
      var $compid__8 = (0, _index.genCompid)(__prefix + "$compid__8");
      var $compid__9 = (0, _index.genCompid)(__prefix + "$compid__9");
      var $compid__10 = (0, _index.genCompid)(__prefix + "$compid__10");
      var $compid__11 = (0, _index.genCompid)(__prefix + "$compid__11");
      var $compid__12 = (0, _index.genCompid)(__prefix + "$compid__12");
      var $compid__13 = (0, _index.genCompid)(__prefix + "$compid__13");

      console.log('ROOM PAGE RENDER');
      console.log(this.navBarHeight);
      var _state = this.__state,
          footerHeight = _state.footerHeight,
          headerHeight = _state.headerHeight,
          bottomHeight = _state.bottomHeight,
          windowHeight = _state.windowHeight,
          emojiHeight = _state.emojiHeight,
          utilHeight = _state.utilHeight,
          inputHeight = _state.inputHeight,
          isFullScreen = _state.isFullScreen,
          radio = _state.radio,
          showUtil = _state.showUtil,
          showEmoji = _state.showEmoji,
          showTypes = _state.showTypes,
          isBanSendMsg = _state.isBanSendMsg,
          advisorInfo = _state.advisorInfo,
          video = _state.video,
          input = _state.input,
          inputFocus = _state.inputFocus,
          searchResult = _state.searchResult,
          questionTypes = _state.questionTypes,
          dispatchInfo = _state.dispatchInfo,
          placeholder = _state.placeholder,
          scrollTop = _state.scrollTop,
          viewMsgId = _state.viewMsgId,
          showChannelActivity = _state.showChannelActivity,
          channelActivityImage = _state.channelActivityImage,
          activityDetail = _state.activityDetail,
          hasMobile = _state.hasMobile,
          loadingTimeline = _state.loadingTimeline,
          hasMoreBack = _state.hasMoreBack,
          hasMoreFront = _state.hasMoreFront,
          canScrollY = _state.canScrollY,
          showAddOne = _state.showAddOne,
          isLoading = _state.isLoading,
          showMemberAt = _state.showMemberAt,
          memberAtFilte = _state.memberAtFilte;

      var _ref45 = this.__state.room || {
        roomType: '',
        orderInfo: {}
      },
          roomType = _ref45.roomType,
          orderInfo = _ref45.orderInfo,
          name = _ref45.name,
          isChannel = _ref45.isChannel,
          isDirect = _ref45.isDirect,
          isNormalRobot = _ref45.isNormalRobot,
          isGroup = _ref45.isGroup,
          isArchive = _ref45.isArchive,
          members = _ref45.members;

      console.log('room member: ', members);
      var filtermembers = members.filter(function (e) {
        return e.name.indexOf(memberAtFilte) > -1;
      });
      console.log('filtermembers: ', filtermembers);

      var _ref46 = this.$router.params || {},
          channelId = _ref46.channelId;
      // console.log('DEBUG this.$router.params => channelId', channelId);

      var dispatchState = dispatchInfo.dispatchState,
          questionType = dispatchInfo.questionType;

      var scrollViewHeight = this.getScrollHeight();
      var curTimeline = this.__state.timeline || [];
      console.log('========curTimeline========');
      console.log(curTimeline);
      var APP_NAME = _ext2.default.APP_NAME,
          redirectType = _ext2.default.CUSTOM_CONFIG.DISPATCH_TIMEOUT_REDIRECT;

      var timeoutRedirectToLeaveMsg = redirectType === 'leave-msg' || roomType === _room.ROOMTYPES.smartBot;

      var tipMessage = {
        content: {
          body: APP_NAME + "\u4E3A\u60A8\u670D\u52A1\uFF0C\u8BF7" + (questionTypes.length > 0 ? '选择您要咨询的业务范围' : '请输入您要咨询的问题'),
          msgType: 'm.local.notice'
        }
      };
      var questionMessage = {
        content: {
          body: "\u60A8\u5DF2\u9009\u62E9\uFF1A" + questionType,
          msgType: 'm.local.notice'
        }
      };
      var dispatchMessage = {
        content: {
          body: '正在为您匹配服务人员，请稍侯...',
          msgType: 'm.local.notice'
        }
      };
      var timeoutMessage = {
        content: {
          body: '尊敬的客户，当前客服繁忙，您可选择',
          linkText: timeoutRedirectToLeaveMsg ? '去留言' : '智能客服',
          url: timeoutRedirectToLeaveMsg ? this.leaveMsgUrl : this.smartBotRoomUrl,
          msgType: 'm.local.notice'
        }
      };
      var navBarHeight = this.__props.navBarHeight;


      var modalHeight = windowHeight - navBarHeight * radio;
      var inputWarpHeight = FOOTER_HEIGHT * this.__state.radio;

      var anonymousState__temp = !isLoading ? (0, _index.internal_inline_style)({ height: scrollViewHeight + "rpx" }) : null;

      this.anonymousFunc0 = function () {
        return _this5.handleMoreTimeLine('BACKWORDS');
      };

      var anonymousState__temp6 = isBanSendMsg ? (0, _index.internal_inline_style)({ height: footerHeight + "rpx" }) : null;
      var anonymousState__temp7 = isArchive ? (0, _index.internal_inline_style)({ height: footerHeight + "rpx" }) : null;
      var anonymousState__temp8 = !isLoading ? (0, _index.internal_inline_style)({ height: footerHeight + "rpx" }) : null;
      var anonymousState__temp9 = !isLoading ? (0, _index.internal_inline_style)({ height: inputWarpHeight + "rpx" }) : null;
      var anonymousState__temp10 = !showTypes && !isLoading ? (0, _index.internal_inline_style)({ height: inputHeight + "rpx" }) : null;
      var anonymousState__temp11 = showEmoji ? (0, _index.internal_inline_style)({ fontSize: '35rpx' }) : null;
      var anonymousState__temp12 = isFullScreen ? (0, _index.internal_inline_style)({
        height: bottomHeight + "rpx",
        width: '100%',
        backgroundColor: '#f5f5f6'
      }) : null;
      var anonymousState__temp13 = this.isRightDispatchingRoom() && dispatchState === 'DISPATCHING';
      var anonymousState__temp14 = this.isRightDispatchingRoom() && dispatchState === 'TIMEOUT';
      var loopArray1 = !isLoading ? curTimeline.map(function (message, _anonIdx) {
        message = {
          $original: (0, _index.internal_get_original)(message)
        };
        var $loopState__temp3 = !isLoading ? 'id' + ("" + message.$original.id).replace(/[^\d]/g, '') : null;
        var $loopState__temp5 = !isLoading ? roomType === _room.ROOMTYPES.channel : null;
        var $compid__4 = (0, _index.genCompid)(__prefix + "uTIOtPtCtP" + _anonIdx);
        !isLoading && _index.propsManager.set({
          "room": _this5.__state.room,
          "showName": $loopState__temp5,
          "message": message.$original,
          "onVideo": _this5.handleVideo,
          "onConvo": _this5.handleConvo,
          "onLink": _this5.handleLink,
          "onLocation": _this5.handleLocation,
          "onMessagePress": _this5.handleMessagePress.bind(_this5, message.$original),
          "onReSend": _this5.handleResend.bind(_this5, message.$original),
          "roomType": roomType
        }, $compid__4);
        return {
          $loopState__temp3: $loopState__temp3,
          $loopState__temp5: $loopState__temp5,
          $compid__4: $compid__4,
          $original: message.$original
        };
      }) : [];
      var loopArray2 = showMemberAt ? filtermembers.map(function (m, _anonIdx3) {
        m = {
          $original: (0, _index.internal_get_original)(m)
        };
        var $compid__5 = (0, _index.genCompid)(__prefix + "BdayQoFjmS" + _anonIdx3);
        !isBanSendMsg && !isArchive && !isLoading && showMemberAt && _index.propsManager.set({
          "url": m.$original.avatar,
          "size": 60
        }, $compid__5);
        return {
          $compid__5: $compid__5,
          $original: m.$original
        };
      }) : [];
      !isLoading && loadingTimeline && _index.propsManager.set({
        "loading": loadingTimeline,
        "hasMore": hasMoreBack
      }, $compid__6);
      !isLoading && roomType === _room.ROOMTYPES.dispatch && _index.propsManager.set({
        "message": tipMessage
      }, $compid__7);
      !isLoading && roomType === _room.ROOMTYPES.dispatch && questionType && _index.propsManager.set({
        "message": questionMessage
      }, $compid__8);
      !isLoading && anonymousState__temp13 && _index.propsManager.set({
        "message": dispatchMessage
      }, $compid__9);
      !isLoading && anonymousState__temp14 && _index.propsManager.set({
        "message": timeoutMessage
      }, $compid__10);
      input && searchResult && searchResult.result.length > 0 && _index.propsManager.set({
        "suggests": searchResult,
        "onSelect": this.handleSuggestSelect
      }, $compid__11);
      !isBanSendMsg && !isArchive && !isLoading && showEmoji && _index.propsManager.set({
        "onSelect": this.handleEmojiSelect,
        "height": emojiHeight
      }, $compid__12);
      !isBanSendMsg && !isArchive && !isLoading && showUtil && _index.propsManager.set({
        "onAction": this.handleToolAction,
        "roomId": this.$router.params.roomId,
        "roomType": roomType,
        "orderId": orderInfo ? orderInfo.orderId : '',
        "isOrderClosed": orderInfo ? orderInfo.isClosed : true,
        "dispatchInfo": dispatchInfo,
        "height": utilHeight
      }, $compid__13);
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp,
        anonymousState__temp6: anonymousState__temp6,
        anonymousState__temp7: anonymousState__temp7,
        anonymousState__temp8: anonymousState__temp8,
        anonymousState__temp9: anonymousState__temp9,
        anonymousState__temp10: anonymousState__temp10,
        anonymousState__temp11: anonymousState__temp11,
        anonymousState__temp12: anonymousState__temp12,
        anonymousState__temp13: anonymousState__temp13,
        anonymousState__temp14: anonymousState__temp14,
        loopArray1: loopArray1,
        loopArray2: loopArray2,
        $compid__6: $compid__6,
        $compid__7: $compid__7,
        $compid__8: $compid__8,
        $compid__9: $compid__9,
        $compid__10: $compid__10,
        $compid__11: $compid__11,
        $compid__12: $compid__12,
        $compid__13: $compid__13,
        channelId: channelId,
        video: video,
        roomType: roomType,
        ROOMTYPES: _room.ROOMTYPES,
        questionType: questionType,
        curTimeline: curTimeline,
        isBanSendMsg: isBanSendMsg,
        isArchive: isArchive,
        filtermembers: filtermembers
      });
      return this.__state;
    }
  }, {
    key: "anonymousFunc0",
    value: function anonymousFunc0(e) {
      ;
    }
  }]);

  return Room;
}(_index.Component)) || _class);
Room.$$events = ["goActivityHistory", "handleVideo", "handleInputArea", "anonymousFunc0", "memberAtChose", "handleInput", "sendTextMessage", "handleInputFocus", "handleInputBlur", "handleHideEmoji", "handleShowEmoji", "handleToggleUtil"];
Room.$$componentPath = "pages/room/index";
exports.default = Room;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Room, true));