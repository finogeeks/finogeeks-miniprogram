import Taro from '@tarojs/taro';
import UrlParse from 'url-parse';
import QueryString from 'qs';
import extInfo from '@/utils/ext';
import { Base64 } from 'js-base64';

// const { platform } = Taro.getSystemInfoSync();
// console.log('platform', platform);
let localBase64Meta = null;

export const fetch = ({ url = '', ...opts }) => {
  console.log(...opts);
  return new Promise((resolve, reject) => {
    Taro.request({
      success(res) {
        if (res.statusCode === 200) {
          resolve(res);
        } else {
          reject(res);
        }
      },
      fail(err) {
        reject(err);
      },
      url: url.startsWith('http') ? url : `${extInfo.BASE_URL}${url}`,
      ...opts,
    });
  });
};

export const axios2Taro = (opts = {}, basic = {}) => {
  const { userId } = basic;
  const channelId = Taro.getStorageSync('__channelId__') || '';
  console.log('DEBUG: axios2Taro => channelId', channelId);
  if (!localBase64Meta && userId) {
    const domain = userId.substring(userId.indexOf(':') + 1);
    // console.log(domain);
    const userMeta = {
      appType: 'RETAIL',
      terminal: 'wxapplet',
      plaform: 'ios',
      domain,
    };
    localBase64Meta = Base64.encode(JSON.stringify(userMeta));
  }
  const header = {
    ...opts.headers,
    'X-Consumer-Custom-ID': basic.userId,
    'X-Consumer-User-Meta': localBase64Meta,
    'X-Consumer-User-Channel': channelId,
  };
  const url = opts.uri || opts.url;
  const urlEntity = new UrlParse(url, true);
  const params = opts.params || {};
  let postfix = QueryString.stringify({
    access_token: basic.accessToken,
    jwt: basic.jwt,
    ...params,
  });
  const keys = (urlEntity.query && Object.keys(urlEntity.query)) || [];
  postfix = `${keys.length > 0 ? '&' : '?'}${postfix}`;
  const newOptions = {
    url: `${opts.url}${postfix}`,
    method: (opts.method && opts.method.toUpperCase()) || 'GET',
    header,
    dataType: opts.responseType || 'json',
    responseType: 'text',
    data: opts.data,
  };
  return fetch(newOptions);
};

export const matrix2Taro = async (
  opts = {},
  callback = function() {},
  basic = {},
) => {
  const header = {
    ...opts.headers,
    'X-Consumer-Custom-ID': basic.userId,
  };
  let postfix = QueryString.stringify(opts.qs || {}, opts.qsStringifyOptions);
  const url = opts.uri || opts.url;
  const urlEntity = new UrlParse(url, true);
  const keys = (urlEntity.query && Object.keys(urlEntity.query)) || [];
  postfix = `${keys.length > 0 ? '&' : '?'}${postfix}`;
  const newOptions = {
    url: `${url}${postfix}`,
    method: (opts.method && opts.method.toUpperCase()) || 'GET',
    header,
    dataType: opts.json ? 'json' : 'text',
    responseType: 'text',
    data: opts.body,
  };
  try {
    const response = await fetch(newOptions);
    callback(null, response, response.data);
    return response;
  } catch (error) {
    callback(error, error, null);
    return error;
  }
};

export const uploadFile = (
  { uploadUrl = '', path = '', meta, callback, ...opts },
  basic = {},
) => {
  const header = {
    ...opts.headers,
    'X-Consumer-Custom-ID': basic.userId,
  };
  return new Promise(resolve => {
    const task = Taro.uploadFile({
      url: uploadUrl,
      filePath: path,
      name: path,
      header,
      success: res => {
        try {
          const data = JSON.parse(res.data);
          const url = data.netdiskID;
          resolve({ url, meta });
        } catch (error) {
          resolve({ url: '', meta, error });
        }
      },
      fail: error => {
        resolve({ url: '', meta, error });
      },
    });
    callback &&
      callback({
        cancel: task.abort,
      });
    task.onProgressUpdate = ({
      progress,
      totalBytesSent,
      totalBytesExpectedToSend,
    }) => {
      callback &&
        callback({
          loaded: totalBytesSent,
          total: totalBytesExpectedToSend,
          percentage: progress,
          meta,
        });
    };
  });
};

export const downloadFile = ({ url = '', ...opts }) => {
  return Taro.downloadFile({
    url: url.startsWith('http') ? url : `${extInfo.BASE_URL}${url}`,
    ...opts,
  });
};

export default {
  axios2Taro,
  matrix2Taro,
  fetch,
  uploadFile,
  downloadFile,
};
