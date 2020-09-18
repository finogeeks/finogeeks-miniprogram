!function (t, e) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.dayjs_plugin_relativeTime = e();
}(this, function () {
  "use strict";
  return function (t, e, h) {
    var r = e.prototype;function n(t, e, r, n) {
      for (var o, d, i = r.$locale().relativeTime, u = [{ l: "s", r: 44, d: "second" }, { l: "m", r: 89 }, { l: "mm", r: 44, d: "minute" }, { l: "h", r: 89 }, { l: "hh", r: 21, d: "hour" }, { l: "d", r: 35 }, { l: "dd", r: 25, d: "day" }, { l: "M", r: 45 }, { l: "MM", r: 10, d: "month" }, { l: "y", r: 17 }, { l: "yy", d: "year" }], a = u.length, f = 0; f < a; f += 1) {
        var s = u[f];s.d && (o = n ? h(t).diff(r, s.d, true) : r.diff(t, s.d, true));var l = Math.round(Math.abs(o));if (l <= s.r || !s.r) {
          1 === l && 0 < f && (s = u[f - 1]), d = i[s.l].replace("%d", l);break;
        }
      }return e ? d : (0 < o ? i.future : i.past).replace("%s", d);
    }function o(t) {
      return t.$u ? h.utc() : h();
    }h.en.relativeTime = { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" }, r.to = function (t, e) {
      return n(t, e, this, true);
    }, r.from = function (t, e) {
      return n(t, e, this);
    }, r.toNow = function (t) {
      return this.to(o(this), t);
    }, r.fromNow = function (t) {
      return this.from(o(this), t);
    };
  };
});