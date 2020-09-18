import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './index.scss';

const activeStyle = {
  backgroundColor: '#EEEEEE',
};

class ListItem extends Component {
  constructor() {
    this.state = {
      isActive: false,
    };
  }

  handleTouchStart = () => {
    this.setState({ isActive: true });
  };

  handleTouchEnd = () => {
    this.setState({ isActive: false });
  };

  render() {
    const { padding } = this.props;
    const listStyle = {
      padding: `40rpx ${padding || 30}rpx`,
      backgroundColor:
        (this.props.activeStyle && this.state.isActive && '#EEEEEE') ||
        '#FFFFFF',
    };
    return (
      <View
        className='list_item'
        onClick={this.props.onClick}
        onTouchStart={this.handleTouchStart}
        onTouchEnd={this.handleTouchEnd}
        onTouchCancel={this.handleTouchEnd}
        style={listStyle}
      >
        <View className='left'>
          {this.props.icon && <Text className='icon'>{this.props.icon}</Text>}
          <Text className='text'>{this.props.name}</Text>
        </View>
        <View className='right'>
          {this.props.statusText && (
            <Text className='text' style={{ color: '9B9B9B' }}>
              {this.props.statusText}
            </Text>
          )}
          {this.props.hasNotif && <Text className='notif_right'></Text>}
          {this.props.hasRightArrow && (
            <Text className='arrow_right'>&#xe621;</Text>
          )}
        </View>
      </View>
    );
  }
}

ListItem.defaultProps = {
  icon: '',
  name: '',
  statusText: '',
  hasRightArrow: false,
  hasNotif: false,
  activeStyle: false,
  onClick: () => {},
};

export default ListItem;
