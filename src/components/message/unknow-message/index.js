import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
// import { checkUrl } from '@/utils/tool'
import wxRouter from '@/router';
import extInfo from '@/utils/ext';
import { NAV_PAGES } from '@/constants/navigation';
import './index.scss';

export default class TextMessage extends Component {
  getNodes(text) {
    const urlRegExp = /(https?:\/\/|finchat:\/\/|www\.)[-a-zA-Z0-9@:%_+.~#?!&../../..//=\u4e00-\u9fa5]{2,1024}/gi;
    const urls = text.match(urlRegExp);
    if (urls && urls.length > 0) {
      urls.map((url, index) => {
        text = text.replace(url, `[TEMP_LINK${index}]`);
      });
      const textRegExp = /\[TEMP_LINK(\w)\]/gi;
      const nodes = text.split(textRegExp);
      return nodes.map(node => {
        if (node.length === 1 && urls[node]) {
          let url = urls[node];
          if (url.startsWith('www')) {
            url = `http://${url}`;
          }
          return {
            type: 'url',
            value: urls[node],
          };
        }
        return {
          type: 'text',
          value: node,
        };
      });
    }
    return [
      {
        type: 'text',
        value: text,
      },
    ];
  }

  handleLink = url => {
    // 临时取消 url 校验
    // const businessUrls = extInfo.BUSINESS_URL || [];
    // if (businessUrls && !businessUrls.some(bUrl => url.startsWith(bUrl))) {
    //   Taro.showModal({
    //     title: '提示',
    //     content: '小程序暂不支持外部链接的跳转',
    //     showCancel: false,
    //     confirmText: '知道了',
    //   });
    //   return;
    // }
    wxRouter.navigateTo(NAV_PAGES.WEBVIEW, { url: encodeURIComponent(url) });
  };

  render() {
    const { message } = this.props;
    // if (!message || !message.content || !message.content) {
    //   return;
    // }
    // const nodes = this.getNodes(message.content.body);
    // console.log('UNKNOW MESSAGE');
    // console.log(message);
    return (
      <View className='bubble'>
        {/* {nodes.map((node, index) => {
          return node.type === 'url' ? (
            <Text
              className='url'
              selectable
              decode
              space='ensp'
              key={index}
              onTap={this.handleLink.bind(this, node.value)}
            >
              {node.value}
            </Text>
          ) : (
            <Text selectable decode space='ensp' key={index}>
              {node.value}
            </Text>
          );
        })} */}
        <Text>
          {
            message.content.msgtype === 'm.combine_forward' ? '[聊天记录暂时仅支持在手机上查看]' : ''
          }{
            message.content.msgtype === 'm.businesscard' ? '[名片暂时仅支持在手机上查看]' : ''
          }{
            message.content.msgtype === 'fc.applet' ? '[小程序暂时仅支持在手机上查看]' : ''
          }{
            message.content.msgtype === 'm.bad.encrypted' ? `[加密信息仅支持在手机上查看]` : ''
          }
        </Text>
      </View>
    );
  }
}
