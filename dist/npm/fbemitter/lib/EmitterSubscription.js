"use strict";
function _classCallCheck(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}function _inherits(t, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: false, writable: true, configurable: true } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
}var EventSubscription = require("./EventSubscription.js"),
    EmitterSubscription = function (r) {
  function o(t, e, n) {
    _classCallCheck(this, o), r.call(this, t), this.listener = e, this.context = n;
  }return _inherits(o, r), o;
}(EventSubscription);module.exports = EmitterSubscription;