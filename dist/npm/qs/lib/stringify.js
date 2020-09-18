"use strict";
var utils = require("./utils.js"),
    formats = require("./formats.js"),
    has = Object.prototype.hasOwnProperty,
    arrayPrefixGenerators = { brackets: function (e) {
    return e + "[]";
  }, comma: "comma", indices: function (e, r) {
    return e + "[" + r + "]";
  }, repeat: function (e) {
    return e;
  } },
    isArray = Array.isArray,
    push = Array.prototype.push,
    pushToArray = function (e, r) {
  push.apply(e, isArray(r) ? r : [r]);
},
    toISO = Date.prototype.toISOString,
    defaultFormat = formats.default,
    defaults = { addQueryPrefix: false, allowDots: false, charset: "utf-8", charsetSentinel: false, delimiter: "&", encode: true, encoder: utils.encode, encodeValuesOnly: false, format: defaultFormat, formatter: formats.formatters[defaultFormat], indices: false, serializeDate: function (e) {
    return toISO.call(e);
  }, skipNulls: false, strictNullHandling: false },
    isNonNullishPrimitive = function (e) {
  return "string" == typeof e || "number" == typeof e || "boolean" == typeof e || "symbol" == typeof e || "bigint" == typeof e;
},
    stringify = function e(r, t, o, i, a, n, l, s, f, u, d, c, y) {
  var p = r;if ("function" == typeof l ? p = l(t, p) : p instanceof Date ? p = u(p) : "comma" === o && isArray(p) && (p = p.join(",")), null === p) {
    if (i) return n && !c ? n(t, defaults.encoder, y, "key") : t;p = "";
  }if (isNonNullishPrimitive(p) || utils.isBuffer(p)) return n ? [d(c ? t : n(t, defaults.encoder, y, "key")) + "=" + d(n(p, defaults.encoder, y, "value"))] : [d(t) + "=" + d(String(p))];var m,
      h = [];if (undefined === p) return h;if (isArray(l)) m = l;else {
    var v = Object.keys(p);m = s ? v.sort(s) : v;
  }for (var b = 0; b < m.length; ++b) {
    var g = m[b];a && null === p[g] || (isArray(p) ? pushToArray(h, e(p[g], "function" == typeof o ? o(t, g) : t, o, i, a, n, l, s, f, u, d, c, y)) : pushToArray(h, e(p[g], t + (f ? "." + g : "[" + g + "]"), o, i, a, n, l, s, f, u, d, c, y)));
  }return h;
},
    normalizeStringifyOptions = function (e) {
  if (!e) return defaults;if (null !== e.encoder && undefined !== e.encoder && "function" != typeof e.encoder) throw new TypeError("Encoder has to be a function.");var r = e.charset || defaults.charset;if (undefined !== e.charset && "utf-8" !== e.charset && "iso-8859-1" !== e.charset) throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var t = formats.default;if (undefined !== e.format) {
    if (!has.call(formats.formatters, e.format)) throw new TypeError("Unknown format option provided.");t = e.format;
  }var o = formats.formatters[t],
      i = defaults.filter;return "function" != typeof e.filter && !isArray(e.filter) || (i = e.filter), { addQueryPrefix: "boolean" == typeof e.addQueryPrefix ? e.addQueryPrefix : defaults.addQueryPrefix, allowDots: undefined === e.allowDots ? defaults.allowDots : !!e.allowDots, charset: r, charsetSentinel: "boolean" == typeof e.charsetSentinel ? e.charsetSentinel : defaults.charsetSentinel, delimiter: undefined === e.delimiter ? defaults.delimiter : e.delimiter, encode: "boolean" == typeof e.encode ? e.encode : defaults.encode, encoder: "function" == typeof e.encoder ? e.encoder : defaults.encoder, encodeValuesOnly: "boolean" == typeof e.encodeValuesOnly ? e.encodeValuesOnly : defaults.encodeValuesOnly, filter: i, formatter: o, serializeDate: "function" == typeof e.serializeDate ? e.serializeDate : defaults.serializeDate, skipNulls: "boolean" == typeof e.skipNulls ? e.skipNulls : defaults.skipNulls, sort: "function" == typeof e.sort ? e.sort : null, strictNullHandling: "boolean" == typeof e.strictNullHandling ? e.strictNullHandling : defaults.strictNullHandling };
};module.exports = function (e, r) {
  var t,
      o = e,
      i = normalizeStringifyOptions(r);"function" == typeof i.filter ? o = (0, i.filter)("", o) : isArray(i.filter) && (t = i.filter);var a,
      n = [];if ("object" != typeof o || null === o) return "";a = r && r.arrayFormat in arrayPrefixGenerators ? r.arrayFormat : r && "indices" in r ? r.indices ? "indices" : "repeat" : "indices";var l = arrayPrefixGenerators[a];t = t || Object.keys(o), i.sort && t.sort(i.sort);for (var s = 0; s < t.length; ++s) {
    var f = t[s];i.skipNulls && null === o[f] || pushToArray(n, stringify(o[f], f, l, i.strictNullHandling, i.skipNulls, i.encode ? i.encoder : null, i.filter, i.sort, i.allowDots, i.serializeDate, i.formatter, i.encodeValuesOnly, i.charset));
  }var u = n.join(i.delimiter),
      d = true === i.addQueryPrefix ? "?" : "";return i.charsetSentinel && ("iso-8859-1" === i.charset ? d += "utf8=%26%2310003%3B&" : d += "utf8=%E2%9C%93&"), 0 < u.length ? d + u : "";
};