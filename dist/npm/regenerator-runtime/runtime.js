!function (t) {
  "use strict";
  var u,
      r = Object.prototype,
      h = r.hasOwnProperty,
      e = "function" == typeof Symbol ? Symbol : {},
      o = e.iterator || "@@iterator",
      n = e.asyncIterator || "@@asyncIterator",
      i = e.toStringTag || "@@toStringTag",
      a = "object" == typeof module,
      c = t.regeneratorRuntime;if (c) a && (module.exports = c);else {
    (c = t.regeneratorRuntime = a ? module.exports : {}).wrap = w;var f = "suspendedStart",
        l = "suspendedYield",
        p = "executing",
        y = "completed",
        v = {},
        s = {};s[o] = function () {
      return this;
    };var d = Object.getPrototypeOf,
        g = d && d(d(P([])));g && g !== r && h.call(g, o) && (s = g);var m = b.prototype = x.prototype = Object.create(s);E.prototype = m.constructor = b, b.constructor = E, b[i] = E.displayName = "GeneratorFunction", c.isGeneratorFunction = function (t) {
      var r = "function" == typeof t && t.constructor;return !!r && (r === E || "GeneratorFunction" === (r.displayName || r.name));
    }, c.mark = function (t) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(t, b) : (t.__proto__ = b, i in t || (t[i] = "GeneratorFunction")), t.prototype = Object.create(m), t;
    }, c.awrap = function (t) {
      return { __await: t };
    }, _(j.prototype), j.prototype[n] = function () {
      return this;
    }, c.AsyncIterator = j, c.async = function (t, r, e, n) {
      var o = new j(w(t, r, e, n));return c.isGeneratorFunction(r) ? o : o.next().then(function (t) {
        return t.done ? t.value : o.next();
      });
    }, _(m), m[i] = "Generator", m[o] = function () {
      return this;
    }, m.toString = function () {
      return "[object Generator]";
    }, c.keys = function (e) {
      var n = [];for (var t in e) n.push(t);return n.reverse(), function t() {
        for (; n.length;) {
          var r = n.pop();if (r in e) return t.value = r, t.done = false, t;
        }return t.done = true, t;
      };
    }, c.values = P, N.prototype = { constructor: N, reset: function (t) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = u, this.done = false, this.delegate = null, this.method = "next", this.arg = u, this.tryEntries.forEach(G), !t) for (var r in this) "t" === r.charAt(0) && h.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = u);
      }, stop: function () {
        this.done = true;var t = this.tryEntries[0].completion;if ("throw" === t.type) throw t.arg;return this.rval;
      }, dispatchException: function (e) {
        if (this.done) throw e;var n = this;function t(t, r) {
          return i.type = "throw", i.arg = e, n.next = t, r && (n.method = "next", n.arg = u), !!r;
        }for (var r = this.tryEntries.length - 1; 0 <= r; --r) {
          var o = this.tryEntries[r],
              i = o.completion;if ("root" === o.tryLoc) return t("end");if (o.tryLoc <= this.prev) {
            var a = h.call(o, "catchLoc"),
                c = h.call(o, "finallyLoc");if (a && c) {
              if (this.prev < o.catchLoc) return t(o.catchLoc, true);if (this.prev < o.finallyLoc) return t(o.finallyLoc);
            } else if (a) {
              if (this.prev < o.catchLoc) return t(o.catchLoc, true);
            } else {
              if (!c) throw new Error("try statement without catch or finally");if (this.prev < o.finallyLoc) return t(o.finallyLoc);
            }
          }
        }
      }, abrupt: function (t, r) {
        for (var e = this.tryEntries.length - 1; 0 <= e; --e) {
          var n = this.tryEntries[e];if (n.tryLoc <= this.prev && h.call(n, "finallyLoc") && this.prev < n.finallyLoc) {
            var o = n;break;
          }
        }o && ("break" === t || "continue" === t) && o.tryLoc <= r && r <= o.finallyLoc && (o = null);var i = o ? o.completion : {};return i.type = t, i.arg = r, o ? (this.method = "next", this.next = o.finallyLoc, v) : this.complete(i);
      }, complete: function (t, r) {
        if ("throw" === t.type) throw t.arg;return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && r && (this.next = r), v;
      }, finish: function (t) {
        for (var r = this.tryEntries.length - 1; 0 <= r; --r) {
          var e = this.tryEntries[r];if (e.finallyLoc === t) return this.complete(e.completion, e.afterLoc), G(e), v;
        }
      }, catch: function (t) {
        for (var r = this.tryEntries.length - 1; 0 <= r; --r) {
          var e = this.tryEntries[r];if (e.tryLoc === t) {
            var n = e.completion;if ("throw" === n.type) {
              var o = n.arg;G(e);
            }return o;
          }
        }throw new Error("illegal catch attempt");
      }, delegateYield: function (t, r, e) {
        return this.delegate = { iterator: P(t), resultName: r, nextLoc: e }, "next" === this.method && (this.arg = u), v;
      } };
  }function w(t, r, e, n) {
    var i,
        a,
        c,
        u,
        o = r && r.prototype instanceof x ? r : x,
        h = Object.create(o.prototype),
        s = new N(n || []);return h._invoke = (i = t, a = e, c = s, u = f, function (t, r) {
      if (u === p) throw new Error("Generator is already running");if (u === y) {
        if ("throw" === t) throw r;return F();
      }for (c.method = t, c.arg = r;;) {
        var e = c.delegate;if (e) {
          var n = O(e, c);if (n) {
            if (n === v) continue;return n;
          }
        }if ("next" === c.method) c.sent = c._sent = c.arg;else if ("throw" === c.method) {
          if (u === f) throw u = y, c.arg;c.dispatchException(c.arg);
        } else "return" === c.method && c.abrupt("return", c.arg);u = p;var o = L(i, a, c);if ("normal" === o.type) {
          if (u = c.done ? y : l, o.arg === v) continue;return { value: o.arg, done: c.done };
        }"throw" === o.type && (u = y, c.method = "throw", c.arg = o.arg);
      }
    }), h;
  }function L(t, r, e) {
    try {
      return { type: "normal", arg: t.call(r, e) };
    } catch (t) {
      return { type: "throw", arg: t };
    }
  }function x() {}function E() {}function b() {}function _(t) {
    ["next", "throw", "return"].forEach(function (r) {
      t[r] = function (t) {
        return this._invoke(r, t);
      };
    });
  }function j(u) {
    var r;this._invoke = function (e, n) {
      function t() {
        return new Promise(function (t, r) {
          !function r(t, e, n, o) {
            var i = L(u[t], u, e);if ("throw" !== i.type) {
              var a = i.arg,
                  c = a.value;return c && "object" == typeof c && h.call(c, "__await") ? Promise.resolve(c.__await).then(function (t) {
                r("next", t, n, o);
              }, function (t) {
                r("throw", t, n, o);
              }) : Promise.resolve(c).then(function (t) {
                a.value = t, n(a);
              }, o);
            }o(i.arg);
          }(e, n, t, r);
        });
      }return r = r ? r.then(t, t) : t();
    };
  }function O(t, r) {
    var e = t.iterator[r.method];if (e === u) {
      if (r.delegate = null, "throw" === r.method) {
        if (t.iterator.return && (r.method = "return", r.arg = u, O(t, r), "throw" === r.method)) return v;r.method = "throw", r.arg = new TypeError("The iterator does not provide a 'throw' method");
      }return v;
    }var n = L(e, t.iterator, r.arg);if ("throw" === n.type) return r.method = "throw", r.arg = n.arg, r.delegate = null, v;var o = n.arg;return o ? o.done ? (r[t.resultName] = o.value, r.next = t.nextLoc, "return" !== r.method && (r.method = "next", r.arg = u), r.delegate = null, v) : o : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, v);
  }function k(t) {
    var r = { tryLoc: t[0] };1 in t && (r.catchLoc = t[1]), 2 in t && (r.finallyLoc = t[2], r.afterLoc = t[3]), this.tryEntries.push(r);
  }function G(t) {
    var r = t.completion || {};r.type = "normal", delete r.arg, t.completion = r;
  }function N(t) {
    this.tryEntries = [{ tryLoc: "root" }], t.forEach(k, this), this.reset(true);
  }function P(r) {
    if (r) {
      var t = r[o];if (t) return t.call(r);if ("function" == typeof r.next) return r;if (!isNaN(r.length)) {
        var e = -1,
            n = function t() {
          for (; ++e < r.length;) if (h.call(r, e)) return t.value = r[e], t.done = false, t;return t.value = u, t.done = true, t;
        };return n.next = n;
      }
    }return { next: F };
  }function F() {
    return { value: u, done: true };
  }
}(function () {
  return this;
}() || Function("return this")());