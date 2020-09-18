import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import './index.scss';

export default class ImageMessage extends Component {
  getImageWH() {
    const { message } = this.props;

    let w = message.content.info.w || message.content.info.thumbnail_info.w;
    let h = message.content.info.h || message.content.info.thumbnail_info.h;

    let maxW = w / h > 2 ? 600 : w / h > 1 ? 500 : 360;
    if (w > maxW) {
      h = (h * maxW) / w;
      w = maxW;
    }

    return {
      width: `${Math.floor(w)}rpx`,
      height: `${Math.floor(h)}rpx`,
    };
  }

  previewImage(url) {
    Taro.previewImage({
      current: url,
      urls: [url],
    });
  }

  render() {
    const { message } = this.props;
    if (!message || !message.content || !message.content.info) {
      return;
    }
    const url = message.content.url;
    const thumbnailUrl =
      message.content.info.thumbnail_url || message.content.url;
    const style = this.getImageWH();

    // console.log('~~~~~~~~~~·IMAGE MESSAGE~~~~~~~~~~~');
    // console.log(message.content.flag, thumbnailUrl);

    if (!message.content.flag) {
      return (
        <View
          style={style ? `width: ${style.width}; height: ${style.height};` : ''}
          className='bubble'
          onClick={this.previewImage.bind(this, url)}
        >
          {thumbnailUrl ? (
            <Image className='image' mode='aspectFill' src={thumbnailUrl} />
          ) : (
            <View className='icon fail-img'>&#xe613;</View>
          )}
        </View>
      );
    }
    return (
      <View className="secret-bubble">
        <Text className="secret">[保密消息暂时仅支持在手机上查看]</Text>
      </View>
    );
  }
}
