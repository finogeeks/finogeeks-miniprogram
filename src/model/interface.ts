export interface UserSession {
  accessToken:string
  jwt: string
  userId: string
  homeServer: string
  deviceId: string
  accountType: string
  accountId: string
  openId: string
  unionId: string
  appType: string 
  refresh_token: string
  expires_in: number
}

export interface UserInfo {
  retailId: string
  name: string
  avatar: string
  level: number
  gender: number
  address: string
  mobile: number
  region: any
  location: any
  visitingCard: any[]
  bindStaffId: string
  teminal: string
  accountData: any
  refresh_token: string
  expires_in: number
}

export interface WxUserInfo {
  nickName: string
  avatarUrl: string
  [x:string]:any
}

export enum IMEvent {
  ROOM = 'ROOM',
  USER = 'USER',
  DISPATCH = 'DISPATCH',
  TIMELINE = 'TIMELINE',
}

export interface EnterRoomOpts {
  reopenOrder?: boolean,
  sendMsg?: any
  dispatchQuestionType?: string
  staffId?: string
  redirect?: boolean
  autoJoin?: boolean
  channelId?: string
  join: any
}