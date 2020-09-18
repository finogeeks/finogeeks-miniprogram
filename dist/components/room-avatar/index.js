"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _im = require("../../model/im.js");

var _im2 = _interopRequireDefault(_im);

var _store = require("../../utils/store.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var channelDefault = "/assets/room/channel_default.png";

var RoomAvatar = function (_BaseComponent) {
  _inherits(RoomAvatar, _BaseComponent);

  function RoomAvatar() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, RoomAvatar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RoomAvatar.__proto__ || Object.getPrototypeOf(RoomAvatar)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["loopArray9", "loopArray10", "loopArray11", "$compid__45", "$compid__46", "$compid__47", "$compid__48", "isNormalRobot", "channelDefault", "groupAvatars", "isChannel", "avatar", "isDirect", "room", "showBackImg"], _this.customComponents = ["Avatar"], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(RoomAvatar, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(RoomAvatar.prototype.__proto__ || Object.getPrototypeOf(RoomAvatar.prototype), "_constructor", this).call(this, props);

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
      var $compid__45 = (0, _index.genCompid)(__prefix + "$compid__45");
      var $compid__46 = (0, _index.genCompid)(__prefix + "$compid__46");
      var $compid__47 = (0, _index.genCompid)(__prefix + "$compid__47");
      var $compid__48 = (0, _index.genCompid)(__prefix + "$compid__48");
      var loopArray10 = void 0;
      var loopArray9 = void 0;

      var _props$room = this.__props.room,
          avatar = _props$room.avatar,
          roomType = _props$room.roomType,
          name = _props$room.name,
          isChannel = _props$room.isChannel,
          isDirect = _props$room.isDirect,
          isNormalRobot = _props$room.isNormalRobot,
          id = _props$room.id;

      var groupAvatars = [];
      try {
        groupAvatars = _im2.default.getRoomGroupAvatar(id);
        // if (id === '!167104908451905536:dev.finogeeks.club') {
        //   console.log(groupAvatars);
        // }
      } catch (error) {
        groupAvatars = [];
      }
      var userImg = (0, _store.getCacheSync)('userInfo').avatar;
      var oppositeImg = groupAvatars.find(function (e) {
        return e !== userImg;
      }) || null;
      if (isNormalRobot) {
        _index.propsManager.set({
          "url": avatar,
          "size": 100
        }, $compid__45);
      } else if (isChannel) {
        loopArray9 = !avatar ? groupAvatars.map(function (avatarUrl, _anonIdx) {
          avatarUrl = {
            $original: (0, _index.internal_get_original)(avatarUrl)
          };
          var $compid__42 = (0, _index.genCompid)(__prefix + "HvftXOyFoO" + _anonIdx);
          !avatar && _index.propsManager.set({
            "url": avatarUrl.$original,
            "size": 44
          }, $compid__42);
          return {
            $compid__42: $compid__42,
            $original: avatarUrl.$original
          };
        }) : [];
        avatar && _index.propsManager.set({
          "url": avatar,
          "size": 100
        }, $compid__46);
      } else if (isDirect) {
        _index.propsManager.set({
          "url": oppositeImg,
          "size": 100
        }, $compid__47);
      } else if (!isDirect) {
        loopArray10 = !avatar ? groupAvatars.map(function (avatarUrl, _anonIdx3) {
          avatarUrl = {
            $original: (0, _index.internal_get_original)(avatarUrl)
          };
          var $compid__43 = (0, _index.genCompid)(__prefix + "SewgJRfqWp" + _anonIdx3);
          !avatar && _index.propsManager.set({
            "url": avatarUrl.$original,
            "size": 44
          }, $compid__43);
          return {
            $compid__43: $compid__43,
            $original: avatarUrl.$original
          };
        }) : [];
        avatar && _index.propsManager.set({
          "url": avatar,
          "size": 100
        }, $compid__48);
      }
      var loopArray11 = groupAvatars.map(function (avatarUrl, _anonIdx5) {
        avatarUrl = {
          $original: (0, _index.internal_get_original)(avatarUrl)
        };
        var $compid__44 = (0, _index.genCompid)(__prefix + "BledjPewzd" + _anonIdx5);
        _index.propsManager.set({
          "url": avatarUrl.$original,
          "size": 44
        }, $compid__44);
        return {
          $compid__44: $compid__44,
          $original: avatarUrl.$original
        };
      });
      Object.assign(this.__state, {
        loopArray9: loopArray9,
        loopArray10: loopArray10,
        loopArray11: loopArray11,
        $compid__45: $compid__45,
        $compid__46: $compid__46,
        $compid__47: $compid__47,
        $compid__48: $compid__48,
        isNormalRobot: isNormalRobot,
        channelDefault: channelDefault,
        groupAvatars: groupAvatars,
        isChannel: isChannel,
        avatar: avatar,
        isDirect: isDirect
      });
      return this.__state;
    }
  }]);

  return RoomAvatar;
}(_index.Component);

RoomAvatar.$$events = [];
RoomAvatar.$$componentPath = "components/room-avatar/index";


RoomAvatar.defaultProps = {
  room: {
    name: '',
    avatar: '',
    members: [],
    meta: {}
  }
};

exports.default = RoomAvatar;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(RoomAvatar));