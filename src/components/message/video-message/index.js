import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';

import videoPlayImage from '../../../assets/message/room_video_play.svg';
import './index.scss';

export default class VideoMessage extends Component {
  constructor(props) {
    super(props);
  }

  getImageWH() {
    const { message } = this.props;

    let w = message.content.info.w || message.content.info.thumbnail_info.w;
    let h = message.content.info.h || message.content.info.thumbnail_info.h;

    let maxW = w / h > 2 ? 300 : w / h > 1 ? 240 : 180;
    if (w > maxW) {
      h = (h * maxW) / w;
      w = maxW;
    }

    return {
      width: `${Math.floor(w)}px`,
      height: `${Math.floor(h)}px`,
    };
  }

  playVideo(video) {
    this.props.onVideo(video);
  }

  render() {
    const { message } = this.props;
    if (!message || !message.content || !message.content.info) {
      return;
    }
    const url = message.content.url.replace('?', '/mp4?');
    const poster = message.content.info.thumbnail_url;
    const name = message.content.body;
    const style = this.getImageWH();
    
    if (!message.content.flag) {
      return (
        <View
          style={style ? `width: ${style.width}; height: ${style.height};` : ''}
          className='bubble'
          onClick={this.playVideo.bind(this, {
            url,
            poster,
            name,
          })}
        >
          <Image className='image' mode='aspectFill' src={poster} />
          <Image className='icon' src={videoPlayImage} />
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
