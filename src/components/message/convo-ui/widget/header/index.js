import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import './index.scss';

class CHeader extends Component {
  render() {
    const { title, icon, date } = this.props;

    return (
      <View className='convo-header'>
        <View className='title'>
          {icon && <Image className='icon' mode='aspectFill' src={icon} />}
          <Text>{title}</Text>
        </View>
        {date && <View className='time'>{date}</View>}
      </View>
    );
  }
}

CHeader.defaultProps = {
  title: '',
  icon: '',
  date: '',
  href: '',
};

export default CHeader;
