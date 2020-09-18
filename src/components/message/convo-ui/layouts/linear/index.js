import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './index.scss';
import CWidget from '../../widget';

class Clinear extends Component {
  render() {
    const { text, widgets } = this.props.params;
    const style = this.props.isComposite
      ? { border: 'none', borderRadius: '0px' }
      : {};
    return (
      <View className='linear' style={style}>
        <Text className='normal-text'>{text}</Text>
        {widgets.map((widget, idx) => {
          return (
            <CWidget
              widget={widget}
              key={idx}
              onWidgetTap={this.props.onWidgetTap}
            />
          );
        })}
      </View>
    );
  }
}

Clinear.defaultProps = {
  title: '',
  params: {
    text: '',
    widgets: [],
  },
  onWidgetTap: () => {},
  isComposite: false,
};

export default Clinear;
