"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _index = require("../../../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../../../service/index.js");

var _index4 = _interopRequireDefault(_index3);

var _im = require("../../../../model/im.js");

var _im2 = _interopRequireDefault(_im);

var _store = require("../../../../utils/store.js");

var _index5 = require("../../../../router/index.js");

var _index6 = _interopRequireDefault(_index5);

var _navigation = require("../../../../constants/navigation.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import NavBar from "@/components/nav-bar";


var History = function (_BaseComponent) {
  _inherits(History, _BaseComponent);

  function History() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, History);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = History.__proto__ || Object.getPrototypeOf(History)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "loopArray6", "timeline"], _this.config = {
      navigationBarTitleText: '聊天记录'
    }, _this.handleVideo = function (video) {
      // Taro.navigateTo({
      //   url: `/pages/media-preview/index?type=video&url=${video.url}&poster=${video.poster}&name=${video.name}`
      // })
      _index6.default.navigateTo(_navigation.NAV_PAGES.MEDIA_PREVIEW, {
        type: 'video',
        url: video.url,
        poster: video.poster,
        name: video.name
      });
    }, _this.customComponents = ["Message"], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(History, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(History.prototype.__proto__ || Object.getPrototypeOf(History.prototype), "_constructor", this).call(this, props);
      this.myId = '';
      this.state = {
        timeline: []
      };
      this.$$refs = [];
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this2 = this;

      var _$router$params = this.$router.params,
          orderId = _$router$params.orderId,
          timestamp = _$router$params.timestamp;

      var userSession = (0, _store.getCacheSync)('userSession');
      this.myId = userSession['userId'];
      _index4.default.adviser.getOrderChatHistory({ orderId: orderId, timestamp: timestamp }).then(function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(res) {
          var data;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (!(res && Array.isArray(res))) {
                    _context2.next = 5;
                    break;
                  }

                  _context2.next = 3;
                  return Promise.all(res.map(function () {
                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(item) {
                      var user, response;
                      return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              user = {};
                              _context.prev = 1;
                              _context.next = 4;
                              return _im2.default.getUser(item.sender);

                            case 4:
                              response = _context.sent;

                              if (response) {
                                user = response;
                              }
                              _context.next = 11;
                              break;

                            case 8:
                              _context.prev = 8;
                              _context.t0 = _context["catch"](1);

                              console.log(_context.t0);

                            case 11:
                              return _context.abrupt("return", _extends({}, item, {
                                user: user
                              }));

                            case 12:
                            case "end":
                              return _context.stop();
                          }
                        }
                      }, _callee, _this2, [[1, 8]]);
                    }));

                    return function (_x2) {
                      return _ref3.apply(this, arguments);
                    };
                  }()));

                case 3:
                  data = _context2.sent;

                  _this2.setState({
                    timeline: data.map(function (item) {
                      switch (item.content.msgtype) {
                        case 'm.image':
                          return _extends({}, item, {
                            content: {
                              msgtype: 'm.text',
                              body: '[图片消息]'
                            }
                          });
                        case 'm.video':
                          return _extends({}, item, {
                            content: {
                              msgtype: 'm.text',
                              body: '[视频消息]'
                            }
                          });
                        case 'm.audio':
                          return _extends({}, item, {
                            content: {
                              msgtype: 'm.text',
                              body: '[音频消息]'
                            }
                          });
                        case 'm.file':
                          return _extends({}, item, {
                            content: {
                              msgtype: 'm.text',
                              body: '[文件消息]'
                            }
                          });
                        case 'm.location':
                          return _extends({}, item, {
                            content: {
                              msgtype: 'm.text',
                              body: '[位置消息]'
                            }
                          });
                        case 'm.url':
                          return _extends({}, item, {
                            content: {
                              msgtype: 'm.text',
                              body: item.content.body
                            }
                          });
                        default:
                          return item;
                      }
                    })
                  });

                case 5:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, _this2);
        }));

        return function (_x) {
          return _ref2.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "_createData",
    value: function _createData() {
      var _this3 = this;

      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;

      var timeline = this.__state.timeline;

      var anonymousState__temp = (0, _index.internal_inline_style)({ height: '100vh' });
      var loopArray6 = timeline.map(function (message, _anonIdx) {
        message = {
          $original: (0, _index.internal_get_original)(message)
        };
        var $loopState__temp3 = message.$original.sender === _this3.myId;
        var $compid__24 = (0, _index.genCompid)(__prefix + "ZzJPjuTADE" + _anonIdx);
        _index.propsManager.set({
          "message": message.$original,
          "isMy": $loopState__temp3,
          "onVideo": _this3.handleVideo
        }, $compid__24);
        return {
          $loopState__temp3: $loopState__temp3,
          $compid__24: $compid__24,
          $original: message.$original
        };
      });
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp,
        loopArray6: loopArray6
      });
      return this.__state;
    }
  }]);

  return History;
}(_index.Component);

History.$$events = [];
History.$$componentPath = "packages/common/pages/history/index";
exports.default = History;

Component(require('../../../../npm/@tarojs/taro-weapp/index.js').default.createComponent(History, true));