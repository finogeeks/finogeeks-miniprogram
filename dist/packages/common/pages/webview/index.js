"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _index = require("../../../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../../../npm/qs/lib/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../../../../service/index.js");

var _index6 = _interopRequireDefault(_index5);

var _im = require("../../../../model/im.js");

var _im2 = _interopRequireDefault(_im);

var _auth = require("../../../../model/auth.js");

var _auth2 = _interopRequireDefault(_auth);

var _index7 = require("../../../../router/index.js");

var _index8 = _interopRequireDefault(_index7);

var _navigation = require("../../../../constants/navigation.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import NavBar from "@/components/nav-bar";


var WebPage = function (_BaseComponent) {
  _inherits(WebPage, _BaseComponent);

  function WebPage() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    _classCallCheck(this, WebPage);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = WebPage.__proto__ || Object.getPrototypeOf(WebPage)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "url"], _this.config = {
      navigationBarTitleText: '跳转中'
    }, _this.onMessage = function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(event) {
        var datas, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, data;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log('onMessage data', event.detail.data);
                datas = event.detail.data;

                // record consult action

                _this.willConsult = !!datas.find(function (data) {
                  return data.action === 'CONSULT' || data.action === 'CONSULT_ADVISOR';
                });

                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 6;
                _iterator = datas[Symbol.iterator]();

              case 8:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 26;
                  break;
                }

                data = _step.value;
                _context.t0 = data.action;
                _context.next = _context.t0 === 'BIND_PHONE' ? 13 : _context.t0 === 'CONSULT' ? 16 : _context.t0 === 'CONSULT_ADVISOR' ? 19 : 22;
                break;

              case 13:
                _context.next = 15;
                return _this.bindPhone();

              case 15:
                return _context.abrupt("break", 23);

              case 16:
                _context.next = 18;
                return _this.consult(data.payload.message);

              case 18:
                return _context.abrupt("break", 23);

              case 19:
                _context.next = 21;
                return _this.consultAdvisor(data.payload.staffId, data.payload.message);

              case 21:
                return _context.abrupt("break", 23);

              case 22:
                return _context.abrupt("break", 23);

              case 23:
                _iteratorNormalCompletion = true;
                _context.next = 8;
                break;

              case 26:
                _context.next = 32;
                break;

              case 28:
                _context.prev = 28;
                _context.t1 = _context["catch"](6);
                _didIteratorError = true;
                _iteratorError = _context.t1;

              case 32:
                _context.prev = 32;
                _context.prev = 33;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 35:
                _context.prev = 35;

                if (!_didIteratorError) {
                  _context.next = 38;
                  break;
                }

                throw _iteratorError;

              case 38:
                return _context.finish(35);

              case 39:
                return _context.finish(32);

              case 40:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this2, [[6, 28, 32, 40], [33,, 35, 39]]);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }(), _this.bindPhone = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var _authModel$getUserSes, fcid, jwt, accessToken, accountType, _authModel$getUserInf, phone, searchStart, search, query, newUrl;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(!_auth2.default.getUserInfo().accountData.phone && !_this.restarting)) {
                _context2.next = 18;
                break;
              }

              _context2.prev = 1;

              _this.restarting = true;
              // TODO: replace this
              _context2.next = 5;
              return _index6.default.reStart();

            case 5:
              _authModel$getUserSes = _auth2.default.getUserSession(), fcid = _authModel$getUserSes.userId, jwt = _authModel$getUserSes.jwt, accessToken = _authModel$getUserSes.accessToken, accountType = _authModel$getUserSes.accountType;
              _authModel$getUserInf = _auth2.default.getUserInfo(), phone = _authModel$getUserInf.mobile;

              if (phone) {
                searchStart = _this.state.url.indexOf('?');
                search = _this.state.url.slice(searchStart + 1);
                query = _index4.default.parse(search);

                Object.assign(query, {
                  fcid: fcid,
                  jwt: jwt,
                  accessToken: accessToken,
                  accountType: accountType,
                  phone: phone
                });
                console.log('new query', query);
                newUrl = _this.state.url.slice(0, searchStart) + "?" + _index4.default.stringify(query);

                _this.refreshWebview(newUrl);
              }
              _context2.next = 13;
              break;

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](1);

              console.error('Bind phone fail!', _context2.t0);

            case 13:
              _context2.prev = 13;

              _this.restarting = false;
              return _context2.finish(13);

            case 16:
              _context2.next = 19;
              break;

            case 18:
              console.warn('The phone is already bound!');

            case 19:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, _this2, [[1, 10, 13, 16]]);
    })), _this.consult = function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(text) {
        var sendMsg, userInfo, staffId, retailId, dispatchQuestionType;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (text) {
                  try {
                    sendMsg = decodeURIComponent(text);
                    userInfo = _auth2.default.getUserInfo();
                    staffId = userInfo.bindStaffId;
                    retailId = userInfo.retailId;
                    dispatchQuestionType = '投资理财';

                    if (userInfo.bindStaffId) {
                      _im2.default.enterAdvisorRoom(staffId, sendMsg, true);
                    } else {
                      _im2.default.enterDisptachRoom(retailId, dispatchQuestionType, sendMsg);
                    }
                  } catch (error) {
                    console.error('decode message fail');
                  }
                }

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, _this2);
      }));

      return function (_x2) {
        return _ref4.apply(this, arguments);
      };
    }(), _this.consultAdvisor = function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(staffId, msg) {
        var success;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _im2.default.enterAdvisorRoom(staffId, msg, true);

              case 2:
                success = _context4.sent;

                if (!success) {
                  _index8.default.switchTab(_navigation.NAV_PAGES.HOME);
                }

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, _this2);
      }));

      return function (_x3, _x4) {
        return _ref5.apply(this, arguments);
      };
    }(), _this.refreshWebview = function (newUrl) {
      // if going to consult or will unmount, not redirect to webview
      if (!_this.willConsult && !_this.willUnmount) {
        // Taro.redirectTo({
        //   url: `/packages/common/pages/webview/index?url=${encodeURIComponent(newUrl || this.state.url)}`,
        // })
        _index8.default.redirectTo(_navigation.NAV_PAGES.WEBVIEW, {
          url: encodeURIComponent(newUrl || _this.state.url)
        });
      }
    }, _this.customComponents = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(WebPage, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(WebPage.prototype.__proto__ || Object.getPrototypeOf(WebPage.prototype), "_constructor", this).call(this, props);
      this.state = {
        url: this.$router.params.url
      };
      this.restarting = false;
      this.willConsult = false;
      this.willUnmount = false;
      this.$$refs = [];
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var title = this.$router.params.title;

      if (title) {
        _index2.default.setNavigationBarTitle({ title: decodeURIComponent(title) });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.willUnmount = true;
    }

    // onShareAppMessage(options) {
    //   if (options.webViewUrl.includes('lottery')) {
    //     this.shareActivity();
    //     return {
    //       title: '我在工行猜红包，快来助我一臂之力吧！',
    //       path: '/pages/login/index',
    //       imageUrl:
    //         extInfo.BASE_URL + '/statics/images/activity/share.png',
    //     };
    //   }
    // }

    // shareActivity = async () => {
    //   try {
    //     await shareActivityDaily();
    //     if (!this.restarting) {
    //       this.refreshWebview();
    //     }
    //   } catch (error) {}
    // };

    // share and webview destroy will trigger 'onMessage' twice

  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;

      var url = this.__state.url;

      console.log('Webview url', decodeURIComponent(url));
      var anonymousState__temp = decodeURIComponent(url);
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp
      });
      return this.__state;
    }
  }]);

  return WebPage;
}(_index.Component);

WebPage.$$events = ["onMessage"];
WebPage.$$componentPath = "packages/common/pages/webview/index";
exports.default = WebPage;

Component(require('../../../../npm/@tarojs/taro-weapp/index.js').default.createComponent(WebPage, true));