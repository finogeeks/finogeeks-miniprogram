export default function messageFilter(mxEvent) {
  const allowedTypes = [
    'm.room.create',
    'm.room.message',
    'm.room.name',
    'm.room.member',
    'm.room.redaction',
    'm.swan.push_retail.transfer',
  ];
  const { event } = mxEvent;
  // console.log('type:', mxEvent.getType());
  const isEvalReply =
    event.content.msgtype === 'fc.convo.reply' && event.content.hide;
  // 过滤 notice 消息
  let isVisibleNotice = true;
  if (event.content.msgtype === 'm.notice' && event.content.extra) {
    if (!event.content.extra.retailVisible) {
      isVisibleNotice = false;
    }
  }
  return (
    allowedTypes.includes(mxEvent.getType()) && !isEvalReply && isVisibleNotice
  );
  // return true
}
