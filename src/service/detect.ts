import { request, } from '../utils/http-client';
import { NAV_PAGES } from '@/constants/navigation';
import authModel from '@/model/auth';
import Taro from '@tarojs/taro';
import { stopJwtRefresh } from '@/utils/refreshjwt';
import { getExtInfo } from '@/utils/ext';
import { setCacheSync, getCacheSync } from '@/utils/store'
/**
 * 过滤敏感词
 */
export const detectSensitiveWord = async (text) => {
  const userSession = getCacheSync('userSession');
  const response = await request({
    url: `/api/v1/platform/wechat/detect?jwt=${userSession.jwt}&access_token=${userSession.access_token}`,
    method: 'put',
    needAuth: true,
    data: {
      content: text
    }
  }).catch(async err => {
    console.log('~~~~detectSensitiveWord~~~~~~~', err);
    stopJwtRefresh();
    await authModel.clearAuth();
    Taro.reLaunch({
      url: NAV_PAGES.LOGIN
    });
    console.log('当前token已失效,请重新登录    detectSensitiveWord');
    Taro.showToast({ title: '当前token已失效,请重新登录', icon: 'none' });
  });
  console.log('~~~~~~~~~~detectSensitiveWord  12~~~~~~~~~~~', response);
  // const url = '/api/v1/platform/wechat/detect'
  // let response;
  // await new Promise((resolve, reject) => {
  //   Taro.request({
  //     success(res) {
  //       if (res.statusCode === 200) {
  //         resolve(res);
  //       } else {
  //         reject(res);
  //       }
  //     },
  //     fail(err) {
  //       reject(err);
  //     },
  //     url: url.startsWith('http') ? url : `${getExtInfo().BASE_URL}${url}`,
  //   });
  // }).then(res => {
  //   response = res;
  // }).catch(err => {
  //   response = err;
  // });
  return response.data;
};

/**
 * 获取敏感词过滤配置信息
 */
export const getDetectControl = async () => {
  // const response = await request({
  //   url: ``,
  //   method: 'get',
  //   needAuth: true,
  // });
  // return response.data;
  return true;
};