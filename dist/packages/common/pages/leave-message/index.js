"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dec, _class;
// import { NAV_PAGES } from "@/constants/navigation";
// import NavBar from "@/components/nav-bar";


var _index = require("../../../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _ext = require("../../../../utils/ext.js");

var _ext2 = _interopRequireDefault(_ext);

var _index3 = require("../../../../npm/@tarojs/redux/index.js");

var _index4 = require("../../../../service/index.js");

var _index5 = _interopRequireDefault(_index4);

var _index6 = require("../../../../router/index.js");

var _index7 = _interopRequireDefault(_index6);

var _store = require("../../../../utils/store.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var activeBtnStyle = {
  color: '#FFF',
  backgroundColor: _ext2.default.THEME_COLOR.Btn_n
};

var disabledBtnStyle = {
  color: 'FFF',
  backgroundColor: _ext2.default.THEME_COLOR.Btn_d
};

var mapStateToProps = function mapStateToProps(_ref) {
  var user = _ref.user;

  var _ref2 = user.location || {},
      city = _ref2.city,
      district = _ref2.district;

  var userCity = city + district || null;
  return {
    userCity: userCity
  };
};

var LeaveMessage = (_dec = (0, _index3.connect)(mapStateToProps), _dec(_class = function (_BaseComponent) {
  _inherits(LeaveMessage, _BaseComponent);

  function LeaveMessage() {
    var _ref3,
        _this2 = this;

    var _temp, _this, _ret;

    _classCallCheck(this, LeaveMessage);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref3 = LeaveMessage.__proto__ || Object.getPrototypeOf(LeaveMessage)).call.apply(_ref3, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "question", "questionPlaceholder", "selectLocation", "region", "bankList", "selectIdx", "notFindBank", "email", "mobile", "userCity"], _this.config = {
      navigationBarTitleText: '留言'
    }, _this.componentDidMount = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!_this.state.selectLocation) {
                _context.next = 5;
                break;
              }

              _index2.default.showLoading({ title: '加载中' });
              _context.next = 4;
              return _this.initLoaction();

            case 4:
              _index2.default.hideLoading();

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this2);
    })), _this.initLoaction = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var loaction, res, _res$result$address_c, province, city, district, region;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _index2.default.getLocation();

            case 3:
              loaction = _context2.sent;
              _context2.next = 6;
              return _index5.default.common.getGeoInfo(loaction.latitude, loaction.longitude);

            case 6:
              res = _context2.sent;

              console.log('res', res);
              _res$result$address_c = res.result.address_component, province = _res$result$address_c.province, city = _res$result$address_c.city, district = _res$result$address_c.district;
              region = [province, city, district];

              _this.setState({ region: region });
              _this.getBankList(city.split('市')[0]);
              _context2.next = 16;
              break;

            case 14:
              _context2.prev = 14;
              _context2.t0 = _context2["catch"](0);

            case 16:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, _this2, [[0, 14]]);
    })), _this.getBankList = function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(name) {
        var res, bankList, notFindBank;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _index5.default.adviser.searchBank({ name: name });

              case 2:
                res = _context3.sent;
                bankList = res.length > 0 ? [{ id: 'all', name: '全部' }].concat(_toConsumableArray(res)) : [];
                notFindBank = !bankList || bankList.length === 0;

                _this.setState({ bankList: bankList, notFindBank: notFindBank });

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, _this2);
      }));

      return function (_x) {
        return _ref6.apply(this, arguments);
      };
    }(), _this.handleQuestionInput = function (e) {
      var value = e.detail.value;

      _this.setState({
        question: value
      });
    }, _this.handleMobileInput = function (e) {
      var value = e.detail.value;

      _this.setState({
        mobile: value
      });
    }, _this.handleEmailInput = function (e) {
      var value = e.detail.value;

      _this.setState({
        email: value
      });
    }, _this.handleSubmit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var _this$state, question, mobile, email, bankList, notFindBank, selectIdx, roomId, mobileRes, emailRes, location, userSession, groupIds, selectedId, res;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!_this.isLoading) {
                _context4.next = 2;
                break;
              }

              return _context4.abrupt("return");

            case 2:
              _this$state = _this.state, question = _this$state.question, mobile = _this$state.mobile, email = _this$state.email, bankList = _this$state.bankList, notFindBank = _this$state.notFindBank, selectIdx = _this$state.selectIdx;
              roomId = _this.$router.params.roomId;
              mobileRes = mobile ? _this.checkMobile(mobile) : true;
              emailRes = email ? _this.checkEmail(email) : true;

              if (question) {
                _context4.next = 9;
                break;
              }

              _index2.default.showToast({
                title: '请输入想要咨询的问题',
                icon: 'none',
                mask: true
              });
              return _context4.abrupt("return");

            case 9:
              if (emailRes) {
                _context4.next = 12;
                break;
              }

              _index2.default.showToast({
                title: '请输入正确的邮箱地址',
                icon: 'none',
                mask: true
              });
              return _context4.abrupt("return");

            case 12:
              if (mobileRes) {
                _context4.next = 15;
                break;
              }

              _index2.default.showToast({
                title: '请输入正确的手机号码',
                icon: 'none',
                mask: true
              });
              return _context4.abrupt("return");

            case 15:
              _this.isLoading = true;
              _context4.prev = 16;
              location = void 0;
              _context4.prev = 18;
              _context4.next = 21;
              return _index2.default.getLocation();

            case 21:
              location = _context4.sent;
              _context4.next = 27;
              break;

            case 24:
              _context4.prev = 24;
              _context4.t0 = _context4["catch"](18);

              console.log(_context4.t0);

            case 27:
              userSession = (0, _store.getCacheSync)('userSession');

              _index2.default.showLoading({
                title: '提交中'
              });
              groupIds = [];

              if (!notFindBank && bankList.length !== 0) {
                selectedId = bankList[selectIdx].id;

                console.log('notFindBank', notFindBank, bankList);
                groupIds = selectedId === 'all' ? bankList.slice(1).map(function (bank) {
                  return bank.id;
                }) : [selectedId];
              }
              console.log(groupIds);
              _context4.next = 34;
              return _index5.default.adviser.leaveMsg({
                question: question,
                email: email,
                phone: mobile,
                location: location && {
                  latitude: location.latitude,
                  longitude: location.longitude
                },
                roomId: roomId,
                retailId: userSession['userId'],
                groupIds: groupIds,
                city: _this.props.userCity
              });

            case 34:
              res = _context4.sent;

              _index2.default.hideLoading();
              if (res) {
                // Taro.navigateBack()
                _index7.default.navigateBack();
              } else {
                _index2.default.hideLoading();
                _index2.default.showToast({
                  title: '提交失败',
                  icon: 'none',
                  mask: true
                });
              }
              _this.isLoading = false;
              _context4.next = 44;
              break;

            case 40:
              _context4.prev = 40;
              _context4.t1 = _context4["catch"](16);

              console.log(_context4.t1);
              _this.isLoading = false;

            case 44:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, _this2, [[16, 40], [18, 24]]);
    })), _this.checkEmail = function (value) {
      var pattern = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;
      if (pattern.test(value)) {
        return true;
      }
      return false;
    }, _this.checkMobile = function (value) {
      if (value.length !== 11) {
        return false;
      }
      return true;
    }, _this.handleRegionChange = function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(e) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _this.setState({
                  region: e.detail.value
                });
                // const res = await service.getMxClient().searchBank({ name: '深圳'});
                _this.getBankList(e.detail.value[1].split('市')[0]);

              case 2:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, _this2);
      }));

      return function (_x2) {
        return _ref8.apply(this, arguments);
      };
    }(), _this.handleBankChange = function (e) {
      _this.setState({
        selectIdx: e.detail.value
      });
    }, _this.checkRegion = function () {
      if (_this.state.region.length === 0) {
        _index2.default.showToast({
          title: '请先选择地区',
          icon: 'none',
          mask: true
        });
      }
    }, _this.customComponents = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(LeaveMessage, [{
    key: "_constructor",
    value: function _constructor() {
      _get(LeaveMessage.prototype.__proto__ || Object.getPrototypeOf(LeaveMessage.prototype), "_constructor", this).call(this);
      this.isLoading = false;
      this.state = {
        email: '',
        mobile: '',
        question: '',
        questionPlaceholder: '为了更好地为您解决问题，请告知我们以下内容：\r\n1.您的姓名\r\n2.问题描述',
        selectLocation: _ext2.default.CUSTOM_CONFIG.LEAVE_MESSAGE_SELECT_LOCATION,
        region: [],
        bankList: [],
        notFindBank: false,
        selectIdx: 0
      };
      this.$$refs = [];
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {}
  }, {
    key: "componentDidShow",
    value: function componentDidShow() {
      _index2.default.setNavigationBarTitle({ title: '留言' });
    }
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

      var _state = this.__state,
          question = _state.question,
          email = _state.email,
          mobile = _state.mobile,
          questionPlaceholder = _state.questionPlaceholder,
          selectLocation = _state.selectLocation,
          region = _state.region,
          bankList = _state.bankList,
          selectIdx = _state.selectIdx,
          notFindBank = _state.notFindBank;


      var anonymousState__temp = (0, _index.internal_inline_style)(question ? activeBtnStyle : disabledBtnStyle);
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp
      });
      return this.__state;
    }
  }]);

  return LeaveMessage;
}(_index.Component)) || _class);
LeaveMessage.$$events = ["handleQuestionInput", "handleRegionChange", "checkRegion", "handleBankChange", "handleEmailInput", "handleMobileInput", "handleSubmit"];
LeaveMessage.$$componentPath = "packages/common/pages/leave-message/index";
exports.default = LeaveMessage;

Component(require('../../../../npm/@tarojs/taro-weapp/index.js').default.createComponent(LeaveMessage, true));