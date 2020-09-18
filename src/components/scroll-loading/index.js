import Taro, { Component } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import classNames from 'classnames';

import './index.scss';

class ScrollLoading extends Component {
  static options = { addGlobalClass: true };
  constructor() {
    super(...arguments);

    this.state = {};
  }

  render() {
    const { className, hasMore, loadingText, noMoreText, loading } = this.props;
    const rootClass = classNames('scroll-loading', className);
    return (
      <View className={rootClass}>
        {loading && (
          <View className='loading'>
            <Button className='loading-btn' plain loading>
              {loadingText}
            </Button>
          </View>
        )}
        {!loading && !hasMore && <View className='no-more'>{noMoreText}</View>}
      </View>
    );
  }
}

ScrollLoading.defaultProps = {
  className: '',
  hasMore: true,
  loadingText: '加载中...',
  noMoreText: '已加载全部',
  loading: false,
};

export default ScrollLoading;
