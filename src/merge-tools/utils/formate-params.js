export default function formatUrlParams(url, params) {
  if (!params) return url;
  let res = `${url}?`;
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const value = params[key];
      res += `${key}=${value}&`
    }
  }
  return res
}