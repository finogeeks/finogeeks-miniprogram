import { request, } from '../utils/http-client';
import Taro from '@tarojs/taro';
import { getExtInfo } from '../utils/ext';
import { getCacheSync, setCacheSync, removeCacheSync } from '../utils/store';
import authModel from '@/model/auth';

export const login = async (code, diviceId, userName, userPassWord, systeminfo) => {
  const accountInfo = Taro.getAccountInfoSync();
  const display_name = {
    loginTime: new Date().getTime(),
    system: systeminfo.system + ' - 小程序',
    clientType: '',
    deviceName: '微信小程序',
    version: accountInfo.miniProgram.version || 'dev',
  }
  const response = await request({
    url: '/api/v1/registry/login',
    method: 'POST',
    data: {
      userId: userName,
      password: userPassWord,
      app_type: 'STAFF',
      login_type: 'pwd',
      display_name: JSON.stringify(display_name),
      device_type: 'mini',
      device_id: diviceId,
    },
    needAuth: false,
  })
  return { ...response.data, jwt: response.header.Authorization };
};

export const wxlogin = async (nick_name, avatar, code, encrypted_data, iv, systeminfo, diviceId) => {
  const display_name = {
    loginTime: new Date().getTime(),
    system: systeminfo.system+' - 小程序',
    clientType: '',
    deviceName: systeminfo.inFinChat ? 'fcuser' : nick_name,
  }
  const response = await request({
    url: '/api/v1/registry/login',
    method: 'POST',
    data: {
      app_type: 'STAFF',
      login_type: 'code',
      nick_name,
      avatar,
      code,
      encrypted_data,
      iv,
      display_name: JSON.stringify(display_name),
      device_type: 'mini',
      device_id: diviceId,
    },
    needAuth: false,
  })
  return { ...response.data, jwt: response.header.Authorization };
};


export const getAccount = async fcid => {
  // const response = await request({
  //   url: `/api/v1/uac/${fcid}/accounts`,
  //   method: 'GET',
  // });
  // return response.data.accounts;
  return {};
};

export const bindAccount = async ({ prev, accountId, accountData }) => {

  const response = await request({
    url: `/api/v1/uac/bind`,
    method: 'PUT',
    data: {
      prev,
      accountId,
      accountType: 'icbc',
      accountData,
    },
  });
  return response;
};

export const updateSwan = async ({ retailId, name, avatar, gender, region, accountData }) => {

  // const response = await request({
  //   url: `/api/v1/swan/retail/${retailId}`,
  //   method: 'PUT',
  //   data: {
  //     retailId,
  //     name,
  //     avatar,
  //     gender, 
  //     region,
  //     accountData
  //   },
  // });
  // return response.data;
  return {};
};

export const getSwanInfo = async ({ fcid }) => {
  // console.log('getSwanInfogetSwanInfogetSwanInfogetSwanInfo');
  // const response = await request({
  //   url: `/api/v1/swan/retail/${fcid}`,
  //   method: 'GET',
  // });
  // return response.data;
  return {};
};

export const whoami = async () => {
  const response = await request({
    url: `/_matrix/client/r0/account/whoami`,
    method: 'GET',
    needToken: true,
    needAuth: false,
  });
  return response;
};
