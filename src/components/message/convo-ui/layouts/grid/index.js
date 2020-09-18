import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.scss';
import CWidget from '../../widget';

class CGrid extends Component {
  render() {
    const { widgets } = this.props.params;
    return (
      <View className='grid'>
        {widgets.map((row, idx) => {
          return (
            <View className='row' key={idx}>
              {row.map((widget, index) => {
                return (
                  <CWidget
                    className='text'
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

CGrid.defaultProps = {
  title: '',
  params: {
    text: '',
    widgets: [[]],
  },
  onWidgetTap: () => {},
};

export default CGrid;
