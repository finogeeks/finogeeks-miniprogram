"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require("../../../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _date = require("../../../../utils/date.js");

var _room = require("../../../../constants/room.js");

var _index3 = require("../../../../service/index.js");

var _index4 = _interopRequireDefault(_index3);

var _auth = require("../../../../model/auth.js");

var _auth2 = _interopRequireDefault(_auth);

var _im = require("../../../../model/im.js");

var _im2 = _interopRequireDefault(_im);

var _store = require("../../../../utils/store.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RoomItem = function (_BaseComponent) {
  _inherits(RoomItem, _BaseComponent);

  function RoomItem() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    _classCallCheck(this, RoomItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RoomItem.__proto__ || Object.getPrototypeOf(RoomItem)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["$compid__26", "$compid__27", "$compid__28", "unread", "isCrossDomain", "isChannel", "federate", "publicChannel", "isGroup", "isSecret", "another", "name", "lastMessage", "updatedAt", "room"], _this.enterRoom = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _index2.default.showLoading();

              if (_auth2.default.isAuth) {
                _context.next = 4;
                break;
              }

              _auth2.default.goToAuthPage();
              return _context.abrupt("return");

            case 4:
              _im2.default.enterRoom(_this.props.room.id);
              // await roomService.addViewingRoom(this.props.room.id)
              // this.props.navigateTo(NAV_PAGES.ROOM, { roomId: this.props.room.id })

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this2);
    })), _this.getLastMessage = function () {
      var lastMessage = _this.props.room.lastMessage;
      if (lastMessage && lastMessage.content) {
        var msgtype = lastMessage.content.msgtype || 'unknown';
        switch (msgtype) {
          case 'm.image':
            return '[图片]';
          case 'm.file':
            return '[文件]';
          case 'm.audio':
            return '[语音]';
          case 'm.video':
            return '[视频]';
          case 'm.location':
            return '[地理位置]';
          case 'm.url':
            return '[链接]';
          case 'fc.convo.ui':
          case 'm.notice':
          case 'm.text':
          default:
            return lastMessage.content.body || '';
        }
      }
      return '';
    }, _this.handleLongPress = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var room, itemList, res, action;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              room = _this.props.room;
              itemList = [];

              if (room.roomType !== _room.ROOMTYPES.normalBot && room.roomType !== _room.ROOMTYPES.smartBot) {
                itemList.push('删除');
              }

              if (!(itemList.length > 0)) {
                _context2.next = 14;
                break;
              }

              _context2.next = 6;
              return _index2.default.showActionSheet({
                itemList: itemList
              });

            case 6:
              res = _context2.sent;

              if (!res) {
                _context2.next = 14;
                break;
              }

              action = itemList[res.tapIndex];

              if (!(action === '删除')) {
                _context2.next = 14;
                break;
              }

              _index2.default.showLoading({
                title: '删除中'
              });
              _context2.next = 13;
              return _im2.default.hideRoom(room.id);

            case 13:
              setTimeout(function () {
                _index2.default.hideLoading();
              }, 500);

            case 14:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, _this2);
    })), _this.handleSubmit = function (e) {
      if (!_auth2.default.isAuth) {
        return;
      }var _this$props$room = _this.props.room,
          roomType = _this$props$room.roomType,
          id = _this$props$room.id;

      var userSession = _auth2.default.getUserSession();
      var openId = userSession.openId;
      var msgType = roomType === _room.ROOMTYPES.advisor ? 'adviser' : 'channel';
      _index4.default.report.reportFormId(id, msgType, e.detail.formId, openId, userSession.userId).catch(function (error) {
        console.log('reportFormId error', error);
      });
    }, _this.customComponents = ["RoomBadge", "RoomAvatar"], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(RoomItem, [{
    key: "_constructor",


    // eslint-disable-next-line constructor-super
    value: function _constructor() {
      // super();
      // this.roomId = this.props.room.id;

      this.$$refs = [];
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;
      var $compid__26 = (0, _index.genCompid)(__prefix + "$compid__26");
      var $compid__27 = (0, _index.genCompid)(__prefix + "$compid__27");
      var $compid__28 = (0, _index.genCompid)(__prefix + "$compid__28");

      var _props$room = this.__props.room,
          name = _props$room.name,
          lastMessage = _props$room.lastMessage,
          isCrossDomain = _props$room.isCrossDomain,
          federate = _props$room.federate,
          publicChannel = _props$room.publicChannel,
          isChannel = _props$room.isChannel,
          isSecret = _props$room.isSecret,
          isGroup = _props$room.isGroup,
          id = _props$room.id,
          isDirect = _props$room.isDirect,
          members = _props$room.members;
      // console.log(this.props.room);
      // const text = this.getLastMessage()

      var updatedAt = (0, _date.formatTimestamp)(this.__props.room.updatedAt || this.__props.room.createdAt, id);
      var another = '';
      // if (id === '!175744251794030592:dev.finogeeks.club') {
      //   console.log('测试验证机器人：');
      //   console.log(this.props.room);
      // }
      var userInfo = (0, _store.getCacheSync)('userInfo');
      if (isDirect) {
        // console.log(members);
        another = members.find(function (e) {
          return e.id !== userInfo.id && e.id.indexOf('-bot:') > 0;
        }) || null;
        // console.log(another);
      }
      var unread = this.__props.room.unread || 0;
      // console.log(`~~~~~~~~~~~~~~room-item isDirect:${isDirect}  another:${another}~~~~~~~~~~~~~~~`);

      unread > 0 && _index.propsManager.set({
        "count": unread,
        "maxValue": 99
      }, $compid__26);
      unread > 0 && _index.propsManager.set({
        "room": this.__props.room
      }, $compid__27);
      !(unread > 0) && _index.propsManager.set({
        "room": this.__props.room
      }, $compid__28);
      Object.assign(this.__state, {
        $compid__26: $compid__26,
        $compid__27: $compid__27,
        $compid__28: $compid__28,
        unread: unread,
        isCrossDomain: isCrossDomain,
        isChannel: isChannel,
        federate: federate,
        publicChannel: publicChannel,
        isGroup: isGroup,
        isSecret: isSecret,
        another: another,
        name: name,
        lastMessage: lastMessage,
        updatedAt: updatedAt
      });
      return this.__state;
    }
  }]);

  return RoomItem;
}(_index.Component);

RoomItem.$$events = ["handleSubmit", "enterRoom", "handleLongPress"];
RoomItem.$$componentPath = "pages/home/components/room-item/index";


RoomItem.defaultProps = {
  room: {
    name: '',
    avatar: '',
    members: [],
    lastMessage: null,
    createdAt: 0,
    updatedAt: 0
  }
};

exports.default = RoomItem;

Component(require('../../../../npm/@tarojs/taro-weapp/index.js').default.createComponent(RoomItem));