import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.scss';
import Clinear from './layouts/linear';
import CTable from './layouts/table';
import CGrid from './layouts/grid';
import Composite from './layouts/composite';

class ConvoUI extends Component {
  onWidgetTap = payload => {
    const { widget } = payload;
    const { message } = this.props;
    this.props.onConvo({
      widget,
      content: message.content,
    });
  };

  render() {
    const { type, title, params } = this.props.message.content.layout;
    return (
      <View className='convo-container'>
        {type === 'linear' && (
          <Clinear
            title={title}
            params={params}
            onWidgetTap={this.onWidgetTap}
          />
        )}
        {type === 'table' && (
          <CTable
            title={title}
            params={params}
            onWidgetTap={this.onWidgetTap}
          />
        )}
        {type === 'grid' && (
          <CGrid title={title} params={params} onWidgetTap={this.onWidgetTap} />
        )}
        {type === 'composite' && (
          <Composite
            title={title}
            params={params}
            onWidgetTap={this.onWidgetTap}
          />
        )}
      </View>
    );
  }
}

ConvoUI.defaultProps = {
  message: {
    content: {
      body: '',
      layout: {
        type: 'linear',
        title: '',
        display: {
          type: 'inplace',
        },
        params: {
          text: '',
          widgets: [],
        },
      },
    },
  },
  onConvo: () => {},
};

export default ConvoUI;
