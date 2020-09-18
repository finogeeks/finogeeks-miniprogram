export function formatUrlParams(url, params) {
  console.log('formatUrlParams: ', params);
  if (!params) return url;
  let res = `${url}?`;
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const value = params[key];
      res += `${key}=${value}&`;
    }
  }
  console.log('res', res);
  return res;
  // const surfix = Object.entries(params).reduce((pre, cur) => {
  //   return `${pre}&${cur[0]}=${cur[1]}`
  // }, '');
  // return `${url}?${surfix}`;
}

const businessUrls = [
  'https://mh.finogeeks.club',
  'https://o2o.finogeeks.club',
  'https://api.finolabs.club',
];
export function checkUrl(url) {
  const validate = businessUrls.some(u => {
    return url.startsWith(u);
  });
  return validate;
}

export default {
  formatUrlParams,
  checkUrl,
};
