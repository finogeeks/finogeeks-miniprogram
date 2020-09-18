import Taro from '@tarojs/taro';
import { Base64 } from 'js-base64';
import QueryString from 'qs';
import { getExtInfo } from './ext';
import UrlParse from 'url-parse';
import { generateUuid } from './util';

// const urlEntity = new UrlParse(getExtInfo().BASE_URL, true);
// const domain = urlEntity.hos
const localBase64Meta = Base64.encode(JSON.stringify({
  appType: 'RETAIL',
  terminal: 'wxapplet',
  plaform: 'ios',
  domain: getExtInfo().HS_DOMAIN,
}));

export interface ApiConfig {
  accessToken: string
  jwt:string
  userId: string
}

export interface ReqConfig {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  data?: ReqData
  needAuth?: boolean
  needToken?: boolean
}

export interface ReqData {
  [x:string]:any
}

export interface UploadConfig {
  uploadUrl:string,
  path:string,
  meta?:any,
  callback?:any,
}

class HttpClient {
  baseUrl: string = getExtInfo().BASE_URL
  jwt: string
  accessToken: string
  userId: string
  domain: string
  localBase64Meta: string = localBase64Meta
  channelId: string
  auth:string
  hsDomain:string = getExtInfo().HS_DOMAIN


  setAuth(config:ApiConfig) {
    this.jwt = config.jwt;
    this.accessToken = config.accessToken;
    this.userId = config.userId;
    const domain = config.userId.substring(config.userId.indexOf(':') + 1);
    const localBase64Meta = Base64.encode(JSON.stringify({
      appType: 'RETAIL',
      terminal: 'wxapplet',
      plaform: 'ios',
      domain,
    }));
    this.auth = `Bearer ${config.jwt}`
  }

  refresh(jwt) {
    this.jwt = jwt;
    this.auth = jwt;
  }

  fetch = ({ url = '', ...opts }) => {
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
        url: url.startsWith('http') ? url : `${this.baseUrl}${url}`,
        ...opts,
      });
    });
  };


  request = async ({url, data, method, needAuth = true, needToken = false }:ReqConfig) => {
    const urlEntity = new UrlParse(this.baseUrl, true);
    let parseUrl = url.startsWith('http') ? url : `${this.baseUrl}${url}`;
    let reqData = null;
    if (method === 'GET') {
      parseUrl = this.formateDataToUrlQuery(parseUrl, data);
    } else {
      reqData = data;
    }

    if(needToken) {
      if (parseUrl.includes('?')) {
        parseUrl = `${parseUrl}&access_token=${this.accessToken}`
      } else {
        parseUrl = `${parseUrl}?access_token=${this.accessToken}`
      }
    }

    let header:any = {
      'content-type': 'application/json',
      'X-Consumer-Custom-ID': this.userId || `@retail_visitor:${this.hsDomain}`,
    }

    if (needAuth) {
      if (!this.auth) {
        console.error('not Authorization');
        return { data: null };
      }
      header = {
        ...header,
       'Authorization': this.auth || '',
      }
    }
    const channelId = Taro.getStorageSync('__channelId__') || '';
    header = {
      ...header,
     'X-Consumer-User-Meta': this.localBase64Meta || '',
     'X-Consumer-User-Channel': channelId || '',
     // TODO: 根据页面停留生成唯一Operation ID
     'X-Consumer-Operation-ID': generateUuid(),
   };
    const reqOptions = {
      url: parseUrl,
      data: reqData,
      header,
      method,
    }
    return this.fetch(reqOptions);
  }

  upload = payload => {
    return this.uploadFile(
      {
        ...payload,
        uploadUrl: this.makeUploadUrl(payload),
      },
    );
  };

  makeUploadUrl = (payload) => {
    const { content = {}, params = {} } = payload;
    const prefix = this.baseUrl;
    const suffix = QueryString.stringify({
      type: content.msgtype,
      content_type: content.info.mimetype,
      content,
      jwt: this.jwt,
      ...params,
    });
    console.log('~~~~~~~makeUploadUrl~~~~~~~', suffix, this.accessToken, this.jwt);
    if (payload.roomId) {
      return `${prefix}/api/v1/netdisk/upload/room/${payload.roomId}?${suffix}`;
    }
    return `${prefix}/api/v1/netdisk/upload/self?${suffix}`;
  }

  uploadFile = (
    { uploadUrl = '', path = '', meta, callback, }:UploadConfig,
  ) => {
    const header = {
      'Authorization': this.auth,
      'X-Consumer-Custom-ID': this.userId,
      'X-Consumer-User-Meta': this.localBase64Meta,
      'X-Consumer-User-Channel': this.channelId,
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
      task.progress(({
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
      });
    });
  };

  /**
   * 网盘预览文件
   * @param fcid
   * @returns {string}
   */
  netdiskThumb = (netdiskId, type = 'middle') => {
    return `${this.baseUrl}/api/v1/netdisk/thumbnail/${netdiskId}?jwt=${this.jwt}&type=${type}`;
  };

  /**
   * 网盘原文件
   * @param fcid
   * @returns {string}
   */
  netdiskDownload = netdiskId => {
    return `${this.baseUrl}/api/v1/netdisk/download/${netdiskId}?jwt=${this.jwt}`;
  };

  /**
   * 网盘视频流文件
   * @param fcid
   * @returns {string}
   */
  netdiskVideo = netdiskId => {
    return `${this.baseUrl}/api/v1/netdisk/download/${netdiskId}/qt?jwt=${this.jwt}`;
  };


  private formateDataToUrlQuery = (url:string, data:ReqData) => {
    if (!data) return url;
    const hasQuery = url.indexOf('?') !== -1 ;
    let res = hasQuery ? `${url}&` : `${url}?` ;
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = data[key];
        res += `${key}=${value}&`;
      }
    }
    return res;
  }
}

const httpClient = new HttpClient();
console.log('getExtInfo().BASE_URL: ', getExtInfo().BASE_URL);
export const request = httpClient.request.bind(httpClient);
export const fetch = httpClient.fetch.bind(httpClient);
export const upload = httpClient.upload.bind(httpClient);
export const refresh = httpClient.refresh.bind(httpClient);
export default httpClient;
