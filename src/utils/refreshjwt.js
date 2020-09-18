
// import emitter from '@/utils/event-emitter';
// import IAM from '@/model/iam';
// import axios from 'axios';
// import Vue from 'vue'
// import store from './store'
// const testHostnameList = ['localhost','finchat-dev.finogeeks.club'];
// const showSingUpHostname = ['localhost','finchat-dev.finogeeks.club', 'chat.finogeeks.com'];
// const hostname = window.location.hostname;
// const isDev = testHostnameList.indexOf(hostname) > -1;
// const overDueTime = (IAM.getInfo() && IAM.getInfo().expires_in) || (testHostnameList.indexOf(hostname) > -1 ? 120 : 7200);
// const body = document.querySelector('html');
// let userMonitor;
import { setCacheSync, getCacheSync } from '@/utils/store'
import { request, refresh } from '@/utils/http-client'
import Taro, { Events, eventCenter } from '@tarojs/taro';
import { NAV_PAGES } from '@/constants/navigation';
import authModel from '@/model/auth';

let overDueTime = (getCacheSync('userSession').expires_in || 150)*0.7*1000;
console.log('jwtRefresh ~~~ ', overDueTime);
let jwtRefresher;
// function monitorUserOperate() {
//     clearTimeout(userMonitor)
//     userMonitor = setTimeout(() => {
//         emitter.emit('TOKEN_INVALID');
//     }, overDueTime*1000);
// }
async function refreshjwt() {
    // await authModel.clearAuth();
    // console.log('refresh_token', err);
    // Taro.reLaunch({
    //     url: NAV_PAGES.LOGIN
    // });
    // console.log('当前token已失效,请重新登录    refreshjwt');
    // Taro.showToast({ title: '当前token已失效,请重新登录', icon: 'none' });
    const oldinfo = getCacheSync('userSession');
    console.log('~~~~~~refreshjwt~~~~~~~~`', oldinfo);
    // console.log(wx.getStorageSync('userSession'));
    // wx.getStorage({
    //     key: 'userSession',
    //     success (res) {
    //         console.log('~~~~~~refreshjwt  getStorage~~~~~~~~`', res.data)
    //     }
    // })
    request({
        url: `/api/v1/registry/token`,
        method: 'post',
        // needAuth: true,
        data: {
            user_id: oldinfo.userId,
            refresh_token: oldinfo.refresh_token,
            grant_type: 'refresh_token'
        }
    }).then(res => {
        console.log('refresh token res : ', res);
        const newinfo = Object.assign(oldinfo, res.data, {
            jwt: res.data.jwt_token
        })
        setCacheSync('userSession', newinfo);
        refresh(res.data.jwt_token);
    }).catch(async err => {
        stopJwtRefresh()
        await authModel.clearAuth();
        console.log('refresh_token', err);
        Taro.reLaunch({
            url: NAV_PAGES.LOGIN
        });
        Taro.showToast({ title: '当前token已失效,请重新登录', icon: 'none' });
        // await authModel.clearAuth();
        // Taro.reLaunch({
        //     url: NAV_PAGES.LOGIN
        // });
        Taro.showToast({ title: '当前token已失效,请重新登录', icon: 'none' });
    });
    // const jwtinfo = IAM.getInfo();
    // axios.post('/api/v1/registry/token', {
    //     user_id: jwtinfo.user_id,
    //     refresh_token: jwtinfo.refresh_token,
    //     grant_type: 'refresh_token'
    // })
    // .then(res => {
    //     console.log('refresh_token', res);
    //     const newjwtinfo = Object.assign(jwtinfo, res.data, {jwt: res.headers.authorization});
    //     IAM.setInfo(newjwtinfo);
    //     Vue.prototype.$fcNetdisk.init(
    //         '', 
    //         newjwtinfo.userId,
    //         newjwtinfo.jwt,
    //         newjwtinfo.access_token,
    //     );
    // })
    // .catch(err => {
    //     console.log('refresh_token', err);
    //     emitter.emit('TOKEN_INVALID');
    // })
}
async function startJwtRefresh() {
    // refreshjwt();
    // console.log('startJwtRefresh');
    // body.addEventListener("click",monitorUserOperate);
    // body.addEventListener("keydown",monitorUserOperate);
    // body.addEventListener("mousemove",monitorUserOperate);
    // body.addEventListener("mousewheel",monitorUserOperate);
    // userMonitor = setTimeout(() => {
    //     console.log('长时间未操作');
    //     emitter.emit('TOKEN_INVALID');
    // }, overDueTime*1000);
    console.log('startJwtRefresh overDueTime  ', overDueTime);
    jwtRefresher = setInterval(refreshjwt, overDueTime)
    // jwtRefresher = setTimeout(refreshjwt, overDueTime)
}
function stopJwtRefresh() {
    console.log('stopJwtRefresh');
    // store.commit('setShowLoadingMask', false);
    // body.removeEventListener("click",monitorUserOperate);
    // body.removeEventListener("keydown",monitorUserOperate);
    // body.removeEventListener("mousemove",monitorUserOperate);
    // body.removeEventListener("mousewheel",monitorUserOperate);
    // clearTimeout(userMonitor)
    clearInterval(jwtRefresher);
}
export {
    startJwtRefresh,
    stopJwtRefresh
}