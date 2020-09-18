import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './index.scss';
import CWidget from '../../widget';

class CTable extends Component {
  render() {
    const { text, widgets } = this.props.params;
    return (
      <View className='table'>
        <Text className='text-area'>{text}</Text>
        {widgets.map((row, idx) => {
          return (
            <View className='row' key={idx}>
              {row.map((widget, index) => {
                return (
                  <CWidget
                    widget={widget}
                    key={index}
                    onWidgetTap={this.props.onWidgetTap}
                  />
                );
              })}
            </View>
          );
        })}
      </View>
    );
  }
}

CTable.defaultProps = {
  title: '',
  params: {
    text: '',
    widgets: [[]],
  },
  onWidgetTap: () => {},
};

export default CTable;
