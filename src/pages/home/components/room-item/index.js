import Taro, { Component } from '@tarojs/taro';
import { View, Text, Form, Button } from '@tarojs/components';
import { formatTimestamp } from '@/utils/date';
import { ROOMTYPES } from '@/constants/room';
import service from '@/service';
import authModel from '@/model/auth';
import imModel from '@/model/im';
import RoomAvatar from '@/components/room-avatar';
import MuteIcon from '@/assets/room/icon_chatlist_mute.png';
import './index.scss';
import { getCacheSync, setCacheSync, removeCacheSync } from '@/utils/store';

class RoomItem extends Component {
  // eslint-disable-next-line constructor-super
  constructor() {
    // super();
    // this.roomId = this.props.room.id;
  }

  enterRoom = async () => {
    Taro.showLoading();
    if (!authModel.isAuth) {
      authModel.goToAuthPage();
      return;
    }
    imModel.enterRoom(this.props.room.id);
    // await roomService.addViewingRoom(this.props.room.id)
    // this.props.navigateTo(NAV_PAGES.ROOM, { roomId: this.props.room.id })
  };

  getLastMessage = () => {
    const lastMessage = this.props.room.lastMessage;
    if (lastMessage && lastMessage.content) {
      const msgtype = lastMessage.content.msgtype || 'unknown';
      switch (msgtype) {
        case 'm.image':
          return '[图片]';
        case 'm.file':
          return '[文件]';
        case 'm.audio':
          return '[语音]';
        case 'm.video':
          return '[视频]';
        case 'm.location':
          return '[地理位置]';
        case 'm.url':
          return '[链接]';
        case 'fc.convo.ui':
        case 'm.notice':
        case 'm.text':
        default:
          return lastMessage.content.body || '';
      }
    }
    return '';
  };

  handleLongPress = async () => {
    const { room } = this.props;
    const itemList = [];
    if (
      room.roomType !== ROOMTYPES.normalBot &&
      room.roomType !== ROOMTYPES.smartBot
    ) {
      itemList.push('删除');
    }

    if (itemList.length > 0) {
      const res = await Taro.showActionSheet({
        itemList: itemList,
      });
      if (res) {
        const action = itemList[res.tapIndex];
        if (action === '删除') {
          Taro.showLoading({
            title: '删除中',
          });
          await imModel.hideRoom(room.id);
          setTimeout(() => {
            Taro.hideLoading();
          }, 500);
        }
      }
    }
  };

  handleSubmit = e => {
    if (!authModel.isAuth) return;
    const { roomType, id } = this.props.room;
    const userSession = authModel.getUserSession();
    const openId = userSession.openId;
    const msgType = roomType === ROOMTYPES.advisor ? 'adviser' : 'channel';
    service.report
      .reportFormId(id, msgType, e.detail.formId, openId, userSession.userId)
      .catch(error => {
        console.log('reportFormId error', error);
      });
  };

  render() {
    const { name, lastMessage, isCrossDomain, federate, publicChannel, isChannel, isSecret, isGroup, id, isDirect, members, isMute } = this.props.room;
    // const text = this.getLastMessage()
    const updatedAt = formatTimestamp(
      this.props.room.updatedAt || this.props.room.createdAt, id
    );
    let another = '';
    // if (id === '!175744251794030592:dev.finogeeks.club') {
    //   console.log('测试验证机器人：');
    //   console.log(this.props.room);
    // }
    const userInfo = getCacheSync('userInfo');
    if (isDirect) {
      // console.log(members);
      another = members.find(e => {
        return e.id !== userInfo.id && e.id.indexOf('-bot:')>0
      }) || null;
      // console.log(another);
    }
    const unread = this.props.room.unread || 0;
    // console.log(`~~~~~~~~~~~~~~room-item isDirect:${isDirect}  another:${another}~~~~~~~~~~~~~~~`);

    return (
      <Form report-submit onSubmit={this.handleSubmit}>
        <View
          className='room_item'
          onClick={this.enterRoom}
          onLongPress={this.handleLongPress}
        >
          <Button className='hide-btn' form-type='submit' />
          <View className="room-avatar">
            <RoomAvatar room={this.props.room} />
            { 
              isMute ? 
              (<View className="mute-bridge"></View>) :
              unread && (<View className="no-mute-bridge">{ unread > 99 ? '99+' : unread }</View>)
            }
          </View>
          <View className='info'>
            <View className='title'>
              <View className='room-name'>{name}</View>
              {isCrossDomain ? (
                <View className='headwear'>外部</View>
              ) : isChannel && federate ? (
                <View className='headwear'>共享</View>
              ) : isChannel && publicChannel ? (
                <View className='headwear'>公开</View>
              ) 
              // : isChannel ? (
              //   <View className='headwear'>私密</View>
              // ) 
              : isGroup && isSecret ? (
                <View className='headwear'>保密</View>
              ) : another ? (
                <View className='headwear-bot'>BOT</View>
              ) : ''}
            </View>
            <Text className='message'>{lastMessage}</Text>
          </View>
          <View className='time'>
            <Text>{updatedAt}</Text>
            {
              isMute && (<Image className="mute-icon" src={ MuteIcon }/>)
            }
          </View>
        </View>
      </Form>
    );
  }
}

RoomItem.defaultProps = {
  room: {
    name: '',
    avatar: '',
    members: [],
    lastMessage: null,
    createdAt: 0,
    updatedAt: 0,
  },
};

export default RoomItem;
