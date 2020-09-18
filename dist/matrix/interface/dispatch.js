"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var DispatchState = exports.DispatchState = undefined;
(function (DispatchState) {
  DispatchState["close"] = "CLOSE";
  DispatchState["selected"] = "SELECTED";
  DispatchState["dispatching"] = "DISPATCHING";
  DispatchState["timeout"] = "TIMEOUT";
  DispatchState["accepted"] = "ACCEPTED";
})(DispatchState || (exports.DispatchState = DispatchState = {}));