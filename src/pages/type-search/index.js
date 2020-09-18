import Taro, { Component } from '@tarojs/taro';
// import { Events } from "@finogeeks/finchat-js-sdk";
import { View, ScrollView, Text, Form, Button } from '@tarojs/components';
import { reportFormId } from '@/utils/api';
import { setCache, getCacheSync } from '@/utils/store';
import { DISPATCH_STATE } from '@/services/dispatch-service';
// import Activity from "@/components/activity";
import NavBar from "@/components/nav-bar";
import { connect, Provider } from '@tarojs/redux';
import store from '@/store';
import wxRouter from '@/router';
import { fetch } from '@/utils/fetch';
import ChannelHeaderWear from '@/components/channel-headwear';
import RoomAvatar from '@/components/room-avatar';
// import { bindActionCreators } from 'redux'
// import { NAV_PAGES } from '@/constants/navigation';
// import { ROOMTYPES } from '@/constants/room';
// import RoomItem from './components/room-item';
import './index.scss';
import authmModel from '@/model/auth';
import imModel from '@/model/im';
import {
  addViewingRoom,
} from '@/actions/room';

const shareImage = require(SHARE_IMG_URL);
const moreImg = require('@/assets/room/more.png');
const channelDefault = require('@/assets/room/channel_default.png');

const mapStateToProps = (state) => {
  const { navigation, room, search } = state;
  console.log(state);
  return {
    navBarHeight: navigation.style.navHeight + navigation.style.statusBarHeight,
    search,
  };
};

@connect(mapStateToProps)
export default class Home extends Component {
  checkoutConsultRoom = false;
  isShow = false;
  config = {
    navigationStyle: 'custom',
  };
  
  constructor() {
    super();
    this.state = {
      // rooms: [],
      scrollHeight: 0,
      hasMobile: false,
      showNavBar: true,
      searchTypes: {
        channelRoom: {
          cn: '频道',
        },
        groupRoom: {
          cn: '群聊',
        },
      },
      // pageTitle: '消息',
      searchResult: [],
      searchState: 'have', // begin:新进页面;have:有搜索结果;none:没有搜索结果
    };
  }

  componentWillMount() {
    this.initBasicInfo();
    console.log(this.props);
    this.setState({
      searchResult: [this.props.search.searchResult]
    });
  }

  componentWillUnmount() {}

  async componentDidShow() {
    
  }

  componentDidHide() {
    this.isShow = false;
  }

  initBasicInfo = () => {
    const { windowHeight, windowWidth } = Taro.getSystemInfoSync();
    const consultHeight = (100 * windowWidth) / 750;
    console.log('==============consultHeight==============');
    console.log(windowWidth, consultHeight);
    const searchHeight = (88 * windowWidth) / 750;
    const scrollHeight = windowHeight - this.props.navBarHeight - searchHeight;
    this.setState({ scrollHeight, searchHeight });
  };

  onShareAppMessage() {
    return {
      title: '消息',
      path: 'pages/login/index',
      imageUrl: shareImage,
    };
  }

  myCatchTouch = () => {
    console.log('stop user scroll it!');
    return;
  };

  handleClickBack = () => {
    // console.log(Taro.getCurrentPages());
    // this.setState({ showNavBar: false });
    // pages/index/index
    // Taro.navigateBack();
    return Taro.navigateBack();
    // Taro.switchTab({ url: '/pages/index/index' });
    // Taro.navigateBack({
    //   delta: 2
    // });
  };

  beginSearch = async eve => {
    const basicRooms = imModel.getBasicRooms();
    const searchText = eve.detail.value;
    const response = await fetch({
      url: '/api/v1/platform/search?access_token='+authmModel.getUserSession().accessToken+'&jwt='+authmModel.getUserSession().jwt,
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'X-Consumer-Custom-ID': authmModel.getUserSession().userId,
      },
      data: {
        type: "0",
        keyword: searchText,
        rooms: basicRooms.map(e => e.id),
      },
    });
    const {channelInfo} = response.data.data;
    const localChannelRoom = basicRooms.filter(e => e.isChannel && e.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
    localChannelRoom.forEach(e => e.isLocal = true)
    const localGroupRoom = basicRooms.filter(e => 
        !(e.isChannel || e.isDirect) 
        && e.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
    localGroupRoom.forEach(e => e.isLocal = true)
    const channelRoom = channelInfo.concat(localChannelRoom);
    let searchState = channelRoom.length > 0 || localGroupRoom.length > 0 ? 'have' : 'none';
    const searchResult = [];
    if (channelRoom.length > 0) searchResult.push({list: channelRoom, shotrlist: channelRoom.slice(0,3), type: 'channelRoom'});
    if (localGroupRoom.length > 0) searchResult.push({list: localGroupRoom, shotrlist: localGroupRoom.slice(0,3), type: 'groupRoom'});
    this.setState({
      searchResult,
      searchState,
    });
    console.log(searchResult, searchState);
  };

  enterRoom = async (room) => {
    if (room.isLocal) {
      imModel.enterRoom(room.id || room.room_id);
    } else {
      store.dispatch(addViewingRoom(room));
      // console.log('store.dispatch(addViewingRoom(room))');
      // console.log(store.viewingRoom);
      Taro.navigateTo({
        url: '/pages/join-room/index',
      });
    }
  };

  render() {
    const { scrollHeight, hasMobile, showNavBar, searchHeight, searchState, searchTypes, searchResult } = this.state;
    return (
        <View className='index'>
          {
            showNavBar ? (
              <NavBar title={'搜索'} showBackBtn={true} darkTitle={true} onClickBack={this.handleClickBack} />
            ) : ''
          }
          <View
            className="search-area"
            onClick={this.enterSearch}
            style={{ top: `${this.props.navBarHeight}px` }}
            >
            <View
              className="search-content"
            >
              <Icon className="search-icon" size='13' type='search' />
              <Input
                className="search-input"
                type='text'
                placeholder='搜索'
                maxLength='10'
                focus
                onConfirm={this.beginSearch}/>
            </View>
            <View className="calcle" onClick={this.handleClickBack}>取消</View>
            <View className="search-btm-line"></View>
          </View>
          <ScrollView
            className='page_main'
            scrollY
            scrollWithAnimation
            scrollTop='0'
            style={{ height: `${scrollHeight}px` }}
            lowerThreshold='20'
            upperThreshold='20'
            enableBackToTop
            style={{ height: `${scrollHeight}px`, 'margin-top': `${searchHeight}px` }}
          >
            {
              searchState === 'none' ? (
                <View>没有找到相关内容</View>
              ) : searchState === 'have' ? (
                searchResult.map((item) => (
                  <View className="search-block">
                    <View className="search-block-title">
                      <View className="search-type">
                        {searchTypes[item.type].cn}
                      </View>
                    </View>
                    <View className="search-content">
                      {item.list.map(e => (
                        <View className="search-item" onClick={this.enterRoom.bind(this, e)}>
                          <View className="item-header">
                            {<RoomAvatar room={e} showBackImg={true} />}
                          </View>
                          <View className="item-info">
                            <View className="item-name">
                              {e.name}
                            </View>
                            <View className="item-lastmsg">
                              {e.lastMessage || ''}
                            </View>
                          </View>
                        </View>
                      ))}
                    </View>
                  </View>
                ))
              ) : ''
            }
          </ScrollView>
        </View>
    );
  }
}
