import { User } from './user';

export interface Message {
  id: string,
  user: User,
  isMy: boolean,
  roomId: string,
  body: any,
  content: any,
  time: number,
  type: string, // TODO should parse
  status: string,
  redacts: any,
  isRedacted: any,
}

export enum EventStatus {
  /** The event was not sent and will no longer be retried. */
  NOT_SENT = "not_sent",

  /** The message is being encrypted */
  ENCRYPTING = "encrypting",

  /** The event is in the process of being sent. */
  SENDING = "sending",
  /** The event is in a queue waiting to be sent. */
  QUEUED = "queued",
  /** The event has been sent to the server, but we have not yet received the
   * echo. */
  SENT = "sent",

  /** The event was cancelled before it was successfully sent. */
  CANCELLED = "cancelled",
};

export enum MessageType {
  // Parent type
  Message = 'm.room.message',

  // Basic msgtype
  Text = 'm.text',
  Alert = 'm.alert',
  Url = 'm.url',
  Location = 'm.location',
  Signal = 'm.signal',
  Notice = 'm.notice',

  // Media types
  Image = 'm.image',
  Video = 'm.video',
  Audio = 'm.audio',
  File = 'm.file',

  // P2P encryption types
  BadEncrypted = 'm.bad.encrypted',

  // Convo
  ConvoReply = 'fc.convo.reply',
  ConvoUI = 'fc.convo.ui',

  // Custom types
  EnterRoom = 'm.room._ext.enter',
  LeaveRoom = 'm.room._ext.leave',
}

export interface MessageContent {
  content,
  msgtype,
  extend?,
  name?, 
  url?, 
  mimetype?, 
  width?, 
  height?, 
  size?,
  text?,
  data?,
  address?, 
  latitude?, 
  longitude?,
  reply?,
  originContent?
  path?,
  layout?,
}