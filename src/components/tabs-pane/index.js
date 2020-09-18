import Taro, { Component } from '@tarojs/taro';
import classNames from 'classnames';
import { View } from '@tarojs/components';

import './index.scss';

class TabsPane extends Component {
  render() {
    const { customStyle, className, index, current } = this.props;

    return (
      <View
        className={classNames(
          {
            'tabs-pane': true,
            'tabs-pane--active': index === current,
            'tabs-pane--inactive': index !== current,
          },
          className,
        )}
        customStyle={customStyle}
      >
        {this.props.children}
      </View>
    );
  }
}

TabsPane.defaultProps = {
  customStyle: '',
  className: '',
  index: 0,
  current: 0,
};

export default TabsPane;
