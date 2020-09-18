import { ROOMTYPES } from '@/constants/room';
import { ModuleOpts } from '../interface/module';
import BaseModule from './base';
import { Room } from '../interface/room';

export default class RoomModule extends BaseModule {
  constructor(mxClient:any, opts:ModuleOpts) {
    super(mxClient, opts);
    this.init();
  }

  private init = () =>{
    const mxRooms = this.mxClient.getRooms();
    // console.log('mxRooms: ', mxRooms);
    const rooms = mxRooms.map(this.buildRoom);
    // console.log('rooms: ', rooms);
    this.store.room.init(rooms);
    this.mxClient.on('Room', mxRoom => this.handleRoomUpdate(mxRoom.roomId))
    this.mxClient.on('Room.accountData', (mxEvent, mxRoom) => this.handleRoomUpdate(mxRoom.roomId))
    this.mxClient.on('Room.name', mxRoom => this.handleRoomUpdate(mxRoom.roomId))
    this.mxClient.on('Room.receipt', (mxEvent, mxRoom) => this.handleRoomUpdate(mxRoom.roomId))
    this.mxClient.on('Room.tags', (mxEvent, mxRoom) => this.handleRoomUpdate(mxRoom.roomId))
    this.mxClient.on('RoomState.events', (mxEvent, mxState) => this.handleRoomUpdate(mxState.roomId))
    this.mxClient.on('RoomState.members', (mxEvent, mxState, mxMember) => this.handleRoomUpdate(mxMember.roomId))
    this.mxClient.on('RoomMember.membership', (mxEvent, mxMember, oldMembership) => this.handleRoomUpdate(mxMember.roomId))
  }

  private handleRoomUpdate = (roomId:string) => {
    // console.log('handleRoomUpdate');
    const mxRoom = this.mxClient.getRoom(roomId);
    // console.log(mxRoom);
    if (!mxRoom) return;
    const newRoom = this.buildRoom(mxRoom);
    if(!newRoom) return;
    this.store.room.put(roomId, newRoom);
  }

  waitRoomReady = (roomId:string, join:any)=>
    new Promise(resolve => {
      let room = this.store.room.get(roomId);
      if (!room) {
        const mxRoom = this.mxClient.getRoom(roomId);
        room = this.buildRoom(mxRoom);
      }
      // console.log('room', room);
      if (this.isRoomReady(room, join)) resolve(room);
      const resolveRoom = async mxRoom => {
        // console.log('payload', payload);
        if (!mxRoom) return;
        const newRoom = this.buildRoom(mxRoom);
        if (this.isRoomReady(newRoom)) {
          this.mxClient.off('Room', resolveRoom);
          resolve(newRoom);
        }
      };
      // 设置等待超时时间
      setTimeout(() => {
        this.mxClient.off('Room', resolveRoom);
        resolve(null);
      }, 5000);
      this.mxClient.on('Room', resolveRoom);
    });

  isRoomReady = (room:Room, join:any) => {
    return !!room && (room.membership === 'join' || join);
  }

  getRoom = (roomId:string) => {
    return this.getLocalRoom(roomId);
  }

  getBasicRooms = () => {
    return this.store.room.basicRoomList;
  }

  getRooms = () => {
    return this.store.room.roomList;
  }

  getRoomGroupAvatar = (roomId) => {
    const room = this.store.room.get(roomId);
    if (!room || !room.members) return [];
    return room.members.slice(0, 4).map(member => member.avatar);
  }

  hideRoom = async (roomId) => {
    try {
      const success = await this.mxClient.setRoomTag(roomId, 'delete', { hiddenAt: Date.now() })
      return success
    } catch (error) {
      // this.log(error, 'error')
      return false
    }
  }

  onUpdate(cb) {
    return this.store.room.onUpdate(cb);
  }
}