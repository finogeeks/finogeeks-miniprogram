"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.set = set;
exports.get = get;
var globalData = {
  showRoomList: true,
  firstRenderHome: true,
  hasEnterRoom: false
};

function set(key, val) {
  globalData[key] = val;
}

function get(key) {
  return globalData[key];
}