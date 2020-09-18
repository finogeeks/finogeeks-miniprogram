import Taro, { Component } from '@tarojs/taro';
import classNames from 'classnames';
import { View, Video } from '@tarojs/components';
import httpClient from '@/utils/http-client';
import './index.scss';

class VideoPlayer extends Component {
  constructor(props) {
    super(...arguments);
    const { isOpened } = props;
    this.state = {
      _isOpened: isOpened,
      videoUrl: '',
      autoPlay: false,
      fullScreen: false,
    };
  }
  componentWillMount() {}

  componentWillReceiveProps(nextProps) {
    const { isOpened } = nextProps;

    if (!nextProps) return;
    isOpened
      ? this.requestVideoPlay(nextProps)
      : this.requestVideoPreview(nextProps);

    if (isOpened !== this.state._isOpened) {
      this.setState({
        _isOpened: isOpened,
      });
    }
  }
  requestVideoPreview = () => {};
  requestVideoPlay = props => {
    const { width, height, netdiskId } = props;
    const videoContext = wx.createVideoContext('player');
    const videoUrl = httpClient.netdiskVideo(netdiskId);
    const direction = width > height ? 90 : 0;
    videoContext.requestFullScreen({ direction });
    this.setState({
      videoUrl,
      autoPlay: true,
    });
  };

  handleVideoError = e => {
    // TODO error handling
    console.log('DEBUG: handleVideoError -> e', e);
  };

  handleFullscreenChange = e => {
    console.log('DEBUG: handleFullscreenChange -> e', e);

    const fullScreen = e.target.fullScreen;
    if (fullScreen) {
      return;
    }
    const videoContext = wx.createVideoContext('player');
    videoContext.stop();
    this.setState({
      videoUrl: '',
      autoPlay: false,
      fullScreen,
    });
  };
  render() {
    const { className } = this.props;
    const { _isOpened, videoUrl, autoPlay, fullScreen } = this.state;
    const rootClass = classNames(
      'video-player',
      {
        'video-player--active': _isOpened,
      },
      className,
    );

    return (
      <View className={rootClass}>
        {_isOpened && (
          <Video
            id='player'
            show-fullscreen-btn={fullScreen}
            url={videoUrl}
            autoplay={autoPlay}
            onError={this.handleVideoError.bind(this)}
            onFullscreenchange={this.handleFullscreenChange.bind(this)}
          />
        )}
      </View>
    );
  }
}

VideoPlayer.defaultProps = {
  customStyle: '',
  className: '',
  width: 0,
  height: 0,
  netdiskId: '',
  isOpened: false,
};

export default VideoPlayer;
