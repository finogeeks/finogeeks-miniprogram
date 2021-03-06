"use strict";
var has = Object.prototype.hasOwnProperty,
    isArray = Array.isArray,
    hexTable = function () {
  for (var e = [], r = 0; r < 256; ++r) e.push("%" + ((r < 16 ? "0" : "") + r.toString(16)).toUpperCase());return e;
}(),
    compactQueue = function (e) {
  for (; 1 < e.length;) {
    var r = e.pop(),
        t = r.obj[r.prop];if (isArray(t)) {
      for (var o = [], c = 0; c < t.length; ++c) undefined !== t[c] && o.push(t[c]);r.obj[r.prop] = o;
    }
  }
},
    arrayToObject = function (e, r) {
  for (var t = r && r.plainObjects ? Object.create(null) : {}, o = 0; o < e.length; ++o) undefined !== e[o] && (t[o] = e[o]);return t;
},
    merge = function o(c, n, a) {
  if (!n) return c;if ("object" != typeof n) {
    if (isArray(c)) c.push(n);else {
      if (!c || "object" != typeof c) return [c, n];(a && (a.plainObjects || a.allowPrototypes) || !has.call(Object.prototype, n)) && (c[n] = true);
    }return c;
  }if (!c || "object" != typeof c) return [c].concat(n);var e = c;return isArray(c) && !isArray(n) && (e = arrayToObject(c, a)), isArray(c) && isArray(n) ? (n.forEach(function (e, r) {
    if (has.call(c, r)) {
      var t = c[r];t && "object" == typeof t && e && "object" == typeof e ? c[r] = o(t, e, a) : c.push(e);
    } else c[r] = e;
  }), c) : Object.keys(n).reduce(function (e, r) {
    var t = n[r];return has.call(e, r) ? e[r] = o(e[r], t, a) : e[r] = t, e;
  }, e);
},
    assign = function (e, t) {
  return Object.keys(t).reduce(function (e, r) {
    return e[r] = t[r], e;
  }, e);
},
    decode = function (e, r, t) {
  var o = e.replace(/\+/g, " ");if ("iso-8859-1" === t) return o.replace(/%[0-9a-f]{2}/gi, unescape);try {
    return decodeURIComponent(o);
  } catch (e) {
    return o;
  }
},
    encode = function (e, r, t) {
  if (0 === e.length) return e;var o = e;if ("symbol" == typeof e ? o = Symbol.prototype.toString.call(e) : "string" != typeof e && (o = String(e)), "iso-8859-1" === t) return escape(o).replace(/%u[0-9a-f]{4}/gi, function (e) {
    return "%26%23" + parseInt(e.slice(2), 16) + "%3B";
  });for (var c = "", n = 0; n < o.length; ++n) {
    var a = o.charCodeAt(n);45 === a || 46 === a || 95 === a || 126 === a || 48 <= a && a <= 57 || 65 <= a && a <= 90 || 97 <= a && a <= 122 ? c += o.charAt(n) : a < 128 ? c += hexTable[a] : a < 2048 ? c += hexTable[192 | a >> 6] + hexTable[128 | 63 & a] : a < 55296 || 57344 <= a ? c += hexTable[224 | a >> 12] + hexTable[128 | a >> 6 & 63] + hexTable[128 | 63 & a] : (n += 1, a = 65536 + ((1023 & a) << 10 | 1023 & o.charCodeAt(n)), c += hexTable[240 | a >> 18] + hexTable[128 | a >> 12 & 63] + hexTable[128 | a >> 6 & 63] + hexTable[128 | 63 & a]);
  }return c;
},
    compact = function (e) {
  for (var r = [{ obj: { o: e }, prop: "o" }], t = [], o = 0; o < r.length; ++o) for (var c = r[o], n = c.obj[c.prop], a = Object.keys(n), i = 0; i < a.length; ++i) {
    var u = a[i],
        p = n[u];"object" == typeof p && null !== p && -1 === t.indexOf(p) && (r.push({ obj: n, prop: u }), t.push(p));
  }return compactQueue(r), e;
},
    isRegExp = function (e) {
  return "[object RegExp]" === Object.prototype.toString.call(e);
},
    isBuffer = function (e) {
  return !(!e || "object" != typeof e || !(e.constructor && e.constructor.isBuffer && e.constructor.isBuffer(e)));
},
    combine = function (e, r) {
  return [].concat(e, r);
};module.exports = { arrayToObject: arrayToObject, assign: assign, combine: combine, compact: compact, decode: decode, encode: encode, isBuffer: isBuffer, isRegExp: isRegExp, merge: merge };