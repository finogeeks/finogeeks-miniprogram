"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setRooms = setRooms;
exports.updateRoom = updateRoom;
exports.addRoom = addRoom;
exports.deleteRoom = deleteRoom;
exports.addViewingRoom = addViewingRoom;
exports.deleteViewingRoom = deleteViewingRoom;
exports.addViewingTimeline = addViewingTimeline;
exports.deleteViewingTimeline = deleteViewingTimeline;
exports.setTotalUnread = setTotalUnread;
exports.setSmartBotRoomId = setSmartBotRoomId;
exports.deleteAllRooms = deleteAllRooms;

var _room = require("../../constants/room.js");

function setRooms(rooms) {
  return {
    type: _room.SET_ROOMS,
    rooms: rooms
  };
}

function updateRoom(room) {
  return {
    type: _room.UPDATE_ROOM,
    room: room
  };
}

function addRoom(room) {
  return {
    type: _room.ADD_ROOM,
    room: room
  };
}

function deleteRoom(roomId) {
  return {
    type: _room.DELETE_ROOM,
    roomId: roomId
  };
}

function addViewingRoom(viewingRoom) {
  return {
    type: _room.ADD_VIEWING_ROOM,
    viewingRoom: viewingRoom
  };
}

function deleteViewingRoom(roomId) {
  return {
    type: _room.DELETE_VIEWING_ROOM,
    roomId: roomId
  };
}

function addViewingTimeline(roomId, timeline) {
  return {
    type: _room.ADD_VIEWING_TIMELINE,
    roomId: roomId,
    timeline: timeline
  };
}

function deleteViewingTimeline(roomId) {
  return {
    type: _room.DELETE_VIEWING_TIMELINE,
    roomId: roomId
  };
}

function setTotalUnread(totalUnread) {
  return {
    type: _room.SET_TOTAL_UNREAD,
    totalUnread: totalUnread
  };
}

function setSmartBotRoomId(roomId) {
  console.log('SET_SMART_BOT_ROOM_ID', roomId);
  return {
    type: _room.SET_SMART_BOT_ROOM_ID,
    roomId: roomId
  };
}

function deleteAllRooms() {
  return {
    type: _room.DELETE_ALL_ROOM
  };
}