import Taro, { Component } from '@tarojs/taro';
import { View, Swiper, SwiperItem } from '@tarojs/components';
import './index.scss';

class EmojiList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emojis: [
        [
          '😥',
          '😄',
          '😃',
          '😀',
          '😊',
          '☺',
          '😉',
          '😍',
          '😘',
          '😚',
          '😗',
          '😙',
          '😜',
          '😝',
          '😛',
          '😳',
          '😁',
          '😔',
          '😌',
          '😒',
          '😞',
          '😣',
          '😢',
          '😭',
          '😪',
          '😥',
          '😰',
          '😅',
          '😓',
          '😩',
        ],
        [
          '😫',
          '😨',
          '😱',
          '😠',
          '😡',
          '😤',
          '😖',
          '😆',
          '😋',
          '😷',
          '😎',
          '😴',
          '😵',
          '😲',
          '😟',
          '😦',
          '😈',
          '👿',
          '😮',
          '😬',
          '😐',
          '😕',
          '😯',
          '😶',
          '😇',
          '😏',
          '😑',
          '👲',
          '👳',
          '👮',
        ],
        [
          '👷',
          '💂',
          '👶',
          '👦',
          '👧',
          '👨',
          '👩',
          '👴',
          '👵',
          '👼',
          '👸',
          '😺',
          '😸',
          '😻',
          '😽',
          '😼',
          '🙀',
          '😿',
          '😹',
          '😾',
          '👹',
          '👺',
          '🙈',
          '🙉',
          '🙊',
          '💀',
          '👽',
          '💩',
          '🔥',
          '✨',
        ],
        [
          '🌟',
          '💫',
          '💢',
          '💦',
          '💧',
          '💤',
          '💨',
          '👂',
          '👀',
          '👃',
          '👅',
          '👄',
          '👍',
          '👎',
          '👌',
          '👊',
          '✊✌',
          '👋',
          '✋',
          '👐',
          '👆',
          '👇',
          '👉',
          '👈',
          '🙏',
          '☝',
          '👏',
          '💪',
        ],
      ],
    };
  }

  handleSelect = emoji => {
    this.props.onSelect && this.props.onSelect(emoji);
  };

  cancel = () => {
    this.props.onCancel && this.props.onCancel();
  };

  render() {
    const { emojis } = this.state;
    return (
      <Swiper
        className='emoji-wrap'
        indicatorColor='#D9D9D9'
        indicatorActiveColor='#9B9B9B'
        vertical={false}
        circular
        indicatorDots
        style={{ height: `${this.props.height}rpx` }}
      >
        {emojis.map((group, index) => {
          return (
            <SwiperItem className='group-wrap' key={index}>
              <View className='group'>
                {group.map(emoji => {
                  return (
                    <View
                      className='item'
                      key={emoji}
                      onTap={this.handleSelect.bind(this, emoji)}
                    >
                      {emoji}
                    </View>
                  );
                })}
              </View>
            </SwiperItem>
          );
        })}
      </Swiper>
    );
  }
}

EmojiList.defaultProps = {
  onSelect: () => {},
  height: 0,
};

export default EmojiList;
