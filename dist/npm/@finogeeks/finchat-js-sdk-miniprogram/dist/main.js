!function (e, t) {
  if ("object" == typeof exports && "object" == typeof module) module.exports = t();else if ("function" == typeof define && define.amd) define([], t);else {
    var n = t();for (var r in n) ("object" == typeof exports ? exports : e)[r] = n[r];
  }
}(window, function () {
  return r = {}, o.m = n = [function (e, t) {
    var n = e.exports = { version: "2.6.1" };"number" == typeof __e && (__e = n);
  }, function (e, t, n) {
    "use strict";
    var r = i(n(41)),
        s = i(n(23)),
        o = i(n(35));function i(e) {
      return e && e.__esModule ? e : { default: e };
    }e.exports.encodeParams = function (e) {
      var t = "";for (var n in e) e.hasOwnProperty(n) && (t += "&" + encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));return t.substring(1);
    }, e.exports.encodeUri = function (e, t) {
      for (var n in t) t.hasOwnProperty(n) && (e = e.replace(n, encodeURIComponent(t[n])));return e;
    }, e.exports.map = function (e, t) {
      for (var n = new Array(e.length), r = 0; r < e.length; r++) n[r] = t(e[r]);return n;
    }, e.exports.filter = function (e, t) {
      for (var n = [], r = 0; r < e.length; r++) t(e[r], r, e) && n.push(e[r]);return n;
    }, e.exports.keys = function (e) {
      var t = [];for (var n in e) e.hasOwnProperty(n) && t.push(n);return t;
    }, e.exports.values = function (e) {
      var t = [];for (var n in e) e.hasOwnProperty(n) && t.push(e[n]);return t;
    }, e.exports.forEach = function (e, t) {
      for (var n = 0; n < e.length; n++) t(e[n], n);
    }, e.exports.findElement = function (e, t, n) {
      var r = undefined;if (n) {
        for (r = e.length - 1; 0 <= r; r--) if (t(e[r], r, e)) return e[r];
      } else for (r = 0; r < e.length; r++) if (t(e[r], r, e)) return e[r];
    }, e.exports.removeElement = function (e, t, n) {
      var r = undefined,
          o = undefined;if (n) {
        for (r = e.length - 1; 0 <= r; r--) if (t(e[r], r, e)) return o = e[r], e.splice(r, 1), o;
      } else for (r = 0; r < e.length; r++) if (t(e[r], r, e)) return o = e[r], e.splice(r, 1), o;return false;
    }, e.exports.isFunction = function (e) {
      return "[object Function]" == Object.prototype.toString.call(e);
    }, e.exports.isArray = function (e) {
      return Array.isArray ? Array.isArray(e) : Boolean(e && e.constructor === Array);
    }, e.exports.checkObjectHasKeys = function (e, t) {
      for (var n = 0; n < t.length; n++) if (!e.hasOwnProperty(t[n])) throw new Error("Missing required key: " + t[n]);
    }, e.exports.checkObjectHasNoAdditionalKeys = function (e, t) {
      for (var n in e) if (e.hasOwnProperty(n) && -1 === t.indexOf(n)) throw new Error("Unknown key: " + n);
    }, e.exports.deepCopy = function (e) {
      return JSON.parse((0, o.default)(e));
    };var a = e.exports.deepCompare = function (e, t) {
      if (e === t) return true;if ((undefined === e ? "undefined" : (0, s.default)(e)) !== (undefined === t ? "undefined" : (0, s.default)(t))) return false;if ("number" == typeof e && isNaN(e) && isNaN(t)) return true;if (null === e || null === t) return e === t;if (!(e instanceof Object)) return false;if (e.constructor !== t.constructor || e.prototype !== t.prototype) return false;if (e instanceof RegExp || e instanceof Date) return e.toString() === t.toString();if (e instanceof Array) {
        if (e.length !== t.length) return false;for (var n = 0; n < e.length; n++) if (!a(e[n], t[n])) return false;
      } else {
        var r = undefined;for (r in t) if (t.hasOwnProperty(r) !== e.hasOwnProperty(r)) return false;for (r in t) {
          if (t.hasOwnProperty(r) !== e.hasOwnProperty(r)) return false;if (!a(e[r], t[r])) return false;
        }
      }return true;
    };e.exports.extend = function () {
      for (var e = arguments[0] || {}, t = 1; t < arguments.length; t++) {
        var n = arguments[t];for (var r in n) e[r] = n[r];
      }return e;
    }, e.exports.runPolyfills = function () {
      Array.prototype.filter || (Array.prototype.filter = function (e) {
        if (null == this) throw new TypeError();var t = Object(this),
            n = t.length >>> 0;if ("function" != typeof e) throw new TypeError();for (var r = [], o = 2 <= arguments.length ? arguments[1] : undefined, i = 0; i < n; i++) if (i in t) {
          var s = t[i];e.call(o, s, i, t) && r.push(s);
        }return r;
      }), Array.prototype.map || (Array.prototype.map = function (e, t) {
        var n = undefined,
            r = undefined;if (null == this) throw new TypeError(" this is null or not defined");var o = Object(this),
            i = o.length >>> 0;if ("function" != typeof e) throw new TypeError(e + " is not a function");1 < arguments.length && (n = t);var s = new Array(i);for (r = 0; r < i;) {
          var a, u;r in o && (a = o[r], u = e.call(n, a, r, o), s[r] = u), r++;
        }return s;
      }), Array.prototype.forEach || (Array.prototype.forEach = function (e, t) {
        var n = undefined,
            r = undefined;if (null == this) throw new TypeError(" this is null or not defined");var o = Object(this),
            i = o.length >>> 0;if ("function" != typeof e) throw new TypeError(e + " is not a function");for (1 < arguments.length && (n = t), r = 0; r < i;) {
          var s;r in o && (s = o[r], e.call(n, s, r, o)), r++;
        }
      });
    }, e.exports.inherits = function (e, t) {
      function o() {}var i;"function" != typeof r.default && (Object.create = (i = Object.prototype.hasOwnProperty, function (e) {
        if ("object" != (undefined === e ? "undefined" : (0, s.default)(e))) throw new TypeError("Object prototype may only be an Object or null");o.prototype = e;var t = new o();if (o.prototype = null, 1 < arguments.length) {
          var n = Object(arguments[1]);for (var r in n) i.call(n, r) && (t[r] = n[r]);
        }return t;
      })), e.super_ = t, e.prototype = (0, r.default)(t.prototype, { constructor: { value: e, enumerable: false, writable: true, configurable: true } });
    }, e.exports.isNumber = function (e) {
      return "number" == typeof e && isFinite(e);
    }, e.exports.removeHiddenChars = function (t) {
      try {
        return t.normalize("NFD").replace(u, "");
      } catch (e) {
        return t.replace(u, "");
      }
    };var u = /[\u200B-\u200D\u0300-\u036f\uFEFF\s]/g;
  }, function (e, t, n) {
    var v = n(3),
        m = n(0),
        y = n(13),
        _ = n(14),
        g = n(18),
        b = function (e, t, n) {
      var r,
          o,
          i,
          s = e & b.F,
          a = e & b.G,
          u = e & b.S,
          c = e & b.P,
          l = e & b.B,
          p = e & b.W,
          f = a ? m : m[t] || (m[t] = {}),
          h = f.prototype,
          d = a ? v : u ? v[t] : (v[t] || {}).prototype;for (r in a && (n = t), n) (o = !s && d && undefined !== d[r]) && g(f, r) || (i = o ? d[r] : n[r], f[r] = a && "function" != typeof d[r] ? n[r] : l && o ? y(i, v) : p && d[r] == i ? function (r) {
        function e(e, t, n) {
          if (this instanceof r) {
            switch (arguments.length) {case 0:
                return new r();case 1:
                return new r(e);case 2:
                return new r(e, t);}return new r(e, t, n);
          }return r.apply(this, arguments);
        }return e.prototype = r.prototype, e;
      }(i) : c && "function" == typeof i ? y(Function.call, i) : i, c && ((f.virtual || (f.virtual = {}))[r] = i, e & b.R && h && !h[r] && _(h, r, i)));
    };b.F = 1, b.G = 2, b.S = 4, b.P = 8, b.B = 16, b.W = 32, b.U = 64, b.R = 128, e.exports = b;
  }, function (e, t) {
    var n = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();"number" == typeof __g && (__g = n);
  }, function (e, t) {
    e.exports = function (e) {
      return "object" == typeof e ? null !== e : "function" == typeof e;
    };
  }, function (e, t, n) {
    var r = n(54)("wks"),
        o = n(37),
        i = n(3).Symbol,
        s = "function" == typeof i;(e.exports = function (e) {
      return r[e] || (r[e] = s && i[e] || (s ? i : o)("Symbol." + e));
    }).store = r;
  }, function (e, t, n) {
    var r = n(4);e.exports = function (e) {
      if (!r(e)) throw TypeError(e + " is not an object!");return e;
    };
  }, function (t, e, n) {
    (function (Z, x, h) {
      var e;e = function () {
        return function i(s, a, u) {
          function c(t, e) {
            if (!a[t]) {
              if (!s[t]) {
                var n = "function" == typeof _dereq_ && _dereq_;if (!e && n) return n(t, true);if (l) return l(t, true);var r = new Error("Cannot find module '" + t + "'");throw r.code = "MODULE_NOT_FOUND", r;
              }var o = a[t] = { exports: {} };s[t][0].call(o.exports, function (e) {
                return c(s[t][1][e] || e);
              }, o, o.exports, i, s, a, u);
            }return a[t].exports;
          }for (var l = "function" == typeof _dereq_ && _dereq_, e = 0; e < u.length; e++) c(u[e]);return c;
        }({ 1: [function (e, t, n) {
            "use strict";
            t.exports = function (e) {
              var r = e._SomePromiseArray;function t(e) {
                var t = new r(e),
                    n = t.promise();return t.setHowMany(1), t.setUnwrap(), t.init(), n;
              }e.any = function (e) {
                return t(e);
              }, e.prototype.any = function () {
                return t(this);
              };
            };
          }, {}], 2: [function (e, t, n) {
            "use strict";
            var r;try {
              throw new Error();
            } catch (e) {
              r = e;
            }var o = e("./schedule"),
                i = e("./queue"),
                s = e("./util");function a() {
              this._customScheduler = false, this._isTickUsed = false, this._lateQueue = new i(16), this._normalQueue = new i(16), this._haveDrainedQueues = false, this._trampolineEnabled = true;var e = this;this.drainQueues = function () {
                e._drainQueues();
              }, this._schedule = o;
            }function u(e, t, n) {
              this._lateQueue.push(e, t, n), this._queueTick();
            }function c(e, t, n) {
              this._normalQueue.push(e, t, n), this._queueTick();
            }function l(e) {
              this._normalQueue._pushOne(e), this._queueTick();
            }function p(e) {
              for (; 0 < e.length();) f(e);
            }function f(e) {
              var t = e.shift();if ("function" != typeof t) t._settlePromises();else {
                var n = e.shift(),
                    r = e.shift();t.call(n, r);
              }
            }a.prototype.setScheduler = function (e) {
              var t = this._schedule;return this._schedule = e, this._customScheduler = true, t;
            }, a.prototype.hasCustomScheduler = function () {
              return this._customScheduler;
            }, a.prototype.enableTrampoline = function () {
              this._trampolineEnabled = true;
            }, a.prototype.disableTrampolineIfNecessary = function () {
              s.hasDevTools && (this._trampolineEnabled = false);
            }, a.prototype.haveItemsQueued = function () {
              return this._isTickUsed || this._haveDrainedQueues;
            }, a.prototype.fatalError = function (e, t) {
              t ? (Z.stderr.write("Fatal " + (e instanceof Error ? e.stack : e) + "\n"), Z.exit(2)) : this.throwLater(e);
            }, a.prototype.throwLater = function (e, t) {
              if (1 === arguments.length && (t = e, e = function () {
                throw t;
              }), "undefined" != typeof setTimeout) setTimeout(function () {
                e(t);
              }, 0);else try {
                this._schedule(function () {
                  e(t);
                });
              } catch (e) {
                throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n");
              }
            }, a.prototype.settlePromises = s.hasDevTools ? (a.prototype.invokeLater = function (e, t, n) {
              this._trampolineEnabled ? u.call(this, e, t, n) : this._schedule(function () {
                setTimeout(function () {
                  e.call(t, n);
                }, 100);
              });
            }, a.prototype.invoke = function (e, t, n) {
              this._trampolineEnabled ? c.call(this, e, t, n) : this._schedule(function () {
                e.call(t, n);
              });
            }, function (e) {
              this._trampolineEnabled ? l.call(this, e) : this._schedule(function () {
                e._settlePromises();
              });
            }) : (a.prototype.invokeLater = u, a.prototype.invoke = c, l), a.prototype._drainQueues = function () {
              p(this._normalQueue), this._reset(), this._haveDrainedQueues = true, p(this._lateQueue);
            }, a.prototype._queueTick = function () {
              this._isTickUsed || (this._isTickUsed = true, this._schedule(this.drainQueues));
            }, a.prototype._reset = function () {
              this._isTickUsed = false;
            }, t.exports = a, t.exports.firstLineError = r;
          }, { "./queue": 26, "./schedule": 29, "./util": 36 }], 3: [function (e, t, n) {
            "use strict";
            t.exports = function (i, s, a, u) {
              function n(e, t) {
                this._reject(t);
              }function c(e, t) {
                t.promiseRejectionQueued = true, t.bindingPromise._then(n, n, null, this, e);
              }function l(e, t) {
                0 == (50397184 & this._bitField) && this._resolveCallback(t.target);
              }function p(e, t) {
                t.promiseRejectionQueued || this._reject(e);
              }var f = false;i.prototype.bind = function (e) {
                f || (f = true, i.prototype._propagateFrom = u.propagateFromFunction(), i.prototype._boundValue = u.boundValueFunction());var t = a(e),
                    n = new i(s);n._propagateFrom(this, 1);var r = this._target();if (n._setBoundTo(t), t instanceof i) {
                  var o = { promiseRejectionQueued: false, promise: n, target: r, bindingPromise: t };r._then(s, c, undefined, n, o), t._then(l, p, undefined, n, o), n._setOnCancel(t);
                } else n._resolveCallback(r);return n;
              }, i.prototype._setBoundTo = function (e) {
                undefined !== e ? (this._bitField = 2097152 | this._bitField, this._boundTo = e) : this._bitField = -2097153 & this._bitField;
              }, i.prototype._isBound = function () {
                return 2097152 == (2097152 & this._bitField);
              }, i.bind = function (e, t) {
                return i.resolve(t).bind(e);
              };
            };
          }, {}], 4: [function (e, t, n) {
            "use strict";
            var r;"undefined" != typeof Promise && (r = Promise);var o = e("./promise")();o.noConflict = function () {
              try {
                Promise === o && (Promise = r);
              } catch (e) {}return o;
            }, t.exports = o;
          }, { "./promise": 22 }], 5: [function (e, t, n) {
            "use strict";
            var r = Object.create;if (r) {
              var o = r(null),
                  i = r(null);o[" size"] = i[" size"] = 0;
            }t.exports = function (o) {
              var i = e("./util"),
                  r = i.canEvaluate;function n(e) {
                return function (e, t) {
                  var n;if (null != e && (n = e[t]), "function" == typeof n) return n;var r = "Object " + i.classString(e) + " has no method '" + i.toString(t) + "'";throw new o.TypeError(r);
                }(e, this.pop()).apply(e, this);
              }function s(e) {
                return e[this];
              }function a(e) {
                var t = +this;return t < 0 && (t = Math.max(0, t + e.length)), e[t];
              }i.isIdentifier, o.prototype.call = function (e) {
                var t = [].slice.call(arguments, 1);return t.push(e), this._then(n, undefined, undefined, t, undefined);
              }, o.prototype.get = function (e) {
                var t;if ("number" == typeof e) t = a;else if (r) {
                  var n = undefined(e);t = null !== n ? n : s;
                } else t = s;return this._then(t, undefined, undefined, e, undefined);
              };
            };
          }, { "./util": 36 }], 6: [function (u, e, t) {
            "use strict";
            e.exports = function (e, t, n, r) {
              var o = u("./util"),
                  i = o.tryCatch,
                  s = o.errorObj,
                  a = e._async;e.prototype.break = e.prototype.cancel = function () {
                if (!r.cancellation()) return this._warn("cancellation is disabled");for (var e = this, t = e; e._isCancellable();) {
                  if (!e._cancelBy(t)) {
                    t._isFollowing() ? t._followee().cancel() : t._cancelBranched();break;
                  }var n = e._cancellationParent;if (null == n || !n._isCancellable()) {
                    e._isFollowing() ? e._followee().cancel() : e._cancelBranched();break;
                  }e._isFollowing() && e._followee().cancel(), e._setWillBeCancelled(), t = e, e = n;
                }
              }, e.prototype._branchHasCancelled = function () {
                this._branchesRemainingToCancel--;
              }, e.prototype._enoughBranchesHaveCancelled = function () {
                return undefined === this._branchesRemainingToCancel || this._branchesRemainingToCancel <= 0;
              }, e.prototype._cancelBy = function (e) {
                return e === this ? (this._branchesRemainingToCancel = 0, this._invokeOnCancel(), true) : (this._branchHasCancelled(), !!this._enoughBranchesHaveCancelled() && (this._invokeOnCancel(), true));
              }, e.prototype._cancelBranched = function () {
                this._enoughBranchesHaveCancelled() && this._cancel();
              }, e.prototype._cancel = function () {
                this._isCancellable() && (this._setCancelled(), a.invoke(this._cancelPromises, this, undefined));
              }, e.prototype._cancelPromises = function () {
                0 < this._length() && this._settlePromises();
              }, e.prototype._unsetOnCancel = function () {
                this._onCancelField = undefined;
              }, e.prototype._isCancellable = function () {
                return this.isPending() && !this._isCancelled();
              }, e.prototype.isCancellable = function () {
                return this.isPending() && !this.isCancelled();
              }, e.prototype._doInvokeOnCancel = function (e, t) {
                if (o.isArray(e)) for (var n = 0; n < e.length; ++n) this._doInvokeOnCancel(e[n], t);else if (undefined !== e) if ("function" == typeof e) {
                  if (!t) {
                    var r = i(e).call(this._boundValue());r === s && (this._attachExtraTrace(r.e), a.throwLater(r.e));
                  }
                } else e._resultCancelled(this);
              }, e.prototype._invokeOnCancel = function () {
                var e = this._onCancel();this._unsetOnCancel(), a.invoke(this._doInvokeOnCancel, this, e);
              }, e.prototype._invokeInternalOnCancel = function () {
                this._isCancellable() && (this._doInvokeOnCancel(this._onCancel(), true), this._unsetOnCancel());
              }, e.prototype._resultCancelled = function () {
                this.cancel();
              };
            };
          }, { "./util": 36 }], 7: [function (e, t, n) {
            "use strict";
            t.exports = function (p) {
              var f = e("./util"),
                  h = e("./es5").keys,
                  d = f.tryCatch,
                  v = f.errorObj;return function (u, c, l) {
                return function (e) {
                  var t = l._boundValue();e: for (var n = 0; n < u.length; ++n) {
                    var r = u[n];if (r === Error || null != r && r.prototype instanceof Error) {
                      if (e instanceof r) return d(c).call(t, e);
                    } else if ("function" == typeof r) {
                      var o = d(r).call(t, e);if (o === v) return o;if (o) return d(c).call(t, e);
                    } else if (f.isObject(e)) {
                      for (var i = h(r), s = 0; s < i.length; ++s) {
                        var a = i[s];if (r[a] != e[a]) continue e;
                      }return d(c).call(t, e);
                    }
                  }return p;
                };
              };
            };
          }, { "./es5": 13, "./util": 36 }], 8: [function (e, t, n) {
            "use strict";
            t.exports = function (i) {
              var s = false,
                  n = [];function a() {
                this._trace = new a.CapturedTrace(u());
              }function u() {
                var e = n.length - 1;if (0 <= e) return n[e];
              }return i.prototype._promiseCreated = function () {}, i.prototype._pushContext = function () {}, i.prototype._popContext = function () {
                return null;
              }, i._peekContext = i.prototype._peekContext = function () {}, a.prototype._pushContext = function () {
                undefined !== this._trace && (this._trace._promiseCreated = null, n.push(this._trace));
              }, a.prototype._popContext = function () {
                if (undefined === this._trace) return null;var e = n.pop(),
                    t = e._promiseCreated;return e._promiseCreated = null, t;
              }, a.CapturedTrace = null, a.create = function () {
                if (s) return new a();
              }, a.deactivateLongStackTraces = function () {}, a.activateLongStackTraces = function () {
                var e = i.prototype._pushContext,
                    t = i.prototype._popContext,
                    n = i._peekContext,
                    r = i.prototype._peekContext,
                    o = i.prototype._promiseCreated;a.deactivateLongStackTraces = function () {
                  i.prototype._pushContext = e, i.prototype._popContext = t, i._peekContext = n, i.prototype._peekContext = r, i.prototype._promiseCreated = o, s = false;
                }, s = true, i.prototype._pushContext = a.prototype._pushContext, i.prototype._popContext = a.prototype._popContext, i._peekContext = i.prototype._peekContext = u, i.prototype._promiseCreated = function () {
                  var e = this._peekContext();e && null == e._promiseCreated && (e._promiseCreated = this);
                };
              }, a;
            };
          }, {}], 9: [function (Y, e, t) {
            "use strict";
            e.exports = function (s, r) {
              var n,
                  o,
                  i,
                  a = s._getDomain,
                  u = s._async,
                  c = Y("./errors").Warning,
                  l = Y("./util"),
                  p = Y("./es5"),
                  f = l.canAttachTrace,
                  h = /[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/,
                  d = /\((?:timers\.js):\d+:\d+\)/,
                  v = /[\/<\(](.+?):(\d+):(\d+)\)?\s*$/,
                  m = null,
                  y = null,
                  _ = false,
                  e = !(0 == l.env("BLUEBIRD_DEBUG")),
                  t = !(0 == l.env("BLUEBIRD_WARNINGS") || !e && !l.env("BLUEBIRD_WARNINGS")),
                  g = !(0 == l.env("BLUEBIRD_LONG_STACK_TRACES") || !e && !l.env("BLUEBIRD_LONG_STACK_TRACES")),
                  b = 0 != l.env("BLUEBIRD_W_FORGOTTEN_RETURN") && (t || !!l.env("BLUEBIRD_W_FORGOTTEN_RETURN"));s.prototype.suppressUnhandledRejections = function () {
                var e = this._target();e._bitField = -1048577 & e._bitField | 524288;
              }, s.prototype._ensurePossibleRejectionHandled = function () {
                if (0 == (524288 & this._bitField)) {
                  this._setRejectionIsUnhandled();var e = this;setTimeout(function () {
                    e._notifyUnhandledRejection();
                  }, 1);
                }
              }, s.prototype._notifyUnhandledRejectionIsHandled = function () {
                G("rejectionHandled", n, undefined, this);
              }, s.prototype._setReturnedNonUndefined = function () {
                this._bitField = 268435456 | this._bitField;
              }, s.prototype._returnedNonUndefined = function () {
                return 0 != (268435456 & this._bitField);
              }, s.prototype._notifyUnhandledRejection = function () {
                if (this._isRejectionUnhandled()) {
                  var e = this._settledValue();this._setUnhandledRejectionIsNotified(), G("unhandledRejection", o, e, this);
                }
              }, s.prototype._setUnhandledRejectionIsNotified = function () {
                this._bitField = 262144 | this._bitField;
              }, s.prototype._unsetUnhandledRejectionIsNotified = function () {
                this._bitField = -262145 & this._bitField;
              }, s.prototype._isUnhandledRejectionNotified = function () {
                return 0 < (262144 & this._bitField);
              }, s.prototype._setRejectionIsUnhandled = function () {
                this._bitField = 1048576 | this._bitField;
              }, s.prototype._unsetRejectionIsUnhandled = function () {
                this._bitField = -1048577 & this._bitField, this._isUnhandledRejectionNotified() && (this._unsetUnhandledRejectionIsNotified(), this._notifyUnhandledRejectionIsHandled());
              }, s.prototype._isRejectionUnhandled = function () {
                return 0 < (1048576 & this._bitField);
              }, s.prototype._warn = function (e, t, n) {
                return N(e, t, n || this);
              }, s.onPossiblyUnhandledRejection = function (e) {
                var t = a();o = "function" == typeof e ? null === t ? e : l.domainBind(t, e) : undefined;
              }, s.onUnhandledRejectionHandled = function (e) {
                var t = a();n = "function" == typeof e ? null === t ? e : l.domainBind(t, e) : undefined;
              };var E = function () {};s.longStackTraces = function () {
                if (u.haveItemsQueued() && !X.longStackTraces) throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");if (!X.longStackTraces && H()) {
                  var e = s.prototype._captureStackTrace,
                      t = s.prototype._attachExtraTrace,
                      n = s.prototype._dereferenceTrace;X.longStackTraces = true, E = function () {
                    if (u.haveItemsQueued() && !X.longStackTraces) throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");s.prototype._captureStackTrace = e, s.prototype._attachExtraTrace = t, s.prototype._dereferenceTrace = n, r.deactivateLongStackTraces(), u.enableTrampoline(), X.longStackTraces = false;
                  }, s.prototype._captureStackTrace = D, s.prototype._attachExtraTrace = U, s.prototype._dereferenceTrace = L, r.activateLongStackTraces(), u.disableTrampolineIfNecessary();
                }
              }, s.hasLongStackTraces = function () {
                return X.longStackTraces && H();
              };var S = function () {
                try {
                  if ("function" != typeof CustomEvent) return "function" == typeof Event ? (e = new Event("CustomEvent"), l.global.dispatchEvent(e), function (e, t) {
                    var n = new Event(e.toLowerCase(), { cancelable: true });return n.detail = t, p.defineProperty(n, "promise", { value: t.promise }), p.defineProperty(n, "reason", { value: t.reason }), !l.global.dispatchEvent(n);
                  }) : ((e = document.createEvent("CustomEvent")).initCustomEvent("testingtheevent", false, true, {}), l.global.dispatchEvent(e), function (e, t) {
                    var n = document.createEvent("CustomEvent");return n.initCustomEvent(e.toLowerCase(), false, true, t), !l.global.dispatchEvent(n);
                  });var e = new CustomEvent("CustomEvent");return l.global.dispatchEvent(e), function (e, t) {
                    var n = { detail: t, cancelable: true };p.defineProperty(n, "promise", { value: t.promise }), p.defineProperty(n, "reason", { value: t.reason });var r = new CustomEvent(e.toLowerCase(), n);return !l.global.dispatchEvent(r);
                  };
                } catch (e) {}return function () {
                  return false;
                };
              }(),
                  w = l.isNode ? function () {
                return Z.emit.apply(Z, arguments);
              } : l.global ? function (e) {
                var t = "on" + e.toLowerCase(),
                    n = l.global[t];return !!n && (n.apply(l.global, [].slice.call(arguments, 1)), true);
              } : function () {
                return false;
              };function T(e, t) {
                return { promise: t };
              }var x = { promiseCreated: T, promiseFulfilled: T, promiseRejected: T, promiseResolved: T, promiseCancelled: T, promiseChained: function (e, t, n) {
                  return { promise: t, child: n };
                }, warning: function (e, t) {
                  return { warning: t };
                }, unhandledRejection: function (e, t, n) {
                  return { reason: t, promise: n };
                }, rejectionHandled: T },
                  k = function (e) {
                var t = false;try {
                  t = w.apply(null, arguments);
                } catch (e) {
                  u.throwLater(e), t = true;
                }var n = false;try {
                  n = S(e, x[e].apply(null, arguments));
                } catch (e) {
                  u.throwLater(e), n = true;
                }return n || t;
              };function R() {
                return false;
              }function I(e, t, n) {
                var r = this;try {
                  e(t, n, function (e) {
                    if ("function" != typeof e) throw new TypeError("onCancel must be a function, got: " + l.toString(e));r._attachCancellationCallback(e);
                  });
                } catch (e) {
                  return e;
                }
              }function C(e) {
                if (!this._isCancellable()) return this;var t = this._onCancel();undefined !== t ? l.isArray(t) ? t.push(e) : this._setOnCancel([t, e]) : this._setOnCancel(e);
              }function O() {
                return this._onCancelField;
              }function P(e) {
                this._onCancelField = e;
              }function j() {
                this._cancellationParent = undefined, this._onCancelField = undefined;
              }function A(e, t) {
                if (0 != (1 & t)) {
                  var n = (this._cancellationParent = e)._branchesRemainingToCancel;undefined === n && (n = 0), e._branchesRemainingToCancel = n + 1;
                }0 != (2 & t) && e._isBound() && this._setBoundTo(e._boundTo);
              }s.config = function (e) {
                if ("longStackTraces" in (e = Object(e)) && (e.longStackTraces ? s.longStackTraces() : !e.longStackTraces && s.hasLongStackTraces() && E()), "warnings" in e) {
                  var t = e.warnings;X.warnings = !!t, b = X.warnings, l.isObject(t) && "wForgottenReturn" in t && (b = !!t.wForgottenReturn);
                }if ("cancellation" in e && e.cancellation && !X.cancellation) {
                  if (u.haveItemsQueued()) throw new Error("cannot enable cancellation after promises are in use");s.prototype._clearCancellationData = j, s.prototype._propagateFrom = A, s.prototype._onCancel = O, s.prototype._setOnCancel = P, s.prototype._attachCancellationCallback = C, s.prototype._execute = I, M = A, X.cancellation = true;
                }return "monitoring" in e && (e.monitoring && !X.monitoring ? (X.monitoring = true, s.prototype._fireEvent = k) : !e.monitoring && X.monitoring && (X.monitoring = false, s.prototype._fireEvent = R)), s;
              }, s.prototype._fireEvent = R, s.prototype._execute = function (e, t, n) {
                try {
                  e(t, n);
                } catch (e) {
                  return e;
                }
              }, s.prototype._onCancel = function () {}, s.prototype._setOnCancel = function (e) {}, s.prototype._attachCancellationCallback = function (e) {}, s.prototype._captureStackTrace = function () {}, s.prototype._attachExtraTrace = function () {}, s.prototype._dereferenceTrace = function () {}, s.prototype._clearCancellationData = function () {}, s.prototype._propagateFrom = function (e, t) {};var M = function (e, t) {
                0 != (2 & t) && e._isBound() && this._setBoundTo(e._boundTo);
              };function F() {
                var e = this._boundTo;return undefined !== e && e instanceof s ? e.isFulfilled() ? e.value() : undefined : e;
              }function D() {
                this._trace = new J(this._peekContext());
              }function U(e, t) {
                if (f(e)) {
                  var n = this._trace;if (undefined !== n && t && (n = n._parent), undefined !== n) n.attachExtraTrace(e);else if (!e.__stackCleaned__) {
                    var r = B(e);l.notEnumerableProp(e, "stack", r.message + "\n" + r.stack.join("\n")), l.notEnumerableProp(e, "__stackCleaned__", true);
                  }
                }
              }function L() {
                this._trace = undefined;
              }function N(e, t, n) {
                if (X.warnings) {
                  var r,
                      o = new c(e);if (t) n._attachExtraTrace(o);else if (X.longStackTraces && (r = s._peekContext())) r.attachExtraTrace(o);else {
                    var i = B(o);o.stack = i.message + "\n" + i.stack.join("\n");
                  }k("warning", o) || $(o, "", true);
                }
              }function q(e) {
                for (var t = [], n = 0; n < e.length; ++n) {
                  var r = e[n],
                      o = "    (No stack trace)" === r || m.test(r),
                      i = o && W(r);o && !i && (_ && " " !== r.charAt(0) && (r = "    " + r), t.push(r));
                }return t;
              }function B(e) {
                var t = e.stack,
                    n = e.toString();return t = "string" == typeof t && 0 < t.length ? function (e) {
                  for (var t = e.stack.replace(/\s+$/g, "").split("\n"), n = 0; n < t.length; ++n) {
                    var r = t[n];if ("    (No stack trace)" === r || m.test(r)) break;
                  }return 0 < n && "SyntaxError" != e.name && (t = t.slice(n)), t;
                }(e) : ["    (No stack trace)"], { message: n, stack: "SyntaxError" == e.name ? t : q(t) };
              }function $(e, t, n) {
                if ("undefined" != typeof console) {
                  var r;if (l.isObject(e)) {
                    var o = e.stack;r = t + y(o, e);
                  } else r = t + String(e);"function" == typeof i ? i(r, n) : "function" != typeof console.log && "object" != typeof console.log || console.log(r);
                }
              }function G(e, t, n, r) {
                var o = false;try {
                  "function" == typeof t && (o = true, "rejectionHandled" === e ? t(r) : t(n, r));
                } catch (e) {
                  u.throwLater(e);
                }"unhandledRejection" === e ? k(e, n, r) || o || $(n, "Unhandled rejection ") : k(e, r);
              }function K(e) {
                var t, n;if ("function" == typeof e) t = "[function " + (e.name || "anonymous") + "]";else {
                  if (t = e && "function" == typeof e.toString ? e.toString() : l.toString(e), /\[object [a-zA-Z0-9$_]+\]/.test(t)) try {
                    t = JSON.stringify(e);
                  } catch (e) {}0 === t.length && (t = "(empty array)");
                }return "(<" + ((n = t).length < 41 ? n : n.substr(0, 38) + "...") + ">, no stack trace)";
              }function H() {
                return "function" == typeof Q;
              }var W = function () {
                return false;
              },
                  V = /[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;function z(e) {
                var t = e.match(V);if (t) return { fileName: t[1], line: parseInt(t[2], 10) };
              }function J(e) {
                this._parent = e, this._promisesCreated = 0;var t = this._length = 1 + (undefined === e ? 0 : e._length);Q(this, J), 32 < t && this.uncycle();
              }l.inherits(J, Error), (r.CapturedTrace = J).prototype.uncycle = function () {
                var e = this._length;if (!(e < 2)) {
                  for (var t = [], n = {}, r = 0, o = this; undefined !== o; ++r) t.push(o), o = o._parent;for (r = (e = this._length = r) - 1; 0 <= r; --r) {
                    var i = t[r].stack;undefined === n[i] && (n[i] = r);
                  }for (r = 0; r < e; ++r) {
                    var s = n[t[r].stack];if (undefined !== s && s !== r) {
                      0 < s && (t[s - 1]._parent = undefined, t[s - 1]._length = 1), t[r]._parent = undefined, t[r]._length = 1;var a = 0 < r ? t[r - 1] : this;s < e - 1 ? (a._parent = t[s + 1], a._parent.uncycle(), a._length = a._parent._length + 1) : (a._parent = undefined, a._length = 1);for (var u = a._length + 1, c = r - 2; 0 <= c; --c) t[c]._length = u, u++;return;
                    }
                  }
                }
              }, J.prototype.attachExtraTrace = function (e) {
                if (!e.__stackCleaned__) {
                  this.uncycle();for (var t = B(e), n = t.message, r = [t.stack], o = this; undefined !== o;) r.push(q(o.stack.split("\n"))), o = o._parent;!function (e) {
                    for (var t = e[0], n = 1; n < e.length; ++n) {
                      for (var r = e[n], o = t.length - 1, i = t[o], s = -1, a = r.length - 1; 0 <= a; --a) if (r[a] === i) {
                        s = a;break;
                      }for (a = s; 0 <= a; --a) {
                        var u = r[a];if (t[o] !== u) break;t.pop(), o--;
                      }t = r;
                    }
                  }(r), function (e) {
                    for (var t = 0; t < e.length; ++t) (0 === e[t].length || t + 1 < e.length && e[t][0] === e[t + 1][0]) && (e.splice(t, 1), t--);
                  }(r), l.notEnumerableProp(e, "stack", function (e, t) {
                    for (var n = 0; n < t.length - 1; ++n) t[n].push("From previous event:"), t[n] = t[n].join("\n");return n < t.length && (t[n] = t[n].join("\n")), e + "\n" + t.join("\n");
                  }(n, r)), l.notEnumerableProp(e, "__stackCleaned__", true);
                }
              };var Q = function () {
                function e(e, t) {
                  return "string" == typeof e ? e : undefined !== t.name && undefined !== t.message ? t.toString() : K(t);
                }var t = /^\s*at\s*/;if ("number" == typeof Error.stackTraceLimit && "function" == typeof Error.captureStackTrace) {
                  Error.stackTraceLimit += 6, m = t, y = e;var n = Error.captureStackTrace;return W = function (e) {
                    return h.test(e);
                  }, function (e, t) {
                    Error.stackTraceLimit += 6, n(e, t), Error.stackTraceLimit -= 6;
                  };
                }var r,
                    o = new Error();if ("string" == typeof o.stack && 0 <= o.stack.split("\n")[0].indexOf("stackDetection@")) return m = /@/, y = e, _ = true, function (e) {
                  e.stack = new Error().stack;
                };try {
                  throw new Error();
                } catch (t) {
                  r = "stack" in t;
                }return "stack" in o || !r || "number" != typeof Error.stackTraceLimit ? (y = function (e, t) {
                  return "string" == typeof e ? e : "object" != typeof t && "function" != typeof t || undefined === t.name || undefined === t.message ? K(t) : t.toString();
                }, null) : (m = t, y = e, function (t) {
                  Error.stackTraceLimit += 6;try {
                    throw new Error();
                  } catch (e) {
                    t.stack = e.stack;
                  }Error.stackTraceLimit -= 6;
                });
              }();"undefined" != typeof console && undefined !== console.warn && (i = function (e) {
                console.warn(e);
              }, l.isNode && Z.stderr.isTTY ? i = function (e, t) {
                var n = t ? "[33m" : "[31m";console.warn(n + e + "[0m\n");
              } : l.isNode || "string" != typeof new Error().stack || (i = function (e, t) {
                console.warn("%c" + e, t ? "color: darkorange" : "color: red");
              }));var X = { warnings: t, longStackTraces: false, cancellation: false, monitoring: false };return g && s.longStackTraces(), { longStackTraces: function () {
                  return X.longStackTraces;
                }, warnings: function () {
                  return X.warnings;
                }, cancellation: function () {
                  return X.cancellation;
                }, monitoring: function () {
                  return X.monitoring;
                }, propagateFromFunction: function () {
                  return M;
                }, boundValueFunction: function () {
                  return F;
                }, checkForgottenReturns: function (e, t, n, r, o) {
                  if (undefined === e && null !== t && b) {
                    if (undefined !== o && o._returnedNonUndefined()) return;if (0 == (65535 & r._bitField)) return;n && (n += " ");var i = "",
                        s = "";if (t._trace) {
                      for (var a = t._trace.stack.split("\n"), u = q(a), c = u.length - 1; 0 <= c; --c) {
                        var l = u[c];if (!d.test(l)) {
                          var p = l.match(v);p && (i = "at " + p[1] + ":" + p[2] + ":" + p[3] + " ");break;
                        }
                      }if (0 < u.length) {
                        var f = u[0];for (c = 0; c < a.length; ++c) if (a[c] === f) {
                          0 < c && (s = "\n" + a[c - 1]);break;
                        }
                      }
                    }var h = "a promise was created in a " + n + "handler " + i + "but was not returned from it, see http://goo.gl/rRqMUw" + s;r._warn(h, true, t);
                  }
                }, setBounds: function (e, t) {
                  if (H()) {
                    for (var n, r, o = e.stack.split("\n"), i = t.stack.split("\n"), s = -1, a = -1, u = 0; u < o.length; ++u) if (c = z(o[u])) {
                      n = c.fileName, s = c.line;break;
                    }for (u = 0; u < i.length; ++u) {
                      var c;if (c = z(i[u])) {
                        r = c.fileName, a = c.line;break;
                      }
                    }s < 0 || a < 0 || !n || !r || n !== r || a <= s || (W = function (e) {
                      if (h.test(e)) return true;var t = z(e);return !!(t && t.fileName === n && s <= t.line && t.line <= a);
                    });
                  }
                }, warn: N, deprecated: function (e, t) {
                  var n = e + " is deprecated and will be removed in a future version.";return t && (n += " Use " + t + " instead."), N(n);
                }, CapturedTrace: J, fireDomEvent: S, fireGlobalEvent: w };
            };
          }, { "./errors": 12, "./es5": 13, "./util": 36 }], 10: [function (e, t, n) {
            "use strict";
            t.exports = function (n) {
              function r() {
                return this.value;
              }function o() {
                throw this.reason;
              }n.prototype.return = n.prototype.thenReturn = function (e) {
                return e instanceof n && e.suppressUnhandledRejections(), this._then(r, undefined, undefined, { value: e }, undefined);
              }, n.prototype.throw = n.prototype.thenThrow = function (e) {
                return this._then(o, undefined, undefined, { reason: e }, undefined);
              }, n.prototype.catchThrow = function (e) {
                if (arguments.length <= 1) return this._then(undefined, o, undefined, { reason: e }, undefined);var t = arguments[1];return this.caught(e, function () {
                  throw t;
                });
              }, n.prototype.catchReturn = function (e) {
                if (arguments.length <= 1) return e instanceof n && e.suppressUnhandledRejections(), this._then(undefined, r, undefined, { value: e }, undefined);var t = arguments[1];return t instanceof n && t.suppressUnhandledRejections(), this.caught(e, function () {
                  return t;
                });
              };
            };
          }, {}], 11: [function (e, t, n) {
            "use strict";
            t.exports = function (e, n) {
              var r = e.reduce,
                  t = e.all;function o() {
                return t(this);
              }e.prototype.each = function (e) {
                return r(this, e, n, 0)._then(o, undefined, undefined, this, undefined);
              }, e.prototype.mapSeries = function (e) {
                return r(this, e, n, n);
              }, e.each = function (e, t) {
                return r(e, t, n, 0)._then(o, undefined, undefined, e, undefined);
              }, e.mapSeries = function (e, t) {
                return r(e, t, n, n);
              };
            };
          }, {}], 12: [function (e, t, n) {
            "use strict";
            var r,
                o,
                i = e("./es5"),
                s = i.freeze,
                a = e("./util"),
                u = a.inherits,
                c = a.notEnumerableProp;function l(t, n) {
              function r(e) {
                if (!(this instanceof r)) return new r(e);c(this, "message", "string" == typeof e ? e : n), c(this, "name", t), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : Error.call(this);
              }return u(r, Error), r;
            }var p = l("Warning", "warning"),
                f = l("CancellationError", "cancellation error"),
                h = l("TimeoutError", "timeout error"),
                d = l("AggregateError", "aggregate error");try {
              r = TypeError, o = RangeError;
            } catch (e) {
              r = l("TypeError", "type error"), o = l("RangeError", "range error");
            }for (var v = "join pop push shift unshift slice filter forEach some every map indexOf lastIndexOf reduce reduceRight sort reverse".split(" "), m = 0; m < v.length; ++m) "function" == typeof Array.prototype[v[m]] && (d.prototype[v[m]] = Array.prototype[v[m]]);i.defineProperty(d.prototype, "length", { value: 0, configurable: false, writable: true, enumerable: true }), d.prototype.isOperational = true;var y = 0;function _(e) {
              if (!(this instanceof _)) return new _(e);c(this, "name", "OperationalError"), c(this, "message", e), this.cause = e, this.isOperational = true, e instanceof Error ? (c(this, "message", e.message), c(this, "stack", e.stack)) : Error.captureStackTrace && Error.captureStackTrace(this, this.constructor);
            }d.prototype.toString = function () {
              var e = Array(4 * y + 1).join(" "),
                  t = "\n" + e + "AggregateError of:\n";y++, e = Array(4 * y + 1).join(" ");for (var n = 0; n < this.length; ++n) {
                for (var r = this[n] === this ? "[Circular AggregateError]" : this[n] + "", o = r.split("\n"), i = 0; i < o.length; ++i) o[i] = e + o[i];t += (r = o.join("\n")) + "\n";
              }return y--, t;
            }, u(_, Error);var g = Error.__BluebirdErrorTypes__;g || (g = s({ CancellationError: f, TimeoutError: h, OperationalError: _, RejectionError: _, AggregateError: d }), i.defineProperty(Error, "__BluebirdErrorTypes__", { value: g, writable: false, enumerable: false, configurable: false })), t.exports = { Error: Error, TypeError: r, RangeError: o, CancellationError: g.CancellationError, OperationalError: g.OperationalError, TimeoutError: g.TimeoutError, AggregateError: g.AggregateError, Warning: p };
          }, { "./es5": 13, "./util": 36 }], 13: [function (e, t, n) {
            var r = function () {
              "use strict";
              return undefined === this;
            }();if (r) t.exports = { freeze: Object.freeze, defineProperty: Object.defineProperty, getDescriptor: Object.getOwnPropertyDescriptor, keys: Object.keys, names: Object.getOwnPropertyNames, getPrototypeOf: Object.getPrototypeOf, isArray: Array.isArray, isES5: r, propertyIsWritable: function (e, t) {
                var n = Object.getOwnPropertyDescriptor(e, t);return !(n && !n.writable && !n.set);
              } };else {
              function o(e) {
                var t = [];for (var n in e) i.call(e, n) && t.push(n);return t;
              }var i = {}.hasOwnProperty,
                  s = {}.toString,
                  a = {}.constructor.prototype;t.exports = { isArray: function (e) {
                  try {
                    return "[object Array]" === s.call(e);
                  } catch (e) {
                    return false;
                  }
                }, keys: o, names: o, defineProperty: function (e, t, n) {
                  return e[t] = n.value, e;
                }, getDescriptor: function (e, t) {
                  return { value: e[t] };
                }, freeze: function (e) {
                  return e;
                }, getPrototypeOf: function (e) {
                  try {
                    return Object(e).constructor.prototype;
                  } catch (e) {
                    return a;
                  }
                }, isES5: r, propertyIsWritable: function () {
                  return true;
                } };
            }
          }, {}], 14: [function (e, t, n) {
            "use strict";
            t.exports = function (e, r) {
              var o = e.map;e.prototype.filter = function (e, t) {
                return o(this, e, t, r);
              }, e.filter = function (e, t, n) {
                return o(e, t, n, r);
              };
            };
          }, {}], 15: [function (e, t, n) {
            "use strict";
            t.exports = function (a, s, u) {
              var c = e("./util"),
                  l = a.CancellationError,
                  p = c.errorObj,
                  f = e("./catch_filter")(u);function o(e, t, n) {
                this.promise = e, this.type = t, this.handler = n, this.called = false, this.cancelPromise = null;
              }function h(e) {
                this.finallyHandler = e;
              }function d(e, t) {
                return null != e.cancelPromise && (1 < arguments.length ? e.cancelPromise._reject(t) : e.cancelPromise._cancel(), !(e.cancelPromise = null));
              }function v() {
                return y.call(this, this.promise._target()._settledValue());
              }function m(e) {
                if (!d(this, e)) return p.e = e, p;
              }function y(e) {
                var t = this.promise,
                    n = this.handler;if (!this.called) {
                  this.called = true;var r = this.isFinallyHandler() ? n.call(t._boundValue()) : n.call(t._boundValue(), e);if (r === u) return r;if (undefined !== r) {
                    t._setReturnedNonUndefined();var o = s(r, t);if (o instanceof a) {
                      if (null != this.cancelPromise) {
                        if (o._isCancelled()) {
                          var i = new l("late cancellation observer");return t._attachExtraTrace(i), p.e = i, p;
                        }o.isPending() && o._attachCancellationCallback(new h(this));
                      }return o._then(v, m, undefined, this, undefined);
                    }
                  }
                }return t.isRejected() ? (d(this), p.e = e, p) : (d(this), e);
              }return o.prototype.isFinallyHandler = function () {
                return 0 === this.type;
              }, h.prototype._resultCancelled = function () {
                d(this.finallyHandler);
              }, a.prototype._passThrough = function (e, t, n, r) {
                return "function" != typeof e ? this.then() : this._then(n, r, undefined, new o(this, t, e), undefined);
              }, a.prototype.lastly = a.prototype.finally = function (e) {
                return this._passThrough(e, 0, y, y);
              }, a.prototype.tap = function (e) {
                return this._passThrough(e, 1, y);
              }, a.prototype.tapCatch = function (e) {
                var t = arguments.length;if (1 === t) return this._passThrough(e, 1, undefined, y);var n,
                    r = new Array(t - 1),
                    o = 0;for (n = 0; n < t - 1; ++n) {
                  var i = arguments[n];if (!c.isObject(i)) return a.reject(new TypeError("tapCatch statement predicate: expecting an object but got " + c.classString(i)));r[o++] = i;
                }r.length = o;var s = arguments[n];return this._passThrough(f(r, s, this), 1, undefined, y);
              }, o;
            };
          }, { "./catch_filter": 7, "./util": 36 }], 16: [function (n, e, t) {
            "use strict";
            e.exports = function (a, r, s, u, e, c) {
              var l = n("./errors").TypeError,
                  t = n("./util"),
                  p = t.errorObj,
                  f = t.tryCatch,
                  h = [];function d(e, t, n, r) {
                if (c.cancellation()) {
                  var o = new a(s),
                      i = this._finallyPromise = new a(s);this._promise = o.lastly(function () {
                    return i;
                  }), o._captureStackTrace(), o._setOnCancel(this);
                } else (this._promise = new a(s))._captureStackTrace();this._stack = r, this._generatorFunction = e, this._receiver = t, this._generator = undefined, this._yieldHandlers = "function" == typeof n ? [n].concat(h) : h, this._yieldedPromise = null, this._cancellationPhase = false;
              }t.inherits(d, e), d.prototype._isResolved = function () {
                return null === this._promise;
              }, d.prototype._cleanup = function () {
                this._promise = this._generator = null, c.cancellation() && null !== this._finallyPromise && (this._finallyPromise._fulfill(), this._finallyPromise = null);
              }, d.prototype._promiseCancelled = function () {
                if (!this._isResolved()) {
                  var e;if (undefined !== this._generator.return) this._promise._pushContext(), e = f(this._generator.return).call(this._generator, undefined), this._promise._popContext();else {
                    var t = new a.CancellationError("generator .return() sentinel");a.coroutine.returnSentinel = t, this._promise._attachExtraTrace(t), this._promise._pushContext(), e = f(this._generator.throw).call(this._generator, t), this._promise._popContext();
                  }this._cancellationPhase = true, this._yieldedPromise = null, this._continue(e);
                }
              }, d.prototype._promiseFulfilled = function (e) {
                this._yieldedPromise = null, this._promise._pushContext();var t = f(this._generator.next).call(this._generator, e);this._promise._popContext(), this._continue(t);
              }, d.prototype._promiseRejected = function (e) {
                this._yieldedPromise = null, this._promise._attachExtraTrace(e), this._promise._pushContext();var t = f(this._generator.throw).call(this._generator, e);this._promise._popContext(), this._continue(t);
              }, d.prototype._resultCancelled = function () {
                if (this._yieldedPromise instanceof a) {
                  var e = this._yieldedPromise;this._yieldedPromise = null, e.cancel();
                }
              }, d.prototype.promise = function () {
                return this._promise;
              }, d.prototype._run = function () {
                this._generator = this._generatorFunction.call(this._receiver), this._receiver = this._generatorFunction = undefined, this._promiseFulfilled(undefined);
              }, d.prototype._continue = function (e) {
                var t = this._promise;if (e === p) return this._cleanup(), this._cancellationPhase ? t.cancel() : t._rejectCallback(e.e, false);var n = e.value;if (true === e.done) return this._cleanup(), this._cancellationPhase ? t.cancel() : t._resolveCallback(n);var r = u(n, this._promise);if (r instanceof a || null !== (r = function (e, t, n) {
                  for (var r = 0; r < t.length; ++r) {
                    n._pushContext();var o = f(t[r])(e);if (n._popContext(), o === p) {
                      n._pushContext();var i = a.reject(p.e);return n._popContext(), i;
                    }var s = u(o, n);if (s instanceof a) return s;
                  }return null;
                }(r, this._yieldHandlers, this._promise))) {
                  var o = (r = r._target())._bitField;0 == (50397184 & o) ? (this._yieldedPromise = r)._proxy(this, null) : 0 != (33554432 & o) ? a._async.invoke(this._promiseFulfilled, this, r._value()) : 0 != (16777216 & o) ? a._async.invoke(this._promiseRejected, this, r._reason()) : this._promiseCancelled();
                } else this._promiseRejected(new l("A value %s was yielded that could not be treated as a promise\n\n    See http://goo.gl/MqrFmX\n\n".replace("%s", String(n)) + "From coroutine:\n" + this._stack.split("\n").slice(1, -7).join("\n")));
              }, a.coroutine = function (r, e) {
                if ("function" != typeof r) throw new l("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");var o = Object(e).yieldHandler,
                    i = d,
                    s = new Error().stack;return function () {
                  var e = r.apply(this, arguments),
                      t = new i(undefined, undefined, o, s),
                      n = t.promise();return t._generator = e, t._promiseFulfilled(undefined), n;
                };
              }, a.coroutine.addYieldHandler = function (e) {
                if ("function" != typeof e) throw new l("expecting a function but got " + t.classString(e));h.push(e);
              }, a.spawn = function (e) {
                if (c.deprecated("Promise.spawn()", "Promise.coroutine()"), "function" != typeof e) return r("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");var t = new d(e, this),
                    n = t.promise();return t._run(a.spawn), n;
              };
            };
          }, { "./errors": 12, "./util": 36 }], 17: [function (a, e, t) {
            "use strict";
            e.exports = function (e, o, t, n, r, i) {
              var s = a("./util");s.canEvaluate, s.tryCatch, s.errorObj, e.join = function () {
                var e,
                    t = arguments.length - 1;0 < t && "function" == typeof arguments[t] && (e = arguments[t]);var n = [].slice.call(arguments);e && n.pop();var r = new o(n).promise();return undefined !== e ? r.spread(e) : r;
              };
            };
          }, { "./util": 36 }], 18: [function (t, e, n) {
            "use strict";
            e.exports = function (h, e, i, d, s, v) {
              var a = h._getDomain,
                  u = t("./util"),
                  m = u.tryCatch,
                  y = u.errorObj,
                  c = h._async;function l(e, t, n, r) {
                this.constructor$(e), this._promise._captureStackTrace();var o = a();this._callback = null === o ? t : u.domainBind(o, t), this._preservedValues = r === s ? new Array(this.length()) : null, this._limit = n, this._inFlight = 0, this._queue = [], c.invoke(this._asyncInit, this, undefined);
              }function o(e, t, n, r) {
                if ("function" != typeof t) return i("expecting a function but got " + u.classString(t));var o = 0;if (undefined !== n) {
                  if ("object" != typeof n || null === n) return h.reject(new TypeError("options argument must be an object but it is " + u.classString(n)));if ("number" != typeof n.concurrency) return h.reject(new TypeError("'concurrency' must be a number but it is " + u.classString(n.concurrency)));o = n.concurrency;
                }return new l(e, t, o = "number" == typeof o && isFinite(o) && 1 <= o ? o : 0, r).promise();
              }u.inherits(l, e), l.prototype._asyncInit = function () {
                this._init$(undefined, -2);
              }, l.prototype._init = function () {}, l.prototype._promiseFulfilled = function (e, t) {
                var n = this._values,
                    r = this.length(),
                    o = this._preservedValues,
                    i = this._limit;if (t < 0) {
                  if (n[t = -1 * t - 1] = e, 1 <= i && (this._inFlight--, this._drainQueue(), this._isResolved())) return true;
                } else {
                  if (1 <= i && this._inFlight >= i) return n[t] = e, this._queue.push(t), false;null !== o && (o[t] = e);var s = this._promise,
                      a = this._callback,
                      u = s._boundValue();s._pushContext();var c = m(a).call(u, e, t, r),
                      l = s._popContext();if (v.checkForgottenReturns(c, l, null !== o ? "Promise.filter" : "Promise.map", s), c === y) return this._reject(c.e), true;var p = d(c, this._promise);if (p instanceof h) {
                    var f = (p = p._target())._bitField;if (0 == (50397184 & f)) return 1 <= i && this._inFlight++, (n[t] = p)._proxy(this, -1 * (t + 1)), false;if (0 == (33554432 & f)) return 0 != (16777216 & f) ? this._reject(p._reason()) : this._cancel(), true;c = p._value();
                  }n[t] = c;
                }return ++this._totalResolved >= r && (null !== o ? this._filter(n, o) : this._resolve(n), true);
              }, l.prototype._drainQueue = function () {
                for (var e = this._queue, t = this._limit, n = this._values; 0 < e.length && this._inFlight < t;) {
                  if (this._isResolved()) return;var r = e.pop();this._promiseFulfilled(n[r], r);
                }
              }, l.prototype._filter = function (e, t) {
                for (var n = t.length, r = new Array(n), o = 0, i = 0; i < n; ++i) e[i] && (r[o++] = t[i]);r.length = o, this._resolve(r);
              }, l.prototype.preservedValues = function () {
                return this._preservedValues;
              }, h.prototype.map = function (e, t) {
                return o(this, e, t, null);
              }, h.map = function (e, t, n, r) {
                return o(e, t, n, r);
              };
            };
          }, { "./util": 36 }], 19: [function (t, e, n) {
            "use strict";
            e.exports = function (s, a, e, u, c) {
              var l = t("./util"),
                  p = l.tryCatch;s.method = function (r) {
                if ("function" != typeof r) throw new s.TypeError("expecting a function but got " + l.classString(r));return function () {
                  var e = new s(a);e._captureStackTrace(), e._pushContext();var t = p(r).apply(this, arguments),
                      n = e._popContext();return c.checkForgottenReturns(t, n, "Promise.method", e), e._resolveFromSyncValue(t), e;
                };
              }, s.attempt = s.try = function (e) {
                if ("function" != typeof e) return u("expecting a function but got " + l.classString(e));var t,
                    n = new s(a);if (n._captureStackTrace(), n._pushContext(), 1 < arguments.length) {
                  c.deprecated("calling Promise.try with more than 1 argument");var r = arguments[1],
                      o = arguments[2];t = l.isArray(r) ? p(e).apply(o, r) : p(e).call(o, r);
                } else t = p(e)();var i = n._popContext();return c.checkForgottenReturns(t, i, "Promise.try", n), n._resolveFromSyncValue(t), n;
              }, s.prototype._resolveFromSyncValue = function (e) {
                e === l.errorObj ? this._rejectCallback(e.e, false) : this._resolveCallback(e, true);
              };
            };
          }, { "./util": 36 }], 20: [function (e, t, n) {
            "use strict";
            var s = e("./util"),
                a = s.maybeWrapAsError,
                u = e("./errors").OperationalError,
                c = e("./es5"),
                l = /^(?:name|message|stack|cause)$/;t.exports = function (o, i) {
              return function (e, t) {
                if (null !== o) {
                  if (e) {
                    var n = function (e) {
                      var t, n;if ((n = e) instanceof Error && c.getPrototypeOf(n) === Error.prototype) {
                        (t = new u(e)).name = e.name, t.message = e.message, t.stack = e.stack;for (var r = c.keys(e), o = 0; o < r.length; ++o) {
                          var i = r[o];l.test(i) || (t[i] = e[i]);
                        }return t;
                      }return s.markAsOriginatingFromRejection(e), e;
                    }(a(e));o._attachExtraTrace(n), o._reject(n);
                  } else if (i) {
                    var r = [].slice.call(arguments, 1);o._fulfill(r);
                  } else o._fulfill(t);o = null;
                }
              };
            };
          }, { "./errors": 12, "./es5": 13, "./util": 36 }], 21: [function (t, e, n) {
            "use strict";
            e.exports = function (e) {
              var r = t("./util"),
                  o = e._async,
                  i = r.tryCatch,
                  s = r.errorObj;function a(e, t) {
                if (!r.isArray(e)) return u.call(this, e, t);var n = i(t).apply(this._boundValue(), [null].concat(e));n === s && o.throwLater(n.e);
              }function u(e, t) {
                var n = this._boundValue(),
                    r = undefined === e ? i(t).call(n, null) : i(t).call(n, null, e);r === s && o.throwLater(r.e);
              }function c(e, t) {
                if (!e) {
                  var n = new Error(e + "");n.cause = e, e = n;
                }var r = i(t).call(this._boundValue(), e);r === s && o.throwLater(r.e);
              }e.prototype.asCallback = e.prototype.nodeify = function (e, t) {
                if ("function" == typeof e) {
                  var n = u;undefined !== t && Object(t).spread && (n = a), this._then(n, c, undefined, this, e);
                }return this;
              };
            };
          }, { "./util": 36 }], 22: [function (O, P, e) {
            "use strict";
            P.exports = function () {
              function u() {
                return new p("circular promise resolution chain\n\n    See http://goo.gl/MqrFmX\n");
              }function a() {
                return new k.PromiseInspection(this._target());
              }function s(e) {
                return k.reject(new p(e));
              }function c() {}var h,
                  l = {},
                  d = O("./util");h = d.isNode ? function () {
                var e = Z.domain;return undefined === e && (e = null), e;
              } : function () {
                return null;
              }, d.notEnumerableProp(k, "_getDomain", h);var e = O("./es5"),
                  t = O("./async"),
                  v = new t();e.defineProperty(k, "_async", { value: v });var n = O("./errors"),
                  p = k.TypeError = n.TypeError;k.RangeError = n.RangeError;var m = k.CancellationError = n.CancellationError;k.TimeoutError = n.TimeoutError, k.OperationalError = n.OperationalError, k.RejectionError = n.OperationalError, k.AggregateError = n.AggregateError;var y = function () {},
                  f = {},
                  _ = {},
                  g = O("./thenables")(k, y),
                  b = O("./promise_array")(k, y, g, s, c),
                  r = O("./context")(k),
                  o = r.create,
                  E = O("./debuggability")(k, r),
                  S = (E.CapturedTrace, O("./finally")(k, g, _)),
                  w = O("./catch_filter")(_),
                  i = O("./nodeback"),
                  T = d.errorObj,
                  x = d.tryCatch;function k(e) {
                e !== y && function (e, t) {
                  if (null == e || e.constructor !== k) throw new p("the promise constructor cannot be invoked directly\n\n    See http://goo.gl/MqrFmX\n");if ("function" != typeof t) throw new p("expecting a function but got " + d.classString(t));
                }(this, e), this._bitField = 0, this._fulfillmentHandler0 = undefined, this._rejectionHandler0 = undefined, this._promise0 = undefined, this._receiver0 = undefined, this._resolveFromExecutor(e), this._promiseCreated(), this._fireEvent("promiseCreated", this);
              }function R(e) {
                this.promise._resolveCallback(e);
              }function I(e) {
                this.promise._rejectCallback(e, false);
              }function C(e) {
                var t = new k(y);t._fulfillmentHandler0 = e, t._rejectionHandler0 = e, t._promise0 = e, t._receiver0 = e;
              }return k.prototype.toString = function () {
                return "[object Promise]";
              }, k.prototype.caught = k.prototype.catch = function (e) {
                var t = arguments.length;if (1 < t) {
                  var n,
                      r = new Array(t - 1),
                      o = 0;for (n = 0; n < t - 1; ++n) {
                    var i = arguments[n];if (!d.isObject(i)) return s("Catch statement predicate: expecting an object but got " + d.classString(i));r[o++] = i;
                  }return r.length = o, e = arguments[n], this.then(undefined, w(r, e, this));
                }return this.then(undefined, e);
              }, k.prototype.reflect = function () {
                return this._then(a, a, undefined, this, undefined);
              }, k.prototype.then = function (e, t) {
                if (E.warnings() && 0 < arguments.length && "function" != typeof e && "function" != typeof t) {
                  var n = ".then() only accepts functions but was passed: " + d.classString(e);1 < arguments.length && (n += ", " + d.classString(t)), this._warn(n);
                }return this._then(e, t, undefined, undefined, undefined);
              }, k.prototype.done = function (e, t) {
                this._then(e, t, undefined, undefined, undefined)._setIsFinal();
              }, k.prototype.spread = function (e) {
                return "function" != typeof e ? s("expecting a function but got " + d.classString(e)) : this.all()._then(e, undefined, undefined, f, undefined);
              }, k.prototype.toJSON = function () {
                var e = { isFulfilled: false, isRejected: false, fulfillmentValue: undefined, rejectionReason: undefined };return this.isFulfilled() ? (e.fulfillmentValue = this.value(), e.isFulfilled = true) : this.isRejected() && (e.rejectionReason = this.reason(), e.isRejected = true), e;
              }, k.prototype.all = function () {
                return 0 < arguments.length && this._warn(".all() was passed arguments but it does not take any"), new b(this).promise();
              }, k.prototype.error = function (e) {
                return this.caught(d.originatesFromRejection, e);
              }, k.getNewLibraryCopy = P.exports, k.is = function (e) {
                return e instanceof k;
              }, k.fromNode = k.fromCallback = function (e) {
                var t = new k(y);t._captureStackTrace();var n = 1 < arguments.length && !!Object(arguments[1]).multiArgs,
                    r = x(e)(i(t, n));return r === T && t._rejectCallback(r.e, true), t._isFateSealed() || t._setAsyncGuaranteed(), t;
              }, k.all = function (e) {
                return new b(e).promise();
              }, k.resolve = k.fulfilled = k.cast = function (e) {
                var t = g(e);return t instanceof k || ((t = new k(y))._captureStackTrace(), t._setFulfilled(), t._rejectionHandler0 = e), t;
              }, k.reject = k.rejected = function (e) {
                var t = new k(y);return t._captureStackTrace(), t._rejectCallback(e, true), t;
              }, k.setScheduler = function (e) {
                if ("function" != typeof e) throw new p("expecting a function but got " + d.classString(e));return v.setScheduler(e);
              }, k.prototype._then = function (e, t, n, r, o) {
                var i = undefined !== o,
                    s = i ? o : new k(y),
                    a = this._target(),
                    u = a._bitField;i || (s._propagateFrom(this, 3), s._captureStackTrace(), undefined === r && 0 != (2097152 & this._bitField) && (r = 0 != (50397184 & u) ? this._boundValue() : a === this ? undefined : this._boundTo), this._fireEvent("promiseChained", this, s));var c = h();if (0 != (50397184 & u)) {
                  var l,
                      p,
                      f = a._settlePromiseCtx;0 != (33554432 & u) ? (p = a._rejectionHandler0, l = e) : 0 != (16777216 & u) ? (p = a._fulfillmentHandler0, l = t, a._unsetRejectionIsUnhandled()) : (f = a._settlePromiseLateCancellationObserver, p = new m("late cancellation observer"), a._attachExtraTrace(p), l = t), v.invoke(f, a, { handler: null === c ? l : "function" == typeof l && d.domainBind(c, l), promise: s, receiver: r, value: p });
                } else a._addCallbacks(e, t, s, r, c);return s;
              }, k.prototype._length = function () {
                return 65535 & this._bitField;
              }, k.prototype._isFateSealed = function () {
                return 0 != (117506048 & this._bitField);
              }, k.prototype._isFollowing = function () {
                return 67108864 == (67108864 & this._bitField);
              }, k.prototype._setLength = function (e) {
                this._bitField = -65536 & this._bitField | 65535 & e;
              }, k.prototype._setFulfilled = function () {
                this._bitField = 33554432 | this._bitField, this._fireEvent("promiseFulfilled", this);
              }, k.prototype._setRejected = function () {
                this._bitField = 16777216 | this._bitField, this._fireEvent("promiseRejected", this);
              }, k.prototype._setFollowing = function () {
                this._bitField = 67108864 | this._bitField, this._fireEvent("promiseResolved", this);
              }, k.prototype._setIsFinal = function () {
                this._bitField = 4194304 | this._bitField;
              }, k.prototype._isFinal = function () {
                return 0 < (4194304 & this._bitField);
              }, k.prototype._unsetCancelled = function () {
                this._bitField = -65537 & this._bitField;
              }, k.prototype._setCancelled = function () {
                this._bitField = 65536 | this._bitField, this._fireEvent("promiseCancelled", this);
              }, k.prototype._setWillBeCancelled = function () {
                this._bitField = 8388608 | this._bitField;
              }, k.prototype._setAsyncGuaranteed = function () {
                v.hasCustomScheduler() || (this._bitField = 134217728 | this._bitField);
              }, k.prototype._receiverAt = function (e) {
                var t = 0 === e ? this._receiver0 : this[4 * e - 4 + 3];if (t !== l) return undefined === t && this._isBound() ? this._boundValue() : t;
              }, k.prototype._promiseAt = function (e) {
                return this[4 * e - 4 + 2];
              }, k.prototype._fulfillmentHandlerAt = function (e) {
                return this[4 * e - 4 + 0];
              }, k.prototype._rejectionHandlerAt = function (e) {
                return this[4 * e - 4 + 1];
              }, k.prototype._boundValue = function () {}, k.prototype._migrateCallback0 = function (e) {
                e._bitField;var t = e._fulfillmentHandler0,
                    n = e._rejectionHandler0,
                    r = e._promise0,
                    o = e._receiverAt(0);undefined === o && (o = l), this._addCallbacks(t, n, r, o, null);
              }, k.prototype._migrateCallbackAt = function (e, t) {
                var n = e._fulfillmentHandlerAt(t),
                    r = e._rejectionHandlerAt(t),
                    o = e._promiseAt(t),
                    i = e._receiverAt(t);undefined === i && (i = l), this._addCallbacks(n, r, o, i, null);
              }, k.prototype._addCallbacks = function (e, t, n, r, o) {
                var i = this._length();if (65531 <= i && (i = 0, this._setLength(0)), 0 === i) this._promise0 = n, this._receiver0 = r, "function" == typeof e && (this._fulfillmentHandler0 = null === o ? e : d.domainBind(o, e)), "function" == typeof t && (this._rejectionHandler0 = null === o ? t : d.domainBind(o, t));else {
                  var s = 4 * i - 4;this[2 + s] = n, this[3 + s] = r, "function" == typeof e && (this[0 + s] = null === o ? e : d.domainBind(o, e)), "function" == typeof t && (this[1 + s] = null === o ? t : d.domainBind(o, t));
                }return this._setLength(i + 1), i;
              }, k.prototype._proxy = function (e, t) {
                this._addCallbacks(undefined, undefined, t, e, null);
              }, k.prototype._resolveCallback = function (e, t) {
                if (0 == (117506048 & this._bitField)) {
                  if (e === this) return this._rejectCallback(u(), false);var n = g(e, this);if (!(n instanceof k)) return this._fulfill(e);t && this._propagateFrom(n, 2);var r = n._target();if (r !== this) {
                    var o = r._bitField;if (0 == (50397184 & o)) {
                      var i = this._length();0 < i && r._migrateCallback0(this);for (var s = 1; s < i; ++s) r._migrateCallbackAt(this, s);this._setFollowing(), this._setLength(0), this._setFollowee(r);
                    } else if (0 != (33554432 & o)) this._fulfill(r._value());else if (0 != (16777216 & o)) this._reject(r._reason());else {
                      var a = new m("late cancellation observer");r._attachExtraTrace(a), this._reject(a);
                    }
                  } else this._reject(u());
                }
              }, k.prototype._rejectCallback = function (e, t, n) {
                var r = d.ensureErrorObject(e),
                    o = r === e;if (!o && !n && E.warnings()) {
                  var i = "a promise was rejected with a non-error: " + d.classString(e);this._warn(i, true);
                }this._attachExtraTrace(r, !!t && o), this._reject(e);
              }, k.prototype._resolveFromExecutor = function (e) {
                if (e !== y) {
                  var t = this;this._captureStackTrace(), this._pushContext();var n = true,
                      r = this._execute(e, function (e) {
                    t._resolveCallback(e);
                  }, function (e) {
                    t._rejectCallback(e, n);
                  });n = false, this._popContext(), undefined !== r && t._rejectCallback(r, true);
                }
              }, k.prototype._settlePromiseFromHandler = function (e, t, n, r) {
                var o = r._bitField;if (0 == (65536 & o)) {
                  var i;r._pushContext(), t === f ? n && "number" == typeof n.length ? i = x(e).apply(this._boundValue(), n) : (i = T).e = new p("cannot .spread() a non-array: " + d.classString(n)) : i = x(e).call(t, n);var s = r._popContext();0 == (65536 & (o = r._bitField)) && (i === _ ? r._reject(n) : i === T ? r._rejectCallback(i.e, false) : (E.checkForgottenReturns(i, s, "", r, this), r._resolveCallback(i)));
                }
              }, k.prototype._target = function () {
                for (var e = this; e._isFollowing();) e = e._followee();return e;
              }, k.prototype._followee = function () {
                return this._rejectionHandler0;
              }, k.prototype._setFollowee = function (e) {
                this._rejectionHandler0 = e;
              }, k.prototype._settlePromise = function (e, t, n, r) {
                var o = e instanceof k,
                    i = this._bitField,
                    s = 0 != (134217728 & i);0 != (65536 & i) ? (o && e._invokeInternalOnCancel(), n instanceof S && n.isFinallyHandler() ? (n.cancelPromise = e, x(t).call(n, r) === T && e._reject(T.e)) : t === a ? e._fulfill(a.call(n)) : n instanceof c ? n._promiseCancelled(e) : o || e instanceof b ? e._cancel() : n.cancel()) : "function" == typeof t ? o ? (s && e._setAsyncGuaranteed(), this._settlePromiseFromHandler(t, n, r, e)) : t.call(n, r, e) : n instanceof c ? n._isResolved() || (0 != (33554432 & i) ? n._promiseFulfilled(r, e) : n._promiseRejected(r, e)) : o && (s && e._setAsyncGuaranteed(), 0 != (33554432 & i) ? e._fulfill(r) : e._reject(r));
              }, k.prototype._settlePromiseLateCancellationObserver = function (e) {
                var t = e.handler,
                    n = e.promise,
                    r = e.receiver,
                    o = e.value;"function" == typeof t ? n instanceof k ? this._settlePromiseFromHandler(t, r, o, n) : t.call(r, o, n) : n instanceof k && n._reject(o);
              }, k.prototype._settlePromiseCtx = function (e) {
                this._settlePromise(e.promise, e.handler, e.receiver, e.value);
              }, k.prototype._settlePromise0 = function (e, t, n) {
                var r = this._promise0,
                    o = this._receiverAt(0);this._promise0 = undefined, this._receiver0 = undefined, this._settlePromise(r, e, o, t);
              }, k.prototype._clearCallbackDataAtIndex = function (e) {
                var t = 4 * e - 4;this[2 + t] = this[3 + t] = this[0 + t] = this[1 + t] = undefined;
              }, k.prototype._fulfill = function (e) {
                var t = this._bitField;if (!((117506048 & t) >>> 16)) {
                  if (e === this) {
                    var n = u();return this._attachExtraTrace(n), this._reject(n);
                  }this._setFulfilled(), this._rejectionHandler0 = e, 0 < (65535 & t) && (0 != (134217728 & t) ? this._settlePromises() : v.settlePromises(this), this._dereferenceTrace());
                }
              }, k.prototype._reject = function (e) {
                var t = this._bitField;if (!((117506048 & t) >>> 16)) {
                  if (this._setRejected(), this._fulfillmentHandler0 = e, this._isFinal()) return v.fatalError(e, d.isNode);0 < (65535 & t) ? v.settlePromises(this) : this._ensurePossibleRejectionHandled();
                }
              }, k.prototype._fulfillPromises = function (e, t) {
                for (var n = 1; n < e; n++) {
                  var r = this._fulfillmentHandlerAt(n),
                      o = this._promiseAt(n),
                      i = this._receiverAt(n);this._clearCallbackDataAtIndex(n), this._settlePromise(o, r, i, t);
                }
              }, k.prototype._rejectPromises = function (e, t) {
                for (var n = 1; n < e; n++) {
                  var r = this._rejectionHandlerAt(n),
                      o = this._promiseAt(n),
                      i = this._receiverAt(n);this._clearCallbackDataAtIndex(n), this._settlePromise(o, r, i, t);
                }
              }, k.prototype._settlePromises = function () {
                var e = this._bitField,
                    t = 65535 & e;if (0 < t) {
                  if (0 != (16842752 & e)) {
                    var n = this._fulfillmentHandler0;this._settlePromise0(this._rejectionHandler0, n, e), this._rejectPromises(t, n);
                  } else {
                    var r = this._rejectionHandler0;this._settlePromise0(this._fulfillmentHandler0, r, e), this._fulfillPromises(t, r);
                  }this._setLength(0);
                }this._clearCancellationData();
              }, k.prototype._settledValue = function () {
                var e = this._bitField;return 0 != (33554432 & e) ? this._rejectionHandler0 : 0 != (16777216 & e) ? this._fulfillmentHandler0 : undefined;
              }, k.defer = k.pending = function () {
                return E.deprecated("Promise.defer", "new Promise"), { promise: new k(y), resolve: R, reject: I };
              }, d.notEnumerableProp(k, "_makeSelfResolutionError", u), O("./method")(k, y, g, s, E), O("./bind")(k, y, g, E), O("./cancel")(k, b, s, E), O("./direct_resolve")(k), O("./synchronous_inspection")(k), O("./join")(k, b, g, y, v, h), (k.Promise = k).version = "3.5.3", O("./map.js")(k, b, s, g, y, E), O("./call_get.js")(k), O("./using.js")(k, s, g, o, y, E), O("./timers.js")(k, y, E), O("./generators.js")(k, s, y, g, c, E), O("./nodeify.js")(k), O("./promisify.js")(k, y), O("./props.js")(k, b, g, s), O("./race.js")(k, y, g, s), O("./reduce.js")(k, b, s, g, y, E), O("./settle.js")(k, b, E), O("./some.js")(k, b, s), O("./filter.js")(k, y), O("./each.js")(k, y), O("./any.js")(k), d.toFastProperties(k), d.toFastProperties(k.prototype), C({ a: 1 }), C({ b: 2 }), C({ c: 3 }), C(1), C(function () {}), C(undefined), C(false), C(new k(y)), E.setBounds(t.firstLineError, d.lastLineError), k;
            };
          }, { "./any.js": 1, "./async": 2, "./bind": 3, "./call_get.js": 5, "./cancel": 6, "./catch_filter": 7, "./context": 8, "./debuggability": 9, "./direct_resolve": 10, "./each.js": 11, "./errors": 12, "./es5": 13, "./filter.js": 14, "./finally": 15, "./generators.js": 16, "./join": 17, "./map.js": 18, "./method": 19, "./nodeback": 20, "./nodeify.js": 21, "./promise_array": 23, "./promisify.js": 24, "./props.js": 25, "./race.js": 27, "./reduce.js": 28, "./settle.js": 30, "./some.js": 31, "./synchronous_inspection": 32, "./thenables": 33, "./timers.js": 34, "./using.js": 35, "./util": 36 }], 23: [function (r, e, t) {
            "use strict";
            e.exports = function (a, n, u, s, e) {
              var c = r("./util");function t(e) {
                var t = this._promise = new a(n);e instanceof a && t._propagateFrom(e, 3), t._setOnCancel(this), this._values = e, this._length = 0, this._totalResolved = 0, this._init(undefined, -2);
              }return c.isArray, c.inherits(t, e), t.prototype.length = function () {
                return this._length;
              }, t.prototype.promise = function () {
                return this._promise;
              }, t.prototype._init = function e(t, n) {
                var r = u(this._values, this._promise);if (r instanceof a) {
                  var o = (r = r._target())._bitField;if (this._values = r, 0 == (50397184 & o)) return this._promise._setAsyncGuaranteed(), r._then(e, this._reject, undefined, this, n);if (0 == (33554432 & o)) return 0 != (16777216 & o) ? this._reject(r._reason()) : this._cancel();r = r._value();
                }if (null !== (r = c.asArray(r))) 0 !== r.length ? this._iterate(r) : -5 === n ? this._resolveEmptyArray() : this._resolve(function () {
                  switch (n) {case -2:
                      return [];case -3:
                      return {};case -6:
                      return new Map();}
                }());else {
                  var i = s("expecting an array or an iterable object but got " + c.classString(r)).reason();this._promise._rejectCallback(i, false);
                }
              }, t.prototype._iterate = function (e) {
                var t = this.getActualLength(e.length);this._length = t, this._values = this.shouldCopyValues() ? new Array(t) : this._values;for (var n = this._promise, r = false, o = null, i = 0; i < t; ++i) {
                  var s = u(e[i], n);o = s instanceof a ? (s = s._target())._bitField : null, r ? null !== o && s.suppressUnhandledRejections() : null !== o ? 0 == (50397184 & o) ? (s._proxy(this, i), this._values[i] = s) : r = 0 != (33554432 & o) ? this._promiseFulfilled(s._value(), i) : 0 != (16777216 & o) ? this._promiseRejected(s._reason(), i) : this._promiseCancelled(i) : r = this._promiseFulfilled(s, i);
                }r || n._setAsyncGuaranteed();
              }, t.prototype._isResolved = function () {
                return null === this._values;
              }, t.prototype._resolve = function (e) {
                this._values = null, this._promise._fulfill(e);
              }, t.prototype._cancel = function () {
                !this._isResolved() && this._promise._isCancellable() && (this._values = null, this._promise._cancel());
              }, t.prototype._reject = function (e) {
                this._values = null, this._promise._rejectCallback(e, false);
              }, t.prototype._promiseFulfilled = function (e, t) {
                return this._values[t] = e, ++this._totalResolved >= this._length && (this._resolve(this._values), true);
              }, t.prototype._promiseCancelled = function () {
                return this._cancel(), true;
              }, t.prototype._promiseRejected = function (e) {
                return this._totalResolved++, this._reject(e), true;
              }, t.prototype._resultCancelled = function () {
                if (!this._isResolved()) {
                  var e = this._values;if (this._cancel(), e instanceof a) e.cancel();else for (var t = 0; t < e.length; ++t) e[t] instanceof a && e[t].cancel();
                }
              }, t.prototype.shouldCopyValues = function () {
                return true;
              }, t.prototype.getActualLength = function (e) {
                return e;
              }, t;
            };
          }, { "./util": 36 }], 24: [function (n, e, t) {
            "use strict";
            e.exports = function (c, l) {
              var h = {},
                  d = n("./util"),
                  p = n("./nodeback"),
                  f = d.withAppended,
                  v = d.maybeWrapAsError,
                  e = d.canEvaluate,
                  m = n("./errors").TypeError,
                  y = { __isPromisified__: true },
                  t = new RegExp("^(?:" + ["arity", "length", "name", "arguments", "caller", "callee", "prototype", "__isPromisified__"].join("|") + ")$"),
                  _ = function (e) {
                return d.isIdentifier(e) && "_" !== e.charAt(0) && "constructor" !== e;
              };function s(e) {
                return !t.test(e);
              }function g(e) {
                try {
                  return true === e.__isPromisified__;
                } catch (e) {
                  return false;
                }
              }var b = function (e) {
                return e.replace(/([$])/, "\\$");
              },
                  E = e ? undefined : function (o, i, e, t, n, s) {
                var a = function () {
                  return this;
                }(),
                    u = o;function r() {
                  var e = i;i === h && (e = this);var t = new c(l);t._captureStackTrace();var n = "string" == typeof u && this !== a ? this[u] : o,
                      r = p(t, s);try {
                    n.apply(e, f(arguments, r));
                  } catch (e) {
                    t._rejectCallback(v(e), true, true);
                  }return t._isFateSealed() || t._setAsyncGuaranteed(), t;
                }return "string" == typeof u && (o = t), d.notEnumerableProp(r, "__isPromisified__", true), r;
              };function S(e, t, n, r, o) {
                for (var i = new RegExp(b(t) + "$"), s = function (e, t, n, r) {
                  for (var o = d.inheritedDataKeys(e), i = [], s = 0; s < o.length; ++s) {
                    var a = o[s],
                        u = e[a],
                        c = r === _ || _(a, u, e);"function" != typeof u || g(u) || (l = e, p = a, f = t, (h = d.getDataPropertyOrDefault(l, p + f, y)) && g(h)) || !r(a, u, e, c) || i.push(a, u);
                  }var l, p, f, h;return function (e, t, n) {
                    for (var r = 0; r < e.length; r += 2) {
                      var o = e[r];if (n.test(o)) for (var i = o.replace(n, ""), s = 0; s < e.length; s += 2) if (e[s] === i) throw new m("Cannot promisify an API that has normal methods with '%s'-suffix\n\n    See http://goo.gl/MqrFmX\n".replace("%s", t));
                    }
                  }(i, t, n), i;
                }(e, t, i, n), a = 0, u = s.length; a < u; a += 2) {
                  var c = s[a],
                      l = s[a + 1],
                      p = c + t;if (r === E) e[p] = E(c, h, c, l, t, o);else {
                    var f = r(l, function () {
                      return E(c, h, c, l, t, o);
                    });d.notEnumerableProp(f, "__isPromisified__", true), e[p] = f;
                  }
                }return d.toFastProperties(e), e;
              }c.promisify = function (e, t) {
                if ("function" != typeof e) throw new m("expecting a function but got " + d.classString(e));if (g(e)) return e;var n,
                    r,
                    o,
                    i = (n = e, r = undefined === (t = Object(t)).context ? h : t.context, o = !!t.multiArgs, E(n, r, undefined, n, null, o));return d.copyDescriptors(e, i, s), i;
              }, c.promisifyAll = function (e, t) {
                if ("function" != typeof e && "object" != typeof e) throw new m("the target of promisifyAll must be an object or a function\n\n    See http://goo.gl/MqrFmX\n");var n = !!(t = Object(t)).multiArgs,
                    r = t.suffix;"string" != typeof r && (r = "Async");var o = t.filter;"function" != typeof o && (o = _);var i = t.promisifier;if ("function" != typeof i && (i = E), !d.isIdentifier(r)) throw new RangeError("suffix must be a valid identifier\n\n    See http://goo.gl/MqrFmX\n");for (var s = d.inheritedDataKeys(e), a = 0; a < s.length; ++a) {
                  var u = e[s[a]];"constructor" !== s[a] && d.isClass(u) && (S(u.prototype, r, o, i, n), S(u, r, o, i, n));
                }return S(e, r, o, i, n);
              };
            };
          }, { "./errors": 12, "./nodeback": 20, "./util": 36 }], 25: [function (d, e, t) {
            "use strict";
            e.exports = function (r, e, o, i) {
              var a,
                  t = d("./util"),
                  s = t.isObject,
                  u = d("./es5");"function" == typeof Map && (a = Map);var n,
                  c,
                  l = (c = n = 0, function (e) {
                c = e.size, n = 0;var t = new Array(2 * e.size);return e.forEach(p, t), t;
              });function p(e, t) {
                this[n] = e, this[n + c] = t, n++;
              }function f(e) {
                var t,
                    n = false;if (undefined !== a && e instanceof a) t = l(e), n = true;else {
                  var r = u.keys(e),
                      o = r.length;t = new Array(2 * o);for (var i = 0; i < o; ++i) {
                    var s = r[i];t[i] = e[s], t[i + o] = s;
                  }
                }this.constructor$(t), this._isMap = n, this._init$(undefined, n ? -6 : -3);
              }function h(e) {
                var t,
                    n = o(e);return s(n) ? (t = n instanceof r ? n._then(r.props, undefined, undefined, undefined, undefined) : new f(n).promise(), n instanceof r && t._propagateFrom(n, 2), t) : i("cannot await properties of a non-object\n\n    See http://goo.gl/MqrFmX\n");
              }t.inherits(f, e), f.prototype._init = function () {}, f.prototype._promiseFulfilled = function (e, t) {
                if (this._values[t] = e, ++this._totalResolved >= this._length) {
                  var n;if (this._isMap) n = function (e) {
                    for (var t = new a(), n = e.length / 2 | 0, r = 0; r < n; ++r) {
                      var o = e[n + r],
                          i = e[r];t.set(o, i);
                    }return t;
                  }(this._values);else {
                    n = {};for (var r = this.length(), o = 0, i = this.length(); o < i; ++o) n[this._values[o + r]] = this._values[o];
                  }return this._resolve(n), true;
                }return false;
              }, f.prototype.shouldCopyValues = function () {
                return false;
              }, f.prototype.getActualLength = function (e) {
                return e >> 1;
              }, r.prototype.props = function () {
                return h(this);
              }, r.props = function (e) {
                return h(e);
              };
            };
          }, { "./es5": 13, "./util": 36 }], 26: [function (e, t, n) {
            "use strict";
            function r(e) {
              this._capacity = e, this._length = 0, this._front = 0;
            }r.prototype._willBeOverCapacity = function (e) {
              return this._capacity < e;
            }, r.prototype._pushOne = function (e) {
              var t = this.length();this._checkCapacity(t + 1), this[this._front + t & this._capacity - 1] = e, this._length = t + 1;
            }, r.prototype.push = function (e, t, n) {
              var r = this.length() + 3;if (this._willBeOverCapacity(r)) this._pushOne(e), this._pushOne(t), this._pushOne(n);else {
                var o = this._front + r - 3;this._checkCapacity(r);var i = this._capacity - 1;this[0 + o & i] = e, this[1 + o & i] = t, this[2 + o & i] = n, this._length = r;
              }
            }, r.prototype.shift = function () {
              var e = this._front,
                  t = this[e];return this[e] = undefined, this._front = e + 1 & this._capacity - 1, this._length--, t;
            }, r.prototype.length = function () {
              return this._length;
            }, r.prototype._checkCapacity = function (e) {
              this._capacity < e && this._resizeTo(this._capacity << 1);
            }, r.prototype._resizeTo = function (e) {
              var t = this._capacity;this._capacity = e, function (e, t, n, r, o) {
                for (var i = 0; i < o; ++i) n[i + r] = e[i + 0], e[i + 0] = undefined;
              }(this, 0, this, t, this._front + this._length & t - 1);
            }, t.exports = r;
          }, {}], 27: [function (e, t, n) {
            "use strict";
            t.exports = function (c, l, p, f) {
              var h = e("./util"),
                  d = function (t) {
                return t.then(function (e) {
                  return n(e, t);
                });
              };function n(e, t) {
                var n = p(e);if (n instanceof c) return d(n);if (null === (e = h.asArray(e))) return f("expecting an array or an iterable object but got " + h.classString(e));var r = new c(l);undefined !== t && r._propagateFrom(t, 3);for (var o = r._fulfill, i = r._reject, s = 0, a = e.length; s < a; ++s) {
                  var u = e[s];(undefined !== u || s in e) && c.cast(u)._then(o, i, undefined, r, null);
                }return r;
              }c.race = function (e) {
                return n(e, undefined);
              }, c.prototype.race = function () {
                return n(this, undefined);
              };
            };
          }, { "./util": 36 }], 28: [function (t, e, n) {
            "use strict";
            e.exports = function (s, e, o, n, i, a) {
              var u = s._getDomain,
                  c = t("./util"),
                  l = c.tryCatch;function p(e, t, n, r) {
                this.constructor$(e);var o = u();this._fn = null === o ? t : c.domainBind(o, t), undefined !== n && (n = s.resolve(n))._attachCancellationCallback(this), this._initialValue = n, this._currentCancellable = null, this._eachValues = r === i ? Array(this._length) : 0 === r ? null : undefined, this._promise._captureStackTrace(), this._init$(undefined, -5);
              }function f(e, t) {
                this.isFulfilled() ? t._resolve(e) : t._reject(e);
              }function h(e, t, n, r) {
                return "function" != typeof t ? o("expecting a function but got " + c.classString(t)) : new p(e, t, n, r).promise();
              }function d(e) {
                this.accum = e, this.array._gotAccum(e);var t = n(this.value, this.array._promise);return t instanceof s ? (this.array._currentCancellable = t)._then(r, undefined, undefined, this, undefined) : r.call(this, t);
              }function r(e) {
                var t,
                    n = this.array,
                    r = n._promise,
                    o = l(n._fn);r._pushContext(), (t = undefined !== n._eachValues ? o.call(r._boundValue(), e, this.index, this.length) : o.call(r._boundValue(), this.accum, e, this.index, this.length)) instanceof s && (n._currentCancellable = t);var i = r._popContext();return a.checkForgottenReturns(t, i, undefined !== n._eachValues ? "Promise.each" : "Promise.reduce", r), t;
              }c.inherits(p, e), p.prototype._gotAccum = function (e) {
                undefined !== this._eachValues && null !== this._eachValues && e !== i && this._eachValues.push(e);
              }, p.prototype._eachComplete = function (e) {
                return null !== this._eachValues && this._eachValues.push(e), this._eachValues;
              }, p.prototype._init = function () {}, p.prototype._resolveEmptyArray = function () {
                this._resolve(undefined !== this._eachValues ? this._eachValues : this._initialValue);
              }, p.prototype.shouldCopyValues = function () {
                return false;
              }, p.prototype._resolve = function (e) {
                this._promise._resolveCallback(e), this._values = null;
              }, p.prototype._resultCancelled = function (e) {
                if (e === this._initialValue) return this._cancel();this._isResolved() || (this._resultCancelled$(), this._currentCancellable instanceof s && this._currentCancellable.cancel(), this._initialValue instanceof s && this._initialValue.cancel());
              }, p.prototype._iterate = function (e) {
                var t,
                    n,
                    r = (this._values = e).length;if (n = undefined !== this._initialValue ? (t = this._initialValue, 0) : (t = s.resolve(e[0]), 1), !(this._currentCancellable = t).isRejected()) for (; n < r; ++n) {
                  var o = { accum: null, value: e[n], index: n, length: r, array: this };t = t._then(d, undefined, undefined, o, undefined);
                }undefined !== this._eachValues && (t = t._then(this._eachComplete, undefined, undefined, this, undefined)), t._then(f, f, undefined, t, this);
              }, s.prototype.reduce = function (e, t) {
                return h(this, e, t, null);
              }, s.reduce = function (e, t, n, r) {
                return h(e, t, n, r);
              };
            };
          }, { "./util": 36 }], 29: [function (e, t, n) {
            "use strict";
            var r,
                o,
                i,
                s,
                a,
                u = e("./util"),
                c = u.getNativePromise();if (u.isNode && "undefined" == typeof MutationObserver) {
              var l = x.setImmediate,
                  p = Z.nextTick;r = u.isRecentNode ? function (e) {
                l.call(x, e);
              } : function (e) {
                p.call(Z, e);
              };
            } else if ("function" == typeof c && "function" == typeof c.resolve) {
              var f = c.resolve();r = function (e) {
                f.then(e);
              };
            } else r = "undefined" == typeof MutationObserver || "undefined" != typeof window && window.navigator && (window.navigator.standalone || window.cordova) ? undefined !== h ? function (e) {
              h(e);
            } : "undefined" != typeof setTimeout ? function (e) {
              setTimeout(e, 0);
            } : function () {
              throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n");
            } : (o = document.createElement("div"), s = !(i = { attributes: true }), a = document.createElement("div"), new MutationObserver(function () {
              o.classList.toggle("foo"), s = false;
            }).observe(a, i), function (e) {
              var t = new MutationObserver(function () {
                t.disconnect(), e();
              });t.observe(o, i), s || (s = true, a.classList.toggle("foo"));
            });t.exports = r;
          }, { "./util": 36 }], 30: [function (i, e, t) {
            "use strict";
            e.exports = function (e, t, n) {
              var r = e.PromiseInspection;function o(e) {
                this.constructor$(e);
              }i("./util").inherits(o, t), o.prototype._promiseResolved = function (e, t) {
                return this._values[e] = t, ++this._totalResolved >= this._length && (this._resolve(this._values), true);
              }, o.prototype._promiseFulfilled = function (e, t) {
                var n = new r();return n._bitField = 33554432, n._settledValueField = e, this._promiseResolved(t, n);
              }, o.prototype._promiseRejected = function (e, t) {
                var n = new r();return n._bitField = 16777216, n._settledValueField = e, this._promiseResolved(t, n);
              }, e.settle = function (e) {
                return n.deprecated(".settle()", ".reflect()"), new o(e).promise();
              }, e.prototype.settle = function () {
                return e.settle(this);
              };
            };
          }, { "./util": 36 }], 31: [function (l, e, t) {
            "use strict";
            e.exports = function (e, t, o) {
              var n = l("./util"),
                  r = l("./errors").RangeError,
                  i = l("./errors").AggregateError,
                  s = n.isArray,
                  a = {};function u(e) {
                this.constructor$(e), this._howMany = 0, this._unwrap = false, this._initialized = false;
              }function c(e, t) {
                if ((0 | t) !== t || t < 0) return o("expecting a positive integer\n\n    See http://goo.gl/MqrFmX\n");var n = new u(e),
                    r = n.promise();return n.setHowMany(t), n.init(), r;
              }n.inherits(u, t), u.prototype._init = function () {
                if (this._initialized) if (0 !== this._howMany) {
                  this._init$(undefined, -5);var e = s(this._values);!this._isResolved() && e && this._howMany > this._canPossiblyFulfill() && this._reject(this._getRangeError(this.length()));
                } else this._resolve([]);
              }, u.prototype.init = function () {
                this._initialized = true, this._init();
              }, u.prototype.setUnwrap = function () {
                this._unwrap = true;
              }, u.prototype.howMany = function () {
                return this._howMany;
              }, u.prototype.setHowMany = function (e) {
                this._howMany = e;
              }, u.prototype._promiseFulfilled = function (e) {
                return this._addFulfilled(e), this._fulfilled() === this.howMany() && (this._values.length = this.howMany(), 1 === this.howMany() && this._unwrap ? this._resolve(this._values[0]) : this._resolve(this._values), true);
              }, u.prototype._promiseRejected = function (e) {
                return this._addRejected(e), this._checkOutcome();
              }, u.prototype._promiseCancelled = function () {
                return this._values instanceof e || null == this._values ? this._cancel() : (this._addRejected(a), this._checkOutcome());
              }, u.prototype._checkOutcome = function () {
                if (this.howMany() > this._canPossiblyFulfill()) {
                  for (var e = new i(), t = this.length(); t < this._values.length; ++t) this._values[t] !== a && e.push(this._values[t]);return 0 < e.length ? this._reject(e) : this._cancel(), true;
                }return false;
              }, u.prototype._fulfilled = function () {
                return this._totalResolved;
              }, u.prototype._rejected = function () {
                return this._values.length - this.length();
              }, u.prototype._addRejected = function (e) {
                this._values.push(e);
              }, u.prototype._addFulfilled = function (e) {
                this._values[this._totalResolved++] = e;
              }, u.prototype._canPossiblyFulfill = function () {
                return this.length() - this._rejected();
              }, u.prototype._getRangeError = function (e) {
                var t = "Input array must contain at least " + this._howMany + " items but contains only " + e + " items";return new r(t);
              }, u.prototype._resolveEmptyArray = function () {
                this._reject(this._getRangeError(0));
              }, e.some = function (e, t) {
                return c(e, t);
              }, e.prototype.some = function (e) {
                return c(this, e);
              }, e._SomePromiseArray = u;
            };
          }, { "./errors": 12, "./util": 36 }], 32: [function (e, t, n) {
            "use strict";
            t.exports = function (e) {
              function t(e) {
                undefined !== e ? (e = e._target(), this._bitField = e._bitField, this._settledValueField = e._isFateSealed() ? e._settledValue() : undefined) : (this._bitField = 0, this._settledValueField = undefined);
              }t.prototype._settledValue = function () {
                return this._settledValueField;
              };var n = t.prototype.value = function () {
                if (!this.isFulfilled()) throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\n\n    See http://goo.gl/MqrFmX\n");return this._settledValue();
              },
                  r = t.prototype.error = t.prototype.reason = function () {
                if (!this.isRejected()) throw new TypeError("cannot get rejection reason of a non-rejected promise\n\n    See http://goo.gl/MqrFmX\n");return this._settledValue();
              },
                  o = t.prototype.isFulfilled = function () {
                return 0 != (33554432 & this._bitField);
              },
                  i = t.prototype.isRejected = function () {
                return 0 != (16777216 & this._bitField);
              },
                  s = t.prototype.isPending = function () {
                return 0 == (50397184 & this._bitField);
              },
                  a = t.prototype.isResolved = function () {
                return 0 != (50331648 & this._bitField);
              };t.prototype.isCancelled = function () {
                return 0 != (8454144 & this._bitField);
              }, e.prototype.__isCancelled = function () {
                return 65536 == (65536 & this._bitField);
              }, e.prototype._isCancelled = function () {
                return this._target().__isCancelled();
              }, e.prototype.isCancelled = function () {
                return 0 != (8454144 & this._target()._bitField);
              }, e.prototype.isPending = function () {
                return s.call(this._target());
              }, e.prototype.isRejected = function () {
                return i.call(this._target());
              }, e.prototype.isFulfilled = function () {
                return o.call(this._target());
              }, e.prototype.isResolved = function () {
                return a.call(this._target());
              }, e.prototype.value = function () {
                return n.call(this._target());
              }, e.prototype.reason = function () {
                var e = this._target();return e._unsetRejectionIsUnhandled(), r.call(e);
              }, e.prototype._value = function () {
                return this._settledValue();
              }, e.prototype._reason = function () {
                return this._unsetRejectionIsUnhandled(), this._settledValue();
              }, e.PromiseInspection = t;
            };
          }, {}], 33: [function (e, t, n) {
            "use strict";
            t.exports = function (a, u) {
              var c = e("./util"),
                  l = c.errorObj,
                  o = c.isObject,
                  i = {}.hasOwnProperty;return function (e, t) {
                if (o(e)) {
                  if (e instanceof a) return e;var n = function (e) {
                    try {
                      return e.then;
                    } catch (e) {
                      return l.e = e, l;
                    }
                  }(e);if (n === l) {
                    t && t._pushContext();var r = a.reject(n.e);return t && t._popContext(), r;
                  }if ("function" == typeof n) return function (e) {
                    try {
                      return i.call(e, "_promise0");
                    } catch (e) {
                      return false;
                    }
                  }(e) ? (r = new a(u), e._then(r._fulfill, r._reject, undefined, r, null), r) : function (e, t, n) {
                    var r = new a(u),
                        o = r;n && n._pushContext(), r._captureStackTrace(), n && n._popContext();var i = true,
                        s = c.tryCatch(t).call(e, function (e) {
                      r && (r._resolveCallback(e), r = null);
                    }, function (e) {
                      r && (r._rejectCallback(e, i, true), r = null);
                    });return i = false, r && s === l && (r._rejectCallback(s.e, true, true), r = null), o;
                  }(e, n, t);
                }return e;
              };
            };
          }, { "./util": 36 }], 34: [function (e, t, n) {
            "use strict";
            t.exports = function (o, i, a) {
              var u = e("./util"),
                  c = o.TimeoutError;function l(e) {
                this.handle = e;
              }function s(e) {
                return t(+this).thenReturn(e);
              }l.prototype._resultCancelled = function () {
                clearTimeout(this.handle);
              };var t = o.delay = function (e, t) {
                var n, r;return undefined !== t ? (n = o.resolve(t)._then(s, null, null, e, undefined), a.cancellation() && t instanceof o && n._setOnCancel(t)) : (n = new o(i), r = setTimeout(function () {
                  n._fulfill();
                }, +e), a.cancellation() && n._setOnCancel(new l(r)), n._captureStackTrace()), n._setAsyncGuaranteed(), n;
              };function n(e) {
                return clearTimeout(this.handle), e;
              }function r(e) {
                throw clearTimeout(this.handle), e;
              }o.prototype.delay = function (e) {
                return t(e, this);
              }, o.prototype.timeout = function (e, o) {
                e = +e;var i,
                    s,
                    t = new l(setTimeout(function () {
                  var e, t, n, r;i.isPending() && (e = i, n = s, r = "string" != typeof (t = o) ? t instanceof Error ? t : new c("operation timed out") : new c(t), u.markAsOriginatingFromRejection(r), e._attachExtraTrace(r), e._reject(r), null != n && n.cancel());
                }, e));return a.cancellation() ? (s = this.then(), (i = s._then(n, r, undefined, t, undefined))._setOnCancel(t)) : i = this._then(n, r, undefined, t, undefined), i;
              };
            };
          }, { "./util": 36 }], 35: [function (i, e, t) {
            "use strict";
            e.exports = function (f, h, d, t, v, m) {
              var y = i("./util"),
                  n = i("./errors").TypeError,
                  e = i("./util").inherits,
                  _ = y.errorObj,
                  g = y.tryCatch,
                  o = {};function b(e) {
                setTimeout(function () {
                  throw e;
                }, 0);
              }function E(e, t, n) {
                this._data = e, this._promise = t, this._context = n;
              }function r(e, t, n) {
                this.constructor$(e, t, n);
              }function S(e) {
                return E.isDisposer(e) ? (this.resources[this.index]._setDisposable(e), e.promise()) : e;
              }function w(e) {
                this.length = e, this.promise = null, this[e - 1] = null;
              }E.prototype.data = function () {
                return this._data;
              }, E.prototype.promise = function () {
                return this._promise;
              }, E.prototype.resource = function () {
                return this.promise().isFulfilled() ? this.promise().value() : o;
              }, E.prototype.tryDispose = function (e) {
                var t = this.resource(),
                    n = this._context;undefined !== n && n._pushContext();var r = t !== o ? this.doDispose(t, e) : null;return undefined !== n && n._popContext(), this._promise._unsetDisposable(), this._data = null, r;
              }, E.isDisposer = function (e) {
                return null != e && "function" == typeof e.resource && "function" == typeof e.tryDispose;
              }, e(r, E), r.prototype.doDispose = function (e, t) {
                return this.data().call(e, e, t);
              }, w.prototype._resultCancelled = function () {
                for (var e = this.length, t = 0; t < e; ++t) {
                  var n = this[t];n instanceof f && n.cancel();
                }
              }, f.using = function () {
                var e = arguments.length;if (e < 2) return h("you must pass at least 2 arguments to Promise.using");var t,
                    i = arguments[e - 1];if ("function" != typeof i) return h("expecting a function but got " + y.classString(i));var s = true;2 === e && Array.isArray(arguments[0]) ? (e = (t = arguments[0]).length, s = false) : (t = arguments, e--);for (var n = new w(e), r = 0; r < e; ++r) {
                  var o = t[r];if (E.isDisposer(o)) {
                    var a = o;(o = o.promise())._setDisposable(a);
                  } else {
                    var u = d(o);u instanceof f && (o = u._then(S, null, null, { resources: n, index: r }, undefined));
                  }n[r] = o;
                }var c = new Array(n.length);for (r = 0; r < c.length; ++r) c[r] = f.resolve(n[r]).reflect();var l = f.all(c).then(function (e) {
                  for (var t = 0; t < e.length; ++t) {
                    var n = e[t];if (n.isRejected()) return _.e = n.error(), _;if (!n.isFulfilled()) return undefined;e[t] = n.value();
                  }p._pushContext(), i = g(i);var r = s ? i.apply(undefined, e) : i(e),
                      o = p._popContext();return m.checkForgottenReturns(r, o, "Promise.using", p), r;
                }),
                    p = l.lastly(function () {
                  var e = new f.PromiseInspection(l);return function (o, i) {
                    var s = 0,
                        a = o.length,
                        u = new f(v);return function e() {
                      if (a <= s) return u._fulfill();var t,
                          n,
                          r = (t = o[s++], (n = d(t)) !== t && "function" == typeof t._isDisposable && "function" == typeof t._getDisposer && t._isDisposable() && n._setDisposable(t._getDisposer()), n);if (r instanceof f && r._isDisposable()) {
                        try {
                          r = d(r._getDisposer().tryDispose(i), o.promise);
                        } catch (e) {
                          return b(e);
                        }if (r instanceof f) return r._then(e, b, null, null, null);
                      }e();
                    }(), u;
                  }(n, e);
                });return (n.promise = p)._setOnCancel(n), p;
              }, f.prototype._setDisposable = function (e) {
                this._bitField = 131072 | this._bitField, this._disposer = e;
              }, f.prototype._isDisposable = function () {
                return 0 < (131072 & this._bitField);
              }, f.prototype._getDisposer = function () {
                return this._disposer;
              }, f.prototype._unsetDisposable = function () {
                this._bitField = -131073 & this._bitField, this._disposer = undefined;
              }, f.prototype.disposer = function (e) {
                if ("function" == typeof e) return new r(e, this, t());throw new n();
              };
            };
          }, { "./errors": 12, "./util": 36 }], 36: [function (e, t, n) {
            "use strict";
            var r,
                c = e("./es5"),
                o = "undefined" == typeof navigator,
                i = { e: {} },
                s = "undefined" != typeof self ? self : "undefined" != typeof window ? window : undefined !== x ? x : undefined !== this ? this : null;function a() {
              try {
                var e = r;return r = null, e.apply(this, arguments);
              } catch (e) {
                return i.e = e, i;
              }
            }function u(e) {
              return null == e || true === e || false === e || "string" == typeof e || "number" == typeof e;
            }function l(e, t, n) {
              if (u(e)) return e;var r = { value: n, configurable: true, enumerable: false, writable: true };return c.defineProperty(e, t, r), e;
            }var p = function () {
              function a(e) {
                for (var t = 0; t < o.length; ++t) if (o[t] === e) return true;return false;
              }var o = [Array.prototype, Object.prototype, Function.prototype];if (c.isES5) {
                var u = Object.getOwnPropertyNames;return function (e) {
                  for (var t = [], n = Object.create(null); null != e && !a(e);) {
                    var r;try {
                      r = u(e);
                    } catch (e) {
                      return t;
                    }for (var o = 0; o < r.length; ++o) {
                      var i = r[o];if (!n[i]) {
                        n[i] = true;var s = Object.getOwnPropertyDescriptor(e, i);null != s && null == s.get && null == s.set && t.push(i);
                      }
                    }e = c.getPrototypeOf(e);
                  }return t;
                };
              }var i = {}.hasOwnProperty;return function (e) {
                if (a(e)) return [];var t = [];e: for (var n in e) if (i.call(e, n)) t.push(n);else {
                  for (var r = 0; r < o.length; ++r) if (i.call(o[r], n)) continue e;t.push(n);
                }return t;
              };
            }(),
                f = /this\s*\.\s*\S+\s*=/,
                h = /^[a-z$_][a-z$_0-9]*$/i;function d(e) {
              try {
                return e + "";
              } catch (e) {
                return "[no string representation]";
              }
            }function v(e) {
              return e instanceof Error || null !== e && "object" == typeof e && "string" == typeof e.message && "string" == typeof e.name;
            }function m(e) {
              return v(e) && c.propertyIsWritable(e, "stack");
            }var y = "stack" in new Error() ? function (e) {
              return m(e) ? e : new Error(d(e));
            } : function (e) {
              if (m(e)) return e;try {
                throw new Error(d(e));
              } catch (e) {
                return e;
              }
            };function _(e) {
              return {}.toString.call(e);
            }var g = function (e) {
              return c.isArray(e) ? e : null;
            };if ("undefined" != typeof Symbol && Symbol.iterator) {
              var b = "function" == typeof Array.from ? function (e) {
                return Array.from(e);
              } : function (e) {
                for (var t, n = [], r = e[Symbol.iterator](); !(t = r.next()).done;) n.push(t.value);return n;
              };g = function (e) {
                return c.isArray(e) ? e : null != e && "function" == typeof e[Symbol.iterator] ? b(e) : null;
              };
            }var E,
                S = undefined !== Z && "[object process]" === _(Z).toLowerCase(),
                w = undefined !== Z && undefined !== Z.env,
                T = { isClass: function (e) {
                try {
                  if ("function" == typeof e) {
                    var t = c.names(e.prototype),
                        n = c.isES5 && 1 < t.length,
                        r = 0 < t.length && !(1 === t.length && "constructor" === t[0]),
                        o = f.test(e + "") && 0 < c.names(e).length;if (n || r || o) return true;
                  }return false;
                } catch (e) {
                  return false;
                }
              }, isIdentifier: function (e) {
                return h.test(e);
              }, inheritedDataKeys: p, getDataPropertyOrDefault: function (e, t, n) {
                if (!c.isES5) return {}.hasOwnProperty.call(e, t) ? e[t] : undefined;var r = Object.getOwnPropertyDescriptor(e, t);return null != r ? null == r.get && null == r.set ? r.value : n : undefined;
              }, thrower: function (e) {
                throw e;
              }, isArray: c.isArray, asArray: g, notEnumerableProp: l, isPrimitive: u, isObject: function (e) {
                return "function" == typeof e || "object" == typeof e && null !== e;
              }, isError: v, canEvaluate: o, errorObj: i, tryCatch: function (e) {
                return r = e, a;
              }, inherits: function (t, n) {
                var r = {}.hasOwnProperty;function e() {
                  for (var e in this.constructor = t, (this.constructor$ = n).prototype) r.call(n.prototype, e) && "$" !== e.charAt(e.length - 1) && (this[e + "$"] = n.prototype[e]);
                }return e.prototype = n.prototype, t.prototype = new e(), t.prototype;
              }, withAppended: function (e, t) {
                var n,
                    r = e.length,
                    o = new Array(r + 1);for (n = 0; n < r; ++n) o[n] = e[n];return o[n] = t, o;
              }, maybeWrapAsError: function (e) {
                return u(e) ? new Error(d(e)) : e;
              }, toFastProperties: function (e) {
                function t() {}t.prototype = e;var n = new t();function r() {
                  return typeof n.foo;
                }return r(), r(), e;
              }, filledRange: function (e, t, n) {
                for (var r = new Array(e), o = 0; o < e; ++o) r[o] = t + o + n;return r;
              }, toString: d, canAttachTrace: m, ensureErrorObject: y, originatesFromRejection: function (e) {
                return null != e && (e instanceof Error.__BluebirdErrorTypes__.OperationalError || true === e.isOperational);
              }, markAsOriginatingFromRejection: function (e) {
                try {
                  l(e, "isOperational", true);
                } catch (e) {}
              }, classString: _, copyDescriptors: function (e, t, n) {
                for (var r = c.names(e), o = 0; o < r.length; ++o) {
                  var i = r[o];if (n(i)) try {
                    c.defineProperty(t, i, c.getDescriptor(e, i));
                  } catch (e) {}
                }
              }, hasDevTools: "undefined" != typeof chrome && chrome && "function" == typeof chrome.loadTimes, isNode: S, hasEnvVariables: w, env: function (e) {
                return w ? Z.env[e] : undefined;
              }, global: s, getNativePromise: function () {
                if ("function" == typeof Promise) try {
                  var e = new Promise(function () {});if ("[object Promise]" === {}.toString.call(e)) return Promise;
                } catch (e) {}
              }, domainBind: function (e, t) {
                return e.bind(t);
              } };T.isRecentNode = T.isNode && (0 === (E = Z.versions.node.split(".").map(Number))[0] && 10 < E[1] || 0 < E[0]), T.isNode && T.toFastProperties(Z);try {
              throw new Error();
            } catch (e) {
              T.lastLineError = e;
            }t.exports = T;
          }, { "./es5": 13 }] }, {}, [4])(4);
      }, t.exports = e(), "undefined" != typeof window && null !== window ? window.P = window.Promise : "undefined" != typeof self && null !== self && (self.P = self.Promise);
    }).call(this, n(81), n(8), n(125).setImmediate);
  }, function (e, t) {
    var n;n = function () {
      return this;
    }();try {
      n = n || new Function("return this")();
    } catch (e) {
      "object" == typeof window && (n = window);
    }e.exports = n;
  }, function (e, t, n) {
    var r = n(6),
        o = n(68),
        i = n(50),
        s = Object.defineProperty;t.f = n(10) ? Object.defineProperty : function (e, t, n) {
      if (r(e), t = i(t, true), r(n), o) try {
        return s(e, t, n);
      } catch (e) {}if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");return "value" in n && (e[t] = n.value), e;
    };
  }, function (e, t, n) {
    e.exports = !n(15)(function () {
      return 7 != Object.defineProperty({}, "a", { get: function () {
          return 7;
        } }).a;
    });
  }, function (e, t, n) {
    e.exports = { default: n(142), __esModule: true };
  }, function (e, t, n) {
    "use strict";
    var r,
        o,
        i,
        s,
        a,
        u = (o = n(23)) && o.__esModule ? o : { default: o };function c() {}function l(e, t) {
      for (var n = e.length; n--;) if (e[n].listener === t) return n;return -1;
    }function p(e) {
      return function () {
        return this[e].apply(this, arguments);
      };
    }i = "undefined" != typeof window ? window : {}, s = c.prototype, a = i.EventEmitter, s.getListeners = function (e) {
      var t = this._getEvents(),
          n = undefined,
          r = undefined;if (e instanceof RegExp) for (r in n = {}, t) t.hasOwnProperty(r) && e.test(r) && (n[r] = t[r]);else n = t[e] || (t[e] = []);return n;
    }, s.flattenListeners = function (e) {
      var t = [],
          n = undefined;for (n = 0; n < e.length; n += 1) t.push(e[n].listener);return t;
    }, s.getListenersAsObject = function (e) {
      var t = this.getListeners(e),
          n = undefined;return t instanceof Array && ((n = {})[e] = t), n || t;
    }, s.addListener = function (e, t) {
      if (!function e(t) {
        return "function" == typeof t || t instanceof RegExp || !(!t || "object" !== (undefined === t ? "undefined" : (0, u.default)(t))) && e(t.listener);
      }(t)) throw new TypeError("listener must be a function");var n = this.getListenersAsObject(e),
          r = "object" === (undefined === t ? "undefined" : (0, u.default)(t)),
          o = undefined;for (o in n) n.hasOwnProperty(o) && -1 === l(n[o], t) && n[o].push(r ? t : { listener: t, once: false });return this;
    }, s.on = p("addListener"), s.addOnceListener = function (e, t) {
      return this.addListener(e, { listener: t, once: true });
    }, s.once = p("addOnceListener"), s.defineEvent = function (e) {
      return this.getListeners(e), this;
    }, s.defineEvents = function (e) {
      for (var t = 0; t < e.length; t += 1) this.defineEvent(e[t]);return this;
    }, s.removeListener = function (e, t) {
      var n = this.getListenersAsObject(e),
          r = undefined,
          o = undefined;for (o in n) n.hasOwnProperty(o) && -1 !== (r = l(n[o], t)) && n[o].splice(r, 1);return this;
    }, s.off = p("removeListener"), s.addListeners = function (e, t) {
      return this.manipulateListeners(false, e, t);
    }, s.removeListeners = function (e, t) {
      return this.manipulateListeners(true, e, t);
    }, s.manipulateListeners = function (e, t, n) {
      var r = undefined,
          o = undefined,
          i = e ? this.removeListener : this.addListener,
          s = e ? this.removeListeners : this.addListeners;if ("object" !== (undefined === t ? "undefined" : (0, u.default)(t)) || t instanceof RegExp) for (r = n.length; r--;) i.call(this, t, n[r]);else for (r in t) t.hasOwnProperty(r) && (o = t[r]) && ("function" == typeof o ? i.call(this, r, o) : s.call(this, r, o));return this;
    }, s.removeEvent = function (e) {
      var t = undefined === e ? "undefined" : (0, u.default)(e),
          n = this._getEvents(),
          r = undefined;if ("string" === t) delete n[e];else if (e instanceof RegExp) for (r in n) n.hasOwnProperty(r) && e.test(r) && delete n[r];else delete this._events;return this;
    }, s.removeAllListeners = p("removeEvent"), s.emitEvent = function (e, t) {
      var n = this.getListenersAsObject(e),
          r = undefined,
          o = undefined,
          i = undefined,
          s = undefined;for (s in n) if (n.hasOwnProperty(s)) for (r = n[s].slice(0), i = 0; i < r.length; i++) true === (o = r[i]).once && this.removeListener(e, o.listener), o.listener.apply(this, t || []) === this._getOnceReturnValue() && this.removeListener(e, o.listener);return this;
    }, s.trigger = p("emitEvent"), s.emit = function (e) {
      var t = Array.prototype.slice.call(arguments, 1);return this.emitEvent(e, t);
    }, s.setOnceReturnValue = function (e) {
      return this._onceReturnValue = e, this;
    }, s._getOnceReturnValue = function () {
      return !this.hasOwnProperty("_onceReturnValue") || this._onceReturnValue;
    }, s._getEvents = function () {
      return this._events || (this._events = {});
    }, c.noConflict = function () {
      return i.EventEmitter = a, c;
    }, undefined !== (r = function () {
      return c;
    }.call(i, n, i, e)) && (e.exports = r);
  }, function (e, t, n) {
    var i = n(17);e.exports = function (r, o, e) {
      if (i(r), undefined === o) return r;switch (e) {case 1:
          return function (e) {
            return r.call(o, e);
          };case 2:
          return function (e, t) {
            return r.call(o, e, t);
          };case 3:
          return function (e, t, n) {
            return r.call(o, e, t, n);
          };}return function () {
        return r.apply(o, arguments);
      };
    };
  }, function (e, t, n) {
    var r = n(9),
        o = n(36);e.exports = n(10) ? function (e, t, n) {
      return r.f(e, t, o(1, n));
    } : function (e, t, n) {
      return e[t] = n, e;
    };
  }, function (e, t) {
    e.exports = function (e) {
      try {
        return !!e();
      } catch (e) {
        return true;
      }
    };
  }, function (e, t, n) {
    "use strict";
    var o = u(n(25)),
        r = u(n(26)),
        i = u(n(7)),
        s = u(n(12)),
        a = u(n(1));function u(e) {
      return e && e.__esModule ? e : { default: e };
    }e.exports.EventStatus = { NOT_SENT: "not_sent", ENCRYPTING: "encrypting", SENDING: "sending", QUEUED: "queued", SENT: "sent", CANCELLED: "cancelled" };var c,
        l,
        p = {};e.exports.MatrixEvent = function (t) {
      ["state_key", "type", "sender", "room_id", "membership"].forEach(function (e) {
        t[e] && (p[t[e]] || (p[t[e]] = t[e]), t[e] = p[t[e]]);
      }), ["membership", "avatar_url", "displayname"].forEach(function (e) {
        t.content && t.content[e] && (p[t.content[e]] || (p[t.content[e]] = t.content[e]), t.content[e] = p[t.content[e]]);
      }), this.event = t || {}, this.sender = null, this.target = null, this.status = null, this.error = null, this.forwardLooking = true, this._pushActions = null, this._clearEvent = {}, this._senderCurve25519Key = null, this._claimedEd25519Key = null, this._forwardingCurve25519KeyChain = [], this._decryptionPromise = null, this._retryDecryption = false;
    }, a.default.inherits(e.exports.MatrixEvent, s.default), a.default.extend(e.exports.MatrixEvent.prototype, { getId: function () {
        return this.event.event_id;
      }, getSender: function () {
        return this.event.sender || this.event.user_id;
      }, getType: function () {
        return this._clearEvent.type || this.event.type;
      }, getWireType: function () {
        return this.event.type;
      }, getRoomId: function () {
        return this.event.room_id;
      }, getTs: function () {
        return this.event.origin_server_ts;
      }, getDate: function () {
        return this.event.origin_server_ts ? new Date(this.event.origin_server_ts) : null;
      }, getContent: function () {
        return this._clearEvent.content || this.event.content || {};
      }, getWireContent: function () {
        return this.event.content || {};
      }, getPrevContent: function () {
        return this.getUnsigned().prev_content || this.event.prev_content || {};
      }, getDirectionalContent: function () {
        return this.forwardLooking ? this.getContent() : this.getPrevContent();
      }, getAge: function () {
        return this.getUnsigned().age || this.event.age;
      }, getStateKey: function () {
        return this.event.state_key;
      }, isState: function () {
        return undefined !== this.event.state_key;
      }, makeEncrypted: function (e, t, n, r) {
        this._clearEvent = { type: this.event.type, content: this.event.content }, this.event.type = e, this.event.content = t, this._senderCurve25519Key = n, this._claimedEd25519Key = r;
      }, isBeingDecrypted: function () {
        return null != this._decryptionPromise;
      }, isDecryptionFailure: function () {
        return this._clearEvent && this._clearEvent.content && "m.bad.encrypted" === this._clearEvent.content.msgtype;
      }, attemptDecryption: (l = (0, r.default)(o.default.mark(function e(t) {
        return o.default.wrap(function (e) {
          for (;;) switch (e.prev = e.next) {case 0:
              if (this.isEncrypted()) {
                e.next = 2;break;
              }throw new Error("Attempt to decrypt event which isn't encrypted");case 2:
              if (this._clearEvent && this._clearEvent.content && "m.bad.encrypted" !== this._clearEvent.content.msgtype) throw new Error("Attempt to decrypt event which has already been encrypted");e.next = 4;break;case 4:
              if (this._decryptionPromise) return console.log("Event " + this.getId() + " already being decrypted; queueing a retry"), this._retryDecryption = true, e.abrupt("return", this._decryptionPromise);e.next = 8;break;case 8:
              return this._decryptionPromise = this._decryptionLoop(t), e.abrupt("return", this._decryptionPromise);case 10:case "end":
              return e.stop();}
        }, e, this);
      })), function (e) {
        return l.apply(this, arguments);
      }), cancelAndResendKeyRequest: function (e) {
        var t = this.getWireContent();e.cancelRoomKeyRequest({ algorithm: t.algorithm, room_id: this.getRoomId(), session_id: t.session_id, sender_key: t.sender_key }, true);
      }, _decryptionLoop: (c = (0, r.default)(o.default.mark(function e(t) {
        var n, r;return o.default.wrap(function (e) {
          for (;;) switch (e.prev = e.next) {case 0:
              return e.next = 2, i.default.resolve();case 2:
              if (this._retryDecryption = false, r = n = undefined, e.prev = 6, t) {
                e.next = 11;break;
              }n = this._badEncryptedMessage("Encryption not enabled"), e.next = 14;break;case 11:
              return e.next = 13, t.decryptEvent(this);case 13:
              n = e.sent;case 14:
              e.next = 29;break;case 16:
              if (e.prev = 16, e.t0 = e.catch(6), "DecryptionError" !== e.t0.name) return console.error("Error decrypting event (id=" + this.getId() + "): " + (e.t0.stack || e.t0)), this._decryptionPromise = null, this._retryDecryption = false, e.abrupt("return");e.next = 23;break;case 23:
              if (r = e.t0, this._retryDecryption) return console.log("Got error decrypting event (id=" + this.getId() + ": " + e.t0 + "), but retrying"), e.abrupt("continue", 2);e.next = 27;break;case 27:
              console.warn("Error decrypting event (id=" + this.getId() + "): " + e.t0.detailedString), n = this._badEncryptedMessage(e.t0.message);case 29:
              return this._decryptionPromise = null, this._retryDecryption = false, this._setClearData(n), this.emit("Event.decrypted", this, r), e.abrupt("return");case 36:case "end":
              return e.stop();}
        }, e, this, [[6, 16]]);
      })), function (e) {
        return c.apply(this, arguments);
      }), _badEncryptedMessage: function (e) {
        return { clearEvent: { type: "m.room.message", content: { msgtype: "m.bad.encrypted", body: "** Unable to decrypt: " + e + " **" } } };
      }, _setClearData: function (e) {
        this._clearEvent = e.clearEvent, this._senderCurve25519Key = e.senderCurve25519Key || null, this._claimedEd25519Key = e.claimedEd25519Key || null, this._forwardingCurve25519KeyChain = e.forwardingCurve25519KeyChain || [];
      }, isEncrypted: function () {
        return "m.room.encrypted" === this.event.type;
      }, getSenderKey: function () {
        return this._senderCurve25519Key;
      }, getKeysClaimed: function () {
        return { ed25519: this._claimedEd25519Key };
      }, getClaimedEd25519Key: function () {
        return this._claimedEd25519Key;
      }, getForwardingCurve25519KeyChain: function () {
        return this._forwardingCurve25519KeyChain;
      }, getUnsigned: function () {
        return this.event.unsigned || {};
      }, makeRedacted: function (e) {
        if (!e.event) throw new Error("invalid redaction_event in makeRedacted");this.event.unsigned || (this.event.unsigned = {}), this.event.unsigned.redacted_because = e.event;var t = undefined;for (t in this.event) this.event.hasOwnProperty(t) && (f[t] || delete this.event[t]);var n = h[this.getType()] || {},
            r = this.getContent();for (t in r) r.hasOwnProperty(t) && (n[t] || delete r[t]);
      }, isRedacted: function () {
        return Boolean(this.getUnsigned().redacted_because);
      }, getPushActions: function () {
        return this._pushActions;
      }, setPushActions: function (e) {
        this._pushActions = e;
      }, handleRemoteEcho: function (e) {
        this.event = e, this.status = null;
      } });var f = ["event_id", "type", "room_id", "user_id", "sender", "state_key", "prev_state", "content", "unsigned", "origin_server_ts"].reduce(function (e, t) {
      return e[t] = 1, e;
    }, {}),
        h = { "m.room.member": { membership: 1 }, "m.room.create": { creator: 1 }, "m.room.join_rules": { join_rule: 1 }, "m.room.power_levels": { ban: 1, events: 1, events_default: 1, kick: 1, redact: 1, state_default: 1, users: 1, users_default: 1 }, "m.room.aliases": { aliases: 1 } };
  }, function (e, t) {
    e.exports = function (e) {
      if ("function" != typeof e) throw TypeError(e + " is not a function!");return e;
    };
  }, function (e, t) {
    var n = {}.hasOwnProperty;e.exports = function (e, t) {
      return n.call(e, t);
    };
  }, function (e, t, n) {
    var r = n(51),
        o = n(47);e.exports = function (e) {
      return r(o(e));
    };
  }, function (e, t, n) {
    e.exports = { default: n(148), __esModule: true };
  }, function (e, t) {
    e.exports = {};
  }, function (e, t, n) {
    var r = n(70),
        o = n(55);e.exports = Object.keys || function (e) {
      return r(e, o);
    };
  }, function (e, t, n) {
    "use strict";
    t.__esModule = true;var r = s(n(127)),
        o = s(n(129)),
        i = "function" == typeof o.default && "symbol" == typeof r.default ? function (e) {
      return typeof e;
    } : function (e) {
      return e && "function" == typeof o.default && e.constructor === o.default && e !== o.default.prototype ? "symbol" : typeof e;
    };function s(e) {
      return e && e.__esModule ? e : { default: e };
    }t.default = "function" == typeof o.default && "symbol" === i(r.default) ? function (e) {
      return undefined === e ? "undefined" : i(e);
    } : function (e) {
      return e && "function" == typeof o.default && e.constructor === o.default && e !== o.default.prototype ? "symbol" : undefined === e ? "undefined" : i(e);
    };
  }, function (e, t, n) {
    "use strict";
    var a = r(n(193)),
        u = r(n(11));function r(e) {
      return e && e.__esModule ? e : { default: e };
    }var o = n(98);function i(e) {
      this._eventTimelineSet = e, this._roomId = e.room ? e.room.roomId : null, this._events = [], this._baseIndex = 0, this._startState = new o(this._roomId), this._startState.paginationToken = null, this._endState = new o(this._roomId), this._endState.paginationToken = null, this._prevTimeline = null, this._nextTimeline = null, this._paginationRequests = { b: null, f: null }, this._name = this._roomId + ":" + new Date().toISOString();
    }i.BACKWARDS = "b", i.FORWARDS = "f", i.prototype.initialiseState = function (e) {
      if (0 < this._events.length) throw new Error("Cannot initialise state after events are added");var t = true,
          n = false,
          r = undefined;try {
        for (var o, i = (0, u.default)(e); !(t = (o = i.next()).done); t = true) {
          var s = o.value;(0, a.default)(s);
        }
      } catch (e) {
        n = true, r = e;
      } finally {
        try {
          !t && i.return && i.return();
        } finally {
          if (n) throw r;
        }
      }this._startState.setStateEvents(e), this._endState.setStateEvents(e);
    }, i.prototype.forkLive = function (e) {
      var t = this.getState(e),
          n = new i(this._eventTimelineSet);return n._startState = t.clone(), n._endState = t, this._endState = t.clone(), n;
    }, i.prototype.fork = function (e) {
      var t = this.getState(e),
          n = new i(this._eventTimelineSet);return n._startState = t.clone(), n._endState = t.clone(), n;
    }, i.prototype.getRoomId = function () {
      return this._roomId;
    }, i.prototype.getFilter = function () {
      return this._eventTimelineSet.getFilter();
    }, i.prototype.getTimelineSet = function () {
      return this._eventTimelineSet;
    }, i.prototype.getBaseIndex = function () {
      return this._baseIndex;
    }, i.prototype.getEvents = function () {
      return this._events;
    }, i.prototype.getState = function (e) {
      if (e == i.BACKWARDS) return this._startState;if (e == i.FORWARDS) return this._endState;throw new Error("Invalid direction '" + e + "'");
    }, i.prototype.getPaginationToken = function (e) {
      return this.getState(e).paginationToken;
    }, i.prototype.setPaginationToken = function (e, t) {
      this.getState(t).paginationToken = e;
    }, i.prototype.getNeighbouringTimeline = function (e) {
      if (e == i.BACKWARDS) return this._prevTimeline;if (e == i.FORWARDS) return this._nextTimeline;throw new Error("Invalid direction '" + e + "'");
    }, i.prototype.setNeighbouringTimeline = function (e, t) {
      if (this.getNeighbouringTimeline(t)) throw new Error("timeline already has a neighbouring timeline - cannot reset neighbour");if (t == i.BACKWARDS) this._prevTimeline = e;else {
        if (t != i.FORWARDS) throw new Error("Invalid direction '" + t + "'");this._nextTimeline = e;
      }this.setPaginationToken(null, t);
    }, i.prototype.addEvent = function (e, t) {
      var n,
          r = t ? this._startState : this._endState,
          o = this.getTimelineSet();o.room && o.room.getUnfilteredTimelineSet() === o && (i.setEventMetadata(e, r, t), e.isState() && (r.setStateEvents([e]), e.sender && ("m.room.member" !== e.getType() || t) || i.setEventMetadata(e, r, t))), n = t ? 0 : this._events.length, this._events.splice(n, 0, e), t && this._baseIndex++;
    }, i.setEventMetadata = function (e, t, n) {
      e.sender = t.getSentinelMember(e.getSender()), "m.room.member" === e.getType() && (e.target = t.getSentinelMember(e.getStateKey())), e.isState() && n && (e.forwardLooking = false);
    }, i.prototype.removeEvent = function (e) {
      for (var t = this._events.length - 1; 0 <= t; t--) {
        var n = this._events[t];if (n.getId() == e) return this._events.splice(t, 1), t < this._baseIndex && this._baseIndex--, n;
      }return null;
    }, i.prototype.toString = function () {
      return this._name;
    }, e.exports = i;
  }, function (e, t, n) {
    e.exports = n(107);
  }, function (e, t, n) {
    "use strict";
    t.__esModule = true;var r,
        u = (r = n(67)) && r.__esModule ? r : { default: r };t.default = function (e) {
      return function () {
        var a = e.apply(this, arguments);return new u.default(function (i, s) {
          return function t(e, n) {
            try {
              var r = a[e](n),
                  o = r.value;
            } catch (e) {
              return undefined;
            }if (!r.done) return u.default.resolve(o).then(function (e) {
              t("next", e);
            }, function (e) {
              t("throw", e);
            });i(o);
          }("next");
        });
      };
    };
  }, function (e, t, n) {
    "use strict";
    var r = n(110)(true);n(48)(String, "String", function (e) {
      this._t = String(e), this._i = 0;
    }, function () {
      var e,
          t = this._t,
          n = this._i;return n >= t.length ? { value: undefined, done: true } : (e = r(t, n), this._i += e.length, { value: e, done: false });
    });
  }, function (e, t) {
    e.exports = true;
  }, function (e, t, r) {
    function o() {}var i = r(6),
        s = r(112),
        a = r(55),
        u = r(53)("IE_PROTO"),
        c = function () {
      var e,
          t = r(49)("iframe"),
          n = a.length;for (t.style.display = "none", r(71).appendChild(t), t.src = "javascript:", (e = t.contentWindow.document).open(), e.write("<script>document.F=Object<\/script>"), e.close(), c = e.F; n--;) delete c.prototype[a[n]];return c();
    };e.exports = Object.create || function (e, t) {
      var n;return null !== e ? (o.prototype = i(e), n = new o(), o.prototype = null, n[u] = e) : n = c(), undefined === t ? n : s(n, t);
    };
  }, function (e, t) {
    var n = {}.toString;e.exports = function (e) {
      return n.call(e).slice(8, -1);
    };
  }, function (e, t, n) {
    var r = n(9).f,
        o = n(18),
        i = n(5)("toStringTag");e.exports = function (e, t, n) {
      e && !o(e = n ? e : e.prototype, i) && r(e, i, { configurable: true, value: t });
    };
  }, function (e, t, n) {
    n(115);for (var r = n(3), o = n(14), i = n(21), s = n(5)("toStringTag"), a = "CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","), u = 0; u < a.length; u++) {
      var c = a[u],
          l = r[c],
          p = l && l.prototype;p && !p[s] && o(p, s, c), i[c] = i.Array;
    }
  }, function (e, t, n) {
    var f = n(13),
        h = n(118),
        d = n(119),
        v = n(6),
        m = n(52),
        y = n(74),
        _ = {},
        g = {};(t = e.exports = function (e, t, n, r, o) {
      var i,
          s,
          a,
          u,
          c = o ? function () {
        return e;
      } : y(e),
          l = f(n, r, t ? 2 : 1),
          p = 0;if ("function" != typeof c) throw TypeError(e + " is not iterable!");if (d(c)) {
        for (i = m(e.length); p < i; p++) if ((u = t ? l(v(s = e[p])[0], s[1]) : l(e[p])) === _ || u === g) return u;
      } else for (a = c.call(e); !(s = a.next()).done;) if ((u = h(a, l, s.value, t)) === _ || u === g) return u;
    }).BREAK = _, t.RETURN = g;
  }, function (e, t) {
    t.f = {}.propertyIsEnumerable;
  }, function (e, t, n) {
    e.exports = { default: n(138), __esModule: true };
  }, function (e, t) {
    e.exports = function (e, t) {
      return { enumerable: !(1 & e), configurable: !(2 & e), writable: !(4 & e), value: t };
    };
  }, function (e, t) {
    var n = 0,
        r = Math.random();e.exports = function (e) {
      return "Symbol(".concat(undefined === e ? "" : e, ")_", (++n + r).toString(36));
    };
  }, function (e, t, n) {
    var r = n(47);e.exports = function (e) {
      return Object(r(e));
    };
  }, function (e, t, n) {
    var o = n(30),
        i = n(5)("toStringTag"),
        s = "Arguments" == o(function () {
      return arguments;
    }());e.exports = function (e) {
      var t, n, r;return undefined === e ? "Undefined" : null === e ? "Null" : "string" == typeof (n = function (e, t) {
        try {
          return e[t];
        } catch (e) {}
      }(t = Object(e), i)) ? n : s ? o(t) : "Object" == (r = o(t)) && "function" == typeof t.callee ? "Arguments" : r;
    };
  }, function (e, t, n) {
    function r(e) {
      a(e, o, { value: { i: "O" + ++u, w: {} } });
    }var o = n(37)("meta"),
        i = n(4),
        s = n(18),
        a = n(9).f,
        u = 0,
        c = Object.isExtensible || function () {
      return true;
    },
        l = !n(15)(function () {
      return c(Object.preventExtensions({}));
    }),
        p = e.exports = { KEY: o, NEED: false, fastKey: function (e, t) {
        if (!i(e)) return "symbol" == typeof e ? e : ("string" == typeof e ? "S" : "P") + e;if (!s(e, o)) {
          if (!c(e)) return "F";if (!t) return "E";r(e);
        }return e[o].i;
      }, getWeak: function (e, t) {
        if (!s(e, o)) {
          if (!c(e)) return true;if (!t) return false;r(e);
        }return e[o].w;
      }, onFreeze: function (e) {
        return l && p.NEED && c(e) && !s(e, o) && r(e), e;
      } };
  }, function (e, t, n) {
    e.exports = { default: n(136), __esModule: true };
  }, function (e, t, n) {
    "use strict";
    var r = n(12);function o(e) {
      this.userId = e, this.presence = "offline", this.presenceStatusMsg = null, this.displayName = e, this.rawDisplayName = e, this.avatarUrl = null, this.lastActiveAgo = 0, this.lastPresenceTs = 0, this.currentlyActive = false, this.events = { presence: null, profile: null }, this._updateModifiedTime();
    }n(1).inherits(o, r), o.prototype.setPresenceEvent = function (e) {
      if ("m.presence" === e.getType()) {
        var t = null === this.events.presence,
            n = [];(this.events.presence = e).getContent().presence === this.presence && !t || n.push("User.presence"), e.getContent().avatar_url && e.getContent().avatar_url !== this.avatarUrl && n.push("User.avatarUrl"), e.getContent().displayname && e.getContent().displayname !== this.displayName && n.push("User.displayName"), undefined !== e.getContent().currently_active && e.getContent().currently_active !== this.currentlyActive && n.push("User.currentlyActive"), this.presence = e.getContent().presence, n.push("User.lastPresenceTs"), e.getContent().status_msg && (this.presenceStatusMsg = e.getContent().status_msg), e.getContent().displayname && (this.displayName = e.getContent().displayname), e.getContent().avatar_url && (this.avatarUrl = e.getContent().avatar_url), this.lastActiveAgo = e.getContent().last_active_ago, this.lastPresenceTs = Date.now(), this.currentlyActive = e.getContent().currently_active, this._updateModifiedTime();for (var r = 0; r < n.length; r++) this.emit(n[r], e, this);
      }
    }, o.prototype.setDisplayName = function (e) {
      var t = this.displayName;(this.displayName = e) !== t && this._updateModifiedTime();
    }, o.prototype.setRawDisplayName = function (e) {
      this.rawDisplayName = e;
    }, o.prototype.setAvatarUrl = function (e) {
      var t = this.avatarUrl;(this.avatarUrl = e) !== t && this._updateModifiedTime();
    }, o.prototype._updateModifiedTime = function () {
      this._modified = Date.now();
    }, o.prototype.getLastModifiedTime = function () {
      return this._modified;
    }, o.prototype.getLastActiveTs = function () {
      return this.lastPresenceTs - this.lastActiveAgo;
    }, e.exports = o;
  }, function (x, e, n) {
    "use strict";
    (function (b) {
      var e = t(n(41)),
          _ = t(n(35)),
          g = t(n(23)),
          E = t(n(7));function t(e) {
        return e && e.__esModule ? e : { default: e };
      }var h = n(154).parse,
          S = n(1),
          w = n(155);x.exports.PREFIX_R0 = "/_matrix/client/r0", x.exports.PREFIX_UNSTABLE = "/_matrix/client/unstable", x.exports.PREFIX_IDENTITY_V1 = "/_matrix/identity/api/v1", x.exports.PREFIX_MEDIA_R0 = "/_matrix/media/r0", x.exports.MatrixHttpApi = function (e, t) {
        S.checkObjectHasKeys(t, ["baseUrl", "request", "prefix"]), t.onlyData = t.onlyData || false, this.event_emitter = e, this.opts = t, this.useAuthorizationHeader = Boolean(t.useAuthorizationHeader), this.uploads = [];
      }, x.exports.MatrixHttpApi.prototype = { getContentUri: function () {
          var e = { access_token: this.opts.accessToken };return { base: this.opts.baseUrl, path: "/_matrix/media/v1/upload", params: e };
        }, uploadContent: function (e, t) {
          S.isFunction(t) ? t = { callback: t } : undefined === t && (t = {});var n = false !== t.includeFilename,
              r = t.type || e.type || "application/octet-stream",
              o = t.name || e.name,
              i = e.stream ? e.stream : e,
              s = t.rawResponse;undefined === s && (s = !b.XMLHttpRequest && (console.warn("Returning the raw JSON from uploadContent(). Future versions of the js-sdk will change this default, to return the parsed object. Set opts.rawResponse=false to change this behaviour now."), true));var a = t.onlyContentUri;s || undefined !== a || (a = !!b.XMLHttpRequest && (console.warn("Returning only the content-uri from uploadContent(). Future versions of the js-sdk will change this default, to return the whole response object. Set opts.onlyContentUri=false to change this behaviour now."), true));var u = { loaded: 0, total: 0 },
              c = undefined,
              l = null;if (s || (l = function (e) {
            var t = JSON.parse(e);if (a && undefined === (t = t.content_uri)) throw Error("Bad response");return t;
          }), b.XMLHttpRequest) {
            var p = E.default.defer(),
                f = new b.XMLHttpRequest();u.xhr = f;var h = T(p, t.callback, this.opts.onlyData),
                d = function () {
              f.abort(), h(new Error("Timeout"));
            };f.timeout_timer = w.setTimeout(d, 3e4), f.onreadystatechange = function () {
              switch (f.readyState) {case b.XMLHttpRequest.DONE:
                  var e;w.clearTimeout(f.timeout_timer);try {
                    if (!f.responseText) throw new Error("No response body.");e = f.responseText, l && (e = l(e));
                  } catch (e) {
                    return e.http_status = f.status, undefined;
                  }h(undefined, f, e);}
            }, f.upload.addEventListener("progress", function (e) {
              w.clearTimeout(f.timeout_timer), u.loaded = e.loaded, u.total = e.total, f.timeout_timer = w.setTimeout(d, 3e4), t.progressHandler && t.progressHandler({ loaded: e.loaded, total: e.total });
            });var v = this.opts.baseUrl + "/_matrix/media/v1/upload",
                m = [];n && o && m.push("filename=" + encodeURIComponent(o)), this.useAuthorizationHeader || m.push("access_token=" + encodeURIComponent(this.opts.accessToken)), 0 < m.length && (v += "?" + m.join("&")), f.open("POST", v), this.useAuthorizationHeader && f.setRequestHeader("Authorization", "Bearer " + this.opts.accessToken), f.setRequestHeader("Content-Type", r), f.send(i), (c = p.promise).abort = f.abort.bind(f);
          } else {
            var y = {};n && o && (y.filename = o), c = this.authedRequest(t.callback, "POST", "/upload", y, i, { prefix: "/_matrix/media/v1", headers: { "Content-Type": r }, json: false, bodyParser: l });
          }var _ = this,
              g = c.finally(function () {
            for (var e = 0; e < _.uploads.length; ++e) if (_.uploads[e] === u) return undefined;
          });return g.abort = c.abort, u.promise = g, this.uploads.push(u), g;
        }, cancelUpload: function (e) {
          return !!e.abort && (e.abort(), true);
        }, getCurrentUploads: function () {
          return this.uploads;
        }, idServerRequest: function (e, t, n, r, o) {
          var i = this.opts.idBaseUrl + o + n;if (undefined !== e && !S.isFunction(e)) throw Error("Expected callback to be a function but got " + (undefined === e ? "undefined" : (0, g.default)(e)));var s = { uri: i, method: t, withCredentials: false, json: false, _matrix_opts: this.opts };"GET" == t ? s.qs = r : s.form = r;var a = E.default.defer();return this.opts.request(s, T(a, e, this.opts.onlyData)), a.promise.then(function (e) {
            return JSON.parse(e);
          });
        }, authedRequest: function (e, t, n, r, o, i) {
          r = r || {}, this.useAuthorizationHeader ? (isFinite(i) && (i = { localTimeoutMs: i }), (i = i || {}).headers || (i.headers = {}), i.headers.Authorization || (i.headers.Authorization = "Bearer " + this.opts.accessToken), r.access_token && delete r.access_token) : r.access_token || (r.access_token = this.opts.accessToken);var s = this.request(e, t, n, r, o, i),
              a = this;return s.catch(function (e) {
            "M_UNKNOWN_TOKEN" == e.errcode ? a.event_emitter.emit("Session.logged_out") : "M_CONSENT_NOT_GIVEN" == e.errcode && a.event_emitter.emit("no_consent", e.message, e.data.consent_uri);
          }), s;
        }, request: function (e, t, n, r, o, i) {
          var s = undefined !== (i = i || {}).prefix ? i.prefix : this.opts.prefix,
              a = this.opts.baseUrl + s + n;return this.requestOtherUrl(e, t, a, r, o, i);
        }, authedRequestWithPrefix: function (e, t, n, r, o, i, s) {
          return this.authedRequest(e, t, n, r, o, { localTimeoutMs: s, prefix: i });
        }, requestWithPrefix: function (e, t, n, r, o, i, s) {
          return this.request(e, t, n, r, o, { localTimeoutMs: s, prefix: i });
        }, requestOtherUrl: function (e, t, n, r, o, i) {
          return null == i ? i = {} : isFinite(i) && (i = { localTimeoutMs: i }), this._request(e, t, n, r, o, i);
        }, getUrl: function (e, t, n) {
          var r = "";return t && (r = "?" + S.encodeParams(t)), this.opts.baseUrl + n + e + r;
        }, _request: function (r, e, t, n, o, i) {
          if (undefined !== r && !S.isFunction(r)) throw Error("Expected callback to be a function but got " + (undefined === r ? "undefined" : (0, g.default)(r)));i = i || {};var s = this;if (this.opts.extraParams) for (var a in this.opts.extraParams) this.opts.extraParams.hasOwnProperty(a) && (n[a] = this.opts.extraParams[a]);var u = S.extend({}, i.headers || {}),
              c = undefined === i.json || i.json,
              l = i.bodyParser;function p() {
            m && (h && w.clearTimeout(h), h = w.setTimeout(function () {
              d = true, v && v.abort && v.abort(), f.reject(new x.exports.MatrixError({ error: "Locally timed out waiting for a response", errcode: "ORG.MATRIX.JSSDK_TIMEOUT", timeout: m }));
            }, m));
          }c && (o && (o = (0, _.default)(o), u["content-type"] = "application/json"), u.accept || (u.accept = "application/json"), undefined === l && (l = function (e) {
            return JSON.parse(e);
          }));var f = E.default.defer(),
              h = undefined,
              d = false,
              v = undefined,
              m = i.localTimeoutMs || this.opts.localTimeoutMs;p();var y = f.promise;try {
            (v = this.opts.request({ uri: t, method: e, withCredentials: false, qs: n, qsStringifyOptions: i.qsStringifyOptions, useQuerystring: true, body: o, json: false, timeout: m, headers: u || {}, _matrix_opts: this.opts }, function (e, t, n) {
              m && (w.clearTimeout(h), d) || T(f, r, s.opts.onlyData, l)(e, t, n);
            })) && ("onprogress" in v && (v.onprogress = function (e) {
              p();
            }), v.abort && (y.abort = v.abort.bind(v)));
          } catch (e) {
            f.reject(e), r && r(e);
          }return y;
        } };var T = function (c, l, p, f) {
        return l = l || function () {}, function (e, t, n) {
          if (!e) try {
            400 <= t.statusCode ? (o = n, i = (r = t).statusCode, s = function (e) {
              var t = undefined;if (e.getResponseHeader ? t = e.getResponseHeader("Content-Type") : e.headers && (t = e.headers["content-type"] || null), !t) return null;try {
                return h(t);
              } catch (e) {
                throw new Error("Error parsing Content-Type '" + t + "': " + e);
              }
            }(r), a = undefined, s && ("application/json" === s.type ? a = new x.exports.MatrixError(JSON.parse(o)) : "text/plain" === s.type && (a = new Error("Server returned " + i + " error: " + o))), (a = a || new Error("Server returned " + i + " error")).httpStatus = i, e = a) : f && (n = f(n));
          } catch (t) {
            e = new Error("Error parsing server response: " + t);
          }var r, o, i, s, a;if (e) c.reject(e), l(e);else {
            var u = { code: t.statusCode, headers: t.headers, data: n };c.resolve(p ? n : u), l(null, p ? n : u);
          }
        };
      };x.exports.MatrixError = function (e) {
        e = e || {}, this.errcode = e.errcode, this.name = e.errcode || "Unknown error code", this.message = e.error || "Unknown message", this.data = e;
      }, x.exports.MatrixError.prototype = (0, e.default)(Error.prototype), x.exports.MatrixError.prototype.constructor = x.exports.MatrixError;
    }).call(this, n(8));
  }, function (e, t, n) {
    "use strict";
    var p = n(1);e.exports = { getHttpUriForMxc: function (e, t, n, r, o, i) {
        if ("string" != typeof t || !t) return "";if (0 !== t.indexOf("mxc://")) return i ? t : "";var s = t.slice(6),
            a = "/_matrix/media/v1/download/",
            u = {};n && (u.width = n), r && (u.height = r), o && (u.method = o), 0 < p.keys(u).length && (a = "/_matrix/media/v1/thumbnail/");var c = s.indexOf("#"),
            l = "";return 0 <= c && (l = s.substr(c), s = s.substr(0, c)), e + a + s + (0 === p.keys(u).length ? "" : "?" + p.encodeParams(u)) + l;
      }, getIdenticonUri: function (e, t, n, r) {
        if (!t) return null;var o = { width: n = n || 96, height: r = r || 96 };return e + p.encodeUri("/_matrix/media/v1/identicon/$ident", { $ident: t }) + (0 === p.keys(o).length ? "" : "?" + p.encodeParams(o));
      } };
  }, function (e, t) {}, function (e, t) {
    var n = Math.ceil,
        r = Math.floor;e.exports = function (e) {
      return isNaN(e = +e) ? 0 : (0 < e ? r : n)(e);
    };
  }, function (e, t) {
    e.exports = function (e) {
      if (null == e) throw TypeError("Can't call method on  " + e);return e;
    };
  }, function (e, t, n) {
    "use strict";
    function g() {
      return this;
    }var b = n(28),
        E = n(2),
        S = n(69),
        w = n(14),
        T = n(21),
        x = n(111),
        k = n(31),
        R = n(72),
        I = n(5)("iterator"),
        C = !([].keys && "next" in [].keys());e.exports = function (e, t, n, r, o, i, s) {
      function a(e) {
        if (!C && e in d) return d[e];switch (e) {case "keys":case "values":
            return function () {
              return new n(this, e);
            };}return function () {
          return new n(this, e);
        };
      }x(n, t, r);var u,
          c,
          l,
          p = t + " Iterator",
          f = "values" == o,
          h = false,
          d = e.prototype,
          v = d[I] || d["@@iterator"] || o && d[o],
          m = v || a(o),
          y = o ? f ? a("entries") : m : undefined,
          _ = "Array" == t && d.entries || v;if (_ && (l = R(_.call(new e()))) !== Object.prototype && l.next && (k(l, p, true), b || "function" == typeof l[I] || w(l, I, g)), f && v && "values" !== v.name && (h = true, m = function () {
        return v.call(this);
      }), b && !s || !C && !h && d[I] || w(d, I, m), T[t] = m, T[p] = g, o) if (u = { values: f ? m : a("values"), keys: i ? m : a("keys"), entries: y }, s) for (c in u) c in d || S(d, c, u[c]);else E(E.P + E.F * (C || h), t, u);return u;
    };
  }, function (e, t, n) {
    var r = n(4),
        o = n(3).document,
        i = r(o) && r(o.createElement);e.exports = function (e) {
      return i ? o.createElement(e) : {};
    };
  }, function (e, t, n) {
    var o = n(4);e.exports = function (e, t) {
      if (!o(e)) return e;var n, r;if (t && "function" == typeof (n = e.toString) && !o(r = n.call(e))) return r;if ("function" == typeof (n = e.valueOf) && !o(r = n.call(e))) return r;if (!t && "function" == typeof (n = e.toString) && !o(r = n.call(e))) return r;throw TypeError("Can't convert object to primitive value");
    };
  }, function (e, t, n) {
    var r = n(30);e.exports = Object("z").propertyIsEnumerable(0) ? Object : function (e) {
      return "String" == r(e) ? e.split("") : Object(e);
    };
  }, function (e, t, n) {
    var r = n(46),
        o = Math.min;e.exports = function (e) {
      return 0 < e ? o(r(e), 9007199254740991) : 0;
    };
  }, function (e, t, n) {
    var r = n(54)("keys"),
        o = n(37);e.exports = function (e) {
      return r[e] || (r[e] = o(e));
    };
  }, function (e, t, n) {
    var r = n(0),
        o = n(3),
        i = o["__core-js_shared__"] || (o["__core-js_shared__"] = {});(e.exports = function (e, t) {
      return i[e] || (i[e] = undefined !== t ? t : {});
    })("versions", []).push({ version: r.version, mode: n(28) ? "pure" : "global", copyright: "© 2018 Denis Pushkarev (zloirock.ru)" });
  }, function (e, t) {
    e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
  }, function (e, t) {
    e.exports = function (e, t, n, r) {
      if (!(e instanceof t) || undefined !== r && r in e) throw TypeError(n + ": incorrect invocation!");return e;
    };
  }, function (e, t, n) {
    "use strict";
    var o = n(17);function r(e) {
      var n, r;this.promise = new e(function (e, t) {
        if (undefined !== n || undefined !== r) throw TypeError("Bad Promise constructor");n = e, r = t;
      }), this.resolve = o(n), this.reject = o(r);
    }e.exports.f = function (e) {
      return new r(e);
    };
  }, function (e, t, n) {
    var o = n(14);e.exports = function (e, t, n) {
      for (var r in t) n && e[r] ? e[r] = t[r] : o(e, r, t[r]);return e;
    };
  }, function (e, t, n) {
    t.f = n(5);
  }, function (e, t, n) {
    var r = n(3),
        o = n(0),
        i = n(28),
        s = n(59),
        a = n(9).f;e.exports = function (e) {
      var t = o.Symbol || (o.Symbol = i ? {} : r.Symbol || {});"_" == e.charAt(0) || e in t || a(t, e, { value: s.f(e) });
    };
  }, function (e, t) {
    t.f = Object.getOwnPropertySymbols;
  }, function (e, t, n) {
    e.exports = { default: n(139), __esModule: true };
  }, function (e, t, n) {
    "use strict";
    t.__esModule = true;var r = o(n(144)),
        u = o(n(11));function o(e) {
      return e && e.__esModule ? e : { default: e };
    }t.default = function (e, t) {
      if (Array.isArray(e)) return e;if ((0, r.default)(Object(e))) return function (e, t) {
        var n = [],
            r = true,
            o = false,
            i = undefined;try {
          for (var s, a = (0, u.default)(e); !(r = (s = a.next()).done) && (n.push(s.value), !t || n.length !== t); r = true);
        } catch (e) {
          o = true, i = e;
        } finally {
          try {
            !r && a.return && a.return();
          } finally {
            if (o) throw i;
          }
        }return n;
      }(e, t);throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
  }, function (e, t, n) {
    "use strict";
    var r = n(12),
        a = n(44),
        i = n(1);function o(e, t) {
      this.roomId = e, this.userId = t, this.typing = false, this.name = t, this.rawDisplayName = t, this.powerLevel = 0, this.powerLevelNorm = 0, this.user = null, this.membership = null, this.events = { member: null }, this._isOutOfBand = false, this._updateModifiedTime();
    }i.inherits(o, r), o.prototype.markOutOfBand = function () {
      this._isOutOfBand = true;
    }, o.prototype.isOutOfBand = function () {
      return this._isOutOfBand;
    }, o.prototype.setMembershipEvent = function (e, t) {
      if ("m.room.member" === e.getType()) {
        this._isOutOfBand = false, this.events.member = e;var n = this.membership;this.membership = e.getDirectionalContent().membership;var r = this.name;this.name = function (t, e, n) {
          if (!e || e === t) return t;if (!n) return e;var r = i.removeHiddenChars(e);if (!r) return t;var o = /@.+:.+/.test(e);return (o = o || n.getUserIdsWithDisplayName(r).some(function (e) {
            return e !== t;
          })) ? e + " (" + t + ")" : e;
        }(this.userId, e.getDirectionalContent().displayname, t), this.rawDisplayName = e.getDirectionalContent().displayname || this.userId, n !== this.membership && (this._updateModifiedTime(), this.emit("RoomMember.membership", e, this, n)), r !== this.name && (this._updateModifiedTime(), this.emit("RoomMember.name", e, this, r));
      }
    }, o.prototype.setPowerLevelEvent = function (e) {
      if ("m.room.power_levels" === e.getType()) {
        var t = e.getDirectionalContent(),
            n = t.users_default || 0;i.forEach(i.values(t.users), function (e) {
          n = Math.max(n, e);
        });var r = this.powerLevel,
            o = this.powerLevelNorm;t.users && undefined !== t.users[this.userId] ? this.powerLevel = t.users[this.userId] : undefined !== t.users_default ? this.powerLevel = t.users_default : this.powerLevel = 0, (this.powerLevelNorm = 0) < n && (this.powerLevelNorm = 100 * this.powerLevel / n), r === this.powerLevel && o === this.powerLevelNorm || (this._updateModifiedTime(), this.emit("RoomMember.powerLevel", e, this));
      }
    }, o.prototype.setTypingEvent = function (e) {
      if ("m.typing" === e.getType()) {
        var t = this.typing;this.typing = false;var n = e.getContent().user_ids;i.isArray(n) && (-1 !== n.indexOf(this.userId) && (this.typing = true), t !== this.typing && (this._updateModifiedTime(), this.emit("RoomMember.typing", e, this)));
      }
    }, o.prototype._updateModifiedTime = function () {
      this._modified = Date.now();
    }, o.prototype.getLastModifiedTime = function () {
      return this._modified;
    }, o.prototype.isKicked = function () {
      return "leave" === this.membership && this.events.member.getSender() !== this.events.member.getStateKey();
    }, o.prototype.getDMInviter = function () {
      if (this.events.member) {
        var e = this.events.member,
            t = e.getContent(),
            n = e.getSender();if ("join" === t.membership && (t = e.getPrevContent(), n = e.getUnsigned().prev_sender), "invite" === t.membership && t.is_direct) return n;
      }
    }, o.prototype.getAvatarUrl = function (e, t, n, r, o, i) {
      undefined === o && (o = true);var s = this.getMxcAvatarUrl();return s || o ? a.getHttpUriForMxc(e, s, t, n, r, i) || (o ? a.getIdenticonUri(e, this.userId, t, n) : null) : null;
    }, o.prototype.getMxcAvatarUrl = function () {
      return this.events.member ? this.events.member.getDirectionalContent().avatar_url : this.user ? this.user.avatarUrl : null;
    }, e.exports = o;
  }, function (e, t, n) {
    "use strict";
    var r = n(205);function o(e, t, n) {
      for (var r = t.split("."), o = e, i = 0; i < r.length - 1; i++) o[r[i]] || (o[r[i]] = {}), o = o[r[i]];o[r[r.length - 1]] = n;
    }function i(e, t) {
      this.userId = e, this.filterId = t, this.definition = {};
    }i.LAZY_LOADING_SYNC_FILTER = { room: { state: i.LAZY_LOADING_MESSAGES_FILTER = { lazy_load_members: true } } }, i.prototype.getFilterId = function () {
      return this.filterId;
    }, i.prototype.getDefinition = function () {
      return this.definition;
    }, i.prototype.setDefinition = function (e) {
      var t = (this.definition = e).room,
          n = {};t && (t.rooms && (n.rooms = t.rooms), t.rooms && (n.not_rooms = t.not_rooms), this._include_leave = t.include_leave || false), this._room_filter = new r(n), this._room_timeline_filter = new r(t && t.timeline || {});
    }, i.prototype.getRoomTimelineFilterComponent = function () {
      return this._room_timeline_filter;
    }, i.prototype.filterRoomTimeline = function (e) {
      return this._room_timeline_filter.filter(this._room_filter.filter(e));
    }, i.prototype.setTimelineLimit = function (e) {
      o(this.definition, "room.timeline.limit", e);
    }, i.prototype.setIncludeLeaveRooms = function (e) {
      o(this.definition, "room.include_leave", e);
    }, i.fromJson = function (e, t, n) {
      var r = new i(e, t);return r.setDefinition(n), r;
    }, e.exports = i;
  }, function (e, t, n) {
    "use strict";
    e.exports = { makeHtmlMessage: function (e, t) {
        return { msgtype: "m.text", format: "org.matrix.custom.html", body: e, formatted_body: t };
      }, makeHtmlNotice: function (e, t) {
        return { msgtype: "m.notice", format: "org.matrix.custom.html", body: e, formatted_body: t };
      }, makeHtmlEmote: function (e, t) {
        return { msgtype: "m.emote", format: "org.matrix.custom.html", body: e, formatted_body: t };
      }, makeTextMessage: function (e) {
        return { msgtype: "m.text", body: e };
      }, makeNotice: function (e) {
        return { msgtype: "m.notice", body: e };
      }, makeEmoteMessage: function (e) {
        return { msgtype: "m.emote", body: e };
      } };
  }, function (e, t, n) {
    e.exports = { default: n(109), __esModule: true };
  }, function (e, t, n) {
    e.exports = !n(10) && !n(15)(function () {
      return 7 != Object.defineProperty(n(49)("div"), "a", { get: function () {
          return 7;
        } }).a;
    });
  }, function (e, t, n) {
    e.exports = n(14);
  }, function (e, t, n) {
    var s = n(18),
        a = n(19),
        u = n(113)(false),
        c = n(53)("IE_PROTO");e.exports = function (e, t) {
      var n,
          r = a(e),
          o = 0,
          i = [];for (n in r) n != c && s(r, n) && i.push(n);for (; t.length > o;) s(r, n = t[o++]) && (~u(i, n) || i.push(n));return i;
    };
  }, function (e, t, n) {
    var r = n(3).document;e.exports = r && r.documentElement;
  }, function (e, t, n) {
    var r = n(18),
        o = n(38),
        i = n(53)("IE_PROTO"),
        s = Object.prototype;e.exports = Object.getPrototypeOf || function (e) {
      return e = o(e), r(e, i) ? e[i] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? s : null;
    };
  }, function (e, t) {
    e.exports = function (e, t) {
      return { value: t, done: !!e };
    };
  }, function (e, t, n) {
    var r = n(39),
        o = n(5)("iterator"),
        i = n(21);e.exports = n(0).getIteratorMethod = function (e) {
      if (null != e) return e[o] || e["@@iterator"] || i[r(e)];
    };
  }, function (e, t, n) {
    var o = n(6),
        i = n(17),
        s = n(5)("species");e.exports = function (e, t) {
      var n,
          r = o(e).constructor;return undefined === r || null == (n = o(r)[s]) ? t : i(n);
    };
  }, function (e, t, n) {
    function r() {
      var e = +this;if (g.hasOwnProperty(e)) {
        var t = g[e];delete g[e], t();
      }
    }function o(e) {
      r.call(e.data);
    }var i,
        s,
        a,
        u = n(13),
        c = n(77),
        l = n(71),
        p = n(49),
        f = n(3),
        h = f.process,
        d = f.setImmediate,
        v = f.clearImmediate,
        m = f.MessageChannel,
        y = f.Dispatch,
        _ = 0,
        g = {};d && v || (d = function (e) {
      for (var t = [], n = 1; n < arguments.length;) t.push(arguments[n++]);return g[++_] = function () {
        c("function" == typeof e ? e : Function(e), t);
      }, i(_), _;
    }, v = function (e) {
      delete g[e];
    }, "process" == n(30)(h) ? i = function (e) {
      h.nextTick(u(r, e, 1));
    } : y && y.now ? i = function (e) {
      y.now(u(r, e, 1));
    } : m ? (a = (s = new m()).port2, s.port1.onmessage = o, i = u(a.postMessage, a, 1)) : f.addEventListener && "function" == typeof postMessage && !f.importScripts ? (i = function (e) {
      f.postMessage(e + "", "*");
    }, f.addEventListener("message", o, false)) : i = "onreadystatechange" in p("script") ? function (e) {
      l.appendChild(p("script")).onreadystatechange = function () {
        l.removeChild(this), r.call(e);
      };
    } : function (e) {
      setTimeout(u(r, e, 1), 0);
    }), e.exports = { set: d, clear: v };
  }, function (e, t) {
    e.exports = function (e, t, n) {
      var r = undefined === n;switch (t.length) {case 0:
          return r ? e() : e.call(n);case 1:
          return r ? e(t[0]) : e.call(n, t[0]);case 2:
          return r ? e(t[0], t[1]) : e.call(n, t[0], t[1]);case 3:
          return r ? e(t[0], t[1], t[2]) : e.call(n, t[0], t[1], t[2]);case 4:
          return r ? e(t[0], t[1], t[2], t[3]) : e.call(n, t[0], t[1], t[2], t[3]);}return e.apply(n, t);
    };
  }, function (e, t) {
    e.exports = function (e) {
      try {
        return { e: false, v: e() };
      } catch (e) {
        return { e: true, v: e };
      }
    };
  }, function (e, t, n) {
    var r = n(6),
        o = n(4),
        i = n(57);e.exports = function (e, t) {
      if (r(e), o(t) && t.constructor === e) return t;var n = i.f(e);return (0, n.resolve)(t), n.promise;
    };
  }, function (e, t, n) {
    "use strict";
    var r = n(3),
        o = n(0),
        i = n(9),
        s = n(10),
        a = n(5)("species");e.exports = function (e) {
      var t = "function" == typeof o[e] ? o[e] : r[e];s && t && !t[a] && i.f(t, a, { configurable: true, get: function () {
          return this;
        } });
    };
  }, function (e, t) {
    var n,
        r,
        o = e.exports = {};function i() {
      throw new Error("setTimeout has not been defined");
    }function s() {
      throw new Error("clearTimeout has not been defined");
    }function a(t) {
      if (n === setTimeout) return setTimeout(t, 0);if ((n === i || !n) && setTimeout) return n = setTimeout, setTimeout(t, 0);try {
        return n(t, 0);
      } catch (e) {
        try {
          return n.call(null, t, 0);
        } catch (e) {
          return n.call(this, t, 0);
        }
      }
    }!function () {
      try {
        n = "function" == typeof setTimeout ? setTimeout : i;
      } catch (e) {
        n = i;
      }try {
        r = "function" == typeof clearTimeout ? clearTimeout : s;
      } catch (e) {
        r = s;
      }
    }();var u,
        c = [],
        l = false,
        p = -1;function f() {
      l && u && (l = false, u.length ? c = u.concat(c) : p = -1, c.length && h());
    }function h() {
      if (!l) {
        var e = a(f);l = true;for (var t = c.length; t;) {
          for (u = c, c = []; ++p < t;) u && u[p].run();p = -1, t = c.length;
        }u = null, l = false, function (t) {
          if (r === clearTimeout) return clearTimeout(t);if ((r === s || !r) && clearTimeout) return r = clearTimeout, clearTimeout(t);try {
            r(t);
          } catch (e) {
            try {
              return r.call(null, t);
            } catch (e) {
              return r.call(this, t);
            }
          }
        }(e);
      }
    }function d(e, t) {
      this.fun = e, this.array = t;
    }function v() {}o.nextTick = function (e) {
      var t = new Array(arguments.length - 1);if (1 < arguments.length) for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];c.push(new d(e, t)), 1 !== c.length || l || a(h);
    }, d.prototype.run = function () {
      this.fun.apply(null, this.array);
    }, o.title = "browser", o.browser = true, o.env = {}, o.argv = [], o.version = "", o.versions = {}, o.on = v, o.addListener = v, o.once = v, o.off = v, o.removeListener = v, o.removeAllListeners = v, o.emit = v, o.prependListener = v, o.prependOnceListener = v, o.listeners = function (e) {
      return [];
    }, o.binding = function (e) {
      throw new Error("process.binding is not supported");
    }, o.cwd = function () {
      return "/";
    }, o.chdir = function (e) {
      throw new Error("process.chdir is not supported");
    }, o.umask = function () {
      return 0;
    };
  }, function (e, t, n) {
    var r = n(30);e.exports = Array.isArray || function (e) {
      return "Array" == r(e);
    };
  }, function (e, t, n) {
    var r = n(70),
        o = n(55).concat("length", "prototype");t.f = Object.getOwnPropertyNames || function (e) {
      return r(e, o);
    };
  }, function (e, t, n) {
    var r = n(34),
        o = n(36),
        i = n(19),
        s = n(50),
        a = n(18),
        u = n(68),
        c = Object.getOwnPropertyDescriptor;t.f = n(10) ? c : function (e, t) {
      if (e = i(e), t = s(t, true), u) try {
        return c(e, t);
      } catch (e) {}if (a(e, t)) return o(!r.f.call(e, t), e[t]);
    };
  }, function (e, t, n) {
    "use strict";
    var r = i(n(62)),
        o = i(n(7));function i(e) {
      return e && e.__esModule ? e : { default: e };
    }var s = n(1),
        a = n(42),
        u = n(86);e.exports.MatrixInMemoryStore = function (e) {
      e = e || {}, this.rooms = {}, this.groups = {}, this.users = {}, this.syncToken = null, this.filters = {}, this.accountData = {}, this.localStorage = e.localStorage, this._oobMembers = {}, this._clientOptions = {}, this.profiles = {};
    }, e.exports.MatrixInMemoryStore.prototype = { getSyncToken: function () {
        return this.syncToken;
      }, isNewlyCreated: function () {
        return o.default.resolve(true);
      }, setSyncToken: function (e) {
        this.syncToken = e;
      }, storeGroup: function (e) {
        this.groups[e.groupId] = e;
      }, getGroup: function (e) {
        return this.groups[e] || null;
      }, getGroups: function () {
        return s.values(this.groups);
      }, storeRoom: function (t) {
        (this.rooms[t.roomId] = t).currentState.on("RoomState.members", this._onRoomMember.bind(this));var n = this;t.currentState.getMembers().forEach(function (e) {
          n._onRoomMember(null, t.currentState, e);
        });
      }, _onRoomMember: function (e, t, n) {
        if ("invite" !== n.membership) {
          var r = this.users[n.userId] || new a(n.userId);this.users[n.userId] || (n.name && (r.setDisplayName(n.name), n.events.member && r.setRawDisplayName(n.events.member.getDirectionalContent().displayname)), n.events.member && n.events.member.getContent().avatar_url && r.setAvatarUrl(n.events.member.getContent().avatar_url)), this.users[r.userId] = r;
        }
      }, getRoom: function (e) {
        return this.rooms[e] || null;
      }, getRooms: function () {
        return s.values(this.rooms);
      }, removeRoom: function (e) {
        this.rooms[e] && this.rooms[e].removeListener("RoomState.members", this._onRoomMember), delete this.rooms[e];
      }, getRoomSummaries: function () {
        return s.map(s.values(this.rooms), function (e) {
          return e.summary;
        });
      }, storeUser: function (e) {
        this.users[e.userId] = e;
      }, getUser: function (e) {
        return this.users[e] || null;
      }, getUsers: function () {
        return s.values(this.users);
      }, scrollback: function (e, t) {
        return [];
      }, storeEvents: function (e, t, n, r) {}, storeFilter: function (e) {
        e && (this.filters[e.userId] || (this.filters[e.userId] = {}), this.filters[e.userId][e.filterId] = e);
      }, getFilter: function (e, t) {
        return this.filters[e] && this.filters[e][t] ? this.filters[e][t] : null;
      }, getFilterIdByName: function (e) {
        if (!this.localStorage) return null;try {
          return this.localStorage.getItem("mxjssdk_memory_filter_" + e);
        } catch (e) {}return null;
      }, setFilterIdByName: function (e, t) {
        if (this.localStorage) try {
          this.localStorage.setItem("mxjssdk_memory_filter_" + e, t);
        } catch (e) {}
      }, storeAccountDataEvents: function (e) {
        var t = this;e.forEach(function (e) {
          t.accountData[e.getType()] = e;
        });
      }, getAccountData: function (e) {
        return this.accountData[e];
      }, setSyncData: function (e) {
        return o.default.resolve();
      }, wantsSave: function () {
        return false;
      }, save: function () {}, startup: function () {
        return o.default.resolve();
      }, getSavedSync: function () {
        return o.default.resolve(null);
      }, getSavedSyncToken: function () {
        return o.default.resolve(null);
      }, deleteAllData: function () {
        return this.rooms = {}, this.users = {}, this.syncToken = null, this.filters = {}, this.accountData = {}, this.profiles = {}, o.default.resolve();
      }, getOutOfBandMembers: function (e) {
        return o.default.resolve(this._oobMembers[e] || null);
      }, setOutOfBandMembers: function (e, t) {
        return this._oobMembers[e] = t, o.default.resolve();
      }, getClientOptions: function () {
        return o.default.resolve(this._clientOptions);
      }, storeClientOptions: function (e) {
        return this._clientOptions = (0, r.default)({}, e), o.default.resolve();
      }, storeProfile: function (e) {
        this.profiles[e.userId] = e;
      }, getProfile: function (e) {
        return this.profiles[e] || new u(e);
      }, getProfiles: function (e) {
        var t = this;return e && e.length ? e.map(function (e) {
          return t.getProfile(e);
        }) : s.values(this.profiles);
      } };
  }, function (e, t, n) {
    "use strict";
    var r = n(12);function o(e, t) {
      this.userId = e, t ? (this.name = t.name, this.avatar = t.avatar, this.displayName = t.displayName, this.email = t.email, this.mobile = t.mobile, this.organization = t.organization, this.gender = t.gender, this.position = t.position, this.birth = t.birth, this.district = t.district, this._modified = t._modified) : (this.name = "", this.avatar = "", this.displayName = "", this.email = "", this.mobile = "", this.organization = null, this.gender = "", this.position = "", this.birth = "", this.district = "", this._updateModifiedTime());
    }n(1).inherits(o, r), o.prototype.setProfile = function (e) {
      e && (this.name = e.name, this.email = e.email, this.mobile = e.mobile, this.organization = e.organization, this.gender = e.gender, this.position = e.position, this.birth = e.birth, this.district = e.district, this._updateModifiedTime());
    }, o.prototype.setAvatar = function (e) {
      e && (this.avatar = e, this._updateModifiedTime());
    }, o.prototype.setDisplayName = function (e) {
      e && (this.displayName = e, this._updateModifiedTime());
    }, o.prototype._updateModifiedTime = function () {
      this._modified = Date.now();
    }, o.prototype.toJSON = function () {
      return { name: this.name, avatar: this.avatar, displayName: this.displayName, email: this.email, mobile: this.mobile, organization: this.organization, gender: this.gender, position: this.position, birth: this.birth, district: this.district, _modified: this._modified };
    }, e.exports = o;
  }, function (f, e, h) {
    "use strict";
    (function (n) {
      var d = l(h(11)),
          s = l(h(63)),
          t = l(h(7)),
          r = h(85),
          e = l(h(1)),
          o = l(h(147)),
          i = l(h(153)),
          a = l(h(42)),
          u = l(h(86)),
          c = h(16);function l(e) {
        return e && e.__esModule ? e : { default: e };
      }function p(e) {
        if (r.MatrixInMemoryStore.call(this, e), !e.indexedDB) throw new Error("Missing required option: indexedDB");if (e.workerScript) {
          var t = e.workerApi;t = t || n.Worker, this.backend = new i.default(e.workerScript, e.dbName, t);
        } else this.backend = new o.default(e.indexedDB, e.dbName);this.startedUp = false, this._syncTs = 0, this._userModifiedMap = {};
      }e.default.inherits(p, r.MatrixInMemoryStore), p.prototype.startup = function (e) {
        var i = this;return this.startedUp ? (console.log("IndexedDBStore.startup: already started"), t.default.resolve()) : (console.log("IndexedDBStore.startup: connecting to backend"), this.backend.connect(e).then(function () {
          return console.log("IndexedDBStore.startup: loading presence events"), i.backend.getUserPresenceEvents();
        }).then(function (e) {
          console.log("IndexedDBStore.startup: processing presence events"), e.forEach(function (e) {
            var t = (0, s.default)(e, 2),
                n = t[0],
                r = t[1],
                o = new a.default(n);r && o.setPresenceEvent(new c.MatrixEvent(r)), i._userModifiedMap[o.userId] = o.getLastModifiedTime(), o.notReEmitYet = true, i.storeUser(o);
          });
        }).then(function () {
          return console.log("IndexedDBStore.startup: loading profiles"), i.backend.getUserProfiles();
        }).then(function (e) {
          console.log("IndexedDBStore.startup: processing profiles"), e.forEach(function (e) {
            var t = (0, s.default)(e, 2),
                n = t[0],
                r = t[1];if (n && r) {
              var o = new u.default(n, r);i.storeProfile(o);
            }
          });
        }));
      }, p.prototype.getSavedSync = function () {
        return this.backend.getSavedSync();
      }, p.prototype.isNewlyCreated = function () {
        return this.backend.isNewlyCreated();
      }, p.prototype.getSavedSyncToken = function () {
        return this.backend.getNextBatchToken();
      }, p.prototype.deleteAllData = function () {
        return r.MatrixInMemoryStore.prototype.deleteAllData.call(this), this.backend.clearDatabase().then(function () {
          console.log("Deleted indexeddb data.");
        }, function (e) {
          throw console.error("Failed to delete indexeddb data: " + e), e;
        });
      }, p.prototype.wantsSave = function () {
        return 3e5 < Date.now() - this._syncTs;
      }, p.prototype.save = function () {
        return this.wantsSave() ? this._reallySave() : t.default.resolve();
      }, p.prototype._reallySave = function () {
        this._syncTs = Date.now();var e = [],
            t = [],
            n = true,
            r = false,
            o = undefined;try {
          for (var i, s = (0, d.default)(this.getUsers()); !(n = (i = s.next()).done); n = true) {
            var a = i.value;this._userModifiedMap[a.userId] !== a.getLastModifiedTime() && a.events.presence && (e.push([a.userId, a.events.presence.event]), this._userModifiedMap[a.userId] = a.getLastModifiedTime());
          }
        } catch (e) {
          r = true, o = e;
        } finally {
          try {
            !n && s.return && s.return();
          } finally {
            if (r) throw o;
          }
        }var u = true,
            c = false,
            l = undefined;try {
          for (var p, f = (0, d.default)(this.getProfiles()); !(u = (p = f.next()).done); u = true) {
            var h = p.value;t.push([h.userId, h.toJSON()]);
          }
        } catch (e) {
          c = true, l = e;
        } finally {
          try {
            !u && f.return && f.return();
          } finally {
            if (c) throw l;
          }
        }return this.backend.syncToDatabase(e, t).catch(function (e) {
          console.error("sync fail:", e);
        });
      }, p.prototype.setSyncData = function (e) {
        return this.backend.setSyncData(e);
      }, p.prototype.getOutOfBandMembers = function (e) {
        return this.backend.getOutOfBandMembers(e);
      }, p.prototype.setOutOfBandMembers = function (e, t) {
        return this.backend.setOutOfBandMembers(e, t);
      }, p.prototype.clearOutOfBandMembers = function (e) {
        return this.backend.clearOutOfBandMembers(e);
      }, p.prototype.getClientOptions = function () {
        return this.backend.getClientOptions();
      }, p.prototype.storeClientOptions = function (e) {
        return this.backend.storeClientOptions(e);
      }, f.exports.IndexedDBStore = p;
    }).call(this, h(8));
  }, function (e, t, n) {
    "use strict";
    var l = i(n(41)),
        p = i(n(20)),
        r = i(n(90)),
        o = i(n(91)),
        f = i(n(1));function i(e) {
      return e && e.__esModule ? e : { default: e };
    }var s = ((0, o.default)(a, [{ key: "accumulate", value: function (e) {
        this._accumulateRooms(e), this._accumulateGroups(e), this._accumulateAccountData(e), this.nextBatch = e.next_batch;
      } }, { key: "_accumulateAccountData", value: function (e) {
        var t = this;e.account_data && e.account_data.events && e.account_data.events.forEach(function (e) {
          t.accountData[e.type] = e;
        });
      } }, { key: "_accumulateRooms", value: function (t) {
        var n = this;t.rooms && (t.rooms.invite && (0, p.default)(t.rooms.invite).forEach(function (e) {
          n._accumulateRoom(e, "invite", t.rooms.invite[e]);
        }), t.rooms.join && (0, p.default)(t.rooms.join).forEach(function (e) {
          n._accumulateRoom(e, "join", t.rooms.join[e]);
        }), t.rooms.leave && (0, p.default)(t.rooms.leave).forEach(function (e) {
          n._accumulateRoom(e, "leave", t.rooms.leave[e]);
        }));
      } }, { key: "_accumulateRoom", value: function (e, t, n) {
        switch (t) {case "invite":
            this._accumulateInviteState(e, n);break;case "join":
            this.inviteRooms[e] && delete this.inviteRooms[e], this._accumulateJoinState(e, n);break;case "leave":
            this.inviteRooms[e] ? delete this.inviteRooms[e] : delete this.joinRooms[e];break;default:
            console.error("Unknown cateogory: ", t);}
      } }, { key: "_accumulateInviteState", value: function (e, t) {
        if (t.invite_state && t.invite_state.events) if (this.inviteRooms[e]) {
          var o = this.inviteRooms[e];t.invite_state.events.forEach(function (e) {
            for (var t = false, n = 0; n < o.invite_state.events.length; n++) {
              var r = o.invite_state.events[n];r.type === e.type && r.state_key == e.state_key && (o.invite_state.events[n] = e, t = true);
            }t || o.invite_state.events.push(e);
          });
        } else this.inviteRooms[e] = { invite_state: t.invite_state };
      } }, { key: "_accumulateJoinState", value: function (e, n) {
        this.joinRooms[e] || (this.joinRooms[e] = { _currentState: (0, l.default)(null), _timeline: [], _accountData: (0, l.default)(null), _unreadNotifications: {}, _summary: {}, _readReceipts: {} });var r = this.joinRooms[e];if (n.account_data && n.account_data.events && n.account_data.events.forEach(function (e) {
          r._accountData[e.type] = e;
        }), n.unread_notifications && (r._unreadNotifications = n.unread_notifications), n.summary) {
          var t = r._summary,
              o = n.summary;t["m.heroes"] = o["m.heroes"] || t["m.heroes"], t["m.joined_member_count"] = o["m.joined_member_count"] || t["m.joined_member_count"], t["m.invited_member_count"] = o["m.invited_member_count"] || t["m.invited_member_count"];
        }if (n.ephemeral && n.ephemeral.events && n.ephemeral.events.forEach(function (n) {
          "m.receipt" === n.type && n.content && (0, p.default)(n.content).forEach(function (t) {
            n.content[t]["m.read"] && (0, p.default)(n.content[t]["m.read"]).forEach(function (e) {
              r._readReceipts[e] = { data: n.content[t]["m.read"][e], eventId: t };
            });
          });
        }), n.timeline && n.timeline.limited && (r._timeline = []), n.state && n.state.events && n.state.events.forEach(function (e) {
          h(r._currentState, e);
        }), n.timeline && n.timeline.events && n.timeline.events.forEach(function (e, t) {
          h(r._currentState, e), r._timeline.push({ event: e, token: 0 === t ? n.timeline.prev_batch : null });
        }), r._timeline.length > this.opts.maxTimelineEntries) for (var i = r._timeline.length - this.opts.maxTimelineEntries; i < r._timeline.length; i++) if (r._timeline[i].token) {
          r._timeline = r._timeline.slice(i, r._timeline.length);break;
        }
      } }, { key: "_accumulateGroups", value: function (t) {
        var n = this;t.groups && (t.groups.invite && (0, p.default)(t.groups.invite).forEach(function (e) {
          n._accumulateGroup(e, "invite", t.groups.invite[e]);
        }), t.groups.join && (0, p.default)(t.groups.join).forEach(function (e) {
          n._accumulateGroup(e, "join", t.groups.join[e]);
        }), t.groups.leave && (0, p.default)(t.groups.leave).forEach(function (e) {
          n._accumulateGroup(e, "leave", t.groups.leave[e]);
        }));
      } }, { key: "_accumulateGroup", value: function (e, t, n) {
        for (var r = ["invite", "join", "leave"], o = 0; o < r.length; o++) {
          var i = r[o];delete this.groups[i][e];
        }this.groups[t][e] = n;
      } }, { key: "getJSON", value: function () {
        var u = this,
            c = { join: {}, invite: {}, leave: {} };(0, p.default)(this.inviteRooms).forEach(function (e) {
          c.invite[e] = u.inviteRooms[e];
        }), (0, p.default)(this.joinRooms).forEach(function (e) {
          var r = u.joinRooms[e],
              o = { ephemeral: { events: [] }, account_data: { events: [] }, state: { events: [] }, timeline: { events: [], prev_batch: null }, unread_notifications: r._unreadNotifications, summary: r._summary };(0, p.default)(r._accountData).forEach(function (e) {
            o.account_data.events.push(r._accountData[e]);
          });var n = { type: "m.receipt", room_id: e, content: {} };(0, p.default)(r._readReceipts).forEach(function (e) {
            var t = r._readReceipts[e];n.content[t.eventId] || (n.content[t.eventId] = { "m.read": {} }), n.content[t.eventId]["m.read"][e] = t.data;
          }), 0 < (0, p.default)(n.content).length && o.ephemeral.events.push(n), r._timeline.forEach(function (e) {
            if (!o.timeline.prev_batch) {
              if (!e.token) return;o.timeline.prev_batch = e.token;
            }o.timeline.events.push(e.event);
          });for (var i = (0, l.default)(null), t = o.timeline.events.length - 1; 0 <= t; t--) {
            var s = o.timeline.events[t];if (null !== s.state_key && undefined !== s.state_key) {
              var a = f.default.deepCopy(s);a.unsigned && (a.unsigned.prev_content && (a.content = a.unsigned.prev_content), a.unsigned.prev_sender && (a.sender = a.unsigned.prev_sender)), h(i, a);
            }
          }(0, p.default)(r._currentState).forEach(function (n) {
            (0, p.default)(r._currentState[n]).forEach(function (e) {
              var t = r._currentState[n][e];i[n] && i[n][e] && (t = i[n][e]), o.state.events.push(t);
            });
          }), c.join[e] = o;
        });var t = [];return (0, p.default)(this.accountData).forEach(function (e) {
          t.push(u.accountData[e]);
        }), { nextBatch: this.nextBatch, roomsData: c, groupsData: this.groups, accountData: t };
      } }, { key: "getNextBatchToken", value: function () {
        return this.nextBatch;
      } }]), a);function a(e) {
      (0, r.default)(this, a), (e = e || {}).maxTimelineEntries = e.maxTimelineEntries || 50, this.opts = e, this.accountData = {}, this.inviteRooms = {}, this.joinRooms = {}, this.nextBatch = null, this.groups = { invite: {}, join: {}, leave: {} };
    }function h(e, t) {
      null !== t.state_key && undefined !== t.state_key && t.type && (e[t.type] || (e[t.type] = (0, l.default)(null)), e[t.type][t.state_key] = t);
    }e.exports = s;
  }, function (e, t, n) {
    var o = n(2),
        i = n(0),
        s = n(15);e.exports = function (e, t) {
      var n = (i.Object || {})[e] || Object[e],
          r = {};r[e] = t(n), o(o.S + o.F * s(function () {
        n(1);
      }), "Object", r);
    };
  }, function (e, t, n) {
    "use strict";
    t.__esModule = true, t.default = function (e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    };
  }, function (e, t, n) {
    "use strict";
    t.__esModule = true;var r,
        o = (r = n(150)) && r.__esModule ? r : { default: r };function i(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];r.enumerable = r.enumerable || false, r.configurable = true, "value" in r && (r.writable = true), (0, o.default)(e, r.key, r);
      }
    }t.default = function (e, t, n) {
      return t && i(e.prototype, t), n && i(e, n), e;
    };
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: true });var r = a(n(41)),
        o = a(n(156)),
        i = a(n(159)),
        s = a(n(163));function a(e) {
      return e && e.__esModule ? e : { default: e };
    }function u(e, t) {
      var n = "Store is invalid because " + e + ", please stop the client, delete all data and start the client again",
          r = (0, s.default)(Error, [n]);return (0, i.default)(r, (0, o.default)(this)), r.reason = e, r.value = t, r;
    }function c(e) {
      var t = "Crypto store is invalid because " + e + ", please stop the client, delete all data and start the client again",
          n = (0, s.default)(Error, [t]);return (0, i.default)(n, (0, o.default)(this)), n.reason = e, n.name = "InvalidCryptoStoreError", n;
    }t.InvalidStoreError = u, t.InvalidCryptoStoreError = c, u.TOGGLED_LAZY_LOADING = "TOGGLED_LAZY_LOADING", u.prototype = (0, r.default)(Error.prototype, { constructor: { value: Error, enumerable: false, writable: true, configurable: true } }), (0, i.default)(u, Error), c.TOO_NEW = "TOO_NEW", c.prototype = (0, r.default)(Error.prototype, { constructor: { value: Error, enumerable: false, writable: true, configurable: true } }), (0, i.default)(c, Error);
  }, function (Y, e, Z) {
    "use strict";
    (function (s) {
      var a,
          u = n(Z(62)),
          c = n(Z(35)),
          l = n(Z(167)),
          T = n(Z(20)),
          o = n(Z(23)),
          p = n(Z(25)),
          e = n(Z(26)),
          x = n(Z(182)),
          k = n(Z(11)),
          R = n(Z(63)),
          i = (a = (0, e.default)(p.default.mark(function e(t, n, r, o, i, s) {
        var a;return p.default.wrap(function (e) {
          for (;;) switch (e.prev = e.next) {case 0:
              if (t._crypto) {
                e.next = 2;break;
              }throw new Error("End-to-End encryption disabled");case 2:
              return e.next = 4, t._crypto.setDeviceVerification(n, r, o, i, s);case 4:
              a = e.sent, t.emit("deviceVerificationChanged", n, r, a);case 6:case "end":
              return e.stop();}
        }, e, this);
      })), function (e, t, n, r, o, i) {
        return a.apply(this, arguments);
      }),
          f = n(Z(7)),
          t = Z(185),
          r = n(Z(96));function n(e) {
        return e && e.__esModule ? e : { default: e };
      }var h,
          d,
          v,
          m,
          y,
          _,
          g,
          b = Z(186),
          E = Z(12),
          S = Z(97),
          w = Z(43),
          I = Z(16).MatrixEvent,
          C = Z(16).EventStatus,
          O = Z(24),
          P = Z(202),
          j = Z(204),
          A = Z(1),
          M = Z(44),
          F = Z(65),
          D = Z(206),
          U = Z(212),
          L = w.MatrixError,
          N = Z(66);function q(e, t, n) {
        var r = [],
            o = true,
            i = false,
            s = undefined;try {
          for (var a, u = (0, k.default)((0, x.default)(e)); !(o = (a = u.next()).done); o = true) {
            var c = a.value,
                l = (0, R.default)(c, 2),
                p = l[0],
                f = l[1];try {
              var h = B(f, t);h.session_id = p, h.room_id = n, r.push(h);
            } catch (e) {
              console.log("Failed to decrypt session from backup");
            }
          }
        } catch (e) {
          i = true, s = e;
        } finally {
          try {
            !o && u.return && u.return();
          } finally {
            if (i) throw s;
          }
        }return r;
      }function B(e, t) {
        return JSON.parse(t.decrypt(e.session_data.ephemeral, e.session_data.mac, e.session_data.ciphertext));
      }function $(e) {
        e.baseUrl && e.baseUrl.endsWith("/") && (e.baseUrl = e.baseUrl.substr(0, e.baseUrl.length - 1)), e.idBaseUrl && e.idBaseUrl.endsWith("/") && (e.idBaseUrl = e.idBaseUrl.substr(0, e.idBaseUrl.length - 1)), U.call(this, e), this.olmVersion = null, this.reEmitter = new r.default(this), this.store = e.store || new j(), this.deviceId = e.deviceId || null;var t = e.userId || null;if (this.credentials = { userId: t }, this.scheduler = e.scheduler, this.scheduler) {
          var n = this;this.scheduler.setProcessFunction(function (e) {
            var t = n.getRoom(e.getRoomId());return e.status !== C.SENDING && K(t, e, C.SENDING), H(n, e);
          });
        }this.clientRunning = false, this.callList = {}, this._supportsVoip = false, this._syncingRetry = null, this._syncApi = null, this._peekSync = null, this._isGuest = false, this._ongoingScrollbacks = {}, this.timelineSupport = Boolean(e.timelineSupport), this.urlPreviewCache = {}, this._notifTimelineSet = null, this._crypto = null, this._cryptoStore = e.cryptoStore, this._sessionStore = e.sessionStore, this._forceTURN = e.forceTURN || false, this._roomList = null, this._pushProcessor = new b(this), this._serverSupportsLazyLoading = null;
      }function G(t, n, r, o) {
        return f.default.resolve().then(function () {
          var e = function (e, t, n) {
            if (t.isEncrypted()) return null;if (!e.isRoomEncrypted(t.getRoomId())) return null;if (!e._crypto) throw new Error("This room is configured to use encryption, but your client does not support encryption.");return e._crypto.encryptEvent(t, n);
          }(t, r, n);return e ? (K(n, r, C.ENCRYPTING), e.then(function () {
            K(n, r, C.SENDING);
          })) : null;
        }).then(function () {
          var e = undefined;return t.scheduler && (e = t.scheduler.queueEvent(r)) && 1 < t.scheduler.getQueueForEvent(r).length && K(n, r, C.QUEUED), e || H(t, r);
        }).then(function (e) {
          return n && n.updatePendingEvent(r, C.SENT, e.event_id), o && o(null, e), e;
        }, function (t) {
          console.error("Error sending event", t.stack || t);try {
            r.error = t, K(n, r, C.NOT_SENT), t.event = r, o && o(t);
          } catch (e) {
            console.error("Exception in error handler!", e.stack || t);
          }throw t;
        });
      }function K(e, t, n) {
        e ? e.updatePendingEvent(t, n) : t.status = n;
      }function H(e, t) {
        var n = t._txnId ? t._txnId : e.makeTxnId(),
            r = { $roomId: t.getRoomId(), $eventType: t.getWireType(), $stateKey: t.getStateKey(), $txnId: n },
            o = undefined;if (t.isState()) {
          var i = "/rooms/$roomId/state/$eventType";t.getStateKey() && 0 < t.getStateKey().length && (i = "/rooms/$roomId/state/$eventType/$stateKey"), o = A.encodeUri(i, r);
        } else o = A.encodeUri("/rooms/$roomId/send/$eventType/$txnId", r);return e._http.authedRequest(undefined, "PUT", o, undefined, t.getWireContent()).then(function (e) {
          return console.log("Event sent to " + t.getRoomId() + " with event id " + e.event_id), e;
        });
      }function W(e, t, n, r, o, i) {
        A.isFunction(o) && (i = o, o = undefined);var s = A.encodeUri("/rooms/$room_id/$membership", { $room_id: t, $membership: r });return e._http.authedRequest(i, "POST", s, undefined, { user_id: n, reason: o });
      }function V(e, t, n, r) {
        var o = A.encodeUri("/presence/list/$userId", { $userId: t.credentials.userId });return t._http.authedRequest(e, r, o, undefined, n);
      }function z(n) {
        n._supportsVoip && (n.isGuest() || n.turnServer().done(function (e) {
          if (e.uris) {
            console.log("Got TURN URIs: " + e.uris + " refresh in " + e.ttl + " secs");var t = { urls: e.uris, username: "finchat", credential: "fin123321" };n._turnServers = [t], n._checkTurnServersTimeoutID = setTimeout(function () {
              z(n);
            }, 1e3 * (e.ttl || 3600) * .9);
          }
        }, function (e) {
          console.error("Failed to get TURN URIs"), n._checkTurnServersTimeoutID = setTimeout(function () {
            z(n);
          }, 6e4);
        }));
      }function J(e, t, n) {
        e && e(n), t.reject(n);
      }function Q(e, t, n) {
        e && e(null, n), t.resolve(n);
      }function X(n) {
        return function (e) {
          var t = new I(e);return t.isEncrypted() && (n.reEmitter.reEmit(t, ["Event.decrypted"]), t.attemptDecryption(n._crypto)), t;
        };
      }f.default.config({ warnings: false }), A.inherits($, E), A.extend($.prototype, U.prototype), $.prototype.clearStores = function () {
        if (this._clientRunning) throw new Error("Cannot clear stores while client is running");var e = [];return e.push(this.store.deleteAllData()), this._cryptoStore && e.push(this._cryptoStore.deleteAllData()), f.default.all(e);
      }, $.prototype.getUserId = function () {
        return this.credentials && this.credentials.userId ? this.credentials.userId : null;
      }, $.prototype.getDomain = function () {
        return this.credentials && this.credentials.userId ? this.credentials.userId.replace(/^.*?:/, "") : null;
      }, $.prototype.getUserIdLocalpart = function () {
        return this.credentials && this.credentials.userId ? this.credentials.userId.split(":")[0].substring(1) : null;
      }, $.prototype.getDeviceId = function () {
        return this.deviceId;
      }, $.prototype.supportsVoip = function () {
        return this._supportsVoip;
      }, $.prototype.setForceTURN = function (e) {
        this._forceTURN = e;
      }, $.prototype.getSyncState = function () {
        return this._syncApi ? this._syncApi.getSyncState() : null;
      }, $.prototype.getSyncStateData = function () {
        return this._syncApi ? this._syncApi.getSyncStateData() : null;
      }, $.prototype.isGuest = function () {
        return this._isGuest;
      }, $.prototype.getScheduler = function () {
        return this.scheduler;
      }, $.prototype.setGuest = function (e) {
        this._isGuest = e;
      }, $.prototype.retryImmediately = function () {
        return this._syncApi.retryImmediately();
      }, $.prototype.getNotifTimelineSet = function () {
        return this._notifTimelineSet;
      }, $.prototype.setNotifTimelineSet = function (e) {
        this._notifTimelineSet = e;
      }, $.prototype.initCrypto = (0, e.default)(p.default.mark(function e() {
        return p.default.wrap(function (e) {
          for (;;) switch (e.prev = e.next) {case 0:
              if (isCryptoAvailable()) {
                e.next = 2;break;
              }throw new Error("End-to-end encryption not supported in this js-sdk build: did you remember to load the olm library?");case 2:
              if (this._crypto) return console.warn("Attempt to re-initialise e2e encryption on MatrixClient"), e.abrupt("return");e.next = 5;break;case 5:
              if (this._sessionStore) {
                e.next = 7;break;
              }throw new Error("Cannot enable encryption: no sessionStore provided");case 7:
              if (this._cryptoStore) {
                e.next = 9;break;
              }throw new Error("Cannot enable encryption: no cryptoStore provided");case 9:
              if (null === this.getUserId()) throw new Error("Cannot enable encryption on MatrixClient with unknown userId: ensure userId is passed in createClient().");e.next = 12;break;case 12:
              if (null === this.deviceId) throw new Error("Cannot enable encryption on MatrixClient with unknown deviceId: ensure deviceId is passed in createClient().");e.next = 14;break;case 14:
              this.olmVersion = null, this._crypto = null;case 16:case "end":
              return e.stop();}
        }, e, this);
      })), $.prototype.isCryptoEnabled = function () {
        return null !== this._crypto;
      }, $.prototype.getDeviceEd25519Key = function () {
        return this._crypto ? this._crypto.getDeviceEd25519Key() : null;
      }, $.prototype.uploadKeys = function () {
        if (null === this._crypto) throw new Error("End-to-end encryption disabled");return this._crypto.uploadDeviceKeys();
      }, $.prototype.downloadKeys = function (e, t) {
        return null === this._crypto ? f.default.reject(new Error("End-to-end encryption disabled")) : this._crypto.downloadKeys(e, t);
      }, $.prototype.getStoredDevicesForUser = (h = (0, e.default)(p.default.mark(function e(t) {
        return p.default.wrap(function (e) {
          for (;;) switch (e.prev = e.next) {case 0:
              if (null === this._crypto) throw new Error("End-to-end encryption disabled");e.next = 2;break;case 2:
              return e.abrupt("return", this._crypto.getStoredDevicesForUser(t) || []);case 3:case "end":
              return e.stop();}
        }, e, this);
      })), function (e) {
        return h.apply(this, arguments);
      }), $.prototype.getStoredDevice = (d = (0, e.default)(p.default.mark(function e(t, n) {
        return p.default.wrap(function (e) {
          for (;;) switch (e.prev = e.next) {case 0:
              if (null === this._crypto) throw new Error("End-to-end encryption disabled");e.next = 2;break;case 2:
              return e.abrupt("return", this._crypto.getStoredDevice(t, n) || null);case 3:case "end":
              return e.stop();}
        }, e, this);
      })), function (e, t) {
        return d.apply(this, arguments);
      }), $.prototype.setDeviceVerified = function (e, t, n) {
        undefined === n && (n = true);var r = i(this, e, t, n, null);return e == this.credentials.userId && this._crypto.checkKeyBackup(), r;
      }, $.prototype.setDeviceBlocked = function (e, t, n) {
        return undefined === n && (n = true), i(this, e, t, null, n);
      }, $.prototype.setDeviceKnown = function (e, t, n) {
        return undefined === n && (n = true), i(this, e, t, null, null, n);
      }, $.prototype.setGlobalBlacklistUnverifiedDevices = function (e) {
        if (null === this._crypto) throw new Error("End-to-end encryption disabled");this._crypto.setGlobalBlacklistUnverifiedDevices(e);
      }, $.prototype.getGlobalBlacklistUnverifiedDevices = function () {
        if (null === this._crypto) throw new Error("End-to-end encryption disabled");return this._crypto.getGlobalBlacklistUnverifiedDevices();
      }, $.prototype.getEventSenderDeviceInfo = (v = (0, e.default)(p.default.mark(function e(t) {
        return p.default.wrap(function (e) {
          for (;;) switch (e.prev = e.next) {case 0:
              if (this._crypto) {
                e.next = 2;break;
              }return e.abrupt("return", null);case 2:
              return e.abrupt("return", this._crypto.getEventSenderDeviceInfo(t));case 3:case "end":
              return e.stop();}
        }, e, this);
      })), function (e) {
        return v.apply(this, arguments);
      }), $.prototype.isEventSenderVerified = (m = (0, e.default)(p.default.mark(function e(t) {
        var n;return p.default.wrap(function (e) {
          for (;;) switch (e.prev = e.next) {case 0:
              return e.next = 2, this.getEventSenderDeviceInfo(t);case 2:
              if (n = e.sent) {
                e.next = 5;break;
              }return e.abrupt("return", false);case 5:
              return e.abrupt("return", n.isVerified());case 6:case "end":
              return e.stop();}
        }, e, this);
      })), function (e) {
        return m.apply(this, arguments);
      }), $.prototype.cancelAndResendEventRoomKeyRequest = function (e) {
        e.cancelAndResendKeyRequest(this._crypto);
      }, $.prototype.setRoomEncryption = function (e, t) {
        if (!this._crypto) throw new Error("End-to-End encryption disabled");return this._crypto.setRoomEncryption(e, t);
      }, $.prototype.isRoomEncrypted = function (e) {
        var t = this.getRoom(e);return !!t && !!t.currentState.getStateEvents("m.room.encryption", "");
      }, $.prototype.forceDiscardSession = function (e) {
        if (!this._crypto) throw new Error("End-to-End encryption disabled");this._crypto.forceDiscardSession(e);
      }, $.prototype.exportRoomKeys = function () {
        return this._crypto ? this._crypto.exportRoomKeys() : f.default.reject(new Error("End-to-end encryption disabled"));
      }, $.prototype.importRoomKeys = function (e) {
        if (!this._crypto) throw new Error("End-to-end encryption disabled");return this._crypto.importRoomKeys(e);
      }, $.prototype.getKeyBackupVersion = function () {
        return this._http.authedRequest(undefined, "GET", "/room_keys/version").then(function (e) {
          if (e.algorithm === olmlib.MEGOLM_BACKUP_ALGORITHM) return "object" === (0, o.default)(e.auth_data) && e.auth_data.public_key ? e : f.default.reject("Invalid backup data returned");var t = "Unknown backup algorithm: " + e.algorithm;return f.default.reject(t);
        }).catch(function (e) {
          if ("M_NOT_FOUND" === e.errcode) return null;throw e;
        });
      }, $.prototype.isKeyBackupTrusted = function (e) {
        return this._crypto.isKeyBackupTrusted(e);
      }, $.prototype.getKeyBackupEnabled = function () {
        if (null === this._crypto) throw new Error("End-to-end encryption disabled");return Boolean(this._crypto.backupKey);
      }, $.prototype.enableKeyBackup = function (e) {
        if (null === this._crypto) throw new Error("End-to-end encryption disabled");this._crypto.backupInfo = e, this._crypto.backupKey && this._crypto.backupKey.free(), this._crypto.backupKey = new s.Olm.PkEncryption(), this._crypto.backupKey.set_recipient_key(e.auth_data.public_key), this.emit("crypto.keyBackupStatus", true);
      }, $.prototype.disableKeyBackup = function () {
        if (null === this._crypto) throw new Error("End-to-end encryption disabled");this._crypto.backupInfo = null, this._crypto.backupKey && this._crypto.backupKey.free(), this._crypto.backupKey = null, this.emit("crypto.keyBackupStatus", false);
      }, $.prototype.prepareKeyBackupVersion = (y = (0, e.default)(p.default.mark(function e(t) {
        var n, r, o, i;return p.default.wrap(function (e) {
          for (;;) switch (e.prev = e.next) {case 0:
              if (null === this._crypto) throw new Error("End-to-end encryption disabled");e.next = 2;break;case 2:
              if (n = new s.Olm.PkDecryption(), e.prev = 3, r = undefined, o = {}, t) return e.next = 9, keyForNewBackup(t);e.next = 15;break;case 9:
              i = e.sent, r = n.init_with_private_key(i.key), o.private_key_salt = i.salt, o.private_key_iterations = i.iterations, e.next = 16;break;case 15:
              r = n.generate_key();case 16:
              return o.public_key = r, e.abrupt("return", { algorithm: olmlib.MEGOLM_BACKUP_ALGORITHM, auth_data: o, recovery_key: encodeRecoveryKey(n.get_private_key()) });case 18:
              return e.prev = 18, n.free(), e.finish(18);case 21:case "end":
              return e.stop();}
        }, e, this, [[3,, 18, 21]]);
      })), function (e) {
        return y.apply(this, arguments);
      }), $.prototype.createKeyBackupVersion = function (t) {
        var n = this;if (null === this._crypto) throw new Error("End-to-end encryption disabled");var e = { algorithm: t.algorithm, auth_data: t.auth_data };return this._crypto._signObject(e.auth_data).then(function () {
          return n._http.authedRequest(undefined, "POST", "/room_keys/version", undefined, e);
        }).then(function (e) {
          return n.enableKeyBackup({ algorithm: t.algorithm, auth_data: t.auth_data, version: e.version }), e;
        });
      }, $.prototype.deleteKeyBackupVersion = function (e) {
        if (null === this._crypto) throw new Error("End-to-end encryption disabled");this._crypto.backupInfo && this._crypto.backupInfo.version === e && this.disableKeyBackup();var t = A.encodeUri("/room_keys/version/$version", { $version: e });return this._http.authedRequest(undefined, "DELETE", t, undefined, undefined);
      }, $.prototype._makeKeyBackupPath = function (e, t, n) {
        return { path: undefined !== t ? A.encodeUri("/room_keys/keys/$roomId/$sessionId", { $roomId: e, $sessionId: t }) : undefined !== e ? A.encodeUri("/room_keys/keys/$roomId", { $roomId: e }) : "/room_keys/keys", queryData: undefined === n ? undefined : { version: n } };
      }, $.prototype.sendKeyBackup = function (e, t, n, r) {
        if (null === this._crypto) throw new Error("End-to-end encryption disabled");var o = this._makeKeyBackupPath(e, t, n);return this._http.authedRequest(undefined, "PUT", o.path, o.queryData, r);
      }, $.prototype.backupAllGroupSessions = function (e) {
        if (null === this._crypto) throw new Error("End-to-end encryption disabled");return this._crypto.backupAllGroupSessions(e);
      }, $.prototype.isValidRecoveryKey = function (e) {
        try {
          return decodeRecoveryKey(e), true;
        } catch (e) {
          return false;
        }
      }, $.prototype.restoreKeyBackupWithPassword = (_ = (0, e.default)(p.default.mark(function e(t, n, r, o) {
        var i, s;return p.default.wrap(function (e) {
          for (;;) switch (e.prev = e.next) {case 0:
              return e.next = 2, this.getKeyBackupVersion();case 2:
              return i = e.sent, e.next = 5, keyForExistingBackup(i, t);case 5:
              return s = e.sent, e.abrupt("return", this._restoreKeyBackup(s, n, r, o));case 7:case "end":
              return e.stop();}
        }, e, this);
      })), function (e, t, n, r) {
        return _.apply(this, arguments);
      }), $.prototype.restoreKeyBackupWithRecoveryKey = function (e, t, n, r) {
        var o = decodeRecoveryKey(e);return this._restoreKeyBackup(o, t, n, r);
      }, $.prototype._restoreKeyBackup = function (e, _, g, t) {
        var b = this;if (null === this._crypto) throw new Error("End-to-end encryption disabled");var E = 0,
            S = [],
            n = this._makeKeyBackupPath(_, g, t),
            w = new s.Olm.PkDecryption();try {
          w.init_with_private_key(e);
        } catch (e) {
          throw w.free(), e;
        }return this._http.authedRequest(undefined, "GET", n.path, n.queryData).then(function (e) {
          if (e.rooms) {
            var t = true,
                n = false,
                r = undefined;try {
              for (var o, i = (0, k.default)((0, x.default)(e.rooms)); !(t = (o = i.next()).done); t = true) {
                var s = o.value,
                    a = (0, R.default)(s, 2),
                    u = a[0],
                    c = a[1];if (c.sessions) {
                  E += (0, T.default)(c.sessions).length;var l = q(c.sessions, w, u),
                      p = true,
                      f = false,
                      h = undefined;try {
                    for (var d, v = (0, k.default)(l); !(p = (d = v.next()).done); p = true) {
                      var m = d.value;m.room_id = u, S.push(m);
                    }
                  } catch (e) {
                    f = true, h = e;
                  } finally {
                    try {
                      !p && v.return && v.return();
                    } finally {
                      if (f) throw h;
                    }
                  }
                }
              }
            } catch (e) {
              n = true, r = e;
            } finally {
              try {
                !t && i.return && i.return();
              } finally {
                if (n) throw r;
              }
            }
          } else if (e.sessions) E = (0, T.default)(e.sessions).length, S = q(e.sessions, w, _);else {
            E = 1;try {
              var y = B(e, w);y.room_id = _, y.session_id = g, S.push(y);
            } catch (e) {
              console.log("Failed to decrypt session from backup");
            }
          }return b.importRoomKeys(S);
        }).then(function () {
          return { total: E, imported: S.length };
        }).finally(function () {
          w.free();
        });
      }, $.prototype.deleteKeysFromBackup = function (e, t, n) {
        if (null === this._crypto) throw new Error("End-to-end encryption disabled");var r = this._makeKeyBackupPath(e, t, n);return this._http.authedRequest(undefined, "DELETE", r.path, r.queryData);
      }, $.prototype.getGroup = function (e) {
        return this.store.getGroup(e);
      }, $.prototype.getGroups = function () {
        return this.store.getGroups();
      }, $.prototype.getMediaConfig = function (e) {
        return this._http.authedRequestWithPrefix(e, "GET", "/config", undefined, undefined, w.PREFIX_MEDIA_R0);
      }, $.prototype.getRoom = function (e) {
        return this.store.getRoom(e);
      }, $.prototype.getRooms = function () {
        return this.store.getRooms();
      }, $.prototype.getVisibleRooms = function () {
        var e = this.store.getRooms(),
            t = new l.default(),
            n = true,
            r = false,
            o = undefined;try {
          for (var i, s = (0, k.default)(e); !(n = (i = s.next()).done); n = true) {
            var a = i.value.currentState.getStateEvents("m.room.create", "");if (a) {
              var u = a.getContent().predecessor;u && u.room_id && t.add(u.room_id);
            }
          }
        } catch (e) {
          r = true, o = e;
        } finally {
          try {
            !n && s.return && s.return();
          } finally {
            if (r) throw o;
          }
        }return e.filter(function (e) {
          return !e.currentState.getStateEvents("m.room.tombstone", "") || !t.has(e.roomId);
        });
      }, $.prototype.getUser = function (e) {
        return this.store.getUser(e);
      }, $.prototype.getUsers = function () {
        return this.store.getUsers();
      }, $.prototype.getProfile = function (e) {
        return this.store.getProfile(e);
      }, $.prototype.getProfiles = function (e) {
        return this.store.getProfiles(e);
      }, $.prototype.setAccountData = function (e, t, n) {
        var r = A.encodeUri("/user/$userId/account_data/$type", { $userId: this.credentials.userId, $type: e });return this._http.authedRequest(n, "PUT", r, undefined, t);
      }, $.prototype.getAccountData = function (e) {
        return this.store.getAccountData(e);
      }, $.prototype.getIgnoredUsers = function () {
        var e = this.getAccountData("m.ignored_user_list");return e && e.getContent() && e.getContent().ignored_users ? (0, T.default)(e.getContent().ignored_users) : [];
      }, $.prototype.setIgnoredUsers = function (e, t) {
        var n = { ignored_users: {} };return e.map(function (e) {
          return n.ignored_users[e] = {};
        }), this.setAccountData("m.ignored_user_list", n, t);
      }, $.prototype.isUserIgnored = function (e) {
        return -1 !== this.getIgnoredUsers().indexOf(e);
      }, $.prototype.joinRoom = function (r, o, t) {
        if (A.isFunction(o)) throw new Error("Expected 'opts' object, got function.");undefined === (o = o || {}).syncRoom && (o.syncRoom = true);var e = this.getRoom(r);if (e && e.hasMembershipState(this.credentials.userId, "join")) return f.default.resolve(e);var n = f.default.resolve();o.inviteSignUrl && (n = this._http.requestOtherUrl(undefined, "POST", o.inviteSignUrl, { mxid: this.credentials.userId }));var i = {};o.viaServers && (i.server_name = o.viaServers);var s = { qsStringifyOptions: { arrayFormat: "repeat" } },
            a = f.default.defer(),
            u = this;return n.then(function (e) {
          var t = {};e && (t.third_party_signed = e);var n = A.encodeUri("/join/$roomid", { $roomid: r });return u._http.authedRequest(undefined, "POST", n, i, t, s);
        }).then(function (e) {
          var t = e.room_id,
              n = new D(u, u._clientOpts).createRoom(t);return o.syncRoom, f.default.resolve(n);
        }).done(function (e) {
          Q(t, a, e);
        }, function (e) {
          J(t, a, e);
        }), a.promise;
      }, $.prototype.resendEvent = function (e, t) {
        return K(t, e, C.SENDING), G(this, t, e);
      }, $.prototype.cancelPendingEvent = function (e) {
        if ([C.QUEUED, C.NOT_SENT].indexOf(e.status) < 0) throw new Error("cannot cancel an event with status " + e.status);this.scheduler && this.scheduler.removeEventFromQueue(e), K(this.getRoom(e.getRoomId()), e, C.CANCELLED);
      }, $.prototype.setRoomName = function (e, t, n) {
        return this.sendStateEvent(e, "m.room.name", { name: t }, undefined, n);
      }, $.prototype.setRoomTopic = function (e, t, n) {
        return this.sendStateEvent(e, "m.room.topic", { topic: t }, undefined, n);
      }, $.prototype.getRoomTags = function (e, t) {
        var n = A.encodeUri("/user/$userId/rooms/$roomId/tags/", { $userId: this.credentials.userId, $roomId: e });return this._http.authedRequest(t, "GET", n, undefined);
      }, $.prototype.setRoomTag = function (e, t, n, r) {
        var o = A.encodeUri("/user/$userId/rooms/$roomId/tags/$tag", { $userId: this.credentials.userId, $roomId: e, $tag: t });return this._http.authedRequest(r, "PUT", o, undefined, n);
      }, $.prototype.deleteRoomTag = function (e, t, n) {
        var r = A.encodeUri("/user/$userId/rooms/$roomId/tags/$tag", { $userId: this.credentials.userId, $roomId: e, $tag: t });return this._http.authedRequest(n, "DELETE", r, undefined, undefined);
      }, $.prototype.setRoomAccountData = function (e, t, n, r) {
        var o = A.encodeUri("/user/$userId/rooms/$roomId/account_data/$type", { $userId: this.credentials.userId, $roomId: e, $type: t });return this._http.authedRequest(r, "PUT", o, undefined, n);
      }, $.prototype.setPowerLevel = function (e, t, n, r) {
        var o = (0, T.default)(t) || [],
            i = { users: {} };n && "m.room.power_levels" === n.getType() && (i = A.deepCopy(n.getContent())), o.forEach(function (e) {
          i.users[e] = t[e];
        });var s = A.encodeUri("/rooms/$roomId/state/m.room.power_levels", { $roomId: e });return this._http.authedRequest(r, "PUT", s, undefined, i);
      }, $.prototype.sendEvent = function (e, t, n, r, o) {
        A.isFunction(r) && (o = r, r = undefined), r = r || this.makeTxnId(), console.log("sendEvent of type " + t + " in " + e + " with txnId " + r);var i = this.getRoom(e),
            s = new I({ event_id: "~" + e + ":" + r, user_id: this.credentials.userId, room_id: e, type: t, origin_server_ts: new Date().getTime(), content: n });return s._txnId = r, s.status = C.SENDING, i && i.addPendingEvent(s, r), s.status === C.NOT_SENT ? f.default.reject(new Error("Event blocked by other events not yet sent")) : G(this, i, s, o);
      }, $.prototype.sendMessage = function (e, t, n, r) {
        return A.isFunction(n) && (r = n, n = undefined), this.sendEvent(e, "m.room.message", t, n, r);
      }, $.prototype.sendTextMessage = function (e, t, n, r) {
        var o = N.makeTextMessage(t);return this.sendMessage(e, o, n, r);
      }, $.prototype.sendNotice = function (e, t, n, r) {
        var o = N.makeNotice(t);return this.sendMessage(e, o, n, r);
      }, $.prototype.sendEmoteMessage = function (e, t, n, r) {
        var o = N.makeEmoteMessage(t);return this.sendMessage(e, o, n, r);
      }, $.prototype.sendImageMessage = function (e, t, n, r, o) {
        A.isFunction(r) && (o = r, r = undefined);var i = { msgtype: "m.image", url: t, info: n, body: r = r || "Image" };return this.sendMessage(e, i, o);
      }, $.prototype.sendStickerMessage = function (e, t, n, r, o) {
        A.isFunction(r) && (o = r, r = undefined);var i = { url: t, info: n, body: r = r || "Sticker" };return this.sendEvent(e, "m.sticker", i, o, undefined);
      }, $.prototype.sendHtmlMessage = function (e, t, n, r) {
        var o = N.makeHtmlMessage(t, n);return this.sendMessage(e, o, r);
      }, $.prototype.sendHtmlNotice = function (e, t, n, r) {
        var o = N.makeHtmlNotice(t, n);return this.sendMessage(e, o, r);
      }, $.prototype.sendHtmlEmote = function (e, t, n, r) {
        var o = N.makeHtmlEmote(t, n);return this.sendMessage(e, o, r);
      }, $.prototype.sendReceipt = function (e, t, n) {
        if (this.isGuest()) return f.default.resolve({});var r = A.encodeUri("/rooms/$roomId/receipt/$receiptType/$eventId", { $roomId: e.getRoomId(), $receiptType: t, $eventId: e.getId() }),
            o = this._http.authedRequest(n, "POST", r, undefined, {}),
            i = this.getRoom(e.getRoomId());return i && i._addLocalEchoReceipt(this.credentials.userId, e, t), o;
      }, $.prototype.sendReadReceipt = function (e, t) {
        return this.sendReceipt(e, "m.read", t);
      }, $.prototype.setRoomReadMarkers = function (e, t, n) {
        var r = t,
            o = undefined;if (n) {
          o = n.getId();var i = this.getRoom(e);i && i._addLocalEchoReceipt(this.credentials.userId, n, "m.read");
        }return this.setRoomReadMarkersHttpRequest(e, r, o);
      }, $.prototype.getUrlPreview = function (e, t, n) {
        var r = t + "_" + e,
            o = this.urlPreviewCache[r];if (o) return f.default.resolve(o);var i = this;return this._http.authedRequestWithPrefix(n, "GET", "/preview_url", { url: e, ts: t }, undefined, w.PREFIX_MEDIA_R0).then(function (e) {
          return i.urlPreviewCache[r] = e;
        });
      }, $.prototype.sendTyping = function (e, t, n, r) {
        if (this.isGuest()) return f.default.resolve({});var o = A.encodeUri("/rooms/$roomId/typing/$userId", { $roomId: e, $userId: this.credentials.userId }),
            i = { typing: t };return t && (i.timeout = n || 2e4), this._http.authedRequest(r, "PUT", o, undefined, i);
      }, $.prototype.invite = function (e, t, n) {
        return function (e, t, n, r, o, i) {
          A.isFunction(o) && (i = o, o = undefined);var s = A.encodeUri("/rooms/$room_id/$membership", { $room_id: t, $membership: "invite" });return e._http.authedRequest(i, "POST", s, undefined, { user_id: n, reason: o, auto_join: true });
        }(this, e, t, 0, undefined, n);
      }, $.prototype.inviteByEmail = function (e, t, n) {
        return this.inviteByThreePid(e, "email", t, n);
      }, $.prototype.inviteByThreePid = function (e, t, n, r) {
        var o = A.encodeUri("/rooms/$roomId/invite", { $roomId: e }),
            i = this.getIdentityServerUrl(true);return i ? this._http.authedRequest(r, "POST", o, undefined, { id_server: i, medium: t, address: n }) : f.default.reject(new L({ error: "No supplied identity server URL", errcode: "ORG.MATRIX.JSSDK_MISSING_PARAM" }));
      }, $.prototype.leave = function (e, t) {
        return W(this, e, undefined, "leave", undefined, t);
      }, $.prototype.ban = function (e, t, n, r) {
        return W(this, e, t, "ban", n, r);
      }, $.prototype.forget = function (t, e, n) {
        undefined === e && (e = true);var r = W(this, t, undefined, "forget", undefined, n);if (!e) return r;var o = this;return r.then(function (e) {
          return o.store.removeRoom(t), o.emit("deleteRoom", t), e;
        });
      }, $.prototype.unban = function (e, t, n) {
        var r = A.encodeUri("/rooms/$roomId/unban", { $roomId: e }),
            o = { user_id: t };return this._http.authedRequest(n, "POST", r, undefined, o);
      }, $.prototype.kick = function (e, t, n, r) {
        return function (e, t, n, r, o, i) {
          A.isFunction(o) && (i = o, o = undefined);var s = A.encodeUri("/rooms/$roomId/state/m.room.member/$userId", { $roomId: t, $userId: n });return e._http.authedRequest(i, "PUT", s, undefined, { membership: "leave", reason: o });
        }(this, e, t, 0, n, r);
      }, $.prototype.getPushActionsForEvent = function (e) {
        return e.getPushActions() || e.setPushActions(this._pushProcessor.actionsForEvent(e)), e.getPushActions();
      }, $.prototype.setProfileInfo = function (e, t, n) {
        var r = A.encodeUri("/profile/$userId/$info", { $userId: this.credentials.userId, $info: e });return this._http.authedRequest(n, "PUT", r, undefined, t);
      }, $.prototype.setDisplayName = function (e, t) {
        return this.setProfileInfo("displayname", { displayname: e }, t);
      }, $.prototype.setAvatarUrl = function (e, t) {
        return this.setProfileInfo("avatar_url", { avatar_url: e }, t);
      }, $.prototype.mxcUrlToHttp = function (e, t, n, r, o) {
        return M.getHttpUriForMxc(this.baseUrl, e, t, n, r, o);
      }, $.prototype.setPresence = function (e, t) {
        var n = A.encodeUri("/presence/$userId/status", { $userId: this.credentials.userId });if ("string" == typeof e && (e = { presence: e }), -1 == ["offline", "online", "unavailable"].indexOf(e.presence)) throw new Error("Bad presence value: " + e.presence);return this._http.authedRequest(t, "PUT", n, undefined, e);
      }, $.prototype.getPresenceList = function (e) {
        return V(e, this, undefined, "GET");
      }, $.prototype.inviteToPresenceList = function (e, t) {
        return V(e, this, { invite: t }, "POST");
      }, $.prototype.dropFromPresenceList = function (e, t) {
        return V(e, this, { drop: t }, "POST");
      }, $.prototype.scrollback = function (r, e, o) {
        A.isFunction(e) && (o = e, e = undefined), e = e || 30;var t = 0,
            n = this._ongoingScrollbacks[r.roomId] || {};if (n.promise) return n.promise;if (n.errorTs) {
          var i = Date.now() - n.errorTs;t = Math.max(3e3 - i, 0);
        }if (null === r.oldState.paginationToken) return f.default.resolve(r);var s = this.store.scrollback(r, e).length;if (s === e) return f.default.resolve(r);e -= s;var a = f.default.defer();n = { promise: a.promise, errorTs: null };var u = this;return f.default.delay(t).then(function () {
          return u._createMessagesRequest(r.roomId, r.oldState.paginationToken, e, "b");
        }).done(function (e) {
          var t = A.map(e.chunk, X(u));if (e.state) {
            var n = A.map(e.state, X(u));r.currentState.setUnknownStateEvents(n);
          }r.addEventsToTimeline(t, true, r.getLiveTimeline()), r.oldState.paginationToken = e.end, 0 === e.chunk.length && (r.oldState.paginationToken = null), u.store.storeEvents(r, t, e.end, true), u._ongoingScrollbacks[r.roomId] = null, Q(o, a, r);
        }, function (e) {
          u._ongoingScrollbacks[r.roomId] = { errorTs: Date.now() }, J(o, a, e);
        }), this._ongoingScrollbacks[r.roomId] = n, a.promise;
      }, $.prototype.getEventTimeline = function (i, s) {
        if (!this.timelineSupport) throw new Error("timeline support is disabled. Set the 'timelineSupport' parameter to true when creating MatrixClient to enable it.");if (i.getTimelineForEvent(s)) return f.default.resolve(i.getTimelineForEvent(s));var e = A.encodeUri("/rooms/$roomId/context/$eventId", { $roomId: i.room.roomId, $eventId: s }),
            t = undefined;this._clientOpts.lazyLoadMembers && (t = { filter: (0, c.default)(F.LAZY_LOADING_MESSAGES_FILTER) });var a = this;return a._http.authedRequest(undefined, "GET", e, t).then(function (e) {
          if (!e.event) throw new Error("'event' not in '/context' result - homeserver too old?");if (i.getTimelineForEvent(s)) return i.getTimelineForEvent(s);e.events_after.reverse();var t = e.events_after.concat([e.event]).concat(e.events_before),
              n = A.map(t, a.getEventMapper()),
              r = i.getTimelineForEvent(n[0].getId());if (r) {
            var o = A.map(e.state, a.getEventMapper());r.getState(O.BACKWARDS).setUnknownStateEvents(o);
          } else (r = i.addTimeline()).initialiseState(A.map(e.state, a.getEventMapper())), r.getState(O.FORWARDS).paginationToken = e.end;return i.addEventsToTimeline(n, true, r, e.start), i.getTimelineForEvent(s) || r;
        });
      }, $.prototype._createMessagesRequest = function (e, t, n, r) {
        var o = 4 < arguments.length && undefined !== arguments[4] ? arguments[4] : undefined,
            i = A.encodeUri("/rooms/$roomId/messages", { $roomId: e });undefined === n && (n = 30);var s = { from: t, limit: n, dir: r },
            a = null;return this._clientOpts.lazyLoadMembers && (a = (0, u.default)({}, F.LAZY_LOADING_MESSAGES_FILTER)), o && (a = a || {}, (0, u.default)(a, o.getRoomTimelineFilterComponent())), a && (s.filter = (0, c.default)(a)), this._http.authedRequest(undefined, "GET", i, s);
      }, $.prototype.paginateEventTimeline = function (s, e) {
        var t = s.getTimelineSet() === this._notifTimelineSet,
            a = (e = e || {}).backwards || false;if (t && !a) throw new Error("paginateNotifTimeline can only paginate backwards");var u = a ? O.BACKWARDS : O.FORWARDS,
            n = s.getPaginationToken(u);if (!n) return f.default.resolve(false);var r = s._paginationRequests[u];if (r) return r;var o = undefined,
            i = undefined,
            c = undefined,
            l = this;if (t) o = "/notifications", i = { limit: "limit" in e ? e.limit : 30, only: "highlight" }, n && "end" !== n && (i.from = n), c = this._http.authedRequestWithPrefix(undefined, "GET", o, i, undefined, w.PREFIX_UNSTABLE).then(function (e) {
          for (var t = e.next_token, n = [], r = 0; r < e.notifications.length; r++) {
            var o = e.notifications[r],
                i = l.getEventMapper()(o.event);i.setPushActions(b.actionListToActionsObject(o.actions)), i.event.room_id = o.room_id, n[r] = i;
          }return s.getTimelineSet().addEventsToTimeline(n, a, s, t), a && !e.next_token && s.setPaginationToken(null, u), !!e.next_token;
        }).finally(function () {
          s._paginationRequests[u] = null;
        }), s._paginationRequests[u] = c;else {
          if (!this.getRoom(s.getRoomId())) throw new Error("Unknown room " + s.getRoomId());(c = this._createMessagesRequest(s.getRoomId(), n, e.limit, u, s.getFilter())).then(function (e) {
            if (e.state) {
              var t = s.getState(u),
                  n = A.map(e.state, l.getEventMapper());t.setUnknownStateEvents(n);
            }var r = e.end,
                o = A.map(e.chunk, l.getEventMapper());return s.getTimelineSet().addEventsToTimeline(o, a, s, r), a && e.end == e.start && s.setPaginationToken(null, u), e.end != e.start;
          }).finally(function () {
            s._paginationRequests[u] = null;
          }), s._paginationRequests[u] = c;
        }return c;
      }, $.prototype.resetNotifTimelineSet = function () {
        this._notifTimelineSet && this._notifTimelineSet.resetLiveTimeline("end", null);
      }, $.prototype.peekInRoom = function (e) {
        return this._peekSync && this._peekSync.stopPeeking(), this._peekSync = new D(this, this._clientOpts), this._peekSync.peek(e);
      }, $.prototype.stopPeeking = function () {
        this._peekSync && (this._peekSync.stopPeeking(), this._peekSync = null);
      }, $.prototype.setGuestAccess = function (e, t) {
        var n = this.sendStateEvent(e, "m.room.guest_access", { guest_access: t.allowJoin ? "can_join" : "forbidden" }),
            r = f.default.resolve();return t.allowRead && (r = this.sendStateEvent(e, "m.room.history_visibility", { history_visibility: "world_readable" })), f.default.all([r, n]);
      }, $.prototype.requestRegisterEmailToken = function (e, t, n, r) {
        return this._requestTokenFromEndpoint("/register/email/requestToken", { email: e, client_secret: t, send_attempt: n, next_link: r });
      }, $.prototype.requestRegisterMsisdnToken = function (e, t, n, r, o) {
        return this._requestTokenFromEndpoint("/register/msisdn/requestToken", { country: e, phone_number: t, client_secret: n, send_attempt: r, next_link: o });
      }, $.prototype.requestAdd3pidEmailToken = function (e, t, n, r) {
        return this._requestTokenFromEndpoint("/account/3pid/email/requestToken", { email: e, client_secret: t, send_attempt: n, next_link: r });
      }, $.prototype.requestAdd3pidMsisdnToken = function (e, t, n, r, o) {
        return this._requestTokenFromEndpoint("/account/3pid/msisdn/requestToken", { country: e, phone_number: t, client_secret: n, send_attempt: r, next_link: o });
      }, $.prototype.requestPasswordEmailToken = function (e, t, n, r) {
        return this._requestTokenFromEndpoint("/account/password/email/requestToken", { email: e, client_secret: t, send_attempt: n, next_link: r });
      }, $.prototype.requestPasswordMsisdnToken = function (e, t, n, r, o) {
        return this._requestTokenFromEndpoint("/account/password/msisdn/requestToken", { country: e, phone_number: t, client_secret: n, send_attempt: r, next_link: o });
      }, $.prototype._requestTokenFromEndpoint = function (e, t) {
        var n = S.parse(this.idBaseUrl);if (null === n.host) throw new Error("Invalid ID server URL: " + this.idBaseUrl);var r = (0, u.default)({}, t, { id_server: n.host });return this._http.request(undefined, "POST", e, undefined, r);
      }, $.prototype.getRoomPushRule = function (e, t) {
        if (!this.pushRules) throw new Error("SyncApi.sync() must be done before accessing to push rules.");for (var n = 0; n < this.pushRules[e].room.length; n++) {
          var r = this.pushRules[e].room[n];if (r.rule_id === t) return r;
        }
      }, $.prototype.setRoomMutePushRule = function (e, t, n) {
        var r = this,
            o = undefined,
            i = undefined,
            s = this.getRoomPushRule(e, t);if (s && 0 <= s.actions.indexOf("dont_notify") && (i = true), n ? s ? i || (o = f.default.defer(), this.deletePushRule(e, "room", s.rule_id).done(function () {
          r.addPushRule(e, "room", t, { actions: ["dont_notify"] }).done(function () {
            o.resolve();
          }, function (e) {
            o.reject(e);
          });
        }, function (e) {
          o.reject(e);
        }), o = o.promise) : o = this.addPushRule(e, "room", t, { actions: ["dont_notify"] }) : i && (o = this.deletePushRule(e, "room", s.rule_id)), o) {
          var a = f.default.defer();return o.done(function () {
            r.getPushRules().done(function (e) {
              r.pushRules = e, a.resolve();
            }, function (e) {
              a.reject(e);
            });
          }, function (t) {
            r.getPushRules().done(function (e) {
              r.pushRules = e, a.reject(t);
            }, function (e) {
              a.reject(t);
            });
          }), a.promise;
        }
      }, $.prototype.searchMessageText = function (e, t) {
        var n = { search_term: e.query };return "keys" in e && (n.keys = e.keys), this.search({ body: { search_categories: { room_events: n } } }, t);
      }, $.prototype.searchRoomEvents = function (e) {
        var t = { search_categories: { room_events: { search_term: e.term, filter: e.filter, order_by: "recent", event_context: { before_limit: 1, after_limit: 1, include_profile: true } } } },
            n = { _query: t, results: [], highlights: [] };return this.search({ body: t }).then(this._processRoomEventsSearch.bind(this, n));
      }, $.prototype.backPaginateRoomEventsSearch = function (e) {
        if (!e.next_batch) return f.default.reject(new Error("Cannot backpaginate event search any further"));if (e.pendingRequest) return e.pendingRequest;var t = { body: e._query, next_batch: e.next_batch },
            n = this.search(t).then(this._processRoomEventsSearch.bind(this, e)).finally(function () {
          e.pendingRequest = null;
        });return e.pendingRequest = n;
      }, $.prototype._processRoomEventsSearch = function (e, t) {
        var n = t.search_categories.room_events;e.count = n.count, e.next_batch = n.next_batch;var r = {};n.highlights.forEach(function (e) {
          r[e] = 1;
        }), e.highlights.forEach(function (e) {
          r[e] = 1;
        }), e.highlights = (0, T.default)(r);for (var o = 0; o < n.results.length; o++) {
          var i = P.fromJson(n.results[o], this.getEventMapper());e.results.push(i);
        }return e;
      }, $.prototype.syncLeftRooms = function () {
        if (this._syncedLeftRooms) return f.default.resolve([]);if (this._syncLeftRoomsPromise) return this._syncLeftRoomsPromise;var t = this,
            e = new D(this, this._clientOpts);return this._syncLeftRoomsPromise = e.syncLeftRooms(), this._syncLeftRoomsPromise.then(function (e) {
          console.log("Marking success of sync left room request"), t._syncedLeftRooms = true;
        }).finally(function () {
          t._syncLeftRoomsPromise = null;
        }), this._syncLeftRoomsPromise;
      }, $.prototype.createFilter = function (n) {
        var r = this,
            e = A.encodeUri("/user/$userId/filter", { $userId: this.credentials.userId });return this._http.authedRequest(undefined, "POST", e, undefined, n).then(function (e) {
          var t = F.fromJson(r.credentials.userId, e.filter_id, n);return r.store.storeFilter(t), t;
        });
      }, $.prototype.getFilter = function (n, r, e) {
        if (e) {
          var t = this.store.getFilter(n, r);if (t) return f.default.resolve(t);
        }var o = this,
            i = A.encodeUri("/user/$userId/filter/$filterId", { $userId: n, $filterId: r });return this._http.authedRequest(undefined, "GET", i, undefined, undefined).then(function (e) {
          var t = F.fromJson(n, r, e);return o.store.storeFilter(t), t;
        });
      }, $.prototype.getOrCreateFilter = function (r, o) {
        var i = this.store.getFilterIdByName(r),
            e = f.default.resolve(),
            s = this;return i && (e = s.getFilter(s.credentials.userId, i, true).then(function (e) {
          var t = e.getDefinition(),
              n = o.getDefinition();if (A.deepCompare(t, n)) return f.default.resolve(i);s.store.setFilterIdByName(r, undefined);
        }, function (e) {
          if (404 !== e.httpStatus || "M_UNKNOWN" !== e.errcode && "M_NOT_FOUND" !== e.errcode) throw e;s.store.setFilterIdByName(r, undefined);
        })), e.then(function (e) {
          return e || s.createFilter(o.getDefinition()).then(function (e) {
            return s.store.setFilterIdByName(r, e.filterId), e.filterId;
          });
        });
      }, $.prototype.getOpenIdToken = function () {
        var e = A.encodeUri("/user/$userId/openid/request_token", { $userId: this.credentials.userId });return this._http.authedRequest(undefined, "POST", e, undefined, {});
      }, $.prototype.turnServer = function (e) {
        return this._http.authedRequest(e, "GET", "/voip/turnServer");
      }, $.prototype.getTurnServers = function () {
        return this._turnServers || [];
      }, $.prototype.startClient = (g = (0, e.default)(p.default.mark(function e(t) {
        var n = this;return p.default.wrap(function (e) {
          for (;;) switch (e.prev = e.next) {case 0:
              if (this.clientRunning) return e.abrupt("return");e.next = 2;break;case 2:
              if (this.clientRunning = true, "number" == typeof t && (t = { initialSyncLimit: t }), z(this), this._syncApi && (console.error("Still have sync object whilst not running: stopping old one"), this._syncApi.stop()), this._crypto) return e.prev = 7, e.next = 10, this._crypto.uploadDeviceKeys();e.next = 18;break;case 10:
              e.next = 15;break;case 12:
              e.prev = 12, e.t0 = e.catch(7), console.error(e.t0);case 15:
              return e.prev = 15, this._crypto.start(), e.finish(15);case 18:
              (t = (0, u.default)({}, t)).crypto = this._crypto, t.canResetEntireTimeline = function (e) {
                return !!n._canResetTimelineCallback && n._canResetTimelineCallback(e);
              }, this._clientOpts = t, this._syncApi = new D(this, t), this._syncApi.sync();case 24:case "end":
              return e.stop();}
        }, e, this, [[7, 12, 15, 18]]);
      })), function (e) {
        return g.apply(this, arguments);
      }), $.prototype._storeClientOptions = function () {
        var r = ["boolean", "string", "number"],
            e = (0, x.default)(this._clientOpts).filter(function (e) {
          var t = (0, R.default)(e, 2),
              n = (t[0], t[1]);return r.includes(undefined === n ? "undefined" : (0, o.default)(n));
        }).reduce(function (e, t) {
          var n = (0, R.default)(t, 2),
              r = n[0],
              o = n[1];return e[r] = o, e;
        }, {});return this.store.storeClientOptions(e);
      }, $.prototype.stopClient = function () {
        console.log("stopping MatrixClient"), this.clientRunning = false, this._syncApi && (this._syncApi.stop(), this._syncApi = null), this._crypto && this._crypto.stop(), this._peekSync && this._peekSync.stopPeeking(), clearTimeout(this._checkTurnServersTimeoutID);
      }, $.prototype.doesServerSupportLazyLoading = (0, e.default)(p.default.mark(function e() {
        var t, n;return p.default.wrap(function (e) {
          for (;;) switch (e.prev = e.next) {case 0:
              if (null === this._serverSupportsLazyLoading) return e.next = 3, this._http.request(undefined, "GET", "/_matrix/client/versions", undefined, undefined, { prefix: "" });e.next = 6;break;case 3:
              t = e.sent, n = t.unstable_features, this._serverSupportsLazyLoading = n && n["m.lazy_load_members"];case 6:
              return e.abrupt("return", this._serverSupportsLazyLoading);case 7:case "end":
              return e.stop();}
        }, e, this);
      })), $.prototype.hasLazyLoadMembersEnabled = function () {
        return !!this._clientOpts.lazyLoadMembers;
      }, $.prototype.setCanResetTimelineCallback = function (e) {
        this._canResetTimelineCallback = e;
      }, $.prototype.getCanResetTimelineCallback = function () {
        return this._canResetTimelineCallback;
      }, $.prototype.getEventMapper = function () {
        return X(this);
      }, $.prototype.generateClientSecret = function () {
        return (0, t.randomString)(32);
      }, Y.exports.MatrixClient = $, Y.exports.CRYPTO_ENABLED = false;
    }).call(this, Z(8));
  }, function (e, t, n) {
    var r = n(4);e.exports = function (e, t) {
      if (!r(e) || e._t !== t) throw TypeError("Incompatible receiver, " + t + " required!");return e;
    };
  }, function (e, t, n) {
    var u = n(22),
        c = n(19),
        l = n(34).f;e.exports = function (a) {
      return function (e) {
        for (var t, n = c(e), r = u(n), o = r.length, i = 0, s = []; i < o;) l.call(n, t = r[i++]) && s.push(a ? [t, n[t]] : n[t]);return s;
      };
    };
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: true });var c = o(n(11)),
        r = o(n(90));function o(e) {
      return e && e.__esModule ? e : { default: e };
    }var i = ((0, o(n(91)).default)(s, [{ key: "_handleEvent", value: function (e) {
        for (var t, n = arguments.length, r = Array(1 < n ? n - 1 : 0), o = 1; o < n; o++) r[o - 1] = arguments[o];(t = this.target).emit.apply(t, [e].concat(r));
      } }, { key: "reEmit", value: function (e, t) {
        var n = true,
            r = false,
            o = undefined;try {
          for (var i, s = (0, c.default)(t); !(n = (i = s.next()).done); n = true) {
            var a = i.value;undefined === this.boundHandlers[a] && (this.boundHandlers[a] = this._handleEvent.bind(this, a));var u = this.boundHandlers[a];e.on(a, u);
          }
        } catch (e) {
          r = true, o = e;
        } finally {
          try {
            !n && s.return && s.return();
          } finally {
            if (r) throw o;
          }
        }
      } }]), s);function s(e) {
      (0, r.default)(this, s), this.target = e, this.boundHandlers = {};
    }t.default = i;
  }, function (e, t, n) {
    "use strict";
    var A = n(187),
        M = n(189);function R() {
      this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null;
    }t.parse = i, t.resolve = function (e, t) {
      return i(e, false, true).resolve(t);
    }, t.resolveObject = function (e, t) {
      return e ? i(e, false, true).resolveObject(t) : t;
    }, t.format = function (e) {
      return M.isString(e) && (e = i(e)), e instanceof R ? e.format() : R.prototype.format.call(e);
    }, t.Url = R;var F = /^([a-z0-9.+-]+:)/i,
        r = /:[0-9]*$/,
        D = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
        o = ["{", "}", "|", "\\", "^", "`"].concat(["<", ">", '"', "`", " ", "\r", "\n", "\t"]),
        U = ["'"].concat(o),
        L = ["%", "/", "?", ";", "#"].concat(U),
        N = ["/", "?", "#"],
        q = /^[+a-z0-9A-Z_-]{0,63}$/,
        B = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
        $ = { javascript: true, "javascript:": true },
        G = { javascript: true, "javascript:": true },
        K = { http: true, https: true, ftp: true, gopher: true, file: true, "http:": true, "https:": true, "ftp:": true, "gopher:": true, "file:": true },
        H = n(190);function i(e, t, n) {
      if (e && M.isObject(e) && e instanceof R) return e;var r = new R();return r.parse(e, t, n), r;
    }R.prototype.parse = function (e, t, n) {
      if (!M.isString(e)) throw new TypeError("Parameter 'url' must be a string, not " + typeof e);var r = e.indexOf("?"),
          o = -1 !== r && r < e.indexOf("#") ? "?" : "#",
          i = e.split(o);i[0] = i[0].replace(/\\/g, "/");var s = e = i.join(o);if (s = s.trim(), !n && 1 === e.split("#").length) {
        var a = D.exec(s);if (a) return this.path = s, this.href = s, this.pathname = a[1], a[2] ? (this.search = a[2], this.query = t ? H.parse(this.search.substr(1)) : this.search.substr(1)) : t && (this.search = "", this.query = {}), this;
      }var u = F.exec(s);if (u) {
        var c = (u = u[0]).toLowerCase();this.protocol = c, s = s.substr(u.length);
      }if (n || u || s.match(/^\/\/[^@\/]+@[^@\/]+/)) {
        var l = "//" === s.substr(0, 2);!l || u && G[u] || (s = s.substr(2), this.slashes = true);
      }if (!G[u] && (l || u && !K[u])) {
        for (var p, f, h = -1, d = 0; d < N.length; d++) -1 !== (v = s.indexOf(N[d])) && (-1 === h || v < h) && (h = v);for (-1 !== (f = -1 === h ? s.lastIndexOf("@") : s.lastIndexOf("@", h)) && (p = s.slice(0, f), s = s.slice(f + 1), this.auth = decodeURIComponent(p)), h = -1, d = 0; d < L.length; d++) {
          var v;-1 !== (v = s.indexOf(L[d])) && (-1 === h || v < h) && (h = v);
        }-1 === h && (h = s.length), this.host = s.slice(0, h), s = s.slice(h), this.parseHost(), this.hostname = this.hostname || "";var m = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];if (!m) for (var y = this.hostname.split(/\./), _ = (d = 0, y.length); d < _; d++) {
          var g = y[d];if (g && !g.match(q)) {
            for (var b = "", E = 0, S = g.length; E < S; E++) 127 < g.charCodeAt(E) ? b += "x" : b += g[E];if (!b.match(q)) {
              var w = y.slice(0, d),
                  T = y.slice(d + 1),
                  x = g.match(B);x && (w.push(x[1]), T.unshift(x[2])), T.length && (s = "/" + T.join(".") + s), this.hostname = w.join(".");break;
            }
          }
        }255 < this.hostname.length ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), m || (this.hostname = A.toASCII(this.hostname));var k = this.port ? ":" + this.port : "",
            R = this.hostname || "";this.host = R + k, this.href += this.host, m && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), "/" !== s[0] && (s = "/" + s));
      }if (!$[c]) for (d = 0, _ = U.length; d < _; d++) {
        var I = U[d];if (-1 !== s.indexOf(I)) {
          var C = encodeURIComponent(I);C === I && (C = escape(I)), s = s.split(I).join(C);
        }
      }var O = s.indexOf("#");-1 !== O && (this.hash = s.substr(O), s = s.slice(0, O));var P = s.indexOf("?");if (-1 !== P ? (this.search = s.substr(P), this.query = s.substr(P + 1), t && (this.query = H.parse(this.query)), s = s.slice(0, P)) : t && (this.search = "", this.query = {}), s && (this.pathname = s), K[c] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
        k = this.pathname || "";var j = this.search || "";this.path = k + j;
      }return this.href = this.format(), this;
    }, R.prototype.format = function () {
      var e = this.auth || "";e && (e = (e = encodeURIComponent(e)).replace(/%3A/i, ":"), e += "@");var t = this.protocol || "",
          n = this.pathname || "",
          r = this.hash || "",
          o = false,
          i = "";this.host ? o = e + this.host : this.hostname && (o = e + (-1 === this.hostname.indexOf(":") ? this.hostname : "[" + this.hostname + "]"), this.port && (o += ":" + this.port)), this.query && M.isObject(this.query) && Object.keys(this.query).length && (i = H.stringify(this.query));var s = this.search || i && "?" + i || "";return t && ":" !== t.substr(-1) && (t += ":"), this.slashes || (!t || K[t]) && false !== o ? (o = "//" + (o || ""), n && "/" !== n.charAt(0) && (n = "/" + n)) : o = o || "", r && "#" !== r.charAt(0) && (r = "#" + r), s && "?" !== s.charAt(0) && (s = "?" + s), t + o + (n = n.replace(/[?#]/g, function (e) {
        return encodeURIComponent(e);
      })) + (s = s.replace("#", "%23")) + r;
    }, R.prototype.resolve = function (e) {
      return this.resolveObject(i(e, false, true)).format();
    }, R.prototype.resolveObject = function (e) {
      if (M.isString(e)) {
        var t = new R();t.parse(e, false, true), e = t;
      }for (var n = new R(), r = Object.keys(this), o = 0; o < r.length; o++) {
        var i = r[o];n[i] = this[i];
      }if (n.hash = e.hash, "" === e.href) return n.href = n.format(), n;if (e.slashes && !e.protocol) {
        for (var s = Object.keys(e), a = 0; a < s.length; a++) {
          var u = s[a];"protocol" !== u && (n[u] = e[u]);
        }return K[n.protocol] && n.hostname && !n.pathname && (n.path = n.pathname = "/"), n.href = n.format(), n;
      }if (e.protocol && e.protocol !== n.protocol) {
        if (!K[e.protocol]) {
          for (var c = Object.keys(e), l = 0; l < c.length; l++) {
            var p = c[l];n[p] = e[p];
          }return n.href = n.format(), n;
        }if (n.protocol = e.protocol, e.host || G[e.protocol]) n.pathname = e.pathname;else {
          for (var f = (e.pathname || "").split("/"); f.length && !(e.host = f.shift()););e.host || (e.host = ""), e.hostname || (e.hostname = ""), "" !== f[0] && f.unshift(""), f.length < 2 && f.unshift(""), n.pathname = f.join("/");
        }if (n.search = e.search, n.query = e.query, n.host = e.host || "", n.auth = e.auth, n.hostname = e.hostname || e.host, n.port = e.port, n.pathname || n.search) {
          var h = n.pathname || "",
              d = n.search || "";n.path = h + d;
        }return n.slashes = n.slashes || e.slashes, n.href = n.format(), n;
      }var v = n.pathname && "/" === n.pathname.charAt(0),
          m = e.host || e.pathname && "/" === e.pathname.charAt(0),
          y = m || v || n.host && e.pathname,
          _ = y,
          g = n.pathname && n.pathname.split("/") || [],
          b = (f = e.pathname && e.pathname.split("/") || [], n.protocol && !K[n.protocol]);if (b && (n.hostname = "", n.port = null, n.host && ("" === g[0] ? g[0] = n.host : g.unshift(n.host)), n.host = "", e.protocol && (e.hostname = null, e.port = null, e.host && ("" === f[0] ? f[0] = e.host : f.unshift(e.host)), e.host = null), y = y && ("" === f[0] || "" === g[0])), m) n.host = e.host || "" === e.host ? e.host : n.host, n.hostname = e.hostname || "" === e.hostname ? e.hostname : n.hostname, n.search = e.search, n.query = e.query, g = f;else if (f.length) (g = g || []).pop(), g = g.concat(f), n.search = e.search, n.query = e.query;else if (!M.isNullOrUndefined(e.search)) return b && (n.hostname = n.host = g.shift(), (x = !!(n.host && 0 < n.host.indexOf("@")) && n.host.split("@")) && (n.auth = x.shift(), n.host = n.hostname = x.shift())), n.search = e.search, n.query = e.query, M.isNull(n.pathname) && M.isNull(n.search) || (n.path = (n.pathname ? n.pathname : "") + (n.search ? n.search : "")), n.href = n.format(), n;if (!g.length) return n.pathname = null, n.search ? n.path = "/" + n.search : n.path = null, n.href = n.format(), n;for (var E = g.slice(-1)[0], S = (n.host || e.host || 1 < g.length) && ("." === E || ".." === E) || "" === E, w = 0, T = g.length; 0 <= T; T--) "." === (E = g[T]) ? g.splice(T, 1) : ".." === E ? (g.splice(T, 1), w++) : w && (g.splice(T, 1), w--);if (!y && !_) for (; w--;) g.unshift("..");!y || "" === g[0] || g[0] && "/" === g[0].charAt(0) || g.unshift(""), S && "/" !== g.join("/").substr(-1) && g.push("");var x,
          k = "" === g[0] || g[0] && "/" === g[0].charAt(0);return b && (n.hostname = n.host = k ? "" : g.length ? g.shift() : "", (x = !!(n.host && 0 < n.host.indexOf("@")) && n.host.split("@")) && (n.auth = x.shift(), n.host = n.hostname = x.shift())), (y = y || n.host && g.length) && !k && g.unshift(""), g.length ? n.pathname = g.join("/") : (n.pathname = null, n.path = null), M.isNull(n.pathname) && M.isNull(n.search) || (n.path = (n.pathname ? n.pathname : "") + (n.search ? n.search : "")), n.auth = e.auth || n.auth, n.slashes = n.slashes || e.slashes, n.href = n.format(), n;
    }, R.prototype.parseHost = function () {
      var e = this.host,
          t = r.exec(e);t && (":" !== (t = t[0]) && (this.port = t.substr(1)), e = e.substr(0, e.length - t.length)), e && (this.hostname = e);
    };
  }, function (e, t, n) {
    "use strict";
    var p = i(n(196)),
        r = i(n(20)),
        o = i(n(199));function i(e) {
      return e && e.__esModule ? e : { default: e };
    }var s = n(12),
        u = n(1),
        a = n(64);function c(e) {
      var t = 1 < arguments.length && undefined !== arguments[1] ? arguments[1] : undefined;this.roomId = e, this.members = {}, this.events = {}, this.paginationToken = null, this._sentinels = {}, this._updateModifiedTime(), this._displayNameToUserIds = {}, this._userIdsToDisplayNames = {}, this._tokenToInvite = {}, this._joinedMemberCount = null, this._summaryJoinedMemberCount = null, this._invitedMemberCount = null, this._summaryInvitedMemberCount = null, t = t || { status: 1 }, this._oobMemberFlags = t;
    }function l(e, t, n) {
      var r = e._userIdsToDisplayNames[t];if (delete e._userIdsToDisplayNames[t], r) {
        var o = u.removeHiddenChars(r),
            i = e._displayNameToUserIds[o];if (i) {
          var s = i.filter(function (e) {
            return e !== t;
          });e._displayNameToUserIds[o] = s;
        }
      }var a = (e._userIdsToDisplayNames[t] = n) && u.removeHiddenChars(n);a && (e._displayNameToUserIds[a] || (e._displayNameToUserIds[a] = []), e._displayNameToUserIds[a].push(t));
    }u.inherits(c, s), c.prototype.getJoinedMemberCount = function () {
      return null !== this._summaryJoinedMemberCount ? this._summaryJoinedMemberCount : (null === this._joinedMemberCount && (this._joinedMemberCount = this.getMembers().reduce(function (e, t) {
        return "join" === t.membership ? e + 1 : e;
      }, 0)), this._joinedMemberCount);
    }, c.prototype.setJoinedMemberCount = function (e) {
      this._summaryJoinedMemberCount = e;
    }, c.prototype.getInvitedMemberCount = function () {
      return null !== this._summaryInvitedMemberCount ? this._summaryInvitedMemberCount : (null === this._invitedMemberCount && (this._invitedMemberCount = this.getMembers().reduce(function (e, t) {
        return "invite" === t.membership ? e + 1 : e;
      }, 0)), this._invitedMemberCount);
    }, c.prototype.setInvitedMemberCount = function (e) {
      this._summaryInvitedMemberCount = e;
    }, c.prototype.getMembers = function () {
      return u.values(this.members);
    }, c.prototype.getMember = function (e) {
      return this.members[e] || null;
    }, c.prototype.getSentinelMember = function (e) {
      if (!e) return null;var t = this._sentinels[e];if (undefined === t) {
        t = new a(this.roomId, e);var n = this.members[e];n && t.setMembershipEvent(n.events.member, this), this._sentinels[e] = t;
      }return t;
    }, c.prototype.getStateEvents = function (e, t) {
      return this.events[e] ? undefined === t ? u.values(this.events[e]) : this.events[e][t] || null : undefined === t ? [] : null;
    }, c.prototype.clone = function () {
      var n = new c(this.roomId, this._oobMemberFlags),
          e = this._oobMemberFlags.status;return this._oobMemberFlags.status = 1, (0, o.default)(this.events).forEach(function (e) {
        var t = (0, o.default)(e);n.setStateEvents(t);
      }), this._oobMemberFlags.status = e, null !== this._summaryInvitedMemberCount && n.setInvitedMemberCount(this.getInvitedMemberCount()), null !== this._summaryJoinedMemberCount && n.setJoinedMemberCount(this.getJoinedMemberCount()), 3 == this._oobMemberFlags.status && this.getMembers().forEach(function (e) {
        e.isOutOfBand() && n.getMember(e.userId).markOutOfBand();
      }), n;
    }, c.prototype.setUnknownStateEvents = function (e) {
      var t = this,
          n = e.filter(function (e) {
        return undefined === t.events[e.getType()] || undefined === t.events[e.getType()][e.getStateKey()];
      });this.setStateEvents(n);
    }, c.prototype.setStateEvents = function (e) {
      var o = this;this._updateModifiedTime(), u.forEach(e, function (e) {
        e.getRoomId() === o.roomId && e.isState() && (o._setStateEvent(e), "m.room.member" === e.getType() && (l(o, e.getStateKey(), e.getContent().displayname), function (e, t) {
          if (t.getContent().third_party_invite) {
            var n = (t.getContent().third_party_invite.signed || {}).token;n && e.getStateEvents("m.room.third_party_invite", n) && (e._tokenToInvite[n] = t);
          }
        }(o, e)), o.emit("RoomState.events", e, o));
      }), u.forEach(e, function (t) {
        if (t.getRoomId() === o.roomId && t.isState()) if ("m.room.member" === t.getType()) {
          var e = t.getStateKey();"leave" !== t.getContent().membership && "ban" !== t.getContent().membership || (t.getContent().avatar_url = t.getContent().avatar_url || t.getPrevContent().avatar_url, t.getContent().displayname = t.getContent().displayname || t.getPrevContent().displayname);var n = o._getOrCreateMember(e, t);n.setMembershipEvent(t, o), o._updateMember(n), o.emit("RoomState.members", t, o, n);
        } else if ("m.room.power_levels" === t.getType()) {
          var r = u.values(o.members);u.forEach(r, function (e) {
            e.setPowerLevelEvent(t), o.emit("RoomState.members", t, o, e);
          }), o._sentinels = {};
        }
      });
    }, c.prototype._getOrCreateMember = function (e, t) {
      var n = this.members[e];return n || (n = new a(this.roomId, e), this.members[e] = n, this.emit("RoomState.newMember", t, this, n)), n;
    }, c.prototype._setStateEvent = function (e) {
      undefined === this.events[e.getType()] && (this.events[e.getType()] = {}), this.events[e.getType()][e.getStateKey()] = e;
    }, c.prototype._updateMember = function (e) {
      var t = this.getStateEvents("m.room.power_levels", "");t && e.setPowerLevelEvent(t), delete this._sentinels[e.userId], this.members[e.userId] = e, this._joinedMemberCount = null, this._invitedMemberCount = null;
    }, c.prototype.needsOutOfBandMembers = function () {
      return 1 === this._oobMemberFlags.status;
    }, c.prototype.markOutOfBandMembersStarted = function () {
      1 === this._oobMemberFlags.status && (this._oobMemberFlags.status = 2);
    }, c.prototype.markOutOfBandMembersFailed = function () {
      2 === this._oobMemberFlags.status && (this._oobMemberFlags.status = 1);
    }, c.prototype.clearOutOfBandMembers = function () {
      var t = this,
          n = 0;(0, r.default)(this.members).forEach(function (e) {
        t.members[e].isOutOfBand() && (++n, delete t.members[e]);
      }), console.log("LL: RoomState removed " + n + " members..."), this._oobMemberFlags.status = 1;
    }, c.prototype.setOutOfBandMembers = function (e) {
      var t = this;console.log("LL: RoomState about to set " + e.length + " OOB members ..."), 2 === this._oobMemberFlags.status && (console.log("LL: RoomState put in OOB_STATUS_FINISHED state ..."), this._oobMemberFlags.status = 3, e.forEach(function (e) {
        return t._setOutOfBandMember(e);
      }));
    }, c.prototype._setOutOfBandMember = function (e) {
      if ("m.room.member" === e.getType()) {
        var t = e.getStateKey(),
            n = this.getMember(t);if (!n || n.isOutOfBand()) {
          var r = this._getOrCreateMember(t, e);r.setMembershipEvent(e, this), r.markOutOfBand(), l(this, r.userId, r.name), this._setStateEvent(e), this._updateMember(r), this.emit("RoomState.members", e, this, r);
        }
      }
    }, c.prototype.setTypingEvent = function (t) {
      u.forEach(u.values(this.members), function (e) {
        e.setTypingEvent(t);
      });
    }, c.prototype.getInviteForThreePidToken = function (e) {
      return this._tokenToInvite[e] || null;
    }, c.prototype._updateModifiedTime = function () {
      this._modified = Date.now();
    }, c.prototype.getLastModifiedTime = function () {
      return this._modified;
    }, c.prototype.getUserIdsWithDisplayName = function (e) {
      return this._displayNameToUserIds[e] || [];
    }, c.prototype.maySendRedactionForEvent = function (e, t) {
      var n = this.getMember(t);if (!n || "leave" === n.membership) return false;if (e.status || e.isRedacted()) return false;var r = this.maySendEvent("m.room.redaction", t);return e.getSender() === t ? r : this._hasSufficientPowerLevelFor("redact", n.powerLevel);
    }, c.prototype._hasSufficientPowerLevelFor = function (e, t) {
      var n = this.getStateEvents("m.room.power_levels", ""),
          r = {};n && (r = n.getContent());var o = 50;return u.isNumber(r[e]) && (o = r[e]), o <= t;
    }, c.prototype.maySendMessage = function (e) {
      return this._maySendEventOfType("m.room.message", e, false);
    }, c.prototype.maySendEvent = function (e, t) {
      return this._maySendEventOfType(e, t, false);
    }, c.prototype.mayClientSendStateEvent = function (e, t) {
      return !t.isGuest() && this.maySendStateEvent(e, t.credentials.userId);
    }, c.prototype.maySendStateEvent = function (e, t) {
      return this._maySendEventOfType(e, t, true);
    }, c.prototype._maySendEventOfType = function (e, t, n) {
      var r = this.getStateEvents("m.room.power_levels", ""),
          o = undefined,
          i = {},
          s = 0,
          a = 0,
          u = 0;if (r) {
        i = (o = r.getContent()).events || {}, s = (0, p.default)(o.state_default) ? o.state_default : 50;var c = o.users && o.users[t];(0, p.default)(c) ? u = c : (0, p.default)(o.users_default) && (u = o.users_default), (0, p.default)(o.events_default) && (a = o.events_default);
      }var l = n ? s : a;return (0, p.default)(i[e]) && (l = i[e]), l <= u;
    }, c.prototype.mayTriggerNotifOfType = function (e, t) {
      var n = this.getMember(t);if (!n) return false;var r = this.getStateEvents("m.room.power_levels", ""),
          o = 50;return r && r.getContent() && r.getContent().notifications && u.isNumber(r.getContent().notifications[e]) && (o = r.getContent().notifications[e]), n.powerLevel >= o;
    }, e.exports = c;
  }, function (e, t, n) {
    "use strict";
    var i = c(n(62)),
        s = c(n(207)),
        a = c(n(25)),
        r = c(n(26)),
        o = c(n(67)),
        u = c(n(96));function c(e) {
      return e && e.__esModule ? e : { default: e };
    }var l = n(12),
        p = n(16).EventStatus,
        f = n(211),
        h = n(64),
        d = n(16).MatrixEvent,
        v = n(1),
        m = n(44),
        y = n(24),
        _ = n(100);function g(e, t, n) {
      var r = { content: {}, type: "m.receipt", room_id: t.getRoomId() };return r.content[t.getId()] = {}, r.content[t.getId()][n] = {}, r.content[t.getId()][n][e] = { ts: t.getTs() }, new d(r);
    }function b(e, t, n, r) {
      if ((r = r || {}).pendingEventOrdering = r.pendingEventOrdering || "chronological", this.reEmitter = new u.default(this), -1 === ["chronological", "detached"].indexOf(r.pendingEventOrdering)) throw new Error("opts.pendingEventOrdering MUST be either 'chronological' or 'detached'. Got: '" + r.pendingEventOrdering + "'");this.myUserId = n, this.roomId = e, this.name = e, this.tags = {}, this.accountData = {}, this.summary = null, this.storageToken = r.storageToken, this._opts = r, this._txnToEvent = {}, this._receipts = {}, this._receiptCacheByEventId = {}, this._realReceipts = {}, this._notificationCounts = {}, this._timelineSets = [new _(this, r)], this.reEmitter.reEmit(this.getUnfilteredTimelineSet(), ["Room.timeline", "Room.timelineReset"]), this._fixUpLegacyTimelineFields(), this._filteredTimelineSets = {}, "detached" == this._opts.pendingEventOrdering && (this._pendingEventList = []), this._blacklistUnverifiedDevices = null, this._selfMembership = null, this._summaryHeroes = null, this._client = t, this._opts.lazyLoadMembers ? this._membersPromise = null : this._membersPromise = o.default.resolve();
    }v.inherits(b, l), b.prototype.getVersion = function () {
      var e = this.currentState.getStateEvents("m.room.create", "");if (!e) return console.warn("Room " + this.room_id + " does not have an m.room.create event"), "1";var t = e.getContent().room_version;return undefined === t ? "1" : t;
    }, b.prototype.shouldUpgradeToVersion = function () {
      return "1" === this.getVersion() ? null : "1";
    }, b.prototype.userMayUpgradeRoom = function (e) {
      return this.currentState.maySendStateEvent("m.room.tombstone", e);
    }, b.prototype.getPendingEvents = function () {
      if ("detached" !== this._opts.pendingEventOrdering) throw new Error("Cannot call getPendingEventList with pendingEventOrdering == " + this._opts.pendingEventOrdering);return this._pendingEventList;
    }, b.prototype.getLiveTimeline = function () {
      return this.getUnfilteredTimelineSet().getLiveTimeline();
    }, b.prototype.getMyMembership = function () {
      return this._selfMembership;
    }, b.prototype.getDMInviter = function () {
      if (this.myUserId) {
        var e = this.getMember(this.myUserId);if (e) return e.getDMInviter();
      }if ("invite" === this._selfMembership && 2 == this.getInvitedAndJoinedMemberCount() && this._summaryHeroes.length) return this._summaryHeroes[0];
    }, b.prototype.guessDMUserId = function () {
      var t = this,
          e = this.getMember(this.myUserId);if (e) {
        var n = e.getDMInviter();if (n) return n;
      }if (Array.isArray(this._summaryHeroes) && this._summaryHeroes.length) return this._summaryHeroes[0];var r = this.currentState.getMembers().find(function (e) {
        return e.userId !== t.myUserId;
      });return r ? r.userId : this.myUserId;
    }, b.prototype.getAvatarFallbackMember = function () {
      var t = this;if (!(2 < this.getInvitedAndJoinedMemberCount())) {
        var e = Array.isArray(this._summaryHeroes) && this._summaryHeroes.length;if (e) {
          var n = this._summaryHeroes.map(function (e) {
            return t.getMember(e);
          }).find(function (e) {
            return !!e;
          });if (n) return n;
        }var r = this.currentState.getMembers();if (r.length <= 2) {
          var o = r.find(function (e) {
            return e.userId !== t.myUserId;
          });if (o) return o;
        }if (e) {
          var i = this._summaryHeroes.map(function (e) {
            return t._client.getUser(e);
          }).find(function (e) {
            return !!e;
          });if (i) {
            var s = new h(this.roomId, i.userId);return s.user = i, s;
          }
        }
      }
    }, b.prototype.updateMyMembership = function (e) {
      var t = this._selfMembership;t !== (this._selfMembership = e) && ("leave" === e && this._cleanupAfterLeaving(), this.emit("Room.myMembership", this, e, t));
    }, b.prototype._loadMembersFromServer = (0, r.default)(a.default.mark(function e() {
      var t, n, r, o, i;return a.default.wrap(function (e) {
        for (;;) switch (e.prev = e.next) {case 0:
            return t = this._client.store.getSyncToken(), n = v.encodeParams({ not_membership: "leave", at: t }), r = v.encodeUri("/rooms/$roomId/members?" + n, { $roomId: this.roomId }), o = this._client._http, e.next = 6, o.authedRequest(undefined, "GET", r);case 6:
            return i = e.sent, e.abrupt("return", i.chunk);case 8:case "end":
            return e.stop();}
      }, e, this);
    })), b.prototype._loadMembers = (0, r.default)(a.default.mark(function e() {
      var t, n, r;return a.default.wrap(function (e) {
        for (;;) switch (e.prev = e.next) {case 0:
            return t = false, e.next = 3, this._client.store.getOutOfBandMembers(this.roomId);case 3:
            if (null === (n = e.sent)) return t = true, e.next = 8, this._loadMembersFromServer();e.next = 10;break;case 8:
            n = e.sent, console.log("LL: got " + n.length + " members from server for room " + this.roomId);case 10:
            return r = n.map(this._client.getEventMapper()), e.abrupt("return", { memberEvents: r, fromServer: t });case 12:case "end":
            return e.stop();}
      }, e, this);
    })), b.prototype.loadMembersIfNeeded = function () {
      var n = this;if (this._membersPromise) return this._membersPromise;this.currentState.markOutOfBandMembersStarted();var e = this._loadMembers().then(function (e) {
        return n.currentState.setOutOfBandMembers(e.memberEvents), n._client.isRoomEncrypted(n.roomId) && n._client._crypto.trackRoomDevices(n.roomId), e.fromServer;
      }).catch(function (e) {
        throw n._membersPromise = null, n.currentState.markOutOfBandMembersFailed(), e;
      });return e.then(function (e) {
        if (e) {
          var t = n.currentState.getMembers().filter(function (e) {
            return e.isOutOfBand();
          }).map(function (e) {
            return e.events.member.event;
          });return console.log("LL: telling store to write " + t.length + " members for room " + n.roomId), n._client.store.setOutOfBandMembers(n.roomId, t).catch(function (e) {
            console.log("LL: storing OOB room members failed, oh well", e);
          });
        }
      }).catch(function (e) {
        console.error(e);
      }), this._membersPromise = e, this._membersPromise;
    }, b.prototype.clearLoadedMembersIfNeeded = (0, r.default)(a.default.mark(function e() {
      return a.default.wrap(function (e) {
        for (;;) switch (e.prev = e.next) {case 0:
            if (this._opts.lazyLoadMembers && this._membersPromise) return e.next = 3, this.loadMembersIfNeeded();e.next = 7;break;case 3:
            return e.next = 5, this._client.store.clearOutOfBandMembers(this.roomId);case 5:
            this.currentState.clearOutOfBandMembers(), this._membersPromise = null;case 7:case "end":
            return e.stop();}
      }, e, this);
    })), b.prototype._cleanupAfterLeaving = function () {
      var t = this;this.clearLoadedMembersIfNeeded().catch(function (e) {
        console.error("error after clearing loaded members from room " + t.roomId + " after leaving"), console.dir(e);
      });
    }, b.prototype.resetLiveTimeline = function (e, t) {
      for (var n = 0; n < this._timelineSets.length; n++) this._timelineSets[n].resetLiveTimeline(e, t);this._fixUpLegacyTimelineFields();
    }, b.prototype._fixUpLegacyTimelineFields = function () {
      this.timeline = this.getLiveTimeline().getEvents(), this.oldState = this.getLiveTimeline().getState(y.BACKWARDS), this.currentState = this.getLiveTimeline().getState(y.FORWARDS);
    }, b.prototype.getTimelineSets = function () {
      return this._timelineSets;
    }, b.prototype.getUnfilteredTimelineSet = function () {
      return this._timelineSets[0];
    }, b.prototype.getTimelineForEvent = function (e) {
      return this.getUnfilteredTimelineSet().getTimelineForEvent(e);
    }, b.prototype.addTimeline = function () {
      return this.getUnfilteredTimelineSet().addTimeline();
    }, b.prototype.findEventById = function (e) {
      return this.getUnfilteredTimelineSet().findEventById(e);
    }, b.prototype.getUnreadNotificationCount = function (e) {
      return e = e || "total", this._notificationCounts[e] || 0;
    }, b.prototype.setUnreadNotificationCount = function (e, t) {
      this._notificationCounts[e] = t;
    }, b.prototype.setSummary = function (e) {
      var t = this,
          n = e["m.heroes"],
          r = e["m.joined_member_count"],
          o = e["m.invited_member_count"];(0, s.default)(r) && this.currentState.setJoinedMemberCount(r), (0, s.default)(o) && this.currentState.setInvitedMemberCount(o), Array.isArray(n) && (this._summaryHeroes = n.filter(function (e) {
        return e !== t.myUserId;
      }));
    }, b.prototype.setBlacklistUnverifiedDevices = function (e) {
      this._blacklistUnverifiedDevices = e;
    }, b.prototype.getBlacklistUnverifiedDevices = function () {
      return this._blacklistUnverifiedDevices;
    }, b.prototype.getAvatarUrl = function (e, t, n, r, o) {
      var i = this.currentState.getStateEvents("m.room.avatar", "");if (undefined === o && (o = true), !i && !o) return null;var s = i ? i.getContent().url : null;return s ? m.getHttpUriForMxc(e, s, t, n, r) : o ? m.getIdenticonUri(e, this.roomId, t, n) : null;
    }, b.prototype.getAliases = function () {
      var e = [],
          t = this.currentState.getStateEvents("m.room.aliases");if (t) for (var n = 0; n < t.length; ++n) {
        var r = t[n];v.isArray(r.getContent().aliases) && Array.prototype.push.apply(e, r.getContent().aliases);
      }return e;
    }, b.prototype.getCanonicalAlias = function () {
      var e = this.currentState.getStateEvents("m.room.canonical_alias", "");return e ? e.getContent().alias : null;
    }, b.prototype.addEventsToTimeline = function (e, t, n, r) {
      n.getTimelineSet().addEventsToTimeline(e, t, n, r);
    }, b.prototype.getMember = function (e) {
      return this.currentState.getMember(e);
    }, b.prototype.getJoinedMembers = function () {
      return this.getMembersWithMembership("join");
    }, b.prototype.getJoinedMemberCount = function () {
      return this.currentState.getJoinedMemberCount();
    }, b.prototype.getInvitedMemberCount = function () {
      return this.currentState.getInvitedMemberCount();
    }, b.prototype.getInvitedAndJoinedMemberCount = function () {
      return this.getInvitedMemberCount() + this.getJoinedMemberCount();
    }, b.prototype.getMembersWithMembership = function (t) {
      return v.filter(this.currentState.getMembers(), function (e) {
        return e.membership === t;
      });
    }, b.prototype.getEncryptionTargetMembers = (0, r.default)(a.default.mark(function e() {
      var t;return a.default.wrap(function (e) {
        for (;;) switch (e.prev = e.next) {case 0:
            return e.next = 2, this.loadMembersIfNeeded();case 2:
            return t = this.getMembersWithMembership("join"), this.shouldEncryptForInvitedMembers() && (t = t.concat(this.getMembersWithMembership("invite"))), e.abrupt("return", t);case 5:case "end":
            return e.stop();}
      }, e, this);
    })), b.prototype.shouldEncryptForInvitedMembers = function () {
      var e = this.currentState.getStateEvents("m.room.history_visibility", "");return e && e.getContent() && "joined" !== e.getContent().history_visibility;
    }, b.prototype.getDefaultRoomName = function (e) {
      return S(this, e, true);
    }, b.prototype.hasMembershipState = function (e, t) {
      var n = this.getMember(e);return !!n && n.membership === t;
    }, b.prototype.getOrCreateFilteredTimelineSet = function (e) {
      if (this._filteredTimelineSets[e.filterId]) return this._filteredTimelineSets[e.filterId];var t = (0, i.default)({ filter: e }, this._opts),
          n = new _(this, t);this.reEmitter.reEmit(n, ["Room.timeline", "Room.timelineReset"]), this._filteredTimelineSets[e.filterId] = n, this._timelineSets.push(n);var r = this.getLiveTimeline();r.getEvents().forEach(function (e) {
        n.addLiveEvent(e);
      });for (var o = r; o.getNeighbouringTimeline(y.BACKWARDS);) o = o.getNeighbouringTimeline(y.BACKWARDS);return n.getLiveTimeline().setPaginationToken(o.getPaginationToken(y.BACKWARDS), y.BACKWARDS), n;
    }, b.prototype.removeFilteredTimelineSet = function (e) {
      var t = this._filteredTimelineSets[e.filterId];delete this._filteredTimelineSets[e.filterId];var n = this._timelineSets.indexOf(t);-1 < n && this._timelineSets.splice(n, 1);
    }, b.prototype._addLiveEvent = function (e, t) {
      var n = undefined;if ("m.room.redaction" === e.getType()) {
        var r = e.event.redacts,
            o = this.getUnfilteredTimelineSet().findEventById(r);o && (o.makeRedacted(e), this.emit("Room.redaction", e, this));
      }if (e.getUnsigned().transaction_id) {
        var i = this._txnToEvent[e.getUnsigned().transaction_id];if (i) return undefined;
      }for (n = 0; n < this._timelineSets.length; n++) this._timelineSets[n].addLiveEvent(e, t);e.sender && "m.room.redaction" !== e.getType() && this.addReceipt(g(e.sender.userId, e, "m.read"), true);
    }, b.prototype.addPendingEvent = function (e, t) {
      if (e.status !== p.SENDING) throw new Error("addPendingEvent called on an event with status " + e.status);if (this._txnToEvent[t]) throw new Error("addPendingEvent called on an event with known txnId " + t);if (y.setEventMetadata(e, this.getLiveTimeline().getState(y.FORWARDS), false), this._txnToEvent[t] = e, "detached" == this._opts.pendingEventOrdering) this._pendingEventList.some(function (e) {
        return e.status === p.NOT_SENT;
      }) && (console.warn("Setting event as NOT_SENT due to messages in the same state"), e.status = p.NOT_SENT), this._pendingEventList.push(e);else for (var n = 0; n < this._timelineSets.length; n++) {
        var r = this._timelineSets[n];r.getFilter() ? this._filter.filterRoomTimeline([e]).length && r.addEventToTimeline(e, r.getLiveTimeline(), false) : r.addEventToTimeline(e, r.getLiveTimeline(), false);
      }this.emit("Room.localEchoUpdated", e, this, null, null);
    }, b.prototype._handleRemoteEcho = function (e, t) {
      var n = t.getId(),
          r = e.getId(),
          o = t.status;delete this._txnToEvent[e.transaction_id], this._pendingEventList && v.removeElement(this._pendingEventList, function (e) {
        return e.getId() == n;
      }, false), t.handleRemoteEcho(e.event);for (var i = 0; i < this._timelineSets.length; i++) this._timelineSets[i].handleRemoteEcho(t, n, r);this.emit("Room.localEchoUpdated", t, this, n, o);
    };var E = {};function S(n, t, e) {
      if (!e) {
        var r = n.currentState.getStateEvents("m.room.name", "");if (r && r.getContent() && r.getContent().name) return r.getContent().name;
      }var o = n.getCanonicalAlias();if (!o) {
        var i = n.getAliases();i.length && (o = i[0]);
      }if (o) return o;var s = n.currentState.getJoinedMemberCount() + n.currentState.getInvitedMemberCount() - 1,
          a = null;if (n._summaryHeroes) a = n._summaryHeroes.map(function (e) {
        var t = n.getMember(e);return t ? t.name : e;
      });else {
        var u = n.currentState.getMembers().filter(function (e) {
          return e.userId !== t && ("invite" === e.membership || "join" === e.membership);
        });u.sort(function (e, t) {
          return e.userId.localeCompare(t.userId);
        }), a = (u = u.slice(0, 5)).map(function (e) {
          return e.name;
        });
      }if (s) return w(a, s);if ("join" == n.getMyMembership()) {
        var c = n.currentState.getStateEvents("m.room.third_party_invite");if (c && c.length) return "Inviting " + w(c.map(function (e) {
          return e.getContent().display_name;
        }));
      }var l = a;return l.length || (l = n.currentState.getMembers().filter(function (e) {
        return e.userId !== t && "invite" !== e.membership && "join" !== e.membership;
      }).map(function (e) {
        return e.name;
      })), l.length ? "Empty room (was " + w(l) + ")" : "Empty room";
    }function w(e, t) {
      var n = (1 < arguments.length && undefined !== t ? t : e.length + 1) - 1;return e.length ? 1 === e.length && n <= 1 ? e[0] : 2 === e.length && n <= 2 ? e[0] + " and " + e[1] : 1 < n ? e[0] + " and " + n + " others" : e[0] + " and 1 other" : "Empty room";
    }E[p.ENCRYPTING] = [p.SENDING, p.NOT_SENT], E[p.SENDING] = [p.ENCRYPTING, p.QUEUED, p.NOT_SENT, p.SENT], E[p.QUEUED] = [p.SENDING, p.CANCELLED], E[p.SENT] = [], E[p.NOT_SENT] = [p.SENDING, p.QUEUED, p.CANCELLED], E[p.CANCELLED] = [], b.prototype.updatePendingEvent = function (e, t, n) {
      if (console.log("setting pendingEvent status to " + t + " in " + e.getRoomId()), t == p.SENT && !n) throw new Error("updatePendingEvent called with status=SENT, but no new event id");if (t != p.SENT || !this.getUnfilteredTimelineSet().eventIdToTimeline(n)) {
        var r = e.status,
            o = e.getId();if (!r) throw new Error("updatePendingEventStatus called on an event which is not a local echo.");var i = E[r];if (!i || i.indexOf(t) < 0) throw new Error("Invalid EventStatus transition " + r + "->" + t);if ((e.status = t) == p.SENT) {
          e.event.event_id = n;for (var s = 0; s < this._timelineSets.length; s++) this._timelineSets[s].replaceEventId(o, n);
        } else t == p.CANCELLED && (this._pendingEventList && v.removeElement(this._pendingEventList, function (e) {
          return e.getId() == o;
        }, false), this.removeEvent(o));this.emit("Room.localEchoUpdated", e, this, e.getId(), r);
      }
    }, b.prototype.addLiveEvents = function (e, t) {
      var n = undefined;if (t && -1 === ["replace", "ignore"].indexOf(t)) throw new Error("duplicateStrategy MUST be either 'replace' or 'ignore'");for (n = 0; n < this._timelineSets.length; n++) {
        var r = this._timelineSets[n].getLiveTimeline();if (r.getPaginationToken(y.FORWARDS)) throw new Error("live timeline " + n + " is no longer live - it has a pagination token (" + r.getPaginationToken(y.FORWARDS) + ")");if (r.getNeighbouringTimeline(y.FORWARDS)) throw new Error("live timeline " + n + " is no longer live - it has a neighbouring timeline");
      }for (n = 0; n < e.length; n++) "m.typing" === e[n].getType() ? this.currentState.setTypingEvent(e[n]) : "m.receipt" === e[n].getType() ? this.addReceipt(e[n]) : this._addLiveEvent(e[n], t);
    }, b.prototype.removeEvents = function (e) {
      for (var t = 0; t < e.length; ++t) this.removeEvent(e[t]);
    }, b.prototype.removeEvent = function (e) {
      for (var t = false, n = 0; n < this._timelineSets.length; n++) this._timelineSets[n].removeEvent(e) && (t = true);return t;
    }, b.prototype.recalculate = function () {
      var t = this,
          e = this.currentState.getStateEvents("m.room.member", this.myUserId);if (e && "invite" === e.getContent().membership) {
        var n = e.event.invite_room_state || [];v.forEach(n, function (e) {
          t.currentState.getStateEvents(e.type, e.state_key) || t.currentState.setStateEvents([new d({ type: e.type, state_key: e.state_key, content: e.content, event_id: "$fake" + Date.now(), room_id: t.roomId, user_id: t.myUserId })]);
        });
      }var r = this.name;this.name = S(this, this.myUserId), this.summary = new f(this.roomId, { title: this.name }), r !== this.name && this.emit("Room.name", this);
    }, b.prototype.getUsersReadUpTo = function (e) {
      return this.getReceiptsForEvent(e).filter(function (e) {
        return "m.read" === e.type;
      }).map(function (e) {
        return e.userId;
      });
    }, b.prototype.getEventReadUpTo = function (e, t) {
      var n = this._receipts;return t && (n = this._realReceipts), undefined === n["m.read"] || undefined === n["m.read"][e] ? null : n["m.read"][e].eventId;
    }, b.prototype.getReceiptsForEvent = function (e) {
      return this._receiptCacheByEventId[e.getId()] || [];
    }, b.prototype.addReceipt = function (e, t) {
      undefined === t && (t = false), t || this._addReceiptsToStructure(e, this._realReceipts), this._addReceiptsToStructure(e, this._receipts), this._receiptCacheByEventId = this._buildReceiptCache(this._receipts), this.emit("Room.receipt", e, this);
    }, b.prototype._addReceiptsToStructure = function (s, a) {
      var u = this;v.keys(s.getContent()).forEach(function (i) {
        v.keys(s.getContent()[i]).forEach(function (o) {
          v.keys(s.getContent()[i][o]).forEach(function (e) {
            var t = s.getContent()[i][o][e];a[o] || (a[o] = {});var n = a[o][e];if (n) {
              var r = u.getUnfilteredTimelineSet().compareEventOrdering(n.eventId, i);if (null !== r && 0 <= r) return;
            } else a[o][e] = {};a[o][e] = { eventId: i, data: t };
          });
        });
      });
    }, b.prototype._buildReceiptCache = function (r) {
      var o = {};return v.keys(r).forEach(function (n) {
        v.keys(r[n]).forEach(function (e) {
          var t = r[n][e];o[t.eventId] || (o[t.eventId] = []), o[t.eventId].push({ userId: e, type: n, data: t.data });
        });
      }), o;
    }, b.prototype._addLocalEchoReceipt = function (e, t, n) {
      this.addReceipt(g(e, t, n), true);
    }, b.prototype.addTags = function (e) {
      this.tags = e.getContent().tags || {}, this.emit("Room.tags", e, this);
    }, b.prototype.addAccountData = function (e) {
      for (var t = 0; t < e.length; t++) {
        var n = e[t];"m.tag" === n.getType() && this.addTags(n), this.accountData[n.getType()] = n, this.emit("Room.accountData", n, this);
      }
    }, b.prototype.getAccountData = function (e) {
      return this.accountData[e];
    }, b.prototype.maySendMessage = function () {
      return "join" === this.getMyMembership() && this.currentState.maySendEvent("m.room.message", this.myUserId);
    }, e.exports = b;
  }, function (e, t, n) {
    "use strict";
    var r = n(12),
        o = n(1),
        h = n(24),
        d = undefined;function i(e, t) {
      this.room = e, this._timelineSupport = Boolean(t.timelineSupport), this._liveTimeline = new h(this), this._timelines = [this._liveTimeline], this._eventIdToTimeline = {}, this._filter = t.filter || null;
    }d = console.log.bind(console), o.inherits(i, r), i.prototype.getFilter = function () {
      return this._filter;
    }, i.prototype.setFilter = function (e) {
      this._filter = e;
    }, i.prototype.getPendingEvents = function () {
      return this.room ? this._filter ? this._filter.filterRoomTimeline(this.room.getPendingEvents()) : this.room.getPendingEvents() : [];
    }, i.prototype.getLiveTimeline = function () {
      return this._liveTimeline;
    }, i.prototype.eventIdToTimeline = function (e) {
      return this._eventIdToTimeline[e];
    }, i.prototype.replaceEventId = function (e, t) {
      var n = this._eventIdToTimeline[e];n && (delete this._eventIdToTimeline[e], this._eventIdToTimeline[t] = n);
    }, i.prototype.resetLiveTimeline = function (e, t) {
      var n = !this._timelineSupport || !t,
          r = this._liveTimeline,
          o = n ? r.forkLive(h.FORWARDS) : r.fork(h.FORWARDS);n ? (this._timelines = [o], this._eventIdToTimeline = {}) : this._timelines.push(o), t && r.setPaginationToken(t, h.FORWARDS), o.setPaginationToken(e, h.BACKWARDS), this._liveTimeline = o, this.emit("Room.timelineReset", this.room, this, n);
    }, i.prototype.getTimelineForEvent = function (e) {
      var t = this._eventIdToTimeline[e];return undefined === t ? null : t;
    }, i.prototype.findEventById = function (t) {
      var e = this.getTimelineForEvent(t);if (e) return o.findElement(e.getEvents(), function (e) {
        return e.getId() == t;
      });
    }, i.prototype.addTimeline = function () {
      if (!this._timelineSupport) throw new Error("timeline support is disabled. Set the 'timelineSupport' parameter to true when creating MatrixClient to enable it.");var e = new h(this);return this._timelines.push(e), e;
    }, i.prototype.addEventsToTimeline = function (e, t, n, r) {
      if (!n) throw new Error("'timeline' not specified for EventTimelineSet.addEventsToTimeline");if (!t && n == this._liveTimeline) throw new Error("EventTimelineSet.addEventsToTimeline cannot be used for adding events to the live timeline - use Room.addLiveEvents instead");if (!this._filter || (e = this._filter.filterRoomTimeline(e)).length) {
        for (var o = t ? h.BACKWARDS : h.FORWARDS, i = t ? h.FORWARDS : h.BACKWARDS, s = false, a = false, u = 0; u < e.length; u++) {
          var c = e[u],
              l = c.getId(),
              p = this._eventIdToTimeline[l];if (p) {
            if (a = false, p != n) {
              var f = n.getNeighbouringTimeline(o);f ? (d(p == f ? "Event " + l + " in neighbouring timeline - switching to " + p : "Event " + l + " already in a different timeline " + p), n = p) : (console.info("Already have timeline for " + l + " - joining timeline " + n + " to " + p), n.setNeighbouringTimeline(p, o), p.setNeighbouringTimeline(n, i), n = p, s = true);
            } else d("Event " + l + " already in timeline " + n);
          } else this.addEventToTimeline(c, n, t), s = a = true;
        }!a && s || n.setPaginationToken(r, o);
      }
    }, i.prototype.addLiveEvent = function (e, t) {
      if (!this._filter || this._filter.filterRoomTimeline([e]).length) {
        var n = this._eventIdToTimeline[e.getId()];if (n) {
          if ("replace" === t) {
            d("EventTimelineSet.addLiveEvent: replacing duplicate event " + e.getId());for (var r = n.getEvents(), o = 0; o < r.length; o++) if (r[o].getId() === e.getId()) {
              h.setEventMetadata(e, n.getState(h.FORWARDS), false), r[o].encryptedType || (r[o] = e);break;
            }
          } else d("EventTimelineSet.addLiveEvent: ignoring duplicate event " + e.getId());
        } else this.addEventToTimeline(e, this._liveTimeline, false);
      }
    }, i.prototype.addEventToTimeline = function (e, t, n) {
      var r = e.getId();t.addEvent(e, n);var o = { timeline: this._eventIdToTimeline[r] = t, liveEvent: !n && t == this._liveTimeline };this.emit("Room.timeline", e, this.room, Boolean(n), false, o);
    }, i.prototype.handleRemoteEcho = function (e, t, n) {
      var r = this._eventIdToTimeline[t];r ? (delete this._eventIdToTimeline[t], this._eventIdToTimeline[n] = r) : this._filter ? this._filter.filterRoomTimeline([e]).length && this.addEventToTimeline(e, this._liveTimeline, false) : this.addEventToTimeline(e, this._liveTimeline, false);
    }, i.prototype.removeEvent = function (e) {
      var t = this._eventIdToTimeline[e];if (!t) return null;var n = t.removeEvent(e);if (n) {
        delete this._eventIdToTimeline[e];var r = { timeline: t };this.emit("Room.timeline", n, this.room, undefined, true, r);
      }return n;
    }, i.prototype.compareEventOrdering = function (e, t) {
      if (e == t) return 0;var n = this._eventIdToTimeline[e],
          r = this._eventIdToTimeline[t];if (undefined === n) return null;if (undefined === r) return null;if (n === r) {
        for (var o = undefined, i = undefined, s = n.getEvents(), a = 0; a < s.length && (undefined === o || undefined === i); a++) {
          var u = s[a].getId();u == e && (o = a), u == t && (i = a);
        }return o - i;
      }for (var c = n; c;) {
        if (c === r) return -1;c = c.getNeighbouringTimeline(h.FORWARDS);
      }for (c = n; c;) {
        if (c === r) return 1;c = c.getNeighbouringTimeline(h.BACKWARDS);
      }return null;
    }, e.exports = i;
  }, function (e, t, n) {
    "use strict";
    var r = n(12);function o(e) {
      this.groupId = e, this.name = null, this.avatarUrl = null, this.myMembership = null, this.inviter = null;
    }n(1).inherits(o, r), o.prototype.setProfile = function (e, t) {
      this.name === e && this.avatarUrl === t || (this.name = e || this.groupId, this.avatarUrl = t, this.emit("Group.profile", this));
    }, o.prototype.setMyMembership = function (e) {
      this.myMembership !== e && (this.myMembership = e, this.emit("Group.myMembership", this));
    }, o.prototype.setInviter = function (e) {
      this.inviter = e;
    }, e.exports = o;
  }, function (e, t, n) {
    "use strict";
    function l(e) {
      return (l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e;
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
      })(e);
    }function s(e, t) {
      for (var n = t && t.plainObjects ? Object.create(null) : {}, r = 0; r < e.length; ++r) undefined !== e[r] && (n[r] = e[r]);return n;
    }var a = Object.prototype.hasOwnProperty,
        u = function () {
      for (var e = [], t = 0; t < 256; ++t) e.push("%" + ((t < 16 ? "0" : "") + t.toString(16)).toUpperCase());return e;
    }();e.exports = { arrayToObject: s, assign: function (e, n) {
        return Object.keys(n).reduce(function (e, t) {
          return e[t] = n[t], e;
        }, e);
      }, combine: function (e, t) {
        return [].concat(e, t);
      }, compact: function (e) {
        for (var t = [{ obj: { o: e }, prop: "o" }], n = [], r = 0; r < t.length; ++r) for (var o = t[r], i = o.obj[o.prop], s = Object.keys(i), a = 0; a < s.length; ++a) {
          var u = s[a],
              c = i[u];"object" === l(c) && null !== c && -1 === n.indexOf(c) && (t.push({ obj: i, prop: u }), n.push(c));
        }return function (e) {
          for (; 1 < e.length;) {
            var t = e.pop(),
                n = t.obj[t.prop];if (Array.isArray(n)) {
              for (var r = [], o = 0; o < n.length; ++o) undefined !== n[o] && r.push(n[o]);t.obj[t.prop] = r;
            }
          }
        }(t), e;
      }, decode: function (e, t, n) {
        var r = e.replace(/\+/g, " ");if ("iso-8859-1" === n) return r.replace(/%[0-9a-f]{2}/gi, unescape);try {
          return decodeURIComponent(r);
        } catch (e) {
          return r;
        }
      }, encode: function (e, t, n) {
        if (0 === e.length) return e;var r = "string" == typeof e ? e : String(e);if ("iso-8859-1" === n) return escape(r).replace(/%u[0-9a-f]{4}/gi, function (e) {
          return "%26%23" + parseInt(e.slice(2), 16) + "%3B";
        });for (var o = "", i = 0; i < r.length; ++i) {
          var s = r.charCodeAt(i);45 === s || 46 === s || 95 === s || 126 === s || 48 <= s && s <= 57 || 65 <= s && s <= 90 || 97 <= s && s <= 122 ? o += r.charAt(i) : s < 128 ? o += u[s] : s < 2048 ? o += u[192 | s >> 6] + u[128 | 63 & s] : s < 55296 || 57344 <= s ? o += u[224 | s >> 12] + u[128 | s >> 6 & 63] + u[128 | 63 & s] : (i += 1, s = 65536 + ((1023 & s) << 10 | 1023 & r.charCodeAt(i)), o += u[240 | s >> 18] + u[128 | s >> 12 & 63] + u[128 | s >> 6 & 63] + u[128 | 63 & s]);
        }return o;
      }, isBuffer: function (e) {
        return null != e && !!(e.constructor && e.constructor.isBuffer && e.constructor.isBuffer(e));
      }, isRegExp: function (e) {
        return "[object RegExp]" === Object.prototype.toString.call(e);
      }, merge: function r(n, o, i) {
        if (!o) return n;if ("object" !== l(o)) {
          if (Array.isArray(n)) n.push(o);else {
            if ("object" !== l(n)) return [n, o];(i && (i.plainObjects || i.allowPrototypes) || !a.call(Object.prototype, o)) && (n[o] = true);
          }return n;
        }if ("object" !== l(n)) return [n].concat(o);var e = n;return Array.isArray(n) && !Array.isArray(o) && (e = s(n, i)), Array.isArray(n) && Array.isArray(o) ? (o.forEach(function (e, t) {
          a.call(n, t) ? n[t] && "object" === l(n[t]) ? n[t] = r(n[t], e, i) : n.push(e) : n[t] = e;
        }), n) : Object.keys(o).reduce(function (e, t) {
          var n = o[t];return a.call(e, t) ? e[t] = r(e[t], n, i) : e[t] = n, e;
        }, e);
      } };
  }, function (e, t, n) {
    "use strict";
    var r = String.prototype.replace,
        o = /%20/g;e.exports = { default: "RFC3986", formatters: { RFC1738: function (e) {
          return r.call(e, o, "+");
        }, RFC3986: function (e) {
          return e;
        } }, RFC1738: "RFC1738", RFC3986: "RFC3986" };
  }, function (i, e, s) {
    (function (e) {
      var t,
          n = s(106);if (window && window.XMLHttpRequest) {
        var r = s(217),
            o = s(218);n.request(function (e, t) {
          return e.qs = o.stringify(e.qs || {}, e.qsStringifyOptions), r(e, t);
        });
      }try {
        t = e.indexedDB;
      } catch (e) {}t && n.setCryptoStoreFactory(function () {
        return new n.IndexedDBCryptoStore(t, "matrix-js-sdk:crypto");
      }), i.exports = n, e.matrixcs = n;
    }).call(this, s(8));
  }, function (e, t, n) {
    "use strict";
    n.r(t);var r = n(104);t.default = r;
  }, function (n, e, r) {
    "use strict";
    (function (t) {
      n.exports.ContentHelpers = r(66), n.exports.MatrixEvent = r(16).MatrixEvent, n.exports.EventStatus = r(16).EventStatus, n.exports.MatrixInMemoryStore = r(85).MatrixInMemoryStore, n.exports.IndexedDBStore = r(87).IndexedDBStore, n.exports.IndexedDBStoreBackend = r(87).IndexedDBStoreBackend, n.exports.SyncAccumulator = r(88), n.exports.MatrixHttpApi = r(43).MatrixHttpApi, n.exports.MatrixError = r(43).MatrixError, n.exports.InvalidStoreError = r(92).InvalidStoreError, n.exports.MatrixClient = r(93).MatrixClient, n.exports.Room = r(99), n.exports.Group = r(101), n.exports.EventTimeline = r(24), n.exports.EventTimelineSet = r(100), n.exports.RoomMember = r(64), n.exports.RoomState = r(98), n.exports.User = r(42), n.exports.MatrixScheduler = r(213), n.exports.WebStorageSessionStore = r(214), n.exports.CRYPTO_ENABLED = r(93).CRYPTO_ENABLED, n.exports.ContentRepo = r(44), n.exports.Filter = r(65), n.exports.TimelineWindow = r(215).TimelineWindow, n.exports.InteractiveAuth = r(216);var o = undefined;n.exports.request = function (e) {
        o = e;
      }, n.exports.getRequest = function () {
        return o;
      }, n.exports.wrapRequest = function (n) {
        var r = o;o = function (e, t) {
          return n(r, e, t);
        };
      }, n.exports.createClient = function (e) {
        return "string" == typeof e && (e = { baseUrl: e }), e.request = e.request || o, e.store = e.store || new n.exports.MatrixInMemoryStore({ localStorage: t.localStorage }), e.scheduler = e.scheduler || new n.exports.MatrixScheduler(), new n.exports.MatrixClient(e);
      };
    }).call(this, r(8));
  }, function (e, t, n) {
    var r = function () {
      return this;
    }() || Function("return this")(),
        o = r.regeneratorRuntime && 0 <= Object.getOwnPropertyNames(r).indexOf("regeneratorRuntime"),
        i = o && r.regeneratorRuntime;if (r.regeneratorRuntime = undefined, e.exports = n(108), o) r.regeneratorRuntime = i;else try {
      delete r.regeneratorRuntime;
    } catch (e) {
      r.regeneratorRuntime = undefined;
    }
  }, function (j, e) {
    !function (e) {
      "use strict";
      var u,
          t = Object.prototype,
          c = t.hasOwnProperty,
          n = "function" == typeof Symbol ? Symbol : {},
          o = n.iterator || "@@iterator",
          r = n.asyncIterator || "@@asyncIterator",
          i = n.toStringTag || "@@toStringTag",
          s = "object" == typeof j,
          a = e.regeneratorRuntime;if (a) s && (j.exports = a);else {
        (a = e.regeneratorRuntime = s ? j.exports : {}).wrap = g;var p = "suspendedStart",
            f = "suspendedYield",
            h = "executing",
            d = "completed",
            v = {},
            l = {};l[o] = function () {
          return this;
        };var m = Object.getPrototypeOf,
            y = m && m(m(O([])));y && y !== t && c.call(y, o) && (l = y);var _ = w.prototype = E.prototype = Object.create(l);S.prototype = _.constructor = w, w.constructor = S, w[i] = S.displayName = "GeneratorFunction", a.isGeneratorFunction = function (e) {
          var t = "function" == typeof e && e.constructor;return !!t && (t === S || "GeneratorFunction" === (t.displayName || t.name));
        }, a.mark = function (e) {
          return Object.setPrototypeOf ? Object.setPrototypeOf(e, w) : (e.__proto__ = w, i in e || (e[i] = "GeneratorFunction")), e.prototype = Object.create(_), e;
        }, a.awrap = function (e) {
          return { __await: e };
        }, T(x.prototype), x.prototype[r] = function () {
          return this;
        }, a.AsyncIterator = x, a.async = function (e, t, n, r) {
          var o = new x(g(e, t, n, r));return a.isGeneratorFunction(t) ? o : o.next().then(function (e) {
            return e.done ? e.value : o.next();
          });
        }, T(_), _[i] = "Generator", _[o] = function () {
          return this;
        }, _.toString = function () {
          return "[object Generator]";
        }, a.keys = function (n) {
          var r = [];for (var e in n) r.push(e);return r.reverse(), function e() {
            for (; r.length;) {
              var t = r.pop();if (t in n) return e.value = t, e.done = false, e;
            }return e.done = true, e;
          };
        }, a.values = O, C.prototype = { constructor: C, reset: function (e) {
            if (this.prev = 0, this.next = 0, this.sent = this._sent = u, this.done = false, this.delegate = null, this.method = "next", this.arg = u, this.tryEntries.forEach(I), !e) for (var t in this) "t" === t.charAt(0) && c.call(this, t) && !isNaN(+t.slice(1)) && (this[t] = u);
          }, stop: function () {
            this.done = true;var e = this.tryEntries[0].completion;if ("throw" === e.type) throw e.arg;return this.rval;
          }, dispatchException: function (n) {
            if (this.done) throw n;var r = this;function e(e, t) {
              return i.type = "throw", i.arg = n, r.next = e, t && (r.method = "next", r.arg = u), !!t;
            }for (var t = this.tryEntries.length - 1; 0 <= t; --t) {
              var o = this.tryEntries[t],
                  i = o.completion;if ("root" === o.tryLoc) return e("end");if (o.tryLoc <= this.prev) {
                var s = c.call(o, "catchLoc"),
                    a = c.call(o, "finallyLoc");if (s && a) {
                  if (this.prev < o.catchLoc) return e(o.catchLoc, true);if (this.prev < o.finallyLoc) return e(o.finallyLoc);
                } else if (s) {
                  if (this.prev < o.catchLoc) return e(o.catchLoc, true);
                } else {
                  if (!a) throw new Error("try statement without catch or finally");if (this.prev < o.finallyLoc) return e(o.finallyLoc);
                }
              }
            }
          }, abrupt: function (e, t) {
            for (var n = this.tryEntries.length - 1; 0 <= n; --n) {
              var r = this.tryEntries[n];if (r.tryLoc <= this.prev && c.call(r, "finallyLoc") && this.prev < r.finallyLoc) {
                var o = r;break;
              }
            }o && ("break" === e || "continue" === e) && o.tryLoc <= t && t <= o.finallyLoc && (o = null);var i = o ? o.completion : {};return i.type = e, i.arg = t, o ? (this.method = "next", this.next = o.finallyLoc, v) : this.complete(i);
          }, complete: function (e, t) {
            if ("throw" === e.type) throw e.arg;return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg, this.method = "return", this.next = "end") : "normal" === e.type && t && (this.next = t), v;
          }, finish: function (e) {
            for (var t = this.tryEntries.length - 1; 0 <= t; --t) {
              var n = this.tryEntries[t];if (n.finallyLoc === e) return this.complete(n.completion, n.afterLoc), I(n), v;
            }
          }, catch: function (e) {
            for (var t = this.tryEntries.length - 1; 0 <= t; --t) {
              var n = this.tryEntries[t];if (n.tryLoc === e) {
                var r = n.completion;if ("throw" === r.type) {
                  var o = r.arg;I(n);
                }return o;
              }
            }throw new Error("illegal catch attempt");
          }, delegateYield: function (e, t, n) {
            return this.delegate = { iterator: O(e), resultName: t, nextLoc: n }, "next" === this.method && (this.arg = u), v;
          } };
      }function g(e, t, n, r) {
        var i,
            s,
            a,
            u,
            o = t && t.prototype instanceof E ? t : E,
            c = Object.create(o.prototype),
            l = new C(r || []);return c._invoke = (i = e, s = n, a = l, u = p, function (e, t) {
          if (u === h) throw new Error("Generator is already running");if (u === d) {
            if ("throw" === e) throw t;return P();
          }for (a.method = e, a.arg = t;;) {
            var n = a.delegate;if (n) {
              var r = k(n, a);if (r) {
                if (r === v) continue;return r;
              }
            }if ("next" === a.method) a.sent = a._sent = a.arg;else if ("throw" === a.method) {
              if (u === p) throw u = d, a.arg;a.dispatchException(a.arg);
            } else "return" === a.method && a.abrupt("return", a.arg);u = h;var o = b(i, s, a);if ("normal" === o.type) {
              if (u = a.done ? d : f, o.arg === v) continue;return { value: o.arg, done: a.done };
            }"throw" === o.type && (u = d, a.method = "throw", a.arg = o.arg);
          }
        }), c;
      }function b(e, t, n) {
        try {
          return { type: "normal", arg: e.call(t, n) };
        } catch (e) {
          return { type: "throw", arg: e };
        }
      }function E() {}function S() {}function w() {}function T(e) {
        ["next", "throw", "return"].forEach(function (t) {
          e[t] = function (e) {
            return this._invoke(t, e);
          };
        });
      }function x(u) {
        var t;this._invoke = function (n, r) {
          function e() {
            return new Promise(function (e, t) {
              !function t(e, n, r, o) {
                var i = b(u[e], u, n);if ("throw" !== i.type) {
                  var s = i.arg,
                      a = s.value;return a && "object" == typeof a && c.call(a, "__await") ? Promise.resolve(a.__await).then(function (e) {
                    t("next", e, r, o);
                  }, function (e) {
                    t("throw", e, r, o);
                  }) : Promise.resolve(a).then(function (e) {
                    s.value = e, r(s);
                  }, o);
                }o(i.arg);
              }(n, r, e, t);
            });
          }return t = t ? t.then(e, e) : e();
        };
      }function k(e, t) {
        var n = e.iterator[t.method];if (n === u) {
          if (t.delegate = null, "throw" === t.method) {
            if (e.iterator.return && (t.method = "return", t.arg = u, k(e, t), "throw" === t.method)) return v;t.method = "throw", t.arg = new TypeError("The iterator does not provide a 'throw' method");
          }return v;
        }var r = b(n, e.iterator, t.arg);if ("throw" === r.type) return t.method = "throw", t.arg = r.arg, t.delegate = null, v;var o = r.arg;return o ? o.done ? (t[e.resultName] = o.value, t.next = e.nextLoc, "return" !== t.method && (t.method = "next", t.arg = u), t.delegate = null, v) : o : (t.method = "throw", t.arg = new TypeError("iterator result is not an object"), t.delegate = null, v);
      }function R(e) {
        var t = { tryLoc: e[0] };1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), this.tryEntries.push(t);
      }function I(e) {
        var t = e.completion || {};t.type = "normal", delete t.arg, e.completion = t;
      }function C(e) {
        this.tryEntries = [{ tryLoc: "root" }], e.forEach(R, this), this.reset(true);
      }function O(t) {
        if (t) {
          var e = t[o];if (e) return e.call(t);if ("function" == typeof t.next) return t;if (!isNaN(t.length)) {
            var n = -1,
                r = function e() {
              for (; ++n < t.length;) if (c.call(t, n)) return e.value = t[n], e.done = false, e;return e.value = u, e.done = true, e;
            };return r.next = r;
          }
        }return { next: P };
      }function P() {
        return { value: u, done: true };
      }
    }(function () {
      return this;
    }() || Function("return this")());
  }, function (e, t, n) {
    n(45), n(27), n(32), n(117), n(123), n(124), e.exports = n(0).Promise;
  }, function (e, t, n) {
    var u = n(46),
        c = n(47);e.exports = function (a) {
      return function (e, t) {
        var n,
            r,
            o = String(c(e)),
            i = u(t),
            s = o.length;return i < 0 || s <= i ? a ? "" : undefined : (n = o.charCodeAt(i)) < 55296 || 56319 < n || i + 1 === s || (r = o.charCodeAt(i + 1)) < 56320 || 57343 < r ? a ? o.charAt(i) : n : a ? o.slice(i, i + 2) : r - 56320 + (n - 55296 << 10) + 65536;
      };
    };
  }, function (e, t, n) {
    "use strict";
    var r = n(29),
        o = n(36),
        i = n(31),
        s = {};n(14)(s, n(5)("iterator"), function () {
      return this;
    }), e.exports = function (e, t, n) {
      e.prototype = r(s, { next: o(1, n) }), i(e, t + " Iterator");
    };
  }, function (e, t, n) {
    var s = n(9),
        a = n(6),
        u = n(22);e.exports = n(10) ? Object.defineProperties : function (e, t) {
      a(e);for (var n, r = u(t), o = r.length, i = 0; i < o;) s.f(e, n = r[i++], t[n]);return e;
    };
  }, function (e, t, n) {
    var u = n(19),
        c = n(52),
        l = n(114);e.exports = function (a) {
      return function (e, t, n) {
        var r,
            o = u(e),
            i = c(o.length),
            s = l(n, i);if (a && t != t) {
          for (; s < i;) if ((r = o[s++]) != r) return true;
        } else for (; s < i; s++) if ((a || s in o) && o[s] === t) return a || s || 0;return !a && -1;
      };
    };
  }, function (e, t, n) {
    var r = n(46),
        o = Math.max,
        i = Math.min;e.exports = function (e, t) {
      return (e = r(e)) < 0 ? o(e + t, 0) : i(e, t);
    };
  }, function (e, t, n) {
    "use strict";
    var r = n(116),
        o = n(73),
        i = n(21),
        s = n(19);e.exports = n(48)(Array, "Array", function (e, t) {
      this._t = s(e), this._i = 0, this._k = t;
    }, function () {
      var e = this._t,
          t = this._k,
          n = this._i++;return !e || n >= e.length ? (this._t = undefined, o(1)) : o(0, "keys" == t ? n : "values" == t ? e[n] : [n, e[n]]);
    }, "values"), i.Arguments = i.Array, r("keys"), r("values"), r("entries");
  }, function (e, t) {
    e.exports = function () {};
  }, function (e, t, n) {
    "use strict";
    function r() {}function p(e) {
      var t;return !(!m(e) || "function" != typeof (t = e.then)) && t;
    }function o(l, n) {
      if (!l._n) {
        l._n = true;var r = l._c;S(function () {
          for (var u = l._v, c = 1 == l._s, e = 0, t = function (e) {
            var t,
                n,
                r,
                o = c ? e.ok : e.fail,
                i = e.resolve,
                s = e.reject,
                a = e.domain;try {
              o ? (c || (2 == l._h && U(l), l._h = 1), true === o ? t = u : (a && a.enter(), t = o(u), a && (a.exit(), r = true)), t === e.promise ? s(R("Promise-chain cycle")) : (n = p(t)) ? n.call(t, i, s) : i(t)) : s(u);
            } catch (e) {
              a && !r && a.exit(), s(e);
            }
          }; r.length > e;) t(r[e++]);l._c = [], l._n = false, n && !l._h && F(l);
        });
      }
    }function i(e) {
      var t = this;t._d || (t._d = true, (t = t._w || t)._v = e, t._s = 2, t._a || (t._a = t._c.slice()), o(t, true));
    }var s,
        a,
        u,
        c,
        l = n(28),
        f = n(3),
        h = n(13),
        d = n(39),
        v = n(2),
        m = n(4),
        y = n(17),
        _ = n(56),
        g = n(33),
        b = n(75),
        E = n(76).set,
        S = n(120)(),
        w = n(57),
        T = n(78),
        x = n(121),
        k = n(79),
        R = f.TypeError,
        I = f.process,
        C = I && I.versions,
        O = C && C.v8 || "",
        P = f.Promise,
        j = "process" == d(I),
        A = a = w.f,
        M = !!function () {
      try {
        var e = P.resolve(1),
            t = (e.constructor = {})[n(5)("species")] = function (e) {
          e(r, r);
        };return (j || "function" == typeof PromiseRejectionEvent) && e.then(r) instanceof t && 0 !== O.indexOf("6.6") && -1 === x.indexOf("Chrome/66");
      } catch (e) {}
    }(),
        F = function (i) {
      E.call(f, function () {
        var e,
            t,
            n,
            r = i._v,
            o = D(i);if (o && (e = T(function () {
          j ? I.emit("unhandledRejection", r, i) : (t = f.onunhandledrejection) ? t({ promise: i, reason: r }) : (n = f.console) && n.error && n.error("Unhandled promise rejection", r);
        }), i._h = j || D(i) ? 2 : 1), i._a = undefined, o && e.e) throw e.v;
      });
    },
        D = function (e) {
      return 1 !== e._h && 0 === (e._a || e._c).length;
    },
        U = function (t) {
      E.call(f, function () {
        var e;j ? I.emit("rejectionHandled", t) : (e = f.onrejectionhandled) && e({ promise: t, reason: t._v });
      });
    },
        L = function (e) {
      var n,
          r = this;if (!r._d) {
        r._d = true, r = r._w || r;try {
          if (r === e) throw R("Promise can't be resolved itself");(n = p(e)) ? S(function () {
            var t = { _w: r, _d: false };try {
              n.call(e, h(L, t, 1), h(i, t, 1));
            } catch (e) {
              i.call(t, e);
            }
          }) : (r._v = e, r._s = 1, o(r, false));
        } catch (e) {
          i.call({ _w: r, _d: false }, e);
        }
      }
    };M || (P = function (e) {
      _(this, P, "Promise", "_h"), y(e), s.call(this);try {
        e(h(L, this, 1), h(i, this, 1));
      } catch (e) {
        i.call(this, e);
      }
    }, (s = function (e) {
      this._c = [], this._a = undefined, this._s = 0, this._d = false, this._v = undefined, this._h = 0, this._n = false;
    }).prototype = n(58)(P.prototype, { then: function (e, t) {
        var n = A(b(this, P));return n.ok = "function" != typeof e || e, n.fail = "function" == typeof t && t, n.domain = j ? I.domain : undefined, this._c.push(n), this._a && this._a.push(n), this._s && o(this, false), n.promise;
      }, catch: function (e) {
        return this.then(undefined, e);
      } }), u = function () {
      var e = new s();this.promise = e, this.resolve = h(L, e, 1), this.reject = h(i, e, 1);
    }, w.f = A = function (e) {
      return e === P || e === c ? new u(e) : a(e);
    }), v(v.G + v.W + v.F * !M, { Promise: P }), n(31)(P, "Promise"), n(80)("Promise"), c = n(0).Promise, v(v.S + v.F * !M, "Promise", { reject: function (e) {
        var t = A(this);return (0, t.reject)(e), t.promise;
      } }), v(v.S + v.F * (l || !M), "Promise", { resolve: function (e) {
        return k(l && this === c ? P : this, e);
      } }), v(v.S + v.F * !(M && n(122)(function (e) {
      P.all(e).catch(r);
    })), "Promise", { all: function (e) {
        var s = this,
            t = A(s),
            a = t.resolve,
            u = t.reject,
            n = T(function () {
          var r = [],
              o = 0,
              i = 1;g(e, false, function (e) {
            var t = o++,
                n = false;r.push(undefined), i++, s.resolve(e).then(function (e) {
              n || (n = true, r[t] = e, --i || a(r));
            }, u);
          }), --i || a(r);
        });return n.e && u(n.v), t.promise;
      }, race: function (e) {
        var t = this,
            n = A(t),
            r = n.reject,
            o = T(function () {
          g(e, false, function (e) {
            t.resolve(e).then(n.resolve, r);
          });
        });return o.e && r(o.v), n.promise;
      } });
  }, function (e, t, n) {
    var i = n(6);e.exports = function (e, t, n, r) {
      try {
        return r ? t(i(n)[0], n[1]) : t(n);
      } catch (t) {
        var o = e.return;throw undefined !== o && i(o.call(e)), t;
      }
    };
  }, function (e, t, n) {
    var r = n(21),
        o = n(5)("iterator"),
        i = Array.prototype;e.exports = function (e) {
      return undefined !== e && (r.Array === e || i[o] === e);
    };
  }, function (e, t, n) {
    var a = n(3),
        u = n(76).set,
        c = a.MutationObserver || a.WebKitMutationObserver,
        l = a.process,
        p = a.Promise,
        f = "process" == n(30)(l);e.exports = function () {
      function e() {
        var e, t;for (f && (e = l.domain) && e.exit(); n;) {
          t = n.fn, n = n.next;try {
            t();
          } catch (e) {
            throw n ? o() : r = undefined, e;
          }
        }r = undefined, e && e.enter();
      }var n, r, o;if (f) o = function () {
        l.nextTick(e);
      };else if (!c || a.navigator && a.navigator.standalone) {
        if (p && p.resolve) {
          var t = p.resolve(undefined);o = function () {
            t.then(e);
          };
        } else o = function () {
          u.call(a, e);
        };
      } else {
        var i = true,
            s = document.createTextNode("");new c(e).observe(s, { characterData: true }), o = function () {
          s.data = i = !i;
        };
      }return function (e) {
        var t = { fn: e, next: undefined };r && (r.next = t), n || (n = t, o()), r = t;
      };
    };
  }, function (e, t, n) {
    var r = n(3).navigator;e.exports = r && r.userAgent || "";
  }, function (e, t, n) {
    var i = n(5)("iterator"),
        s = false;try {
      var r = [7][i]();r.return = function () {
        s = true;
      }, Array.from(r, function () {
        throw 2;
      });
    } catch (e) {}e.exports = function (e, t) {
      if (!t && !s) return false;var n = false;try {
        var r = [7],
            o = r[i]();o.next = function () {
          return { done: n = true };
        }, r[i] = function () {
          return o;
        }, e(r);
      } catch (e) {}return n;
    };
  }, function (e, t, n) {
    "use strict";
    var r = n(2),
        o = n(0),
        i = n(3),
        s = n(75),
        a = n(79);r(r.P + r.R, "Promise", { finally: function (t) {
        var n = s(this, o.Promise || i.Promise),
            e = "function" == typeof t;return this.then(e ? function (e) {
          return a(n, t()).then(function () {
            return e;
          });
        } : t, e ? function (e) {
          return a(n, t()).then(function () {
            throw e;
          });
        } : t);
      } });
  }, function (e, t, n) {
    "use strict";
    var r = n(2),
        o = n(57),
        i = n(78);r(r.S, "Promise", { try: function (e) {
        var t = o.f(this),
            n = i(e);return (n.e ? t.reject : t.resolve)(n.v), t.promise;
      } });
  }, function (e, o, i) {
    (function (e) {
      var t = undefined !== e && e || "undefined" != typeof self && self || window,
          n = Function.prototype.apply;function r(e, t) {
        this._id = e, this._clearFn = t;
      }o.setTimeout = function () {
        return new r(n.call(setTimeout, t, arguments), clearTimeout);
      }, o.setInterval = function () {
        return new r(n.call(setInterval, t, arguments), clearInterval);
      }, o.clearTimeout = o.clearInterval = function (e) {
        e && e.close();
      }, r.prototype.unref = r.prototype.ref = function () {}, r.prototype.close = function () {
        this._clearFn.call(t, this._id);
      }, o.enroll = function (e, t) {
        clearTimeout(e._idleTimeoutId), e._idleTimeout = t;
      }, o.unenroll = function (e) {
        clearTimeout(e._idleTimeoutId), e._idleTimeout = -1;
      }, o._unrefActive = o.active = function (e) {
        clearTimeout(e._idleTimeoutId);var t = e._idleTimeout;0 <= t && (e._idleTimeoutId = setTimeout(function () {
          e._onTimeout && e._onTimeout();
        }, t));
      }, i(126), o.setImmediate = "undefined" != typeof self && self.setImmediate || undefined !== e && e.setImmediate || this && this.setImmediate, o.clearImmediate = "undefined" != typeof self && self.clearImmediate || undefined !== e && e.clearImmediate || this && this.clearImmediate;
    }).call(this, i(8));
  }, function (e, t, n) {
    (function (e, d) {
      !function (n, r) {
        "use strict";
        if (!n.setImmediate) {
          var o,
              i,
              s = 1,
              a = {},
              u = false,
              c = n.document,
              e = Object.getPrototypeOf && Object.getPrototypeOf(n);e = e && e.setTimeout ? e : n, o = "[object process]" === {}.toString.call(n.process) ? function (e) {
            d.nextTick(function () {
              h(e);
            });
          } : function () {
            if (n.postMessage && !n.importScripts) {
              var e = true,
                  t = n.onmessage;return n.onmessage = function () {
                e = false;
              }, n.postMessage("", "*"), n.onmessage = t, e;
            }
          }() ? (l = "setImmediate$" + Math.random() + "$", n.addEventListener ? n.addEventListener("message", p, false) : n.attachEvent("onmessage", p), function (e) {
            n.postMessage(l + e, "*");
          }) : n.MessageChannel ? ((t = new MessageChannel()).port1.onmessage = function (e) {
            h(e.data);
          }, function (e) {
            t.port2.postMessage(e);
          }) : c && "onreadystatechange" in c.createElement("script") ? (i = c.documentElement, function (e) {
            var t = c.createElement("script");t.onreadystatechange = function () {
              h(e), t.onreadystatechange = null, i.removeChild(t), t = null;
            }, i.appendChild(t);
          }) : function (e) {
            setTimeout(h, 0, e);
          }, e.setImmediate = function (e) {
            "function" != typeof e && (e = new Function("" + e));for (var t = new Array(arguments.length - 1), n = 0; n < t.length; n++) t[n] = arguments[n + 1];var r = { callback: e, args: t };return a[s] = r, o(s), s++;
          }, e.clearImmediate = f;
        }var t, l;function p(e) {
          e.source === n && "string" == typeof e.data && 0 === e.data.indexOf(l) && h(+e.data.slice(l.length));
        }function f(e) {
          delete a[e];
        }function h(e) {
          if (u) setTimeout(h, 0, e);else {
            var t = a[e];if (t) {
              u = true;try {
                !function (e) {
                  var t = e.callback,
                      n = e.args;switch (n.length) {case 0:
                      t();break;case 1:
                      t(n[0]);break;case 2:
                      t(n[0], n[1]);break;case 3:
                      t(n[0], n[1], n[2]);break;default:
                      t.apply(r, n);}
                }(t);
              } finally {
                f(e), u = false;
              }
            }
          }
        }
      }("undefined" == typeof self ? undefined === e ? this : e : self);
    }).call(this, n(8), n(81));
  }, function (e, t, n) {
    e.exports = { default: n(128), __esModule: true };
  }, function (e, t, n) {
    n(27), n(32), e.exports = n(59).f("iterator");
  }, function (e, t, n) {
    e.exports = { default: n(130), __esModule: true };
  }, function (e, t, n) {
    n(131), n(45), n(134), n(135), e.exports = n(0).Symbol;
  }, function (e, t, n) {
    "use strict";
    function r(e) {
      var t = K[e] = C(U.prototype);return t._k = e, t;
    }function o(e, t) {
      T(e);for (var n, r = S(t = k(t)), o = 0, i = r.length; o < i;) Y(e, n = r[o++], t[n]);return e;
    }function i(e) {
      var t = $.call(this, e = R(e, true));return !(this === W && l(K, e) && !l(H, e)) && (!(t || !l(this, e) || !l(K, e) || l(this, q) && this[q][e]) || t);
    }function s(e, t) {
      if (e = k(e), t = R(t, true), e !== W || !l(K, t) || l(H, t)) {
        var n = M(e, t);return !n || !l(K, t) || l(e, q) && e[q][t] || (n.enumerable = true), n;
      }
    }function a(e) {
      for (var t, n = D(k(e)), r = [], o = 0; n.length > o;) l(K, t = n[o++]) || t == q || t == d || r.push(t);return r;
    }function u(e) {
      for (var t, n = e === W, r = D(n ? H : k(e)), o = [], i = 0; r.length > i;) !l(K, t = r[i++]) || n && !l(W, t) || o.push(K[t]);return o;
    }var c = n(3),
        l = n(18),
        p = n(10),
        f = n(2),
        h = n(69),
        d = n(40).KEY,
        v = n(15),
        m = n(54),
        y = n(31),
        _ = n(37),
        g = n(5),
        b = n(59),
        E = n(60),
        S = n(132),
        w = n(82),
        T = n(6),
        x = n(4),
        k = n(19),
        R = n(50),
        I = n(36),
        C = n(29),
        O = n(133),
        P = n(84),
        j = n(9),
        A = n(22),
        M = P.f,
        F = j.f,
        D = O.f,
        U = c.Symbol,
        L = c.JSON,
        N = L && L.stringify,
        q = g("_hidden"),
        B = g("toPrimitive"),
        $ = {}.propertyIsEnumerable,
        G = m("symbol-registry"),
        K = m("symbols"),
        H = m("op-symbols"),
        W = Object.prototype,
        V = "function" == typeof U,
        z = c.QObject,
        J = !z || !z.prototype || !z.prototype.findChild,
        Q = p && v(function () {
      return 7 != C(F({}, "a", { get: function () {
          return F(this, "a", { value: 7 }).a;
        } })).a;
    }) ? function (e, t, n) {
      var r = M(W, t);r && delete W[t], F(e, t, n), r && e !== W && F(W, t, r);
    } : F,
        X = V && "symbol" == typeof U.iterator ? function (e) {
      return "symbol" == typeof e;
    } : function (e) {
      return e instanceof U;
    },
        Y = function (e, t, n) {
      return e === W && Y(H, t, n), T(e), t = R(t, true), T(n), l(K, t) ? (n.enumerable ? (l(e, q) && e[q][t] && (e[q][t] = false), n = C(n, { enumerable: I(0, false) })) : (l(e, q) || F(e, q, I(1, {})), e[q][t] = true), Q(e, t, n)) : F(e, t, n);
    };V || (h((U = function () {
      if (this instanceof U) throw TypeError("Symbol is not a constructor!");var t = _(0 < arguments.length ? arguments[0] : undefined),
          n = function (e) {
        this === W && n.call(H, e), l(this, q) && l(this[q], t) && (this[q][t] = false), Q(this, t, I(1, e));
      };return p && J && Q(W, t, { configurable: true, set: n }), r(t);
    }).prototype, "toString", function () {
      return this._k;
    }), P.f = s, j.f = Y, n(83).f = O.f = a, n(34).f = i, n(61).f = u, p && !n(28) && h(W, "propertyIsEnumerable", i, true), b.f = function (e) {
      return r(g(e));
    }), f(f.G + f.W + f.F * !V, { Symbol: U });for (var Z = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), ee = 0; Z.length > ee;) g(Z[ee++]);for (var te = A(g.store), ne = 0; te.length > ne;) E(te[ne++]);f(f.S + f.F * !V, "Symbol", { for: function (e) {
        return l(G, e += "") ? G[e] : G[e] = U(e);
      }, keyFor: function (e) {
        if (!X(e)) throw TypeError(e + " is not a symbol!");for (var t in G) if (G[t] === e) return t;
      }, useSetter: function () {
        J = true;
      }, useSimple: function () {
        J = false;
      } }), f(f.S + f.F * !V, "Object", { create: function (e, t) {
        return undefined === t ? C(e) : o(C(e), t);
      }, defineProperty: Y, defineProperties: o, getOwnPropertyDescriptor: s, getOwnPropertyNames: a, getOwnPropertySymbols: u }), L && f(f.S + f.F * (!V || v(function () {
      var e = U();return "[null]" != N([e]) || "{}" != N({ a: e }) || "{}" != N(Object(e));
    })), "JSON", { stringify: function (e) {
        for (var t, n, r = [e], o = 1; o < arguments.length;) r.push(arguments[o++]);if (n = t = r[1], (x(t) || undefined !== e) && !X(e)) return w(t) || (t = function (e, t) {
          if ("function" == typeof n && (t = n.call(this, e, t)), !X(t)) return t;
        }), r[1] = t, N.apply(L, r);
      } }), U.prototype[B] || n(14)(U.prototype, B, U.prototype.valueOf), y(U, "Symbol"), y(Math, "Math", true), y(c.JSON, "JSON", true);
  }, function (e, t, n) {
    var a = n(22),
        u = n(61),
        c = n(34);e.exports = function (e) {
      var t = a(e),
          n = u.f;if (n) for (var r, o = n(e), i = c.f, s = 0; o.length > s;) i.call(e, r = o[s++]) && t.push(r);return t;
    };
  }, function (e, t, n) {
    var r = n(19),
        o = n(83).f,
        i = {}.toString,
        s = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];e.exports.f = function (e) {
      return s && "[object Window]" == i.call(e) ? function (e) {
        try {
          return o(e);
        } catch (e) {
          return s.slice();
        }
      }(e) : o(r(e));
    };
  }, function (e, t, n) {
    n(60)("asyncIterator");
  }, function (e, t, n) {
    n(60)("observable");
  }, function (e, t, n) {
    n(137);var r = n(0).Object;e.exports = function (e, t) {
      return r.create(e, t);
    };
  }, function (e, t, n) {
    var r = n(2);r(r.S, "Object", { create: n(29) });
  }, function (e, t, n) {
    var r = n(0),
        o = r.JSON || (r.JSON = { stringify: JSON.stringify });e.exports = function (e) {
      return o.stringify.apply(o, arguments);
    };
  }, function (e, t, n) {
    n(140), e.exports = n(0).Object.assign;
  }, function (e, t, n) {
    var r = n(2);r(r.S + r.F, "Object", { assign: n(141) });
  }, function (e, t, n) {
    "use strict";
    var f = n(22),
        h = n(61),
        d = n(34),
        v = n(38),
        m = n(51),
        o = Object.assign;e.exports = !o || n(15)(function () {
      var e = {},
          t = {},
          n = Symbol(),
          r = "abcdefghijklmnopqrst";return e[n] = 7, r.split("").forEach(function (e) {
        t[e] = e;
      }), 7 != o({}, e)[n] || Object.keys(o({}, t)).join("") != r;
    }) ? function (e, t) {
      for (var n = v(e), r = arguments.length, o = 1, i = h.f, s = d.f; o < r;) for (var a, u = m(arguments[o++]), c = i ? f(u).concat(i(u)) : f(u), l = c.length, p = 0; p < l;) s.call(u, a = c[p++]) && (n[a] = u[a]);return n;
    } : o;
  }, function (e, t, n) {
    n(32), n(27), e.exports = n(143);
  }, function (e, t, n) {
    var r = n(6),
        o = n(74);e.exports = n(0).getIterator = function (e) {
      var t = o(e);if ("function" != typeof t) throw TypeError(e + " is not iterable!");return r(t.call(e));
    };
  }, function (e, t, n) {
    e.exports = { default: n(145), __esModule: true };
  }, function (e, t, n) {
    n(32), n(27), e.exports = n(146);
  }, function (e, t, n) {
    var r = n(39),
        o = n(5)("iterator"),
        i = n(21);e.exports = n(0).isIterable = function (e) {
      var t = Object(e);return undefined !== t[o] || "@@iterator" in t || i.hasOwnProperty(r(t));
    };
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: true });var r,
        o,
        i,
        s,
        a,
        l = f(n(11)),
        v = f(n(25)),
        u = f(n(26)),
        m = f(n(63)),
        y = f(n(7)),
        c = f(n(88)),
        p = f(n(1));function f(e) {
      return e && e.__esModule ? e : { default: e };
    }function h(e, t, o) {
      var i = e.openCursor(t);return new y.default(function (n, t) {
        var r = [];i.onerror = function (e) {
          t(new Error("Query failed: " + e.target.errorCode));
        }, i.onsuccess = function (e) {
          var t = e.target.result;t ? (r.push(o(t)), t.continue()) : n(r);
        };
      });
    }function d(e) {
      return new y.default(function (t, n) {
        e.oncomplete = function (e) {
          t(e);
        }, e.onerror = function (e) {
          n(e.target.error);
        };
      });
    }function _(e) {
      return new y.default(function (t, n) {
        e.onsuccess = function (e) {
          t(e);
        }, e.onerror = function (e) {
          n(e.target.error);
        };
      });
    }function g(n) {
      return new y.default(function (e, t) {
        n.onsuccess = function () {
          return e(n);
        }, n.onerror = function (e) {
          return t(e);
        };
      });
    }function b(e) {
      return _(e).then(function (e) {
        return e.target.result;
      });
    }function E(e, t) {
      this.indexedDB = e, this._dbName = "matrix-js-sdk:" + (t || "default"), this.db = null, this._disconnected = true, this._syncAccumulator = new c.default(), this._isNewlyCreated = false;
    }E.prototype = { connect: function (t) {
        var o = this;if (!this._disconnected) return console.log("LocalIndexedDBStoreBackend.connect: already connected or connecting"), y.default.resolve();this._disconnected = false, console.log("LocalIndexedDBStoreBackend.connect: connecting...");var e = this.indexedDB.open(this._dbName, 4);return e.onupgradeneeded = function (e) {
          var t,
              n = e.target.result,
              r = e.oldVersion;console.log("LocalIndexedDBStoreBackend.connect: upgrading from " + r), r < 1 && (o._isNewlyCreated = true, (t = n).createObjectStore("users", { keyPath: ["userId"] }), t.createObjectStore("accountData", { keyPath: ["type"] }), t.createObjectStore("sync", { keyPath: ["clobber"] })), r < 2 && n.createObjectStore("oob_membership_events", { keyPath: ["room_id", "state_key"] }).createIndex("room", "room_id"), r < 3 && n.createObjectStore("client_options", { keyPath: ["clobber"] }), r < 4 && n.createObjectStore("profiles", { keyPath: ["userId"] });
        }, e.onblocked = function () {
          console.log("can't yet open LocalIndexedDBStoreBackend because it is open elsewhere");
        }, console.log("LocalIndexedDBStoreBackend.connect: awaiting connection..."), _(e).then(function (e) {
          return console.log("LocalIndexedDBStoreBackend.connect: connected"), o.db = e.target.result, o.db.onversionchange = function () {
            o.db.close();
          }, o._init(t);
        });
      }, isNewlyCreated: function () {
        return y.default.resolve(this._isNewlyCreated);
      }, _init: function (e) {
        var o = this;return e ? y.default.all([this._clearAccountData(), this._clearSyncData()]).then(function () {
          console.log("LocalIndexedDBStoreBackend: clear old data");
        }) : y.default.all([this._loadAccountData(), this._loadSyncData()]).then(function (e) {
          var t = (0, m.default)(e, 2),
              n = t[0],
              r = t[1];console.log("LocalIndexedDBStoreBackend: loaded initial data"), o._syncAccumulator.accumulate({ next_batch: r.nextBatch, rooms: r.roomsData, groups: r.groupsData, account_data: { events: n } });
        });
      }, getOutOfBandMembers: function (a) {
        var u = this;return new y.default(function (r, t) {
          var e = u.db.transaction(["oob_membership_events"], "readonly").objectStore("oob_membership_events").index("room"),
              n = IDBKeyRange.only(a),
              o = e.openCursor(n),
              i = [],
              s = false;o.onsuccess = function (e) {
            var t = e.target.result;if (!t) return i.length || s ? r(i) : r(null);var n = t.value;n.oob_written ? s = true : i.push(n), t.continue();
          }, o.onerror = function (e) {
            t(e);
          };
        }).then(function (e) {
          return console.log("LL: got " + (e && e.length) + " membershipEvents from storage for room " + a + " ..."), e;
        });
      }, setOutOfBandMembers: (a = (0, u.default)(v.default.mark(function e(t, n) {
        var r, o, i;return v.default.wrap(function (e) {
          for (;;) switch (e.prev = e.next) {case 0:
              return console.log("LL: backend about to store " + n.length + " members for " + t), r = this.db.transaction(["oob_membership_events"], "readwrite"), o = r.objectStore("oob_membership_events"), n.forEach(function (e) {
                o.put(e);
              }), i = { room_id: t, oob_written: true, state_key: 0 }, o.put(i), e.next = 8, d(r);case 8:
              console.log("LL: backend done storing for " + t + "!");case 9:case "end":
              return e.stop();}
        }, e, this);
      })), function (e, t) {
        return a.apply(this, arguments);
      }), clearOutOfBandMembers: (s = (0, u.default)(v.default.mark(function e(t) {
        var n, r, o, i, s, a, u, c, l, p, f, h, d;return v.default.wrap(function (e) {
          for (;;) switch (e.prev = e.next) {case 0:
              return n = this.db.transaction(["oob_membership_events"], "readonly"), r = n.objectStore("oob_membership_events"), o = r.index("room"), i = IDBKeyRange.only(t), s = b(o.openKeyCursor(i, "next")).then(function (e) {
                return e && e.primaryKey[1];
              }), a = b(o.openKeyCursor(i, "prev")).then(function (e) {
                return e && e.primaryKey[1];
              }), e.next = 8, y.default.all([s, a]);case 8:
              return u = e.sent, c = (0, m.default)(u, 2), l = c[0], p = c[1], f = this.db.transaction(["oob_membership_events"], "readwrite"), h = f.objectStore("oob_membership_events"), d = IDBKeyRange.bound([t, l], [t, p]), console.log("LL: Deleting all users + marker in storage for room " + t + ", with key range:", [t, l], [t, p]), e.next = 18, g(h.delete(d));case 18:case "end":
              return e.stop();}
        }, e, this);
      })), function (e) {
        return s.apply(this, arguments);
      }), clearDatabase: function () {
        var r = this;return new y.default(function (t, e) {
          console.log("Removing indexeddb instance: " + r._dbName);var n = r.indexedDB.deleteDatabase(r._dbName);n.onblocked = function () {
            console.log("can't yet delete indexeddb " + r._dbName + " because it is open elsewhere");
          }, n.onerror = function (e) {
            console.warn("unable to delete js-sdk store indexeddb: " + e.target.error), t();
          }, n.onsuccess = function () {
            console.log("Removed indexeddb instance: " + r._dbName), t();
          };
        });
      }, getSavedSync: function (e) {
        undefined === e && (e = true);var t = this._syncAccumulator.getJSON();return t.nextBatch ? e ? y.default.resolve(p.default.deepCopy(t)) : y.default.resolve(t) : y.default.resolve(null);
      }, getNextBatchToken: function () {
        return y.default.resolve(this._syncAccumulator.getNextBatchToken());
      }, setSyncData: function (e) {
        var t = this;return y.default.resolve().then(function () {
          t._syncAccumulator.accumulate(e);
        });
      }, syncToDatabase: function (e, t) {
        var n = this._syncAccumulator.getJSON();return y.default.all([this._persistUserPresenceEvents(e), this._persistUserProfiles(t), this._persistAccountData(n.accountData), this._persistSyncData(n.nextBatch, n.roomsData, n.groupsData)]);
      }, _persistSyncData: function (t, n, r) {
        var o = this;return console.log("Persisting sync data up to ", t), y.default.try(function () {
          var e = o.db.transaction(["sync"], "readwrite");return e.objectStore("sync").put({ clobber: "-", nextBatch: t, roomsData: n, groupsData: r }), d(e);
        });
      }, _persistAccountData: function (r) {
        var o = this;return y.default.try(function () {
          for (var e = o.db.transaction(["accountData"], "readwrite"), t = e.objectStore("accountData"), n = 0; n < r.length; n++) t.put(r[n]);return d(e);
        });
      }, _persistUserPresenceEvents: function (u) {
        var c = this;return y.default.try(function () {
          var e = c.db.transaction(["users"], "readwrite"),
              t = e.objectStore("users"),
              n = true,
              r = false,
              o = undefined;try {
            for (var i, s = (0, l.default)(u); !(n = (i = s.next()).done); n = true) {
              var a = i.value;t.put({ userId: a[0], event: a[1] });
            }
          } catch (e) {
            r = true, o = e;
          } finally {
            try {
              !n && s.return && s.return();
            } finally {
              if (r) throw o;
            }
          }return d(e);
        });
      }, getUserPresenceEvents: function () {
        var e = this;return y.default.try(function () {
          return h(e.db.transaction(["users"], "readonly").objectStore("users"), undefined, function (e) {
            return [e.value.userId, e.value.event];
          });
        });
      }, _loadAccountData: function () {
        var e = this;return console.log("LocalIndexedDBStoreBackend: loading account data..."), y.default.try(function () {
          return h(e.db.transaction(["accountData"], "readonly").objectStore("accountData"), undefined, function (e) {
            return e.value;
          }).then(function (e) {
            return console.log("LocalIndexedDBStoreBackend: loaded account data"), e;
          });
        });
      }, _clearAccountData: (i = (0, u.default)(v.default.mark(function e() {
        var t, n;return v.default.wrap(function (e) {
          for (;;) switch (e.prev = e.next) {case 0:
              return console.log("LocalIndexedDBStoreBackend: clearing account data..."), t = this.db.transaction(["accountData"], "readwrite"), n = t.objectStore("accountData"), e.next = 5, g(n.clear());case 5:case "end":
              return e.stop();}
        }, e, this);
      })), function () {
        return i.apply(this, arguments);
      }), _loadSyncData: function () {
        var e = this;return console.log("LocalIndexedDBStoreBackend: loading sync data..."), y.default.try(function () {
          return h(e.db.transaction(["sync"], "readonly").objectStore("sync"), undefined, function (e) {
            return e.value;
          }).then(function (e) {
            return console.log("LocalIndexedDBStoreBackend: loaded sync data"), 1 < e.length && console.warn("loadSyncData: More than 1 sync row found."), 0 < e.length ? e[0] : {};
          });
        });
      }, _clearSyncData: (o = (0, u.default)(v.default.mark(function e() {
        var t, n;return v.default.wrap(function (e) {
          for (;;) switch (e.prev = e.next) {case 0:
              return console.log("LocalIndexedDBStoreBackend: clearing sync data..."), t = this.db.transaction(["sync"], "readwrite"), n = t.objectStore("sync"), e.next = 5, g(n.clear());case 5:case "end":
              return e.stop();}
        }, e, this);
      })), function () {
        return o.apply(this, arguments);
      }), getClientOptions: function () {
        var e = this;return y.default.resolve().then(function () {
          return h(e.db.transaction(["client_options"], "readonly").objectStore("client_options"), undefined, function (e) {
            if (e.value && e.value && e.value.options) return e.value.options;
          }).then(function (e) {
            return e[0];
          });
        });
      }, storeClientOptions: (r = (0, u.default)(v.default.mark(function e(t) {
        var n;return v.default.wrap(function (e) {
          for (;;) switch (e.prev = e.next) {case 0:
              return (n = this.db.transaction(["client_options"], "readwrite")).objectStore("client_options").put({ clobber: "-", options: t }), e.next = 5, d(n);case 5:case "end":
              return e.stop();}
        }, e, this);
      })), function (e) {
        return r.apply(this, arguments);
      }), _persistUserProfiles: function (u) {
        var c = this;return y.default.try(function () {
          var e = c.db.transaction(["profiles"], "readwrite"),
              t = e.objectStore("profiles"),
              n = true,
              r = false,
              o = undefined;try {
            for (var i, s = (0, l.default)(u); !(n = (i = s.next()).done); n = true) {
              var a = i.value;t.put({ userId: a[0], data: a[1] });
            }
          } catch (e) {
            r = true, o = e;
          } finally {
            try {
              !n && s.return && s.return();
            } finally {
              if (r) throw o;
            }
          }return d(e);
        });
      }, getUserProfiles: function () {
        var e = this;return y.default.try(function () {
          return h(e.db.transaction(["profiles"], "readonly").objectStore("profiles"), undefined, function (e) {
            return [e.value.userId, e.value.data];
          });
        });
      } }, t.default = E;
  }, function (e, t, n) {
    n(149), e.exports = n(0).Object.keys;
  }, function (e, t, n) {
    var r = n(38),
        o = n(22);n(89)("keys", function () {
      return function (e) {
        return o(r(e));
      };
    });
  }, function (e, t, n) {
    e.exports = { default: n(151), __esModule: true };
  }, function (e, t, n) {
    n(152);var r = n(0).Object;e.exports = function (e, t, n) {
      return r.defineProperty(e, t, n);
    };
  }, function (e, t, n) {
    var r = n(2);r(r.S + r.F * !n(10), "Object", { defineProperty: n(9).f });
  }, function (e, t, n) {
    "use strict";
    function r(e, t, n) {
      this._workerScript = e, this._dbName = t, this._workerApi = n, this._worker = null, this._nextSeq = 0, this._inFlight = {}, this._startPromise = null;
    }Object.defineProperty(t, "__esModule", { value: true });var o,
        i = (o = n(7)) && o.__esModule ? o : { default: o };r.prototype = { connect: function () {
        var e = this;return this._ensureStarted().then(function () {
          return e._doCmd("connect");
        });
      }, clearDatabase: function () {
        var e = this;return this._ensureStarted().then(function () {
          return e._doCmd("clearDatabase");
        });
      }, isNewlyCreated: function () {
        return this._doCmd("isNewlyCreated");
      }, getSavedSync: function () {
        return this._doCmd("getSavedSync");
      }, getNextBatchToken: function () {
        return this._doCmd("getNextBatchToken");
      }, setSyncData: function (e) {
        return this._doCmd("setSyncData", [e]);
      }, syncToDatabase: function (e) {
        return this._doCmd("syncToDatabase", [e]);
      }, getOutOfBandMembers: function (e) {
        return this._doCmd("getOutOfBandMembers", [e]);
      }, setOutOfBandMembers: function (e, t) {
        return this._doCmd("setOutOfBandMembers", [e, t]);
      }, clearOutOfBandMembers: function (e) {
        return this._doCmd("clearOutOfBandMembers", [e]);
      }, getClientOptions: function () {
        return this._doCmd("getClientOptions");
      }, storeClientOptions: function (e) {
        return this._doCmd("storeClientOptions", [e]);
      }, getUserPresenceEvents: function () {
        return this._doCmd("getUserPresenceEvents");
      }, _ensureStarted: function () {
        return null === this._startPromise && (this._worker = new this._workerApi(this._workerScript), this._worker.onmessage = this._onWorkerMessage.bind(this), this._startPromise = this._doCmd("_setupWorker", [this._dbName]).then(function () {
          console.log("IndexedDB worker is ready");
        })), this._startPromise;
      }, _doCmd: function (n, r) {
        var o = this;return i.default.resolve().then(function () {
          var e = o._nextSeq++,
              t = i.default.defer();return o._inFlight[e] = t, o._worker.postMessage({ command: n, seq: e, args: r }), t.promise;
        });
      }, _onWorkerMessage: function (e) {
        var t = e.data;if ("cmd_success" == t.command || "cmd_fail" == t.command) {
          if (undefined === t.seq) return undefined;var n = this._inFlight[t.seq];if (undefined === n) return undefined;if (delete this._inFlight[t.seq], "cmd_success" == t.command) n.resolve(t.result);else {
            var r = new Error(t.error.message);r.name = t.error.name, n.reject(r);
          }
        } else console.warn("Unrecognised message from worker: " + t);
      } }, t.default = r;
  }, function (e, t, n) {
    "use strict";
    var u = /; *([!#$%&'*+.^_`|~0-9A-Za-z-]+) *= *("(?:[\u000b\u0020\u0021\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u000b\u0020-\u00ff])*"|[!#$%&'*+.^_`|~0-9A-Za-z-]+) */g,
        r = /^[\u000b\u0020-\u007e\u0080-\u00ff]+$/,
        a = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+$/,
        c = /\\([\u000b\u0020-\u00ff])/g,
        o = /([\\"])/g,
        l = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+\/[!#$%&'*+.^_`|~0-9A-Za-z-]+$/;function p(e) {
      var t = String(e);if (a.test(t)) return t;if (0 < t.length && !r.test(t)) throw new TypeError("invalid parameter value");return '"' + t.replace(o, "\\$1") + '"';
    }function f(e) {
      this.parameters = Object.create(null), this.type = e;
    }t.format = function (e) {
      if (!e || "object" != typeof e) throw new TypeError("argument obj is required");var t = e.parameters,
          n = e.type;if (!n || !l.test(n)) throw new TypeError("invalid type");var r = n;if (t && "object" == typeof t) for (var o, i = Object.keys(t).sort(), s = 0; s < i.length; s++) {
        if (o = i[s], !a.test(o)) throw new TypeError("invalid parameter name");r += "; " + o + "=" + p(t[o]);
      }return r;
    }, t.parse = function (e) {
      if (!e) throw new TypeError("argument string is required");var t = "object" == typeof e ? function (e) {
        var t;if ("function" == typeof e.getHeader ? t = e.getHeader("content-type") : "object" == typeof e.headers && (t = e.headers && e.headers["content-type"]), "string" != typeof t) throw new TypeError("content-type header is missing from object");return t;
      }(e) : e;if ("string" != typeof t) throw new TypeError("argument string is required to be a string");var n = t.indexOf(";"),
          r = -1 !== n ? t.substr(0, n).trim() : t.trim();if (!l.test(r)) throw new TypeError("invalid media type");var o = new f(r.toLowerCase());if (-1 !== n) {
        var i, s, a;for (u.lastIndex = n; s = u.exec(t);) {
          if (s.index !== n) throw new TypeError("invalid parameter format");n += s[0].length, i = s[1].toLowerCase(), '"' === (a = s[2])[0] && (a = a.substr(1, a.length - 2).replace(c, "$1")), o.parameters[i] = a;
        }if (n !== t.length) throw new TypeError("invalid parameter format");
      }return o;
    };
  }, function (e, t, n) {
    "use strict";
    (function (i) {
      var r = 1e3,
          a = 0,
          o = undefined,
          u = [],
          c = function () {};e.exports.setNow = function (e) {
        l = e || Date.now;
      };var l = Date.now;function p() {
        o && clearTimeout(o);var e = u[0];if (e) {
          var t = l(),
              n = Math.min(e.runAt - t, r);c("_scheduleRealCallback: now:", t, "delay:", n), o = setTimeout(s, n);
        } else c("_scheduleRealCallback: no more callbacks, not rescheduling");
      }function s() {
        var e = undefined,
            t = l();c("_runCallbacks: now:", t);for (var n = [];;) {
          var r = u[0];if (!r || r.runAt > t) break;e = u.shift(), c("_runCallbacks: popping", e.key), n.push(e);
        }p();for (var o = 0; o < n.length; o++) {
          e = n[o];try {
            e.func.apply(i, e.params);
          } catch (e) {
            console.error("Uncaught exception in callback function", e.stack || e);
          }
        }
      }e.exports.setTimeout = function (e, t) {
        (t = t || 0) < 0 && (t = 0);var n = Array.prototype.slice.call(arguments, 2),
            o = l() + t,
            r = a++;c("setTimeout: scheduling cb", r, "at", o, "(delay", t, ")");var i = { runAt: o, func: e, params: n, key: r },
            s = function (e) {
          for (var t = 0, n = e.length; t < n;) {
            var r = t + n >> 1;0 < e[r].runAt - o ? n = r : t = 1 + r;
          }return t;
        }(u);return u.splice(s, 0, i), p(), r;
      }, e.exports.clearTimeout = function (e) {
        if (0 !== u.length) {
          var t = undefined;for (t = 0; t < u.length; t++) if (u[t].key == e) {
            u.splice(t, 1);break;
          }0 === t && p();
        }
      };
    }).call(this, n(8));
  }, function (e, t, n) {
    e.exports = { default: n(157), __esModule: true };
  }, function (e, t, n) {
    n(158), e.exports = n(0).Reflect.getPrototypeOf;
  }, function (e, t, n) {
    var r = n(2),
        o = n(72),
        i = n(6);r(r.S, "Reflect", { getPrototypeOf: function (e) {
        return o(i(e));
      } });
  }, function (e, t, n) {
    e.exports = { default: n(160), __esModule: true };
  }, function (e, t, n) {
    n(161), e.exports = n(0).Reflect.setPrototypeOf;
  }, function (e, t, n) {
    var r = n(2),
        o = n(162);o && r(r.S, "Reflect", { setPrototypeOf: function (e, t) {
        o.check(e, t);try {
          return o.set(e, t), true;
        } catch (e) {
          return false;
        }
      } });
  }, function (e, t, o) {
    function i(e, t) {
      if (r(e), !n(t) && null !== t) throw TypeError(t + ": can't set as prototype!");
    }var n = o(4),
        r = o(6);e.exports = { set: Object.setPrototypeOf || ("__proto__" in {} ? function (e, n, r) {
        try {
          (r = o(13)(Function.call, o(84).f(Object.prototype, "__proto__").set, 2))(e, []), n = !(e instanceof Array);
        } catch (e) {
          n = true;
        }return function (e, t) {
          return i(e, t), n ? e.__proto__ = t : r(e, t), e;
        };
      }({}, false) : undefined), check: i };
  }, function (e, t, n) {
    e.exports = { default: n(164), __esModule: true };
  }, function (e, t, n) {
    n(165), e.exports = n(0).Reflect.construct;
  }, function (e, t, n) {
    var r = n(2),
        a = n(29),
        u = n(17),
        c = n(6),
        l = n(4),
        o = n(15),
        p = n(166),
        f = (n(3).Reflect || {}).construct,
        h = o(function () {
      function e() {}return !(f(function () {}, [], e) instanceof e);
    }),
        d = !o(function () {
      f(function () {});
    });r(r.S + r.F * (h || d), "Reflect", { construct: function (e, t) {
        u(e), c(t);var n = arguments.length < 3 ? e : u(arguments[2]);if (d && !h) return f(e, t, n);if (e == n) {
          switch (t.length) {case 0:
              return new e();case 1:
              return new e(t[0]);case 2:
              return new e(t[0], t[1]);case 3:
              return new e(t[0], t[1], t[2]);case 4:
              return new e(t[0], t[1], t[2], t[3]);}var r = [null];return r.push.apply(r, t), new (p.apply(e, r))();
        }var o = n.prototype,
            i = a(l(o) ? o : Object.prototype),
            s = Function.apply.call(e, i, t);return l(s) ? s : i;
      } });
  }, function (e, t, n) {
    "use strict";
    var i = n(17),
        s = n(4),
        a = n(77),
        u = [].slice,
        c = {};e.exports = Function.bind || function (t) {
      var n = i(this),
          r = u.call(arguments, 1),
          o = function () {
        var e = r.concat(u.call(arguments));return this instanceof o ? function (e, t, n) {
          if (!(t in c)) {
            for (var r = [], o = 0; o < t; o++) r[o] = "a[" + o + "]";c[t] = Function("F,a", "return new F(" + r.join(",") + ")");
          }return c[t](e, n);
        }(n, e.length, e) : a(n, e, t);
      };return s(n.prototype) && (o.prototype = n.prototype), o;
    };
  }, function (e, t, n) {
    e.exports = { default: n(168), __esModule: true };
  }, function (e, t, n) {
    n(45), n(27), n(32), n(169), n(175), n(178), n(180), e.exports = n(0).Set;
  }, function (e, t, n) {
    "use strict";
    var r = n(170),
        o = n(94);e.exports = n(171)("Set", function (e) {
      return function () {
        return e(this, 0 < arguments.length ? arguments[0] : undefined);
      };
    }, { add: function (e) {
        return r.def(o(this, "Set"), e = 0 === e ? 0 : e, e);
      } }, r);
  }, function (e, t, n) {
    "use strict";
    function s(e, t) {
      var n,
          r = d(t);if ("F" !== r) return e._i[r];for (n = e._f; n; n = n.n) if (n.k == t) return n;
    }var a = n(9).f,
        u = n(29),
        c = n(58),
        l = n(13),
        p = n(56),
        f = n(33),
        r = n(48),
        o = n(73),
        i = n(80),
        h = n(10),
        d = n(40).fastKey,
        v = n(94),
        m = h ? "_s" : "size";e.exports = { getConstructor: function (e, i, n, r) {
        var o = e(function (e, t) {
          p(e, o, i, "_i"), e._t = i, e._i = u(null), e._f = undefined, e._l = undefined, e[m] = 0, null != t && f(t, n, e[r], e);
        });return c(o.prototype, { clear: function () {
            for (var e = v(this, i), t = e._i, n = e._f; n; n = n.n) n.r = true, n.p && (n.p = n.p.n = undefined), delete t[n.i];e._f = e._l = undefined, e[m] = 0;
          }, delete: function (e) {
            var t = v(this, i),
                n = s(t, e);if (n) {
              var r = n.n,
                  o = n.p;delete t._i[n.i], n.r = true, o && (o.n = r), r && (r.p = o), t._f == n && (t._f = r), t._l == n && (t._l = o), t[m]--;
            }return !!n;
          }, forEach: function (e) {
            v(this, i);for (var t, n = l(e, 1 < arguments.length ? arguments[1] : undefined, 3); t = t ? t.n : this._f;) for (n(t.v, t.k, this); t && t.r;) t = t.p;
          }, has: function (e) {
            return !!s(v(this, i), e);
          } }), h && a(o.prototype, "size", { get: function () {
            return v(this, i)[m];
          } }), o;
      }, def: function (e, t, n) {
        var r,
            o,
            i = s(e, t);return i ? i.v = n : (e._l = i = { i: o = d(t, true), k: t, v: n, p: r = e._l, n: undefined, r: false }, e._f || (e._f = i), r && (r.n = i), e[m]++, "F" !== o && (e._i[o] = i)), e;
      }, getEntry: s, setStrong: function (e, n, t) {
        r(e, n, function (e, t) {
          this._t = v(e, n), this._k = t, this._l = undefined;
        }, function () {
          for (var e = this._k, t = this._l; t && t.r;) t = t.p;return this._t && (this._l = t = t ? t.n : this._t._f) ? o(0, "keys" == e ? t.k : "values" == e ? t.v : [t.k, t.v]) : (this._t = undefined, o(1));
        }, t ? "entries" : "values", !t, true), i(n);
      } };
  }, function (e, t, n) {
    "use strict";
    var p = n(3),
        f = n(2),
        h = n(40),
        d = n(15),
        v = n(14),
        m = n(58),
        y = n(33),
        _ = n(56),
        g = n(4),
        b = n(31),
        E = n(9).f,
        S = n(172)(0),
        w = n(10);e.exports = function (n, e, t, r, o, i) {
      var s = p[n],
          a = s,
          u = o ? "set" : "add",
          c = a && a.prototype,
          l = {};return w && "function" == typeof a && (i || c.forEach && !d(function () {
        new a().entries().next();
      })) ? (a = e(function (e, t) {
        _(e, a, n, "_c"), e._c = new s(), null != t && y(t, o, e[u], e);
      }), S("add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON".split(","), function (r) {
        var o = "add" == r || "set" == r;r in c && (!i || "clear" != r) && v(a.prototype, r, function (e, t) {
          if (_(this, a, r), !o && i && !g(e)) return undefined;var n = this._c[r](0 === e ? 0 : e, t);return o ? this : n;
        });
      }), i || E(a.prototype, "size", { get: function () {
          return this._c.size;
        } })) : (a = r.getConstructor(e, n, o, u), m(a.prototype, t), h.NEED = true), b(a, n), l[n] = a, f(f.G + f.W + f.F, l), i || r.setStrong(a, n, o), a;
    };
  }, function (e, t, n) {
    var g = n(13),
        b = n(51),
        E = n(38),
        S = n(52),
        r = n(173);e.exports = function (p, e) {
      var f = 1 == p,
          h = 2 == p,
          d = 3 == p,
          v = 4 == p,
          m = 6 == p,
          y = 5 == p || m,
          _ = e || r;return function (e, t, n) {
        for (var r, o, i = E(e), s = b(i), a = g(t, n, 3), u = S(s.length), c = 0, l = f ? _(e, u) : h ? _(e, 0) : undefined; c < u; c++) if ((y || c in s) && (o = a(r = s[c], c, i), p)) if (f) l[c] = o;else if (o) switch (p) {case 3:
            return true;case 5:
            return r;case 6:
            return c;case 2:
            l.push(r);} else if (v) return false;return m ? -1 : d || v ? v : l;
      };
    };
  }, function (e, t, n) {
    var r = n(174);e.exports = function (e, t) {
      return new (r(e))(t);
    };
  }, function (e, t, n) {
    var r = n(4),
        o = n(82),
        i = n(5)("species");e.exports = function (e) {
      var t;return o(e) && ("function" != typeof (t = e.constructor) || t !== Array && !o(t.prototype) || (t = undefined), r(t) && null === (t = t[i]) && (t = undefined)), undefined === t ? Array : t;
    };
  }, function (e, t, n) {
    var r = n(2);r(r.P + r.R, "Set", { toJSON: n(176)("Set") });
  }, function (e, t, n) {
    var r = n(39),
        o = n(177);e.exports = function (e) {
      return function () {
        if (r(this) != e) throw TypeError(e + "#toJSON isn't generic");return o(this);
      };
    };
  }, function (e, t, n) {
    var r = n(33);e.exports = function (e, t) {
      var n = [];return r(e, false, n.push, n, t), n;
    };
  }, function (e, t, n) {
    n(179)("Set");
  }, function (e, t, n) {
    "use strict";
    var r = n(2);e.exports = function (e) {
      r(r.S, e, { of: function () {
          for (var e = arguments.length, t = new Array(e); e--;) t[e] = arguments[e];return new this(t);
        } });
    };
  }, function (e, t, n) {
    n(181)("Set");
  }, function (e, t, n) {
    "use strict";
    var r = n(2),
        s = n(17),
        a = n(13),
        u = n(33);e.exports = function (e) {
      r(r.S, e, { from: function (e) {
          var t,
              n,
              r,
              o,
              i = arguments[1];return s(this), (t = undefined !== i) && s(i), null == e ? new this() : (n = [], t ? (r = 0, o = a(i, arguments[2], 2), u(e, false, function (e) {
            n.push(o(e, r++));
          })) : u(e, false, n.push, n), new this(n));
        } });
    };
  }, function (e, t, n) {
    e.exports = { default: n(183), __esModule: true };
  }, function (e, t, n) {
    n(184), e.exports = n(0).Object.entries;
  }, function (e, t, n) {
    var r = n(2),
        o = n(95)(true);r(r.S, "Object", { entries: function (e) {
        return o(e);
      } });
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: true }), t.randomString = function (e) {
      for (var t = "", n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", r = 0; r < e; ++r) t += n.charAt(Math.floor(Math.random() * n.length));return t;
    };
  }, function (e, t, n) {
    "use strict";
    var o = r(n(23)),
        y = r(n(11)),
        _ = r(n(20));function r(e) {
      return e && e.__esModule ? e : { default: e };
    }var g = ["override", "content", "room", "sender", "underride"];function b(m) {
      function s(e) {
        return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }function a(e, t, n) {
        for (var r = 0; r < g.length; ++r) for (var o = g[r], i = t[o], s = 0; s < i.length; ++s) {
          var a = i[s];if (a.enabled) {
            var u = d(o, a, n);if (u && h.ruleMatchesEvent(u, e)) return a.kind = o, a;
          }
        }return null;
      }function u(e, t) {
        var n = e.key;if (!n) return false;var r = m.getRoom(t.getRoomId());return !(!r || !r.currentState) && r.currentState.mayTriggerNotifOfType(n, t.getSender());
      }function c(e, t) {
        if (!e.is) return false;var n = m.getRoom(t.getRoomId());if (!n || !n.currentState || !n.currentState.members) return false;var r = n.currentState.getJoinedMemberCount(),
            o = e.is.match(/^([=<>]*)([0-9]*)$/);if (!o) return false;var i = o[1],
            s = parseInt(o[2]);if (isNaN(s)) return false;switch (i) {case "":case "==":
            return r == s;case "<":
            return r < s;case ">":
            return s < r;case "<=":
            return r <= s;case ">=":
            return s <= r;default:
            return false;}
      }function l(e, t) {
        var n = t.getContent();if (!n || !n.body || "string" != typeof n.body) return false;var r = m.getRoom(t.getRoomId());if (!(r && r.currentState && r.currentState.members && r.currentState.getMember(m.credentials.userId))) return false;var o = r.currentState.getMember(m.credentials.userId).name,
            i = new RegExp("(^|\\W)" + s(o) + "(\\W|$)", "i");return -1 < n.body.search(i);
      }function p(e, t) {
        return false;
      }function f(e, t) {
        if (!e.key) return false;var n,
            r = v(e.key, t);return !(!r || "string" != typeof r) && (e.value ? e.value === r : (n = "content.body" == e.key ? o("(^|\\W)", e.pattern, "(\\W|$)") : o("^", e.pattern, "$"), !!r.match(n)));
      }var h = this,
          r = {},
          d = function (e, t, n) {
        var r = { rule_id: t.rule_id, actions: t.actions, conditions: [] };switch (e) {case "underride":case "override":
            r.conditions = t.conditions;break;case "room":
            if (!t.rule_id) return null;r.conditions.push({ kind: "event_match", key: "room_id", value: t.rule_id });break;case "sender":
            if (!t.rule_id) return null;r.conditions.push({ kind: "event_match", key: "user_id", value: t.rule_id });break;case "content":
            if (!t.pattern) return null;r.conditions.push({ kind: "event_match", key: "content.body", pattern: t.pattern });}return n && r.conditions.push({ kind: "device", profile_tag: n }), r;
      },
          o = function (e, t, n) {
        return r[t] || (r[t] = new RegExp(e + i(t) + n, "i")), r[t];
      },
          i = function (e) {
        var t = s(e);return (t = (t = t.replace(/\\\*/g, ".*")).replace(/\?/g, ".")).replace(/\\\[(!|)(.*)\\]/g, function (e, t, n, r, o) {
          return "[" + (t ? "^" : "") + n.replace(/\\\-/, "-") + "]";
        });
      },
          v = function (e, t) {
        var n = e.split("."),
            r = undefined,
            o = n[0];for ("content" == o ? (r = t.getContent(), n.shift()) : "type" == o ? (r = t.getType(), n.shift()) : r = t.event; 0 < n.length;) {
          var i = n.shift();if (!r[i]) return null;r = r[i];
        }return r;
      };this.ruleMatchesEvent = function (e, t) {
        for (var n = true, r = 0; r < e.conditions.length; ++r) {
          var o = e.conditions[r];n &= (s = t, a = undefined, !!(a = { event_match: f, device: p, contains_display_name: l, room_member_count: c, sender_notification_permission: u })[(i = o).kind] && a[i.kind](i, s));
        }var i, s, a;return n;
      }, this.actionsForEvent = function (n) {
        return function () {
          var e = function (e, t) {
            if (!t || !t.device) return null;if (e.getSender() == m.credentials.userId) return null;for (var n = (0, _.default)(t.device), r = 0; r < n.length; ++r) {
              var o = n[r],
                  i = a(t.device[o], o);if (i) return i;
            }return a(e, t.global);
          }(n, m.pushRules);if (!e) return {};var t = b.actionListToActionsObject(e.actions);return undefined === t.tweaks.highlight && (t.tweaks.highlight = "content" == e.kind), t;
        }();
      }, this.getPushRuleById = function (e) {
        for (var t = ["device", "global"], n = 0; n < t.length; n++) {
          var r = t[n];if (undefined !== m.pushRules[r]) {
            var o = true,
                i = false,
                s = undefined;try {
              for (var a, u = (0, y.default)(g); !(o = (a = u.next()).done); o = true) {
                var c = a.value;if (undefined !== m.pushRules[r][c]) {
                  var l = true,
                      p = false,
                      f = undefined;try {
                    for (var h, d = (0, y.default)(m.pushRules[r][c]); !(l = (h = d.next()).done); l = true) {
                      var v = h.value;if (v.rule_id === e) return v;
                    }
                  } catch (e) {
                    p = true, f = e;
                  } finally {
                    try {
                      !l && d.return && d.return();
                    } finally {
                      if (p) throw f;
                    }
                  }
                }
              }
            } catch (e) {
              i = true, s = e;
            } finally {
              try {
                !o && u.return && u.return();
              } finally {
                if (i) throw s;
              }
            }
          }
        }return null;
      };
    }b.actionListToActionsObject = function (e) {
      for (var t = { notify: false, tweaks: {} }, n = 0; n < e.length; ++n) {
        var r = e[n];"notify" === r ? t.notify = true : "object" === (undefined === r ? "undefined" : (0, o.default)(r)) && (undefined === r.value && (r.value = true), t.tweaks[r.set_tweak] = r.value);
      }return t;
    }, e.exports = b;
  }, function (e, m, R) {
    (function (h, d) {
      var v;!function () {
        m && m.nodeType, h && h.nodeType;var e = "object" == typeof d && d;e.global !== e && e.window !== e && e.self;var t,
            y = 2147483647,
            _ = 36,
            g = 26,
            o = 38,
            i = 700,
            n = /^xn--/,
            r = /[^\x20-\x7E]/,
            s = /[\x2E\u3002\uFF0E\uFF61]/g,
            a = { overflow: "Overflow: input needs wider integers to process", "not-basic": "Illegal input >= 0x80 (not a basic code point)", "invalid-input": "Invalid input" },
            u = 35,
            b = Math.floor,
            E = String.fromCharCode;function S(e) {
          throw new RangeError(a[e]);
        }function c(e, t) {
          for (var n = e.length, r = []; n--;) r[n] = t(e[n]);return r;
        }function l(e, t) {
          var n = e.split("@"),
              r = "";return 1 < n.length && (r = n[0] + "@", e = n[1]), r + c((e = e.replace(s, ".")).split("."), t).join(".");
        }function w(e) {
          for (var t, n, r = [], o = 0, i = e.length; o < i;) 55296 <= (t = e.charCodeAt(o++)) && t <= 56319 && o < i ? 56320 == (64512 & (n = e.charCodeAt(o++))) ? r.push(((1023 & t) << 10) + (1023 & n) + 65536) : (r.push(t), o--) : r.push(t);return r;
        }function T(e) {
          return c(e, function (e) {
            var t = "";return 65535 < e && (t += E((e -= 65536) >>> 10 & 1023 | 55296), e = 56320 | 1023 & e), t + E(e);
          }).join("");
        }function x(e, t) {
          return e + 22 + 75 * (e < 26) - ((0 != t) << 5);
        }function k(e, t, n) {
          var r = 0;for (e = n ? b(e / i) : e >> 1, e += b(e / t); 455 < e; r += _) e = b(e / u);return b(r + 36 * e / (e + o));
        }function p(e) {
          var t,
              n,
              r,
              o,
              i,
              s,
              a,
              u,
              c,
              l,
              p,
              f = [],
              h = e.length,
              d = 0,
              v = 128,
              m = 72;for ((n = e.lastIndexOf("-")) < 0 && (n = 0), r = 0; r < n; ++r) 128 <= e.charCodeAt(r) && S("not-basic"), f.push(e.charCodeAt(r));for (o = 0 < n ? n + 1 : 0; o < h;) {
            for (i = d, s = 1, a = _; h <= o && S("invalid-input"), ((u = (p = e.charCodeAt(o++)) - 48 < 10 ? p - 22 : p - 65 < 26 ? p - 65 : p - 97 < 26 ? p - 97 : _) >= _ || u > b((y - d) / s)) && S("overflow"), d += u * s, !(u < (c = a <= m ? 1 : m + g <= a ? g : a - m)); a += _) s > b(y / (l = _ - c)) && S("overflow"), s *= l;m = k(d - i, t = f.length + 1, 0 == i), b(d / t) > y - v && S("overflow"), v += b(d / t), d %= t, f.splice(d++, 0, v);
          }return T(f);
        }function f(e) {
          var t,
              n,
              r,
              o,
              i,
              s,
              a,
              u,
              c,
              l,
              p,
              f,
              h,
              d,
              v,
              m = [];for (f = (e = w(e)).length, t = 128, i = 72, s = n = 0; s < f; ++s) (p = e[s]) < 128 && m.push(E(p));for (r = o = m.length, o && m.push("-"); r < f;) {
            for (a = y, s = 0; s < f; ++s) (p = e[s]) >= t && p < a && (a = p);for (a - t > b((y - n) / (h = r + 1)) && S("overflow"), n += (a - t) * h, t = a, s = 0; s < f; ++s) if ((p = e[s]) < t && ++n > y && S("overflow"), p == t) {
              for (u = n, c = _; !(u < (l = c <= i ? 1 : i + g <= c ? g : c - i)); c += _) v = u - l, d = _ - l, m.push(E(x(l + v % d, 0))), u = b(v / d);m.push(E(x(u, 0))), i = k(n, h, r == o), n = 0, ++r;
            }++n, ++t;
          }return m.join("");
        }t = { version: "1.4.1", ucs2: { decode: w, encode: T }, decode: p, encode: f, toASCII: function (e) {
            return l(e, function (e) {
              return r.test(e) ? "xn--" + f(e) : e;
            });
          }, toUnicode: function (e) {
            return l(e, function (e) {
              return n.test(e) ? p(e.slice(4).toLowerCase()) : e;
            });
          } }, undefined !== (v = function () {
          return t;
        }.call(m, R, m, h)) && (h.exports = v);
      }();
    }).call(this, R(188)(e), R(8));
  }, function (e, t) {
    e.exports = function (e) {
      return e.webpackPolyfill || (e.deprecate = function () {}, e.paths = [], e.children || (e.children = []), Object.defineProperty(e, "loaded", { enumerable: true, get: function () {
          return e.l;
        } }), Object.defineProperty(e, "id", { enumerable: true, get: function () {
          return e.i;
        } }), e.webpackPolyfill = 1), e;
    };
  }, function (e, t, n) {
    "use strict";
    e.exports = { isString: function (e) {
        return "string" == typeof e;
      }, isObject: function (e) {
        return "object" == typeof e && null !== e;
      }, isNull: function (e) {
        return null === e;
      }, isNullOrUndefined: function (e) {
        return null == e;
      } };
  }, function (e, t, n) {
    "use strict";
    t.decode = t.parse = n(191), t.encode = t.stringify = n(192);
  }, function (e, t, n) {
    "use strict";
    e.exports = function (e, t, n, r) {
      t = t || "&", n = n || "=";var o = {};if ("string" != typeof e || 0 === e.length) return o;var i = /\+/g;e = e.split(t);var s = 1e3;r && "number" == typeof r.maxKeys && (s = r.maxKeys);var a,
          u,
          c = e.length;0 < s && s < c && (c = s);for (var l = 0; l < c; ++l) {
        var p,
            f,
            h,
            d,
            v = e[l].replace(i, "%20"),
            m = v.indexOf(n);f = 0 <= m ? (p = v.substr(0, m), v.substr(m + 1)) : (p = v, ""), h = decodeURIComponent(p), d = decodeURIComponent(f), a = o, u = h, Object.prototype.hasOwnProperty.call(a, u) ? y(o[h]) ? o[h].push(d) : o[h] = [o[h], d] : o[h] = d;
      }return o;
    };var y = Array.isArray || function (e) {
      return "[object Array]" === Object.prototype.toString.call(e);
    };
  }, function (e, t, n) {
    "use strict";
    function i(e) {
      switch (typeof e) {case "string":
          return e;case "boolean":
          return e ? "true" : "false";case "number":
          return isFinite(e) ? e : "";default:
          return "";}
    }e.exports = function (n, r, o, e) {
      return r = r || "&", o = o || "=", null === n && (n = undefined), "object" == typeof n ? a(u(n), function (e) {
        var t = encodeURIComponent(i(e)) + o;return s(n[e]) ? a(n[e], function (e) {
          return t + encodeURIComponent(i(e));
        }).join(r) : t + encodeURIComponent(i(n[e]));
      }).join(r) : e ? encodeURIComponent(i(e)) + o + encodeURIComponent(i(n)) : "";
    };var s = Array.isArray || function (e) {
      return "[object Array]" === Object.prototype.toString.call(e);
    };function a(e, t) {
      if (e.map) return e.map(t);for (var n = [], r = 0; r < e.length; r++) n.push(t(e[r], r));return n;
    }var u = Object.keys || function (e) {
      var t = [];for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.push(n);return t;
    };
  }, function (e, t, n) {
    e.exports = { default: n(194), __esModule: true };
  }, function (e, t, n) {
    n(195), e.exports = n(0).Object.freeze;
  }, function (e, t, n) {
    var r = n(4),
        o = n(40).onFreeze;n(89)("freeze", function (t) {
      return function (e) {
        return t && r(e) ? t(o(e)) : e;
      };
    });
  }, function (e, t, n) {
    e.exports = { default: n(197), __esModule: true };
  }, function (e, t, n) {
    n(198), e.exports = n(0).Number.isFinite;
  }, function (e, t, n) {
    var r = n(2),
        o = n(3).isFinite;r(r.S, "Number", { isFinite: function (e) {
        return "number" == typeof e && o(e);
      } });
  }, function (e, t, n) {
    e.exports = { default: n(200), __esModule: true };
  }, function (e, t, n) {
    n(201), e.exports = n(0).Object.values;
  }, function (e, t, n) {
    var r = n(2),
        o = n(95)(false);r(r.S, "Object", { values: function (e) {
        return o(e);
      } });
  }, function (e, t, n) {
    "use strict";
    var s = n(203),
        a = n(1);function u(e, t) {
      this.rank = e, this.context = t;
    }u.fromJson = function (e, t) {
      var n = e.context || {},
          r = n.events_before || [],
          o = n.events_after || [],
          i = new s(t(e.result));return i.setPaginateToken(n.start, true), i.addEvents(a.map(r, t), true), i.addEvents(a.map(o, t), false), i.setPaginateToken(n.end, false), new u(e.rank, i);
    }, e.exports = u;
  }, function (e, t, n) {
    "use strict";
    function r(e) {
      this._timeline = [e], this._ourEventIndex = 0, this._paginateTokens = { b: null, f: null }, this._paginateRequests = { b: null, f: null };
    }r.prototype.getEvent = function () {
      return this._timeline[this._ourEventIndex];
    }, r.prototype.getTimeline = function () {
      return this._timeline;
    }, r.prototype.getOurEventIndex = function () {
      return this._ourEventIndex;
    }, r.prototype.getPaginateToken = function (e) {
      return this._paginateTokens[e ? "b" : "f"];
    }, r.prototype.setPaginateToken = function (e, t) {
      this._paginateTokens[t ? "b" : "f"] = e;
    }, r.prototype.addEvents = function (e, t) {
      t ? (this._timeline = e.concat(this._timeline), this._ourEventIndex += e.length) : this._timeline = this._timeline.concat(e);
    }, e.exports = r;
  }, function (e, t, n) {
    "use strict";
    var r,
        o = (r = n(7)) && r.__esModule ? r : { default: r };function i() {
      this.fromToken = null;
    }i.prototype = { isNewlyCreated: function () {
        return o.default.resolve(true);
      }, getSyncToken: function () {
        return this.fromToken;
      }, setSyncToken: function (e) {
        this.fromToken = e;
      }, storeGroup: function (e) {}, getGroup: function (e) {
        return null;
      }, getGroups: function () {
        return [];
      }, storeRoom: function (e) {}, getRoom: function (e) {
        return null;
      }, getRooms: function () {
        return [];
      }, removeRoom: function (e) {}, getRoomSummaries: function () {
        return [];
      }, storeUser: function (e) {}, getUser: function (e) {
        return null;
      }, getUsers: function () {
        return [];
      }, scrollback: function (e, t) {
        return [];
      }, storeEvents: function (e, t, n, r) {}, storeFilter: function (e) {}, getFilter: function (e, t) {
        return null;
      }, getFilterIdByName: function (e) {
        return null;
      }, setFilterIdByName: function (e, t) {}, storeAccountDataEvents: function (e) {}, getAccountData: function (e) {}, setSyncData: function (e) {
        return o.default.resolve();
      }, wantsSave: function () {
        return false;
      }, save: function () {}, startup: function () {
        return o.default.resolve();
      }, getSavedSync: function () {
        return o.default.resolve(null);
      }, getSavedSyncToken: function () {
        return o.default.resolve(null);
      }, deleteAllData: function () {
        return o.default.resolve();
      }, getOutOfBandMembers: function () {
        return o.default.resolve(null);
      }, setOutOfBandMembers: function () {
        return o.default.resolve();
      }, clearOutOfBandMembers: function () {
        return o.default.resolve();
      }, getClientOptions: function () {
        return o.default.resolve();
      }, storeClientOptions: function () {
        return o.default.resolve();
      } }, e.exports = i;
  }, function (e, t, n) {
    "use strict";
    var r,
        l = (r = n(20)) && r.__esModule ? r : { default: r };function o(e) {
      this.filter_json = e, this.types = e.types || null, this.not_types = e.not_types || [], this.rooms = e.rooms || null, this.not_rooms = e.not_rooms || [], this.senders = e.senders || null, this.not_senders = e.not_senders || [], this.contains_url = e.contains_url || null;
    }o.prototype.check = function (e) {
      return this._checkFields(e.getRoomId(), e.getSender(), e.getType(), !!e.getContent() && undefined !== e.getContent().url);
    }, o.prototype._checkFields = function (t, n, r, e) {
      for (var o = { rooms: function (e) {
          return t === e;
        }, senders: function (e) {
          return n === e;
        }, types: function (e) {
          return function (e, t) {
            if (t.endsWith("*")) {
              var n = t.slice(0, -1);return e.substr(0, n.length) === n;
            }return e === t;
          }(r, e);
        } }, i = 0; i < (0, l.default)(o).length; i++) {
        var s = (0, l.default)(o)[i],
            a = o[s];if (0 < this["not_" + s].filter(a).length) return false;var u = this[s];if (u && !u.map(a)) return false;
      }var c = this.filter_json.contains_url;return undefined === c || c === e;
    }, o.prototype.filter = function (e) {
      return e.filter(this.check, this);
    }, o.prototype.limit = function () {
      return undefined !== this.filter_json.limit ? this.filter_json.limit : 10;
    }, e.exports = o;
  }, function (e, t, n) {
    "use strict";
    var r,
        o,
        i = s(n(35)),
        p = s(n(20)),
        I = s(n(11)),
        C = s(n(25)),
        f = s(n(26)),
        O = (r = (0, f.default)(C.default.mark(function e(t, n, r) {
      return C.default.wrap(function (e) {
        for (;;) switch (e.prev = e.next) {case 0:
            if (n.emit("event", t), t.isState() && "m.room.encryption" == t.getType() && r.opts.crypto) return e.next = 4, r.opts.crypto.onCryptoEvent(t);e.next = 4;break;case 4:case "end":
            return e.stop();}
      }, e, this);
    })), function (e, t, n) {
      return r.apply(this, arguments);
    }),
        l = (o = (0, f.default)(C.default.mark(function e(t, o, i, s) {
      var n, r, a, u, c, l, p, f, h, d, v, m, y, _, g, b, E, S, w, T, x, k, R;return C.default.wrap(function (e) {
        for (;;) switch (e.prev = e.next) {case 0:
            r = !(n = true), a = undefined, e.prev = 3, u = (0, I.default)(t);case 5:
            if (n = (c = u.next()).done) {
              e.next = 80;break;
            }l = c.value, p = l.room, f = s._mapSyncEventsFormat(l.state, p), h = s._mapSyncEventsFormat(l.timeline, p), d = s._mapSyncEventsFormat(l.ephemeral), v = s._mapSyncEventsFormat(l.account_data), l.unread_notifications && (p.setUnreadNotificationCount("total", l.unread_notifications.notification_count), p.setUnreadNotificationCount("highlight", l.unread_notifications.highlight_count)), p.updateMyMembership("join"), l.timeline = l.timeline || {}, l.isBrandNewRoom ? p.getLiveTimeline().setPaginationToken(l.timeline.prev_batch, P.BACKWARDS) : l.timeline.limited && function () {
              for (var e = true, n = [], t = h.length - 1; 0 <= t; t--) {
                var r = h[t].getId();p.getTimelineForEvent(r) && (j("Already have event " + r + " in limited sync - not resetting"), e = false, n.push(t));
              }h = h.filter(function (e, t) {
                return !n.includes(t);
              }), e && (s._deregisterStateListeners(p), p.resetLiveTimeline(l.timeline.prev_batch, s.opts.canResetEntireTimeline(p.roomId) ? null : o.oldSyncToken), i.resetNotifTimelineSet(), s._registerStateListeners(p));
            }(), s._processRoomEvents(p, f, h), l.summary && p.setSummary(l.summary), p.addLiveEvents(d), p.addAccountData(v), p.recalculate(), l.isBrandNewRoom && (i.store.storeRoom(p), i.emit("Room", p)), s._processEventsForNotifs(p, h), y = !(m = true), _ = undefined, e.prev = 26, g = (0, I.default)(f);case 28:
            if (m = (b = g.next()).done) {
              e.next = 35;break;
            }return E = b.value, e.next = 32, O(E, i, s);case 32:
            m = true, e.next = 28;break;case 35:
            e.next = 41;break;case 37:
            e.prev = 37, e.t0 = e.catch(26), y = true, _ = e.t0;case 41:
            e.prev = 41, e.prev = 42, !m && g.return && g.return();case 44:
            if (e.prev = 44, y) throw _;e.next = 47;break;case 47:
            return e.finish(44);case 48:
            return e.finish(41);case 49:
            w = !(S = true), T = undefined, e.prev = 52, x = (0, I.default)(h);case 54:
            if (S = (k = x.next()).done) {
              e.next = 61;break;
            }return R = k.value, e.next = 58, O(R, i, s);case 58:
            S = true, e.next = 54;break;case 61:
            e.next = 67;break;case 63:
            e.prev = 63, e.t1 = e.catch(52), w = true, T = e.t1;case 67:
            e.prev = 67, e.prev = 68, !S && x.return && x.return();case 70:
            if (e.prev = 70, w) throw T;e.next = 73;break;case 73:
            return e.finish(70);case 74:
            return e.finish(67);case 75:
            d.forEach(function (e) {
              i.emit("event", e);
            }), v.forEach(function (e) {
              i.emit("event", e);
            });case 77:
            n = true, e.next = 5;break;case 80:
            e.next = 86;break;case 82:
            e.prev = 82, e.t2 = e.catch(3), r = true, a = e.t2;case 86:
            e.prev = 86, e.prev = 87, !n && u.return && u.return();case 89:
            if (e.prev = 89, r) throw a;e.next = 92;break;case 92:
            return e.finish(89);case 93:
            return e.finish(86);case 94:case "end":
            return e.stop();}
      }, e, this, [[3, 82, 86, 94], [26, 37, 41, 49], [42,, 44, 48], [52, 63, 67, 75], [68,, 70, 74], [87,, 89, 93]]);
    })), function (e, t, n, r) {
      return o.apply(this, arguments);
    }),
        h = s(n(7)),
        d = n(92);function s(e) {
      return e && e.__esModule ? e : { default: e };
    }var a,
        u,
        c,
        v,
        m,
        y = n(42),
        _ = n(99),
        g = n(101),
        b = n(1),
        E = n(65),
        P = n(24),
        S = true;function w(e, t) {
      return "FILTER_SYNC_" + e + (t ? "_" + t : "");
    }function j() {
      var e;(e = console).log.apply(e, arguments);
    }function T(e, t) {
      this.client = e, (t = t || {}).initialSyncLimit = undefined === t.initialSyncLimit ? 8 : t.initialSyncLimit, t.resolveInvitesToProfiles = t.resolveInvitesToProfiles || false, t.pollTimeout = t.pollTimeout || 3e4, t.pendingEventOrdering = t.pendingEventOrdering || "chronological", t.canResetEntireTimeline || (t.canResetEntireTimeline = function (e) {
        return false;
      }), this.opts = t, this._peekRoomId = null, this._currentSyncRequest = null, this._syncState = null, this._syncStateData = null, this._catchingUp = false, this._running = false, this._keepAliveTimer = null, this._connectionReturnedDefer = null, this._notifEvents = [], this._failedSyncCount = 0, this._storeIsInvalid = false, e.getNotifTimelineSet() && e.reEmitter.reEmit(e.getNotifTimelineSet(), ["Room.timeline", "Room.timelineReset"]);
    }function x(e, t) {
      var n = new y(t);return e.reEmitter.reEmit(n, ["User.avatarUrl", "User.displayName", "User.presence", "User.currentlyActive", "User.lastPresenceTs"]), n;
    }T.prototype.createRoom = function (e) {
      var t = this.client,
          n = new _(e, t, t.getUserId(), { lazyLoadMembers: this.opts.lazyLoadMembers, pendingEventOrdering: this.opts.pendingEventOrdering, timelineSupport: t.timelineSupport });return t.reEmitter.reEmit(n, ["Room.name", "Room.timeline", "Room.redaction", "Room.receipt", "Room.tags", "Room.timelineReset", "Room.localEchoUpdated", "Room.accountData", "Room.myMembership"]), this._registerStateListeners(n), n;
    }, T.prototype.createGroup = function (e) {
      var t = this.client,
          n = new g(e);return t.reEmitter.reEmit(n, ["Group.profile", "Group.myMembership"]), t.store.storeGroup(n), n;
    }, T.prototype._registerStateListeners = function (e) {
      var r = this.client;r.reEmitter.reEmit(e.currentState, ["RoomState.events", "RoomState.members", "RoomState.newMember"]), e.currentState.on("RoomState.newMember", function (e, t, n) {
        n.user = r.getUser(n.userId), r.reEmitter.reEmit(n, ["RoomMember.name", "RoomMember.typing", "RoomMember.powerLevel", "RoomMember.membership"]);
      });
    }, T.prototype._deregisterStateListeners = function (e) {
      e.currentState.removeAllListeners("RoomState.events"), e.currentState.removeAllListeners("RoomState.members"), e.currentState.removeAllListeners("RoomState.newMember");
    }, T.prototype.syncLeftRooms = function () {
      var i = this.client,
          s = this,
          e = new E(this.client.credentials.userId);e.setTimelineLimit(1), e.setIncludeLeaveRooms(true);var t = this.opts.pollTimeout + 8e4,
          n = { timeout: 0 };return i.getOrCreateFilter(w(i.credentials.userId, "LEFT_ROOMS"), e).then(function (e) {
        return n.filter = e, i._http.authedRequest(undefined, "GET", "/sync", n, undefined, t);
      }).then(function (e) {
        var t = [];e.rooms && e.rooms.leave && (t = s._mapSyncResponseToRoomArray(e.rooms.leave));var o = [];return t.forEach(function (e) {
          var t = e.room;if (o.push(t), e.isBrandNewRoom) {
            e.timeline = e.timeline || {};var n = s._mapSyncEventsFormat(e.timeline, t),
                r = s._mapSyncEventsFormat(e.state, t);t.getLiveTimeline().setPaginationToken(e.timeline.prev_batch, P.BACKWARDS), s._processRoomEvents(t, r, n), t.recalculate(), i.store.storeRoom(t), i.emit("Room", t), s._processEventsForNotifs(t, n);
          }
        }), o;
      });
    }, T.prototype.peek = function (i) {
      var s = this,
          a = this.client;return this._peekRoomId = i, this.client.roomInitialSync(i, 20).then(function (e) {
        e.messages = e.messages || {}, e.messages.chunk = e.messages.chunk || [], e.state = e.state || [];var t = s.createRoom(i),
            n = b.map(b.deepCopy(e.state), a.getEventMapper()),
            r = b.map(e.state, a.getEventMapper()),
            o = b.map(e.messages.chunk, a.getEventMapper());return e.presence && b.isArray(e.presence) && e.presence.map(a.getEventMapper()).forEach(function (e) {
          var t = a.store.getUser(e.getContent().user_id);t ? t.setPresenceEvent(e) : ((t = x(a, e.getContent().user_id)).setPresenceEvent(e), a.store.storeUser(t)), a.emit("event", e);
        }), e.messages.start && (t.oldState.paginationToken = e.messages.start), t.oldState.setStateEvents(n), t.currentState.setStateEvents(r), s._resolveInvites(t), t.recalculate(), t.addEventsToTimeline(o.reverse(), true, t.getLiveTimeline(), e.messages.start), a.store.storeRoom(t), a.emit("Room", t), s._peekPoll(t), t;
      });
    }, T.prototype.stopPeeking = function () {
      this._peekRoomId = null;
    }, T.prototype._peekPoll = function (n, t) {
      if (this._peekRoomId === n.roomId) {
        var r = this;this.client._http.authedRequest(undefined, "GET", "/events", { room_id: n.roomId, timeout: 3e4, from: t }, undefined, 5e4).done(function (e) {
          if (r._peekRoomId === n.roomId) {
            e.chunk.filter(function (e) {
              return "m.presence" === e.type;
            }).map(r.client.getEventMapper()).forEach(function (e) {
              var t = r.client.store.getUser(e.getContent().user_id);t ? t.setPresenceEvent(e) : ((t = x(r.client, e.getContent().user_id)).setPresenceEvent(e), r.client.store.storeUser(t)), r.client.emit("event", e);
            });var t = e.chunk.filter(function (e) {
              return e.room_id === n.roomId;
            }).map(r.client.getEventMapper());n.addLiveEvents(t), r._peekPoll(n, e.end);
          } else j("Stopped peeking in room %s", n.roomId);
        }, function (e) {
          console.error("[%s] Peek poll failed: %s", n.roomId, e), setTimeout(function () {
            r._peekPoll(n, t);
          }, 3e4);
        });
      } else j("Stopped peeking in room %s", n.roomId);
    }, T.prototype.getSyncState = function () {
      return this._syncState;
    }, T.prototype.getSyncStateData = function () {
      return this._syncStateData;
    }, T.prototype.recoverFromSyncStartupError = (a = (0, f.default)(C.default.mark(function e(t, n) {
      var r;return C.default.wrap(function (e) {
        for (;;) switch (e.prev = e.next) {case 0:
            return e.next = 2, t;case 2:
            return r = this._startKeepAlives(), this._updateSyncState("ERROR", { error: n }), e.next = 6, r;case 6:case "end":
            return e.stop();}
      }, e, this);
    })), function (e, t) {
      return a.apply(this, arguments);
    }), T.prototype._wasLazyLoadingToggled = (u = (0, f.default)(C.default.mark(function e(t) {
      var n, r;return C.default.wrap(function (e) {
        for (;;) switch (e.prev = e.next) {case 0:
            return t = !!t, n = false, e.next = 4, this.client.store.isNewlyCreated();case 4:
            if (e.sent) {
              e.next = 11;break;
            }return e.next = 8, this.client.store.getClientOptions();case 8:
            return (r = e.sent) && (n = !!r.lazyLoadMembers), e.abrupt("return", n !== t);case 11:
            return e.abrupt("return", false);case 12:case "end":
            return e.stop();}
      }, e, this);
    })), function (e) {
      return u.apply(this, arguments);
    }), T.prototype.sync = function () {
      var e,
          t,
          r = this,
          n = (e = (0, f.default)(C.default.mark(function e() {
        var t;return C.default.wrap(function (e) {
          for (;;) switch (e.prev = e.next) {case 0:
              return e.prev = 0, e.next = 3, i.getPushRules();case 3:
              t = e.sent, j("Got push rules"), i.pushRules = t, e.next = 14;break;case 8:
              return e.prev = 8, e.t0 = e.catch(0), e.next = 12, s.recoverFromSyncStartupError(u, e.t0);case 12:
              return n(), e.abrupt("return");case 14:
              l();case 15:case "end":
              return e.stop();}
        }, e, this, [[0, 8]]);
      })), function () {
        return e.apply(this, arguments);
      }),
          o = (t = (0, f.default)(C.default.mark(function e() {
        var t, n, r;return C.default.wrap(function (e) {
          for (;;) switch (e.prev = e.next) {case 0:
              return t = undefined, s.opts.filter ? t = s.opts.filter : (t = new E(i.credentials.userId)).setTimelineLimit(s.opts.initialSyncLimit), n = undefined, e.prev = 3, e.next = 6, i.getOrCreateFilter(w(i.credentials.userId), t);case 6:
              n = e.sent, e.next = 15;break;case 9:
              return e.prev = 9, e.t0 = e.catch(3), e.next = 13, s.recoverFromSyncStartupError(u, e.t0);case 13:
              return o(), e.abrupt("return");case 15:
              if (i.resetNotifTimelineSet(), r = undefined, s.opts.firstSyncFilter) return e.prev = 18, e.next = 21, i.getOrCreateFilter(w(i.credentials.userId), s.opts.firstSyncFilter);e.next = 27;break;case 21:
              r = e.sent, e.next = 27;break;case 24:
              e.prev = 24, e.t1 = e.catch(18), console.log(e.t1);case 27:
              return null === s._currentSyncRequest && (console.log("Sending first sync request..."), s._currentSyncRequest = s._doSyncRequest({ filterId: r || n }, c)), e.next = 30, u;case 30:
              s._sync({ filterId: n });case 31:case "end":
              return e.stop();}
        }, e, this, [[3, 9], [18, 24]]);
      })), function () {
        return t.apply(this, arguments);
      }),
          i = this.client,
          s = this;this._running = true, this._onOnlineBound = this._onOnline.bind(this), "function" == typeof addEventListener && addEventListener("online", this._onOnlineBound, false);var a,
          u = h.default.resolve(),
          c = null,
          l = (a = (0, f.default)(C.default.mark(function e() {
        var t, n;return C.default.wrap(function (e) {
          for (;;) switch (e.prev = e.next) {case 0:
              if (r.opts.lazyLoadMembers && i.isGuest() && (r.opts.lazyLoadMembers = false), r.opts.lazyLoadMembers) return e.next = 4, i.doesServerSupportLazyLoading();e.next = 13;break;case 4:
              if (e.sent) return e.next = 8, i.createFilter(E.LAZY_LOADING_SYNC_FILTER);e.next = 11;break;case 8:
              r.opts.filter = e.sent, e.next = 13;break;case 11:
              console.log("LL: lazy loading requested but not supported by server, so disabling"), r.opts.lazyLoadMembers = false;case 13:
              return e.next = 15, r._wasLazyLoadingToggled(r.opts.lazyLoadMembers);case 15:
              if (e.sent) return r._storeIsInvalid = true, t = d.InvalidStoreError.TOGGLED_LAZY_LOADING, n = new d.InvalidStoreError(t, !!r.opts.lazyLoadMembers), r._updateSyncState("ERROR", { error: n }), console.warn("InvalidStoreError: store is not usable: stopping sync."), e.abrupt("return");e.next = 23;break;case 23:
              return r.opts.lazyLoadMembers && r.opts.crypto && r.opts.crypto.enableLazyLoading(), e.next = 26, r.client._storeClientOptions();case 26:
              o();case 27:case "end":
              return e.stop();}
        }, e, r);
      })), function () {
        return a.apply(this, arguments);
      });i.isGuest() ? s._sync({}) : (u = i.store.getSavedSyncToken().then(function (e) {
        return c = e, i.store.getSavedSync();
      }).then(function (e) {
        if (e) return s._syncFromCache(e);
      }), n());
    }, T.prototype.stop = function () {
      j("SyncApi.stop"), "function" == typeof removeEventListener && removeEventListener("online", this._onOnlineBound, false), this._onOnlineBound = undefined, this._running = false, this._currentSyncRequest && "function" == typeof this._currentSyncRequest.abort && this._currentSyncRequest.abort(), this._keepAliveTimer && (clearTimeout(this._keepAliveTimer), this._keepAliveTimer = null);
    }, T.prototype.retryImmediately = function () {
      return !!this._connectionReturnedDefer && (this._startKeepAlives(0), true);
    }, T.prototype._syncFromCache = (c = (0, f.default)(C.default.mark(function e(t) {
      var n, r, o;return C.default.wrap(function (e) {
        for (;;) switch (e.prev = e.next) {case 0:
            return j("sync(): not doing HTTP hit, instead returning stored /sync data"), n = t.nextBatch, this.client.store.setSyncToken(n), r = { oldSyncToken: null, nextSyncToken: n, catchingUp: false }, o = { next_batch: n, rooms: t.roomsData, groups: t.groupsData, account_data: { events: t.accountData } }, e.prev = 5, e.next = 8, this._processSyncResponse(r, o);case 8:
            e.next = 13;break;case 10:
            e.prev = 10, e.t0 = e.catch(5), console.error("Error processing cached sync", e.t0.stack || e.t0);case 13:
            this._storeIsInvalid || this._updateSyncState("PREPARED", r);case 14:case "end":
            return e.stop();}
      }, e, this, [[5, 10]]);
    })), function (e) {
      return c.apply(this, arguments);
    }), T.prototype._sync = (v = (0, f.default)(C.default.mark(function e(t) {
      var n, r, o, i;return C.default.wrap(function (e) {
        for (;;) switch (e.prev = e.next) {case 0:
            if (n = this.client, this._running) {
              e.next = 6;break;
            }return j("Sync no longer running: exiting."), this._connectionReturnedDefer && (this._connectionReturnedDefer.reject(), this._connectionReturnedDefer = null), this._updateSyncState("STOPPED"), e.abrupt("return");case 6:
            return r = n.store.getSyncToken(), o = undefined, e.prev = 8, null === this._currentSyncRequest && (this._currentSyncRequest = this._doSyncRequest(t, r)), e.next = 12, this._currentSyncRequest;case 12:
            o = e.sent, e.next = 19;break;case 15:
            return e.prev = 15, e.t0 = e.catch(8), this._onSyncError(e.t0, t), e.abrupt("return");case 19:
            return e.prev = 19, this._currentSyncRequest = null, e.finish(19);case 22:
            return n.store.setSyncToken(o.next_batch), this._failedSyncCount = 0, e.next = 26, n.store.setSyncData(o);case 26:
            if (i = { oldSyncToken: r, nextSyncToken: o.next_batch, catchingUp: this._catchingUp }, this.opts.crypto) return e.next = 30, this.opts.crypto.onSyncWillProcess(i);e.next = 30;break;case 30:
            return e.prev = 30, e.next = 33, this._processSyncResponse(i, o);case 33:
            e.next = 38;break;case 35:
            e.prev = 35, e.t1 = e.catch(30), console.error("Caught /sync error", e.t1.stack || e.t1);case 38:
            if (i.catchingUp = this._catchingUp, t.hasSyncedBefore || (this._updateSyncState("PREPARED", i), t.hasSyncedBefore = true), this.opts.crypto) return e.next = 43, this.opts.crypto.onSyncCompleted(i);e.next = 43;break;case 43:
            if (this._updateSyncState("SYNCING", i), !n.store.wantsSave()) {
              e.next = 49;break;
            }if (this.opts.crypto) return e.next = 48, this.opts.crypto.saveDeviceList(0);e.next = 48;break;case 48:
            n.store.save();case 49:
            this._sync(t);case 50:case "end":
            return e.stop();}
      }, e, this, [[8, 15, 19, 22], [30, 35]]);
    })), function (e) {
      return v.apply(this, arguments);
    }), T.prototype._doSyncRequest = function (e, t) {
      var n = this._getSyncParams(e, t);return this.client._http.authedRequest(undefined, "GET", "/sync", n, undefined, n.timeout + 8e4);
    }, T.prototype._getSyncParams = function (e, t) {
      var n = this.opts.pollTimeout;"SYNCING" === this.getSyncState() && !this._catchingUp || (this._catchingUp = true, n = 0);var r = e.filterId;this.client.isGuest() && !r && (r = this._getGuestFilter());var o = { filter: r, timeout: n };return this.opts.disablePresence && (o.set_presence = "offline"), t ? o.since = t : o._cacheBuster = Date.now(), "ERROR" != this.getSyncState() && "RECONNECTING" != this.getSyncState() || (o.timeout = 0), o;
    }, T.prototype._onSyncError = function (e, t) {
      var n = this;this._running ? (console.error("/sync error %s", e), console.error(e), this._failedSyncCount++, console.log("Number of consecutive failed sync requests:", this._failedSyncCount), j("Starting keep-alive"), this._startKeepAlives().then(function (e) {
        e && "ERROR" === n.getSyncState() && n._updateSyncState("CATCHUP", { oldSyncToken: null, nextSyncToken: null, catchingUp: true }), n._sync(t);
      }), this._currentSyncRequest = null, this._updateSyncState(3 <= this._failedSyncCount ? "ERROR" : "RECONNECTING", { error: e })) : (j("Sync no longer running: exiting"), this._connectionReturnedDefer && (this._connectionReturnedDefer.reject(), this._connectionReturnedDefer = null), this._updateSyncState("STOPPED"));
    }, T.prototype._processSyncResponse = (m = (0, f.default)(C.default.mark(function e(t, n) {
      var i, s, r, o, a, u, c;return C.default.wrap(function (e) {
        for (;;) switch (e.prev = e.next) {case 0:
            return i = this.client, s = this, n.presence && b.isArray(n.presence.events) && n.presence.events.map(i.getEventMapper()).forEach(function (e) {
              var t = i.store.getUser(e.getSender());t ? (t.notReEmitYet && (i.reEmitter.reEmit(t, ["User.avatarUrl", "User.displayName", "User.presence", "User.currentlyActive", "User.lastPresenceTs"]), delete t.notReEmitYet), t.setPresenceEvent(e)) : ((t = x(i, e.getSender())).setPresenceEvent(e), i.store.storeUser(t)), i.emit("event", e);
            }), n.account_data && b.isArray(n.account_data.events) && (r = n.account_data.events.map(i.getEventMapper()), i.store.storeAccountDataEvents(r), r.forEach(function (e) {
              return "m.push_rules" == e.getType() && (i.pushRules = e.getContent()), i.emit("accountData", e), e;
            })), n.to_device && b.isArray(n.to_device.events) && 0 < n.to_device.events.length ? n.to_device.events.map(i.getEventMapper()).forEach(function (e) {
              var t = e.getContent();"m.room.message" != e.getType() || "m.bad.encrypted" != t.msgtype ? i.emit("toDeviceEvent", e) : console.log("Ignoring undecryptable to-device event from " + e.getSender());
            }) : this._catchingUp = false, n.groups && (n.groups.invite && this._processGroupSyncEntry(n.groups.invite, "invite"), n.groups.join && this._processGroupSyncEntry(n.groups.join, "join"), n.groups.leave && this._processGroupSyncEntry(n.groups.leave, "leave")), o = [], a = [], u = [], n.rooms && (n.rooms.invite && (o = this._mapSyncResponseToRoomArray(n.rooms.invite)), n.rooms.join && (a = this._mapSyncResponseToRoomArray(n.rooms.join)), n.rooms.leave && (u = this._mapSyncResponseToRoomArray(n.rooms.leave))), this._notifEvents = [], o.forEach(function (e) {
              var t = e.room,
                  n = s._mapSyncEventsFormat(e.invite_state, t);t.updateMyMembership("invite"), s._processRoomEvents(t, n), e.isBrandNewRoom && (t.recalculate(), i.store.storeRoom(t), i.emit("Room", t)), n.forEach(function (e) {
                i.emit("event", e);
              });
            }), e.next = 14, l(a, t, i, s);case 14:
            if (u.forEach(function (e) {
              var t = e.room,
                  n = s._mapSyncEventsFormat(e.state, t),
                  r = s._mapSyncEventsFormat(e.timeline, t),
                  o = s._mapSyncEventsFormat(e.account_data);t.updateMyMembership("leave"), s._processRoomEvents(t, n, r), t.addAccountData(o), t.recalculate(), e.isBrandNewRoom && (i.store.storeRoom(t), i.emit("Room", t)), s._processEventsForNotifs(t, r), n.forEach(function (e) {
                i.emit("event", e);
              }), r.forEach(function (e) {
                i.emit("event", e);
              }), o.forEach(function (e) {
                i.emit("event", e);
              });
            }), t.oldSyncToken && this._notifEvents.length && (this._notifEvents.sort(function (e, t) {
              return e.getTs() - t.getTs();
            }), this._notifEvents.forEach(function (e) {
              i.getNotifTimelineSet().addLiveEvent(e);
            })), !n.device_lists) {
              e.next = 22;break;
            }if (this.opts.crypto) return e.next = 20, this.opts.crypto.handleDeviceListChanges(t, n.device_lists);e.next = 22;break;case 20:
            e.next = 22;break;case 22:
            this.opts.crypto && n.device_one_time_keys_count && (c = n.device_one_time_keys_count.signed_curve25519 || 0, this.opts.crypto.updateOneTimeKeyCount(c));case 23:case "end":
            return e.stop();}
      }, e, this);
    })), function (e, t) {
      return m.apply(this, arguments);
    }), T.prototype._startKeepAlives = function (e) {
      return undefined === e && (e = 2e3 + Math.floor(5e3 * Math.random())), null !== this._keepAliveTimer && clearTimeout(this._keepAliveTimer), 0 < e ? this._keepAliveTimer = setTimeout(this._pokeKeepAlive.bind(this), e) : this._pokeKeepAlive(), this._connectionReturnedDefer || (this._connectionReturnedDefer = h.default.defer()), this._connectionReturnedDefer.promise;
    }, T.prototype._pokeKeepAlive = function (t) {
      undefined === t && (t = false);var n = this;function r() {
        clearTimeout(n._keepAliveTimer), n._connectionReturnedDefer && (n._connectionReturnedDefer.resolve(t), n._connectionReturnedDefer = null);
      }this.client._http.request(undefined, "GET", "/_matrix/client/versions", undefined, undefined, { prefix: "", localTimeoutMs: 15e3 }).done(function () {
        r();
      }, function (e) {
        400 == e.httpStatus || 404 == e.httpStatus ? n._keepAliveTimer = setTimeout(r, 2e3) : (t = true, n._keepAliveTimer = setTimeout(n._pokeKeepAlive.bind(n, t), 5e3 + Math.floor(5e3 * Math.random())), n._updateSyncState("ERROR", { error: e }));
      });
    }, T.prototype._processGroupSyncEntry = function (e, t) {
      var n = true,
          r = false,
          o = undefined;try {
        for (var i, s = (0, I.default)((0, p.default)(e)); !(n = (i = s.next()).done); n = true) {
          var a = i.value,
              u = e[a],
              c = this.client.store.getGroup(a),
              l = null === c;null === c && (c = this.createGroup(a)), u.profile && c.setProfile(u.profile.name, u.profile.avatar_url), u.inviter && c.setInviter({ userId: u.inviter }), c.setMyMembership(t), l && this.client.emit("Group", c);
        }
      } catch (e) {
        r = true, o = e;
      } finally {
        try {
          !n && s.return && s.return();
        } finally {
          if (r) throw o;
        }
      }
    }, T.prototype._mapSyncResponseToRoomArray = function (o) {
      var i = this.client,
          s = this;return b.keys(o).map(function (e) {
        var t = o[e],
            n = i.store.getRoom(e),
            r = false;return n || (n = s.createRoom(e), r = true), t.room = n, t.isBrandNewRoom = r, t;
      });
    }, T.prototype._mapSyncEventsFormat = function (e, t) {
      if (!e || !b.isArray(e.events)) return [];var n = this.client.getEventMapper();return e.events.map(function (e) {
        return t && (e.room_id = t.roomId), n(e);
      });
    }, T.prototype._resolveInvites = function (r) {
      if (r && this.opts.resolveInvitesToProfiles) {
        var t = this.client;r.getMembersWithMembership("invite").forEach(function (n) {
          if (!n._requestedProfileInfo) {
            n._requestedProfileInfo = true;var e = t.getUser(n.userId);(e ? h.default.resolve({ avatar_url: e.avatarUrl, displayname: e.displayName }) : t.getProfileInfo(n.userId)).done(function (e) {
              var t = n.events.member;"invite" === t.getContent().membership && (t.getContent().avatar_url = e.avatar_url, t.getContent().displayname = e.displayname, n.setMembershipEvent(t, r.currentState));
            }, function (e) {});
          }
        });
      }
    }, T.prototype._processRoomEvents = function (e, t, n) {
      var r = e.getLiveTimeline(),
          o = 0 == r.getEvents().length;if (o) {
        var i = true,
            s = false,
            a = undefined;try {
          for (var u, c = (0, I.default)(t); !(i = (u = c.next()).done); i = true) {
            var l = u.value;this.client.getPushActionsForEvent(l);
          }
        } catch (e) {
          s = true, a = e;
        } finally {
          try {
            !i && c.return && c.return();
          } finally {
            if (s) throw a;
          }
        }r.initialiseState(t);
      }this._resolveInvites(e), e.recalculate(), o || (e.oldState.setStateEvents(t || []), e.currentState.setStateEvents(t || [])), e.addLiveEvents(n || []);
    }, T.prototype._processEventsForNotifs = function (e, t) {
      if (this.client.getNotifTimelineSet()) for (var n = 0; n < t.length; n++) {
        var r = this.client.getPushActionsForEvent(t[n]);r && r.notify && r.tweaks && r.tweaks.highlight && this._notifEvents.push(t[n]);
      }
    }, T.prototype._getGuestFilter = function () {
      return this.client._guestRooms ? (0, i.default)({ room: { timeline: { limit: 20 } } }) : "{}";
    }, T.prototype._updateSyncState = function (e, t) {
      var n = this._syncState;this._syncState = e, this._syncStateData = t, this.client.emit("sync", this._syncState, n, t);
    }, T.prototype._onOnline = function () {
      j("Browser thinks we are back online"), this._startKeepAlives(0);
    }, e.exports = T;
  }, function (e, t, n) {
    e.exports = { default: n(208), __esModule: true };
  }, function (e, t, n) {
    n(209), e.exports = n(0).Number.isInteger;
  }, function (e, t, n) {
    var r = n(2);r(r.S, "Number", { isInteger: n(210) });
  }, function (e, t, n) {
    var r = n(4),
        o = Math.floor;e.exports = function (e) {
      return !r(e) && isFinite(e) && o(e) === e;
    };
  }, function (e, t, n) {
    "use strict";
    e.exports = function (e, t) {
      this.roomId = e, this.info = t;
    };
  }, function (e, t, n) {
    "use strict";
    var r = i(n(23)),
        o = i(n(20));function i(e) {
      return e && e.__esModule ? e : { default: e };
    }var u = n(43),
        c = n(1);function s(e) {
      c.checkObjectHasKeys(e, ["baseUrl", "request"]), this.baseUrl = e.baseUrl, this.idBaseUrl = e.idBaseUrl;var t = { baseUrl: e.baseUrl, idBaseUrl: e.idBaseUrl, accessToken: e.accessToken, request: e.request, prefix: u.PREFIX_R0, onlyData: true, extraParams: e.queryParams, localTimeoutMs: e.localTimeoutMs, useAuthorizationHeader: e.useAuthorizationHeader };this._http = new u.MatrixHttpApi(this, t), this._txnCtr = 0;
    }s.prototype.getHomeserverUrl = function () {
      return this.baseUrl;
    }, s.prototype.getIdentityServerUrl = function () {
      return 0 < arguments.length && undefined !== arguments[0] && arguments[0] && (this.idBaseUrl.startsWith("http://") || this.idBaseUrl.startsWith("https://")) ? this.idBaseUrl.split("://")[1] : this.idBaseUrl;
    }, s.prototype.getAccessToken = function () {
      return this._http.opts.accessToken || null;
    }, s.prototype.isLoggedIn = function () {
      return undefined !== this._http.opts.accessToken;
    }, s.prototype.makeTxnId = function () {
      return "m" + new Date().getTime() + "." + this._txnCtr++;
    }, s.prototype.isUsernameAvailable = function (e) {
      return this._http.authedRequest(undefined, "GET", "/register/available", { username: e }).then(function (e) {
        return e.available;
      });
    }, s.prototype.register = function (e, t, n, r, o, i, s) {
      true === o ? o = { email: true } : null == o && (o = {}), null == r && (r = {}), n && (r.session = n);var a = { auth: r };return null != e && (a.username = e), null != t && (a.password = t), o.email && (a.bind_email = true), o.msisdn && (a.bind_msisdn = true), null != i && (a.guest_access_token = i), null != t && (a.x_show_msisdn = true), this.registerRequest(a, undefined, s);
    }, s.prototype.registerGuest = function (e, t) {
      return (e = e || {}).body = e.body || {}, this.registerRequest(e.body, "guest", t);
    }, s.prototype.registerRequest = function (e, t, n) {
      var r = {};return t && (r.kind = t), this._http.request(n, "POST", "/register", r, e);
    }, s.prototype.loginFlows = function (e) {
      return this._http.request(e, "GET", "/login");
    }, s.prototype.login = function (n, e, r) {
      var o = this,
          t = { type: n };return c.extend(t, e), this._http.authedRequest(function (e, t) {
        "m.login.password" === n && t && t.access_token && t.user_id && (o._http.opts.accessToken = t.access_token, o.credentials = { userId: t.user_id }), r && r(e, t);
      }, "POST", "/login", undefined, t);
    }, s.prototype.loginWithPassword = function (e, t, n) {
      return this.login("m.login.password", { user: e, password: t }, n);
    }, s.prototype.loginWithSAML2 = function (e, t) {
      return this.login("m.login.saml2", { relay_state: e }, t);
    }, s.prototype.getCasLoginUrl = function (e) {
      return this.getSsoLoginUrl(e, "cas");
    }, s.prototype.getSsoLoginUrl = function (e, t) {
      return undefined === t && (t = "sso"), this._http.getUrl("/login/" + t + "/redirect", { redirectUrl: e }, u.PREFIX_R0);
    }, s.prototype.loginWithToken = function (e, t) {
      return this.login("m.login.token", { token: e }, t);
    }, s.prototype.logout = function (e) {
      return this._http.authedRequest(e, "POST", "/logout");
    }, s.prototype.deactivateAccount = function (e, t) {
      if ("function" == typeof t) throw new Error("deactivateAccount no longer accepts a callback parameter");var n = {};return e && (n.auth = e), undefined !== t && (n.erase = t), this._http.authedRequestWithPrefix(undefined, "POST", "/account/deactivate", undefined, n, u.PREFIX_R0);
    }, s.prototype.getFallbackAuthUrl = function (e, t) {
      var n = c.encodeUri("/auth/$loginType/fallback/web", { $loginType: e });return this._http.getUrl(n, { session: t }, u.PREFIX_R0);
    }, s.prototype.createRoom = function (e, t) {
      return this._http.authedRequest(t, "POST", "/createRoom", undefined, e);
    }, s.prototype.roomState = function (e, t) {
      var n = c.encodeUri("/rooms/$roomId/state", { $roomId: e });return this._http.authedRequest(t, "GET", n);
    }, s.prototype.fetchRoomEvent = function (e, t, n) {
      var r = c.encodeUri("/rooms/$roomId/event/$eventId", { $roomId: e, $eventId: t });return this._http.authedRequest(n, "GET", r);
    }, s.prototype.members = function (e, t, n, r, o) {
      var i = {};t && (i.membership = t), n && (i.not_membership = n), r && (i.at = r);var s = c.encodeParams(i),
          a = c.encodeUri("/rooms/$roomId/members?" + s, { $roomId: e });return this._http.authedRequest(o, "GET", a);
    }, s.prototype.upgradeRoom = function (e, t) {
      var n = c.encodeUri("/rooms/$roomId/upgrade", { $roomId: e });return this._http.authedRequest(undefined, "POST", n, undefined, { new_version: t });
    }, s.prototype.getGroupSummary = function (e) {
      var t = c.encodeUri("/groups/$groupId/summary", { $groupId: e });return this._http.authedRequest(undefined, "GET", t);
    }, s.prototype.getGroupProfile = function (e) {
      var t = c.encodeUri("/groups/$groupId/profile", { $groupId: e });return this._http.authedRequest(undefined, "GET", t);
    }, s.prototype.setGroupProfile = function (e, t) {
      var n = c.encodeUri("/groups/$groupId/profile", { $groupId: e });return this._http.authedRequest(undefined, "POST", n, undefined, t);
    }, s.prototype.setGroupJoinPolicy = function (e, t) {
      var n = c.encodeUri("/groups/$groupId/settings/m.join_policy", { $groupId: e });return this._http.authedRequest(undefined, "PUT", n, undefined, { "m.join_policy": t });
    }, s.prototype.getGroupUsers = function (e) {
      var t = c.encodeUri("/groups/$groupId/users", { $groupId: e });return this._http.authedRequest(undefined, "GET", t);
    }, s.prototype.getGroupInvitedUsers = function (e) {
      var t = c.encodeUri("/groups/$groupId/invited_users", { $groupId: e });return this._http.authedRequest(undefined, "GET", t);
    }, s.prototype.getGroupRooms = function (e) {
      var t = c.encodeUri("/groups/$groupId/rooms", { $groupId: e });return this._http.authedRequest(undefined, "GET", t);
    }, s.prototype.inviteUserToGroup = function (e, t) {
      var n = c.encodeUri("/groups/$groupId/admin/users/invite/$userId", { $groupId: e, $userId: t });return this._http.authedRequest(undefined, "PUT", n, undefined, {});
    }, s.prototype.removeUserFromGroup = function (e, t) {
      var n = c.encodeUri("/groups/$groupId/admin/users/remove/$userId", { $groupId: e, $userId: t });return this._http.authedRequest(undefined, "PUT", n, undefined, {});
    }, s.prototype.addUserToGroupSummary = function (e, t, n) {
      var r = c.encodeUri(n ? "/groups/$groupId/summary/$roleId/users/$userId" : "/groups/$groupId/summary/users/$userId", { $groupId: e, $roleId: n, $userId: t });return this._http.authedRequest(undefined, "PUT", r, undefined, {});
    }, s.prototype.removeUserFromGroupSummary = function (e, t) {
      var n = c.encodeUri("/groups/$groupId/summary/users/$userId", { $groupId: e, $userId: t });return this._http.authedRequest(undefined, "DELETE", n, undefined, {});
    }, s.prototype.addRoomToGroupSummary = function (e, t, n) {
      var r = c.encodeUri(n ? "/groups/$groupId/summary/$categoryId/rooms/$roomId" : "/groups/$groupId/summary/rooms/$roomId", { $groupId: e, $categoryId: n, $roomId: t });return this._http.authedRequest(undefined, "PUT", r, undefined, {});
    }, s.prototype.removeRoomFromGroupSummary = function (e, t) {
      var n = c.encodeUri("/groups/$groupId/summary/rooms/$roomId", { $groupId: e, $roomId: t });return this._http.authedRequest(undefined, "DELETE", n, undefined, {});
    }, s.prototype.addRoomToGroup = function (e, t, n) {
      undefined === n && (n = true);var r = c.encodeUri("/groups/$groupId/admin/rooms/$roomId", { $groupId: e, $roomId: t });return this._http.authedRequest(undefined, "PUT", r, undefined, { "m.visibility": { type: n ? "public" : "private" } });
    }, s.prototype.updateGroupRoomVisibility = function (e, t, n) {
      var r = c.encodeUri("/groups/$groupId/admin/rooms/$roomId/config/m.visibility", { $groupId: e, $roomId: t });return this._http.authedRequest(undefined, "PUT", r, undefined, { type: n ? "public" : "private" });
    }, s.prototype.removeRoomFromGroup = function (e, t) {
      var n = c.encodeUri("/groups/$groupId/admin/rooms/$roomId", { $groupId: e, $roomId: t });return this._http.authedRequest(undefined, "DELETE", n, undefined, {});
    }, s.prototype.acceptGroupInvite = function (e) {
      var t = 1 < arguments.length && undefined !== arguments[1] ? arguments[1] : null,
          n = c.encodeUri("/groups/$groupId/self/accept_invite", { $groupId: e });return this._http.authedRequest(undefined, "PUT", n, undefined, t || {});
    }, s.prototype.joinGroup = function (e) {
      var t = c.encodeUri("/groups/$groupId/self/join", { $groupId: e });return this._http.authedRequest(undefined, "PUT", t, undefined, {});
    }, s.prototype.leaveGroup = function (e) {
      var t = c.encodeUri("/groups/$groupId/self/leave", { $groupId: e });return this._http.authedRequest(undefined, "PUT", t, undefined, {});
    }, s.prototype.getJoinedGroups = function () {
      var e = c.encodeUri("/joined_groups");return this._http.authedRequest(undefined, "GET", e);
    }, s.prototype.createGroup = function (e) {
      var t = c.encodeUri("/create_group");return this._http.authedRequest(undefined, "POST", t, undefined, e);
    }, s.prototype.getPublicisedGroups = function (e) {
      var t = c.encodeUri("/publicised_groups");return this._http.authedRequest(undefined, "POST", t, undefined, { user_ids: e });
    }, s.prototype.setGroupPublicity = function (e, t) {
      var n = c.encodeUri("/groups/$groupId/self/update_publicity", { $groupId: e });return this._http.authedRequest(undefined, "PUT", n, undefined, { publicise: t });
    }, s.prototype.getStateEvent = function (e, t, n, r) {
      var o = { $roomId: e, $eventType: t, $stateKey: n },
          i = c.encodeUri("/rooms/$roomId/state/$eventType", o);return undefined !== n && (i = c.encodeUri(i + "/$stateKey", o)), this._http.authedRequest(r, "GET", i);
    }, s.prototype.sendStateEvent = function (e, t, n, r, o) {
      var i = { $roomId: e, $eventType: t, $stateKey: r },
          s = c.encodeUri("/rooms/$roomId/state/$eventType", i);return undefined !== r && (s = c.encodeUri(s + "/$stateKey", i)), this._http.authedRequest(o, "PUT", s, undefined, n);
    }, s.prototype.redactEvent = function (e, t, n) {
      var r = c.encodeUri("/rooms/$roomId/redact/$eventId", { $roomId: e, $eventId: t });return this._http.authedRequest(n, "POST", r, undefined, {});
    }, s.prototype.roomInitialSync = function (e, t, n) {
      c.isFunction(t) && (n = t, t = undefined);var r = c.encodeUri("/rooms/$roomId/initialSync", { $roomId: e });return t = t || 30, this._http.authedRequest(n, "GET", r, { limit: t });
    }, s.prototype.setRoomReadMarkersHttpRequest = function (e, t, n) {
      var r = c.encodeUri("/rooms/$roomId/read_markers", { $roomId: e }),
          o = { "m.fully_read": t, "m.read": n };return this._http.authedRequest(undefined, "POST", r, undefined, o);
    }, s.prototype.getJoinedRooms = function () {
      var e = c.encodeUri("/joined_rooms");return this._http.authedRequest(undefined, "GET", e);
    }, s.prototype.getJoinedRoomMembers = function (e) {
      var t = c.encodeUri("/rooms/$roomId/joined_members", { $roomId: e });return this._http.authedRequest(undefined, "GET", t);
    }, s.prototype.publicRooms = function (e, t) {
      "function" == typeof e && (t = e, e = {}), undefined === e && (e = {});var n = {};return e.server && (n.server = e.server, delete e.server), 0 === (0, o.default)(e).length && 0 === (0, o.default)(n).length ? this._http.authedRequest(t, "GET", "/publicRooms") : this._http.authedRequest(t, "POST", "/publicRooms", n, e);
    }, s.prototype.createAlias = function (e, t, n) {
      var r = c.encodeUri("/directory/room/$alias", { $alias: e }),
          o = { room_id: t };return this._http.authedRequest(n, "PUT", r, undefined, o);
    }, s.prototype.deleteAlias = function (e, t) {
      var n = c.encodeUri("/directory/room/$alias", { $alias: e });return this._http.authedRequest(t, "DELETE", n, undefined, undefined);
    }, s.prototype.getRoomIdForAlias = function (e, t) {
      var n = c.encodeUri("/directory/room/$alias", { $alias: e });return this._http.authedRequest(t, "GET", n);
    }, s.prototype.resolveRoomAlias = function (e, t) {
      var n = c.encodeUri("/directory/room/$alias", { $alias: e });return this._http.request(t, "GET", n);
    }, s.prototype.getRoomDirectoryVisibility = function (e, t) {
      var n = c.encodeUri("/directory/list/room/$roomId", { $roomId: e });return this._http.authedRequest(t, "GET", n);
    }, s.prototype.setRoomDirectoryVisibility = function (e, t, n) {
      var r = c.encodeUri("/directory/list/room/$roomId", { $roomId: e });return this._http.authedRequest(n, "PUT", r, undefined, { visibility: t });
    }, s.prototype.setRoomDirectoryVisibilityAppService = function (e, t, n, r) {
      var o = c.encodeUri("/directory/list/appservice/$networkId/$roomId", { $networkId: e, $roomId: t });return this._http.authedRequest(r, "PUT", o, undefined, { visibility: n });
    }, s.prototype.searchUserDirectory = function (e) {
      var t = { search_term: e.term };return undefined !== e.limit && (t.limit = e.limit), this._http.authedRequest(undefined, "POST", "/user_directory/search", undefined, t);
    }, s.prototype.uploadContent = function (e, t) {
      return this._http.uploadContent(e, t);
    }, s.prototype.cancelUpload = function (e) {
      return this._http.cancelUpload(e);
    }, s.prototype.getCurrentUploads = function () {
      return this._http.getCurrentUploads();
    }, s.prototype.getProfileInfo = function (e, t, n) {
      c.isFunction(t) && (n = t, t = undefined);var r = t ? c.encodeUri("/profile/$userId/$info", { $userId: e, $info: t }) : c.encodeUri("/profile/$userId", { $userId: e });return this._http.authedRequest(n, "GET", r);
    }, s.prototype.getThreePids = function (e) {
      return this._http.authedRequest(e, "GET", "/account/3pid", undefined, undefined);
    }, s.prototype.addThreePid = function (e, t, n) {
      var r = { threePidCreds: e, bind: t };return this._http.authedRequest(n, "POST", "/account/3pid", null, r);
    }, s.prototype.deleteThreePid = function (e, t) {
      var n = { medium: e, address: t };return this._http.authedRequestWithPrefix(undefined, "POST", "/account/3pid/delete", null, n, u.PREFIX_UNSTABLE);
    }, s.prototype.setPassword = function (e, t, n) {
      var r = { auth: e, new_password: t };return this._http.authedRequest(n, "POST", "/account/password", null, r);
    }, s.prototype.getDevices = function () {
      return this._http.authedRequestWithPrefix(undefined, "GET", "/devices", undefined, undefined, u.PREFIX_UNSTABLE);
    }, s.prototype.setDeviceDetails = function (e, t) {
      var n = c.encodeUri("/devices/$device_id", { $device_id: e });return this._http.authedRequestWithPrefix(undefined, "PUT", n, undefined, t, u.PREFIX_UNSTABLE);
    }, s.prototype.deleteDevice = function (e, t) {
      var n = c.encodeUri("/devices/$device_id", { $device_id: e }),
          r = {};return t && (r.auth = t), this._http.authedRequestWithPrefix(undefined, "DELETE", n, undefined, r, u.PREFIX_UNSTABLE);
    }, s.prototype.deleteMultipleDevices = function (e, t) {
      var n = { devices: e };return t && (n.auth = t), this._http.authedRequestWithPrefix(undefined, "POST", "/delete_devices", undefined, n, u.PREFIX_UNSTABLE);
    }, s.prototype.getPushers = function (e) {
      return this._http.authedRequest(e, "GET", "/pushers", undefined, undefined);
    }, s.prototype.setPusher = function (e, t) {
      return this._http.authedRequest(t, "POST", "/pushers/set", null, e);
    }, s.prototype.getPushRules = function (e) {
      return this._http.authedRequest(e, "GET", "/pushrules/");
    }, s.prototype.addPushRule = function (e, t, n, r, o) {
      var i = c.encodeUri("/pushrules/" + e + "/$kind/$ruleId", { $kind: t, $ruleId: n });return this._http.authedRequest(o, "PUT", i, undefined, r);
    }, s.prototype.deletePushRule = function (e, t, n, r) {
      var o = c.encodeUri("/pushrules/" + e + "/$kind/$ruleId", { $kind: t, $ruleId: n });return this._http.authedRequest(r, "DELETE", o);
    }, s.prototype.setPushRuleEnabled = function (e, t, n, r, o) {
      var i = c.encodeUri("/pushrules/" + e + "/$kind/$ruleId/enabled", { $kind: t, $ruleId: n });return this._http.authedRequest(o, "PUT", i, undefined, { enabled: r });
    }, s.prototype.setPushRuleActions = function (e, t, n, r, o) {
      var i = c.encodeUri("/pushrules/" + e + "/$kind/$ruleId/actions", { $kind: t, $ruleId: n });return this._http.authedRequest(o, "PUT", i, undefined, { actions: r });
    }, s.prototype.search = function (e, t) {
      var n = {};return e.next_batch && (n.next_batch = e.next_batch), this._http.authedRequest(t, "POST", "/search", n, e.body);
    }, s.prototype.uploadKeysRequest = function (e, t, n) {
      var r,
          o = (t = t || {}).device_id;return r = o ? c.encodeUri("/keys/upload/$deviceId", { $deviceId: o }) : "/keys/upload", this._http.authedRequestWithPrefix(n, "POST", r, undefined, e, u.PREFIX_UNSTABLE);
    }, s.prototype.downloadKeysForUsers = function (e, t) {
      if (c.isFunction(t)) throw new Error("downloadKeysForUsers no longer accepts a callback parameter");var n = { device_keys: {} };return "token" in (t = t || {}) && (n.token = t.token), e.forEach(function (e) {
        n.device_keys[e] = {};
      }), this._http.authedRequestWithPrefix(undefined, "POST", "/keys/query", undefined, n, u.PREFIX_UNSTABLE);
    }, s.prototype.claimOneTimeKeys = function (e, t) {
      var n = {};undefined === t && (t = "signed_curve25519");for (var r = 0; r < e.length; ++r) {
        var o = e[r][0],
            i = e[r][1],
            s = n[o] || {};(n[o] = s)[i] = t;
      }var a = { one_time_keys: n };return this._http.authedRequestWithPrefix(undefined, "POST", "/keys/claim", undefined, a, u.PREFIX_UNSTABLE);
    }, s.prototype.getKeyChanges = function (e, t) {
      var n = { from: e, to: t };return this._http.authedRequestWithPrefix(undefined, "GET", "/keys/changes", n, undefined, u.PREFIX_UNSTABLE);
    }, s.prototype.requestEmailToken = function (e, t, n, r, o) {
      var i = { client_secret: t, email: e, send_attempt: n, next_link: r };return this._http.idServerRequest(o, "POST", "/validate/email/requestToken", i, u.PREFIX_IDENTITY_V1);
    }, s.prototype.submitMsisdnToken = function (e, t, n) {
      var r = { sid: e, client_secret: t, token: n };return this._http.idServerRequest(undefined, "POST", "/validate/msisdn/submitToken", r, u.PREFIX_IDENTITY_V1);
    }, s.prototype.lookupThreePid = function (e, t, n) {
      var r = { medium: e, address: t };return this._http.idServerRequest(n, "GET", "/lookup", r, u.PREFIX_IDENTITY_V1);
    }, s.prototype.sendToDevice = function (e, t, n) {
      var r = c.encodeUri("/sendToDevice/$eventType/$txnId", { $eventType: e, $txnId: n || this.makeTxnId() }),
          o = { messages: t };return this._http.authedRequestWithPrefix(undefined, "PUT", r, undefined, o, u.PREFIX_UNSTABLE);
    }, s.prototype.getThirdpartyProtocols = function () {
      return this._http.authedRequestWithPrefix(undefined, "GET", "/thirdparty/protocols", undefined, undefined, u.PREFIX_UNSTABLE).then(function (e) {
        if (!e || "object" !== (undefined === e ? "undefined" : (0, r.default)(e))) throw new Error("/thirdparty/protocols did not return an object: " + e);return e;
      });
    }, s.prototype.getThirdpartyLocation = function (e, t) {
      var n = c.encodeUri("/thirdparty/location/$protocol", { $protocol: e });return this._http.authedRequestWithPrefix(undefined, "GET", n, t, undefined, u.PREFIX_UNSTABLE);
    }, e.exports = s;
  }, function (e, t, n) {
    "use strict";
    var r,
        o = (r = n(7)) && r.__esModule ? r : { default: r },
        a = n(1),
        i = false;function s(e, t) {
      this.retryAlgorithm = e || s.RETRY_BACKOFF_RATELIMIT, this.queueAlgorithm = t || s.QUEUE_MESSAGES, this._queues = {}, this._activeQueues = [], this._procFn = null;
    }function u(t) {
      t._procFn && a.forEach(a.filter(a.keys(t._queues), function (e) {
        return -1 === t._activeQueues.indexOf(e) && 0 < t._queues[e].length;
      }), function (e) {
        t._activeQueues.push(e), l("Spinning up queue: '%s'", e), function n(r, o) {
          var e,
              t,
              i = (e = o, t = r._queues[e], a.isArray(t) ? t[0] : null);if (!i) {
            var s = r._activeQueues.indexOf(o);return 0 <= s && r._activeQueues.splice(s, 1), undefined;
          }l("Queue '%s' has %s pending events", o, r._queues[o].length), r._procFn(i.event).done(function (e) {
            c(r, o), l("Queue '%s' sent event %s", o, i.event.getId()), i.defer.resolve(e), n(r, o);
          }, function (e) {
            i.attempts += 1;var t = r.retryAlgorithm(i.event, i.attempts, e);l("retry(%s) err=%s event_id=%s waitTime=%s", i.attempts, e, i.event.getId(), t), -1 === t ? (l("Queue '%s' giving up on event %s", o, i.event.getId()), c(r, o), i.defer.reject(e), n(r, o)) : setTimeout(function () {
              n(r, o);
            }, t);
          });
        }(t, e);
      });
    }function c(e, t) {
      var n = e._queues[t];return a.isArray(n) ? n.shift() : null;
    }function l() {
      var e;false;
    }s.prototype.getQueueForEvent = function (e) {
      var t = this.queueAlgorithm(e);return t && this._queues[t] ? a.map(this._queues[t], function (e) {
        return e.event;
      }) : null;
    }, s.prototype.removeEventFromQueue = function (t) {
      var e = this.queueAlgorithm(t);if (!e || !this._queues[e]) return false;var n = false;return a.removeElement(this._queues[e], function (e) {
        if (e.event.getId() === t.getId()) return n = true;
      }), n;
    }, s.prototype.setProcessFunction = function (e) {
      this._procFn = e, u(this);
    }, s.prototype.queueEvent = function (e) {
      var t = this.queueAlgorithm(e);if (!t) return null;this._queues[t] || (this._queues[t] = []);var n = o.default.defer();return this._queues[t].push({ event: e, defer: n, attempts: 0 }), l("Queue algorithm dumped event %s into queue '%s'", e.getId(), t), u(this), n.promise;
    }, s.RETRY_BACKOFF_RATELIMIT = function (e, t, n) {
      if (400 === n.httpStatus || 403 === n.httpStatus || 401 === n.httpStatus) return -1;if ("rejected" === n.cors) return -1;if ("M_LIMIT_EXCEEDED" === n.name) {
        var r = n.data.retry_after_ms;if (r) return r;
      }return 4 < t ? -1 : 1e3 * Math.pow(2, t);
    }, s.QUEUE_MESSAGES = function (e) {
      return "m.room.message" === e.getType() ? "message" : null;
    }, e.exports = s;
  }, function (e, t, n) {
    "use strict";
    var r,
        p = (r = n(11)) && r.__esModule ? r : { default: r },
        o = n(1),
        i = false,
        s = "session.e2e.";function a(e) {
      if (this.store = e, !(o.isFunction(e.getItem) && o.isFunction(e.setItem) && o.isFunction(e.removeItem) && o.isFunction(e.key) && "number" == typeof e.length)) throw new Error("Supplied webStore does not meet the WebStorage API interface");
    }a.prototype = { removeEndToEndAccount: function () {
        this.store.removeItem(u);
      }, getEndToEndAccount: function () {
        return this.store.getItem(u);
      }, getAllEndToEndDevices: function () {
        for (var e = f(""), t = {}, n = 0; n < this.store.length; ++n) {
          var r = this.store.key(n),
              o = r.substr(e.length);r.startsWith(e) && (t[o] = v(this.store, r));
        }return t;
      }, getEndToEndDeviceTrackingStatus: function () {
        return v(this.store, l);
      }, getEndToEndDeviceSyncToken: function () {
        return v(this.store, c);
      }, removeEndToEndDeviceData: function () {
        y(this.store, f("")), y(this.store, l), y(this.store, c);
      }, getEndToEndSessions: function (e) {
        return v(this.store, h(e));
      }, getAllEndToEndSessions: function () {
        var e = m(this.store, h("")),
            t = {},
            n = true,
            r = false,
            o = undefined;try {
          for (var i, s = (0, p.default)(e); !(n = (i = s.next()).done); n = true) {
            var a = i.value;t[a.substr(h("").length)] = v(this.store, a);
          }
        } catch (e) {
          r = true, o = e;
        } finally {
          try {
            !n && s.return && s.return();
          } finally {
            if (r) throw o;
          }
        }return t;
      }, removeAllEndToEndSessions: function () {
        y(this.store, h(""));
      }, getAllEndToEndInboundGroupSessionKeys: function () {
        for (var e = "session.e2e.inboundgroupsessions/", t = [], n = 0; n < this.store.length; n++) {
          var r = this.store.key(n);r.startsWith(e) && t.push({ senderKey: r.substr(e.length, 43), sessionId: r.substr(e.length + 44) });
        }return t;
      }, getEndToEndInboundGroupSession: function (e, t) {
        var n = "session.e2e.inboundgroupsessions/" + e + "/" + t;return this.store.getItem(n);
      }, removeAllEndToEndInboundGroupSessions: function () {
        y(this.store, "session.e2e.inboundgroupsessions/");
      }, getAllEndToEndRooms: function () {
        var e = m(this.store, d("")),
            t = {},
            n = true,
            r = false,
            o = undefined;try {
          for (var i, s = (0, p.default)(e); !(n = (i = s.next()).done); n = true) {
            var a = i.value;t[a.substr(d("").length)] = v(this.store, a);
          }
        } catch (e) {
          r = true, o = e;
        } finally {
          try {
            !n && s.return && s.return();
          } finally {
            if (r) throw o;
          }
        }return t;
      }, removeAllEndToEndRooms: function () {
        y(this.store, d(""));
      } };var u = "session.e2e.account",
        c = "session.e2e.device_sync_token",
        l = "session.e2e.device_tracking";function f(e) {
      return "session.e2e.devices/" + e;
    }function h(e) {
      return "session.e2e.sessions/" + e;
    }function d(e) {
      return "session.e2e.rooms/" + e;
    }function v(e, t) {
      try {
        return JSON.parse(e.getItem(t));
      } catch (e) {
        _("Failed to get key %s: %s", t, e), _(e.stack);
      }return null;
    }function m(e, t) {
      for (var n = [], r = 0; r < e.length; ++r) {
        var o = e.key(r);o.startsWith(t) && n.push(o);
      }return n;
    }function y(e, t) {
      for (var n = [], r = 0; r < e.length; ++r) {
        var o = e.key(r);o.startsWith(t) && n.push(o);
      }var i = true,
          s = false,
          a = undefined;try {
        for (var u, c = (0, p.default)(n); !(i = (u = c.next()).done); i = true) {
          var l = u.value;e.removeItem(l);
        }
      } catch (e) {
        s = true, a = e;
      } finally {
        try {
          !i && c.return && c.return();
        } finally {
          if (s) throw a;
        }
      }
    }function _() {
      var e;false;
    }e.exports = a;
  }, function (e, t, n) {
    "use strict";
    var r,
        c = (r = n(7)) && r.__esModule ? r : { default: r },
        l = n(24);function o(e, t, n) {
      n = n || {}, this._client = e, this._timelineSet = t, this._start = null, this._end = null, this._eventCount = 0, this._windowLimit = n.windowLimit || 1e3;
    }function p(e, t) {
      this.timeline = e, this.index = t;
    }o.prototype.load = function (s, a) {
      var u = this;function e(e) {
        var t = undefined,
            n = e.getEvents();if (s) {
          for (var r = 0; r < n.length; r++) if (n[r].getId() == s) {
            t = r;break;
          }if (undefined === t) throw new Error("getEventTimeline result didn't include requested event");
        } else t = n.length;var o = Math.min(n.length, t + Math.ceil(a / 2)),
            i = Math.max(0, o - a);u._start = new p(e, i - e.getBaseIndex()), u._end = new p(e, o - e.getBaseIndex()), u._eventCount = o - i;
      }if (a = a || 20, s) {
        var t = this._client.getEventTimeline(this._timelineSet, s);return t.isFulfilled() ? (e(t.value()), c.default.resolve()) : t.then(e);
      }return e(this._timelineSet.getLiveTimeline()), c.default.resolve();
    }, o.prototype.canPaginate = function (e) {
      var t = undefined;if (e == l.BACKWARDS) t = this._start;else {
        if (e != l.FORWARDS) throw new Error("Invalid direction '" + e + "'");t = this._end;
      }if (!t) return false;if (e == l.BACKWARDS) {
        if (t.index > t.minIndex()) return true;
      } else if (t.index < t.maxIndex()) return true;return Boolean(t.timeline.getNeighbouringTimeline(e) || t.timeline.getPaginationToken(e));
    }, o.prototype.paginate = function (t, n, e, r) {
      undefined === e && (e = true), undefined === r && (r = 5);var o = undefined;if (t == l.BACKWARDS) o = this._start;else {
        if (t != l.FORWARDS) throw new Error("Invalid direction '" + t + "'");o = this._end;
      }if (!o) return c.default.resolve(false);if (o.pendingPaginate) return o.pendingPaginate;var i = t == l.BACKWARDS ? o.retreat(n) : o.advance(n);if (i) {
        this._eventCount += i, this._eventCount;var s = this._eventCount - this._windowLimit;return 0 < s && this.unpaginate(s, t != l.BACKWARDS), c.default.resolve(true);
      }if (!e || 0 === r) return c.default.resolve(false);if (!o.timeline.getPaginationToken(t)) return c.default.resolve(false);var a = this,
          u = this._client.paginateEventTimeline(o.timeline, { backwards: t == l.BACKWARDS, limit: n }).finally(function () {
        o.pendingPaginate = null;
      }).then(function (e) {
        return !!e && a.paginate(t, n, true, r - 1);
      });return o.pendingPaginate = u;
    }, o.prototype.unpaginate = function (e, t) {
      var n = t ? this._start : this._end;if (e > this._eventCount || e < 0) throw new Error("Attemting to unpaginate " + e + " events, but only have " + this._eventCount + " in the timeline");for (; 0 < e;) {
        var r = t ? n.advance(e) : n.retreat(e);if (r <= 0) throw new Error("Unable to unpaginate any further, but still have " + this._eventCount + " events");e -= r, this._eventCount -= r, this._eventCount;
      }
    }, o.prototype.getEvents = function () {
      if (!this._start) return [];for (var e = [], t = this._start.timeline;;) {
        var n = t.getEvents(),
            r = 0,
            o = n.length;t === this._start.timeline && (r = this._start.index + t.getBaseIndex()), t === this._end.timeline && (o = this._end.index + t.getBaseIndex());for (var i = r; i < o; i++) e.push(n[i]);if (t === this._end.timeline) break;t = t.getNeighbouringTimeline(l.FORWARDS);
      }return e;
    }, p.prototype.minIndex = function () {
      return -1 * this.timeline.getBaseIndex();
    }, p.prototype.maxIndex = function () {
      return this.timeline.getEvents().length - this.timeline.getBaseIndex();
    }, p.prototype.advance = function (e) {
      if (!e) return 0;var t = undefined;if (e < 0) {
        if ((t = Math.max(e, this.minIndex() - this.index)) < 0) return this.index += t, t;
      } else if (0 < (t = Math.min(e, this.maxIndex() - this.index))) return this.index += t, t;var n = this.timeline.getNeighbouringTimeline(e < 0 ? l.BACKWARDS : l.FORWARDS);return n ? (this.timeline = n, this.index = e < 0 ? this.maxIndex() : this.minIndex(), this.advance(e)) : 0;
    }, p.prototype.retreat = function (e) {
      return -1 * this.advance(-1 * e);
    }, e.exports.TimelineWindow = o, e.exports.TimelineIndex = p;
  }, function (e, t, n) {
    "use strict";
    var _ = o(n(11)),
        r = o(n(35)),
        i = o(n(7));function o(e) {
      return e && e.__esModule ? e : { default: e };
    }var s = n(97),
        a = n(1);function u(e) {
      this._matrixClient = e.matrixClient, this._data = e.authData || {}, this._requestCallback = e.doRequest, this._stateUpdatedCallback = e.stateUpdated || e.startAuthStage, this._completionDeferred = null, this._inputs = e.inputs || {}, e.sessionId && (this._data.session = e.sessionId), this._clientSecret = e.clientSecret || this._matrixClient.generateClientSecret(), this._emailSid = e.emailSid, undefined === this._emailSid && (this._emailSid = null), this._currentStage = null;
    }u.prototype = { attemptAuth: function () {
        var e = this;return this._completionDeferred = i.default.defer(), i.default.resolve().then(function () {
          return e._data.flows ? e._startNextAuthStage() : e._doRequest(e._data), e._completionDeferred.promise;
        });
      }, poll: function () {
        if (this._data.session) {
          var e = {};if ("m.login.email.identity" == this._currentStage && this._emailSid) {
            var t = s.parse(this._matrixClient.getIdentityServerUrl());e = { type: "m.login.email.identity", threepid_creds: { sid: this._emailSid, client_secret: this._clientSecret, id_server: t.host } };
          }this.submitAuthDict(e, true);
        }
      }, getSessionId: function () {
        return this._data ? this._data.session : undefined;
      }, getClientSecret: function () {
        return this._clientSecret;
      }, getStageParams: function (e) {
        var t = {};return this._data && this._data.params && (t = this._data.params), t[e];
      }, submitAuthDict: function (e, t) {
        if (!this._completionDeferred) throw new Error("submitAuthDict() called before attemptAuth()");var n = { session: this._data.session };a.extend(n, e), this._doRequest(n, t);
      }, getEmailSid: function () {
        return this._emailSid;
      }, setEmailSid: function (e) {
        this._emailSid = e;
      }, _doRequest: function (e, t) {
        var n = this,
            r = this,
            o = undefined;try {
          o = this._requestCallback(e, t);
        } catch (e) {
          o = i.default.reject(e);
        }o = o.then(function (e) {
          console.log("result from request: ", e), r._completionDeferred.resolve(e);
        }, function (e) {
          var t = e.data ? e.data.flows : null,
              n = Boolean(r._data.flows) || Boolean(t);if (401 !== e.httpStatus || !e.data || !n) throw e;e.data.flows || e.data.completed || e.data.session || (e.data.flows = r._data.flows, e.data.completed = r._data.completed, e.data.session = r._data.session), r._data = e.data, r._startNextAuthStage();
        }), (o = t ? o.catch(function (e) {
          console.log("Ignoring error from UI auth: " + e);
        }) : o.catch(function (e) {
          n._completionDeferred.reject(e);
        })).done();
      }, _startNextAuthStage: function () {
        var e = this._chooseStage();if (!e) throw new Error("No incomplete flows from the server");if ("m.login.dummy" != (this._currentStage = e)) {
          if (this._data.errcode || this._data.error) this._stateUpdatedCallback(e, { errcode: this._data.errcode || "", error: this._data.error || "" });else {
            var t = {};"m.login.email.identity" == e && (t.emailSid = this._emailSid), this._stateUpdatedCallback(e, t);
          }
        } else this.submitAuthDict({ type: "m.login.dummy" });
      }, _chooseStage: function () {
        var e = this._chooseFlow();console.log("Active flow => %s", (0, r.default)(e));var t = this._firstUncompletedStage(e);return console.log("Next stage: %s", t), t;
      }, _chooseFlow: function () {
        var e = this._data.flows || [],
            t = Boolean(this._inputs.emailAddress) || Boolean(this._emailSid),
            n = Boolean(this._inputs.phoneCountry) && Boolean(this._inputs.phoneNumber),
            r = true,
            o = false,
            i = undefined;try {
          for (var s, a = (0, _.default)(e); !(r = (s = a.next()).done); r = true) {
            var u = s.value,
                c = false,
                l = false,
                p = true,
                f = false,
                h = undefined;try {
              for (var d, v = (0, _.default)(u.stages); !(p = (d = v.next()).done); p = true) {
                var m = d.value;"m.login.email.identity" === m ? c = true : "m.login.msisdn" == m && (l = true);
              }
            } catch (y) {
              f = true, h = y;
            } finally {
              try {
                !p && v.return && v.return();
              } finally {
                if (f) throw h;
              }
            }if (c == t && l == n) return u;
          }
        } catch (y) {
          o = true, i = y;
        } finally {
          try {
            !r && a.return && a.return();
          } finally {
            if (o) throw i;
          }
        }var y = new Error("No appropriate authentication flow found");throw y.name = "NoAuthFlowFoundError", y.required_stages = [], t && y.required_stages.push("m.login.email.identity"), n && y.required_stages.push("m.login.msisdn"), y.available_flows = e, y;
      }, _firstUncompletedStage: function (e) {
        for (var t = (this._data || {}).completed || [], n = 0; n < e.stages.length; ++n) {
          var r = e.stages[n];if (-1 === t.indexOf(r)) return r;
        }
      } }, e.exports = u;
  }, function (e, t, n) {
    var r, o;undefined !== (o = "function" == typeof (r = function () {
      var c = XMLHttpRequest;if (!c) throw new Error("missing XMLHttpRequest");function l(e, t) {
        if ("function" != typeof t) throw new Error("Bad callback given: " + t);if (!e) throw new Error("No options given");var n = e.onResponse;if ((e = "string" == typeof e ? { uri: e } : JSON.parse(JSON.stringify(e))).onResponse = n, e.verbose && (l.log = function () {
          var e,
              t,
              n = {},
              r = ["trace", "debug", "info", "warn", "error"];for (t = 0; t < r.length; t++) n[e = r[t]] = f, "undefined" != typeof console && console && console[e] && (n[e] = h(console, e));return n;
        }()), e.url && (e.uri = e.url, delete e.url), !e.uri && "" !== e.uri) throw new Error("options.uri is a required argument");if ("string" != typeof e.uri) throw new Error("options.uri must be a string");for (var r = ["proxy", "_redirectsFollowed", "maxRedirects", "followRedirect"], o = 0; o < r.length; o++) if (e[r[o]]) throw new Error("options." + r[o] + " is not supported");if (e.callback = t, e.method = e.method || "GET", e.headers = e.headers || {}, e.body = e.body || null, e.timeout = e.timeout || l.DEFAULT_TIMEOUT, e.headers.host) throw new Error("Options.headers.host is not supported");function i(e) {
          var t = [];for (var n in e) e.hasOwnProperty(n) && t.push(encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));return t.join("&");
        }if (e.json && (e.headers.accept = e.headers.accept || "application/json", "GET" !== e.method && (e.headers["content-type"] = "application/json"), "boolean" != typeof e.json ? e.body = JSON.stringify(e.json) : "string" != typeof e.body && (e.body = JSON.stringify(e.body))), e.qs) {
          var s = "string" == typeof e.qs ? e.qs : i(e.qs);-1 !== e.uri.indexOf("?") ? e.uri = e.uri + "&" + s : e.uri = e.uri + "?" + s;
        }if (e.form) {
          if ("string" == typeof e.form) throw "form name unsupported";if ("POST" === e.method) {
            var a = (e.encoding || "application/x-www-form-urlencoded").toLowerCase();switch (e.headers["content-type"] = a) {case "application/x-www-form-urlencoded":
                e.body = i(e.form).replace(/%20/g, "+");break;case "multipart/form-data":
                var u = function (e) {
                  var t = {};t.boundry = "-------------------------------" + Math.floor(1e9 * Math.random());var n = [];for (var r in e) e.hasOwnProperty(r) && n.push("--" + t.boundry + '\nContent-Disposition: form-data; name="' + r + '"\n\n' + e[r] + "\n");return n.push("--" + t.boundry + "--"), t.body = n.join(""), t.length = t.body.length, t.type = "multipart/form-data; boundary=" + t.boundry, t;
                }(e.form);e.body = u.body, e.headers["content-type"] = u.type;break;default:
                throw new Error("unsupported encoding:" + a);}
          }
        }return e.onResponse = e.onResponse || f, true === e.onResponse && (e.onResponse = t, e.callback = f), !e.headers.authorization && e.auth && (e.headers.authorization = "Basic " + function (e) {
          var t,
              n,
              r,
              o,
              i,
              s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
              a = 0,
              u = 0,
              c = "",
              l = [];if (!e) return e;for (; t = (i = e.charCodeAt(a++) << 16 | e.charCodeAt(a++) << 8 | e.charCodeAt(a++)) >> 18 & 63, n = i >> 12 & 63, r = i >> 6 & 63, o = 63 & i, l[u++] = s.charAt(t) + s.charAt(n) + s.charAt(r) + s.charAt(o), a < e.length;);switch (c = l.join(""), e.length % 3) {case 1:
              c = c.slice(0, -2) + "==";break;case 2:
              c = c.slice(0, -1) + "=";}return c;
        }(e.auth.username + ":" + e.auth.password)), function (n) {
          var r = new c(),
              o = false,
              t = function (e) {
            var t,
                n = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/;try {
              t = location.href;
            } catch (e) {
              (t = document.createElement("a")).href = "", t = t.href;
            }var r = n.exec(t.toLowerCase()) || [],
                o = n.exec(e.toLowerCase());return !(!o || o[1] == r[1] && o[2] == r[2] && (o[3] || ("http:" === o[1] ? 80 : 443)) == (r[3] || ("http:" === r[1] ? 80 : 443)));
          }(n.uri),
              e = "withCredentials" in r;if (p += 1, r.seq_id = p, r.id = p + ": " + n.method + " " + n.uri, r._id = r.id, t && !e) {
            var i = new Error("Browser does not support cross-origin request: " + n.uri);return i.cors = "unsupported", n.callback(i, r);
          }r.timeoutTimer = setTimeout(function () {
            o = true;var e = new Error("ETIMEDOUT");return e.code = "ETIMEDOUT", e.duration = n.timeout, l.log.error("Timeout", { id: r._id, milliseconds: n.timeout }), n.callback(e, r);
          }, n.timeout);var s = { response: false, loading: false, end: false };return r.onreadystatechange = function (e) {
            if (o) return l.log.debug("Ignoring timed out state change", { state: r.readyState, id: r.id });if (l.log.debug("State change", { state: r.readyState, id: r.id, timed_out: o }), r.readyState === c.OPENED) for (var t in l.log.debug("Request started", { id: r.id }), n.headers) r.setRequestHeader(t, n.headers[t]);else r.readyState === c.HEADERS_RECEIVED ? a() : r.readyState === c.LOADING ? (a(), u()) : r.readyState === c.DONE && (a(), u(), function () {
              if (!s.end) {
                if (s.end = true, l.log.debug("Request done", { id: r.id }), r.body = r.responseText, n.json) try {
                  r.body = JSON.parse(r.responseText);
                } catch (e) {
                  return n.callback(e, r);
                }n.callback(null, r, r.body);
              }
            }());
          }, r.open(n.method, n.uri, true), t && (r.withCredentials = !!n.withCredentials), r.send(n.body), r;function a() {
            if (!s.response) {
              if (s.response = true, l.log.debug("Got response", { id: r.id, status: r.status }), clearTimeout(r.timeoutTimer), r.statusCode = r.status, t && 0 == r.statusCode) {
                var e = new Error("CORS request rejected: " + n.uri);return e.cors = "rejected", s.loading = true, s.end = true, n.callback(e, r);
              }n.onResponse(null, r);
            }
          }function u() {
            s.loading || (s.loading = true, l.log.debug("Response body loading", { id: r.id }));
          }
        }(e);
      }l.log = { trace: f, debug: f, info: f, warn: f, error: f };var p = 0;function f() {}function h(n, r) {
        return function (e, t) {
          return "object" == typeof t && (e += " " + JSON.stringify(t)), n[r].call(n, e);
        };
      }return l.withCredentials = false, l.DEFAULT_TIMEOUT = 18e4, l.defaults = function (o, e) {
        function t(r) {
          return function (e, t) {
            for (var n in e = "string" == typeof e ? { uri: e } : JSON.parse(JSON.stringify(e)), o) undefined === e[n] && (e[n] = o[n]);return r(e, t);
          };
        }var n = t(l);return n.get = t(l.get), n.post = t(l.post), n.put = t(l.put), n.head = t(l.head), n;
      }, ["get", "put", "post", "head"].forEach(function (e) {
        var n = e.toUpperCase();l[e.toLowerCase()] = function (e) {
          "string" == typeof e ? e = { method: n, uri: e } : (e = JSON.parse(JSON.stringify(e))).method = n;var t = [e].concat(Array.prototype.slice.apply(arguments, [1]));return l.apply(this, t);
        };
      }), l.couch = function (e, o) {
        return "string" == typeof e && (e = { uri: e }), e.json = true, e.body && (e.json = e.body), delete e.body, o = o || f, l(e, function (e, t, n) {
          if (e) return o(e, t, n);if ((t.statusCode < 200 || 299 < t.statusCode) && n.error) {
            for (var r in e = new Error("CouchDB error: " + (n.error.reason || n.error.error)), n) e[r] = n[r];return o(e, t, n);
          }return o(e, t, n);
        });
      }, l;
    }) ? r.apply(t, []) : r) && (e.exports = o);
  }, function (e, t, n) {
    "use strict";
    var r = n(219),
        o = n(220),
        i = n(103);e.exports = { formats: i, parse: o, stringify: r };
  }, function (e, t, n) {
    "use strict";
    function T(e) {
      return (T = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e;
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
      })(e);
    }function x(e, t) {
      o.apply(e, r(t) ? t : [t]);
    }function k(e, t, n, r, o, i, s, a, u, c, l, p, f) {
      var h = e;if ("function" == typeof s ? h = s(t, h) : h instanceof Date && (h = c(h)), null === h) {
        if (r) return i && !p ? i(t, O.encoder, f) : t;h = "";
      }if ("string" == typeof h || "number" == typeof h || "boolean" == typeof h || R.isBuffer(h)) return i ? [l(p ? t : i(t, O.encoder, f)) + "=" + l(i(h, O.encoder, f))] : [l(t) + "=" + l(String(h))];var d,
          v = [];if (undefined === h) return v;if (Array.isArray(s)) d = s;else {
        var m = Object.keys(h);d = a ? m.sort(a) : m;
      }for (var y = 0; y < d.length; ++y) {
        var _ = d[y];o && null === h[_] || (Array.isArray(h) ? x(v, k(h[_], n(t, _), n, r, o, i, s, a, u, c, l, p, f)) : x(v, k(h[_], t + (u ? "." + _ : "[" + _ + "]"), n, r, o, i, s, a, u, c, l, p, f)));
      }return v;
    }var R = n(102),
        I = n(103),
        C = { brackets: function (e) {
        return e + "[]";
      }, indices: function (e, t) {
        return e + "[" + t + "]";
      }, repeat: function (e) {
        return e;
      } },
        r = Array.isArray,
        o = Array.prototype.push,
        i = Date.prototype.toISOString,
        O = { addQueryPrefix: false, allowDots: false, charset: "utf-8", charsetSentinel: false, delimiter: "&", encode: true, encoder: R.encode, encodeValuesOnly: false, indices: false, serializeDate: function (e) {
        return i.call(e);
      }, skipNulls: false, strictNullHandling: false };e.exports = function (e, t) {
      var n = e,
          r = t ? R.assign({}, t) : {};if (null !== r.encoder && undefined !== r.encoder && "function" != typeof r.encoder) throw new TypeError("Encoder has to be a function.");var o = undefined === r.delimiter ? O.delimiter : r.delimiter,
          i = "boolean" == typeof r.strictNullHandling ? r.strictNullHandling : O.strictNullHandling,
          s = "boolean" == typeof r.skipNulls ? r.skipNulls : O.skipNulls,
          a = "boolean" == typeof r.encode ? r.encode : O.encode,
          u = "function" == typeof r.encoder ? r.encoder : O.encoder,
          c = "function" == typeof r.sort ? r.sort : null,
          l = undefined === r.allowDots ? O.allowDots : !!r.allowDots,
          p = "function" == typeof r.serializeDate ? r.serializeDate : O.serializeDate,
          f = "boolean" == typeof r.encodeValuesOnly ? r.encodeValuesOnly : O.encodeValuesOnly,
          h = r.charset || O.charset;if (undefined !== r.charset && "utf-8" !== r.charset && "iso-8859-1" !== r.charset) throw new Error("The charset option must be either utf-8, iso-8859-1, or undefined");if (undefined === r.format) r.format = I.default;else if (!Object.prototype.hasOwnProperty.call(I.formatters, r.format)) throw new TypeError("Unknown format option provided.");var d,
          v,
          m = I.formatters[r.format];"function" == typeof r.filter ? n = (v = r.filter)("", n) : Array.isArray(r.filter) && (d = v = r.filter);var y,
          _ = [];if ("object" !== T(n) || null === n) return "";y = r.arrayFormat in C ? r.arrayFormat : "indices" in r ? r.indices ? "indices" : "repeat" : "indices";var g = C[y];d = d || Object.keys(n), c && d.sort(c);for (var b = 0; b < d.length; ++b) {
        var E = d[b];s && null === n[E] || x(_, k(n[E], E, g, i, s, a ? u : null, v, c, l, p, m, f, h));
      }var S = _.join(o),
          w = true === r.addQueryPrefix ? "?" : "";return r.charsetSentinel && (w += "iso-8859-1" === h ? "utf8=%26%2310003%3B&" : "utf8=%E2%9C%93&"), 0 < S.length ? w + S : "";
    };
  }, function (e, t, n) {
    "use strict";
    function c(e, c, t) {
      if (e) {
        var n = t.allowDots ? e.replace(/\.([^.[]+)/g, "[$1]") : e,
            r = /(\[[^[\]]*])/g,
            o = /(\[[^[\]]*])/.exec(n),
            i = o ? n.slice(0, o.index) : n,
            s = [];if (i) {
          if (!t.plainObjects && v.call(Object.prototype, i) && !t.allowPrototypes) return;s.push(i);
        }for (var a = 0; null !== (o = r.exec(n)) && a < t.depth;) {
          if (a += 1, !t.plainObjects && v.call(Object.prototype, o[1].slice(1, -1)) && !t.allowPrototypes) return;s.push(o[1]);
        }return o && s.push("[" + n.slice(o.index) + "]"), function (e, t, n) {
          for (var r = c, o = e.length - 1; 0 <= o; --o) {
            var i,
                s = e[o];if ("[]" === s && n.parseArrays) i = [].concat(r);else {
              i = n.plainObjects ? Object.create(null) : {};var a = "[" === s.charAt(0) && "]" === s.charAt(s.length - 1) ? s.slice(1, -1) : s,
                  u = parseInt(a, 10);n.parseArrays || "" !== a ? !isNaN(u) && s !== a && String(u) === a && 0 <= u && n.parseArrays && u <= n.arrayLimit ? (i = [])[u] = r : i[a] = r : i = { 0: r };
            }r = i;
          }return r;
        }(s, 0, t);
      }
    }var d = n(102),
        v = Object.prototype.hasOwnProperty,
        m = { allowDots: false, allowPrototypes: false, arrayLimit: 20, charset: "utf-8", charsetSentinel: false, decoder: d.decode, delimiter: "&", depth: 5, ignoreQueryPrefix: false, interpretNumericEntities: false, parameterLimit: 1e3, parseArrays: true, plainObjects: false, strictNullHandling: false };e.exports = function (e, t) {
      var n = t ? d.assign({}, t) : {};if (null !== n.decoder && undefined !== n.decoder && "function" != typeof n.decoder) throw new TypeError("Decoder has to be a function.");if (n.ignoreQueryPrefix = true === n.ignoreQueryPrefix, n.delimiter = "string" == typeof n.delimiter || d.isRegExp(n.delimiter) ? n.delimiter : m.delimiter, n.depth = "number" == typeof n.depth ? n.depth : m.depth, n.arrayLimit = "number" == typeof n.arrayLimit ? n.arrayLimit : m.arrayLimit, n.parseArrays = false !== n.parseArrays, n.decoder = "function" == typeof n.decoder ? n.decoder : m.decoder, n.allowDots = undefined === n.allowDots ? m.allowDots : !!n.allowDots, n.plainObjects = "boolean" == typeof n.plainObjects ? n.plainObjects : m.plainObjects, n.allowPrototypes = "boolean" == typeof n.allowPrototypes ? n.allowPrototypes : m.allowPrototypes, n.parameterLimit = "number" == typeof n.parameterLimit ? n.parameterLimit : m.parameterLimit, n.strictNullHandling = "boolean" == typeof n.strictNullHandling ? n.strictNullHandling : m.strictNullHandling, undefined !== n.charset && "utf-8" !== n.charset && "iso-8859-1" !== n.charset) throw new Error("The charset option must be either utf-8, iso-8859-1, or undefined");if (undefined === n.charset && (n.charset = m.charset), "" === e || null == e) return n.plainObjects ? Object.create(null) : {};for (var r = "string" == typeof e ? function (e, t) {
        var n,
            r = {},
            o = t.ignoreQueryPrefix ? e.replace(/^\?/, "") : e,
            i = t.parameterLimit === Infinity ? undefined : t.parameterLimit,
            s = o.split(t.delimiter, i),
            a = -1,
            u = t.charset;if (t.charsetSentinel) for (n = 0; n < s.length; ++n) 0 === s[n].indexOf("utf8=") && ("utf8=%E2%9C%93" === s[n] ? u = "utf-8" : "utf8=%26%2310003%3B" === s[n] && (u = "iso-8859-1"), a = n, n = s.length);for (n = 0; n < s.length; ++n) if (n !== a) {
          var c,
              l,
              p = s[n],
              f = p.indexOf("]="),
              h = -1 === f ? p.indexOf("=") : f + 1;(l = -1 === h ? (c = t.decoder(p, m.decoder, u), t.strictNullHandling ? null : "") : (c = t.decoder(p.slice(0, h), m.decoder, u), t.decoder(p.slice(h + 1), m.decoder, u))) && t.interpretNumericEntities && "iso-8859-1" === u && (l = l.replace(/&#(\d+);/g, function (e, t) {
            return String.fromCharCode(parseInt(t, 10));
          })), v.call(r, c) ? r[c] = d.combine(r[c], l) : r[c] = l;
        }return r;
      }(e, n) : e, o = n.plainObjects ? Object.create(null) : {}, i = Object.keys(r), s = 0; s < i.length; ++s) {
        var a = i[s],
            u = c(a, r[a], n);o = d.merge(o, u, n);
      }return d.compact(o);
    };
  }], o.c = r, o.d = function (e, t, n) {
    o.o(e, t) || Object.defineProperty(e, t, { enumerable: true, get: n });
  }, o.r = function (e) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: true });
  }, o.t = function (t, e) {
    if (1 & e && (t = o(t)), 8 & e) return t;if (4 & e && "object" == typeof t && t && t.__esModule) return t;var n = Object.create(null);if (o.r(n), Object.defineProperty(n, "default", { enumerable: true, value: t }), 2 & e && "string" != typeof t) for (var r in t) o.d(n, r, function (e) {
      return t[e];
    }.bind(null, r));return n;
  }, o.n = function (e) {
    var t = e && e.__esModule ? function () {
      return e.default;
    } : function () {
      return e;
    };return o.d(t, "a", t), t;
  }, o.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }, o.p = "", o(o.s = 105);function o(e) {
    if (r[e]) return r[e].exports;var t = r[e] = { i: e, l: false, exports: {} };return n[e].call(t.exports, t, t.exports, o), t.l = true, t.exports;
  }var n, r;
});