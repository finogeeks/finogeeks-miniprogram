"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var RoomType = exports.RoomType = undefined;
(function (RoomType) {
  RoomType["channel"] = "CHANNEL";
  RoomType["dispatch"] = "DISPATCH";
  RoomType["advisor"] = "ADVISOR";
  RoomType["smartBot"] = "SMART_BOT";
  RoomType["normalBot"] = "NORMAL_BOT";
})(RoomType || (exports.RoomType = RoomType = {}));
var RoomMemberShip = exports.RoomMemberShip = undefined;
(function (RoomMemberShip) {
  RoomMemberShip["join"] = "join";
  RoomMemberShip["leave"] = "leave";
  RoomMemberShip["invite"] = "invite";
})(RoomMemberShip || (exports.RoomMemberShip = RoomMemberShip = {}));