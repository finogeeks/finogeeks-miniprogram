import {
  SET_ROOMS,
  UPDATE_ROOM,
  ADD_ROOM,
  DELETE_ROOM,
  ADD_VIEWING_ROOM,
  DELETE_VIEWING_ROOM,
  ADD_VIEWING_TIMELINE,
  DELETE_VIEWING_TIMELINE,
  SET_TOTAL_UNREAD,
  SET_SMART_BOT_ROOM_ID,
  DELETE_ALL_ROOM
} from '@/constants/room';

export function setRooms(rooms) {
  return {
    type: SET_ROOMS,
    rooms,
  };
}

export function updateRoom(room) {
  return {
    type: UPDATE_ROOM,
    room,
  };
}

export function addRoom(room) {
  return {
    type: ADD_ROOM,
    room,
  };
}

export function deleteRoom(roomId) {
  return {
    type: DELETE_ROOM,
    roomId,
  };
}

export function addViewingRoom(viewingRoom) {
  return {
    type: ADD_VIEWING_ROOM,
    viewingRoom,
  };
}

export function deleteViewingRoom(roomId) {
  return {
    type: DELETE_VIEWING_ROOM,
    roomId,
  };
}

export function addViewingTimeline(roomId, timeline) {
  return {
    type: ADD_VIEWING_TIMELINE,
    roomId,
    timeline,
  };
}

export function deleteViewingTimeline(roomId) {
  return {
    type: DELETE_VIEWING_TIMELINE,
    roomId,
  };
}

export function setTotalUnread(totalUnread) {
  return {
    type: SET_TOTAL_UNREAD,
    totalUnread,
  };
}

export function setSmartBotRoomId(roomId) {
  console.log('SET_SMART_BOT_ROOM_ID', roomId);
  return {
    type: SET_SMART_BOT_ROOM_ID,
    roomId,
  };
}

export function deleteAllRooms() {
  return {
    type: DELETE_ALL_ROOM,
  };
}