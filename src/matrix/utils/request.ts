import { fetch } from '@/utils/http-client';
import { getCacheSync } from '@/utils/store';
import UrlParse from 'url-parse';
import QueryString from 'qs';
const userSession = getCacheSync('userSession')
const userId = userSession ? userSession.userId : '';

const request = async (
  opts:any = {},
  callback:any = function() {},
  basic:any = {},
) => {
  // console.log('~~~~~~~~~~~~~~~~~~utils request ~~~~~~~~~~~~~~~~~~~~', opts);
  const header = {
    ...opts.headers,
    'X-Consumer-Custom-ID': userId,
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

export default request;