/*
 * @Author: yiwenqi
 * @Date: 2019-08-08 09:25:59
 * @LastEditTime: 2019-08-11 15:23:38
 * @LastEditors: yiwenqi
 * @Description:
 */
import Taro, { eventCenter }from '@tarojs/taro';
import isEqual from '@/utils/lodash-local/is-equal';
import QueryString from 'qs';
import { getCacheSync, setCacheSync, removeCacheSync } from '../utils/store';
import { setUserLocaton, setUserInfo, setUserSession } from '../store/actions/user';
import store from '../store';
import service from '../service';
import { UserSession, UserInfo, WxUserInfo } from './interface';
// import matrix from '@/matrix';
import { startJwtRefresh } from '@/utils/refreshjwt';

console.log('isEqual', isEqual([], []));

class Auth {
  userSession: UserSession
  userInfo: UserInfo
  wxUserInfo: WxUserInfo
  isAuth: boolean = false;
  authReadyCallback: any;
  authReadyResolve: any;
  constructor() {
    this.userSession = getCacheSync('userSession') || null;
    this.userInfo = getCacheSync('userInfo') || null;
    this.wxUserInfo = getCacheSync('wxUserInfo') || null;
    if(this.userSession &&  this.userInfo) {
      store.dispatch(setUserSession(this.userSession));
      store.dispatch(setUserInfo(this.userInfo));
    }
    
  }

  wxlogin = async (nick_name, avatar, code, encrypted_data, iv) => {
    const systeminfo = Taro.getSystemInfoSync();
    // console.log('~~~~~~~~systeminfo~~~~~~~~', systeminfo);
    // let loginRes = { code: '' };
    // loginRes = await Taro.login();
    const wxUserDetail = await Taro.getUserInfo({ withCredentials: true, lang: 'zh_CN' });
    this.wxUserInfo = wxUserDetail.userInfo;
    // const { iv, encryptedData } = wxUserDetail;
    const diviceId = `mini-${Date.now()}`;
    const authRes = await service.user.wxlogin(
      nick_name, avatar, code, encrypted_data, iv, systeminfo, diviceId
    );
    this.userSession = {
      accessToken: authRes.access_token,
      jwt: authRes.jwt,
      userId: authRes.user_id,
      homeServer: authRes.home_server,
      deviceId: authRes.device_id,
      accountType: authRes.payload.accountType,
      accountId: authRes.payload.accountId,
      openId: authRes.payload.openId,
      unionId: authRes.payload.unionId,
      refresh_token: authRes.refresh_token,
      expires_in: authRes.expires_in,
      appType: 'RETAIL',
    };
    service.setAuth({
      accessToken: this.userSession.accessToken,
      jwt: this.userSession.jwt,
      userId: this.userSession.userId,
    });
    // await this.syncUserInfo();
    
    setCacheSync('userSession', this.userSession);
    setCacheSync('wxUserInfo', this.wxUserInfo);
    
    // store.dispatch(setUserSession(this.__userSession));
    this.isAuth = true;

    startJwtRefresh();

    return this.userSession;
  };

  login = async (userName, userPassWord) => {
    const systeminfo = Taro.getSystemInfoSync();
    console.log('~~~~~~~~systeminfo~~~~~~~~', systeminfo);
    let loginRes = { code: '' };
    if (!systeminfo.inFinChat) {
      loginRes = await Taro.login();
      const wxUserDetail = await Taro.getUserInfo({ withCredentials: true, lang: 'zh_CN' });
      this.wxUserInfo = wxUserDetail.userInfo;
    }
    // const { iv, encryptedData } = wxUserDetail;
    const diviceId = `mini-${Date.now()}`;
    const authRes = await service.user.login(
      loginRes.code,
      diviceId,
      userName,
      userPassWord,
      systeminfo
    );
    this.userSession = {
      accessToken: authRes.access_token,
      jwt: authRes.jwt,
      userId: authRes.user_id,
      homeServer: authRes.home_server,
      deviceId: authRes.device_id,
      accountType: authRes.payload.accountType,
      accountId: authRes.payload.accountId,
      openId: authRes.payload.openId,
      unionId: authRes.payload.unionId,
      refresh_token: authRes.refresh_token,
      expires_in: authRes.expires_in,
      appType: 'RETAIL',
    };
    service.setAuth({
      accessToken: this.userSession.accessToken,
      jwt: this.userSession.jwt,
      userId: this.userSession.userId,
    });
    // await this.syncUserInfo();
    
    setCacheSync('userSession', this.userSession);
    setCacheSync('wxUserInfo', this.wxUserInfo);
    
    // store.dispatch(setUserSession(this.__userSession));
    this.isAuth = true;

    startJwtRefresh();

    return this.userSession;
  };

  checkAuth = async ({ checkJwt = true , checkAuth = true } = {}) =>{
    if (this.isAuth) return true;
    if(!this.userSession) return false;
    if(!service.isAuth) {
      service.setAuth({
        accessToken: this.userSession.accessToken,
        jwt: this.userSession.jwt,
        userId: this.userSession.userId,
      });
    }
    try {
      const [jwtRes, tokenRes]= await Promise.all([
        checkJwt ? service.common.checkJwt() : { statusCode: 200 },
        checkAuth? service.user.whoami() : { statusCode: 200 },
      ]);
      if (jwtRes.statusCode !== 200 || tokenRes.statusCode !== 200 ) return false;
    } catch (error) {
      return false
    }
    this.isAuth = true;
    return true;
  }

  clearAuth() {
    this.isAuth = false;
    this.userSession = null;
    this.userInfo = null;
    this.wxUserInfo = null;

    if(store.getState().user.info) {
      store.dispatch(setUserInfo(this.userInfo));
    }
    if(store.getState().user.session) {
      store.dispatch(setUserSession(this.userSession));
    }

    removeCacheSync('userSession');
    removeCacheSync('userInfo');
    removeCacheSync('wxUserInfo');
  }

  // 获取用户当前激活的账户
  // 若存在 icbc 账户则优先返回 icbc，否则返回 weixin 账户
  private getCurAccount = async fcid => {
    if (!fcid) {
      return null;
    }
    try {
      const accounts = await service.user.getAccount(fcid);
      const searchIndex = accounts.findIndex(
        account => account.accountType === 'icbc',
      );
      if (searchIndex > -1) {
        return accounts[searchIndex];
      } else {
        return accounts.find(account => account.accountType === 'weixin');
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  getUserPosition = async () => {
    try {
      const wxPosition = await Taro.getLocation();
      const { longitude, latitude } = wxPosition;
      const position = await service.common.getPosition(longitude, latitude);
      store.dispatch(
        setUserLocaton({
          longitude,
          latitude,
          ...position,
        }),
      );
    } catch (error) {}
  };

  // syncUserInfo = async ({ reSync = false } = {}) => {
  //   // const me = matrix.user.getUser(this.userSession.userId);
  //   // if(!me.name || 
  //   //   me.name === me.id || 
  //   //   me.name !== this.wxUserInfo.nickName) {
  //   //   matrix.user.setDisplayName(this.wxUserInfo.nickName);
  //   // }

  //   // if (!me.avatar || me.avatar !== this.wxUserInfo.avatarUrl) {
  //   //   matrix.user.setAvatarUrl(this.wxUserInfo.avatarUrl);
  //   // }

  //   if (!this.userInfo || reSync ) {
  //     // const account = (await this.getCurAccount(this.userSession.userId)) || {};
  //     // const swanInfo = await service.user.getSwanInfo({ fcid: this.userSession.userId });
  //     const thisUser = await matrix.user.getUser(this.userSession.userId)
  //     console.log('~~~~~~~~~~~authmodel syncUserInfo thisUser~~~~~~~~~~~', thisUser);
  //     const userInfo = { ...thisUser };
  //     setCacheSync('userInfo', userInfo);
  //     store.dispatch(setUserInfo(userInfo));
  //     this.userInfo = userInfo;
  //   }
  // }

  triggerAuthCompelte = () => {
    const { eventBus } = Taro.getApp().globalData;
    eventBus.emit('AUTH_READY', this.isAuth);
    this.authReadyResolve && this.authReadyResolve(this.isAuth);
  }

  goToAuthPage = () => {
    return new Promise((resolve) => {
      const query = {
        type: 'AUTH',
      };
      const authPageUrl = `/pages/login/index`;
      Taro.navigateTo({
        url: `${authPageUrl}?${QueryString.stringify(query)}`,
      });
      this.authReadyResolve = resolve
    });
  };

  getUserInfo = () => {
    return this.userInfo;
  };

  getUserSession = () => {
    return this.userSession;
  };

  reFreshUserInfo = async () => {
    await this.syncUserInfo({ reSync:true });
  };
}

const authModel = new Auth();

export default authModel;
