import matrix from '@/matrix';
import { StoreUpdateEvent } from '@/matrix/interface/store';
import { Room, RoomType } from '@/matrix/interface/room';
import { DispatchState } from '@/matrix/interface/dispatch';
import Taro, { Events, eventCenter } from '@tarojs/taro';
import wxRouter from '@/router/index';
import { NAV_PAGES } from '@/constants/navigation';
import { setCacheSync } from '@/utils/store';
import { upload } from '@/utils/http-client';
import { EnterRoomOpts, IMEvent } from './interface';
import service from '../service';
import {
  DISPATCH_STATE,
  DISPATCH_STATE_UPDATE,
  QUESTION_TYPE,
} from '../constants/dispatch';
import {
  addViewingRoom,
} from '@/actions/room';
import { MessageContent, MessageType } from '@/matrix/interface/message';
import { getCacheSync } from '@/utils/store';
import store from '@/store';

class IM {
  isReady = false
  matrix = matrix
  eventCenter = new Events();
  userId: string
  dispatchModalShowed: boolean = false;
  reDispatchModalShowed: boolean = false;

  start = async (userId) => {
    try {
      const isReady = await this.matrix.start();
      if (!isReady) return false;
      this.userId = userId;
      this.isReady = isReady;
      // this.updateUnreadBadge();
      this.matrix.room.onUpdate(this.handleRoomUpdate);
      this.matrix.user.onUpdate(this.handleUserUpdate);
      this.matrix.dispatch.onUpdate(this.handleDispatchUpdate);
      this.matrix.timeline.onUpdate(this.handleTimelineUpdate);
      this.matrix.mxClient.on('toDeviceEvent', this.handleDeviceEvent);
    } catch (error) {
      return false;
    }
  }


  stop() {
    this.isReady = false;
    this.matrix.stop();
  }

  get() {
    return this.matrix.mxClient;
  }

  init() {

  }

  getBasicRooms() {
    return this.matrix.room.getBasicRooms();
  }

  getRoom(roomId:string) {
    return this.matrix.room.getRoom(roomId);
  }

  enterRoom = async ( roomId, opts:EnterRoomOpts = {  } ) => {
    if (!roomId) return;
    const params:any = { roomId };
    const room = this.getRoom(roomId);
    // if (!room && !autoJoin) return false;
    if (!room && opts.autoJoin) {
      try {
        const res = await service.common.joinRoom(roomId, opts.staffId, true);
        // res.status: 0 直接进入频道，1 需要认证
        if (res.status !== 0) {
          Taro.showToast({ title: res.message, icon: 'none' });
          return false;
        }
        params.firstEnterRoom = true;
      } catch (error) {
        console.log('error', error);
        Taro.showToast({ title: error.data.errcode, icon: 'none' });
        return false;
      }
    }
    // params.firstEnterRoom = true;
    // Taro.showLoading();
    const readyRoom = await this.matrix.room.waitRoomReady(roomId, opts.join);
    // Taro.hideLoading();
    if (!readyRoom) {
      Taro.showToast({ title: '房间获取超时', icon: 'none' });
      return;
    };
    store.dispatch(addViewingRoom(room));
    // await this.addViewingRoom(roomId);
    if (opts.reopenOrder) {
      // url += `&reopenOrder=true`
      params.reopenOrder = true;
    }
    if (opts.sendMsg) {
      // url += `&sendMsg=${sendMsg}`
      // params.sendMsg = sendMsg
      setCacheSync('sendMsg', opts.sendMsg);
    }
    if (opts.dispatchQuestionType) {
      // url += `&dispatchQuestionType=${dispatchQuestionType}`
      params.dispatchQuestionType = opts.dispatchQuestionType;
    }
    if (opts.staffId) {
      // url += `&staffId=${staffId}`
      params.staffId = opts.staffId;
    }
    if (opts.channelId) {
      // url += `&staffId=${staffId}`
      params.channelId = opts.channelId;
    }
    // console.log('params', params);
    if (opts.redirect) {
      wxRouter.redirectTo(NAV_PAGES.ROOM, params);
    } else {
      wxRouter.navigateTo(NAV_PAGES.ROOM, params);
    }
    return true;
  };


  enterAdvisorRoom = async (staffId, sendMsg, redirect, formId = '') => {
    // console.log('enter adivor ID');
    // console.log('target staffId: ', staffId)
    const rooms = this.matrix.room.getRooms();
    const targetRoom = rooms.find(room => room.orderInfo.staffId === staffId);
    let targetRoomId = null;
    if (targetRoom) {
      targetRoomId = targetRoom.id;
    } else {
      const res = await service.adviser.getDirectDispatchRoom({
        staffId: staffId,
        retailId: this.userId,
      });
      if (!res) return false;
      targetRoomId = res.roomId;
    }
    // console.log('targetRoomId', targetRoomId);
    const readyRoom = await this.matrix.room.waitRoomReady(targetRoomId);
    if (!readyRoom) return false;
    this.enterRoom(targetRoomId, {
      staffId,
      sendMsg,
      redirect,
      reopenOrder: true,
    });
    if (!formId) return true;
    const userSession = getCacheSync('userSession');
    service.report
      .reportFormId(
        targetRoomId,
        'adviser',
        formId,
        userSession.openId,
        userSession.userId,
      )
      .catch(error => {
        console.log('reportFormId error', error);
      });
    return true;
  };

  enterDisptachRoom = async (retailId, dispatchQuestionType, sendMsg) => {
    const { dispatchState, dispatchRoomId, from } = this.matrix.dispatch.getState();
    if (dispatchState === DispatchState.dispatching) {
      // console.log('checkout dispatching room', dispatchRoomId, from)
      return this.enterRoom(dispatchRoomId);
    }
    const advisorRoomData =
      (await service.adviser.getAdvisorRoomInfo({
        pattern: 'B',
        retailId: retailId,
      })) || {};
    const targetRoomId = advisorRoomData.roomId;
    // console.log('get dispatch advisor room: ', targetRoomId);
    this.enterRoom(targetRoomId, { dispatchQuestionType, sendMsg });
  };

  getRoomGroupAvatar = (roomId:string) => {
    return this.matrix.room.getRoomGroupAvatar(roomId);
  };

  hideRoom = (roomId) => {
    return this.matrix.room.hideRoom(roomId);
  };

  getSmartBotRoomId = () => {
    const rooms = this.matrix.room.getRooms();
    const aiRoom = rooms.find(room => room.roomType === RoomType.smartBot);
    return aiRoom ? aiRoom.id : '';
  };

  addViewingRoom = (roomId) => {
    return this.matrix.timeline.addViewingRoom(roomId);
  };

  removeViewingRoom = (roomId) => {
    return this.matrix.timeline.removeViewingRoom(roomId);
  };

  getDispatchData = () => {
    return this.matrix.dispatch.getState();
  }

  closeDispatch = () => {
    return this.matrix.dispatch.close();
  }

  selectDispachQuestionType = (type:string) => {
    return this.matrix.dispatch.selectQuestionType(type);
  }

  getUser = (userId:string) => {
    return this.matrix.user.getUser(userId);
  }

  setReceipt = async (roomId:string) => {
    return this.matrix.timeline.setReceipt(roomId)
  }

  sendMessage = async (roomId:string, content:MessageContent) => {
    return this.matrix.timeline.sendMessage(roomId, content);
  }

  sendTextMessage = async (roomId:string, content:MessageContent) => {
    const response = await this.sendMessage(roomId, {
      ...content,
      msgtype: MessageType.Text,
    })
    // Taro.reLaunch({
    //   url: NAV_PAGES.LOGIN
    // });
    // Taro.showToast({ title: '当前token已失效,请重新登录', icon: 'none' });
    return response
  }

  sendLocationMessage = async (roomId:string, content:MessageContent) => {
    const response = await this.sendMessage(roomId, {
      ...content,
      msgtype: MessageType.Location,
    })
    return response
  }

  sendConvoReplyMessage = async (roomId:string, content:MessageContent) => {
    const response = await this.sendMessage(roomId, {
      ...content,
      msgtype: MessageType.ConvoReply,
    })
    return response
  }

  sendConvoMessage = async (roomId:string, content:MessageContent) => {
    const response = await this.sendMessage(roomId, {
      ...content,
      msgtype: MessageType.ConvoUI,
    })
    return response
  }

  sendImageMessage = async (roomId:string, content:MessageContent) => {
    // Add pending message during upload
    // expect to get { messageId, content }
    const pending = this.matrix.timeline.addPendingMessage(roomId, {
      ...content,
      url: content.path,
      msgtype: MessageType.Image
    })

    const pendingPayload = { roomId, ...content, ...pending }

    // Upload to the netdisk
    // expected to get { url }
    const uploaded = await upload(pendingPayload)

    if (uploaded && uploaded.error) {
      // Handle upload error
      this.matrix.timeline.updatePendingMessage(roomId, { ...content, ...pending, status: 'error' })
    } else if (uploaded) {
      // Remove pending message when upload is done, before sending the real message (avoid flashing)
      this.matrix.timeline.removePendingMessage(roomId, pendingPayload)

      // Send the real message out
      const success = await this.matrix.timeline.sendMessage(roomId, {
        ...pendingPayload,
        ...uploaded,
        msgtype: MessageType.Image
      })
      return success
    }
  }

  redactMessage = async (roomId:string, messageId:string) => {
    return this.matrix.timeline.redactMessage(roomId, messageId);
  }

  resendMessage = async (roomId:string, messageId:string) => {
    return this.matrix.timeline.resendMessage(roomId, messageId);
  }

  loadMoreTimeline = async (roomId:string, dir: 'BACKWORDS' | 'FORWARDS') => {
    return this.matrix.timeline.loadMoreTimeline(roomId, dir);
  }

  transUrl = (url:string) => {
    return this.matrix.user.transUrl(url);
  }


  on(type: IMEvent, cb = () => {}) {
    this.eventCenter.on(type, cb);
  };

  off(type: IMEvent, cb) {
    this.eventCenter.off(type, cb);
  }


  private handleRoomUpdate = async (e:StoreUpdateEvent<Room>) => {
    console.log('ROOM UPDATE: ', e);
    const basicRooms = this.matrix.room.getBasicRooms();
    const rooms = this.matrix.room.getRooms();
    const event = {
      rooms,
      basicRooms,
      room: e.item,
    }
    this.updateUnreadBadge();
    this.eventCenter.trigger(IMEvent.ROOM, event);

    if (e.prevItem && e.prevItem.membership !== e.item.membership) {
      switch(e.item.membership) {
        case 'leave':
          Taro.showToast({
            title: `您已离开房间：${e.item.name}`,
            icon: 'none',
          });
          const pages = Taro.getCurrentPages();

          if (this.matrix.timeline.isViewingRoom(e.item.id)) {
            // console.log(pages.length);
            // if (pages.length === 2) {
            //   setTimeout(() => wxRouter.navigateBack(), 0);
            // } else {
            //   setTimeout(() =>  wxRouter.switchTab(NAV_PAGES.HOME), 0);
            // }
            setTimeout(() =>  wxRouter.switchTab(NAV_PAGES.HOME), 0);
          }
          break;
        default: break;
      }
    }

    // console.log;
  }

  private handleUserUpdate = async (e) => {
    console.log('USER UPDATE: ', e);
    this.eventCenter.trigger(IMEvent.USER, e);
  }

  private handleDispatchUpdate = async (e) => {
    console.log('DISPATCH UPDATE', e);
    const { dispatchState, acceptRoomId, dispatchRoomId, from } = e;
    // console.log('newstate: ', dispatchState);
    const pages = Taro.getCurrentPages();
    const curPage = pages[pages.length -1];

    const curRoomId = curPage.route === 'pages/room/index' ? curPage.options.roomId : '';
    const curRoom = this.matrix.room.getRoom(curRoomId);
    // console.log('smartBotRoomId', smartBotRoomId);

    const isInDispatchRoom =
      curRoomId === dispatchRoomId && from === 'dispatch-bot';
    // const isInSmartBotRoom = curRoomId === smartBotRoomId
    // console.log('curRoomId', curRoomId);
    // console.log('isInDispatchRoom', isInDispatchRoom);
    if (dispatchState !== DISPATCH_STATE.dispatching) {
      setCacheSync('setCacheSync', []);
    }
    console.log('this.dispatchModalShowed', this.dispatchModalShowed);

    switch (dispatchState) {
      case DISPATCH_STATE.accepted:
        // handle accepted state
        this.matrix.dispatch.close();
        if (isInDispatchRoom) {
          // console.log('acceptRoomId', acceptRoomId);
          // console.log('dispatchRoomId', dispatchRoomId);
          console.log('acceptRoomId === dispatchRoomId', acceptRoomId === dispatchRoomId);
          if (acceptRoomId === dispatchRoomId) return;
          // Taro.redirectTo({ url, })
          // wxRouter.redirectTo(NAV_PAGES.ROOM, { roomId: acceptRoomId })
          this.enterRoom(acceptRoomId, { redirect: true });
        } else if(!this.dispatchModalShowed) {
          const that = this;
          that.dispatchModalShowed = true;
          Taro.showModal({
            title: '派单成功',
            content: '您的专属客服已到位',
            cancelText: '稍后进入',
            confirmText: '进入房间',
            success(res) {
              that.matrix.dispatch.close();
              // this.isShowModal = false;
              that.dispatchModalShowed = false;
              if (!res.confirm) {
                return;
              }
              if (pages.length >= 2) {
                // Taro.redirectTo({ url, })
                // wxRouter.redirectTo(NAV_PAGES.ROOM, { roomId: acceptRoomId })
                that.enterRoom(acceptRoomId, { redirect: true });
              } else {
                // Taro.navigateTo({ url, })
                // wxRouter.navigateTo(NAV_PAGES.ROOM, { roomId: acceptRoomId })
                that.enterRoom(acceptRoomId);
              }
            },
          });
        }
      case 'DISPATCHING':
        break;
      case 'TIMEOUT':
        // const viewingRoom = store.getState().room.viewingRoom;
        if (
          !curRoom ||
          (curRoom.roomType !== 'DISPATCH' &&
            curRoom.roomType !== 'SMART_BOT')
        ) {
          this.matrix.dispatch.close();
        }
      default:
        break;
    }
    this.eventCenter.trigger(IMEvent.DISPATCH, e);
  }

  private handleTimelineUpdate = async (event) => {
    console.log('======handleTimelineUpdate======');
    console.log(event);
    this.eventCenter.trigger(IMEvent.TIMELINE, event);
  }

  private updateUnreadBadge = async () => {
    // console.log('======updateUnreadBadge=====');
    const rooms = this.getBasicRooms();
    const unread = rooms.reduce((pre, cur) => {
      // if (cur.unread) {
      //   console.log(cur);
      // }
      return pre + (cur.isArchive ? 0 : cur.unread);
    }, 0);
    console.log(unread);
    try {
      if (unread === 0) {
        await Taro.removeTabBarBadge({ index: 0 });
        return;
      }
      const badgeText = unread > 99 ? '99+' : unread;
      await Taro.setTabBarBadge({ index: 0, text: `${badgeText}` });
    } catch (error) {
      return;
    }
  }

  private handleDeviceEvent = (mxEvent) => {
    console.log('handleDeviceEvent', mxEvent);
    const { event } = mxEvent;
    // const pages = Taro.getCurrentPages()
    if (event && event.type === 'm.swan.push_retail.transfer') {
      // hack，确保房间信息准备完成。
      const that = this;
      setTimeout(() => {
        if (that.reDispatchModalShowed) return;
        that.reDispatchModalShowed = true;
        // const url = `/pages/room/index?roomId=${event.content.newRoomId}`
        Taro.showModal({
          title: '转单成功',
          content: '您新客服已到位',
          cancelText: '稍后进入',
          confirmText: '进入房间',
          success(res) {
            that.reDispatchModalShowed = false;
            if (!res.confirm) return;
            that.enterRoom(event.content.newRoomId, { redirect: true });
            // if (pages.length >= 2) {
            //   // Taro.redirectTo({ url })
            //   wxRouter.redirectTo(NAV_PAGES.ROOM, { roomId: event.content.newRoomId })
            // } else {
            //   // Taro.navigateTo({ url })
            //   wxRouter.navigateTo(NAV_PAGES.ROOM, { roomId: event.content.newRoomId })
            // }
          },
        });
      }, 500);
    }
  }
}

const im = new IM();
export default im;
