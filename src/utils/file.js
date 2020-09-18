const WECHAT_FILE_TYPES = {
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    'docx',
  'application/msword': 'docx',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
  'application/vnd.ms-excel': 'xlsx',
  'application/vnd.ms-powerpoint': 'pptx',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation':
    'pptx',
  'application/pdf': 'pdf',
  'audio/amr': 'amr',
  'audio/mp3': 'mp3',
  'video/mp4': 'mp4',
  'video/ogg': 'ogg',
  'image/gif': 'gif',
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/heic': 'heic',
};

export const getMimeType = filepath => {
  const parts = filepath.split('.');
  const extName = parts[parts.length - 1].toLowerCase();
  const keys = Object.keys(WECHAT_FILE_TYPES);
  for (let index = 0; index < keys.length; index++) {
    const pattern = keys[index];
    if (WECHAT_FILE_TYPES[pattern] === extName) {
      return pattern;
    }
  }
  return '';
};

export default {
  getMimeType,
};
