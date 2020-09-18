import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './index.scss';

class CFooter extends Component {
  render() {
    const { title } = this.props;

    return (
      <View className='convo-footer' hoverClass='convo-footer-hover'>
        <Text>{title}</Text>
        <View className='icon footer-icon'>&#xe621;</View>
      </View>
    );
  }
}

CFooter.defaultProps = {
  title: '',
  icon: '',
  date: '',
  href: '',
};

export default CFooter;
