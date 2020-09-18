import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import './index.scss';

class CRadioButton extends Component {
  render() {
    const { title, background, color, height, size, show, icon } = this.props;
    return (
      <View
        className='radio-button'
        style={{
          color,
          backgroundColor: background,
          height: `${height}px`,
          fontSize: `${size}px`,
        }}
      >
        {icon && <Image className='icon' mode='aspectFill' src={icon} />}
        {title}
      </View>
    );
  }
}

CRadioButton.defaultProps = {
  title: '',
  action: 'reply',
  value: '',
  payload: null,
  background: '#FFF',
  clickable: false,
  color: '#666666',
  height: 35,
  show: '',
  size: 14,
  icon: '',
};

export default CRadioButton;
