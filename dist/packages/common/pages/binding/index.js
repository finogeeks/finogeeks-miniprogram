"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _index = require("../../../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _ext = require("../../../../utils/ext.js");

var _ext2 = _interopRequireDefault(_ext);

var _index3 = require("../../../../service/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../../../../router/index.js");

var _index6 = _interopRequireDefault(_index5);

var _store = require("../../../../utils/store.js");

var _navigation = require("../../../../constants/navigation.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import isEmpty from '@/utils/lodash-local/is-equal'

// TODO: replace this

// import NavBar from "@/components/nav-bar";


var MAX_SMSCODE_INTERVAL = 60;

var Binding = function (_BaseComponent) {
  _inherits(Binding, _BaseComponent);

  function Binding() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    _classCallCheck(this, Binding);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Binding.__proto__ || Object.getPrototypeOf(Binding)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "anonymousState__temp2", "anonymousState__temp3", "$compid__23", "step", "isLoading", "canConfirm", "sendCodeRemain", "canSendCode"], _this.config = {
      navigationBarTitleText: '手机绑定',
      navigationBarBackgroundColor: _ext2.default.THEME_COLOR.NAV_bg,
      navigationBarTextStyle: 'black'
    }, _this.handleSendSmsCode = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!_this.state.canSendCode || _this.state.sendCodeRemain > 0)) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return");

            case 2:
              _context.prev = 2;

              _index2.default.showLoading({
                title: '获取中'
              });
              _context.next = 6;
              return _index4.default.common.sendSmsCode(_this.phone);

            case 6:
              if (_this.timer) {
                clearInterval(_this.timer);
                _this.timer = null;
              }
              _this.setState({
                sendCodeRemain: MAX_SMSCODE_INTERVAL,
                canSendCode: false
              });
              _this.timer = setInterval(function () {
                if (_this.state.sendCodeRemain === 0) {
                  _this.setState(_defineProperty({
                    canSendCode: true
                  }, "canSendCode", _this.phone.length >= 11));
                  clearInterval(_this.timer);
                  _this.timer = null;
                  return;
                }
                _this.setState({ sendCodeRemain: _this.state.sendCodeRemain - 1 });
              }, 1000);
              _context.next = 14;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](2);

              _index2.default.showModal({
                title: '获取失败',
                content: '获取验证码失败，请稍后重试',
                showCancel: false
              });

            case 14:
              _context.prev = 14;

              _index2.default.hideLoading();
              return _context.finish(14);

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this2, [[2, 11, 14, 17]]);
    })), _this.handleSubmit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var userSession, openId;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(_this.loading || !_this.state.canConfirm)) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return");

            case 2:
              _context2.prev = 2;

              _this.loading = true;
              _this.setState({ isLoading: true });
              _index2.default.showLoading({
                title: '提交中'
              });
              userSession = (0, _store.getCacheSync)('userSession');
              openId = userSession['openId'] || '';
              _context2.next = 10;
              return _index4.default.common.bindAccount({
                prev: {
                  fcid: _this.account.fcid,
                  accountId: _this.account.accountId,
                  accountType: _this.account.accountType
                },
                accountId: _this.phone,
                accountData: {
                  phone: _this.phone,
                  smsCode: _this.code,
                  openId: openId
                }
              });

            case 10:
              _context2.next = 12;
              return _this.handleRestart();

            case 12:
              _this.setState({ step: 1 });

              // 临时 de active activity
              // if (!isEmpty(wxService.getActivity())) {
              //   countBinding().catch(() => {})
              // }
              _context2.next = 19;
              break;

            case 15:
              _context2.prev = 15;
              _context2.t0 = _context2["catch"](2);

              console.log(_context2.t0);
              _index2.default.showModal({
                title: '提交失败',
                content: _context2.t0.data && _context2.t0.data.error || '未知错误',
                showCancel: false
              });

            case 19:
              _context2.prev = 19;

              _this.loading = false;
              _this.setState({ isLoading: false });
              _index2.default.hideLoading();
              return _context2.finish(19);

            case 24:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, _this2, [[2, 15, 19, 24]]);
    })), _this.handleBack = function () {
      _index6.default.switchTab(_navigation.NAV_PAGES.ME);
    }, _this.handleRestart = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _index4.default.reStart();

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, _this2);
    })), _this.handlePhoneInput = function (event) {
      var value = event.detail.value;

      _this.phone = value;
      var canSendCode = _this.phone.length >= 11 && !_this.timer;
      _this.setState({
        canSendCode: canSendCode,
        canConfirm: canSendCode && _this.code.length >= 4
      });
    }, _this.handleCodeInput = function (event) {
      var value = event.detail.value;

      _this.code = value;
      _this.setState({
        canConfirm: _this.code.length >= 4 && _this.phone.length >= 11
      });
    }, _this.customComponents = ["ListItem"], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Binding, [{
    key: "_constructor",
    value: function _constructor() {
      _get(Binding.prototype.__proto__ || Object.getPrototypeOf(Binding.prototype), "_constructor", this).call(this);
      this.account = null;
      this.timer = null;
      this.phone = '';
      this.code = '';
      this.loading = false;
      this.state = {
        step: -1,
        isLoading: false,
        canConfirm: false,
        sendCodeRemain: 0,
        canSendCode: false
      };
      this.$$refs = [];
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var account = this.$router.params.account;

      if (!account) {
        return;
      }
      this.account = JSON.parse(account);
      if (this.account.accountType === 'icbc') {
        this.setState({ step: 2 });
      } else {
        this.setState({ step: 0 });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
      if (this.state.step === 1) {
        this.handleBack();
      }
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;
      var $compid__23 = (0, _index.genCompid)(__prefix + "$compid__23");

      if (this.__state.step === -1) {}
      var smsBtnStyle = !this.__state.isLoading && this.__state.canSendCode ? {
        color: '#FFF',
        backgroundColor: _ext2.default.THEME_COLOR.Btn_n
      } : {
        color: '#FFF',
        backgroundColor: _ext2.default.THEME_COLOR.Btn_d
      };
      var confirmBtnStyle = !this.__state.isLoading && this.__state.canConfirm ? {
        color: '#FFF',
        backgroundColor: _ext2.default.THEME_COLOR.Btn_n
      } : {
        color: '#FFF',
        backgroundColor: _ext2.default.THEME_COLOR.Btn_d
      };
      var anonymousState__temp = this.__state.step === 0 ? (0, _index.internal_inline_style)(smsBtnStyle) : null;
      var anonymousState__temp2 = this.__state.step === 0 ? (0, _index.internal_inline_style)(confirmBtnStyle) : null;
      var anonymousState__temp3 = this.__state.step === 1 ? (0, _index.internal_inline_style)({
        color: '#FFF',
        backgroundColor: _ext2.default.THEME_COLOR.Btn_n
      }) : null;
      this.__state.step === 2 && _index.propsManager.set({
        "name": "\u624B\u673A\u53F7",
        "statusText": this.account.accountData.phone || ''
      }, $compid__23);
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp,
        anonymousState__temp2: anonymousState__temp2,
        anonymousState__temp3: anonymousState__temp3,
        $compid__23: $compid__23
      });
      return this.__state;
    }
  }]);

  return Binding;
}(_index.Component);

Binding.$$events = ["handlePhoneInput", "handleCodeInput", "handleSendSmsCode", "handleSubmit", "handleBack"];
Binding.$$componentPath = "packages/common/pages/binding/index";
exports.default = Binding;

Component(require('../../../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Binding, true));