// import { OrderInfo } from './dipatch';
import { User } from './user';

export interface BasicRoom {
  id: string
  name: string
  roomType: RoomType
  avatar: string
  isOnline: boolean
  unread: number
  isHide: boolean
  createdAt: number
  updatedAt: number
  lastMessage: string
}

export interface Room extends BasicRoom{
  avatarUserIds: string[],
  topicMsg: string,
  topic: any;
  orderInfo: any,
  membership: RoomMemberShip,
  states: RoomState[],
  members: User[],
  banned: boolean,
  channelInfo: ChannelInfo,
}

export interface RoomState {
  [x: string]: any;
}

export interface ChannelInfo {
  [x: string]: any;
}

export enum RoomType {
  channel = 'CHANNEL',
  dispatch = 'DISPATCH',
  advisor = 'ADVISOR',
  smartBot = 'SMART_BOT',
  normalBot = 'NORMAL_BOT',
}

export enum RoomMemberShip {
  join = 'join',
  leave = 'leave',
  invite = 'invite'
}