"use strict";
var validateFormat = function (r) {};function invariant(r, e, n, i, a, o, t, s) {
  if (validateFormat(e), !r) {
    var v;if (undefined === e) v = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else {
      var d = [n, i, a, o, t, s],
          u = 0;(v = new Error(e.replace(/%s/g, function () {
        return d[u++];
      }))).name = "Invariant Violation";
    }throw v.framesToPop = 1, v;
  }
}validateFormat = function (r) {
  if (undefined === r) throw new Error("invariant requires an error message argument");
}, module.exports = invariant;