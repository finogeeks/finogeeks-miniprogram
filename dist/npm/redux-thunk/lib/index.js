"use strict";
function createThunkMiddleware(u) {
  return function (t) {
    var n = t.dispatch,
        r = t.getState;return function (e) {
      return function (t) {
        return "function" == typeof t ? t(n, r, u) : e(t);
      };
    };
  };
}exports.__esModule = true;var thunk = createThunkMiddleware();thunk.withExtraArgument = createThunkMiddleware, exports.default = thunk;