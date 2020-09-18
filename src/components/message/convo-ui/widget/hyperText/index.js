import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './index.scss';

class CHyperText extends Component {
  render() {
    const { title, action } = this.props;
    return (
      <View className='convo-hyper-text'>
        <Text>{title}</Text>
      </View>
    );
  }
}

CHyperText.defaultProps = {
  title: '',
  href: '',
  action: '',
};

export default CHyperText;
