'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatUrlParams = formatUrlParams;
exports.checkUrl = checkUrl;
function formatUrlParams(url, params) {
  console.log('formatUrlParams: ', params);
  if (!params) return url;
  var res = url + '?';
  for (var key in params) {
    if (params.hasOwnProperty(key)) {
      var value = params[key];
      res += key + '=' + value + '&';
    }
  }
  console.log('res', res);
  return res;
  // const surfix = Object.entries(params).reduce((pre, cur) => {
  //   return `${pre}&${cur[0]}=${cur[1]}`
  // }, '');
  // return `${url}?${surfix}`;
}

var businessUrls = ['https://mh.finogeeks.club', 'https://o2o.finogeeks.club', 'https://api.finolabs.club'];
function checkUrl(url) {
  var validate = businessUrls.some(function (u) {
    return url.startsWith(u);
  });
  return validate;
}

exports.default = {
  formatUrlParams: formatUrlParams,
  checkUrl: checkUrl
};