"use strict";
var undef,
    has = Object.prototype.hasOwnProperty;function decode(n) {
  try {
    return decodeURIComponent(n.replace(/\+/g, " "));
  } catch (n) {
    return null;
  }
}function encode(n) {
  try {
    return encodeURIComponent(n);
  } catch (n) {
    return null;
  }
}function querystring(n) {
  for (var e, r = /([^=?&]+)=?([^&]*)/g, t = {}; e = r.exec(n);) {
    var o = decode(e[1]),
        u = decode(e[2]);null === o || null === u || o in t || (t[o] = u);
  }return t;
}function querystringify(n, e) {
  e = e || "";var r,
      t,
      o = [];for (t in "string" != typeof e && (e = "?"), n) if (has.call(n, t)) {
    if ((r = n[t]) || null !== r && r !== undef && !isNaN(r) || (r = ""), t = encodeURIComponent(t), r = encodeURIComponent(r), null === t || null === r) continue;o.push(t + "=" + r);
  }return o.length ? e + o.join("&") : "";
}exports.stringify = querystringify, exports.parse = querystring;