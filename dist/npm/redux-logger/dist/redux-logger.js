!function (e, t) {
  "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t(e.reduxLogger = e.reduxLogger || {});
}(this, function (e) {
  "use strict";
  function t(e, t) {
    e.super_ = t, e.prototype = Object.create(t.prototype, { constructor: { value: e, enumerable: false, writable: true, configurable: true } });
  }function r(e, t) {
    Object.defineProperty(this, "kind", { value: e, enumerable: true }), t && t.length && Object.defineProperty(this, "path", { value: t, enumerable: true });
  }function v(e, t, r) {
    v.super_.call(this, "E", e), Object.defineProperty(this, "lhs", { value: t, enumerable: true }), Object.defineProperty(this, "rhs", { value: r, enumerable: true });
  }function y(e, t) {
    y.super_.call(this, "N", e), Object.defineProperty(this, "rhs", { value: t, enumerable: true });
  }function b(e, t) {
    b.super_.call(this, "D", e), Object.defineProperty(this, "lhs", { value: t, enumerable: true });
  }function m(e, t, r) {
    m.super_.call(this, "A", e), Object.defineProperty(this, "index", { value: t, enumerable: true }), Object.defineProperty(this, "item", { value: r, enumerable: true });
  }function w(e, t, r) {
    var n = e.slice((r || t) + 1 || e.length);return e.length = t < 0 ? e.length + t : t, e.push.apply(e, n), e;
  }function x(e) {
    var t = undefined === e ? "undefined" : j(e);return "object" !== t ? t : e === Math ? "math" : null === e ? "null" : Array.isArray(e) ? "array" : "[object Date]" === Object.prototype.toString.call(e) ? "date" : "function" == typeof e.toString && /^\/.*\//.test(e.toString()) ? "regexp" : "object";
  }function S(n, o, i, a, e, t, l) {
    l = l || [];var c = (e = e || []).slice(0);if (undefined !== t) {
      if (a) {
        if ("function" == typeof a && a(c, t)) return;if ("object" === (undefined === a ? "undefined" : j(a))) {
          if (a.prefilter && a.prefilter(c, t)) return;if (a.normalize) {
            var r = a.normalize(c, t, n, o);r && (n = r[0], o = r[1]);
          }
        }
      }c.push(t);
    }"regexp" === x(n) && "regexp" === x(o) && (n = n.toString(), o = o.toString());var u = undefined === n ? "undefined" : j(n),
        f = undefined === o ? "undefined" : j(o),
        s = "undefined" !== u || l && l[l.length - 1].lhs && l[l.length - 1].lhs.hasOwnProperty(t),
        d = "undefined" !== f || l && l[l.length - 1].rhs && l[l.length - 1].rhs.hasOwnProperty(t);if (!s && d) i(new y(c, o));else if (!d && s) i(new b(c, n));else if (x(n) !== x(o)) i(new v(c, n, o));else if ("date" === x(n) && n - o != 0) i(new v(c, n, o));else if ("object" === u && null !== n && null !== o) {
      if (l.filter(function (e) {
        return e.lhs === n;
      }).length) n !== o && i(new v(c, n, o));else {
        if (l.push({ lhs: n, rhs: o }), Array.isArray(n)) {
          var p;for (n.length, p = 0; p < n.length; p++) p >= o.length ? i(new m(c, p, new b(undefined, n[p]))) : S(n[p], o[p], i, a, c, p, l);for (; p < o.length;) i(new m(c, p, new y(undefined, o[p++])));
        } else {
          var g = Object.keys(n),
              h = Object.keys(o);g.forEach(function (e, t) {
            var r = h.indexOf(e);0 <= r ? (S(n[e], o[e], i, a, c, e, l), h = w(h, r)) : S(n[e], undefined, i, a, c, e, l);
          }), h.forEach(function (e) {
            S(undefined, o[e], i, a, c, e, l);
          });
        }l.length = l.length - 1;
      }
    } else n !== o && ("number" === u && isNaN(n) && isNaN(o) || i(new v(c, n, o)));
  }function T(e, t, r, n) {
    return n = n || [], S(e, t, function (e) {
      e && n.push(e);
    }, r), n.length ? n : undefined;
  }function o(e, t, r) {
    if (e && t && r && r.kind) {
      for (var n = e, o = -1, i = r.path ? r.path.length - 1 : 0; ++o < i;) undefined === n[r.path[o]] && (n[r.path[o]] = "number" == typeof r.path[o] ? [] : {}), n = n[r.path[o]];switch (r.kind) {case "A":
          !function e(t, r, n) {
            if (n.path && n.path.length) {
              var o,
                  i = t[r],
                  a = n.path.length - 1;for (o = 0; o < a; o++) i = i[n.path[o]];switch (n.kind) {case "A":
                  e(i[n.path[o]], n.index, n.item);break;case "D":
                  delete i[n.path[o]];break;case "E":case "N":
                  i[n.path[o]] = n.rhs;}
            } else switch (n.kind) {case "A":
                e(t[r], n.index, n.item);break;case "D":
                t = w(t, r);break;case "E":case "N":
                t[r] = n.rhs;}return t;
          }(r.path ? n[r.path[o]] : n, r.index, r.item);break;case "D":
          delete n[r.path[o]];break;case "E":case "N":
          n[r.path[o]] = r.rhs;}
    }
  }function M(e, t, r, n) {
    switch (undefined === e ? "undefined" : j(e)) {case "object":
        return "function" == typeof e[n] ? e[n].apply(e, G(r)) : e[n];case "function":
        return e(t);default:
        return e;}
  }function p(k, E) {
    var e,
        o,
        i,
        A = E.logger,
        D = E.actionTransformer,
        t = E.titleFormatter,
        O = undefined === t ? (o = (e = E).timestamp, i = e.duration, function (e, t, r) {
      var n = ["action"];return n.push("%c" + String(e.type)), o && n.push("%c@ " + t), i && n.push("%c(in " + r.toFixed(2) + " ms)"), n.join(" ");
    }) : t,
        N = E.collapsed,
        P = E.colors,
        C = E.level,
        F = E.diff,
        L = undefined === E.titleFormatter;k.forEach(function (e, t) {
      var r = e.started,
          n = e.startedTime,
          o = e.action,
          i = e.prevState,
          a = e.error,
          l = e.took,
          c = e.nextState,
          u = k[t + 1];u && (c = u.prevState, l = u.started - r);var f = D(o),
          s = "function" == typeof N ? N(function () {
        return c;
      }, o, e) : N,
          d = _(n),
          p = P.title ? "color: " + P.title(f) + ";" : "",
          g = ["color: gray; font-weight: lighter;"];g.push(p), E.timestamp && g.push("color: gray; font-weight: lighter;"), E.duration && g.push("color: gray; font-weight: lighter;");var h = O(f, d, l);try {
        s ? P.title && L ? A.groupCollapsed.apply(A, ["%c " + h].concat(g)) : A.groupCollapsed(h) : P.title && L ? A.group.apply(A, ["%c " + h].concat(g)) : A.group(h);
      } catch (e) {
        A.log(h);
      }var v = M(C, f, [i], "prevState"),
          y = M(C, f, [f], "action"),
          b = M(C, f, [a, i], "error"),
          m = M(C, f, [c], "nextState");if (v) if (P.prevState) {
        var w = "color: " + P.prevState(i) + "; font-weight: bold";A[v]("%c prev state", w, i);
      } else A[v]("prev state", i);if (y) if (P.action) {
        var x = "color: " + P.action(f) + "; font-weight: bold";A[y]("%c action    ", x, f);
      } else A[y]("action    ", f);if (a && b) if (P.error) {
        var S = "color: " + P.error(a, i) + "; font-weight: bold;";A[b]("%c error     ", S, a);
      } else A[b]("error     ", a);if (m) if (P.nextState) {
        var j = "color: " + P.nextState(c) + "; font-weight: bold";A[m]("%c next state", j, c);
      } else A[m]("next state", c);F && function (e, t, n, r) {
        var o = T(e, t);try {
          r ? n.groupCollapsed("diff") : n.group("diff");
        } catch (e) {
          n.log("diff");
        }o ? o.forEach(function (e) {
          var t = e.kind,
              r = function (e) {
            var t = e.kind,
                r = e.path,
                n = e.lhs,
                o = e.rhs,
                i = e.index,
                a = e.item;switch (t) {case "E":
                return [r.join("."), n, "→", o];case "N":
                return [r.join("."), o];case "D":
                return [r.join(".")];case "A":
                return [r.join(".") + "[" + i + "]", a];default:
                return [];}
          }(e);n.log.apply(n, ["%c " + H[t].text, "color: " + H[t].color + "; font-weight: bold"].concat(G(r)));
        }) : n.log("—— no diff ——");try {
          n.groupEnd();
        } catch (e) {
          n.log("—— diff end —— ");
        }
      }(i, c, A, s);try {
        A.groupEnd();
      } catch (e) {
        A.log("—— log end ——");
      }
    });
  }function n() {
    var e = 0 < arguments.length && undefined !== arguments[0] ? arguments[0] : {},
        a = Object.assign({}, h, e),
        t = a.logger,
        l = a.stateTransformer,
        c = a.errorTransformer,
        u = a.predicate,
        f = a.logErrors,
        s = a.diffPredicate;if (undefined === t) return function () {
      return function (t) {
        return function (e) {
          return t(e);
        };
      };
    };if (e.getState && e.dispatch) return console.error("[redux-logger] redux-logger not installed. Make sure to pass logger instance as middleware:\n// Logger with default options\nimport { logger } from 'redux-logger'\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n// Or you can create your own logger with custom options http://bit.ly/redux-logger-options\nimport createLogger from 'redux-logger'\nconst logger = createLogger({\n  // ...options\n});\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n"), function () {
      return function (t) {
        return function (e) {
          return t(e);
        };
      };
    };var d = [];return function (e) {
      var i = e.getState;return function (o) {
        return function (e) {
          if ("function" == typeof u && !u(i, e)) return o(e);var t = {};d.push(t), t.started = g.now(), t.startedTime = new Date(), t.prevState = l(i()), t.action = e;var r = undefined;if (f) try {
            r = o(e);
          } catch (e) {
            t.error = c(e);
          } else r = o(e);t.took = g.now() - t.started, t.nextState = l(i());var n = a.diff && "function" == typeof s ? s(i, e) : a.diff;if (p(d, Object.assign({}, a, { diff: n })), d.length = 0, t.error) throw t.error;return r;
        };
      };
    };
  }function i(e, t) {
    return r = t - e.toString().length, new Array(1 + r).join("0") + e;var r;
  }var a,
      l,
      _ = function (e) {
    return i(e.getHours(), 2) + ":" + i(e.getMinutes(), 2) + ":" + i(e.getSeconds(), 2) + "." + i(e.getMilliseconds(), 3);
  },
      g = "undefined" != typeof performance && null !== performance && "function" == typeof performance.now ? performance : Date,
      j = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  },
      G = function (e) {
    if (Array.isArray(e)) {
      for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];return r;
    }return Array.from(e);
  },
      c = [];function u() {
    var e = 0 < arguments.length && undefined !== arguments[0] ? arguments[0] : {},
        t = e.dispatch,
        r = e.getState;return "function" == typeof t || "function" == typeof r ? n()({ dispatch: t, getState: r }) : undefined;
  }a = "object" === ("undefined" == typeof global ? "undefined" : j(global)) && global ? global : "undefined" != typeof window ? window : {}, (l = a.DeepDiff) && c.push(function () {
    undefined !== l && a.DeepDiff === T && (a.DeepDiff = l, l = undefined);
  }), t(v, r), t(y, r), t(b, r), t(m, r), Object.defineProperties(T, { diff: { value: T, enumerable: true }, observableDiff: { value: S, enumerable: true }, applyDiff: { value: function (t, r, n) {
        t && r && S(t, r, function (e) {
          n && !n(t, r, e) || o(t, r, e);
        });
      }, enumerable: true }, applyChange: { value: o, enumerable: true }, revertChange: { value: function (e, t, r) {
        if (e && t && r && r.kind) {
          var n,
              o,
              i = e;for (o = r.path.length - 1, n = 0; n < o; n++) undefined === i[r.path[n]] && (i[r.path[n]] = {}), i = i[r.path[n]];switch (r.kind) {case "A":
              !function e(t, r, n) {
                if (n.path && n.path.length) {
                  var o,
                      i = t[r],
                      a = n.path.length - 1;for (o = 0; o < a; o++) i = i[n.path[o]];switch (n.kind) {case "A":
                      e(i[n.path[o]], n.index, n.item);break;case "D":case "E":
                      i[n.path[o]] = n.lhs;break;case "N":
                      delete i[n.path[o]];}
                } else switch (n.kind) {case "A":
                    e(t[r], n.index, n.item);break;case "D":case "E":
                    t[r] = n.lhs;break;case "N":
                    t = w(t, r);}return t;
              }(i[r.path[n]], r.index, r.item);break;case "D":case "E":
              i[r.path[n]] = r.lhs;break;case "N":
              delete i[r.path[n]];}
        }
      }, enumerable: true }, isConflict: { value: function () {
        return undefined !== l;
      }, enumerable: true }, noConflict: { value: function () {
        return c && (c.forEach(function (e) {
          e();
        }), c = null), T;
      }, enumerable: true } });var H = { E: { color: "#2196F3", text: "CHANGED:" }, N: { color: "#4CAF50", text: "ADDED:" }, D: { color: "#F44336", text: "DELETED:" }, A: { color: "#2196F3", text: "ARRAY:" } },
      h = { level: "log", logger: console, logErrors: true, collapsed: undefined, predicate: undefined, duration: false, timestamp: true, stateTransformer: function (e) {
      return e;
    }, actionTransformer: function (e) {
      return e;
    }, errorTransformer: function (e) {
      return e;
    }, colors: { title: function () {
        return "inherit";
      }, prevState: function () {
        return "#9E9E9E";
      }, action: function () {
        return "#03A9F4";
      }, nextState: function () {
        return "#4CAF50";
      }, error: function () {
        return "#F20404";
      } }, diff: false, diffPredicate: undefined, transformer: undefined };e.defaults = h, e.createLogger = n, e.logger = u, e.default = u, Object.defineProperty(e, "__esModule", { value: true });
});