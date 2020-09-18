import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './index.scss';

export default class LocationMessage extends Component {
  openAddress() {
    const { message } = this.props;
    const { latitude, longitude } = message.content.info;
    this.props.onLocation &&
      this.props.onLocation({
        latitude,
        longitude,
        scale: 18,
      });
  }

  render() {
    const { message } = this.props;
    if (!message || !message.content || !message.content.info) {
      return;
    }

    const { address, name } = message.content.info;
    return (
      <View className='bubble' onClick={this.openAddress}>
        <View className='content'>
          <View className='info'>
            <Text className='title text-overflow'>{name}</Text>
            <Text className='desc text-overflow'>{address}</Text>
          </View>
          <View className='icon'>&#xe605;</View>
        </View>
      </View>
    );
  }
}
