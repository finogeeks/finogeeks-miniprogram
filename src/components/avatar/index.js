import Taro, { Component } from '@tarojs/taro';
import { Image, View } from '@tarojs/components';

import defaultAvatarImage from '../../assets/message/avatar_default.png';

import './index.scss';

class Avatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // defaultAvatarImage,
      avatarError: false,
    };
  }

  // componentDidMount = () => {
  //   this.setState({
  //     avatarError: false,
  //   });
  // }
  componentWillUnmount = () => {
    this.setState({
      avatarError: false,
    });
  }
  // componentDidUpdate = () => {
  //   this.setState({
  //     avatarError: false,
  //   });
  // }

  onAvatarError = () => {
    this.setState({
      avatarError: true,
    });
  };

  render() {
    const { avatarError } = this.state;
    const { url, size, circle, defaultAvatar, outterCircle, radius, className } = this.props;
    const circleStyle = circle
      ? {
          borderRadius: circle ? '50%' : '0',
          border: circle ? '1px solid transparent' : 'none',
        }
      : radius ? {
        borderRadius: '10rpx'
      } :
      {};
    // console.log(`~~~~~~~~Avatar url:${url} avatarError:${avatarError}~~~~~~~~~`);
    return (
      <View
        className={ `avatar ${className}` }
        style={{ width: `${size}rpx`, height: `${size}rpx`, borderRadius: outterCircle ? '50%' : 0 }}
      >
        {/* {avatarError || !url ? (
          <Image
            className='image'
            mode='aspectFill'
            style={circleStyle}
            src={defaultAvatar}
          />
        ) : ( */}
          <Image
            className='image'
            style={circleStyle}
            lazyLoad
            mode='aspectFill'
            src={url}
            onError={this.onAvatarError}
          />
        {/* )} */}
      </View>
    );
  }
}

Avatar.defaultProps = {
  url: null,
  size: 64,
  circle: false,
  defaultAvatar: defaultAvatarImage,
};

export default Avatar;
