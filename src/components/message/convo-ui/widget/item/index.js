import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.scss';

class CItem extends Component {
  render() {
    const { title } = this.props;
    return (
      <View className='convo-item' hoverClass='convo-item-hover'>
        {title}
      </View>
    );
  }
}

CItem.defaultProps = {
  title: '',
  action: 'sendMessage', //"sendConvReply"
};

export default CItem;
