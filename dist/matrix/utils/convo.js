'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var shouldShowConvoReply = exports.shouldShowConvoReply = function shouldShowConvoReply(mxEvent) {
  try {
    return mxEvent.event.content.msgtype === 'fc.convo.reply' && !mxEvent.event.content.hide;
  } catch (error) {
    return true;
  }
};
var isReplaceDisplay = exports.isReplaceDisplay = function isReplaceDisplay(message) {
  try {
    return message.content.layout.display.type === 'replace';
  } catch (error) {
    return false;
  }
};
var isTableLayout = exports.isTableLayout = function isTableLayout(message) {
  try {
    return message.content.layout.type === 'table';
  } catch (error) {
    return false;
  }
};
var isSameContext = exports.isSameContext = function isSameContext(message1, message2) {
  try {
    return message1.content.msgid === message2.content.msgid;
  } catch (error) {
    return false;
  }
};