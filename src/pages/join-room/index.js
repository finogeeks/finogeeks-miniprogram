import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import NavBar from "@/components/nav-bar";
import { connect, Provider } from '@tarojs/redux';
import store from '@/store';
import RoomAvatar from '@/components/room-avatar';
import Avatar from '@/components/avatar';
import './index.scss';
import { joinRoom, inviteAndJoin } from '@/utils/api';
import imModel from '@/model/im';
import authModel from '@/model/auth';

const shareImage = require(SHARE_IMG_URL);
const noticeImg = require('@/assets/room/notice.png');
const fileImg = require('@/assets/room/file.png');
const plusImg = require('@/assets/room/plus.png');
const moreImg = require('@/assets/room/more.png');
const qrImg = require('@/assets/room/qr_code.png');
const switchBtn = require('@/assets/room/switch_button.png');
const channelDefault = require('@/assets/room/channel_default.png');

const mapStateToProps = ({ navigation, room }) => {
  console.log(room);
  return {
    navBarHeight: navigation.style.navHeight + navigation.style.statusBarHeight,
    basicRooms: room.basicRooms || [],
    viewingRoom: room.viewingRoom || {},
  };
};

@connect(mapStateToProps)
export default class Home extends Component {
  checkoutConsultRoom = false;
  config = {
    navigationStyle: 'custom',
  };
  
  constructor() {
    super();
    this.state = {
      scrollHeight: 0,
      hasMobile: false,
      showNavBar: true,
      searchTypes: ['通讯录','频道','消息','小程序','网盘','知识库','标签'],
      messageTopping: false,
    };
  }

  componentWillMount() {
    
  }

  componentWillUnmount() {}

  async componentDidShow() {
    
  }

  componentDidHide() {
    
  }

  handleClickBack = () => {
    return Taro.navigateBack();
  };

  switchMessageTop = () => {
    this.setState({
      messageTopping: !this.state.messageTopping,
    });
  }

  handleJoinRoom = async () => {
    try {
      const viewingRoom = this.props.viewingRoom;
      const roomId = viewingRoom.room_id || this.props.viewingRoom.roomId;
      console.log(viewingRoom);
      let res;
      if ( viewingRoom.join_rule === 'public' ) {
        // res = await joinRoom(roomId);
        res = await imModel.matrix.mxClient.joinRoom(roomId);
        // console.log(res);
        // res = await inviteAndJoin(roomId, user_id);
      } else {
        const user_id = decodeURIComponent(viewingRoom.fcid);
        res = await inviteAndJoin(roomId, user_id);
        if (res.status === 0) {
          Taro.showToast({ title: '加入频道成功！', icon: 'none' });
        } else {
          Taro.showToast({ title: res.error, icon: 'none' });
          return;
        }
      }
      // console.log('handleJoinRoom: ', res);
      await imModel.enterRoom(roomId, { join: true, redirect: true });
    } catch(e) {
      console.log(e);
      Taro.showToast({
        title: `加入频道失败:${e.data && e.data.error}`,
        icon: 'none',
        duration: 3000,
      });
    }
  }

  render() {
    const { scrollHeight, hasMobile, showNavBar, searchHeight, messageTopping } = this.state;
    const { viewingRoom = {}, navBarHeight } = this.props;
    viewingRoom.isChannel = true;
    const { 
      isArchive, 
      isChannel, 
      isDirect, 
      isNormalRobot, 
      isCrossDomain, 
      federate, 
      publicChannel, 
      isSecret, 
      isGroup, 
      powerLevel,
      topic } = viewingRoom;
    const roomtype = isCrossDomain ? '@外部' : 
                    (isChannel && federate) ? '共享' : 
                    isChannel && publicChannel ? '公开' : 
                    isChannel ? '私密' : 
                    isGroup && isSecret ? '保密' : '';
    console.log(viewingRoom);
    return (
      <Provider store={store}>
        <View className='index'>
          <NavBar title={isChannel ? '频道详情' : isGroup ? '群详情' : ''} showBackBtn={true} onClickBack={this.handleClickBack} />
          <View style={{ 'margin-top': `${navBarHeight}px` }}>
            <View className="room-title">
              <RoomAvatar room={viewingRoom} showBackImg={true}></RoomAvatar>
              {/* <Avatar url={channelDefault} radius size={100} /> */}
              <View className="room-name">
                {viewingRoom.name}
                {
                  roomtype && (
                  <View className="room-name-suffix">
                    {roomtype}
                  </View>)
                }
              </View>
            </View>
          </View>
          <View className="bottom-btn" onClick={this.handleJoinRoom}>
            加入频道
          </View>
          <View style="padding: 20rpx 40rpx;font-size: 30rpx;color:#777777;border-top: 30rpx solid #f6f6f6;">频道公告</View>
          <View style="margin: 20rpx 40rpx;font-size: 30rpx;color:#333333">{topic && JSON.parse(topic).topic}</View>
        </View>
      </Provider>
    );
  }
}
