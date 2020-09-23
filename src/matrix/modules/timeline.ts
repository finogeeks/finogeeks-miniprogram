import BaseModel from './base';
import { getRelativeTime } from '@/utils/date';
import { makeContent, updateContentUrl } from '../utils/content';
import { ModuleOpts } from '../interface/module';
import { Room, RoomType } from '../interface/room';
import * as convoUtil from '../utils/convo';
import { TimelineUpdateEvent } from '../interface/events';
import { MessageContent, EventStatus, Message, MessageType } from '../interface/message';
const MAX_MESSAGES_SHOW = 50;
const TIMELINE_UPDATE = 'TIMELINE_UPDATE';

export interface ViewingRoom {
  [x:string]: {
    createTime: number,
    timelineWindow: any,
    timeline: Message[],
  }
}

export default class TimelineModule extends BaseModel {
  viewingRooms:ViewingRoom = {}
  constructor(mxClient:any, opts:ModuleOpts) {
    super(mxClient, opts);
    this.init();
  }

  private init() {
    this.mxClient.on('Room.timeline', (mxEvent, mxRoom, toStartOfTimeline, removed, data) => this.handleTimelineEvent(mxEvent, mxRoom, toStartOfTimeline, removed, data))
    this.mxClient.on('Room.localEchoUpdated', (mxEvent, mxRoom) => this.handleLocalEchoUpdated(mxEvent, mxRoom))
  }

  addViewingRoom = async (roomId:string) => {
    let room = this.store.room.get(roomId);
    const mxRoom = this.mxClient.getRoom(roomId);
    if (!mxRoom) {
      // log Error 
      console.error('room not exit');
      return;
    }
    if (!room) {
      room = this.buildRoom(mxRoom);
      this.store.room.put(roomId, room);
    }

    if (room.topic && room.topic.isSendEnterRoom) {
      this.mxClient.sendEvent(
        room.id,
        'm.room._ext.enter',
        {
          body: {
            userId: this.myUserId,
          },
        },
      )
    }

    const timelineWindow = await this.createTimelineWindow(mxRoom);
    const createTime = Date.now();
    const timeline = this.getTimelineFromTimelineWindow(mxRoom.roomId, createTime, timelineWindow);
    this.viewingRooms[roomId] = { 
      createTime,
      timelineWindow,
      timeline,
    }; 
    
    return { 
      timeline, 
      canPaginateFront: timelineWindow.canPaginate(this.mxSdk.EventTimeline.FORWARDS),
      canPaginateBack: timelineWindow.canPaginate(this.mxSdk.EventTimeline.BACKWARDS),
    }
  }

  isViewingRoom(roomId:string) {
    return !!this.viewingRooms[roomId];
  }

  getTimeline = (roomId:string) => {
    const viewingRoom = this.viewingRooms[roomId];
    if (!viewingRoom) {
      console.error('need add viewing Room firset');
      return;
    }
    return viewingRoom.timeline;
  }

  removeViewingRoom = (roomId:string) => {
    delete this.viewingRooms[roomId];
  }

  loadMoreTimeline = async (roomId:string, dir: 'BACKWORDS' | 'FORWARDS') => {
    const viewingRoom = this.viewingRooms[roomId];
    if (!viewingRoom) {
      console.error('need add viewing Room firset');
      return null;
    }
    const { timeline, timelineWindow } = viewingRoom

    const paginateDir = dir === 'BACKWORDS' ? this.mxSdk.EventTimeline.BACKWARDS : this.mxSdk.EventTimeline.FORWARDS;

    if (!viewingRoom.timelineWindow.canPaginate(paginateDir)) {
      return {
        timeline,
        canPaginateFront: viewingRoom.timelineWindow.canPaginate(this.mxSdk.EventTimeline.FORWARDS),
        canPaginateBack: viewingRoom.timelineWindow.canPaginate(this.mxSdk.EventTimeline.BACKWARDS),
      }
    }
    await timelineWindow.paginate(paginateDir, 20);
    const newTimeline = this.getTimelineFromTimelineWindow(roomId, viewingRoom.createTime, viewingRoom.timelineWindow);
    this.viewingRooms[roomId].timeline = newTimeline;
    this.eventCenter.trigger(TIMELINE_UPDATE, {
      type: dir === 'BACKWORDS' ? "PAGINATE_BACK" : "PAGINATE_FORWARD",
      timeline: newTimeline,
    } as TimelineUpdateEvent)
    const canPaginate = viewingRoom.timelineWindow.canPaginate(paginateDir)

    return {
      timeline: newTimeline,
      canPaginateFront: viewingRoom.timelineWindow.canPaginate(this.mxSdk.EventTimeline.FORWARDS),
      canPaginateBack: viewingRoom.timelineWindow.canPaginate(this.mxSdk.EventTimeline.BACKWARDS),
    }
  }

  setReceipt = async (roomId:string, messageId?:string) => {
    try {
      const mxRoom = this.mxClient.getRoom(roomId)
      const mxEvent = messageId ? mxRoom.findEventById(messageId) : mxRoom.timeline[mxRoom.timeline.length - 1]
      const success = await this.mxClient.sendReadReceipt(mxEvent)
      return success
    } catch (error) {
      return false
    }
  }

  sendMessage = async (roomId, msgContent:MessageContent) => {
    try {
      // console.log('msgContent', msgContent);
      let content = makeContent(msgContent)
      // console.log('content', content);
      if (msgContent.url) {
        // update content url before sending message if url is set in msgContent
        content = updateContentUrl(content, msgContent.url)
      }
      if (!content) {
        throw new Error('Content undefined')
      }
      // expect { event_id }
      const response = await this.mxClient.sendMessage(roomId, content)
      // console.log('sendMessage~~~~~~', response);
      return { messageId: response.event_id, content }
    } catch (error) {
      // this.log(error, 'error')
      return false
    }
  }

  redactMessage = async (roomId:string, messageId:string) => {
    try {
      const success = await this.mxClient.redactEvent(roomId, messageId)
      return success
    } catch (error) {
      return false
    }
  }

  resendMessage = async (roomId:string, messageId:string) => {
    try {
      const mxRoom = this.mxClient.getRoom(roomId)
      const notSentMxEvent = mxRoom.getLiveTimeline().getEvents().find(mxEvent => 
        mxEvent.event.event_id === messageId && mxEvent.status === EventStatus.NOT_SENT)
      const success = this.mxClient.resendEvent(notSentMxEvent, mxRoom)
      return success
    } catch (error) {
      return false
    }
  }

  addPendingMessage(roomId, content:MessageContent) {
    try {
      const mxRoom = this.mxClient.getRoom(roomId)
      const mxMe = mxRoom.currentState.getMember(this.myUserId);
      const messageId = this.mxClient.makeTxnId()
      const newContent = makeContent(content)
      const mxEvent = new this.mxSdk.MatrixEvent({
        content: newContent,
        state_key: '',
        type: MessageType.Message,
        sender: this.myUserId,
        room_id: roomId,
        event_id: messageId,
        membership: mxMe.membership,
        // the pending property is added for the case that we need to reupload a file/media
        pending: {
          progress: 0,
          content: newContent,
          payload: content,
        },
      })
      mxEvent.status = EventStatus.SENDING
      mxRoom.addPendingEvent(mxEvent, messageId)
      return { messageId, content: newContent }
    } catch (error) {
      // this.log(error, 'error')
      return {}
    }
  }

  removePendingMessage(roomId:string, payload) {
    try {
      const mxEvent = this.updatePendingMessage(roomId, { ...payload, status: 'queued' })
      this.mxClient.cancelPendingEvent(mxEvent)
      return true
    } catch (error) {
      // this.log(error, 'error')
      return false
    }
  }

  updatePendingMessage(roomId:string, payload) {
    try {
      const { messageId, status } = payload
      const mxRoom = this.mxClient.getRoom(roomId)
      const mxEvent = mxRoom.findEventById(messageId)
      let mxStatus = ''
      switch (status) {
      case 'queued':
        mxStatus = EventStatus.QUEUED
        break

      case 'sending':
        mxStatus = EventStatus.SENDING
        break

      case 'error':
        mxStatus = EventStatus.NOT_SENT
        break

      case 'cancel':
        mxStatus = EventStatus.CANCELLED
        break

      case 'sent':
        mxStatus = EventStatus.SENT
        break

      case 'encrypting':
        mxStatus = EventStatus.ENCRYPTING
        break

      default:
        break
      }
      mxRoom.updatePendingEvent(mxEvent, mxStatus)
      const viewingRoom = this.viewingRooms[roomId];
      if (viewingRoom) {
        const newTimeline = this.getTimelineFromTimelineWindow(roomId, viewingRoom.createTime, viewingRoom.timelineWindow);
        // console.log('~~~~~~~~~updatePendingMessage~~~~~~~~~~~', newTimeline);
        viewingRoom.timeline = newTimeline;
        this.eventCenter.trigger(TIMELINE_UPDATE, {
          type: "MESSAGE_UPDATE",
          timeline: newTimeline,
        } as TimelineUpdateEvent)
      }
      return mxEvent
    } catch (error) {
      return false
    }
  }


  onUpdate(cb) {
    this.eventCenter.on(TIMELINE_UPDATE, cb);
  }

  offUpdate(cb) {
    this.eventCenter.off(TIMELINE_UPDATE, cb);
  }

  private createTimelineWindow = async (mxRoom) => {
    const timelineSet = mxRoom.getUnfilteredTimelineSet();
    // console.log('timelineSet', timelineSet);
    const timelineWindow = new this.mxSdk.TimelineWindow(
      this.mxClient,
      timelineSet,
      {
        windowLimit: 100000, // as large as possible
      },
    )
    await timelineWindow.load(null, 20)
    await timelineWindow.paginate(this.mxSdk.EventTimeline.BACKWARDS, 20)
    // await timelineWindow.paginate(this.mxSdk.EventTimeline.BACKWARDS, 20)
    return timelineWindow;
  }

  private getTimelineFromTimelineWindow = (roomId, createTime,timelineWindow) =>{
    // console.log('=========getTimelineFromTimelineWindow=========');
    console.log(timelineWindow.getEvents());
    const orginTimeline = timelineWindow.getEvents().filter(this.messageFilter).map(this.buildMessage);
    // console.log(orginTimeline);
    return this.computeTimeline(roomId, createTime, orginTimeline);
  }

  private handleTimelineEvent = async (mxEvent, mxRoom, toStartOfTimeline, removed, data) => {
    // console.log('~~~~~~~~~~~~~~~handleTimelineEvent  begin~~~~~~~~~~~~~~~~~~')
    if (!mxRoom) return;
    if (!!mxRoom.tags.hide) {
      this.mxClient.deleteRoomTag(mxRoom.roomId, 'hide');
    }
    const viewingRoom = this.viewingRooms[mxRoom.roomId];
    if(!viewingRoom || toStartOfTimeline) return;
    this.setReceipt(mxRoom.roomId);
    // const room = this.buildRoom(mxRoom);
    // this.store.room.put(mxRoom.roomId, room);
    const { timelineWindow, createTime } = viewingRoom;
    await timelineWindow.paginate(this.mxSdk.EventTimeline.FORWARDS, 1, false)
    const newTimeline = this.getTimelineFromTimelineWindow(mxRoom.roomId, createTime, timelineWindow);
    // console.log('~~~~~~~~~~~~~~~handleTimelineEvent~~~~~~~~~~~~~~~~~~', newTimeline[newTimeline.length - 1], mxEvent);
    viewingRoom.timeline = newTimeline;    
    this.eventCenter.trigger(TIMELINE_UPDATE, {
      type: "NEW_MESSAGE",
      timeline: newTimeline,
      newMessage: newTimeline[newTimeline.length - 1]
    } as TimelineUpdateEvent)
  };

  private handleLocalEchoUpdated = async (mxEvent, mxRoom) => {
    const viewingRoom = this.viewingRooms[mxRoom.roomId];
    // console.log('~~~~~~~~~handleLocalEchoUpdated~~~~~~~~~',viewingRoom, mxEvent); 
    if(!viewingRoom) return;
    const txnId = mxEvent._txnId;
    // const txnId = mxEvent.event.event_id;
    const eventStatus = mxEvent.status;
    const { timeline } = viewingRoom;
    const eventIdx = timeline.findIndex(event => (event.id.includes(txnId) || event.id.includes(mxEvent.event.event_id)));
    // console.log('~~~~~~~~~handleLocalEchoUpdated~~~~~~~~~',eventIdx, txnId); 
    if (eventIdx === -1) return;
    const newMsg = this.buildMessage(mxEvent, timeline[eventIdx].id);
    if (eventStatus === 'sent' || eventStatus) {
      newMsg.status = null;
    }
    const newTimeline = [...timeline];
    newTimeline[eventIdx] = newMsg;
    viewingRoom.timeline = newTimeline;  
    // console.log('~~~~~~~~~handleLocalEchoUpdated~~~~~~~~~',newMsg);  
    this.eventCenter.trigger(TIMELINE_UPDATE, {
      type: "MESSAGE_UPDATE",
      timeline:newTimeline,
      updateMessage: newTimeline[eventIdx]
    } as TimelineUpdateEvent)
  }

  private computeTimeline = (roomId, createTime, timeline) => {
    let room = this.store.room.get(roomId);
    const mxRoom = this.mxClient.getRoom(roomId)
    if(!room && !mxRoom) return [];
    if(!room) {
      room = this.buildRoom(mxRoom);
      this.store.room.put(room.id, room);
    }
    const filterZone = this.getFilterZone(room.id, room.roomType, room.states, createTime);
    const result = timeline.reduce((previous, current) => {
      const isSupportMessage = this.isSupportMessage(current);
      const isSupportEvent = this.isSupportEvent(room.roomType, current);
      if (!isSupportMessage && !isSupportEvent) return previous;
      if (this.isInFilterZone(filterZone, current.time)) return previous;

      const prevTime = previous[previous.length - 1]
        ? previous[previous.length - 1].time
        : null;
      const curTime = current.time;
      const timeMsg = this.getTimeMsg(prevTime, curTime);
      if (timeMsg) {
        previous.push(timeMsg);
      }
      if (convoUtil.isReplaceDisplay(current)) {
        const replaceIndex = previous.findIndex(msg => convoUtil.isReplaceDisplay(msg) && convoUtil.isSameContext(msg, current));
        if (replaceIndex !== -1) {
          const newArr = [...previous];
          newArr[replaceIndex] = current;
          return newArr;
        }
      }
      previous.push(current);
      return previous;
    }, []);
    return result;
  };

  private isSupportMessage = (event) =>{
    // const content = event.getContent();

    const supportMessage = [
      'm.notice',
      'm.text',
      'm.image',
      'm.file',
      'm.audio',
      'm.video',
      'm.url',
      'm.alert',
      'm.location',
      'fc.convo.ui',
      'fc.convo.reply',
      'fc.applet',
      'm.combine_forward',
      'm.businesscard',
      'm.bad.encrypted',
    ];
    return (
      supportMessage.includes(event.content.msgtype) || event.type === 'm.room.message'
    );
  }

  private isSupportEvent = (roomType, event) =>{
    const supportEvent = ['m.room.create', 'm.room.name', 'm.room.member'];
    // 临时兼容频道
    return (
      supportEvent.includes(event.type) && roomType === RoomType.channel
    );
  }

  private getTimeMsg = (prevTime, curTime) => {
    if (!prevTime) return null;
    if (curTime - prevTime < 1000 * 60 * 3) return null;
    const relativeTime = getRelativeTime(curTime);
    return {
      id: `${prevTime}`,
      content: {
        body: relativeTime,
        msgType: 'm.local.time',
      },
      user: {
        id: null,
      },
    };
  };

  // 获取过滤时间戳区间数组，例[[endStamp1, startsTamp1], [endStamp2, startsTamp2]]
  private getFilterZone = (roomId, roomType, roomStates, createTime) =>{
    if (roomType === RoomType.smartBot) {
      return [];
    }

    const stateEvents = roomStates || [];
    const filterEvents = stateEvents
      .filter(
        event =>
          event.type === 'm.modular.swan.dispatch_filter' &&
          event.content.filter === 'END',
      )
      .sort((a, b) => b.time - a.time);
    // console.log('filterEvents', filterEvents);
    const lastEndEvent = filterEvents.reduce((pre, cur) => {
      if (pre) return pre;
      const { dispatchState, filter, acceptRoomId } = cur.content;
      // 判断是否为 end 事件
      let isEnd = false;
      if (roomType === roomType.dispatch) {
        if (cur.time <= createTime) {
          isEnd = filter === 'END';
        }
      } else {
        if (acceptRoomId === roomId) {
          isEnd = filter === 'END' && dispatchState === 'TIMEOUT';
        } else {
          isEnd = filter === 'END';
        }
      }

      if (isEnd) return cur;
      return pre;
    }, null);
    if (!lastEndEvent) return [];
    return [[lastEndEvent.time, 0]];
  }

  private isInFilterZone = (zone, time) =>{
    if (zone.length === 0) return false;
    for (let idx = 0; idx < zone.length; idx++) {
      const ele = zone[idx];
      if (time < ele[0] && time > ele[1]) {
        return true;
      }
    }
    return false;
  }
}
