import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import defaultAvatarImage from '@/assets/message/avatar_default.png';
import service from '@/service';
import imModel from '@/model/im';
import extInfo from '@/utils/ext';
// import NavBar from "@/components/nav-bar";
import { formatTimestamp } from '@/utils/date';
import './index.scss';

const shareImage = require(SHARE_IMG_URL);

export default class MessageDetail extends Component {
  config = {
    navigationBarTitleText: '回复详情',
  };

  constructor() {
    super();
    this.state = {
      error: false,
      questionInfo: {
        retailId: '',
        name: '',
        avatar: '',
        question: '',
        createTime: 0,
      },
      answerInfo: {
        staffId: '',
        name: '',
        avatar: '',
        answer: '',
        replyTime: 0,
      },
    };
  }

  componentDidMount() {
    this.getMessageDetail();
  }

  onShareAppMessage() {
    return {
      title: extInfo.APP_NAME,
      path: 'pages/login/index',
      imageUrl: shareImage,
    };
  }

  async getMessageDetail() {
    const { orderId } = this.$router.params;
    try {
      const data = await service.adviser.getMessageDetail(orderId);
      if (!data) {
        Taro.showToast({
          title: '加载失败',
          icon: 'none',
          mask: true,
        });
        this.setState({
          error: true,
        });
        return;
      }

      const {
        retail,
        staff,
        question,
        retailId,
        staffId,
        staffName,
        answer,
        createTime,
        replyTime,
      } = data;

      const retailInfo = await imModel.getUser(retailId);
      // console.log('retailInfo', retailInfo);
      const staffInfo = await imModel.getUser(staffId);

      const questionInfo = {
        retailId,
        name: retail.name,
        avatar: retail.avatar || defaultAvatarImage,
        createTime: formatTimestamp(createTime),
        question,
      };
      const answerInfo = {
        staffId,
        name: staff.name,
        avatar: staff.avatar || defaultAvatarImage,
        answer,
        replyTime: formatTimestamp(replyTime),
      };

      this.setState({
        questionInfo,
        answerInfo,
        error: false,
      });
    } catch (error) {
      Taro.showToast({
        title: '加载失败',
        icon: 'none',
        mask: true,
      });
      this.setState({
        error: true,
      });
    }
  }

  render() {
    const { questionInfo, answerInfo, error } = this.state;
    const { name, avatar, question, createTime } = questionInfo;
    const {
      name: staffName,
      avatar: staffAvatar,
      answer,
      replyTime,
    } = answerInfo;

    return (
      <View className='message-detail'>
        {/* <NavBar title='回复详情' /> */}
        {error ? (
          <View className='error'>
            <View className='icon'>&#xe632;</View>
            <Text>留言已被删除</Text>
          </View>
        ) : (
          <View className='content'>
            <View className='question'>
              <View className='header'>
                <Image className='avatar' mode='aspectFill' src={avatar} />
                <View className='info'>
                  <View className='name'>{name}</View>
                  <View className='time'>{createTime || ''}</View>
                </View>
              </View>
              <View className='message'>{question}</View>
            </View>
            <View className='answer'>
              <View className='header'>
                <Image className='avatar' mode='aspectFill' src={staffAvatar} />
                <View className='info'>
                  <View className='name'>{staffName}</View>
                  <View className='time'>{replyTime || ''}</View>
                </View>
              </View>
              <View className='message'>{answer}</View>
            </View>
          </View>
        )}
      </View>
    );
  }
}
