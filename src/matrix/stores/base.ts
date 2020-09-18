// import eventCenter from '@/utils/events';
import { Events } from '@tarojs/taro';
import isEqual from '@/utils/lodash-local/is-equal';
import cloneDeep from '@/utils/lodash-local/clone-deep';
import { Action, OptParams, StoreUpdateEvent, StoreContainer } from '../interface/store';
// import { getType, TYPES, isFunction } from '@/utils/type.js';

interface StoreItem {
  id: string
}

interface OprationStore<T> {
  [x:string]: {
    type: Action
    params: OptParams<T>
  }
}

export default abstract class BaseStore<T extends StoreItem> {

  protected store: StoreContainer<T> = {}
  eventCenter = new Events();
  private updateEventName: string = ''
  // private eventQueue: StoreUpdateEvent<T>[] = [];
  private oprationMap: OprationStore<T> = {}
  private emitTimer: any;

  constructor(name:string) {
    this.updateEventName = `STORE_${name}_UPDATE`;
  }

  add(id:string, item:T): boolean {
    return this.pushOpration(Action.ADD, { id, item });
  }

  delete(id:string): boolean {
    return this.pushOpration(Action.DELETE, { id });
  }

  update(id:string, item:T): boolean {
    return this.pushOpration(Action.UPDATE, {id, item});
  }

  put(id:string, item:T): boolean {
    return this.pushOpration(Action.PUT, { id, item });
  }

  get(id: string):T {
    if(!this.store[id]) return null;
    return this.store[id];
  }

  getAll(): T[] {
    return Object.values(this.store);
  }

  private opration(action:Action, params: OptParams<T>) {
    const { id , item } = params;
    let actionRes = false;
    const originItem = this.store[id];
    switch (action) {
      case Action.ADD:
        if (!this.store[id]) break;
        this.store[id] = item;
        actionRes = true;
        break;
      case Action.UPDATE:
        if (!this.store[id]) break;
        if (isEqual(this.store[id], item)) break;
        this.store[id] = item;
        actionRes = true;
        break;
      case Action.PUT:
        if (isEqual(this.store[id], item)) break;
        this.store[id] = item;
        actionRes = true;
        break;
      case Action.DELETE:
        if (!this.store[id]) break;
        delete this.store[id];
        actionRes = true;
        break;
    }

    if (actionRes) {
      const event:StoreUpdateEvent<T> = {
        type: action,
        id,
        item,
        prevItem: originItem,
      }
      this.beforeEmitUpdate(event)
      // this.pushEventToQueue(event);
      this.eventCenter.trigger(this.updateEventName, event)
    }
    return actionRes;
  }

  onUpdate(callBack:(event: StoreUpdateEvent<T>) => any) {
    this.eventCenter.on(this.updateEventName, callBack);
  }

  offUpdate(callBack:(event: StoreUpdateEvent<T>) => any) {
    this.eventCenter.off(this.updateEventName, callBack);
  }

  abstract beforeEmitUpdate(event: StoreUpdateEvent<T>):void
  
  private pushOpration = (action:Action, params: OptParams<T>) => {
    this.oprationMap[params.id] = {
      type: action,
      params,
    }
    if (this.emitTimer) {
      clearTimeout(this.emitTimer)
    }
    // 模拟debounce 50
    this.emitTimer = setTimeout(() => {
      this.processOprationQueue()
    }, 50)
    return true;
  }

  private processOprationQueue = () => {
    Object.values(this.oprationMap).forEach(op => {
      this.opration(op.type, op.params)
    })
    this.oprationMap = {};
  }
}
