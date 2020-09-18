import QueryString from 'qs';
import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import isEqual from '@/utils/lodash-local/is-equal';
import httpClient from '@/utils/http-client';
import { setCacheSync } from '../../../utils/store';
import './index.scss';

const prefixPath = path => {
  const prefix = path.startsWith('/') ? '' : '/';
  return `${prefix}${path}`;
};

export default class AppletMessage extends Component {
  constructor() {
    super();
    this.state = {
      isThumbError: false,
    };
  }

  handleOpenApplet = () => {
    const { info } = this.props.message.content;
    const { weixin } = info.appInfo;
    const launchOptions = Taro.getLaunchOptionsSync();
    const { referrerInfo } = launchOptions;
    console.log('login referrerInfo: ', referrerInfo);
    setCacheSync('isMsgSend', false);
    if (!weixin.path) return;
    /**
     * 这里本来是跳转工作室小程序的
     * 但现在跟工作室小程序合并后，这里的逻辑变成了跳转页面
     * 跟原来定下来的协议的语义有冲突，待优化
     */
    const pages = Taro.getCurrentPages();
    const previousPage = pages[pages.length - 2];
    // 从观点详情进入房间，navigateBack回观点详情
    if (
      previousPage &&
      prefixPath(previousPage.route) === prefixPath(weixin.path)
    ) {
      // 查看其它观点详情，emit事件更新观点数据
      if (!isEqual(previousPage.options, weixin.query)) {
        const { eventBus } = Taro.getApp().globalData;
        eventBus.emit('STUDIO_UPDATE_PAGE', weixin);
      }
      Taro.navigateBack();
      return;
    }
    const from = 'ROOM';
    const query = { from, ...weixin.query };
    Taro.navigateTo({
      url: `${prefixPath(weixin.path)}?${QueryString.stringify(query)}`,
    });
    // if (referrerInfo.extraData && referrerInfo.extraData.from) {
    //   Taro.navigateBackMiniProgram({
    //     extraData: {
    //       page: weixin.page,
    //     }
    //   })
    // } else {
    //   Taro.navigateToMiniProgram({
    //     appId:weixin.appId,
    //     path: weixin.page,
    //     envVersion: weixin.envVersion
    //   })
    // }
  };

  handleThumbError = () => {
    this.setState({ isThumbError: true });
  };

  render() {
    const { message } = this.props;
    if (!message || !message.content || !message.content.info) {
      return;
    }
    const {
      appAvatar,
      appTitle,
      appInfo,
      appDescription,
      appThumbnail = '',
    } = message.content.info;
    const { introText, payload } = appInfo;

    const thumbImage = appThumbnail.startsWith('http')
      ? appThumbnail
      : httpClient.netdiskThumb(appThumbnail);

    // 通用小程序消息气泡
    if (!payload) {
      return (
        <View className='bubble' onClick={this.handleOpenApplet}>
          <View className='header'>
            <Image className='app-avatar' mode='aspectFill' src={appAvatar} />
            <Text className='app-title'>{appTitle}</Text>
          </View>
          <View className='content'>
            <Text className='text'>{appDescription}</Text>
            {this.state.isThumbError ? (
              <View className='thumb-error'>
                <View className='iconfont'>&#xe63e;</View>
              </View>
            ) : (
              <Image
                className='thumb'
                mode='aspectFill'
                src={thumbImage}
                onError={this.handleThumbError}
              />
            )}
          </View>
        </View>
      );
    }

    return (
      <View className='bubble' onClick={this.handleOpenApplet}>
        <View className='content'>
          <View className='intro-text'>{introText}</View>
          {!!(payload && payload.text) && (
            <View className='intro-detail'>
              <Image className='image' mode='aspectFill' src={payload.imgUrl} />
              <Text className='text'>{payload.text}</Text>
            </View>
          )}
        </View>
        <View className='footer'>
          <Image className='app-avatar' mode='aspectFill' src={appAvatar} />
          <Text className='text'>{appTitle}</Text>
        </View>
      </View>
    );
  }
}
