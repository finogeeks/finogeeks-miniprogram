import Taro from '@tarojs/taro';
import { Base64 } from 'js-base64';
import { getCacheSync, setCache } from './store';
import { fetch } from './fetch';
import wxRouter from '@/router';
import imModel from '@/model/im';

let localBase64Meta = null;

const getHttpParams = () => {
  const { jwt, accessToken, userId } = getCacheSync('userSession');
  return { jwt, accessToken, userId };
};

async function request(data, auth = true) {
  if (auth) {
    data.header = data.header || {};
    const basic = getHttpParams();
    const channelId = Taro.getStorageSync('__channelId__') || '';
    if (!localBase64Meta && basic.userId) {
      const domain = basic.userId.substring(basic.userId.indexOf(':') + 1);
      const userMeta = {
        appType: 'RETAIL',
        terminal: 'wxapplet',
        plaform: 'ios',
        domain,
      };
      localBase64Meta = Base64.encode(JSON.stringify(userMeta));
    }

    data.header = {
      ...data.header,
      // 'Authorization': `Bearer ${basic.jwt}`,
      'X-Consumer-Custom-ID': basic.userId,
      'X-Consumer-User-Meta': localBase64Meta,
      'X-Consumer-User-Channel': channelId,
    };
  }
  const response = await fetch(data);
  return response.data;
}

export const wechatAuth = async (code, diviceId, iv, encryptedData, userName, userPassWord) => {
  const response = await fetch({
    url: '/api/v1/registry/login',
    method: 'POST',
    header: {
      'content-type': 'application/json',
    },
    data: {
      userId: userName,
      password: userPassWord,
      app_type: 'STAFF',
      login_type: 'pwd',
    },
  });
  return { ...response.data, jwt: response.header.Authorization };
};

export const getAccount = async fcid => {
  const basic = getHttpParams();
  const response = await request({
    url: `/api/v1/uac/${fcid}/accounts?access_token=${basic.accessToken}&jwt=${basic.jwt}`,
    method: 'GET',
    header: {
      'content-type': 'application/json',
    },
  });
  return response.accounts;
};

export const bindAccount = async ({ prev, accountId, accountData }) => {
  const basic = getHttpParams();
  const response = await request({
    url: `/api/v1/uac/bind?access_token=${basic.accessToken}&jwt=${basic.jwt}`,
    method: 'PUT',
    header: {
      'content-type': 'application/json',
    },
    data: {
      prev,
      accountId,
      accountType: 'icbc',
      accountData,
    },
  });
  return response;
};

export const updateSwan = async ({ retailId, name, avatar }) => {
  const basic = getHttpParams();
  const response = await request({
    url: `/api/v1/swan/retail/${retailId}?access_token=${basic.accessToken}&jwt=${basic.jwt}`,
    method: 'PUT',
    header: {
      'content-type': 'application/json',
    },
    data: {
      retailId,
      name,
      avatar,
    },
  });
  return response;
};

export const getSwanInfo = async ({ fcid }) => {
  const basic = getHttpParams();
  const response = await request({
    url: `/api/v1/swan/retail/${fcid}?access_token=${basic.accessToken}&jwt=${basic.jwt}`,
    method: 'GET',
    header: {
      'content-type': 'application/json',
    },
  });
  return response;
};

export const sendSmsCode = async phone => {
  const basic = getHttpParams();
  const response = await request({
    url: `/api/v1/platform/sms?access_token=${basic.accessToken}&jwt=${basic.jwt}`,
    method: 'POST',
    header: {
      'content-type': 'application/json',
    },
    data: {
      phone,
    },
  });
  return response;
};

export const getGeoInfo = async (lat, lng) => {
  const response = await request({
    url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${lat},${lng}&key=KHNBZ-JSAWP-DPSD4-LUCLI-HUQRK-L7BO2`,
    method: 'GET',
    header: {
      'content-type': 'application/json',
    },
  });
  return response;
};

export const getActivityDaily = async () =>
  request({
    url: `/api/v1/lottery/activityDaily?from=WECHAT`,
  });

export const shareActivityDaily = async () =>
  request({
    url: `/api/v1/lottery/activityDaily/share?from=WECHAT`,
    method: 'POST',
  });

export const countBinding = async () =>
  request({
    url: '/api/v1/lottery/activityDaily/wechatBind?from=WECHAT',
    method: 'POST',
  });

export const getSceneData = async sceneId => {
  const basic = getHttpParams();
  const response = await request({
    url: `/api/v1/wechat-service/wxa/share/${sceneId}?access_token=${basic.accessToken}&jwt=${basic.jwt}`,
    method: 'GET',
    header: {
      'content-type': 'application/json',
    },
  });
  return response;
};

export const joinRoom = async (roomId, user_id, qrcode) => {
  const basic = getHttpParams();
  return request({
    url: `/api/v1/channel/rooms/${roomId}/privateJoin?access_token=${basic.accessToken}&jwt=${basic.jwt}`,
    method: 'POST',
    data: {
      user_id: basic.userId,
      // qrcode: true,
    },
    // needToken: true,
    header: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${basic.jwt}`,
    },
  });
};

export const inviteAndJoin = async (roomId, user_id, qrcode) => {
  const basic = getHttpParams();
  return request({
    url: `/api/v1/channel/rooms/${roomId}/inviteAndJoin?access_token=${basic.accessToken}&jwt=${basic.jwt}`,
    method: 'POST',
    data: {
      user_id: user_id,
      qrcode: true,
    },
    header: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${basic.jwt}`,
    },
  });
};

export const logout = async () => {
  const basic = getHttpParams();
  await request({
    method: 'POST',
    url: `/api/v1/registry/homeserver/logout?access_token=${basic.accessToken}&jwt=${basic.jwt}`,
    data: {
      access_token: basic.accessToken,
    },
    header: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${basic.jwt}`,
    },
  });
}

export const reportFormId = async (roomId, msgType, formId, openId) => {
  const basic = getHttpParams();
  return request({
    url: `/api/v1/swan/observe/orders/wechatForm?access_token=${basic.accessToken}&jwt=${basic.jwt}`,
    method: 'POST',
    data: {
      fcid: basic.userId,
      msgType,
      roomId,
      formId,
      openId,
      appletType: 'SWAN_IM',
    },
  });
};

export const reportPresence = async (fcid, isOnline, accessToken, jwt) => {
  const basic = getHttpParams();
  return request({
    url: `/api/v1/swan/observe/presence/${fcid}/status?access_token=${accessToken ||
      basic.accessToken}&jwt=${jwt || basic.jwt}`,
    method: 'PUT',
    data: {
      presence: isOnline ? 'online' : 'offline',
    },
  });
};

// 上报用户手机号加密数据
export const reportWxPhome = async ({ appId, code, encryptedData, iv }) => {
  const basic = getHttpParams();
  return request({
    url: `/api/v1/swan/retail/wxPhone?access_token=${basic.accessToken}&jwt=${basic.jwt}`,
    method: 'POST',
    data: {
      retailId: basic.userId,
      appId,
      code,
      encryptedData,
      iv,
    },
  });
};

/**
 * 获取热门投顾
 */
export const getSquareHotAdviser = async () => {
  const basic = getHttpParams();

  const response = await request({
    url: `/api/v1/adviserZone/square/adviser/hotspot?access_token=${basic.accessToken}&jwt=${basic.jwt}`,
    method: 'GET',
    header: {
      'content-type': 'application/json',
    },
  });
  return response;
};

/**
 * 广场热门观点列表
 */
export const getSquareHotTimeline = async ({ page, size }) => {
  const basic = getHttpParams();

  const response = await request({
    url: `/api/v1/adviserZone/square/timeline?access_token=${basic.accessToken}&jwt=${basic.jwt}`,
    method: 'GET',
    header: {
      'content-type': 'application/json',
    },
    data: { page, size },
  });
  return response;
};

/**
 * 广场关注观点列表
 */
export const getSquareFavoriteTimeline = async ({ page, size }) => {
  const basic = getHttpParams();

  const response = await request({
    url: `/api/v1/adviserZone/square/timeline/favorite?access_token=${basic.accessToken}&jwt=${basic.jwt}`,
    method: 'GET',
    header: {
      'content-type': 'application/json',
    },
    data: { page, size },
  });
  return response;
};

/**
 * 网盘预览文件
 * @param fcid
 * @returns {string}
 */
// export const netdiskThumb = (netdiskId, type = 'middle') => {
//   const baseURL = service.config.BASE_URL;
//   const basic = getHttpParams();
//   return `${baseURL}/api/v1/netdisk/thumbnail/${netdiskId}?jwt=${basic.jwt}&type=${type}`;
// };

/**
 * 网盘原文件
 * @param fcid
 * @returns {string}
 */
// export const netdiskDownload = netdiskId => {
//   const baseURL = service.config.BASE_URL;
//   const basic = getHttpParams();
//   return `${baseURL}/api/v1/netdisk/download/${netdiskId}?jwt=${basic.jwt}`;
// };

/**
 * 网盘视频流文件
 * @param fcid
 * @returns {string}
 */
// export const netdiskVideo = netdiskId => {
//   const baseURL = service.config.BASE_URL;
//   const basic = getHttpParams();
//   return `${baseURL}/api/v1/netdisk/download/${netdiskId}/qt?jwt=${basic.jwt}`;
// };

/**
 * 关注投顾
 * @param {*} adviserId
 */
export const addAttention = async adviserId => {
  const basic = getHttpParams();

  const response = await request({
    url: `/api/v1/adviserZone/a/${adviserId}/favorite?access_token=${basic.accessToken}&jwt=${basic.jwt}`,
    method: 'POST',
    header: {
      'content-type': 'application/json',
    },
  });
  return response;
};

/**
 * 取消关注
 * @param {*} adviserId
 */

export const cancelAttention = async adviserId => {
  const basic = getHttpParams();

  const response = await request({
    url: `/api/v1/adviserZone/a/${adviserId}/favorite?access_token=${basic.accessToken}&jwt=${basic.jwt}`,
    method: 'DELETE',
    header: {
      'content-type': 'application/json',
    },
  });
  return response;
};

/**
 * 点赞观点
 * @param timelineId
 * @returns {AxiosPromise}
 */

export const likeTweet = async timelineId => {
  const basic = getHttpParams();
  console.log('basic', basic);
  const response = await request({
    url: `/api/v1/adviserZone/timeline/${timelineId}/like?access_token=${basic.accessToken}&jwt=${basic.jwt}`,
    method: 'PUT',
    header: {
      'content-type': 'application/json',
    },
  });
  return response;
};

/**
 * 取消点赞
 * @param timelineId
 * @returns {AxiosPromise}
 */

export const unLikeTweet = async timelineId => {
  const basic = getHttpParams();
  const response = await request({
    url: `/api/v1/adviserZone/timeline/${timelineId}/unlike?access_token=${basic.accessToken}&jwt=${basic.jwt}`,
    method: 'PUT',
    header: {
      'content-type': 'application/json',
    },
  });
  return response;
};

/**
 * 获取位置信息
 * @param longitude
 * @param latitude
 * @returns {AxiosPromise}
 */

export const getPosition = async (longitude, latitude) => {
  const basic = getHttpParams();
  const response = await request({
    url: `/api/v1/swan/gearing/geocode/city?location=${longitude},${latitude}&access_token=${basic.accessToken}&jwt=${basic.jwt}`,
    method: 'GET',
  });
  return response;
};

/**
 * 获取已关注员工列表
 * @param payload
 * @returns {AxiosPromise}
 */
export const getSquareFavoriteAdviser = async () => {
  const basic = getHttpParams();
  const response = await request({
    url: `/api/v1/adviserZone/a/adviser/favorite/list?jwt=${basic.jwt}`,
    method: 'get',
  });
  return response;
};

/**
 * 获取产品列表信息
 * @param page
 * @param size
 * @param type
 * @returns {AxiosPromise}
 */

export const getProductList = async (type, page, size) => {
  const basic = getHttpParams();
  const response = await request({
    url: `/api/v1/adviserZone/product/list/manage?status=1&page=${page}&size=${size}&type=${type}&access_token=${basic.accessToken}&jwt=${basic.jwt}`,
    method: 'GET',
  });
  return response;
};

/**
 * 获取产品详情
 * @param productId
 * @returns {AxiosPromise}
 */

export const getProductDetail = async productId => {
  const basic = getHttpParams();
  const response = await request({
    url: `/api/v1/adviserZone/product/${productId}?&access_token=${basic.accessToken}&jwt=${basic.jwt}`,
    method: 'GET',
  });
  return response;
};

/**
 * 预约产品
 * @param productId
 * @returns {AxiosPromise}
 */

export const reserveProduct = async ({
  productId,
  staffId,
  name,
  mobile,
  city,
  company,
  annualIncome,
}) => {
  const basic = getHttpParams();
  const response = await request({
    url: `/api/v1/adviserZone/sales/booking?&access_token=${basic.accessToken}&jwt=${basic.jwt}`,
    method: 'POST',
    data: {
      productId,
      staffId,
      name,
      mobile,
      city,
      company,
      annualIncome,
    },
  });
  return response;
};

/**
 * 获取投顾信息
 * @param staffId
 * @returns {AxiosPromise}
 */

export const getAdvisorInfo = async staffId => {
  const basic = getHttpParams();
  const response = await request({
    url: `/api/v1/swan/manager/staff/${staffId}?&access_token=${basic.accessToken}&jwt=${basic.jwt}`,
    method: 'GET',
  });
  return response;
};

/**
 * 获取产品海报logo
 * @param staffId
 * @returns {AxiosPromise}
 */

export const getPosterLogo = async () => {
  const basic = getHttpParams();
  const response = await request({
    url: `/api/v1/adviserZone/poster/logo?&access_token=${basic.accessToken}&jwt=${basic.jwt}`,
    method: 'GET',
  });
  return response;
};

/**
 * 频道归档
 * @param roomId
 * @returns {AxiosPromise}
 */

export const archiveRoom = async (roomId) => {
  const basic = getHttpParams();
  const response = await request({
    url: `/api/v1/channel/rooms/${roomId}/archive?&access_token=${basic.accessToken}&jwt=${basic.jwt}`,
    method: 'POST',
  });
  Taro.navigateBack({ delta: 2 });
  return response;
};

/**
 * 解除一个频道归档
 * @param roomId
 * @returns {AxiosPromise}
 */

export const cancleArchiveRoom = async (roomId) => {
  const basic = getHttpParams();
  const response = await request({
    url: `/api/v1/channel/rooms/${roomId}/archive?&access_token=${basic.accessToken}&jwt=${basic.jwt}`,
    method: 'DELETE',
  });
  Taro.navigateBack({ delta: 1 });
  return response;
};

/**
 * 退出房间
 * @param roomId
 * @returns {AxiosPromise}
 */

export const quitRoom = async (roomId) => {
  const client = imModel.matrix;
  console.log(client);
  const res = await client.mxClient.leave(roomId);
  Taro.navigateBack({ delta: 2 });
  setTimeout(() => {
    Taro.showToast({
      title: `您已退出房间`,
      icon: 'none',
    });
  }, 0)
  return res;
};

/**
 * 获取当前用户信息
 * @param fcid  netdiskID
 * @returns {AxiosPromise}
 */

export const getMyInfo = async (fcid) => {
  const basic = getHttpParams();
  const response = await request({
    url: `/api/v1/fsc/users/${fcid}/profiles?myid=${fcid}`,
    method: 'POST',
  });
  return response;
};

export const getChannelDetail = (roomId) => {
  const basic = getHttpParams();
  return request({
    method: 'GET',
    // url: `/api/v1/channel/channels/${roomId}?jwt=${basic.jwt}&access_token=${basic.accessToken}`,
    url: `/api/v1/channel/channels/${roomId}?jwt=${basic.jwt}&access_token=${basic.accessToken}`,
  });
}

export default {
  wechatAuth,
  bindAccount,
  sendSmsCode,
  updateSwan,
  getSwanInfo,
  getGeoInfo,
  getActivityDaily,
  countBinding,
  getSceneData,
  joinRoom,
  inviteAndJoin,
  reportFormId,
  reportPresence,
  getSquareHotTimeline,
  getSquareFavoriteTimeline,
  getSquareHotAdviser,
  getSquareFavoriteAdviser,
//   netdiskThumb,
//   netdiskVideo,
//   netdiskDownload,
  addAttention,
  cancelAttention,
  likeTweet,
  unLikeTweet,
  getMyInfo,
  logout,
  getChannelDetail,
};
