"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatUrlParams;
function formatUrlParams(url, params) {
  if (!params) return url;
  var res = url + "?";
  for (var key in params) {
    if (params.hasOwnProperty(key)) {
      var value = params[key];
      res += key + "=" + value + "&";
    }
  }
  return res;
}