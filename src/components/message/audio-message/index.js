import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './index.scss';

const primaryIconStyle = {
  color: '1951AE',
};

const progressStyle = {
  color: 'E5D8D8',
  backgroundColor: 'E5D8D8',
};

export default class AudioMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      progress: 0,
    };
  }

  getBubbleWidth = () => {
    const { message } = this.props;
    const duration = message.content.info ? message.content.info.duration : 0;
    return `${Math.floor(duration / 1000) * 6 + 200}rpx`;
  };

  playVoice() {
    const { message } = this.props;
    if (this.state.isPlaying) {
      this.innerAudioContext && this.innerAudioContext.stop();
      return;
    }
    const innerAudioContext = Taro.createInnerAudioContext();
    this.innerAudioContext = innerAudioContext;
    innerAudioContext.autoplay = false;
    innerAudioContext.src = `${message.content.url}&mp3=true`;
    innerAudioContext.onPlay(() => {
      console.log('playing');
      this.setState({
        isPlaying: true,
      });
    });
    innerAudioContext.onStop(() => {
      console.log('stop');
      this.setState({
        isPlaying: false,
      });
    });
    innerAudioContext.onEnded(() => {
      console.log('end');
      this.setState({
        isPlaying: false,
      });
    });
    innerAudioContext.onError(res => {
      console.log(res.errMsg);
      console.log(res.errCode);
      this.setState({
        isPlaying: false,
      });
    });
    innerAudioContext.onTimeUpdate(() => {
      let progress = Math.ceil(
        (innerAudioContext.currentTime / innerAudioContext.duration) * 100,
      );
      progress = progress < 2 ? 2 : progress;
      progress = progress > 100 ? 100 : progress;
      this.setState({
        progress: progress,
      });
    });
    innerAudioContext.play();
  }

  render() {
    const { isPlaying, progress } = this.state;
    const { message, isMy } = this.props;
    if (!message || !message.content || !message.content.info) {
      return;
    }
    return (
      <View
        className={`bubble ${isMy ? 'my' : ''}`}
        style={{ width: this.getBubbleWidth() }}
        onClick={this.playVoice}
      >
        <Text>
          {`${Math.floor((message.content.info.duration || 0) / 1000)}`}&quot;
        </Text>
        <Text
          className={`icon ${isPlaying ? 'playing' : ''}`}
          style={isMy || isPlaying ? primaryIconStyle : ''}
        ></Text>
        {isPlaying ? (
          <View
            className='progress'
            style={
              isMy
                ? { ...progressStyle, width: `${progress}%` }
                : { width: `${progress}%` }
            }
          ></View>
        ) : (
          ''
        )}
      </View>
    );
  }
}
