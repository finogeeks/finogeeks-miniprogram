"use strict";
var required = require("../requires-port/index.js"),
    qs = require("../querystringify/index.js"),
    slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//,
    protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\S\s]*)/i,
    whitespace = "[\\x09\\x0A\\x0B\\x0C\\x0D\\x20\\xA0\\u1680\\u180E\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200A\\u202F\\u205F\\u3000\\u2028\\u2029\\uFEFF]",
    left = new RegExp("^[\\x09\\x0A\\x0B\\x0C\\x0D\\x20\\xA0\\u1680\\u180E\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200A\\u202F\\u205F\\u3000\\u2028\\u2029\\uFEFF]+");function trimLeft(e) {
  return (e || "").toString().replace(left, "");
}var rules = [["#", "hash"], ["?", "query"], function (e) {
  return e.replace("\\", "/");
}, ["/", "pathname"], ["@", "auth", 1], [NaN, "host", undefined, 1, 1], [/:(\d+)$/, "port", undefined, 1], [NaN, "hostname", undefined, 1, 1]],
    ignore = { hash: 1, query: 1 };function lolcation(e) {
  var t,
      o = ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {}).location || {},
      r = {},
      s = typeof (e = e || o);if ("blob:" === e.protocol) r = new Url(unescape(e.pathname), {});else if ("string" == s) for (t in r = new Url(e, {}), ignore) delete r[t];else if ("object" == s) {
    for (t in e) t in ignore || (r[t] = e[t]);undefined === r.slashes && (r.slashes = slashes.test(e.href));
  }return r;
}function extractProtocol(e) {
  e = trimLeft(e);var t = protocolre.exec(e);return { protocol: t[1] ? t[1].toLowerCase() : "", slashes: !!t[2], rest: t[3] };
}function resolve(e, t) {
  if ("" === e) return t;for (var o = (t || "/").split("/").slice(0, -1).concat(e.split("/")), r = o.length, s = o[r - 1], a = false, n = 0; r--;) "." === o[r] ? o.splice(r, 1) : ".." === o[r] ? (o.splice(r, 1), n++) : n && (0 === r && (a = true), o.splice(r, 1), n--);return a && o.unshift(""), "." !== s && ".." !== s || o.push(""), o.join("/");
}function Url(e, t, o) {
  if (e = trimLeft(e), !(this instanceof Url)) return new Url(e, t, o);var r,
      s,
      a,
      n,
      l,
      i,
      c = rules.slice(),
      u = typeof t,
      h = this,
      p = 0;for ("object" != u && "string" != u && (o = t, t = null), o && "function" != typeof o && (o = qs.parse), t = lolcation(t), r = !(s = extractProtocol(e || "")).protocol && !s.slashes, h.slashes = s.slashes || r && t.slashes, h.protocol = s.protocol || t.protocol || "", e = s.rest, s.slashes || (c[3] = [/(.*)/, "pathname"]); p < c.length; p++) "function" != typeof (n = c[p]) ? (a = n[0], i = n[1], a != a ? h[i] = e : "string" == typeof a ? ~(l = e.indexOf(a)) && (e = "number" == typeof n[2] ? (h[i] = e.slice(0, l), e.slice(l + n[2])) : (h[i] = e.slice(l), e.slice(0, l))) : (l = a.exec(e)) && (h[i] = l[1], e = e.slice(0, l.index)), h[i] = h[i] || r && n[3] && t[i] || "", n[4] && (h[i] = h[i].toLowerCase())) : e = n(e);o && (h.query = o(h.query)), r && t.slashes && "/" !== h.pathname.charAt(0) && ("" !== h.pathname || "" !== t.pathname) && (h.pathname = resolve(h.pathname, t.pathname)), required(h.port, h.protocol) || (h.host = h.hostname, h.port = ""), h.username = h.password = "", h.auth && (n = h.auth.split(":"), h.username = n[0] || "", h.password = n[1] || ""), h.origin = h.protocol && h.host && "file:" !== h.protocol ? h.protocol + "//" + h.host : "null", h.href = h.toString();
}function set(e, t, o) {
  var r = this;switch (e) {case "query":
      "string" == typeof t && t.length && (t = (o || qs.parse)(t)), r[e] = t;break;case "port":
      r[e] = t, required(t, r.protocol) ? t && (r.host = r.hostname + ":" + t) : (r.host = r.hostname, r[e] = "");break;case "hostname":
      r[e] = t, r.port && (t += ":" + r.port), r.host = t;break;case "host":
      r[e] = t, /:\d+$/.test(t) ? (t = t.split(":"), r.port = t.pop(), r.hostname = t.join(":")) : (r.hostname = t, r.port = "");break;case "protocol":
      r.protocol = t.toLowerCase(), r.slashes = !o;break;case "pathname":case "hash":
      if (t) {
        var s = "pathname" === e ? "/" : "#";r[e] = t.charAt(0) !== s ? s + t : t;
      } else r[e] = t;break;default:
      r[e] = t;}for (var a = 0; a < rules.length; a++) {
    var n = rules[a];n[4] && (r[n[1]] = r[n[1]].toLowerCase());
  }return r.origin = r.protocol && r.host && "file:" !== r.protocol ? r.protocol + "//" + r.host : "null", r.href = r.toString(), r;
}function toString(e) {
  e && "function" == typeof e || (e = qs.stringify);var t,
      o = this,
      r = o.protocol;r && ":" !== r.charAt(r.length - 1) && (r += ":");var s = r + (o.slashes ? "//" : "");return o.username && (s += o.username, o.password && (s += ":" + o.password), s += "@"), s += o.host + o.pathname, (t = "object" == typeof o.query ? e(o.query) : o.query) && (s += "?" !== t.charAt(0) ? "?" + t : t), o.hash && (s += o.hash), s;
}Url.prototype = { set: set, toString: toString }, Url.extractProtocol = extractProtocol, Url.location = lolcation, Url.trimLeft = trimLeft, Url.qs = qs, module.exports = Url;