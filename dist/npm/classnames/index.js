!function () {
  "use strict";
  var i = {}.hasOwnProperty;function a() {
    for (var e = [], n = 0; n < arguments.length; n++) {
      var r = arguments[n];if (r) {
        var t = typeof r;if ("string" == t || "number" == t) e.push(r);else if (Array.isArray(r) && r.length) {
          var f = a.apply(null, r);f && e.push(f);
        } else if ("object" == t) for (var o in r) i.call(r, o) && r[o] && e.push(o);
      }
    }return e.join(" ");
  }"undefined" != typeof module && module.exports ? (a.default = a, module.exports = a) : "function" == typeof define && "object" == typeof define.amd && define.amd ? define("classnames", [], function () {
    return a;
  }) : window.classNames = a;
}();