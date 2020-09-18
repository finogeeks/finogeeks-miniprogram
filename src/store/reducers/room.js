import {
  SET_ROOMS,
  ADD_VIEWING_ROOM,
  DELETE_VIEWING_ROOM,
  ADD_VIEWING_TIMELINE,
  DELETE_VIEWING_TIMELINE,
  SET_TOTAL_UNREAD,
  UPDATE_ROOM,
  DELETE_ROOM,
  ADD_ROOM,
  SET_SMART_BOT_ROOM_ID,
  ROOMTYPES,
  DELETE_ALL_ROOM,
} from '@/constants/room';

const INITIAL_STATE = {
  rooms: [],
  basicRooms: [],
  smartBotRoomId: '',
  totalUnread: 0,
  viewingRoom: null,
  viewingTimeline: {},
};

const MAX_ROOM = 200;

const getRoomBasic = room => {
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
    powerLevel: room.powerLevel,
    // groupAvatars: room.members.slice(0, 4).map(member => member.avatar),
    // groupAvatars: avatars
  };
};

const filterHideRoom = room => {
  return room && room.roomType !== ROOMTYPES.dispatch && !room.isHide;
};

const sortRoom = (a, b) => {
  return b.updatedAt - a.updatedAt;
};

export default function navigation(
  state = INITIAL_STATE,
  { type, rooms, room, roomId, viewingRoom, timeline, totalUnread },
) {
  switch (type) {
    case SET_TOTAL_UNREAD:
      return {
        ...state,
        totalUnread,
      };
    case SET_ROOMS:
      const basicRooms = rooms
        .map(getRoomBasic)
        .filter(filterHideRoom)
        .slice(0, MAX_ROOM);
      return {
        ...state,
        rooms,
        basicRooms,
      };
    case UPDATE_ROOM:
      const newRooms = [...state.rooms];
      const newBasicRooms = [...state.basicRooms];
      const newBasicRoom = getRoomBasic(room);
      const targetIdx = newRooms.findIndex(item => item.id === room.id);
      const basicTargetIdx = newBasicRooms.findIndex(
        item => item.id === room.id,
      );
      if (targetIdx !== -1) {
        newRooms[targetIdx] = { ...room };
      }
      if (basicTargetIdx !== -1) {
        newBasicRooms[basicTargetIdx] = newBasicRoom;
      } else {
        newBasicRooms.push(newBasicRoom);
      }
      console.log('=============newBasicRooms============');
      console.log(newBasicRooms);
      return {
        ...state,
        rooms: newRooms.sort(sortRoom),
        basicRooms: newBasicRooms
          .sort(sortRoom)
          .slice(0, MAX_ROOM)
          .filter(filterHideRoom),
        viewingRoom:
          state.viewingRoom && state.viewingRoom.id === room.id
            ? { ...room }
            : state.viewingRoom,
      };
    case DELETE_ROOM:
      return {
        ...state,
        rooms: [...state.rooms]
          .filter(item => item.id !== roomId)
          .sort(sortRoom),
        basicRooms: [...state.basicRooms]
          .filter(item => item.id !== roomId)
          .sort(sortRoom),
      };
    case ADD_ROOM:
      return {
        ...state,
        rooms: [...state.rooms, room].sort(sortRoom),
        basicRooms: [...state.basicRooms, getRoomBasic(room)]
          .sort(sortRoom)
          .filter(filterHideRoom)
          .slice(0, MAX_ROOM),
      };
    case ADD_VIEWING_ROOM:
      return {
        ...state,
        viewingRoom: { ...viewingRoom },
      };
    case DELETE_VIEWING_ROOM:
      if (!state.viewingRoom || state.viewingRoom.id !== roomId) return state;
      return {
        ...state,
        viewingRoom: null,
      };
    case ADD_VIEWING_TIMELINE:
      return {
        ...state,
        viewingTimeline: {
          [roomId]: [...timeline],
        },
      };
    case DELETE_VIEWING_TIMELINE:
      // if (state.viewingTimeline.length === 0 || state.viewingTimeline[0].roomId !== roomId) return state;
      if (!state.viewingTimeline[roomId]) return state;
      const newViewingTimeline = { ...state.viewingTimeline };
      delete newViewingTimeline[roomId];
      return {
        ...state,
        viewingTimeline: newViewingTimeline,
      };
    case SET_SMART_BOT_ROOM_ID:
      return {
        ...state,
        smartBotRoomId: roomId,
      };
    case DELETE_ALL_ROOM:
      return {
        rooms: [],
        basicRooms: [],
      };
    default:
      return state;
  }
}
