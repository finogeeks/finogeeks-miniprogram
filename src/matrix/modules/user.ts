import { ROOMTYPES } from '@/constants/room';
import { ModuleOpts } from '../interface/module';
import BaseModule from './base';
import { Room } from '../interface/room';

export default class UserModule extends BaseModule {
  constructor(mxClient:any, opts:ModuleOpts) {
    super(mxClient, opts);
    this.init();
  }

  init() {
    const mxUsers = this.mxClient.getUsers();
    const users = mxUsers.filter(user => !!user).map(this.buildUser);
    console.log('users', users);
    this.store.user.init(users);
    this.mxClient.on('User.avatarUrl', (mxEvent, mxUser) => this.handleUserUpdate(mxUser))
    this.mxClient.on('User.displayName', (mxEvent, mxUser) => this.handleUserUpdate(mxUser))
    this.mxClient.on('User.presence', (mxEvent, mxUser) => this.handleUserUpdate(mxUser))
  }

  private handleUserUpdate = (mxUser) => {
    if (!mxUser) return;
    const user = this.buildUser(mxUser);
    this.store.user.put(user.id, user);
    const rooms = this.store.room.roomList;
    rooms.forEach(async room => {
      if(!room.avatarUserIds.includes(user.id)) return;
      const mxRoom = this.mxClient.getRoom(room.id);
      const newRoom = this.buildRoom(mxRoom);
      if(!newRoom) return;
      this.store.room.put(room.id, newRoom);
    })
  }

  getUser = (userId:string) =>{
    return this.getLocalUser(userId);
  }

  setAvatarUrl = async (url:string) => {
    try {
      await this.mxClient.setAvatarUrl(url)
      const me = this.getUser(this.myUserId);
      this.store.user.put(me.id, {
        ...me,
        avatar: url,
      })     
    } catch (error) {
      return false;
    }
  }

  setDisplayName = async (name:string) => {
    try {
      await this.mxClient.setDispalyName(name)
      const me = this.getUser(this.myUserId);
      this.store.user.put(me.id, {
        ...me,
        avatar: name,
      })     
    } catch (error) {
      return false;
    }
  }

  onUpdate(cb) {
    return this.store.user.onUpdate(cb);
  }

  transUrl(rawUrl:string) {
    return this.urlTransfer(rawUrl);
  }
}