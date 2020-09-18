"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _index = require("../../../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../../../service/index.js");

var _index4 = _interopRequireDefault(_index3);

var _im = require("../../../../model/im.js");

var _im2 = _interopRequireDefault(_im);

var _ext = require("../../../../utils/ext.js");

var _ext2 = _interopRequireDefault(_ext);

var _date = require("../../../../utils/date.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultAvatarImage = "/assets/message/avatar_default.png";
// import NavBar from "@/components/nav-bar";


var shareImage = "/assets/logo2.png";

var MessageDetail = function (_BaseComponent) {
  _inherits(MessageDetail, _BaseComponent);

  function MessageDetail() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, MessageDetail);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MessageDetail.__proto__ || Object.getPrototypeOf(MessageDetail)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["error", "avatar", "staffAvatar", "name", "createTime", "question", "staffName", "replyTime", "answer", "questionInfo", "answerInfo"], _this.config = {
      navigationBarTitleText: '回复详情'
    }, _this.customComponents = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(MessageDetail, [{
    key: "_constructor",
    value: function _constructor() {
      _get(MessageDetail.prototype.__proto__ || Object.getPrototypeOf(MessageDetail.prototype), "_constructor", this).call(this);
      this.state = {
        error: false,
        questionInfo: {
          retailId: '',
          name: '',
          avatar: '',
          question: '',
          createTime: 0
        },
        answerInfo: {
          staffId: '',
          name: '',
          avatar: '',
          answer: '',
          replyTime: 0
        }
      };
      this.$$refs = [];
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getMessageDetail();
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
    key: "getMessageDetail",
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var orderId, data, retail, staff, question, retailId, staffId, staffName, answer, createTime, replyTime, retailInfo, staffInfo, questionInfo, answerInfo;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                orderId = this.$router.params.orderId;
                _context.prev = 1;
                _context.next = 4;
                return _index4.default.adviser.getMessageDetail(orderId);

              case 4:
                data = _context.sent;

                if (data) {
                  _context.next = 9;
                  break;
                }

                _index2.default.showToast({
                  title: '加载失败',
                  icon: 'none',
                  mask: true
                });
                this.setState({
                  error: true
                });
                return _context.abrupt("return");

              case 9:
                retail = data.retail, staff = data.staff, question = data.question, retailId = data.retailId, staffId = data.staffId, staffName = data.staffName, answer = data.answer, createTime = data.createTime, replyTime = data.replyTime;
                _context.next = 12;
                return _im2.default.getUser(retailId);

              case 12:
                retailInfo = _context.sent;
                _context.next = 15;
                return _im2.default.getUser(staffId);

              case 15:
                staffInfo = _context.sent;
                questionInfo = {
                  retailId: retailId,
                  name: retail.name,
                  avatar: retail.avatar || defaultAvatarImage,
                  createTime: (0, _date.formatTimestamp)(createTime),
                  question: question
                };
                answerInfo = {
                  staffId: staffId,
                  name: staff.name,
                  avatar: staff.avatar || defaultAvatarImage,
                  answer: answer,
                  replyTime: (0, _date.formatTimestamp)(replyTime)
                };


                this.setState({
                  questionInfo: questionInfo,
                  answerInfo: answerInfo,
                  error: false
                });
                _context.next = 25;
                break;

              case 21:
                _context.prev = 21;
                _context.t0 = _context["catch"](1);

                _index2.default.showToast({
                  title: '加载失败',
                  icon: 'none',
                  mask: true
                });
                this.setState({
                  error: true
                });

              case 25:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 21]]);
      }));

      function getMessageDetail() {
        return _ref2.apply(this, arguments);
      }

      return getMessageDetail;
    }()
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;

      var _state = this.__state,
          questionInfo = _state.questionInfo,
          answerInfo = _state.answerInfo,
          error = _state.error;
      var name = questionInfo.name,
          avatar = questionInfo.avatar,
          question = questionInfo.question,
          createTime = questionInfo.createTime;
      var staffName = answerInfo.name,
          staffAvatar = answerInfo.avatar,
          answer = answerInfo.answer,
          replyTime = answerInfo.replyTime;


      Object.assign(this.__state, {
        avatar: avatar,
        staffAvatar: staffAvatar,
        name: name,
        createTime: createTime,
        question: question,
        staffName: staffName,
        replyTime: replyTime,
        answer: answer
      });
      return this.__state;
    }
  }]);

  return MessageDetail;
}(_index.Component);

MessageDetail.$$events = [];
MessageDetail.$$componentPath = "packages/common/pages/message-detail/index";
exports.default = MessageDetail;

Component(require('../../../../npm/@tarojs/taro-weapp/index.js').default.createComponent(MessageDetail, true));