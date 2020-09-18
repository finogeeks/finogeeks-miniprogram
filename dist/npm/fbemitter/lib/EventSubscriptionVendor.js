"use strict";
function _classCallCheck(i, s) {
  if (!(i instanceof s)) throw new TypeError("Cannot call a class as a function");
}var invariant = require("../npm/fbjs/lib/invariant.js"),
    EventSubscriptionVendor = function () {
  function i() {
    _classCallCheck(this, i), this._subscriptionsForType = {}, this._currentSubscription = null;
  }return i.prototype.addSubscription = function (i, s) {
    s.subscriber !== this && invariant(false, "The subscriber of the subscription is incorrectly set."), this._subscriptionsForType[i] || (this._subscriptionsForType[i] = []);var t = this._subscriptionsForType[i].length;return this._subscriptionsForType[i].push(s), s.eventType = i, s.key = t, s;
  }, i.prototype.removeAllSubscriptions = function (i) {
    undefined === i ? this._subscriptionsForType = {} : delete this._subscriptionsForType[i];
  }, i.prototype.removeSubscription = function (i) {
    var s = i.eventType,
        t = i.key,
        r = this._subscriptionsForType[s];r && delete r[t];
  }, i.prototype.getSubscriptionsForType = function (i) {
    return this._subscriptionsForType[i];
  }, i;
}();module.exports = EventSubscriptionVendor;