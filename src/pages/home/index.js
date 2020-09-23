import Taro, { Component } from '@tarojs/taro';
import service from '@/service';
import { View, ScrollView, Text, Form, Button } from '@tarojs/components';
import { setCache } from '@/utils/store';
import { DISPATCH_STATE } from '@/constants/dispatch';
import authModel from '@/model/auth';
import imModel from '@/model/im';
import extInfo from '@/utils/ext';
import RoomItem from './components/room-item';
import './index.scss';
import NavBar from '@/components/nav-bar';
import { connect } from '@tarojs/redux';
import store from '../../store';
import {
  addViewingRoom,
} from '@/actions/room';
import { getChannelDetail } from '@/utils/api';
import { set as setGlobalData, get as getGlobalData } from '@/utils/globaldata';
import { changeParams } from '@/actions/navigation';
import wxRouter from '@/router/index';
import { NAV_PAGES } from '@/constants/navigation';

const shareImage = require(SHARE_IMG_URL);

function mapStateToProps(state) {
  return {
    navigation: state.navigation,
  };
}

@connect(
  mapStateToProps,
)

export default class Home extends Component {
  checkoutConsultRoom = false;
  // isShow = false;
  config = {
    navigationBarTitleText: '消息',
    navigationBarBackgroundColor: extInfo.THEME_COLOR.NAV_bg,
    navigationBarTextStyle: 'black',
    disableScroll: true,
    // navigationStyle: 'custom',
  };

  constructor() {
    super();
    this.state = {
      // rooms: [],
      basicRooms: [],
      scrollHeight: 0,
      hasMobile: false,
      isInit: false,
      isAuth: true,
      // pageTitle: '消息'
    };
  }

  async componentWillMount() {
    Taro.showLoading({ title: '加载中' });
    console.log('HOME PAGE: componentWillMount');
    console.log(this.$router.params);
    // console.log('this.props.navigation: ', this.props.navigation);
    // const curPage = this.props.navigation.curPage;
    // // console.log(curPage.params.roomId);
    // Taro.showLoading({ title: '加载中' });
    // if (curPage.params && curPage.params.roomId) {
    //   imModel.on('ROOM', this.handleRoom);
    //   const rooms = this.state.basicRooms.filter(e => !e.isArchive);
    //   const hasEnteringRoom = rooms.find(e => e.id == curPage.params.roomId);
    //   console.log('hasEnteringRoom: ', hasEnteringRoom);
    //   if (hasEnteringRoom) {
    //     imModel.enterRoom(curPage.params.roomId);
    //   } else {
    //     // console.log('curPage.params.roomId: ', curPage.params.roomId);
    //     const room = await getChannelDetail(curPage.params.roomId);
    //     console.log('getChannelDetail: ', room);
    //     store.dispatch(addViewingRoom(room));
    //     // console.log('store.dispatch(addViewingRoom(room))');
    //     // console.log(store.viewingRoom);
    //     Taro.navigateTo({
    //       url: '/pages/join-room/index',
    //     });
    //   }
    // }
    this.initBasicInfo();
    if (imModel.isReady) {
      this.initRoomInfo();
    }
    // Taro.showLoading({ title: '加载中' });
  }

  componentWillUnmount() {
    console.log('HOME PAGE: componentWillUnmount');
    const isAuth = authModel.isAuth;
    this.setState({ isAuth });
    Taro.onAppShow(options => {
      console.log('Taro.onAppShow');
      console.log(options);
    });
  }

  async initChannelShare() {
    console.log('this.props.navigation: ', this.props.navigation);
    const curPage = this.props.navigation.curPage;
    store.dispatch(changeParams(curPage.url));
    // console.log(curPage.params.enterRoom);
    if (curPage.params && curPage.params.enterRoom) {
      const { basicRooms } = this.state;
      const hasEnteringRoom = basicRooms.find(e => e.id == curPage.params.enterRoom);
      console.log('hasEnteringRoom: ', hasEnteringRoom);
      if (hasEnteringRoom) {
        imModel.enterRoom(curPage.params.enterRoom);
      } else {
        // console.log('curPage.params.enterRoom: ', curPage.params.enterRoom);
        const room = await getChannelDetail(curPage.params.enterRoom);
        room.fcid = curPage.params.fcid;
        console.log('getChannelDetail: ', room);
        store.dispatch(addViewingRoom(room));
        // console.log('store.dispatch(addViewingRoom(room))');
        // console.log(store.viewingRoom);
        // Taro.navigateTo({
        //   url: '/pages/join-room/index',
        // });
        wxRouter.navigateTo(NAV_PAGES.JOINROOM);
      }
      setGlobalData('hasEnterRoom', true);
      // imModel.off('ROOM', this.onceRoomEvent);
    }
  }

  async onceRoomEvent(e) {
    const { basicRooms } = e;
    const hasEnteringRoom = basicRooms.find(e => e.id == curPage.params.roomId);
    console.log('hasEnteringRoom: ', hasEnteringRoom);
    if (hasEnteringRoom) {
      imModel.enterRoom(curPage.params.roomId);
    } else {
      // console.log('curPage.params.roomId: ', curPage.params.roomId);
      const room = await getChannelDetail(curPage.params.roomId);
      console.log('getChannelDetail: ', room);
      store.dispatch(addViewingRoom(room));
      // console.log('store.dispatch(addViewingRoom(room))');
      // console.log(store.viewingRoom);
      Taro.navigateTo({
        url: '/pages/join-room/index',
      });
    }
    imModel.off('ROOM', this.onceRoomEvent);
  }

  async componentDidShow(args) {
    Taro.showLoading({ title: '加载中' });
    console.log('HOME PAGE: componentDidShow');
    if (getGlobalData('firstRenderHome') && imModel.isReady) {
      this.initRoomInfo();
    }
    if (imModel.isReady) {
      imModel.updateUnreadBadge();
    }
    Taro.hideLoading();
    setTimeout(() => {
      this.initChannelShare();
    }, 0);
    setGlobalData('showRoomList', true);
    setGlobalData('firstRenderHome', false);
  }

  componentDidHide() {
    console.log('HOME PAGE: componentDidHide');
    // this.isShow = false;
    this.setState({
      showList: false,
    });
  }

  handleRoom = e => {
    console.log('handleRoom = e => {');
    const { basicRooms } = e;
    this.setState({ basicRooms: [...basicRooms] });
  };

  initRoomInfo = () => {
    console.log('initRoomInfo');
    imModel.updateUnreadBadge();
    const basicRooms = imModel.getBasicRooms();
    this.setState({ basicRooms });
    imModel.on('ROOM', this.handleRoom);
    this.setState({ isInit: true });
    console.log(`this.setState({ basicRooms });`);
  };

  initBasicInfo = () => {
    // const {
    //   navHeight,
    //   statusBarHeight,
    //   maxTitleWidth,
    // } = this.props.navigation.style;
    const systemInfo = Taro.getSystemInfoSync();
    // Taro 暂未实现此功能
    // const actionButtonInfo = Taro.getMenuButtonBoundingClientRect();
    const { statusBarHeight, windowWidth } = systemInfo;
    let navHeight = (88 * windowWidth) / 750;
    navHeight = navHeight < 44 ? 44 : navHeight;
    // const maxTitleWidth = (actionButtonInfo.left - windowWidth / 2) * 2;
    const { windowHeight } = Taro.getSystemInfoSync();
    // const scrollHeight = windowHeight - navHeight - statusBarHeight;
    const scrollHeight = windowHeight;
    console.log(`~~~~~~scrollHeight:${scrollHeight}~~~windowHeight:${windowHeight}~~~navHeight:${navHeight}~~~~statusBarHeight:${statusBarHeight}~~~~~`);
    this.setState({ scrollHeight });
  };

  initMobile = () => {
    const userInfo = authModel.getUserInfo();
    if (!userInfo) return;
    const hasMobile =
      !!userInfo.mobile ||
      !!(userInfo.accountData && userInfo.accountData.phone);
    this.setState({ hasMobile });
  };

  setUpQuestionTypes = async () => {
    if (!authModel.isAuth) return;
    const res = await service.adviser.getAdviceQuestionType();
    if (!res) return;
    setCache('questionTypes', res.types);
    // service
    //   .getMxClient()
    //   .getAdviceQuestionType()
    //   .then(res => {
    //     if (!res) return;
    //     setCache('questionTypes', res.types);
    //   });
  };

  onShareAppMessage() {
    return {
      title: '消息',
      path: 'pages/login/index',
      imageUrl: shareImage,
    };
  }

  handleConsult = async forceConsult => {
    if (this.checkoutConsultRoom) {
      return;
    }
    // const questionTypes = getCacheSync("questionTypes");
    // if (!questionTypes || questionTypes.length === 0) {
    //   Taro.showToast({
    //     title: "业务类型获取失败，请重重试",
    //     icon: "none",
    //     mask: true
    //   });
    //   this.setUpQuestionTypes();
    //   return;
    // }
    const { dispatchState, from, dispatchRoomId } = imModel.getDispatchData();
    if (
      dispatchState === DISPATCH_STATE.dispatching &&
      from === 'customer-bot'
    ) {
      Taro.showToast({
        title: '您有咨询消息正在处理中，请稍等...',
        icon: 'none',
        mask: true,
      });
      this.checkoutConsultRoom = false;
      return;
    }
    this.checkoutConsultRoom = true;
    if (dispatchState === DISPATCH_STATE.dispatching) {
      console.log('checkout dispatching room', dispatchRoomId, from);
      imModel.enterRoom(dispatchRoomId);
      return dispatchRoomId;
    }

    const advisorRoomData =
      (await service.adviser.getAdvisorRoomInfo({
        pattern: 'B',
        retailId: authModel.getUserSession().userId,
      })) || {};
    console.log('get dispatch advisor room: ', advisorRoomData.roomId);
    if (!advisorRoomData.roomId) {
      Taro.showToast({
        title: '咨询失败，请重试',
        icon: 'none',
        mask: true,
      });
      this.checkoutConsultRoom = false;
      return;
    }
    if (this.state.hasMobile || forceConsult) {
      imModel.enterRoom(advisorRoomData.roomId);
    } else {
      this.checkoutConsultRoom = false;
    }
    return advisorRoomData.roomId;
  };

  myCatchTouch = () => {
    console.log('stop user scroll it!');
    return;
  };

  handleSubmit = async e => {
    const roomId = await this.handleConsult();
    if (!roomId) return;
    const userSession = authModel.getUserSession();
    const openId = userSession.openId;
    console.log('formid', e.detail.formId);
    console.log('openid', openId);
    console.log('roomId', roomId);
    service.report
      .reportFormId(
        roomId,
        'adviser',
        e.detail.formId,
        openId,
        userSession.userId,
      )
      .catch(error => {
        console.log('reportFormId error', error);
      });
  };

  onGetPhoneMumber = async e => {
    console.log('phone e', e);
    if (!e.target.encryptedData) {
      if (extInfo.CUSTOM_CONFIG.FEATURE_FORCE_CONSULTING_WITH_PHONE) {
        Taro.showModal({
          content: '拒绝授权，您将无法正常使用我们的功能',
          showCancel: false,
        });
      } else {
        this.handleConsult(true);
      }
      return;
    }
    const { iv, encryptedData } = e.target;
    try {
      await service.report.reportWxPhome({
        appId: extInfo.APP_ID,
        code: this.state.code,
        encryptedData,
        iv,
      });
    } catch (error) {
      Taro.showToast({
        title: '上报手机号失败，请重试',
        icon: 'none',
        mask: true,
      });
      const { code } = await Taro.login();
      this.setState({ code });
      return;
    }
    this.setState({ hasMobile: true }, async () => {
      this.handleConsult();
      await authModel.reFreshUserInfo();
    });
    // console.log('res', res);
    // this.$store.dispatch('getUserMobile', {
    //   code: this.code,
    //   encryptedData,
    //   iv,
    // }).then(mobile => {
    //   if (!mobile) return;
    //   this.$router.push(`/pages/activity/ActivityJoin?id=${this.id}&phone=${mobile}`);
    // })
  };

  enterSearch = () => {
    Taro.navigateTo({
      url: '/pages/globalsearch/index',
    });
  }

  render() {
    console.log('HOME PAGE BEGIN RENDER');
    const { scrollHeight, hasMobile, basicRooms, isAuth } = this.state;
    const showList = getGlobalData('showRoomList');
    console.log('============basicRooms=========', basicRooms);
    const fakeBasicRoom = [
      {
        id: 'smartRoom',
        name: '智能客服',
        avatar: `${extInfo.BASE_URL}/statics/images/message/smart_bot.png`,
        unread: 0,
        lastMessage: '',
      },
      {
        id: 'msg-bot',
        name: '通知助手',
        avatar: `${extInfo.BASE_URL}/statics/images/message/notification_assistant.png`,
        unread: 0,
        lastMessage: '',
      },
    ];
    const rooms = isAuth ? basicRooms.filter(e => !e.isArchive && !e.isDelete) : fakeBasicRoom;
    console.log('HOME PAGE AFTER RENDER');
    console.log(rooms);
    return (
      <View className='index'>
        {/* <NavBar showBackBtn={false} title={'消息'} onClickBack={this.handleClickBack} /> */}
        {/* <NavBar title={pageTitle} /> */}
        {/* <Activity /> */}
        {
          showList && (
            <ScrollView
              className='page_main'
              scrollY
              scrollWithAnimation
              scrollTop='0'
              style={{ height: `${scrollHeight}px` }}
              lowerThreshold='20'
              upperThreshold='20'
              enableBackToTop
            >
              {/* {(
                <View
                  className="search-area"
                  onClick={this.enterSearch}>
                  <View
                    className="search-input"
                  ></View>
                  <View className="search-icon">
                    <Icon className="vartical-top icon-img" size='14' type='search' />
                    <Text className="vartical-top">搜索</Text>
                  </View>
                </View>
              )} */}
              {rooms.map(room => {
                return <RoomItem key={room.id} room={room} />;
              })}
            </ScrollView>
          )
        }
      </View>
    );
  }
}
