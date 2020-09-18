'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var WECHAT_FILE_TYPES = {
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  'application/msword': 'docx',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
  'application/vnd.ms-excel': 'xlsx',
  'application/vnd.ms-powerpoint': 'pptx',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',
  'application/pdf': 'pdf',
  'audio/amr': 'amr',
  'audio/mp3': 'mp3',
  'video/mp4': 'mp4',
  'video/ogg': 'ogg',
  'image/gif': 'gif',
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/heic': 'heic'
};

var getMimeType = exports.getMimeType = function getMimeType(filepath) {
  var parts = filepath.split('.');
  var extName = parts[parts.length - 1].toLowerCase();
  var keys = Object.keys(WECHAT_FILE_TYPES);
  for (var index = 0; index < keys.length; index++) {
    var pattern = keys[index];
    if (WECHAT_FILE_TYPES[pattern] === extName) {
      return pattern;
    }
  }
  return '';
};

exports.default = {
  getMimeType: getMimeType
};