import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.scss';

class CButton extends Component {
  render() {
    const { title } = this.props;

    return (
      <View
        className='convo-button'
        style={{
          color: '#4285F4',
        }}
        hoverClass='convo-button-hover'
      >
        {title}
      </View>
    );
  }
}

CButton.defaultProps = {
  title: '',
  action: 'reply',
  value: '',
  payload: null,
};

export default CButton;
