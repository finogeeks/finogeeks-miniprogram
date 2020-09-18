import { EventEmitter } from 'fbemitter';
// import { setCacheSync, getCacheSync, removeCacheSync } from './utils/local-store';
import { isObject } from './utils/type';
import isEqual from './utils/is-equal';

const eventBus = new EventEmitter();

class CombineStore {
  constructor(template) {
    this.state = {};
    this.__init(template);
  }

  __init(template) {
    if (!isObject(template)) {
      throw new Error('模板格式不正确');
    }
    Object.entries(template).forEach(item => {
      const [key, val] = item;
      let value = val;
      Object.defineProperty(this.state, key, {
        get() {
          return value
        },
        set(newVal) {
          if (isEqual(value, newVal)) {
            console.log('commit save Value');
          }
          const oldVal = value;
          value = newVal;
          console.log(`EMIT: $combie-store-${key}`, newVal);
          eventBus.emit(`$combie-store-${key}`, newVal, oldVal)
        }
      })
    })
  }
  /**
   * 更新 state
   * @param {string} key 
   * @param {*} value 
   */
  commit(key, value) {
    if (!this.state[key]) {
      throw new Error(`【${key}】未在模板中定义，请先在模板中定以后使用`);
    }
    this.state[key] = value;
  }

  /**
   * 订阅 state 变化
   * @param {string} key 
   * @param {function} cb 
   * @return {object} token: token.remove()
   */
  subscribe(key, cb) {
    return eventBus.addListener(`$combie-store-${key}`, cb);
  }

  getState() {
    return this.state;
  }

}

// const cStore = new CombineStore()

export default CombineStore