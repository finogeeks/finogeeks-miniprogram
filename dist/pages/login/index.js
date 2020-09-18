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

var _ext = require("../../utils/ext.js");

var _ext2 = _interopRequireDefault(_ext);

var _version = require("../../utils/version.js");

var _dispatch = require("../../constants/dispatch.js");

var _index3 = require("../../service/index.js");

var _index4 = _interopRequireDefault(_index3);

var _util = require("../../utils/util.js");

var _index5 = require("../../router/index.js");

var _index6 = _interopRequireDefault(_index5);

var _navigation = require("../../constants/navigation.js");

var _index7 = require("../../npm/@tarojs/redux/index.js");

var _redux = require("../../npm/redux/lib/redux.js");

var _user = require("../../store/actions/user.js");

var _auth = require("../../model/auth.js");

var _auth2 = _interopRequireDefault(_auth);

var _im = require("../../model/im.js");

var _im2 = _interopRequireDefault(_im);

var _index8 = require("../../store/index.js");

var _index9 = _interopRequireDefault(_index8);

var _detect = require("../../store/actions/detect.js");

var _store = require("../../utils/store.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import '../../assets/common/login_bg.svg';

var logoImage = "/assets/login/logo.png";
var shareImage = "/assets/logo2.png";
var hidePassImg = "/assets/login/hide_pass.png";
var showPassImg = "/assets/login/show_pass.png";
var loginLogo = "/assets/login/login_img.png";
var favicon = "/assets/login/favicon.png";

var loginBtnStyle = {
  color: '#FFF',
  backgroundColor: _ext2.default.THEME_COLOR.Btn_n
};

function mapDispatchToProps(dispatch) {
  return _extends({}, (0, _redux.bindActionCreators)({ setUserLocaton: _user.setUserLocaton }, dispatch));
}

var Login = (_dec = (0, _index7.connect)(function () {
  return {};
}, mapDispatchToProps), _dec(_class = function (_BaseComponent) {
  _inherits(Login, _BaseComponent);

  function Login() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    _classCallCheck(this, Login);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Login.__proto__ || Object.getPrototypeOf(Login)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["showPage", "systeminfo", "loginLogo", "favicon", "showPass", "showPassImg", "hidePassImg", "logoImage", "canShow", "isLoading", "hasAuthed", "userName", "userPassWord", "loginCode", "nickName", "avatarUrl", "intro"], _this.config = {
      navigationBarTitleText: _ext2.default.APP_NAME,
      navigationBarBackgroundColor: _ext2.default.THEME_COLOR.NAV_bg,
      navigationBarTextStyle: 'black'
    }, _this.preAuthLocation = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _index2.default.getLocation();

            case 3:
              _context.next = 8;
              break;

            case 5:
              _context.prev = 5;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", null);

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this2, [[0, 5]]);
    })), _this.getInitStyle = function () {
      var systemInfo = _index2.default.getSystemInfoSync();
      // Taro 暂未实现此功能
      // const actionButtonInfo = Taro.getMenuButtonBoundingClientRect();
      var statusBarHeight = systemInfo.statusBarHeight,
          windowWidth = systemInfo.windowWidth;

      var navHeight = 88 * windowWidth / 750;
      navHeight = navHeight < 44 ? 44 : navHeight;
      // const maxTitleWidth = (actionButtonInfo.left - windowWidth / 2) * 2;

      return {
        navHeight: navHeight,
        statusBarHeight: statusBarHeight,
        // maxTitleWidth,
        headerHeight: navHeight + statusBarHeight
      };
    }, _this.handleStartError = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _auth2.default.clearAuth();
              console.log('route', _this.$router.params);
              _this.setState({
                canShow: true,
                hasAuthed: false
              });
              return _context2.abrupt("return");

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, _this2);
    })), _this.start = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var isAuth, userInfo;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _auth2.default.checkAuth({ checkJwt: false, checkAuth: false });

            case 2:
              isAuth = _context3.sent;

              console.log('LOGIN START');
              console.log(isAuth);

              if (!isAuth) {
                _context3.next = 22;
                break;
              }

              // await this.preAuthLocation();
              console.log(_im2.default.isReady);

              if (_im2.default.isReady) {
                _context3.next = 19;
                break;
              }

              _context3.next = 10;
              return _im2.default.start(_auth2.default.userSession.userId);

            case 10:
              _context3.next = 12;
              return _im2.default.matrix.user.getUser(_auth2.default.userSession.userId);

            case 12:
              userInfo = _context3.sent;

              // console.log(`~~~~~~~~~~~~login matrixstart userinfo:  ${userInfo}~~~~~~~~~~~~~~`);
              // console.log(userInfo);
              (0, _store.setCacheSync)('userInfo', userInfo);
              _index9.default.dispatch((0, _user.setUserInfo)(userInfo));
              _context3.t0 = !_index2.default.getSystemInfoSync().inFinChat;

              if (!_context3.t0) {
                _context3.next = 19;
                break;
              }

              _context3.next = 19;
              return _auth2.default.getUserPosition();

            case 19:
              _this.handleInitAction();
              _context3.next = 26;
              break;

            case 22:
              if (!_im2.default.matrix.mxClient) {
                _context3.next = 25;
                break;
              }

              _context3.next = 25;
              return _im2.default.stop();

            case 25:
              _this.handleStartError();

            case 26:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, _this2);
    })), _this.onSetUserInfo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _index2.default.showLoading({ title: '加载中' });
              _context4.prev = 1;
              _context4.next = 4;
              return _auth2.default.login(_this.state.userName, _this.state.userPassWord);

            case 4:
              _context4.next = 6;
              return _this.start();

            case 6:
              _index2.default.hideLoading();
              _index2.default.showToast({
                title: '登录成功',
                icon: 'success',
                mask: true,
                duration: 1500
              });
              _context4.next = 16;
              break;

            case 10:
              _context4.prev = 10;
              _context4.t0 = _context4["catch"](1);

              _index2.default.hideLoading();
              console.log(_context4.t0);
              _this.handleStartError();
              _index2.default.showToast({
                title: _context4.t0 && _context4.t0.data && _context4.t0.data.error,
                icon: 'none',
                mask: true,
                duration: 1500
              });

            case 16:
              _context4.prev = 16;

              _this.setState({ isLoading: false });
              return _context4.finish(16);

            case 19:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, _this2, [[1, 10, 16, 19]]);
    })), _this.handleInitAction = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      var _ref7, type, roomId, fcid, value, cRouter;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _index2.default.showLoading({ title: '加载中' });
              // this.preAuthLocation();
              _context5.prev = 1;

              console.log('LOGIN PARAMS: ', _this.$router.params);
              _context5.next = 5;
              return _this.getActionParams();

            case 5:
              _ref7 = _context5.sent;
              type = _ref7.type;
              roomId = _ref7.roomId;
              fcid = _ref7.fcid;
              value = {};
              cRouter = _index2.default.getApp().globalData.cRouter;

              console.log('ACTION PARAMS:', type, roomId);
              // startJwtRefresh();
              _context5.t0 = type;
              _context5.next = _context5.t0 === 'BIND_ADVISOR' ? 15 : _context5.t0 === 'CONSULT_ADVISOR' ? 19 : _context5.t0 === 'ENTER_ROOM' ? 22 : _context5.t0 === 'VIEW_ROOMS' ? 24 : _context5.t0 === 'VIEW_MICRO_WEB' ? 26 : _context5.t0 === 'REDIRECT_TO_PAGE' ? 28 : _context5.t0 === 'AUTH' ? 30 : _context5.t0 === 'CONSULT_ROOM' ? 33 : 35;
              break;

            case 15:
              console.log(value);
              _context5.next = 18;
              return _this.bindAdvisor(value.advisorId);

            case 18:
              return _context5.abrupt("return");

            case 19:
              _context5.next = 21;
              return _this.consultAdviosr(value.advisorId, value.msg, value.formId);

            case 21:
              return _context5.abrupt("return");

            case 22:
              // await this.enterRoom(value.roomId, value.staffId);
              _index6.default.switchTab(_navigation.NAV_PAGES.HOME, { enterRoom: roomId, fcid: fcid });
              // imModel.enterRoom(value.roomId);
              return _context5.abrupt("return");

            case 24:
              _index6.default.switchTab(_navigation.NAV_PAGES.HOME);
              return _context5.abrupt("return");

            case 26:
              _index6.default.redirectTo(_navigation.NAV_PAGES.VIEW_MICRO_WEB, {
                staffId: value.staffId,
                shareViewName: value.shareViewName,
                shareId: value.shareId
              });
              return _context5.abrupt("return");

            case 28:
              if (value.name) {
                cRouter.redirectTo(value);
              } else {
                if (value.page.includes(_navigation.NAV_PAGES.SQUARE) || value.page.includes(_navigation.NAV_PAGES.HOME) || value.page.includes(_navigation.NAV_PAGES.ME)) {
                  _index6.default.switchTab(value.page, _extends({}, value.query));
                } else {
                  _index6.default.redirectTo(value.page, _extends({}, value.query));
                }
              }
              return _context5.abrupt("return");

            case 30:
              _this.authComplete = true;
              _index2.default.navigateBack({
                complete: function complete() {
                  return setTimeout(function () {
                    return _auth2.default.triggerAuthCompelte();
                  }, 300);
                }
              });
              return _context5.abrupt("return");

            case 33:
              // 临时处理，兼容低配置安卓机
              setTimeout(function () {
                return _this.handleConsult(value);
              }, 500);
              // this.handleConsult(value);
              return _context5.abrupt("return");

            case 35:
              _im2.default.updateUnreadBadge();
              _index6.default.switchTab(_navigation.NAV_PAGES.HOME);
              return _context5.abrupt("break", 38);

            case 38:
              _context5.next = 43;
              break;

            case 40:
              _context5.prev = 40;
              _context5.t1 = _context5["catch"](1);

              console.log(_context5.t1);
              // Taro.switchTab({ url: `/pages/home/index` });

            case 43:
              _index2.default.hideLoading();
              return _context5.abrupt("return", true);

            case 45:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, _this2, [[1, 40]]);
    })), _this.handleConsult = function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(value) {
        var _service$dispatch$get, dispatchState, from, dispatchRoomId, cRouter, data, advisorRoomData;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _service$dispatch$get = _index4.default.dispatch.getState(), dispatchState = _service$dispatch$get.dispatchState, from = _service$dispatch$get.from, dispatchRoomId = _service$dispatch$get.dispatchRoomId;

                console.log('DEBUG: handleConsult => value.channelId', value);
                _index2.default.setStorageSync('__channelId__', value.channelId);

                if (!value.channelId) {
                  _context6.next = 11;
                  break;
                }

                cRouter = _index2.default.getApp().globalData.cRouter;
                _context6.next = 7;
                return _index4.default.adviser.getChannelInfo(value);

              case 7:
                data = _context6.sent;

                if (data) {
                  _context6.next = 11;
                  break;
                }

                cRouter.redirectTo({
                  path: _navigation.MERGE_ROUTE_CONFIG.STUDIO_PUBLIC_ERROR,
                  query: {
                    type: 'channelDisable'
                  }
                });
                return _context6.abrupt("return");

              case 11:
                if (!(dispatchState === _dispatch.DISPATCH_STATE.dispatching && from === 'customer-bot')) {
                  _context6.next = 14;
                  break;
                }

                _index2.default.showToast({
                  title: '您有咨询消息正在处理中，请稍等...',
                  icon: 'none',
                  mask: true
                });
                return _context6.abrupt("return");

              case 14:
                if (!(dispatchState === _dispatch.DISPATCH_STATE.dispatching)) {
                  _context6.next = 18;
                  break;
                }

                console.log('checkout dispatching room', dispatchRoomId, from);
                _im2.default.enterRoom(dispatchRoomId);
                return _context6.abrupt("return", dispatchRoomId);

              case 18:
                _context6.next = 20;
                return _index4.default.adviser.getAdvisorRoomInfo({
                  pattern: 'B',
                  retailId: _auth2.default.getUserInfo().retailId
                });

              case 20:
                _context6.t0 = _context6.sent;

                if (_context6.t0) {
                  _context6.next = 23;
                  break;
                }

                _context6.t0 = {};

              case 23:
                advisorRoomData = _context6.t0;

                if (advisorRoomData.roomId) {
                  _context6.next = 27;
                  break;
                }

                _index2.default.showToast({
                  title: '咨询失败，请重试',
                  icon: 'none',
                  mask: true
                });
                return _context6.abrupt("return");

              case 27:
                _im2.default.enterRoom(advisorRoomData.roomId, {
                  redirect: true,
                  channelId: value.channelId
                });

              case 28:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, _this2);
      }));

      return function (_x) {
        return _ref8.apply(this, arguments);
      };
    }(), _this.getActionParams = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      var _this$$router$params, scene, type, value, roomId, fcid, decodeValue, sceneData, parseData;

      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _this$$router$params = _this.$router.params, scene = _this$$router$params.scene, type = _this$$router$params.type, value = _this$$router$params.value, roomId = _this$$router$params.roomId, fcid = _this$$router$params.fcid;

              console.log('getActionParams  fcid:  ', fcid);
              decodeValue = {};

              if (!scene) {
                _context7.next = 13;
                break;
              }

              console.log('action sence:', scene);
              // handle scene
              _context7.next = 7;
              return _index4.default.common.getSceneData(scene);

            case 7:
              sceneData = _context7.sent;
              parseData = (0, _util.parseParams)(sceneData.queryString);

              type = parseData.type;
              try {
                decodeValue = JSON.parse(decodeURIComponent(parseData.value));
              } catch (error) {}
              _context7.next = 14;
              break;

            case 13:
              if (value) {
                decodeValue = JSON.parse(decodeURIComponent(value));
              }

            case 14:
              return _context7.abrupt("return", { type: type, value: decodeValue, roomId: roomId, fcid: fcid });

            case 15:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, _this2);
    })), _this.bindAdvisor = function () {
      var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(advisorId) {
        var userInfo, retailId, res;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                console.log('advisorId', advisorId);

                if (!advisorId) {
                  _context8.next = 8;
                  break;
                }

                userInfo = _auth2.default.getUserInfo();
                retailId = userInfo.retailId;
                _context8.next = 6;
                return _index4.default.adviser.bindAdvisor({
                  retailId: retailId,
                  bindStaffId: advisorId
                });

              case 6:
                res = _context8.sent;

                console.log('action bindres', res);

              case 8:
                // Taro.switchTab({ url: `/pages/home/index` });
                _index6.default.switchTab(_navigation.NAV_PAGES.HOME);
                return _context8.abrupt("return", true);

              case 10:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, _this2);
      }));

      return function (_x2) {
        return _ref10.apply(this, arguments);
      };
    }(), _this.consultAdviosr = function () {
      var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(advisorId, msg, formId) {
        var success;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (!advisorId) {
                  // Taro.switchTab({ url: `/pages/home/index` });
                  _index6.default.switchTab(_navigation.NAV_PAGES.HOME);
                }
                console.log('action consult advisor', advisorId);
                _context9.next = 4;
                return _im2.default.enterAdvisorRoom(advisorId, msg, true, formId);

              case 4:
                success = _context9.sent;

                if (!success) {
                  _index6.default.switchTab(_navigation.NAV_PAGES.HOME);
                }

              case 6:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, _this2);
      }));

      return function (_x3, _x4, _x5) {
        return _ref11.apply(this, arguments);
      };
    }(), _this.enterRoom = function () {
      var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(roomId, staffId) {
        var success;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                console.log('DEBUG: enterRoom -> roomId, staffId', roomId, staffId);
                _context10.next = 3;
                return _im2.default.enterRoom(roomId, {
                  autoJoin: staffId ? true : false,
                  staffId: staffId,
                  redirect: true
                });

              case 3:
                success = _context10.sent;

                console.log('success', success);
                if (!success) {
                  _index6.default.switchTab(_navigation.NAV_PAGES.HOME);
                }

              case 6:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, _this2);
      }));

      return function (_x6, _x7) {
        return _ref12.apply(this, arguments);
      };
    }(), _this.handleLogin = function () {
      var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(res) {
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                if (res.detail.userInfo) {
                  _context11.next = 4;
                  break;
                }

                console.log('登录失败信息：', res);
                _index2.default.showModal({
                  title: '',
                  content: '拒绝授权, 您将无法正常使用我们的功能',
                  showCancel: false
                });
                return _context11.abrupt("return");

              case 4:
                _context11.next = 6;
                return _this.onSetUserInfo();

              case 6:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, _this2);
      }));

      return function (_x8) {
        return _ref13.apply(this, arguments);
      };
    }(), _this.handleShowPass = function () {
      console.log('=========handleShowPass==========');
      _this.setState({
        showPass: !_this.state.showPass
      });
    }, _this.passWordChange = function (val) {
      _this.setState({
        userPassWord: val.currentTarget.value
      });
    }, _this.userNameChange = function (val) {
      _this.setState({
        userName: val.currentTarget.value
      });
    }, _this.getPhoneNumber = function (phone) {
      console.log(phone);
      if (!phone.detail.encryptedData) {
        return;
      }
      _index2.default.getUserInfo({
        success: function success(userInfo) {
          console.log(userInfo);
          var _userInfo$userInfo = userInfo.userInfo,
              nickName = _userInfo$userInfo.nickName,
              avatarUrl = _userInfo$userInfo.avatarUrl;
          // Taro.login({
          //   success: (res) => {
          //     console.log(res)

          _this.onwxlogin(nickName, avatarUrl, _this.state.loginCode, phone.detail.encryptedData, phone.detail.iv);
          // this.onwxlogin(nickName, avatarUrl, res.code, phone.detail.encryptedData, phone.detail.iv);
          //   }
          // });
        }
      });
    }, _this.onwxlogin = function () {
      var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(nick_name, avatar, code, encrypted_data, iv) {
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                console.log('~~~~~~~~~~~~~~~~~onwxlogin~~~~~~~~~~~~~~~~~', nick_name, avatar, code, encrypted_data, iv);
                _index2.default.showLoading({ title: '加载中' });
                _context12.prev = 2;
                _context12.next = 5;
                return _auth2.default.wxlogin(nick_name, avatar, code, encrypted_data, iv);

              case 5:
                _context12.next = 7;
                return _this.start();

              case 7:
                _index2.default.hideLoading();
                _index2.default.showToast({
                  title: '登录成功',
                  icon: 'success',
                  mask: true,
                  duration: 1500
                });
                _context12.next = 17;
                break;

              case 11:
                _context12.prev = 11;
                _context12.t0 = _context12["catch"](2);

                _index2.default.hideLoading();
                console.log(_context12.t0);
                _this.handleStartError();
                _index2.default.showToast({
                  title: _context12.t0 && _context12.t0.data && _context12.t0.data.error,
                  icon: 'none',
                  mask: true,
                  duration: 1500
                });

              case 17:
                _context12.prev = 17;

                _this.setState({ isLoading: false });
                return _context12.finish(17);

              case 20:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, _this2, [[2, 11, 17, 20]]);
      }));

      return function (_x9, _x10, _x11, _x12, _x13) {
        return _ref14.apply(this, arguments);
      };
    }(), _this.handleAccess = function () {
      var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(res) {
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                if (res.detail.userInfo) {
                  _context13.next = 4;
                  break;
                }

                console.log('登录失败信息：', res);
                _index2.default.showModal({
                  title: '',
                  content: '拒绝授权, 您可以使用”已有账号登录“功能',
                  showCancel: false
                });
                return _context13.abrupt("return");

              case 4:
                _index2.default.getUserInfo({
                  success: function success(userInfo) {
                    console.log(userInfo);
                    var _userInfo$userInfo2 = userInfo.userInfo,
                        nickName = _userInfo$userInfo2.nickName,
                        avatarUrl = _userInfo$userInfo2.avatarUrl;
                    var encryptedData = userInfo.encryptedData,
                        iv = userInfo.iv;
                    // Taro.login({
                    //   success: (res) => {
                    //     console.log(res)

                    _this.onwxlogin(nickName, avatarUrl, _this.state.loginCode, encryptedData, iv);
                    // this.onwxlogin(nickName, avatarUrl, res.code, phone.detail.encryptedData, phone.detail.iv);
                    //   }
                    // });
                  }
                });
                // this.setState({
                //   showPage: 'second'
                // });

              case 5:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, _this2);
      }));

      return function (_x14) {
        return _ref15.apply(this, arguments);
      };
    }(), _this.goPwdLogin = function () {
      console.log('~~~~~~~~~~~~~goPwdLogin~~~~~~~~~~~~~');
      _this.setState({
        showPage: 'third'
      });
    }, _this.customComponents = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Login, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(Login.prototype.__proto__ || Object.getPrototypeOf(Login.prototype), "_constructor", this).call(this, props);
      this.authComplete = false;
      this.state = {
        canShow: false,
        isLoading: false,
        hasAuthed: true,
        userName: '',
        userPassWord: '',
        showPass: true,
        showPage: '',
        loginCode: '',
        nickName: '',
        avatarUrl: ''
      };
      this.$$refs = [];
    }
  }, {
    key: "componentWillMount",
    value: function () {
      var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _index4.default.detect.getDetectControl().then(function (res) {
                  _index9.default.dispatch((0, _detect.saveDetectState)({
                    needDetect: res
                  }));
                });
                // Taro.showLoading();
                this.initNavigation();
                _context14.next = 4;
                return this.start();

              case 4:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function componentWillMount() {
        return _ref16.apply(this, arguments);
      }

      return componentWillMount;
    }()
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (!this.authComplete) {
        _auth2.default.triggerAuthCompelte();
      }
    }
  }, {
    key: "componentDidShow",
    value: function componentDidShow() {
      var _this3 = this;

      _index2.default.setNavigationBarTitle({ title: _ext2.default.APP_NAME });
      console.log('~~~~~~~~~~getSystemInfoSync~~~~~~~~~~~', _index2.default.getSystemInfoSync());
      if (_index2.default.getSystemInfoSync().inFinChat) {
        this.setState({
          showPage: 'third'
        });
      } else {
        this.setState({
          showPage: 'first'
        });
        _index2.default.login({
          success: function success(res) {
            _this3.setState({
              loginCode: res.code
            });
          }
        });
      }

      // Taro.getUserInfo({
      //   success: (userInfo) => {
      //     const {nickName, avatarUrl} = userInfo.userInfo;
      //     this.setState({
      //       nickName,
      //       avatarUrl
      //     })
      //   }
      // })
    }
  }, {
    key: "onShareAppMessage",
    value: function onShareAppMessage() {
      return {
        title: _ext2.default.APP_NAME,
        path: 'pages/login/index',
        imageUrl: shareImage
      };
    }
  }, {
    key: "initNavigation",
    value: function () {
      var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
        var initStyle;
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                initStyle = this.getInitStyle();

                console.log('LOGIN INITNAVIGATION');
                console.log(initStyle);
                _index6.default.initNavigation([{ url: _navigation.NAV_PAGES.LOGIN }], initStyle);

              case 4:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      function initNavigation() {
        return _ref17.apply(this, arguments);
      }

      return initNavigation;
    }()
  }, {
    key: "checkCompatible",
    value: function checkCompatible() {
      var wcSystemInfo = _index2.default.getSystemInfoSync();
      // console.log(wcSystemInfo);
      var canRun = (0, _version.isCompatible)(wcSystemInfo.SDKVersion);
      if (!canRun) {
        _index2.default.showModal({
          title: '',
          content: '当前微信版本较低, 请升级至最新版本',
          showCancel: false
        });
      }

      return canRun;
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;

      var _state = this.__state,
          showPass = _state.showPass,
          showPage = _state.showPage;

      var systeminfo = _index2.default.getSystemInfoSync();
      console.log('LOGIN RENDER');
      console.log(this.__props);
      if (this.__state.canShow && !this.__state.hasAuthed && showPage === 'first' && !systeminfo.inFinChat) {} else if (this.__state.canShow && !this.__state.hasAuthed && showPage === 'second' && !systeminfo.inFinChat) {} else if (this.__state.canShow && !this.__state.hasAuthed && showPage === 'third') {}
      Object.assign(this.__state, {
        systeminfo: systeminfo,
        loginLogo: loginLogo,
        favicon: favicon,
        showPassImg: showPassImg,
        hidePassImg: hidePassImg,
        logoImage: logoImage
      });
      return this.__state;
    }
  }]);

  return Login;
}(_index.Component)) || _class);
Login.$$events = ["handleAccess", "goPwdLogin", "getPhoneNumber", "userNameChange", "passWordChange", "handleShowPass", "onSetUserInfo", "handleLogin"];
Login.$$componentPath = "pages/login/index";
exports.default = Login;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Login, true));