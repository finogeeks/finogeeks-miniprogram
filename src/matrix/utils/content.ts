// MARK Maybe we could use XML or YAML to define all the content templates later

import { MessageType, MessageContent } from '../interface/message'

const makeTextContent = (payload:MessageContent) => {
  try {
    const { msgtype, text } = payload
    return {
      msgtype,
      body: text,
    }
  } catch (error) {
    console.error(error)
    return undefined
  }
}

const makeImageContent = (payload:MessageContent) => {
  try {
    const {
      msgtype, name, url, mimetype, width, height, size,
    } = payload

    return {
      msgtype,
      body: name,
      url,
      info: {
        mimetype,
        w: width,
        h: height,
        size,
        thumbnail_url: url,
        thumbnail_info: {
          mimetype,
          w: width,
          h: height,
          size,
        },
      },
    }
  } catch (error) {
    console.error(error)
    return undefined
  }
}

const makeFileContent = (payload:MessageContent) => {
  try {
    const {
      msgtype, name, data, mimetype, size,
    } = payload
    return {
      msgtype,
      body: name,
      url: data.netdiskID,
      info: {
        mimetype,
        size,
      },
    }
  } catch (error) {
    console.error(error)
    return undefined
  }
}

const makeLocationContent = (payload:MessageContent) => {
  try {
    const {
      msgtype, name, address, latitude, longitude,
    } = payload
    return {
      msgtype,
      body: '[位置信息]',
      info: {
        name,
        address,
        latitude,
        longitude,
      },
    }
  } catch (error) {
    console.error(error)
    return undefined
  }
}

const makeConvoReplyContent = (payload:MessageContent) => {
  try {
    const { msgtype, reply, originContent } = payload
    if (reply.params.action === 'sendConvReply') {
      return {
        body: reply.title,
        msgtype,
        version: '1.0',
        msgid: originContent.msgid,
        hide: reply.params.hide || false,
        reply: {
          action: reply.params.action,
          type: reply.type,
          body: reply.title,
          cargo: {},
        },
      }
    }
    if (reply.params.action === 'reply') {
      return {
        body: reply.title,
        msgtype,
        version: '1.0',
        msgid: originContent.msgid,
        hide: reply.params.hide || false,
        reply: {
          type: 'ui',
          cargo: {
            ...reply.params,
            text: originContent.layout.params.text,
          },
        },
      }
    }
    throw new Error('Unexpected convo reply action')
  } catch (error) {
    console.error(error)
    return undefined
  }
}


const makeContent = (payload:MessageContent) => {
  if (payload.content) {
    // concatenate content and extend if content is offered
    return {
      ...payload.content,
      ...(payload.extend || {}),
    }
  }

  try {
    const { msgtype, extend = {} } = payload
    let content
    switch (msgtype) {
    // Basic msgtype
    case MessageType.Text:
      content = makeTextContent(payload)
      break
    case MessageType.Alert:
      // TODO
      break
    case MessageType.Url:
      // TODO
      break
    case MessageType.Location:
      content = makeLocationContent(payload)
      break
    case MessageType.Signal:
      // TODO
      break
    case MessageType.Notice:
      // TODO
      break

    // Media types
    case MessageType.Image:
      content = makeImageContent(payload)
      break
    case MessageType.Video:
      // TODO
      break
    case MessageType.Audio:
      // TODO
      break
    case MessageType.File:
      content = makeFileContent(payload)
      break

    // Custom types
    case MessageType.ConvoReply:
      content = makeConvoReplyContent(payload)
      break

    // P2P encryption types
    case MessageType.BadEncrypted:
      // TODO
      break

    default:
      content = payload;
      break
    }

    if (!content) {
      throw new Error('msgtype is not supported yet')
    }

    return { ...content, ...extend }
  } catch (error) {
    return undefined
  }
}

const updateContentUrl = (content, url) => {
  try {
    content.url = url
    if (content.info && content.info.thumbnail_url) {
      content.info.thumbnail_url = url
    }
    return content
  } catch (error) {
    return content
  }
}

export {
  makeContent,
  updateContentUrl,
}
