"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _main = require("../../npm/@finogeeks/finchat-js-sdk-miniprogram/dist/main.js");

var _main2 = _interopRequireDefault(_main);

var _room = require("../interface/room.js");

var _store = require("../../utils/store.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
// import sdk from '@finogeeks/matrix-js-sdk-miniprogram'
// const sdk = require('@finogeeks/matrix-js-sdk-miniprogram');


var AVATAR_SIZE = 64;

var BaseModule = function BaseModule(mxClient, option) {
  var _this = this;

  _classCallCheck(this, BaseModule);

  this.buildRoom = function (mxRoom) {
    try {
      if (!mxRoom) return null;
      var roomState = mxRoom.currentState;
      var me = roomState.getMember(_this.myUserId);
      var powerEvent = roomState.getStateEvents('m.room.power_levels', '');
      var meta = _this.getRoomMeta(mxRoom);
      var id = mxRoom.roomId;
      var name = meta.roomName;
      var avatar = meta.roomAvatar;
      var roomType = meta.roomType;
      var topicMsg = meta.topicMsg;
      var topic = meta.topic;
      var orderInfo = meta.orderInfo;
      var isOnline = meta.isOnline;
      var avatarUserIds = meta.avatarUserIds;
      var members = meta.members;
      var membership = me && me.membership || '';
      var updatedAt = _this.getUpdatedAt(mxRoom);
      var createdAt = _this.getCreatedAt(mxRoom);
      var unread = mxRoom.getUnreadNotificationCount('total') || 0;
      var states = _this.getRoomState(mxRoom);
      var banned = powerEvent && powerEvent.event && powerEvent.event.content && powerEvent.event.content.events_default === 100;
      var channelInfo = null;
      if (roomType === _room.RoomType.channel) {
        var activityEvent = roomState.getStateEvents('m.room.activity', '');
        channelInfo = {
          type: activityEvent ? 'activity' : 'normal',
          detail: activityEvent ? activityEvent.event.content : {}
        };
      }
      var isHide = !!mxRoom.tags.hide;
      var roomCerateEvent = roomState.getStateEvents('m.room.create', '');
      var isChannel = !!(roomCerateEvent && roomCerateEvent.event.content.is_channel);
      var federate = !!(roomCerateEvent && roomCerateEvent.event.content['m.federate']);
      var isArchive = !!(roomState.getStateEvents('m.room.archive', '') && roomState.getStateEvents('m.room.archive', '').event.content.archive);
      var isDirect = !!(roomCerateEvent && roomCerateEvent.event.content.is_direct);
      var isCrossDomain = isDirect ? avatarUserIds.find(function (e) {
        return e !== _this.myUserId;
      }) && avatarUserIds.find(function (e) {
        return e !== _this.myUserId;
      }).split(':')[1] !== _this.myUserId.split(':')[1] : false;
      var publicChannel = void 0;
      try {
        publicChannel = roomState.getStateEvents('m.room.join_rules', '').event.content.join_rule === 'public';
      } catch (e) {
        console.log('~~~~~~~~publicChannel  error~~~~~~~~~~~');
      }
      var isSecret = !!(roomCerateEvent && roomCerateEvent.event.content.is_secret);
      var isNormalRobot = roomType === 'NORMAL_BOT';
      var isDelete = !!mxRoom.tags.delete;
      var lastMessage = _this.parseMessageString(_this.getLastMessage(mxRoom), {
        isChannel: isChannel,
        isDirect: isDirect,
        isGroup: !(isChannel || isDirect)
      });
      return {
        id: id,
        name: name,
        avatar: avatar,
        avatarUserIds: avatarUserIds,
        roomType: roomType,
        topicMsg: topicMsg,
        orderInfo: orderInfo,
        isOnline: isOnline,
        membership: membership,
        lastMessage: lastMessage,
        updatedAt: updatedAt,
        createdAt: createdAt,
        unread: unread,
        states: states,
        members: members,
        banned: banned,
        channelInfo: channelInfo,
        isHide: isHide,
        isDelete: isDelete,
        topic: topic,
        isChannel: isChannel,
        isArchive: isArchive,
        isDirect: isDirect,
        isNormalRobot: isNormalRobot,
        isCrossDomain: isCrossDomain,
        federate: federate,
        publicChannel: publicChannel,
        isSecret: isSecret,
        isGroup: !(isChannel || isDirect),
        powerLevel: me && me.powerLevel
      };
    } catch (e) {
      console.log('~~~~~~~~~buildRoom error~~~~~~~~~~~~`', e);
    }
  };

  this.getRoomMeta = function (mxRoom) {
    var roomState = mxRoom.currentState;
    var topicEvent = roomState.getStateEvents('m.room.topic', '');
    var topicData = null;
    var originTopicData = topicEvent ? topicEvent.event.content.topic : '';
    try {
      if (typeof originTopicData === 'string') {
        topicData = JSON.parse(originTopicData);
      } else {
        topicData = originTopicData;
      }
    } catch (error) {
      topicData = null;
    }
    var mxMembers = mxRoom.getJoinedMembers();
    var members = mxMembers.map(function (mxUser) {
      return _this.getLocalUser(mxUser.userId);
    }).filter(function (user) {
      return !!user;
    });
    var roomName = mxRoom.name;
    var roomAvatar = mxRoom.getAvatarUrl(_this.baseUrl, 60, 60, 'scale', false);
    var avatarUserIds = []; // 提供头像的用户id
    var isOnline = true;
    var orderInfo = {};
    var roomType = _room.RoomType.channel;
    var topicMsg = '';
    if (!topicData) {
      avatarUserIds = members.slice(0, 4).map(function (member) {
        return member.id;
      });
      return {
        roomName: roomName,
        avatarUserIds: avatarUserIds,
        roomAvatar: roomAvatar,
        isOnline: isOnline,
        orderInfo: orderInfo,
        roomType: roomType,
        topicMsg: topicMsg,
        members: members,
        topic: null
      };
    }
    topicMsg = topicData.topic || '';
    var _topicData = topicData,
        custService = _topicData.custService,
        botId = _topicData.botId,
        swanBotType = _topicData.swanBotType;
    // 投顾房间

    if (custService && custService.type == 'dispatch' && custService.staffId) {
      var staffInfo = _this.getLocalUser(custService.staffId);
      orderInfo = _extends({}, custService);
      roomName = staffInfo.name;
      roomAvatar = staffInfo.avatar;
      isOnline = staffInfo.isOnline;
      roomType = _room.RoomType.advisor;
      avatarUserIds.push(custService.staffId);
      // 派单房间
    } else if (custService && custService.type == 'dispatch') {
      orderInfo = _extends({}, custService);
      roomType = _room.RoomType.dispatch;
      // 智能客服房间
    } else if (botId && swanBotType === 'smart') {
      roomType = _room.RoomType.smartBot;
      avatarUserIds.push(botId);
      // 普通机器人房间
    } else if (botId) {
      avatarUserIds.push(botId);
      roomType = _room.RoomType.normalBot;
      // 频道房间
    } else {
      avatarUserIds = members.slice(0, 4).map(function (member) {
        return member.id;
      });
    }
    if (botId) {
      var botInfo = _this.getLocalUser(botId);
      roomAvatar = botInfo.avatar;
      roomName = botInfo.name;
      avatarUserIds = [botId];
    }
    return {
      roomName: roomName,
      avatarUserIds: avatarUserIds,
      roomAvatar: roomAvatar,
      isOnline: isOnline,
      orderInfo: orderInfo,
      roomType: roomType,
      topicMsg: topicMsg,
      members: members,
      topic: topicData
    };
  };

  this.getLocalUser = function (userId) {
    var user = _this.store.user.get(userId);
    if (user) return user;
    var mxUser = _this.mxClient.getUser(userId);
    if (mxUser) {
      user = _this.buildUser(mxUser);
      _this.store.user.put(user.id, user);
      return user;
    }
    return {};
  };

  this.getLocalRoom = function (roomId) {
    var room = _this.store.room.get(roomId);
    if (room) return room;
    var mxRoom = _this.mxClient.getRoom(roomId);
    if (mxRoom) {
      room = _this.buildRoom(mxRoom);
      _this.store.room.put(room.id, room);
      return room;
    }
    return null;
  };

  this.getUpdatedAt = function (mxRoom) {
    try {
      var lastMessage = _this.getLastMessage(mxRoom);
      var updatedAt = lastMessage.time;
      return updatedAt;
    } catch (error) {
      return _this.getCreatedAt(mxRoom) || 0;
    }
  };

  this.getCreatedAt = function (mxRoom) {
    try {
      var roomState = mxRoom.currentState;
      var createEvent = roomState.getStateEvents('m.room.create', '');
      return createEvent.getTs();
    } catch (error) {
      return 0;
    }
  };

  this.getRoomState = function (mxRoom) {
    var mxState = mxRoom.getLiveTimeline().getState(_this.mxSdk.EventTimeline.FORWARDS);
    try {
      var states = [];
      Object.values(mxState.events).forEach(function (mxStateEvent) {
        var state = Object.values(mxStateEvent).map(function (mxEvent) {
          return _this.buildMessage(mxEvent);
        });
        states.push.apply(states, _toConsumableArray(state));
      });
      return states;
    } catch (error) {
      return [];
    }
  };

  this.getLastMessage = function (mxRoom) {
    // Build last message from mxRoom's timeline
    var message = null;
    var mxEvents = mxRoom.timeline.filter(_this.messageFilter, true);
    if (mxEvents && mxEvents.length > 0) {
      var mxEvent = mxEvents[mxEvents.length - 1];
      message = _this.buildMessage(mxEvent);
    } else {
      try {
        var mxState = mxRoom.getLiveTimeline().getState(_this.mxSdk.EventTimeline.FORWARDS);
        var mxStateEvents = mxState.getStateEvents('m.room.create');
        var mxStateEvent = mxStateEvents[mxStateEvents.length - 1];
        message = _this.buildMessage(mxStateEvent);
      } catch (error) {}
    }
    return message;
    // If no last message found, we use create room event for fallback
  };

  this.parseMessageString = function (message, _ref) {
    var isChannel = _ref.isChannel,
        isDirect = _ref.isDirect,
        isGroup = _ref.isGroup;

    var userSession = (0, _store.getCacheSync)('userSession');
    var myId = userSession['userId'];
    try {
      var lastMessage = '';
      if (!!message && !!message.content) {
        var msgtype = message.content.msgtype || 'unknown';
        switch (msgtype) {
          case 'm.image':
            lastMessage = '[图片]';
            break;
          case 'm.file':
            lastMessage = '[文件]';
            break;
          case 'm.audio':
            lastMessage = '[语音]';
            break;
          case 'm.video':
            lastMessage = '[视频]';
            break;
          case 'm.location':
            lastMessage = '[地理位置]';
            break;
          case 'm.url':
            lastMessage = '[链接]';
            break;
          case 'fc.convo.ui':
          case 'm.notice':
          case 'm.text':
          default:
            lastMessage = message.content.dsbody || message.content.body || '';
            break;
        }
      }
      if (message.type === 'm.room.redaction') {
        lastMessage = (message.user.id === myId ? '你' : "\"" + message.user.name + "\"") + "\u64A4\u56DE\u4E86\u4E00\u6761\u6D88\u606F";
      }
      if (message.type === 'm.room.member' && message.content.membership === 'join') {
        lastMessage = (message.state_key === myId ? '你' : "\"" + message.content.displayname + "\"") + "\u52A0\u5165\u4E86" + (isChannel ? '频道' : isGroup ? '房间' : '会话');
      }
      if (message.type === 'm.room.member' && message.content.membership === 'leave') {
        lastMessage = "\"" + message.content.displayname + "\"\u79BB\u5F00\u4E86" + (isChannel ? '频道' : isGroup ? '房间' : '会话');
      }
      if (message.type === 'm.room.member' && message.content.membership === 'invite') {
        lastMessage = (message.user.id === myId ? '你' : "\"" + message.user.name + "\"") + "\u9080\u8BF7" + (message.state_key === myId ? '你' : "\"" + message.content.displayname + "\"") + "\u52A0\u5165\u4E86" + (isChannel ? '频道' : isGroup ? '房间' : '会话');
      }
      if (message.type === 'm.room.name') {
        lastMessage = (message.user.id === myId ? '你' : "\"" + message.user.name + "\"") + "\u4FEE\u6539\u4E86" + (isChannel ? '频道' : isGroup ? '房间' : '会话') + "\u540D\u79F0\u4E3A\uFF1A" + message.content.name;
      }
      if (message.type === 'm.room.create') {
        lastMessage = (message.user.id === myId ? '你' : "\"" + message.user.name + "\"") + "\u521B\u5EFA\u4E86" + (isChannel ? '频道' : isGroup ? '房间' : '会话');
      }
      return lastMessage.slice(0, 30);
    } catch (e) {
      console.log(e);
    }
  };

  this.messageFilter = function (mxEvent) {
    var allowedTypes = ['m.room.create', 'm.room.message', 'm.room.name', 'm.room.member', 'm.room.redaction', 'm.swan.push_retail.transfer'];
    var event = mxEvent.event;

    var isEvalReply = event.content.msgtype === 'fc.convo.reply' && event.content.hide;
    // 过滤 notice 消息
    var isVisibleNotice = true;
    if (event.content.msgtype === 'm.notice' && event.content.extra) {
      if (!event.content.extra.retailVisible) {
        isVisibleNotice = false;
      }
    }
    return allowedTypes.includes(mxEvent.getType()) && !isEvalReply && isVisibleNotice;
    // return true
  };

  this.buildMessage = function (mxEvent, id) {
    try {
      var content = JSON.parse(JSON.stringify(mxEvent.getContent()));
      // transfer the url in content if there are any url
      content = _this.transferContentUrl(content, mxEvent);
      // const mxUser = this.mxClient.getUser(mxEvent.getSender());
      var user = _this.getLocalUser(mxEvent.getSender());
      var builtMsg = {
        state_key: mxEvent.event.state_key,
        id: mxEvent.getId() || _this.mxClient.makeTxnId(),
        user: user,
        isMy: _this.myUserId === user.id,
        roomId: mxEvent.getRoomId(),
        body: content.body,
        content: content,
        time: mxEvent.getTs(),
        type: content.msgtype || mxEvent.getType(),
        status: mxEvent.status
      };
      if (mxEvent.isRedacted()) {
        builtMsg.isRedacted = true;
        builtMsg.sender = mxEvent.sender.name;
      }
      return builtMsg;
    } catch (error) {
      return null;
    }
  };

  this.transferContentUrl = function (content, mxEvent) {
    try {
      // Transfer if there are any url in content
      if (content.url) {
        content.url = _this.urlTransfer(content.url);
      }
      // Transfer if there are any thumbnail_url in content.info
      if (content.info && content.msgtype === 'm.video') {
        // Handle video thumbnail
        // MARK since video thumbnail can not retrieve from 'thumbnail' mode, only 'download'
        content.info.thumbnail_url = _this.urlTransfer(content.info.thumbnail_url);
      }
      if (content.info && 'thumbnail_url' in content.info) {
        content.info.thumbnail_url = _this.urlTransfer(content.info.thumbnail_url || content.url, 'thumbnail');
      }
      // Transfer avatar_url in state event content
      if (content.avatar_url) {
        content.avatar_url = _this.urlTransfer(content.avatar_url);
      }
      return content;
    } catch (error) {
      // if transfer encountered error, stop the transfer and return the origin content back
      return content;
    }
  };

  this.buildUser = function (mxUser) {
    var events = mxUser.events;

    var presence = events && events.presence && events.presence.getContent();
    var name = presence ? presence.displayname : mxUser.displayName || '';
    var originAvatarUrl = presence ? presence.avatar_url : mxUser.avatarUrl || '';
    var avatar = _this.urlTransfer(originAvatarUrl);
    var statusMsg = presence && presence.ext_status_msg ? JSON.parse(JSON.stringify(presence.ext_status_msg)) : null;
    var isOnline = statusMsg ? statusMsg.staffOnline : true;
    var newUser = {
      id: mxUser.userId,
      name: name,
      avatar: avatar,
      isOnline: isOnline
    };
    return newUser;
  };

  this.urlTransfer = function () {
    var rawUrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'raw';
    var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : AVATAR_SIZE;
    var height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : AVATAR_SIZE;

    try {
      var url = rawUrl.trim();
      if (url.startsWith('mxc')) {
        var _mxClient;

        // matrix protocol
        var params = mode === 'raw' ? [url] : [url, width, height, mode];
        url = (_mxClient = _this.mxClient).mxcUrlToHttp.apply(_mxClient, params);
      } else if (!(url.startsWith('http') || url.startsWith('blob') || url.startsWith('file'))) {
        // we are assuming this is a netdiskID without a protocol
        url = _this.makeDownloadUrl(mode, url);
      }
      return url;
    } catch (error) {
      return rawUrl || '';
    }
  };

  this.makeDownloadUrl = function (mode, resource) {
    if (mode === 'thumbnail') {
      return _this.baseUrl + "/api/v1/netdisk/thumbnail/" + resource + "?" + _this.authSuffix;
    }
    return _this.baseUrl + "/api/v1/netdisk/download/" + resource + "?" + _this.authSuffix;
  };

  this.eventCenter = new _index.Events();
  this.myUserId = '';
  this.baseUrl = '';
  this.authSuffix = '';
  this.mxSdk = _main2.default;

  this.mxClient = mxClient;
  this.myUserId = option.userId;
  this.baseUrl = option.baseUrl;
  this.authSuffix = "access_token=" + option.accessToken + "&jwt=" + option.jwt;
  this.store = option.store;
};

exports.default = BaseModule;