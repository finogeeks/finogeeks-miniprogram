{
  var g = "undefined" != typeof window && window.Math === Math ? window : "object" == typeof global ? global : this;g.Promise || (g.Promise = require("../../promise-polyfill/lib/index.js")), g.regeneratorRuntime || (g.regeneratorRuntime = require("../../regenerator-runtime/runtime.js"));
}