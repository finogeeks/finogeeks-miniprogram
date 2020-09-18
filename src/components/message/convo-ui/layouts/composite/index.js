import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.scss';
import Clinear from '../linear';
import CTable from '../table';
import CGrid from '../grid';

class Composite extends Component {
  render() {
    const { layouts } = this.props.params;
    return (
      <View className='composite'>
        {layouts.map((layout, idx) => {
          const { type, title, params } = layout;
          const isComposite = true;
          return (
            <View key={idx} className='layout'>
              {type === 'linear' && (
                <Clinear
                  title={title}
                  isComposite={isComposite}
                  params={params}
                  onWidgetTap={this.props.onWidgetTap}
                />
              )}
              {type === 'table' && (
                <CTable
                  title={title}
                  isComposite={isComposite}
                  params={params}
                  onWidgetTap={this.props.onWidgetTap}
                />
              )}
              {type === 'grid' && (
                <CGrid
                  title={title}
                  isComposite={isComposite}
                  params={params}
                  onWidgetTap={this.props.onWidgetTap}
                />
              )}
            </View>
          );
        })}
      </View>
    );
  }
}

Composite.defaultProps = {
  title: '',
  params: {
    layouts: [],
  },
  onWidgetTap: () => {},
};

export default Composite;
