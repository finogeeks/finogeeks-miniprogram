import DispatchModule from './modules/dispatch';
import RoomModule from './modules/room';
import UserModule from './modules/user';
import TimelineModule from './modules/timeline';
import { ModuleOpts } from './interface/module';
import sdk from '@finogeeks/finchat-js-sdk-miniprogram';
// import sdk from '@finogeeks/matrix-js-sdk-miniprogram';
// const sdk = require('@finogeeks/matrix-js-sdk-miniprogram');
import IMStore from './stores';
import { getCacheSync } from '@/utils/store';
import request from './utils/request';
import { getExtInfo } from '@/utils/ext';
import wxRouter from '@/router/index';
import { NAV_PAGES } from '@/constants/navigation';
import authModel from '@/model/auth';
import Taro, { Events, eventCenter } from '@tarojs/taro';
import { stopJwtRefresh } from '@/utils/refreshjwt';



class Matrix {
  room: RoomModule
  dispatch:DispatchModule
  user:UserModule
  timeline:TimelineModule
  ready: boolean = false;
  store: IMStore
  mxClient: any
  baseUrl: string = getExtInfo().BASE_URL
  myUserId: string;
  // sdk = sdk

  start:() => Promise<boolean> = () => 
   new Promise(async resolve => {
    const localConfig = getCacheSync('userSession');
    if (!localConfig) {
      console.log('need auth first');
      resolve(false)
    }
    this.myUserId = localConfig.userId;
    this.mxClient = sdk.createClient({
      baseUrl: this.baseUrl,
      accessToken: localConfig.accessToken,
      userId: localConfig.userId,
      deviceId: localConfig.deviceId,
      timelineSupport: true,
      request: request, // if undefined, use default request in matrix-js-sdk
    });
    this.store = new IMStore();
    const opts:ModuleOpts = {
      baseUrl: this.baseUrl,
      accessToken: localConfig.accessToken,
      userId: localConfig.userId,
      deviceId: localConfig.deviceId,
      jwt: localConfig.jwt,
      store: this.store,
    } 
    this.mxClient.on("sync", async (state, prevState, data) =>{
      switch (state) {
        case "ERROR":
          // update UI to say "Connection Lost"
          // console.log('SYNC ERROR');
          // console.log(data);
          if (data.error.statusCode === 401) {
            stopJwtRefresh();
            // this.stop();
            await authModel.clearAuth();
            // wxRouter.redirectTo(NAV_PAGES.LOGIN);
            Taro.reLaunch({
              url: NAV_PAGES.LOGIN
            });
            console.log('当前token已失效,请重新登录    sync');
            Taro.showToast({ title: '当前token已失效,请重新登录', icon: 'none' });
          }
          break;
        case "SYNCING":
          // update UI to remove any "Connection Lost" message
          break;
        case "PREPARED":
          console.log('PREPARED');
          // console.log(data);
          // // the client instance is ready to be queried.
          await this.init(opts)
          this.ready = true;
          resolve(true)
          // setTimeout(() => {
          //   resolve(true)
          // }, 4000);
          break;
        default: break;
      }
    });
    this.mxClient.startClient({
      debug: false,
      pollTimeout: 30000,
      initialSyncLimit: 20,
    });
  })

  stop() {
    this.mxClient.stopClient();
    this.mxClient = null;
    this.room = null;
    this.dispatch = null;
    this.user = null;
    this.timeline = null;
    this.store = null;
    this.ready = false;
  }

  reStart() {
    this.stop();
    this.start();
  }

  private init(opts:ModuleOpts) {
    // 因 Room 对象依赖 User 对象，故此处最好先初始化User对象；
    this.user = new UserModule(this.mxClient, opts);
    this.room = new RoomModule(this.mxClient, opts);
    this.dispatch = new DispatchModule(this.mxClient, opts);
    this.timeline = new TimelineModule(this.mxClient, opts);
    this.ready = true;
  }
}

const matrix = new Matrix();

export default matrix;