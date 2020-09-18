import { request, } from '../utils/http-client';

export const reportFormId = async (roomId, msgType, formId, openId, fcid) => {
  // const response = await request({
  //   url: `/api/v1/swan/observe/orders/wechatForm`,
  //   method: 'POST',
  //   data: {
  //     fcid,
  //     msgType,
  //     roomId,
  //     formId,
  //     openId,
  //     appletType: 'SWAN_IM',
  //   },
  // });
  // return response.data;
  return {};
};

export const reportPresence = async (fcid, isOnline) => {
  const response = await request({
    url: `/api/v1/swan/observe/presence/${fcid}/status`,
    method: 'PUT',
    data: {
      presence: isOnline ? 'online' : 'offline',
    },
  });
  return response;
};

// 上报用户手机号加密数据
export const reportWxPhome = async ({ appId, code, encryptedData, iv, retailId }) => {
  const response = await request({
    url: `/api/v1/swan/retail/wxPhone`,
    method: 'POST',
    data: {
      retailId,
      appId,
      code,
      encryptedData,
      iv,
    },
  });
  return response.data;
};


/**
 * 上报客户试图打电话
 * @param {*} ts
 */
export const reportCallPhone = async ({ staffId, retailId, resourceType, resourceId }) => {
  const response = await request({
    url: `/api/v1/adviserZone/_report/_call-phone`,
    method: 'POST',
    data: {
      staffId,
      retailId,
      resourceType, 
      resourceId,
    },
  });
  return response.data;
}