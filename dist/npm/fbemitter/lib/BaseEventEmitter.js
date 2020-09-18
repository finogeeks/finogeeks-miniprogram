"use strict";
function _classCallCheck(t, r) {
  if (!(t instanceof r)) throw new TypeError("Cannot call a class as a function");
}var EmitterSubscription = require("./EmitterSubscription.js"),
    EventSubscriptionVendor = require("./EventSubscriptionVendor.js"),
    emptyFunction = require("../npm/fbjs/lib/emptyFunction.js"),
    invariant = require("../npm/fbjs/lib/invariant.js"),
    BaseEventEmitter = function () {
  function t() {
    _classCallCheck(this, t), this._subscriber = new EventSubscriptionVendor(), this._currentSubscription = null;
  }return t.prototype.addListener = function (t, r, i) {
    return this._subscriber.addSubscription(t, new EmitterSubscription(this._subscriber, r, i));
  }, t.prototype.once = function (t, r, i) {
    var e = this;return this.addListener(t, function () {
      e.removeCurrentListener(), r.apply(i, arguments);
    });
  }, t.prototype.removeAllListeners = function (t) {
    this._subscriber.removeAllSubscriptions(t);
  }, t.prototype.removeCurrentListener = function () {
    this._currentSubscription || invariant(false, "Not in an emitting cycle; there is no current subscription"), this._subscriber.removeSubscription(this._currentSubscription);
  }, t.prototype.listeners = function (t) {
    var r = this._subscriber.getSubscriptionsForType(t);return r ? r.filter(emptyFunction.thatReturnsTrue).map(function (t) {
      return t.listener;
    }) : [];
  }, t.prototype.emit = function (t) {
    var r = this._subscriber.getSubscriptionsForType(t);if (r) {
      for (var i = Object.keys(r), e = 0; e < i.length; e++) {
        var n = r[i[e]];n && (this._currentSubscription = n, this.__emitToSubscription.apply(this, [n].concat(Array.prototype.slice.call(arguments))));
      }this._currentSubscription = null;
    }
  }, t.prototype.__emitToSubscription = function (t, r) {
    var i = Array.prototype.slice.call(arguments, 2);t.listener.apply(t.context, i);
  }, t;
}();module.exports = BaseEventEmitter;