import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './index.scss';

class RoomBadge extends Component {
  render() {
    const text =
      this.props.count > this.props.maxValue
        ? String(this.props.maxValue) + '+'
        : this.props.count !== 0
        ? String(this.props.count)
        : '';
    if (text) {
      return (
        <View className='badge_wrapper'>
          <View className='room_badge'>
            <Text>{text}</Text>
          </View>
          {this.props.children}
        </View>
      );
    }
    return <View>{this.props.children}</View>;
  }
}

RoomBadge.defaultProps = {
  maxValue: 99,
  count: 0,
};

export default RoomBadge;
