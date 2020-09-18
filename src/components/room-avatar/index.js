import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import Avatar from '@/components/avatar';
import { ROOMTYPES } from '@/constants/room';
import imModel from '@/model/im';
import './index.scss';
import { getCacheSync, setCache } from '@/utils/store';

const channelDefault = require('../../assets/room/channel_default.png');

class RoomAvatar extends Component {
  render() {
    let { avatar, roomType, name, isChannel, isDirect, isNormalRobot, id } = this.props.room;
    let groupAvatars = [];
    try {
      groupAvatars = imModel.getRoomGroupAvatar(id);
      // if (id === '!167104908451905536:dev.finogeeks.club') {
      //   console.log(groupAvatars);
      // }
    } catch (error) {
      groupAvatars = [];
    }
    const userImg = getCacheSync('userInfo').avatar;
    const oppositeImg = groupAvatars.find(e => e !== userImg) || null;
    if (isNormalRobot) {
      return (
        <View className='room_avatar'>
          <Avatar url={avatar} size={100} />
        </View>
      )
    } else if (isChannel) {
      return avatar ? (
        <View className='room_avatar'>
          <Avatar url={avatar} size={100} />
          <View className="room_badge">#</View>
        </View>
      ) : (
        <View className='room_avatar'>
          {
            this.props.showBackImg && <Image
              style='height: 100%;position: absolute;width: 100%;'
              className='back-img'
              src={channelDefault}
            />
          }
         {groupAvatars.map(avatarUrl => (
           <Avatar url={avatarUrl} size={44} key={avatarUrl} />
         ))}
         <View className="room_badge">#</View>
        </View>
      )
    } else if (isDirect) {
      return (
        <View className='room_avatar'>
          <Avatar url={oppositeImg} size={100} />
        </View>
      )
    } else if (!isDirect) {
      return avatar ? (
        <View className='room_avatar'>
          <Avatar url={avatar} size={100} />
        </View>
      ) : (
        <View className='room_avatar'>
         {groupAvatars.map(avatarUrl => (
           <Avatar url={avatarUrl} size={44} key={avatarUrl} />
         ))}
        </View>
      )
    }
    return (
      <View className='room_avatar'>
       {groupAvatars.map(avatarUrl => (
         <Avatar url={avatarUrl} size={44} key={avatarUrl} />
       ))}
      </View>
    )
  }
}

RoomAvatar.defaultProps = {
  room: {
    name: '',
    avatar: '',
    members: [],
    meta: {},
  },
};

export default RoomAvatar;
