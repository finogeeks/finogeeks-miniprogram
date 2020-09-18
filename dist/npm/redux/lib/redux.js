"use strict";
function _interopDefault(e) {
  return e && "object" == typeof e && "default" in e ? e.default : e;
}Object.defineProperty(exports, "__esModule", { value: true });var $$observable = _interopDefault(require("../../symbol-observable/lib/index.js")),
    randomString = function () {
  return Math.random().toString(36).substring(7).split("").join(".");
},
    ActionTypes = { INIT: "@@redux/INIT" + randomString(), REPLACE: "@@redux/REPLACE" + randomString(), PROBE_UNKNOWN_ACTION: function () {
    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
  } };function isPlainObject(e) {
  if ("object" != typeof e || null === e) return false;for (var t = e; null !== Object.getPrototypeOf(t);) t = Object.getPrototypeOf(t);return Object.getPrototypeOf(e) === t;
}function createStore(e, t, r) {
  var n;if ("function" == typeof t && "function" == typeof r || "function" == typeof r && "function" == typeof arguments[3]) throw new Error("It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function.");if ("function" == typeof t && undefined === r && (r = t, t = undefined), undefined !== r) {
    if ("function" != typeof r) throw new Error("Expected the enhancer to be a function.");return r(createStore)(e, t);
  }if ("function" != typeof e) throw new Error("Expected the reducer to be a function.");var o = e,
      i = t,
      c = [],
      a = c,
      u = false;function s() {
    a === c && (a = c.slice());
  }function d() {
    if (u) throw new Error("You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");return i;
  }function f(t) {
    if ("function" != typeof t) throw new Error("Expected the listener to be a function.");if (u) throw new Error("You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api-reference/store#subscribe(listener) for more details.");var r = true;return s(), a.push(t), function () {
      if (r) {
        if (u) throw new Error("You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api-reference/store#subscribe(listener) for more details.");r = false, s();var e = a.indexOf(t);a.splice(e, 1);
      }
    };
  }function p(e) {
    if (!isPlainObject(e)) throw new Error("Actions must be plain objects. Use custom middleware for async actions.");if (undefined === e.type) throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');if (u) throw new Error("Reducers may not dispatch actions.");try {
      u = true, i = o(i, e);
    } finally {
      u = false;
    }for (var t = c = a, r = 0; r < t.length; r++) (0, t[r])();return e;
  }return p({ type: ActionTypes.INIT }), (n = { dispatch: p, subscribe: f, getState: d, replaceReducer: function (e) {
      if ("function" != typeof e) throw new Error("Expected the nextReducer to be a function.");o = e, p({ type: ActionTypes.REPLACE });
    } })[$$observable] = function () {
    var e,
        r = f;return (e = { subscribe: function (e) {
        if ("object" != typeof e || null === e) throw new TypeError("Expected the observer to be an object.");function t() {
          e.next && e.next(d());
        }return t(), { unsubscribe: r(t) };
      } })[$$observable] = function () {
      return this;
    }, e;
  }, n;
}function warning(e) {
  "undefined" != typeof console && "function" == typeof console.error && console.error(e);try {
    throw new Error(e);
  } catch (e) {}
}function getUndefinedStateErrorMessage(e, t) {
  var r = t && t.type;return "Given " + (r && 'action "' + String(r) + '"' || "an action") + ', reducer "' + e + '" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.';
}function getUnexpectedStateShapeWarningMessage(e, t, r, n) {
  var o = Object.keys(t),
      i = r && r.type === ActionTypes.INIT ? "preloadedState argument passed to createStore" : "previous state received by the reducer";if (0 === o.length) return "Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.";if (!isPlainObject(e)) return "The " + i + ' has unexpected type of "' + {}.toString.call(e).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following keys: "' + o.join('", "') + '"';var c = Object.keys(e).filter(function (e) {
    return !t.hasOwnProperty(e) && !n[e];
  });return c.forEach(function (e) {
    n[e] = true;
  }), r && r.type === ActionTypes.REPLACE ? undefined : 0 < c.length ? "Unexpected " + (1 < c.length ? "keys" : "key") + ' "' + c.join('", "') + '" found in ' + i + '. Expected to find one of the known reducer keys instead: "' + o.join('", "') + '". Unexpected keys will be ignored.' : undefined;
}function assertReducerShape(r) {
  Object.keys(r).forEach(function (e) {
    var t = r[e];if (undefined === t(undefined, { type: ActionTypes.INIT })) throw new Error('Reducer "' + e + "\" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.");if (undefined === t(undefined, { type: ActionTypes.PROBE_UNKNOWN_ACTION() })) throw new Error('Reducer "' + e + "\" returned undefined when probed with a random type. Don't try to handle " + ActionTypes.INIT + ' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.');
  });
}function combineReducers(e) {
  for (var t = Object.keys(e), f = {}, r = 0; r < t.length; r++) {
    var n = t[r];undefined === e[n] && warning('No reducer provided for key "' + n + '"'), "function" == typeof e[n] && (f[n] = e[n]);
  }var p,
      l,
      y = Object.keys(f);p = {};try {
    assertReducerShape(f);
  } catch (e) {
    l = e;
  }return function (e, t) {
    if (undefined === e && (e = {}), l) throw l;{
      var r = getUnexpectedStateShapeWarningMessage(e, f, t, p);r && warning(r);
    }for (var n = false, o = {}, i = 0; i < y.length; i++) {
      var c = y[i],
          a = f[c],
          u = e[c],
          s = a(u, t);if (undefined === s) {
        var d = getUndefinedStateErrorMessage(c, t);throw new Error(d);
      }o[c] = s, n = n || s !== u;
    }return n ? o : e;
  };
}function bindActionCreator(e, t) {
  return function () {
    return t(e.apply(this, arguments));
  };
}function bindActionCreators(e, t) {
  if ("function" == typeof e) return bindActionCreator(e, t);if ("object" != typeof e || null === e) throw new Error("bindActionCreators expected an object or a function, instead received " + (null === e ? "null" : typeof e) + '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');var r = {};for (var n in e) {
    var o = e[n];"function" == typeof o && (r[n] = bindActionCreator(o, t));
  }return r;
}function _defineProperty(e, t, r) {
  return t in e ? Object.defineProperty(e, t, { value: r, enumerable: true, configurable: true, writable: true }) : e[t] = r, e;
}function ownKeys(t, e) {
  var r = Object.keys(t);return Object.getOwnPropertySymbols && r.push.apply(r, Object.getOwnPropertySymbols(t)), e && (r = r.filter(function (e) {
    return Object.getOwnPropertyDescriptor(t, e).enumerable;
  })), r;
}function _objectSpread2(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = null != arguments[e] ? arguments[e] : {};e % 2 ? ownKeys(r, true).forEach(function (e) {
      _defineProperty(t, e, r[e]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : ownKeys(r).forEach(function (e) {
      Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(r, e));
    });
  }return t;
}function compose() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];return 0 === t.length ? function (e) {
    return e;
  } : 1 === t.length ? t[0] : t.reduce(function (e, t) {
    return function () {
      return e(t.apply(undefined, arguments));
    };
  });
}function applyMiddleware() {
  for (var e = arguments.length, i = new Array(e), t = 0; t < e; t++) i[t] = arguments[t];return function (o) {
    return function () {
      var e = o.apply(undefined, arguments),
          t = function () {
        throw new Error("Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.");
      },
          r = { getState: e.getState, dispatch: function () {
          return t.apply(undefined, arguments);
        } },
          n = i.map(function (e) {
        return e(r);
      });return _objectSpread2({}, e, { dispatch: t = compose.apply(undefined, n)(e.dispatch) });
    };
  };
}function isCrushed() {}"string" == typeof isCrushed.name && "isCrushed" !== isCrushed.name && warning('You are currently using minified code outside of NODE_ENV === "production". This means that you are running a slower development build of Redux. You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify or setting mode to production in webpack (https://webpack.js.org/concepts/mode/) to ensure you have the correct code for your production build.'), exports.__DO_NOT_USE__ActionTypes = ActionTypes, exports.applyMiddleware = applyMiddleware, exports.bindActionCreators = bindActionCreators, exports.combineReducers = combineReducers, exports.compose = compose, exports.createStore = createStore;