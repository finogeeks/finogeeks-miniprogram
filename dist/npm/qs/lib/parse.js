"use strict";
var utils = require("./utils.js"),
    has = Object.prototype.hasOwnProperty,
    defaults = { allowDots: false, allowPrototypes: false, arrayLimit: 20, charset: "utf-8", charsetSentinel: false, comma: false, decoder: utils.decode, delimiter: "&", depth: 5, ignoreQueryPrefix: false, interpretNumericEntities: false, parameterLimit: 1e3, parseArrays: true, plainObjects: false, strictNullHandling: false },
    interpretNumericEntities = function (e) {
  return e.replace(/&#(\d+);/g, function (e, t) {
    return String.fromCharCode(parseInt(t, 10));
  });
},
    isoSentinel = "utf8=%26%2310003%3B",
    charsetSentinel = "utf8=%E2%9C%93",
    parseValues = function (e, t) {
  var r,
      i = {},
      a = t.ignoreQueryPrefix ? e.replace(/^\?/, "") : e,
      l = t.parameterLimit === Infinity ? undefined : t.parameterLimit,
      s = a.split(t.delimiter, l),
      n = -1,
      o = t.charset;if (t.charsetSentinel) for (r = 0; r < s.length; ++r) 0 === s[r].indexOf("utf8=") && (s[r] === charsetSentinel ? o = "utf-8" : s[r] === isoSentinel && (o = "iso-8859-1"), n = r, r = s.length);for (r = 0; r < s.length; ++r) if (r !== n) {
    var c,
        u,
        p = s[r],
        d = p.indexOf("]="),
        f = -1 === d ? p.indexOf("=") : d + 1;(u = -1 === f ? (c = t.decoder(p, defaults.decoder, o, "key"), t.strictNullHandling ? null : "") : (c = t.decoder(p.slice(0, f), defaults.decoder, o, "key"), t.decoder(p.slice(f + 1), defaults.decoder, o, "value"))) && t.interpretNumericEntities && "iso-8859-1" === o && (u = interpretNumericEntities(u)), u && t.comma && -1 < u.indexOf(",") && (u = u.split(",")), has.call(i, c) ? i[c] = utils.combine(i[c], u) : i[c] = u;
  }return i;
},
    parseObject = function (e, t, r) {
  for (var i = t, a = e.length - 1; 0 <= a; --a) {
    var l,
        s = e[a];if ("[]" === s && r.parseArrays) l = [].concat(i);else {
      l = r.plainObjects ? Object.create(null) : {};var n = "[" === s.charAt(0) && "]" === s.charAt(s.length - 1) ? s.slice(1, -1) : s,
          o = parseInt(n, 10);r.parseArrays || "" !== n ? !isNaN(o) && s !== n && String(o) === n && 0 <= o && r.parseArrays && o <= r.arrayLimit ? (l = [])[o] = i : l[n] = i : l = { 0: i };
    }i = l;
  }return i;
},
    parseKeys = function (e, t, r) {
  if (e) {
    var i = r.allowDots ? e.replace(/\.([^.[]+)/g, "[$1]") : e,
        a = /(\[[^[\]]*])/g,
        l = 0 < r.depth && /(\[[^[\]]*])/.exec(i),
        s = l ? i.slice(0, l.index) : i,
        n = [];if (s) {
      if (!r.plainObjects && has.call(Object.prototype, s) && !r.allowPrototypes) return;n.push(s);
    }for (var o = 0; 0 < r.depth && null !== (l = a.exec(i)) && o < r.depth;) {
      if (o += 1, !r.plainObjects && has.call(Object.prototype, l[1].slice(1, -1)) && !r.allowPrototypes) return;n.push(l[1]);
    }return l && n.push("[" + i.slice(l.index) + "]"), parseObject(n, t, r);
  }
},
    normalizeParseOptions = function (e) {
  if (!e) return defaults;if (null !== e.decoder && undefined !== e.decoder && "function" != typeof e.decoder) throw new TypeError("Decoder has to be a function.");if (undefined !== e.charset && "utf-8" !== e.charset && "iso-8859-1" !== e.charset) throw new Error("The charset option must be either utf-8, iso-8859-1, or undefined");var t = undefined === e.charset ? defaults.charset : e.charset;return { allowDots: undefined === e.allowDots ? defaults.allowDots : !!e.allowDots, allowPrototypes: "boolean" == typeof e.allowPrototypes ? e.allowPrototypes : defaults.allowPrototypes, arrayLimit: "number" == typeof e.arrayLimit ? e.arrayLimit : defaults.arrayLimit, charset: t, charsetSentinel: "boolean" == typeof e.charsetSentinel ? e.charsetSentinel : defaults.charsetSentinel, comma: "boolean" == typeof e.comma ? e.comma : defaults.comma, decoder: "function" == typeof e.decoder ? e.decoder : defaults.decoder, delimiter: "string" == typeof e.delimiter || utils.isRegExp(e.delimiter) ? e.delimiter : defaults.delimiter, depth: "number" == typeof e.depth || false === e.depth ? +e.depth : defaults.depth, ignoreQueryPrefix: true === e.ignoreQueryPrefix, interpretNumericEntities: "boolean" == typeof e.interpretNumericEntities ? e.interpretNumericEntities : defaults.interpretNumericEntities, parameterLimit: "number" == typeof e.parameterLimit ? e.parameterLimit : defaults.parameterLimit, parseArrays: false !== e.parseArrays, plainObjects: "boolean" == typeof e.plainObjects ? e.plainObjects : defaults.plainObjects, strictNullHandling: "boolean" == typeof e.strictNullHandling ? e.strictNullHandling : defaults.strictNullHandling };
};module.exports = function (e, t) {
  var r = normalizeParseOptions(t);if ("" === e || null == e) return r.plainObjects ? Object.create(null) : {};for (var i = "string" == typeof e ? parseValues(e, r) : e, a = r.plainObjects ? Object.create(null) : {}, l = Object.keys(i), s = 0; s < l.length; ++s) {
    var n = l[s],
        o = parseKeys(n, i[n], r);a = utils.merge(a, o, r);
  }return utils.compact(a);
};