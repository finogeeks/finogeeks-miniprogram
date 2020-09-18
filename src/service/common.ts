import { request, } from '../utils/http-client';
// import { getExtInfo } from '../utils/ext';


export const sendSmsCode = async phone => {
  
  const response = await request({
    url: `/api/v1/platform/sms`,
    method: 'POST',
    data: {
      phone,
    },
  });
  return response.data;
};

export const getGeoInfo = async (lat, lng) => {
  const response = await request({
    url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${lat},${lng}&key=KHNBZ-JSAWP-DPSD4-LUCLI-HUQRK-L7BO2`,
    method: 'GET',
  });
  return response.data;
};

export const getActivityDaily = async () => {

  const response = await request({
    url: `/api/v1/lottery/activityDaily?from=WECHAT`,
    method: 'GET'
  });
  return response.data;
}

export const shareActivityDaily = async () => {
  const response = await request({
    url: `/api/v1/lottery/activityDaily/share?from=WECHAT`,
    method: 'POST',
  });
  return response.data;
}

export const countBinding = async () => {
  const response = await request({
    url: '/api/v1/lottery/activityDaily/wechatBind?from=WECHAT',
    method: 'POST',
  });
  return response.data;
}

export const getSceneData = async sceneId => {
  const response = await request({
    url: `/api/v1/wechat-service/wxa/share/${sceneId}`,
    method: 'GET',
    // needAuth: false,
  });
  return response.data;
};

export const joinRoom = async (roomId, user_id, qrcode) => {
  const response = await request({
    url: `/api/v1/channel/rooms/${roomId}/privateJoin`,
    method: 'POST',
    data: {
      user_id,
      qrcode,
    },
    needToken: true,
  });
  return response.data;
};


/**
 * 获取位置信息
 * @param longitude
 * @param latitude
 * @returns {AxiosPromise}
 */

export const getPosition = async (longitude, latitude) => {
  // const response = await request({
  //   url: `/api/v1/swan/gearing/geocode/city?location=${longitude},${latitude}`,
  //   method: 'GET',
  // });
  // return response.data;
  return {};
};

/**
 * 获取投顾信息
 * @param staffId
 * @returns {AxiosPromise}
 */

export const getStaffInfo = async staffId => {
  
  const response = await request({
    url: `/api/v1/swan/manager/staff/${staffId}`,
    method: 'GET',
  });
  return response.data;
};

/**
 * 获取产品海报logo
 * @param staffId
 * @returns {AxiosPromise}
 */

export const getPosterLogo = async () => {
  
  const response = await request({
    url: `/api/v1/adviserZone/poster/logo`,
    method: 'GET',
  });
  return response.data;
};

/**
 * 获取产品海报logo
 * @param staffId
 * @returns {AxiosPromise}
 */

export const checkJwt = async () => {
  
  const response = await request({
    url: `/api/v1/swan/gearing/config/version`,
    method: 'GET',
  });
  return response;
};

export default {
  sendSmsCode,
  getGeoInfo,
  getActivityDaily,
  countBinding,
  getSceneData,
  joinRoom,
};
