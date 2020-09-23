import { Events } from '@tarojs/taro';
import sdk from '@finogeeks/finchat-js-sdk-miniprogram'
// import sdk from '@finogeeks/matrix-js-sdk-miniprogram'
// const sdk = require('@finogeeks/matrix-js-sdk-miniprogram');
import { Room, RoomType } from '../interface/room';
import { Message } from '../interface/message';
import { User } from '../interface/user';
import { ModuleOpts } from '../interface/module';
import { Store } from '../interface/store';
import { getCacheSync, removeCacheSync } from '@/utils/store';

const AVATAR_SIZE = 64

class BaseModule {
  store:Store;
  mxClient: any;
  eventCenter = new Events();
  myUserId = '';
  baseUrl = '';
  authSuffix = '';
  mxSdk = sdk;
  constructor(mxClient: any, option:ModuleOpts) {
    this.mxClient = mxClient;
    this.myUserId = option.userId;
    this.baseUrl = option.baseUrl;
    this.authSuffix = `access_token=${option.accessToken}&jwt=${option.jwt}`
    this.store = option.store;
  }

  protected buildRoom = (mxRoom):Room => {
    // console.log(mxRoom)
    try {
      if (!mxRoom) return null;
      const roomState = mxRoom.currentState;
      const me = roomState.getMember(this.myUserId);
      const powerEvent = roomState.getStateEvents('m.room.power_levels', '');
      const meta = this.getRoomMeta(mxRoom);
      const roomRule = this.mxClient.getRoomPushRule('global', mxRoom.roomId);
      
      // 新增新的静音状态字段
      let muteStatus = 'default';
      if (roomRule && roomRule.enabled && roomRule.actions.length) {
        const { actions = [] } = roomRule;
        if (actions.indexOf('dont_notify') > -1) muteStatus = 'mute';
        if (actions.indexOf('prohibit_notify') > -1) muteStatus = 'prohibit';
        if (actions.indexOf('fold_notify') > -1) muteStatus = 'fold_mute';
      }
      const isMute = muteStatus !== 'default';
      const id = mxRoom.roomId;
      const name = meta.roomName;
      const avatar = meta.roomAvatar;
      const roomType = meta.roomType;
      const topicMsg = meta.topicMsg;
      const topic = meta.topic;
      const orderInfo = meta.orderInfo;
      const isOnline = meta.isOnline;
      const avatarUserIds = meta.avatarUserIds;
      const members = meta.members;

      const membership = (me && me.membership) || '';
      const updatedAt = this.getUpdatedAt(mxRoom);
      const createdAt = this.getCreatedAt(mxRoom);
      const unread = mxRoom.getUnreadNotificationCount('total') || 0;
      const states = this.getRoomState(mxRoom);
      const banned =
        powerEvent &&
        powerEvent.event &&
        powerEvent.event.content &&
        powerEvent.event.content.events_default === 100;

      let channelInfo = null;
      if (roomType === RoomType.channel) {
        const activityEvent = roomState.getStateEvents('m.room.activity', '');
        channelInfo = {
          type: activityEvent ? 'activity' : 'normal',
          detail: activityEvent ? activityEvent.event.content : {},
        };
      }
      const isHide = !!mxRoom.tags.hide;
      const roomCerateEvent = roomState.getStateEvents('m.room.create', '');
      const isChannel = !!(roomCerateEvent && roomCerateEvent.event.content.is_channel);
      const federate = !!(roomCerateEvent && roomCerateEvent.event.content['m.federate']);
      const isArchive = !!(roomState.getStateEvents('m.room.archive', '') && roomState.getStateEvents('m.room.archive', '').event.content.archive);
      const isDirect = !!(roomCerateEvent && roomCerateEvent.event.content.is_direct);
      const isCrossDomain = isDirect ? avatarUserIds.find(e => e!==this.myUserId) && avatarUserIds.find(e => e!==this.myUserId).split(':')[1] !== this.myUserId.split(':')[1] : false;
      let publicChannel;
      try {
        publicChannel = roomState.getStateEvents('m.room.join_rules', '').event.content.join_rule === 'public';
      } catch(e) {
        console.log('~~~~~~~~publicChannel  error~~~~~~~~~~~');
      }
      const isSecret = !!(roomCerateEvent && roomCerateEvent.event.content.is_secret);
      const isNormalRobot = roomType === 'NORMAL_BOT';
      const isDelete = !!mxRoom.tags.delete;
      const lastMessage = this.parseMessageString(this.getLastMessage(mxRoom), {
        isChannel,
        isDirect,
        isGroup: !(isChannel || isDirect)
      });

      return {
        id,
        name,
        avatar,
        avatarUserIds,
        roomType,
        topicMsg,
        orderInfo,
        isOnline,
        membership,
        lastMessage,
        updatedAt,
        createdAt,
        unread,
        states,
        members,
        banned,
        channelInfo,
        isHide,
        isDelete,
        topic,
        isChannel,  // 是否频道
        isArchive,  //  是否已归档
        isDirect, //  和单个人聊天
        isNormalRobot,  //  是否智能助手
        isCrossDomain,  // 是否跨域人员
        federate, // 是否共享频道
        publicChannel, // 是否公开频道
        isSecret, // 是否保密房间
        isGroup: !(isChannel || isDirect), // 是否群聊
        powerLevel: me && me.powerLevel, // 房间中个人权限 100为管理员
        isMute,
      };
    } catch(e) {
      console.log('~~~~~~~~~buildRoom error~~~~~~~~~~~~`', e);
    }
  }

  private getRoomMeta = (mxRoom:any) => {
    const roomState = mxRoom.currentState
    const topicEvent = roomState.getStateEvents('m.room.topic', '')
    let topicData = null;
    let originTopicData = topicEvent ? topicEvent.event.content.topic : '';
    try {
      if (typeof originTopicData === 'string') {
        topicData = JSON.parse(originTopicData)
      } else {
        topicData = originTopicData;
      }
    } catch (error) {
      topicData = null;
    }

    const mxMembers = mxRoom.getJoinedMembers();

    const members: User[] = mxMembers.map(mxUser => this.getLocalUser(mxUser.userId)).filter(user => !!user)
    let roomName = mxRoom.name;
    let roomAvatar = mxRoom.getAvatarUrl(this.baseUrl, 60, 60, 'scale', false);
    let avatarUserIds = []; // 提供头像的用户id
    let isOnline = true;
    let orderInfo = {};
    let roomType = RoomType.channel;
    let topicMsg = '';

    if (!topicData) {
      avatarUserIds = members.slice(0, 4).map(member => member.id);
      return {
        roomName,
        avatarUserIds,
        roomAvatar,
        isOnline,
        orderInfo,
        roomType,
        topicMsg,
        members,
        topic: null,
      };
    }

    topicMsg = topicData.topic || '';

    const { custService, botId, swanBotType } = topicData;
    // 投顾房间
    if (custService && custService.type == 'dispatch' && custService.staffId) {
      const staffInfo = this.getLocalUser(custService.staffId);
      orderInfo = { ...custService };
      roomName = staffInfo.name;
      roomAvatar = staffInfo.avatar;
      isOnline = staffInfo.isOnline;
      roomType = RoomType.advisor;
      avatarUserIds.push(custService.staffId);

      // 派单房间
    } else if (custService && custService.type == 'dispatch') {
      orderInfo = { ...custService };
      roomType = RoomType.dispatch;

      // 智能客服房间
    } else if (botId && swanBotType === 'smart') {
      roomType = RoomType.smartBot;
      avatarUserIds.push(botId);

      // 普通机器人房间
    } else if (botId) {
      avatarUserIds.push(botId);
      roomType = RoomType.normalBot;

      // 频道房间
    } else {
      avatarUserIds = members.slice(0, 4).map(member => member.id);
    }

    if (botId) {
      const botInfo = this.getLocalUser(botId);
      roomAvatar = botInfo.avatar;
      roomName = botInfo.name;
      avatarUserIds = [botId];
    }

    return {
      roomName,
      avatarUserIds,
      roomAvatar,
      isOnline,
      orderInfo,
      roomType,
      topicMsg,
      members,
      topic: topicData,
    };
  }

  protected getLocalUser = (userId:string) =>{
    let user = this.store.user.get(userId);
    if (user) return user;
    const mxUser = this.mxClient.getUser(userId);
    if (mxUser) {
      user = this.buildUser(mxUser);
      this.store.user.put(user.id, user);
      return user;
    }
    return {} as User;
  }

  protected getLocalRoom = (roomId:string) => {
    let room = this.store.room.get(roomId);
    if (room) return room;
    const mxRoom = this.mxClient.getRoom(roomId);
    if (mxRoom) {
      room =  this.buildRoom(mxRoom);
      this.store.room.put(room.id, room);
      return room;
    }
    return null;
  }

  private getUpdatedAt = (mxRoom) => {
    try {
      const lastMessage = this.getLastMessage(mxRoom)
      const updatedAt = lastMessage.time
      return updatedAt
    } catch (error) {
      return this.getCreatedAt(mxRoom) || 0
    }
  }

  private getCreatedAt = (mxRoom) => {
    try {
      const roomState = mxRoom.currentState
      const createEvent = roomState.getStateEvents('m.room.create', '')
      return createEvent.getTs()
    } catch (error) {
      return 0
    }
  }

  private getRoomState = (mxRoom) =>{
    const mxState = mxRoom.getLiveTimeline().getState(this.mxSdk.EventTimeline.FORWARDS);
    try {
      const states = []
      Object.values(mxState.events).forEach((mxStateEvent) => {
        const state = Object.values(mxStateEvent).map(mxEvent => this.buildMessage(mxEvent))
        states.push(...state)
      })
      return states
    } catch (error) {
      return []
    }
  }

  private getLastMessage = (mxRoom) => {
      // Build last message from mxRoom's timeline
    let message = null;
    const mxEvents = mxRoom.timeline.filter(this.messageFilter, true);
    if (mxEvents && mxEvents.length > 0) {
      const mxEvent = mxEvents[mxEvents.length - 1];
      message = this.buildMessage(mxEvent);
    } else {
      try {
        const mxState = mxRoom.getLiveTimeline().getState(this.mxSdk.EventTimeline.FORWARDS);
        const mxStateEvents = mxState.getStateEvents('m.room.create');
        const mxStateEvent = mxStateEvents[mxStateEvents.length - 1];
        message = this.buildMessage(mxStateEvent);
      } catch (error) {}
    }
    return message;
    // If no last message found, we use create room event for fallback
  }

  private parseMessageString = (message, {
    isChannel,
    isDirect,
    isGroup
  }) => {
    const userSession = getCacheSync('userSession');
    const myId = userSession['userId'];
    try {
      let lastMessage = '';
      if (!!message && !!message.content) {
        const msgtype = message.content.msgtype || 'unknown';
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
            break
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
        lastMessage = `${message.user.id === myId ? '你' : `"${message.user.name}"`}撤回了一条消息`;
      }
      if (message.type === 'm.room.member' && message.content.membership === 'join') {
        lastMessage = `${message.state_key === myId ? '你' : `"${message.content.displayname}"`}加入了${
          isChannel ? '频道' : (isGroup ? '房间' : '会话')
        }`
      }
      if (message.type === 'm.room.member' && message.content.membership === 'leave') {
        lastMessage = `"${message.content.displayname}"离开了${
          isChannel ? '频道' : (isGroup ? '房间' : '会话')
        }`
      }
      if (message.type === 'm.room.member' && message.content.membership === 'invite') {
        lastMessage = `${message.user.id === myId ? '你' : `"${message.user.name}"`}邀请${message.state_key === myId ? '你' : `"${message.content.displayname}"`}加入了${
          isChannel ? '频道' : (isGroup ? '房间' : '会话')
        }`
      }
      if (message.type === 'm.room.name') {
        lastMessage = `${message.user.id === myId ? '你' : `"${message.user.name}"`}修改了${
          isChannel ? '频道' : (isGroup ? '房间' : '会话')
        }名称为：${message.content.name}`
      }
      if (message.type === 'm.room.create') {
        lastMessage = `${message.user.id === myId ? '你' : `"${message.user.name}"`}创建了${
          isChannel ? '频道' : (isGroup ? '房间' : '会话')
        }`
      }
      return lastMessage.slice(0, 30);
    } catch (e) {
      console.log(e);
    }
  }

  protected messageFilter = (mxEvent) => {
    let allowedTypes = [
      'm.room.create',
      'm.room.message',
      'm.room.name',
      'm.room.member',
      'm.room.redaction',
      'm.swan.push_retail.transfer',
    ];
    const { event } = mxEvent;
    const isEvalReply =
      event.content.msgtype === 'fc.convo.reply' && event.content.hide;
    // 过滤 notice 消息
    let isVisibleNotice = true;
    if (event.content.msgtype === 'm.notice' && event.content.extra) {
      if (!event.content.extra.retailVisible) {
        isVisibleNotice = false;
      }
    }
    return (
      allowedTypes.includes(mxEvent.getType()) && !isEvalReply && isVisibleNotice
    );
    // return true
  }

  protected buildMessage = (mxEvent, id):Message => {
    try {
      let content = JSON.parse(JSON.stringify(mxEvent.getContent()))
      // transfer the url in content if there are any url
      content = this.transferContentUrl(content, mxEvent)
      // const mxUser = this.mxClient.getUser(mxEvent.getSender());
      const user = this.getLocalUser(mxEvent.getSender())
      const builtMsg = {
        state_key: mxEvent.event.state_key,
        id: mxEvent.getId() || this.mxClient.makeTxnId(),
        user,
        isMy: this.myUserId === user.id,
        roomId: mxEvent.getRoomId(),
        body: content.body,
        content,
        time: mxEvent.getTs(),
        type: content.msgtype || mxEvent.getType(), // TODO should parse
        status: mxEvent.status,
      };
      if (mxEvent.isRedacted()) {
        builtMsg.isRedacted = true;
        builtMsg.sender = mxEvent.sender.name
      }
      return builtMsg;
    } catch (error) {
      return null
    }
  }

  private transferContentUrl = (content, mxEvent) =>{
    try {
      // Transfer if there are any url in content
      if (content.url) {
        content.url = this.urlTransfer(content.url)
      }
      // Transfer if there are any thumbnail_url in content.info
      if (content.info && content.msgtype === 'm.video') {
        // Handle video thumbnail
        // MARK since video thumbnail can not retrieve from 'thumbnail' mode, only 'download'
        content.info.thumbnail_url = this.urlTransfer(content.info.thumbnail_url)
      } if (content.info && ('thumbnail_url' in content.info)) {
        content.info.thumbnail_url = this.urlTransfer(content.info.thumbnail_url || content.url, 'thumbnail')
      }
      // Transfer avatar_url in state event content
      if (content.avatar_url) {
        content.avatar_url = this.urlTransfer(content.avatar_url)
      }
      return content
    } catch (error) {
      // if transfer encountered error, stop the transfer and return the origin content back
      return content
    }
  }

  protected buildUser = (mxUser): User =>{
    const { events } = mxUser;
    const presence = events && events.presence && events.presence.getContent();
    const name = presence ? presence.displayname : mxUser.displayName || '';
    const originAvatarUrl = presence ? presence.avatar_url : mxUser.avatarUrl || '';
    const avatar = this.urlTransfer(originAvatarUrl);
    const statusMsg = presence && presence.ext_status_msg ? JSON.parse(JSON.stringify(presence.ext_status_msg)) : null;
    const isOnline = statusMsg ? statusMsg.staffOnline : true;
    const newUser:User = {
      id: mxUser.userId,
      name,
      avatar,
      isOnline,
    }
    return newUser

  }

  urlTransfer = (rawUrl = '', mode = 'raw', width = AVATAR_SIZE, height = AVATAR_SIZE) => {
    try {
      let url = rawUrl.trim()
      if (url.startsWith('mxc')) {
        // matrix protocol
        const params = mode === 'raw' ? [url] : [url, width, height, mode]
        url = this.mxClient.mxcUrlToHttp(...params)
      } else if (url.startsWith('http') || url.startsWith('blob') || url.startsWith('file')) {
        // http/blob/file protocol
        // do nothing and returning url
      } else {
        // we are assuming this is a netdiskID without a protocol
        url = this.makeDownloadUrl(mode, url);
      }
      return url
    } catch (error) {
      return rawUrl || ''
    }
  }

  private makeDownloadUrl = (mode:string, resource:string) =>{
    if (mode === 'thumbnail') {
      return `${this.baseUrl}/api/v1/netdisk/thumbnail/${resource}?${this.authSuffix}`
    }
    return `${this.baseUrl}/api/v1/netdisk/download/${resource}?${this.authSuffix}`
  }

  // on(eventType, callback) {
  //   this.__eventCenter.on(`Model ${this.__prefix}:${eventType}`, callback);
  // }

  // once(eventType, callback) {
  //   this.__eventCenter.once(`Model ${this.__prefix}:${eventType}`, callback);
  // }

  // off(eventType, callback) {
  //   this.__eventCenter.off(`Model ${this.__prefix}:${eventType}`, callback);
  // }

  // emit(eventType, data) {
  //   this.__eventCenter.trigger(`Model ${this.__prefix}:${eventType}`, data);
  // }
}

export default BaseModule;
