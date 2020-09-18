'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = navigation;

var _room = require('../../constants/room.js');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var INITIAL_STATE = {
  rooms: [],
  basicRooms: [],
  smartBotRoomId: '',
  totalUnread: 0,
  viewingRoom: null,
  viewingTimeline: {}
};

var MAX_ROOM = 200;

var getRoomBasic = function getRoomBasic(room) {
  return {
    id: room.id,
    name: room.name,
    avatar: room.avatar,
    isHide: room.isHide,
    roomType: room.roomType,
    lastMessage: room.lastMessage,
    updatedAt: room.updatedAt,
    createdAt: room.createdAt,
    unread: room.unread,
    isArchive: room.isArchive,
    isChannel: room.isChannel,
    isDirect: room.isDirect,
    isNormalRobot: room.isNormalRobot,
    isCrossDomain: room.isCrossDomain,
    federate: room.federate,
    publicChannel: room.publicChannel,
    isSecret: room.isSecret,
    isGroup: room.isGroup,
    powerLevel: room.powerLevel
    // groupAvatars: room.members.slice(0, 4).map(member => member.avatar),
    // groupAvatars: avatars
  };
};

var filterHideRoom = function filterHideRoom(room) {
  return room && room.roomType !== _room.ROOMTYPES.dispatch && !room.isHide;
};

var sortRoom = function sortRoom(a, b) {
  return b.updatedAt - a.updatedAt;
};

function navigation() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var _ref = arguments[1];
  var type = _ref.type,
      rooms = _ref.rooms,
      room = _ref.room,
      roomId = _ref.roomId,
      viewingRoom = _ref.viewingRoom,
      timeline = _ref.timeline,
      totalUnread = _ref.totalUnread;

  switch (type) {
    case _room.SET_TOTAL_UNREAD:
      return _extends({}, state, {
        totalUnread: totalUnread
      });
    case _room.SET_ROOMS:
      var basicRooms = rooms.map(getRoomBasic).filter(filterHideRoom).slice(0, MAX_ROOM);
      return _extends({}, state, {
        rooms: rooms,
        basicRooms: basicRooms
      });
    case _room.UPDATE_ROOM:
      var newRooms = [].concat(_toConsumableArray(state.rooms));
      var newBasicRooms = [].concat(_toConsumableArray(state.basicRooms));
      var newBasicRoom = getRoomBasic(room);
      var targetIdx = newRooms.findIndex(function (item) {
        return item.id === room.id;
      });
      var basicTargetIdx = newBasicRooms.findIndex(function (item) {
        return item.id === room.id;
      });
      if (targetIdx !== -1) {
        newRooms[targetIdx] = _extends({}, room);
      }
      if (basicTargetIdx !== -1) {
        newBasicRooms[basicTargetIdx] = newBasicRoom;
      } else {
        newBasicRooms.push(newBasicRoom);
      }
      console.log('=============newBasicRooms============');
      console.log(newBasicRooms);
      return _extends({}, state, {
        rooms: newRooms.sort(sortRoom),
        basicRooms: newBasicRooms.sort(sortRoom).slice(0, MAX_ROOM).filter(filterHideRoom),
        viewingRoom: state.viewingRoom && state.viewingRoom.id === room.id ? _extends({}, room) : state.viewingRoom
      });
    case _room.DELETE_ROOM:
      return _extends({}, state, {
        rooms: [].concat(_toConsumableArray(state.rooms)).filter(function (item) {
          return item.id !== roomId;
        }).sort(sortRoom),
        basicRooms: [].concat(_toConsumableArray(state.basicRooms)).filter(function (item) {
          return item.id !== roomId;
        }).sort(sortRoom)
      });
    case _room.ADD_ROOM:
      return _extends({}, state, {
        rooms: [].concat(_toConsumableArray(state.rooms), [room]).sort(sortRoom),
        basicRooms: [].concat(_toConsumableArray(state.basicRooms), [getRoomBasic(room)]).sort(sortRoom).filter(filterHideRoom).slice(0, MAX_ROOM)
      });
    case _room.ADD_VIEWING_ROOM:
      return _extends({}, state, {
        viewingRoom: _extends({}, viewingRoom)
      });
    case _room.DELETE_VIEWING_ROOM:
      if (!state.viewingRoom || state.viewingRoom.id !== roomId) return state;
      return _extends({}, state, {
        viewingRoom: null
      });
    case _room.ADD_VIEWING_TIMELINE:
      return _extends({}, state, {
        viewingTimeline: _defineProperty({}, roomId, [].concat(_toConsumableArray(timeline)))
      });
    case _room.DELETE_VIEWING_TIMELINE:
      // if (state.viewingTimeline.length === 0 || state.viewingTimeline[0].roomId !== roomId) return state;
      if (!state.viewingTimeline[roomId]) return state;
      var newViewingTimeline = _extends({}, state.viewingTimeline);
      delete newViewingTimeline[roomId];
      return _extends({}, state, {
        viewingTimeline: newViewingTimeline
      });
    case _room.SET_SMART_BOT_ROOM_ID:
      return _extends({}, state, {
        smartBotRoomId: roomId
      });
    case _room.DELETE_ALL_ROOM:
      return {
        rooms: [],
        basicRooms: []
      };
    default:
      return state;
  }
}