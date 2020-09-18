export const shouldShowConvoReply = (mxEvent) => {
  try {
    return mxEvent.event.content.msgtype === 'fc.convo.reply' && !mxEvent.event.content.hide
  } catch (error) {
    return true
  }
};
export const isReplaceDisplay = (message) => {
  try {
    return message.content.layout.display.type === 'replace'
  } catch (error) {
    return false
  }
};
export const isTableLayout = (message) => {
  try {
    return message.content.layout.type === 'table'
  } catch (error) {
    return false
  }
};
export const isSameContext = (message1, message2) => {
  try {
    return message1.content.msgid === message2.content.msgid
  } catch (error) {
    return false
  }
},