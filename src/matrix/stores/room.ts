import BaseStore from './base';
import { Room, BasicRoom, RoomType} from '../interface/room';
import { Action, OptParams, StoreUpdateEvent, StoreEvent } from '../interface/store'

export default class RoomStore extends BaseStore<Room> {
  roomList: Room[] = []
  basicRoomList: BasicRoom[] = []
  constructor() {
    super('ROOM');
  }

  init(rooms: Room[]) {
    rooms.forEach(room => {
      this.store[room.id] = room;
    })
    this.roomList = rooms.sort(this.compareRoom);
    this.basicRoomList = this.buildBasicList();
  }

  private buildBasicRoom(room:Room):BasicRoom {
    // console.log(room);
    return {
      id: room.id,
      name: room.name,
      roomType: room.roomType,
      avatar: room.avatar,
      isOnline: room.isOnline,
      unread: room.unread,
      isHide: room.isHide,
      createdAt: room.createdAt,
      updatedAt: room.updatedAt,
      lastMessage: room.lastMessage,
      members: room.members,
      isChannel: room.isChannel,  // 是否频道
      isArchive: room.isArchive,  //  是否已归档
      isDirect: room.isDirect, //  和单个人聊天
      isNormalRobot: room.isNormalRobot,  //  是否智能助手
      isCrossDomain: room.isCrossDomain,  // 是否跨域人员
      federate: room.federate, // 是否共享频道
      publicChannel: room.publicChannel, // 是否公开频道
      isSecret: room.isSecret, // 是否保密房间
      isGroup: room.isGroup, // 是否群聊
      powerLevel: room.powerLevel,
      isDelete: room.isDelete, // 是否被删除
    }
  }

  beforeEmitUpdate(event: StoreUpdateEvent<Room>) {
    const { type, id, item } = event;
    const curRoomIdx = this.roomList.findIndex(room => room.id === id);
    switch(type) {
      case Action.ADD:
        this.roomList = [...this.roomList, item].sort(this.compareRoom);
        break;
      case Action.PUT:
        if (curRoomIdx === -1) {
          this.roomList = [...this.roomList, item].sort(this.compareRoom);
        } else {
          this.roomList[curRoomIdx] = item;
          this.roomList.sort(this.compareRoom);
        }
        break;
      case Action.DELETE:
        this.roomList.filter(room => room.id !== id);
        break;
      case Action.UPDATE:
        this.roomList[curRoomIdx] = item;
        this.roomList.sort(this.compareRoom);
        break;
      default:
        break;
    }
    this.basicRoomList = this.buildBasicList();
  }

  private compareRoom(a:Room, b:Room):number {
    return b.updatedAt - a.updatedAt;
  }

  private filterBasicRoom(room: Room, idx:number) {
    const MAX_NUM = 250;
    return room && room.membership !== 'leave' && room.roomType !== RoomType.dispatch && !room.isHide && idx < MAX_NUM; 
  }

  private buildBasicList() {
    return this.roomList.filter(this.filterBasicRoom).map(this.buildBasicRoom);
  }

}
