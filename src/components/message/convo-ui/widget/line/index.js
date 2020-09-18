import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.scss';

class CLine extends Component {
  render() {
    const { height, color } = this.props;
    return (
      <View
        className='convo-line'
        style={{ height: '1px', backgroundColor: `${color}` }}
      />
    );
  }
}

CLine.defaultProps = {
  height: 0.5,
  margin: 14.5,
  color: '#d9d9d9',
};

export default CLine;
