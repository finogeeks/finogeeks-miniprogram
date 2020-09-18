import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import Avatar from '@/components/avatar';
import service from '@/service';
import imModel from '@/model/im';
// import NavBar from "@/components/nav-bar";
import { getCacheSync } from '@/utils/store';
import avatarDefaultImage from '@/assets/message/avatar_default.png';
import './index.scss';

class Advisor extends Component {
  config = {
    navigationBarTitleText: '客服详情',
  };

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      info: null,
    };
  }

  async componentWillMount() {
    const userSession = getCacheSync('userSession');
    const { staffId } = this.$router.params;

    if (service.adviser.getAdvisorInfo) {
      const res = await service.adviser.getAdvisorInfo({
        retailId: userSession['userId'],
        staffId: staffId,
      });
      const user = await imModel.getUser(staffId);
      this.setState({
        user: {
          ...user,
          avatar: imModel.transUrl(
            user.presence ? user.presence.avatar_url : user.avatar,
          ),
        },
        info: res,
      });
    } else {
      const user = await imModel.getUser(staffId);
      this.setState({
        user: {
          ...user,
          avatar: imModel.transUrl(
            user.presence ? user.presence.avatar_url : user.avatar,
          ),
        },
      });
    }
  }

  render() {
    const { user, info } = this.state;
    if (!user || !info) {
      return;
    }
    return (
      <View className='advisor'>
        {/* <NavBar title='客服详情' /> */}
        <View className='head'>
          <View
            className='bg'
            style={{
              backgroundImage: `url('${user.avatar || avatarDefaultImage}')`,
            }}
          ></View>
          <View className='content'>
            <View className='avatar'>
              <Avatar url={user.avatar} size={140} />
            </View>
            <View className='title'>{info.name}</View>
            <View className='info'>
              <View className='tip'>
                <Text className='label'>服务客户</Text>
                <Text className='value'>{info.retailSum || 0}</Text>
              </View>
              <Text className='seperate'>|</Text>
              <View className='tip'>
                <Text className='label'>满意度</Text>
                <Text className='value'>
                  {parseFloat(info.score).toFixed(2) || 0}%
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View className='content'>
          <View className='item'>
            <View className='label'>岗位名称</View>
            <View className='value'>{info.roles.join(', ') || '--'}</View>
          </View>
          <View className='item'>
            <View className='label'>员工编号</View>
            <View className='value'>{info.account || '--'}</View>
          </View>
          {/* <View className='item'>
            <View className='label'>岗位从业年限</View>
            <View className='value'>{info.employmentTime || '--'}</View>
          </View> */}
          <View className='item'>
            <View className='label'>所属网点</View>
            <View className='value'>{info.departments.join(', ') || '--'}</View>
          </View>
          <View className='item'>
            <View className='label'>网点电话</View>
            <View className='value'>{info.hotline || '--'}</View>
          </View>
        </View>
      </View>
    );
  }
}

export default Advisor;
