import Taro, { Component } from '@tarojs/taro';
import { View, ScrollView } from '@tarojs/components';
import service from '@/service';
import imModel from '@/model/im';
import { getCacheSync } from '@/utils/store';
import wxRouter from '@/router';
// import NavBar from "@/components/nav-bar";
import { NAV_PAGES } from '@/constants/navigation';
import Message from '@/components/message';

import './index.scss';

export default class History extends Component {
  config = {
    navigationBarTitleText: '聊天记录',
  };

  constructor(props) {
    super(props);
    this.myId = '';
    this.state = {
      timeline: [],
    };
  }

  handleVideo = video => {
    // Taro.navigateTo({
    //   url: `/pages/media-preview/index?type=video&url=${video.url}&poster=${video.poster}&name=${video.name}`
    // })
    wxRouter.navigateTo(NAV_PAGES.MEDIA_PREVIEW, {
      type: 'video',
      url: video.url,
      poster: video.poster,
      name: video.name,
    });
  };

  componentWillMount() {
    const { orderId, timestamp } = this.$router.params;
    const userSession = getCacheSync('userSession');
    this.myId = userSession['userId'];
    service.adviser
      .getOrderChatHistory({ orderId, timestamp })
      .then(async res => {
        if (res && Array.isArray(res)) {
          const data = await Promise.all(
            res.map(async item => {
              let user = {};
              try {
                const response = await imModel.getUser(item.sender);
                if (response) {
                  user = response;
                }
              } catch (error) {
                console.log(error);
              }
              return {
                ...item,
                user,
              };
            }),
          );
          this.setState({
            timeline: data.map(item => {
              switch (item.content.msgtype) {
                case 'm.image':
                  return {
                    ...item,
                    content: {
                      msgtype: 'm.text',
                      body: '[图片消息]',
                    },
                  };
                case 'm.video':
                  return {
                    ...item,
                    content: {
                      msgtype: 'm.text',
                      body: '[视频消息]',
                    },
                  };
                case 'm.audio':
                  return {
                    ...item,
                    content: {
                      msgtype: 'm.text',
                      body: '[音频消息]',
                    },
                  };
                case 'm.file':
                  return {
                    ...item,
                    content: {
                      msgtype: 'm.text',
                      body: '[文件消息]',
                    },
                  };
                case 'm.location':
                  return {
                    ...item,
                    content: {
                      msgtype: 'm.text',
                      body: '[位置消息]',
                    },
                  };
                case 'm.url':
                  return {
                    ...item,
                    content: {
                      msgtype: 'm.text',
                      body: item.content.body,
                    },
                  };
                default:
                  return item;
              }
            }),
          });
        }
      });
  }

  render() {
    const { timeline } = this.state;
    return (
      <View className='history'>
        {/* <NavBar title='聊天记录' /> */}
        <ScrollView
          className='records'
          scrollY
          scrollWithAnimation={false}
          style={{ height: '100vh' }}
        >
          {timeline.map(message => {
            return (
              <View id='message-wrap' className='message-wrap' key={message.id}>
                <Message
                  message={message}
                  isMy={message.sender === this.myId}
                  onVideo={this.handleVideo}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}
