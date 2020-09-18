"use strict";
function _classCallCheck(s, t) {
  if (!(s instanceof t)) throw new TypeError("Cannot call a class as a function");
}var EventSubscription = function () {
  function t(s) {
    _classCallCheck(this, t), this.subscriber = s;
  }return t.prototype.remove = function () {
    this.subscriber && (this.subscriber.removeSubscription(this), this.subscriber = null);
  }, t;
}();module.exports = EventSubscription;