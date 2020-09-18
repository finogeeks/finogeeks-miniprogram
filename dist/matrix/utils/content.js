'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateContentUrl = exports.makeContent = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // MARK Maybe we could use XML or YAML to define all the content templates later


var _message = require('../interface/message.js');

var makeTextContent = function makeTextContent(payload) {
  try {
    var msgtype = payload.msgtype,
        text = payload.text;

    return {
      msgtype: msgtype,
      body: text
    };
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
var makeImageContent = function makeImageContent(payload) {
  try {
    var msgtype = payload.msgtype,
        name = payload.name,
        url = payload.url,
        mimetype = payload.mimetype,
        width = payload.width,
        height = payload.height,
        size = payload.size;

    return {
      msgtype: msgtype,
      body: name,
      url: url,
      info: {
        mimetype: mimetype,
        w: width,
        h: height,
        size: size,
        thumbnail_url: url,
        thumbnail_info: {
          mimetype: mimetype,
          w: width,
          h: height,
          size: size
        }
      }
    };
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
var makeFileContent = function makeFileContent(payload) {
  try {
    var msgtype = payload.msgtype,
        name = payload.name,
        data = payload.data,
        mimetype = payload.mimetype,
        size = payload.size;

    return {
      msgtype: msgtype,
      body: name,
      url: data.netdiskID,
      info: {
        mimetype: mimetype,
        size: size
      }
    };
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
var makeLocationContent = function makeLocationContent(payload) {
  try {
    var msgtype = payload.msgtype,
        name = payload.name,
        address = payload.address,
        latitude = payload.latitude,
        longitude = payload.longitude;

    return {
      msgtype: msgtype,
      body: '[位置信息]',
      info: {
        name: name,
        address: address,
        latitude: latitude,
        longitude: longitude
      }
    };
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
var makeConvoReplyContent = function makeConvoReplyContent(payload) {
  try {
    var msgtype = payload.msgtype,
        reply = payload.reply,
        originContent = payload.originContent;

    if (reply.params.action === 'sendConvReply') {
      return {
        body: reply.title,
        msgtype: msgtype,
        version: '1.0',
        msgid: originContent.msgid,
        hide: reply.params.hide || false,
        reply: {
          action: reply.params.action,
          type: reply.type,
          body: reply.title,
          cargo: {}
        }
      };
    }
    if (reply.params.action === 'reply') {
      return {
        body: reply.title,
        msgtype: msgtype,
        version: '1.0',
        msgid: originContent.msgid,
        hide: reply.params.hide || false,
        reply: {
          type: 'ui',
          cargo: _extends({}, reply.params, {
            text: originContent.layout.params.text
          })
        }
      };
    }
    throw new Error('Unexpected convo reply action');
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
var makeContent = function makeContent(payload) {
  if (payload.content) {
    // concatenate content and extend if content is offered
    return _extends({}, payload.content, payload.extend || {});
  }
  try {
    var msgtype = payload.msgtype,
        _payload$extend = payload.extend,
        extend = _payload$extend === undefined ? {} : _payload$extend;

    var content = void 0;
    switch (msgtype) {
      // Basic msgtype
      case _message.MessageType.Text:
        content = makeTextContent(payload);
        break;
      case _message.MessageType.Alert:
        // TODO
        break;
      case _message.MessageType.Url:
        // TODO
        break;
      case _message.MessageType.Location:
        content = makeLocationContent(payload);
        break;
      case _message.MessageType.Signal:
        // TODO
        break;
      case _message.MessageType.Notice:
        // TODO
        break;
      // Media types
      case _message.MessageType.Image:
        content = makeImageContent(payload);
        break;
      case _message.MessageType.Video:
        // TODO
        break;
      case _message.MessageType.Audio:
        // TODO
        break;
      case _message.MessageType.File:
        content = makeFileContent(payload);
        break;
      // Custom types
      case _message.MessageType.ConvoReply:
        content = makeConvoReplyContent(payload);
        break;
      // P2P encryption types
      case _message.MessageType.BadEncrypted:
        // TODO
        break;
      default:
        content = payload;
        break;
    }
    if (!content) {
      throw new Error('msgtype is not supported yet');
    }
    return _extends({}, content, extend);
  } catch (error) {
    return undefined;
  }
};
var updateContentUrl = function updateContentUrl(content, url) {
  try {
    content.url = url;
    if (content.info && content.info.thumbnail_url) {
      content.info.thumbnail_url = url;
    }
    return content;
  } catch (error) {
    return content;
  }
};
exports.makeContent = makeContent;
exports.updateContentUrl = updateContentUrl;