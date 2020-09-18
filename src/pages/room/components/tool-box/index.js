import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './index.scss';

class ToolBox extends Component {
  handleChooseImage = async () => {
    console.log('choose image');
    const res = await Taro.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
    });
    const tempFiles = res.tempFiles;
    // await this.handleImage(tempFiles)
    this.props.onAction({ type: 'image', content: tempFiles });
  };

  handleTakePhoto = async () => {
    console.log('take photo');
    const res = await Taro.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['camera'],
    });
    const tempFiles = res.tempFiles;
    // await this.handleImage(tempFiles)
    this.props.onAction({ type: 'image', content: tempFiles });
  };

  handleChooseFile = () => {};

  handleLeaveMessage = () => {
    this.props.onAction && this.props.onAction({ type: 'leave-message' });
  };

  handleChooseLocation = async () => {
    this.props.onAction({ type: 'location' });
  };

  render() {
    const { roomType, height } = this.props;
    return (
      <View className='tool-wrap' style={{ height: `${height}rpx` }}>
        <View className='item'>
          <View className='wrap' onTap={this.handleChooseImage}>
            &#xe607;
          </View>
          <Text className='name'>照片</Text>
        </View>
        <View className='item'>
          <View className='wrap' onTap={this.handleTakePhoto}>
            &#xe624;
          </View>
          <Text className='name'>拍照</Text>
        </View>
        {roomType === 'SMART_BOT' ? (
          <View className='item'>
            <View className='wrap' onTap={this.handleLeaveMessage}>
              &#xe606;
            </View>
            <Text className='name'>留言</Text>
          </View>
        ) : (
          ''
        )}
        <View className='item'>
          <View className='wrap' onTap={this.handleChooseLocation}>
            &#xe605;
          </View>
          <Text className='name'>位置</Text>
        </View>
      </View>
    );
  }
}

ToolBox.defaultProps = {
  roomId: '',
  roomType: '',
  orderId: '',
  dispatchInfo: {},
  onAction: () => {},
  height: 0,
};

export default ToolBox;
