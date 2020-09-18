"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _ext = require("../../utils/ext.js");

var _ext2 = _interopRequireDefault(_ext);

var _index3 = require("../../router/index.js");

var _index4 = _interopRequireDefault(_index3);

var _store = require("../../utils/store.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var primaryBubbleStyle = {
  borderColor: _ext2.default.THEME_COLOR.Bubble_Host_border
};

var primaryBubbleBackgroundStyle = {
  backgroundColor: _ext2.default.THEME_COLOR.Bubble_Host_fill
};

var Message = function (_BaseComponent) {
  _inherits(Message, _BaseComponent);

  function Message() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Message);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Message.__proto__ || Object.getPrototypeOf(Message)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "anonymousState__temp2", "anonymousState__temp3", "$compid__29", "$compid__30", "$compid__31", "$compid__32", "$compid__33", "$compid__34", "$compid__35", "$compid__36", "$compid__37", "$compid__38", "$compid__39", "$compid__40", "$compid__41", "message", "myId", "isChannel", "isGroup", "msgtype", "isRedacted", "isMy", "roomType", "showName", "room", "__fn_onLongPress", "onVideo", "onLink", "onLocation", "onConvo", "__fn_onTap", "onReSend"], _this.getStyle = function (msgtype, isMy) {
      var ignoreTypes = ['m.image', 'm.video', 'fc.convo.ui'];
      var whiteTypes = ['m.url', 'm.file', 'm.location'];
      var arrowStyle = { backgroundColor: 'transparent' };
      var bubbleStyle = { border: 'none' };
      var contentStyle = { backgroundColor: '#ffffff' };
      if (ignoreTypes.includes(msgtype)) {
        return { arrowStyle: arrowStyle, bubbleStyle: bubbleStyle, contentStyle: contentStyle };
      }
      if (whiteTypes.includes(msgtype)) {
        bubbleStyle = { borderColor: '#CFCFCF' };
        return { arrowStyle: arrowStyle, bubbleStyle: bubbleStyle, contentStyle: contentStyle };
      }

      if (isMy) {
        arrowStyle = _extends({}, primaryBubbleStyle, primaryBubbleBackgroundStyle);
        bubbleStyle = primaryBubbleStyle;
        contentStyle = primaryBubbleBackgroundStyle;
      } else {
        arrowStyle = { backgroundColor: '#ffffff', borderColor: '#CFCFCF' };
        bubbleStyle = { borderColor: '#CFCFCF' };
      }
      return { arrowStyle: arrowStyle, bubbleStyle: bubbleStyle, contentStyle: contentStyle };
    }, _this.onLinkTextTap = function (message) {
      // console.log(message);
      // Taro.redirectTo({ url: message.content.url })
      _index4.default.redirectTo(message.content.url);
    }, _this.customComponents = ["Avatar", "TextMessage", "ImageMessage", "FileMessage", "AudioMessage", "VideoMessage", "LinkMessage", "LocationMessage", "ConvoUI", "UnknowMessage"], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Message, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(Message.prototype.__proto__ || Object.getPrototypeOf(Message.prototype), "_constructor", this).call(this, props);

      this.$$refs = [];
    }
  }, {
    key: "_createData",
    value: function _createData() {
      var _this2 = this;

      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;
      var $compid__29 = (0, _index.genCompid)(__prefix + "$compid__29");
      var $compid__30 = (0, _index.genCompid)(__prefix + "$compid__30");
      var $compid__31 = (0, _index.genCompid)(__prefix + "$compid__31");
      var $compid__32 = (0, _index.genCompid)(__prefix + "$compid__32");
      var $compid__33 = (0, _index.genCompid)(__prefix + "$compid__33");
      var $compid__34 = (0, _index.genCompid)(__prefix + "$compid__34");
      var $compid__35 = (0, _index.genCompid)(__prefix + "$compid__35");
      var $compid__36 = (0, _index.genCompid)(__prefix + "$compid__36");
      var $compid__37 = (0, _index.genCompid)(__prefix + "$compid__37");
      var $compid__38 = (0, _index.genCompid)(__prefix + "$compid__38");
      var $compid__39 = (0, _index.genCompid)(__prefix + "$compid__39");
      var $compid__40 = (0, _index.genCompid)(__prefix + "$compid__40");
      var $compid__41 = (0, _index.genCompid)(__prefix + "$compid__41");

      var _props = this.__props,
          message = _props.message,
          roomType = _props.roomType,
          showName = _props.showName;
      var _props$room = this.__props.room,
          isChannel = _props$room.isChannel,
          isGroup = _props$room.isGroup,
          isDirect = _props$room.isDirect;

      var name = message.user ? message.user.name : '';
      var avatarUrl = message.user ? message.user.avatar : '';
      var msgtype = message.content.msgtype || message.content.msgType || message.type;
      var isMy = message.isMy;

      var _getStyle = this.getStyle(msgtype, isMy),
          arrowStyle = _getStyle.arrowStyle,
          bubbleStyle = _getStyle.bubbleStyle,
          contentStyle = _getStyle.contentStyle;

      var isRedacted = message.isRedacted;
      var userSession = (0, _store.getCacheSync)('userSession');
      var myId = userSession['userId'];

      // Taro 限制，无法再 render 先计算好属性再渲染，只能按条件分别渲染，后续分组件优化
      if (msgtype === 'm.room.member' && message.content.membership === 'join') {}
      // Taro 限制，无法再 render 先计算好属性再渲染，只能按条件分别渲染，后续分组件优化
      if (msgtype === 'm.room.member' && message.content.membership === 'leave') {}
      // Taro 限制，无法再 render 先计算好属性再渲染，只能按条件分别渲染，后续分组件优化
      if (msgtype === 'm.room.member' && message.content.membership === 'invite') {}

      if (msgtype === 'm.room.name') {}

      if (msgtype === 'm.room.create') {}

      if (msgtype === 'm.notice' || msgtype === 'm.local.time') {}

      if (msgtype === 'm.local.notice') {
        this.anonymousFunc0 = function () {
          return _this2.onLinkTextTap(message);
        };
      }

      if (isRedacted) {}

      var anonymousState__temp = (0, _index.internal_inline_style)(bubbleStyle);
      var anonymousState__temp2 = (0, _index.internal_inline_style)(arrowStyle);
      var anonymousState__temp3 = (0, _index.internal_inline_style)(contentStyle);
      _index.propsManager.set({
        "url": avatarUrl,
        "size": 80
      }, $compid__29);
      (msgtype === 'm.text' || msgtype === 'fc.convo.reply' || msgtype === 'm.alert') && _index.propsManager.set({
        "message": message
      }, $compid__30);
      msgtype === 'm.image' && _index.propsManager.set({
        "message": message
      }, $compid__31);
      msgtype === 'm.file' && _index.propsManager.set({
        "message": message
      }, $compid__32);
      msgtype === 'm.audio' && _index.propsManager.set({
        "message": message,
        "isMy": isMy
      }, $compid__33);
      msgtype === 'm.video' && _index.propsManager.set({
        "message": message,
        "onVideo": this.__props.onVideo
      }, $compid__34);
      msgtype === 'm.url' && _index.propsManager.set({
        "message": message,
        "onLink": this.__props.onLink
      }, $compid__35);
      msgtype === 'm.location' && _index.propsManager.set({
        "message": message,
        "onLocation": this.__props.onLocation
      }, $compid__36);
      msgtype === 'fc.convo.ui' && _index.propsManager.set({
        "message": message,
        "onConvo": this.__props.onConvo
      }, $compid__37);
      msgtype === 'fc.applet' && _index.propsManager.set({
        "message": message
      }, $compid__38);
      msgtype === 'm.combine_forward' && _index.propsManager.set({
        "message": message
      }, $compid__39);
      msgtype === 'm.businesscard' && _index.propsManager.set({
        "message": message
      }, $compid__40);
      msgtype === 'm.bad.encrypted' && _index.propsManager.set({
        "message": message
      }, $compid__41);
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp,
        anonymousState__temp2: anonymousState__temp2,
        anonymousState__temp3: anonymousState__temp3,
        $compid__29: $compid__29,
        $compid__30: $compid__30,
        $compid__31: $compid__31,
        $compid__32: $compid__32,
        $compid__33: $compid__33,
        $compid__34: $compid__34,
        $compid__35: $compid__35,
        $compid__36: $compid__36,
        $compid__37: $compid__37,
        $compid__38: $compid__38,
        $compid__39: $compid__39,
        $compid__40: $compid__40,
        $compid__41: $compid__41,
        message: message,
        myId: myId,
        isChannel: isChannel,
        isGroup: isGroup,
        msgtype: msgtype,
        isRedacted: isRedacted,
        isMy: isMy
      });
      return this.__state;
    }
  }, {
    key: "anonymousFunc0",
    value: function anonymousFunc0(e) {
      ;
    }
  }, {
    key: "funPrivateskXFf",
    value: function funPrivateskXFf() {
      return this.props.onMessagePress.apply(undefined, Array.prototype.slice.call(arguments, 1));
    }
  }, {
    key: "funPrivateyeLRH",
    value: function funPrivateyeLRH() {
      return this.props.onReSend.apply(undefined, Array.prototype.slice.call(arguments, 1));
    }
  }]);

  return Message;
}(_index.Component);

Message.$$events = ["anonymousFunc0", "funPrivateskXFf", "funPrivateyeLRH"];
Message.$$componentPath = "components/message/index";


Message.defaultProps = {
  message: {
    user: {},
    content: {}
  },
  room: {},
  isMy: false,
  showName: false,
  onConvo: function onConvo() {},
  onVideo: function onVideo() {},
  onLink: function onLink() {},
  onLocation: function onLocation() {},
  onMessagePress: function onMessagePress() {},
  onReSend: function onReSend() {}
};

exports.default = Message;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Message));