import Taro, { Component } from '@tarojs/taro';
import { Video, Image } from '@tarojs/components';
// import NavBar from "@/components/nav-bar";

import './index.scss';

export default class VideoPreview extends Component {
  config = {
    navigationBarTitleText: '跳转中',
  };

  constructor(props) {
    super(props);

    this.platform = '';
    this.filePath = '';
    this.videoContext = null;
    this.state = {
      url: '',
      poster: '',
      type: '',
    };
  }

  componentWillMount() {
    const res = Taro.getSystemInfoSync();
    this.platform = res.platform;
  }

  componentDidShow() {
    const { name, url, poster, type } = this.$router.params;
    Taro.setNavigationBarTitle({ title: name || '媒体文件' });
    this.setState({
      type,
      poster: decodeURIComponent(poster),
    });
    if (this.platform === 'android') {
      this.downloadFile(url);
    } else {
      this.setState({
        url,
      });
    }
  }

  downloadFile = async url => {
    Taro.showLoading({
      title: '加载中',
    });
    const res = await Taro.downloadFile({
      url: url,
    });
    if (res && res.statusCode === 200) {
      this.filePath = res.tempFilePath;
      this.setState(
        {
          url: res.tempFilePath,
        },
        () => {
          this.videoContext = Taro.createVideoContext('video');
          this.videoContext.play();
          Taro.hideLoading();
        },
      );
    }
  };

  render() {
    const { url, poster, type } = this.state;
    if (type === 'video' && url) {
      return (
        <Video
          src={url}
          poster={poster}
          controls
          initialTime='0'
          id='video'
          className='media'
          autoplay
        />
      );
    }
    return <Image className='media' mode='aspectFit' src={poster}></Image>;
  }
}
