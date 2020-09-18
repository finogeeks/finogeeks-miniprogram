import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { archiveRoom, cancleArchiveRoom, quitRoom } from '@/utils/api';
import NavBar from "@/components/nav-bar";
import { connect, Provider } from '@tarojs/redux';
import store from '@/store';
import RoomAvatar from '@/components/room-avatar';
import './index.scss';

const shareImage = require(SHARE_IMG_URL);
const noticeImg = require('@/assets/room/notice.png');
const fileImg = require('@/assets/room/file.png');
const plusImg = require('@/assets/room/plus.png');
const moreImg = require('@/assets/room/more.png');
const qrImg = require('@/assets/room/qr_code.png');
const switchBtn = require('@/assets/room/switch_button.png');

const mapStateToProps = ({ navigation, room }) => {
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

  handleArchive = async () => {
    const itemList = ['确认归档'];
    const res = await Taro.showActionSheet({
      itemList,
      itemColor: '#EE6464',
    });
    if (res) {
      const action = itemList[res.tapIndex];
      if (action === '确认归档') {
        archiveRoom(this.props.viewingRoom.id);
      }
    }
  }

  handleCancleArchive = async () => {
    const itemList = ['确认恢复'];
    const res = await Taro.showActionSheet({
      itemList,
      itemColor: '#EE6464',
    });
    if (res) {
      const action = itemList[res.tapIndex];
      if (action === '确认恢复') {
        cancleArchiveRoom(this.props.viewingRoom.id);
      }
    }
  }

  handleQuitChannel = async () => {
    const itemList = ['确认删除'];
    const res = await Taro.showActionSheet({
      itemList,
      itemColor: '#EE6464',
    });
    if (res) {
      const action = itemList[res.tapIndex];
      if (action === '确认删除') {
        quitRoom(this.props.viewingRoom.id);
      }
    }
  }

  handleQuitGroup = async () => {
    const itemList = ['确认删除'];
    const res = await Taro.showActionSheet({
      itemList,
      itemColor: '#EE6464',
    });
    if (res) {
      const action = itemList[res.tapIndex];
      if (action === '确认删除') {
        quitRoom(this.props.viewingRoom.id);
      }
    }
  }

  switchMessageTop = () => {
    this.setState({
      messageTopping: !this.state.messageTopping,
    });
  }

  render() {
    const { scrollHeight, hasMobile, showNavBar, searchHeight, messageTopping } = this.state;
    const { viewingRoom = {}, navBarHeight } = this.props;
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
      powerLevel } = viewingRoom;
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
              <RoomAvatar room={viewingRoom}></RoomAvatar>
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
            <View className="room-tools">
              <CoverView className='e-bottom-line'></CoverView>
              <CoverView className='e-top-line'></CoverView>
              <View className="room-tool">
                <Image src={noticeImg} className='room-tool-img'/>
                <View className="room-tool-name">公告</View>
              </View>
              <View className="room-tool">
                <Image src={fileImg} className='room-tool-img'/>
                <View className="room-tool-name">文件</View>
              </View>
            </View>
            <View className="room-members-title">
              {isChannel ? '频道' : '群'}成员（{viewingRoom.members.length}人）
            </View>
            <View className="room-members-content">
              <CoverView className='e-bottom-line'></CoverView>
              <CoverView className='e-top-line'></CoverView>
              <View className="room-member">
                {
                  viewingRoom.members.map(e => (
                    <Image src={e.avatar} className='room-member-img'/>
                  ))
                }
              </View>
              <View className="room-member-add">
                <Image style="width: 38rpx;height: 38rpx;" src={plusImg}/>
              </View>
              <View className="room-member-more">
                <Image className="more-image" src={moreImg}/>
              </View>
            </View>
          </View>
          {
            isChannel ? (
              <View className="operate-container">
                <View className="operate-item">
                  <View className="item-name">
                    频道名称
                  </View>
                  <View className="item-act">
                    <View className="act-name">{viewingRoom.name}</View>
                    <Image className="more-image" src={moreImg}/>
                  </View>
                  <View className="border-line"></View>
                </View>
                <View className="operate-item">
                  <View className="item-name">
                    频道二维码
                  </View>
                  <View className="item-act">
                    <Image style="width: 34rpx;height: 34rpx;margin-right:28rpx;vertical-align: middle;" src={qrImg}/>
                    <Image className="more-image" src={moreImg}/>
                  </View>
                </View>
              </View>
            ) : powerLevel === 100 ? (
              <View className="operate-container">
                <View className="operate-item">
                  <View className="item-name">
                    群名称
                  </View>
                  <View className="item-act">
                    <View className="act-name">{viewingRoom.name}</View>
                    <Image className="more-image" src={moreImg}/>
                  </View>
                  <View className="border-line"></View>
                </View>
                <View className="operate-item">
                  <View className="item-name">
                    群管理
                  </View>
                  <View className="item-act">
                    <Image className="more-image" src={moreImg}/>
                  </View>
                </View>
              </View>
            ) : ('')
          }
          {
            isChannel ? (
              <View className="operate-container">
                <View className="operate-item">
                  <View className="item-name">
                    查找聊天内容
                  </View>
                  <View className="item-act">
                    <Image className="more-image" src={moreImg}/>
                  </View>
                  <View className="border-line"></View>
                </View>
                <View className="operate-item">
                  <View className="item-name">
                    频道管理
                  </View>
                  <View className="item-act">
                    <Image className="more-image" src={moreImg}/>
                  </View>
                </View>
              </View>
            ) : (
              <View className="operate-container">
                <View className="operate-item">
                  <View className="item-name">
                    查找聊天内容
                  </View>
                  <View className="item-act">
                    <Image className="more-image" src={moreImg}/>
                  </View>
                  <View className="border-line"></View>
                </View>
              </View>
            )
          }
          <View className="operate-container">
            <View className="operate-item">
              <View className="item-name">
                置顶
              </View>
              <View className="item-act">
                <View className={['switch-container', messageTopping ? 'active' : '']} onClick={this.switchMessageTop}>
                  <Image src={switchBtn} className="switch-btn"/>
                </View>
              </View>
            </View>
          </View>
          {
            powerLevel === 100 && isArchive && isChannel ? (
              <View className="bottom-btn cancle" onClick={this.handleCancleArchive}>
                取消归档
              </View>
            ) : powerLevel === 100 && !isArchive && isChannel ? (
              <View className="bottom-btn" onClick={this.handleArchive}>
                归档频道
              </View>
            ) : isChannel ? (
              <View className="bottom-btn" onClick={this.handleQuitChannel}>
                退出频道
              </View>
            ) : (
              <View className="bottom-btn" onClick={this.handleQuitGroup}>
                退出群聊
              </View>
            )
          }
        </View>
      </Provider>
    );
  }
}
