"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var EventStatus = exports.EventStatus = undefined;
(function (EventStatus) {
  /** The event was not sent and will no longer be retried. */
  EventStatus["NOT_SENT"] = "not_sent";
  /** The message is being encrypted */
  EventStatus["ENCRYPTING"] = "encrypting";
  /** The event is in the process of being sent. */
  EventStatus["SENDING"] = "sending";
  /** The event is in a queue waiting to be sent. */
  EventStatus["QUEUED"] = "queued";
  /** The event has been sent to the server, but we have not yet received the
   * echo. */
  EventStatus["SENT"] = "sent";
  /** The event was cancelled before it was successfully sent. */
  EventStatus["CANCELLED"] = "cancelled";
})(EventStatus || (exports.EventStatus = EventStatus = {}));
;
var MessageType = exports.MessageType = undefined;
(function (MessageType) {
  // Parent type
  MessageType["Message"] = "m.room.message";
  // Basic msgtype
  MessageType["Text"] = "m.text";
  MessageType["Alert"] = "m.alert";
  MessageType["Url"] = "m.url";
  MessageType["Location"] = "m.location";
  MessageType["Signal"] = "m.signal";
  MessageType["Notice"] = "m.notice";
  // Media types
  MessageType["Image"] = "m.image";
  MessageType["Video"] = "m.video";
  MessageType["Audio"] = "m.audio";
  MessageType["File"] = "m.file";
  // P2P encryption types
  MessageType["BadEncrypted"] = "m.bad.encrypted";
  // Convo
  MessageType["ConvoReply"] = "fc.convo.reply";
  MessageType["ConvoUI"] = "fc.convo.ui";
  // Custom types
  MessageType["EnterRoom"] = "m.room._ext.enter";
  MessageType["LeaveRoom"] = "m.room._ext.leave";
})(MessageType || (exports.MessageType = MessageType = {}));