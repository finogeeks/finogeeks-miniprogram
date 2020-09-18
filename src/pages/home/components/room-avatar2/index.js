import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import Avatar from '@/components/avatar';
import { ROOMTYPES } from '@/constants/room';
import imModel from '@/model/im';
import './index.scss';

class RoomAvatar extends Component {
  render() {
    let { avatar, roomType, id } = this.props.room;
    // const { groupAvatars } = this.state;
    let groupAvatars = [];
    try {
      groupAvatars = imModel.getRoomGroupAvatar(id);
    } catch (error) {
      groupAvatars = [];
    }

    return roomType !== ROOMTYPES.channel ? (
      <View className='room_avatar'>
        <Avatar url={avatar} size={100} />
      </View>
    ) : (
      <View className='room_avatar'>
        {groupAvatars.map(avatarUrl => (
          <Avatar url={avatarUrl} size={44} key={avatarUrl} />
        ))}
      </View>
    );
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
