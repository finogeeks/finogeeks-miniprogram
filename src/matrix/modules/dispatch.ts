import { ROOMTYPES } from '@/constants/room';
import Taro from '@tarojs/taro';
import isEqual from '@/utils/lodash-local/is-equal';
import { setCacheSync, getCacheSync } from '@/utils/store';
import { ModuleOpts } from '../interface/module';
import BaseModule from './base';
import { Room } from '../interface/room';
import { DispatchState, DispatchData } from '../interface/dispatch';

const DISPATCH_STATE_UPDATE = 'DISPATCH_STATE_UPDATE'
const QUESTION_TYPE = 'QUESTION_TYPE';

export default class DispatchModule extends BaseModule {
  dispatchData: DispatchData
  inited: boolean
  constructor(mxClient:any, opts:ModuleOpts) {
    super(mxClient, opts);
    this.dispatchData = {
      dispatchState: DispatchState.close,
      questionType: this.getQuestionType(),
      from: '',
      orderId: '',
      pattern: '',
      dispatchRoomId: '',
      acceptRoomId: '',
      staffId: '',
    };
    this.inited = false;
    this.init();
  }

  init = async () => {
    await this.checkState();
    if (this.inited) return;
    this.mxClient.on('accountData', this.handleAccountData);
    const dispatchData =
      (await this.mxClient.getAccountData({ type: 'm.modular.swan.dispatch' })) ||
      {};
    if (!dispatchData.event) return;
    let { dispatchState, from, acceptRoomId, dispatchRoomId, questionType } =
      typeof dispatchData.event.content === 'string'
        ? JSON.parse(dispatchData.event.content)
        : dispatchData.event.content;
    questionType = questionType || getCacheSync(QUESTION_TYPE);
    dispatchState =
      dispatchState === DispatchState.dispatching
        ? dispatchState
        : DispatchState.close;
    this.updateDispatchState({
      dispatchState,
      from,
      acceptRoomId,
      dispatchRoomId,
      questionType,
    });
    this.inited = true;
  };


  private handleAccountData = (mxEvent) => {
    const { type, content } = mxEvent.event;
    if (type === 'm.modular.swan.dispatch') {
      let { dispatchState, from, dispatchRoomId, acceptRoomId, questionType } =
        typeof content === 'string' ? JSON.parse(content) : content;
      questionType = questionType || this.dispatchData.questionType;
      this.updateDispatchState({
        dispatchState,
        from,
        dispatchRoomId,
        acceptRoomId,
        questionType,
      });
    }
  };

  private updateDispatchState = ({
    dispatchState,
    from,
    dispatchRoomId,
    acceptRoomId,
    questionType,
  }:DispatchData) => {
    const newDispatchData = {
      ...this.dispatchData,
      from,
      acceptRoomId,
      questionType,
      dispatchState,
      dispatchRoomId,
    };

    if (newDispatchData.dispatchState === this.dispatchData.dispatchState)
      return;
    if (isEqual(newDispatchData, this.dispatchData)) return;
    this.dispatchData = newDispatchData;
    this.eventCenter.trigger(DISPATCH_STATE_UPDATE, this.dispatchData);
  };

  setQuestionType = questionType => {
    try {
      setCacheSync(QUESTION_TYPE, questionType);
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  getQuestionType = () => {
    try {
      return getCacheSync(QUESTION_TYPE);
    } catch (error) {
      return '';
    }
  };
  checkState = async () => {
    const dispatchData =
      (await this.mxClient.getAccountData({ type: 'm.modular.swan.dispatch' })) ||
      {};
    if (!dispatchData.event) return;
    let { dispatchState, dispatchRoomId, orderId } =
      typeof dispatchData.event.content === 'string'
        ? JSON.parse(dispatchData.event.content)
        : dispatchData.event.content;

    const data = await this.mxClient.getDispatchState({ orderId });
    if (!data) return;
    if (data.dispatchState === dispatchState) return;

    this.mxClient.reSendDispatchState({
      orderId,
      fcid: data.retailId,
      accountDataState: {
        acceptRoomId: data.acceptRoomId,
        dispatchRoomId,
        dispatchState: data.dispatchState,
        from: data.from,
        orderId,
        questionType: '',
        staffId: data.staffId,
        pattern: data.pattern,
      },
      roomState: {
        acceptRoomId: data.acceptRoomId,
        dispatchState: data.dispatchState,
        filter: 'END',
        orderId,
      },
    });
  };

  close = () => {
    const { dispatchState } = this.dispatchData;
    if (dispatchState === DispatchState.dispatching) return;
    this.updateDispatchState({
      dispatchState: DispatchState.close,
      questionType: '',
    });
  };

  selectQuestionType = questionType => {
    const { dispatchState } = this.dispatchData;
    if (dispatchState !== DispatchState.close) return;
    this.updateDispatchState({
      dispatchState: DispatchState.selected,
      questionType,
    });
  };

  onUpdate(callBack) {
    // make sure every call only register once
    this.eventCenter.off(DISPATCH_STATE_UPDATE, callBack);
    this.eventCenter.on(DISPATCH_STATE_UPDATE, callBack);
  }

  offUpdate(callBack) {
    this.eventCenter.off(DISPATCH_STATE_UPDATE, callBack);
  }

  getState() {
    return this.dispatchData;
  }
}