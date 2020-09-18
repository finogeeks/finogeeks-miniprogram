"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _auth = require("../../model/auth.js");

var _auth2 = _interopRequireDefault(_auth);

var _im = require("../../model/im.js");

var _im2 = _interopRequireDefault(_im);

var _ext = require("../../utils/ext.js");

var _ext2 = _interopRequireDefault(_ext);

var _index3 = require("../../router/index.js");

var _index4 = _interopRequireDefault(_index3);

var _navigation = require("../../constants/navigation.js");

var _index5 = require("../../service/index.js");

var _index6 = _interopRequireDefault(_index5);

var _index7 = require("../../matrix/index.js");

var _index8 = _interopRequireDefault(_index7);

var _api = require("../../utils/api.js");

var _globaldata = require("../../utils/globaldata.js");

var _refreshjwt = require("../../utils/refreshjwt.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Me = function (_BaseComponent) {
  _inherits(Me, _BaseComponent);

  function Me() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    _classCallCheck(this, Me);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Me.__proto__ || Object.getPrototypeOf(Me)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["$compid__1", "$compid__2", "$compid__3", "authModel", "account", "userInfo", "init", "mobile", "appName"], _this.config = {
      navigationBarTitleText: '我的',
      navigationBarBackgroundColor: _ext2.default.THEME_COLOR.NAV_bg,
      navigationBarTextStyle: 'black',
      navigationStyle: 'custom'
    }, _this.handleInitUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var userInfo;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              userInfo = _auth2.default.getUserSession();
              _context.next = 3;
              return _index8.default.user.getUser(userInfo.userId);

            case 3:
              userInfo = _context.sent;

              _this.setState({ userInfo: userInfo });
              _context.next = 7;
              return _this.checkAccount(userInfo.retailId);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this2);
    })), _this.checkAccount = function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(fcid) {
        var accounts, searchIndex;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (fcid) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return");

              case 2:
                _context2.prev = 2;
                _context2.next = 5;
                return _index6.default.user.getAccount(fcid);

              case 5:
                accounts = _context2.sent;
                searchIndex = accounts.findIndex(function (account) {
                  return account.accountType === 'icbc';
                });

                if (searchIndex > -1) {
                  _this.setState({ account: accounts[searchIndex] });
                } else {
                  _this.setState({
                    account: accounts.find(function (account) {
                      return account.accountType === 'weixin';
                    })
                  });
                }
                _context2.next = 12;
                break;

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2["catch"](2);

              case 12:
                _context2.prev = 12;

                _this.setState({ init: true });
                return _context2.finish(12);

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, _this2, [[2, 10, 12, 15]]);
      }));

      return function (_x) {
        return _ref3.apply(this, arguments);
      };
    }(), _this.isNotBind = function () {
      return !_this.state.account || _this.state.account.accountType !== 'icbc' || !_this.state.account.accountData || !_this.state.account.accountData.phone;
    }, _this.handleBinding = function () {
      if (!_this.state.init) {
        return;
      }
      if (!_this.state.account || !_this.state.account.accountType) {
        _this.checkAccount(_this.userInfo && _this.userInfo.retailId);
      } else {
        // Taro.navigateTo({
        //   url: `/packages/common/pages/binding/index?account=${JSON.stringify(this.state.account)}`
        // })
        _index4.default.navigateTo(_navigation.NAV_PAGES.BINDING, {
          account: JSON.stringify(_this.state.account)
        });
      }
    }, _this.handleSetting = function () {
      _index2.default.navigateTo({
        url: _navigation.NAV_PAGES.SETTING
      });
      // wxRouter.navigateTo(NAV_PAGES.SETTING);
    }, _this.handlePrivacy = function () {
      // Taro.navigateTo({
      //   url: '/packages/common/pages/privacy/index'
      // })
      _index4.default.navigateTo(_navigation.NAV_PAGES.PRIVACY);
    }, _this.goToAuthPage = function () {
      if (_auth2.default.isAuth) {
        return;
      }_auth2.default.goToAuthPage();
    }, _this.handleLogOut = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              (0, _refreshjwt.stopJwtRefresh)();
              _index2.default.showLoading({ title: '正在退出' });
              _context3.next = 4;
              return (0, _api.logout)();

            case 4:
              _context3.next = 6;
              return _im2.default.stop();

            case 6:
              _context3.next = 8;
              return _auth2.default.clearAuth();

            case 8:
              (0, _globaldata.set)('showRoomList', false);
              (0, _globaldata.set)('firstRenderHome', true);
              (0, _globaldata.set)('hasEnterRoom', false);
              // store.dispatch(deleteAllRooms());
              setTimeout(function () {
                // Taro.redirectTo({ url: NAV_PAGES.LOGIN });
                _index2.default.reLaunch({
                  url: _navigation.NAV_PAGES.LOGIN
                });
                _index2.default.hideLoading();
              }, 1000);

            case 12:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, _this2);
    })), _this.customComponents = ["NavBar", "Avatar", "ListItem"], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Me, [{
    key: "_constructor",
    value: function _constructor() {
      _get(Me.prototype.__proto__ || Object.getPrototypeOf(Me.prototype), "_constructor", this).call(this);
      this.appName = _ext2.default.APP_NAME;
      this.state = {
        account: null,
        userInfo: {},
        init: false,
        mobile: '',
        appName: _ext2.default.APP_NAME
      };
      this.$$refs = [];
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      // wx.setNavigationBarColor({
      //   frontColor: '#ffffff',
      //   backgroundColor: extInfo.THEME_COLOR.NAV_bg,
      // });
      this.handleInitUser();
      // if (authModel.isAuth) {
      //   this.handleInitUser();
      //   this.initMobile();
      // }
    }

    // initMobile = () => {
    //   const userInfo = authModel.getUserInfo();
    //   this.setState({ mobile: userInfo.mobile });
    // };

  }, {
    key: "componentDidShow",
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var _ref6, code;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (_index2.default.getSystemInfoSync().inFinChat) {
                  _context4.next = 6;
                  break;
                }

                _context4.next = 3;
                return _index2.default.login();

              case 3:
                _ref6 = _context4.sent;
                code = _ref6.code;

                this.setState({ code: code });

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function componentDidShow() {
        return _ref5.apply(this, arguments);
      }

      return componentDidShow;
    }()
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;
      var $compid__1 = (0, _index.genCompid)(__prefix + "$compid__1");
      var $compid__2 = (0, _index.genCompid)(__prefix + "$compid__2");
      var $compid__3 = (0, _index.genCompid)(__prefix + "$compid__3");

      console.log('~~~~~~~~~~~~page me~~~~~~~~~~~~');
      console.log(this.__state.userInfo);
      _index.propsManager.set({
        "showBackBtn": false,
        "title": '我的'
      }, $compid__1);
      _index.propsManager.set({
        "className": "avatar",
        "url": this.__state.userInfo.avatar,
        "circle": true,
        "outterCircle": true,
        "size": 140
      }, $compid__2);
      _index.propsManager.set({
        "name": "\u8BBE\u7F6E",
        "icon": "\uE620",
        "hasRightArrow": true,
        "activeStyle": true,
        "onClick": this.handleSetting
      }, $compid__3);
      Object.assign(this.__state, {
        $compid__1: $compid__1,
        $compid__2: $compid__2,
        $compid__3: $compid__3,
        authModel: _auth2.default
      });
      return this.__state;
    }
  }]);

  return Me;
}(_index.Component);

Me.$$events = ["goToAuthPage", "handleLogOut"];
Me.$$componentPath = "pages/me/index";
exports.default = Me;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Me, true));