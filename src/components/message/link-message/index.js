import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import authModel from '@/model/auth';
import extInfo from '@/utils/ext';
import './index.scss';

export default class LinkMessage extends Component {
  handleHistory = url => {
    const reg = /(\w*)$/gi;
    const result = url && url.match(reg);
    this.props.onLink &&
      this.props.onLink(`/packages/common/pages/history/index?orderId=${result[0]}`);
  };

  handleOpenLink = () => {
    const { message } = this.props;

    const { url, domain, title } = message.content.info;

    if (domain === '聊天记录') {
      this.handleHistory(url);
      return;
    }

    // const businessUrls = extInfo.BUSINESS_URL;
    // if (businessUrls && !businessUrls.some(bUrl => url.startsWith(bUrl))) {
    //   Taro.showModal({
    //     title: '提示',
    //     content: '小程序暂不支持外部链接的跳转',
    //     showCancel: false,
    //     confirmText: '知道了',
    //   });
    //   return;
    // }

    const userSession = authModel.getUserSession();
    let prefix = url;

    if (prefix.indexOf('jwt') < 0) {
      if (prefix.indexOf('?') < 0) {
        prefix = `${url}?jwt=${userSession.jwt}`;
      } else {
        prefix = `${url}&jwt=${userSession.jwt}`;
      }
    }
    this.props.onLink &&
      this.props.onLink(
        `/packages/common/pages/webview/index?url=${encodeURIComponent(
          prefix,
        )}&title=${encodeURIComponent(title)}`,
      );
  };

  getContentInfo = info => {
    if (info.domain === '聊天记录') {
      return {
        title: info.title,
        url: info.title,
        icon: 'history',
      };
    } else if (info.domain) {
      return {
        ...info,
        url: info.domain,
      };
    } else if (info.source) {
      return {
        ...info,
        url: info.source,
      };
    }

    return info;
  };

  render() {
    const { message } = this.props;
    if (!message || !message.content || !message.content.info) {
      return;
    }

    // console.log(message);
    const { title, image, url, icon } = this.getContentInfo(
      message.content.info,
    );

    return (
      <View className='bubble' onClick={this.handleOpenLink}>
        <View className='content'>
          <View className='info'>
            <Text className='title'>{title}</Text>
          </View>
          <View className={`icon ${icon || ''}`}>
            {image ? (
              <Image className='image' mode='aspectFill' src={image} />
            ) : (
              ''
            )}
          </View>
        </View>
        <View className='footer text-overflow'>
          <Text className='text'>{url}</Text>
        </View>
      </View>
    );
  }
}
