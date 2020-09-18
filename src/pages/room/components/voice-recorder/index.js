import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './index.scss';

class VoiceRecorder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'recording',
      time: 0,
    };
  }

  componentWillMount() {
    this.recorderManager = Taro.getRecorderManager();

    this.recorderManager.onStart(() => {
      console.log('recorder start');
      this.timer = setInterval(() => {
        this.setState({
          time: this.state.time + 1,
        });
      }, 1000);
    });
    this.recorderManager.onStop(res => {
      if (this.timer) {
        const { tempFilePath } = res;
        clearInterval(this.timer);
        console.log('recorder stop', res);
      } else {
        console.log('already stop');
      }
    });

    const options = {
      duration: 60000,
      sampleRate: 44100,
      numberOfChannels: 1,
      encodeBitRate: 192000,
      format: 'mp3',
    };

    this.recorderManager.start(options);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
    this.recorderManager.stop();
  }

  sendVoiceMessage = () => {};

  cancel = () => {
    this.props.onCancel && this.props.onCancel();
  };

  parseTime = time => {
    if (time < 10) {
      return `0:0${time}`;
    } else if (time < 60) {
      return `0:${time}`;
    } else {
      return '1:00';
    }
  };

  render() {
    const { status, time } = this.state;
    return (
      <View className='record-wrap'>
        {status === 'recording' && (
          <View className='status'>
            <Text>录音中：</Text>
            <Text className='time'>{this.parseTime(time)}</Text>
          </View>
        )}
        {status === 'sending' && (
          <View className='status'>
            <Text>发送中</Text>
          </View>
        )}
        <View className='cancel' onTap={this.cancel}>
          取消
        </View>
        <View className='icon' onTap={this.sendVoiceMessage}>
          &#xe609;
        </View>
      </View>
    );
  }
}

VoiceRecorder.defaultProps = {
  onCancel: () => {},
};

export default VoiceRecorder;
