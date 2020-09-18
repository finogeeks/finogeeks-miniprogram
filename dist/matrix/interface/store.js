"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Action = exports.Action = undefined;
(function (Action) {
  Action["ADD"] = "ADD";
  Action["DELETE"] = "DELETE";
  Action["UPDATE"] = "UPDATE";
  Action["PUT"] = "PUT";
})(Action || (exports.Action = Action = {}));
;
var StoreEvent = exports.StoreEvent = undefined;
(function (StoreEvent) {
  StoreEvent["Room"] = "room";
  StoreEvent["User"] = "user";
})(StoreEvent || (exports.StoreEvent = StoreEvent = {}));