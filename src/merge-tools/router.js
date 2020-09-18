import promisifyWx from './utils/promisifyWx';
import formateParams from './utils/formate-params';
import compose from './utils/compose';
import { isObject } from './utils/type';


const routerHandler = (routerFunc) => async (url, query) => {
  const formateUrl = formateParams(url, query);
  try {
    const res = await routerFunc({ url: formateUrl });
    console.log(`combine router success: `, res);
  } catch (error) {
    console.log('[MOCK] route to path: ', formateUrl);
  }
}

const switchTab = compose(routerHandler, promisifyWx)(wx.switchTab)
const navigateTo = compose(routerHandler, promisifyWx)(wx.navigateTo)
const redirectTo = compose(routerHandler, promisifyWx)(wx.redirectTo)
const navigateBack = compose(routerHandler, promisifyWx)(wx.switchTab)
const reLaunch = compose(routerHandler, promisifyWx)(wx.reLaunch)


class CombineRouter {
  /**
   * 构造函数
   * @param {*} routerConfig { HOME: '/pages/home/index'}
   */
  constructor(routerConfig) {
    if (!isObject(routerConfig)) {
      throw new Error('routerConfig must be Object');
    }
    this.__routerConfig = routerConfig;
    this.__extras = {}
  }

  switchTab({ name, path, query, extra }) {
    if (!this.__checkValidPath(name, path)) return;
    const url = this.__routerConfig[name] || path;
    if (extra) {
      this.__saveExtraData({ name, path, extra });
    }
    switchTab(url, query);
  }

  navigateTo({ name, path, query, extra }) {
    if (!this.__checkValidPath(name, path)) return;
    const url = this.__routerConfig[name] || path;
    if (extra) {
      this.__saveExtraData({ name, path, extra });
    }
    navigateTo(url, query);
  }  

  redirectTo({ name, path, query, extra }) {
    if (!this.__checkValidPath(name, path)) return;
    if (extra) {
      this.__saveExtraData({ name, path, extra });
    }
    const url = this.__routerConfig[name] || path;
    redirectTo(url, query);
  }

  navigateBack(delta) {
    navigateBack(delta);
  }

  reLaunch({ name, path, query, extra }) {
    if (!this.__checkValidPath(name, path)) return;
    if (extra) {
      this.__saveExtraData({ name, path, extra });
    }
    const url = this.__routerConfig[name] || path;
    reLaunch(url, query)
  }

  getExtra({ name, path }) {
    let curName = name;
    if (!curName) {
      curName = this.__getNameFromPath(path)
    }
    const extra = this.__extras[curName] ? { ...this.__extras[curName]} : {}
    delete this.__extras[curName];
    return extra;
  }

  __saveExtraData({ name, path, extra }) {
    let curName = name;
    if (!curName) {
      curName = this.__getNameFromPath(path)
    }
    this.__extras[curName] = extra;
  }

  __getNameFromPath(path) {
    let name = '';
    if (!name) {
      Object.entries(this.__routerConfig).forEach(keyValuePair => {
        if (keyValuePair.includes(path) && !name)  {
          name = keyValuePair[0];
        }
      })    
    }
    return name;
  }

  __checkValidPath(name, path) {
    let isValid = false;
    if (name && path) {
      isValid =  !!this.__routerConfig[name] && this.__routerConfig[name] === path;
    } else {
      isValid = !!this.__routerConfig[name] || Object.values(this.__routerConfig).includes(path);
    }
    if (!isValid) {
      console.error('[CROUTE]: Error, invalid name or path');
    }

    return isValid;
  }
}


export default CombineRouter;