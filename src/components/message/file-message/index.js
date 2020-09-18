import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './index.scss';

const FILE_TYPES = {
  '': 'other',

  'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    'docx',
  'application/msword': 'docx',

  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
  'application/vnd.ms-excel': 'xlsx',

  'application/vnd.openxmlformats-officedocument.presentationml.presentation':
    'pptx',
  'application/vnd.ms-powerpoint': 'pptx',

  'application/pdf': 'pdf',

  'text/plain': 'other',
};

export default class FileMessage extends Component {
  getFileType(mime) {
    if (mime in FILE_TYPES) {
      return FILE_TYPES[mime];
    }
    return 'other';
  }

  getFileSize() {
    const { message } = this.props;

    const size = message.content.info.size;
    if (typeof size != 'number') return '';

    let label;
    if (size > 1024 * 1024 * 1024 * 1024) {
      label = (size / 1024 / 1024 / 1024 / 1024).toFixed(2) + 'T';
    } else if (size > 1024 * 1024 * 1024) {
      label = (size / 1024 / 1024 / 1024).toFixed(2) + 'G';
    } else if (size > 1024 * 1024) {
      label = (size / 1024 / 1024).toFixed(2) + 'M';
    } else if (size > 1024) {
      label = Math.floor(size / 1024) + 'K';
    } else {
      label = size + 'B';
    }
    return label;
  }

  async handleOpenFile() {
    const { message } = this.props;
    const url = message.content.url;
    const fileType = this.getFileType(message.content.info.mimetype || '');
    if (fileType === 'other') {
      Taro.showToast({
        title: '小程序暂不支持该文件类型',
        icon: 'none',
        mask: true,
      });
      return;
    }
    const res = await Taro.downloadFile({ url });
    await Taro.openDocument({ filePath: res.tempFilePath });
  }

  render() {
    const { message } = this.props;
    if (!message || !message.content || !message.content.info) {
      return;
    }
    const fileType = this.getFileType(message.content.info.mimetype || '');
    console.log(message.content.flag);
    if (!message.content.flag) {
      return (<View className='bubble' onClick={this.handleOpenFile}>
        <View className='info'>
          <Text className='title'>{message.content.body}</Text>
          <Text className='size'>{this.getFileSize()}</Text>
        </View>
        <View className={`icon ${fileType}`}></View>
      </View>)
    }
    return (
      <View className="secret-bubble">
        <Text className="secret">[保密消息暂时仅支持在手机上查看]</Text>
      </View>
    );
  }
}
