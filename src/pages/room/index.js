import Taro, { Component } from '@tarojs/taro';
import {
  View,
  ScrollView,
  Video,
  Input,
  Image,
  Button,
} from '@tarojs/components';
import cloneDeep from '@/utils/lodash-local/clone-deep';
import isEqual from '@/utils/lodash-local/is-equal';
import throttle from '@/utils/lodash-local/throttle';
import Message from '@/components/message';
import ScrollLoading from '@/components/scroll-loading';
import NavBar from '@/components/nav-bar';
import service from '@/service';
import extInfo from '@/utils/ext';
import { getMimeType } from '@/utils/file';
import { getCacheSync, removeCacheSync } from '@/utils/store';
// import { throttle } from '@/utils/util';
// import throttle from 'lodash.throttle';
import { connect } from '@tarojs/redux';
import { DISPATCH_STATE } from '@/constants/dispatch';
import wxRouter from '@/router';
import { NAV_PAGES, MERGE_ROUTE_CONFIG } from '@/constants/navigation';
import { ROOMTYPES } from '@/constants/room';
import authModel from '@/model/auth';
import imModel from '@/model/im';
import EmojiList from './components/emoji-list';
import ToolBox from './components/tool-box';
import AdvisorHeader from './components/advisor-header';
import SuggestBox from './components/suggest-box';
import './index.scss';
import Avatar from '@/components/avatar';
import store from '../../store';

let LOADING_FLAG = false;

const shareImage = require(SHARE_IMG_URL);
// import mockData from './mock'

const INPUT_HEIGHT = 36;
const FOOTER_HEIGHT = 50;
const HEADER_HEIGHT = 70;
const EMOJI_HEIGHT = 180;
const UTIL_HEIGHT = 110;
// const IPHONEX = "iPhone X";

const mapStateToProps = ({ navigation, user, detect }) => {
  console.log('room mapStateToProps');
  console.log(navigation)
  const { style } = navigation;
  const { city, district } = user.location || {};
  const { needDetect } = detect;
  const userCity = city + district || null;
  console.log(style.headerHeight)
  return {
    navBarHeight: style.headerHeight,
    userCity,
    needDetect,
  };
};

const mapActionToProps = dispatch => ({
  changeName(room) {
    dispatch(updateRoom(room));
  },
});

@connect(
  mapStateToProps,
  mapActionToProps,
)

export default class Room extends Component {
  config = {
    disableScroll: true,
    navigationBarTitleText: '',
    // navigationStyle: 'custom',
  };

  constructor() {
    super();
    this.loadMoreRetryTime = 0;
    this.myId = '';
    this.roomId = '';
    this.lastHeight = 0;
    // this.isFullScreenDevice = false;

    this.lastUpdateTime = Date.now();
    this.enterRoomTime = Date.now();
    this.state.platform = '';
    this.state = {
      // im
      room: null,
      timeline: null,
      loadingTimeline: false,

      // layouts
      platform: '',
      windowHeight: 0,
      bottomHeight: 0,
      headerHeight: 0,
      footerHeight: 0,
      emojiHeight: 0,
      utilHeight: 0,
      inputHeight: 0,
      keyboardHeight: 0,
      isFullScreen: false,
      radio: 0,

      scrollTop: 0,
      viewMsgId: '',

      // modals
      showUtil: false,
      showEmoji: false,
      showTypes: false,

      // channelActivity
      showChannelActivity: false,
      channelActivityImage:
        extInfo.BASE_URL + '/statics/images/activity_welcome.png',
      activityDetail: {},

      // input
      input: '',
      inputFocus: false,
      placeholder: '',

      // advisor
      advisorInfo: {
        account: '',
        avatar: '',
        name: '',
        employmentTime: '',
        hotline: '',
        staffId: '',
        roles: null,
        departments: null,
        visitingCard: null,
      },

      // dispactchInfo
      questionTypes: [],
      dispatchInfo: {
        dispatchState: '',
        dispatchFrom: '',
        questionType: '',
      },

      // search
      searchResult: {
        keyword: '',
        result: [],
      },

      // message
      isSendingMsg: false,
      // timeline: [],
      hasMoreFront: true,
      hasMoreBack: true,

      curOrderId: '',
      hasMobile: false,

      canScrollY: true,

      showAddOne: false,
      isLoading: false,

      showMemberAt: false,
      memberAtFilte: '',
      atingMember: false,
      cursorPosition: 0
    };
  }

  componentWillMount() {
    Taro.showLoading();
    console.log('componentWillMount');
    this.setState({
      isLoading: true,
    });
  }

  async componentDidMount() {
    console.log('componentDidMount');
    this.initLayouts();
    await this.initIM();
    this.initBasicInfo();
    // this.initDispatchInfo();
    this.initRoomInfo();
    this.initActions();
    // this.handleTimeline(this.props.viewingTimeline, true);
  }

  componentWillUnmount() {
    this.resetRoom();
  }

  componentDidHide() {}

  async componentDidShow() {
    const { code } = await Taro.login();
    this.scrollToBottom(true);
    this.setState({ code });
    this.initMobile();
  }

  shouldComponentUpdate(nextProps, nextState) {}

  componentWillReceiveProps(nextProps) {
    // this.handleTimeline(nextProps.viewingTimeline);
    // this.handleRoomTypeChange(nextProps.viewingRoom.roomType);
    // console.log('cur props', this.state.room);
    // console.log('next props', nextProps.viewingRoom);
  }

  initIM() {
    return new Promise( async resolve => {
      const { roomId } = this.$router.params;
      const room = imModel.getRoom(roomId);
      Taro.setNavigationBarTitle({
        title: room.name
      })
      imModel.on('ROOM', this.handleRoomUpdate);
      imModel.on('TIMELINE', this.handleTimeline);
      imModel.on('DISPATCH', this.handleDistpatch);
      const { timeline, canPaginateBack, canPaginateFront } = await imModel.addViewingRoom(roomId);
      console.log('canPaginateBack', canPaginateBack);
      console.log(timeline);
      const dispatchData = imModel.getDispatchData();
      const { dispatchState, from, questionType } = dispatchData;
      const dispatchInfo = {
        dispatchState,
        questionType,
        dispatchFrom: from,
      }
      console.log('~~~~~~~~~~~~~~~~room page initIM~~~~~~~~~~~~~~~~~~', new Date().getTime());
      this.setState({ 
        room, 
        dispatchInfo,
        timeline: [...timeline], 
        hasMoreBack: canPaginateBack,
        hasMoreFront: canPaginateFront,
        loadingTimeline: false,
      }, () => {
        console.log('~~~~~~~~~~~~~~~~room page initIM setState~~~~~~~~~~~~~~~~~~', new Date().getTime());
        this.setState({
          isLoading: false,
        });
        setTimeout(() => {
          console.log('~~~~~~~~~~~~~~~~room page initIM settimeout~~~~~~~~~~~~~~~~~~', new Date().getTime());
          this.scrollToBottom(true);
          Taro.hideLoading();
        });
        resolve();
      });
      // this.scrollToBottom(true);
    })
  }

  handleRoomUpdate = (event) => {
    const { room } = event;
    const { roomId } = this.$router.params;
    if (room.id !== roomId) return;
    const oldRoom = this.state.oldRoom || {};
    if (isEqual(room, oldRoom)) return;
    this.setState({ room }, () => {
      if (room.name !== oldRoom.name) {
        Taro.setNavigationBarTitle({ title: room.name});
      };
      if(room.roomType !== oldRoom.roomType) {
        this.handleRoomTypeChange(room.roomType);
      }
      if(!isEqual(room.orderInfo, oldRoom.orderInfo)) {
        this.setState({ orderInfo: room.orderInfo })
      }
    })
  }

  handleDistpatch = (event) => {
    // console.log('event', event);
    const { dispatchState, from, questionType } = event;
    const dispatchInfo = {
      dispatchState,
      questionType,
      dispatchFrom: from,
    }
    this.setState({ dispatchInfo });
  };

  handleTimeline = ({ type, timeline, newMessage, paginateTimelie }) => {
    console.log('=======handleTimeline======');
    console.log(timeline);
    switch(type) {
      case 'NEW_MESSAGE':
      case 'MESSAGE_UPDATE':
        this.setState({ timeline: [...timeline] }, () => {
          if (type === 'NEW_MESSAGE') {
            setTimeout(() => this.scrollToBottom())
          }
        })
        break;
      default: break;
    }
  };

  initLayouts() {
    // windowHeight: 0,
    // bottomHeight: 0,
    // scrollViewHeight: 0,
    // headerHeight: HEADER_HEIGHT,
    // footerHeight: FOOTER_HEIGHT,
    // emojiHeight: EMOJI_HEIGHT,
    // utilHeight: UTIL_HEIGHT,
    const {
      screenHeight,
      screenWidth,
      windowHeight,
      platform,
    } = Taro.getSystemInfoSync();
    const isFullScreen = screenHeight / screenWidth > 2;
    const radio = 750 / screenWidth;
    const bottomHeight = isFullScreen ? 34 : 0;

    this.setState({
      platform,
      isFullScreen,
      radio,
      bottomHeight: bottomHeight * radio,
      windowHeight: windowHeight * radio,
      headerHeight: HEADER_HEIGHT * radio,
      footerHeight: FOOTER_HEIGHT * radio,
      emojiHeight: EMOJI_HEIGHT * radio,
      utilHeight: UTIL_HEIGHT * radio,
      inputHeight: INPUT_HEIGHT * radio,
    });
  }

  onShareAppMessage() {
    let url = 'pages/login/index';
    const basicRooms = imModel.getBasicRooms();
    const viewingRoom = basicRooms.find(e => e.id === this.$router.params.roomId);
    if (!viewingRoom.isGroup) {
      url += '?type=ENTER_ROOM&roomId=';
      // url += encodeURIComponent(JSON.stringify({roomId: this.roomId}));
      url += this.roomId;
      url += `&fcid=${this.myId}`;
    }
    return {
      title: viewingRoom.name,
      path: url,
      imageUrl: shareImage,
    };
  }

  initMobile = () => {
    const userInfo = authModel.getUserInfo();
    const hasMobile =
      !!userInfo.mobile ||
      !!(userInfo.accountData && userInfo.accountData.phone);
    this.setState({ hasMobile });
  };

  initBasicInfo = () => {
    const userSession = getCacheSync('userSession');
    // const questionTypes = getCacheSync('questionTypes') || [];
    const { roomId } = this.$router.params;
    this.leaveMsgUrl = `/packages/common/pages/leave-message/index?roomId=${roomId}`;
    // this.setState({ questionTypes });
    this.myId = userSession['userId'];
    this.smartBotRoomId = imModel.getSmartBotRoomId();
    this.smartBotRoomUrl = `/pages/room/index?roomId=${this.smartBotRoomId}`;
    this.enterRoomTime = Date.now();
    this.roomId = roomId;
  };

  initActions() {
    const {
      roomId,
      reopenOrder,
      staffId,
      dispatchQuestionType,
    } = this.$router.params;
    if (dispatchQuestionType) {
      this.onSelectType(dispatchQuestionType);
    }

    const sendMsg = getCacheSync('sendMsg');
    if (!sendMsg && reopenOrder) {
      this.handleReopenOrder({}, staffId, roomId);
    }
    if (sendMsg) {
      console.log('lllllll', sendMsg);
      removeCacheSync('sendMsg');
      switch (sendMsg.msgtype) {
        case 'fc.applet':
          this.checkNeedQueue(sendMsg)
          imModel.sendMessage(this.roomId, sendMsg);
          break;
        case 'm.text':
          this.sendTextMessage(sendMsg.body);
          break;
        case 'fc.convo.ui': 
          this.sendConvoMessage(sendMsg);
        default:
          break;
      }
    }
  }

  initRoomInfo = async () => {
    this.setState({
      hasMoreBack: true,
      hasMoreFront: true,
    });
    const room = this.state.room || {
      roomType: '',
      orderInfo: {},
    };
    imModel.setReceipt(this.roomId);
    const { dispatchState } = this.state.dispatchInfo;

    switch (room.roomType) {
      case ROOMTYPES.smartBot:
        // this.initSmartBotRoom();
        break;
      case ROOMTYPES.dispatch:
        // this.initDispatchRoom(dispatchState);
        break;
      case ROOMTYPES.advisor:
        await this.initAdvisorRoom(room.orderInfo.staffId);
        break;
      case ROOMTYPES.channel:
        this.initChannelRoom();
        break;
    }
  };

  initChannelRoom() {
    const { firstEnterRoom } = this.$router.params;
    const { type, detail } = this.state.room.channelInfo;
    if (type === 'activity') {
      this.setState({
        showChannelActivity: firstEnterRoom ? true : false,
        // showChannelActivity: true,
        activityDetail: detail,
      });
    }
  }

  initAdvisorRoom = async staffId =>
    new Promise(async resolve => {
      const staffUser = imModel.getUser(staffId);
      this.setState({ advisorInfo: {
        avatar: staffUser.avatar,
        name: staffUser.name,
      }})
      const res = await service.adviser.getAdvisorInfo({
        retailId: this.myId,
        staffId,
      });


      if (!res) {
        resolve(false);
      }
      const advisorInfo = {
        ...res,
        id: res.staffId,
        avatar: staffUser.avatar,
        name: staffUser.name,
      };
      this.setState(
        {
          advisorInfo,
        },
        () => resolve(true),
      );
    });

  initDispatchRoom = dispatchState => {
    const questionTypes = getCacheSync('questionTypes') || [];
    if (dispatchState === DISPATCH_STATE.close && questionTypes.length > 0) {
      this.setState({
        showTypes: true,
      });
    }
  };


  handleRoomTypeChange = roomType => {
    const { orderInfo } = this.state.room || {
      orderInfo: {},
    };
    if (roomType === ROOMTYPES.advisor && !this.state.advisorInfo.name) {
      console.log('!!!!!!!!!!!!room type change staffId: ', orderInfo.staffId);
      this.initAdvisorRoom(orderInfo.staffId);
    }
  };

  resetRoom() {
    imModel.removeViewingRoom(this.roomId);
    imModel.off('ROOM', this.handleRoomUpdate);
    imModel.off('TIMELINE', this.handleTimeline);
    imModel.off('DISPATCH', this.handleDistpatch);
    const { dispatchInfo } = this.state;
    if (dispatchInfo.dispatchState !== DISPATCH_STATE.dispatching) {
      imModel.closeDispatch();
    }
  }

  handleReopenOrder = async (lastMessage, staffId, roomId) => {
    // 已经关闭的房间, 重新定向派单
    const res = await service.adviser.joinWorkOrderQueue({
      pattern: 'B',
      retailId: this.myId,
      staffId: staffId,
      roomId,
      question: JSON.stringify(lastMessage),
      city: this.props.userCity,
    });

    if (!res) {
      // Taro.showToast({
      //   title: "派单失败，请重试",
      //   icon: "none",
      //   mask: true
      // });
    }
    return res;
  };

  getScrollHeight = () => {
    const {
      windowHeight,
      footerHeight,
      headerHeight,
      input,
      searchResult,
      bottomHeight,
      radio,
      keyboardHeight,
    } = this.state;
    const { navBarHeight } = this.props;
    const { roomType } = this.state.room || {};
    const suggestion =
      input && searchResult ? searchResult.result.length * 88 : 0;
    const computedBottomHeight =
      keyboardHeight && this.state.isFullScreen ? 0 : bottomHeight;
    // console.log('navBarHeight',navBarHeight);
    // let scrollViewHeight =
    //   windowHeight -
    //   navBarHeight * radio -
    //   footerHeight -
    //   computedBottomHeight -
    //   suggestion -
    //   keyboardHeight;
    let scrollViewHeight =
      windowHeight -
      footerHeight -
      computedBottomHeight -
      suggestion -
      keyboardHeight;

    if (roomType === ROOMTYPES.advisor) {
      scrollViewHeight -= headerHeight;
    }
    console.log('======getScrollHeight======', scrollViewHeight);
    // console.log(computedBottomHeight, suggestion, radio);
    // console.log(windowHeight, navBarHeight, radio, footerHeight, computedBottomHeight, suggestion, keyboardHeight);
    // console.log(this.props);
    // console.log(this.windowHeight, footerHeight, headerHeight,bottom,suggestion, this.props.navBarHeight);
    return scrollViewHeight;
    // const systemInfo = Taro.getSystemInfoSync();
    // // Taro 暂未实现此功能
    // const actionButtonInfo = Taro.getMenuButtonBoundingClientRect();
    // const { statusBarHeight, windowWidth } = systemInfo;
    // let navHeight = (88 * windowWidth) / 750;
    // navHeight = navHeight < 44 ? 44 : navHeight;
    // const maxTitleWidth = (actionButtonInfo.left - windowWidth / 2) * 2;
    // const { windowHeight } = Taro.getSystemInfoSync();
    // const scrollHeight = windowHeight - navHeight - statusBarHeight - this.state.inputHeight;
    // return scrollHeight;
  };

  scrollToBottom = async (bottom) => {
    const curTimeline = this.state.timeline || null;
    if (!curTimeline || curTimeline.length === 0) return;
    const lastMessage = curTimeline[curTimeline.length - 1];

    const newViewMsgId = 'id' + `${lastMessage.id}`.replace(/[^\d]/g, '');
    console.log(`~~~~~~~~~~~~newViewMsgId:${newViewMsgId}~~~~~~~~~~~~`);
    if (newViewMsgId === this.state.viewMsgId) {
      this.setState({ viewMsgId: '' }, () =>
        this.setState({ viewMsgId: newViewMsgId }),
      );
    } else {
      this.setState({ viewMsgId: newViewMsgId });
      const roomId = this.roomId;
      imModel.setReceipt({ roomId });
    }
  };

  sendTextMessage = throttle(async text => {
    const { input, isSendingMsg } = this.state;
    const { roomType, orderInfo } = this.state.room || {
      roomType: '',
      orderInfo: {},
    };
    if (isSendingMsg) return;
    try {
      this.setState({ isSendingMsg: true });
      const dispatchData = imModel.getDispatchData();
      const { dispatchState, from: dispatchFrom } = dispatchData;
      const validateInput = input && input.trim();
      const validateText = typeof text === 'string' && text.trim();

      if (!validateInput && !validateText) {
        this.setState({ isSendingMsg: false });
        return;
      }

      const textContent = {
        msgtype: 'm.text',
        body: validateText || validateInput,
      };
      // console.log('textContent', textContent);
      const queueRes = (await this.checkNeedQueue(textContent)) || {};

      const isDispatching = dispatchState === 'DISPATCHING';
      // Mark: 由于部分性能较差的手机，清空了 input 之后依然会触发相同的 text input 事件，所以延迟 500 ms 清空
      const time = this.state.platform === 'android' ? 500 : 100;
      setTimeout(() => {
        this.setState({
          input: '',
          placeholder: '',
        });
      }, time);
      let extend = {};
      const orderId = queueRes.orderId || orderInfo.orderId;
      if (orderId) {
        extend.order_id = orderId;
      }
      if (isDispatching && dispatchFrom === 'customer-bot') {
        extend.extra = {
          stopBot: true,
        };
      }
      const {isSensitive} = await service.detect.detectSensitiveWord(validateText || validateInput);
      console.log('detectData: ', isSensitive);
      if (isSensitive && this.props.needDetect) {
        Taro.showToast({
          title: '发送的内容含不合规信息',
          icon: 'none',
          mask: true,
        });
      } else {
        await imModel.sendTextMessage(this.roomId, {
          text: validateText || validateInput,
          extend,
        });
      }

      this.setState({ isSendingMsg: false });

      if (
        dispatchState === DISPATCH_STATE.timeout &&
        roomType === ROOMTYPES.smartBot
      ) {
        imModel.closeDispatch();
      }
    } catch (error) {
      console.log(error);
      this.setState({ isSendingMsg: false });
    }

    console.timeEnd('sendTextlocal');
  }, 200, { leading: true});

  sendConvoMessage = async (convoContent) => {
    const { isSendingMsg } = this.state;
    const { roomType, orderInfo } = this.state.room || {
      roomType: '',
      orderInfo: {},
    };
    if (isSendingMsg) return;
    try {
      this.setState({ isSendingMsg: true });
      const dispatchData = imModel.getDispatchData();
      const { dispatchState, from: dispatchFrom } = dispatchData;
      const queueRes = (await this.checkNeedQueue(convoContent)) || {};
      let extend = {};
      const orderId = queueRes.orderId || orderInfo.orderId;
      if (orderId) {
        extend.order_id = orderId;
      }
      await imModel.sendConvoMessage(this.roomId, {
        ...convoContent,
        extend,
      });

      this.setState({ isSendingMsg: false });

      if (
        dispatchState === DISPATCH_STATE.timeout &&
        roomType === ROOMTYPES.smartBot
      ) {
        imModel.closeDispatch();
      }
    } catch (error) {
      console.log(error);
      this.setState({ isSendingMsg: false });
    }
  };

  isRightDispatchingRoom() {
    const { dispatchInfo } = this.state;
    const { roomType } = this.state.room || {};
    const { dispatchFrom } = dispatchInfo;

    const isDispatchRoom = roomType === ROOMTYPES.dispatch;
    const isSmartBotRoom = roomType === ROOMTYPES.smartBot;

    const isFormSmartBot = dispatchFrom === 'customer-bot';
    const isFormDispatchRoom = dispatchFrom === 'dispatch-bot';

    return (
      (isFormSmartBot && isSmartBotRoom) ||
      (isDispatchRoom && isFormDispatchRoom)
    );
  }

  handleVideo = video => {
    wxRouter.navigateTo(NAV_PAGES.MEDIA_PREVIEW, {
      type: 'video',
      url: encodeURIComponent(video.url),
      poster: encodeURIComponent(video.poster),
      name: video.name,
    });
  };

  handleLink = url => {
    wxRouter.navigateTo(url);
  };

  handleLocation = data => {
    Taro.openLocation(data);
  };

  handleMessagePress = async message => {
    const itemList = [];
    const msgtype = message.content.msgtype;
    if (msgtype === 'fc.convo.ui') {
      return;
    }
    if (msgtype === 'm.text') {
      itemList.push('复制');
    }

    const diff = Math.round((new Date().getTime() - message.time) / 60000.0);
    if (
      diff < 3 &&
      message.status === 'unknown' &&
      message.user.id === this.myId
    ) {
      itemList.push('撤回');
    }

    if (message.status === 'error') {
      itemList.push('重新发送');
    }

    if (itemList.length > 0) {
      const res = await Taro.showActionSheet({
        itemList: itemList,
      });
      if (res) {
        const action = itemList[res.tapIndex];
        if (action === '复制') {
          this.handleCopy(message);
        } else if (action === '撤回') {
          this.handleRedact(message);
        } else if (action === '重新发送') {
          this.handleResend(message);
        }
      }
    }
  };

  handleCopy = async message => {
    try {
      const res = await Taro.setClipboardData({
        data: message.content.body,
      });
      if (res) {
        Taro.showToast({
          title: '已复制到粘贴板',
          icon: 'none',
          mask: true,
        });
      }
    } catch (error) {
      Taro.showToast({
        title: '复制失败',
        icon: 'none',
        mask: true,
      });
    }
  };

  handleRedact = async message => {
    try {
      const res = await imModel.redactMessage(this.roomId, message.id);
      if (!res) {
        Taro.showToast({
          title: '撤回失败',
          icon: 'none',
          mask: true,
        });
      }
    } catch (error) {
      Taro.showToast({
        title: '撤回失败',
        icon: 'none',
        mask: true,
      });
    }
  };

  handleResend = async message => {
    try {
      await imModel.resendMessage(this.roomId, message.id);
    } catch (error) {
      console.log(error);
    }
  };

  handleMoreTimeLine = async (dir) => {
    console.log('this.state.loadingTimeline', this.state.loadingTimeline);
    console.log('this.state.hasMoreFront', this.state.hasMoreFront);
    console.log('this.state.hasMoreBack', this.state.hasMoreBack);
    console.log('LOADING_FLAG:  ',LOADING_FLAG);
    if (LOADING_FLAG) return;
    // Taro.showLoading({ title: '加载中' });
    LOADING_FLAG = true;
    // Taro.showModal({
    //   title: 'handleMoreTimeLine',
    // });
    
    // if (LOADING_FLAG) return;
    // LOADING_FLAG = true;
    if (this.state.loadingTimeline ||
        (dir === 'BACKWORDS' && !this.state.hasMoreBack) ||
        (dir === 'FORWARDS' && !this.state.hasMoreFront)) {
          LOADING_FLAG = false;
          return;
    };
    this.setState({ loadingTimeline: true })
    const roomId = this.roomId;
    const res = await imModel.loadMoreTimeline(roomId, dir);
    if (!res) {
      this.setState({ loadingTimeline: false })
      return;
    }
    const lastMessage = dir === 'BACKWORDS' ? this.state.timeline[0] : this.state.timeline[this.state.timeline.length -1];
    // console.log('lastMessage', lastMessage);
    const { canPaginateFront, canPaginateBack, timeline } = res;
    const newViewMsgId = 'id' + `${lastMessage.id}`.replace(/[^\d]/g, '');
    console.log('newViewMsgId:', newViewMsgId);
    console.log('this.state.viewMsgId:', this.state.viewMsgId);
    console.log('timeline:', timeline);
    // this.state.timeline.unshift(...timeline);
    this.setState({ 
      canScrollY: false,
    }, () => {
      this.setState({
        viewMsgId: newViewMsgId,
        timeline: cloneDeep(timeline),
        hasMoreBack: canPaginateBack,
        hasMoreFront: canPaginateFront,
        viewMsgId: newViewMsgId,
        loadingTimeline: false,
      })
    });
    setTimeout(() => {
      this.setState({ 
        viewMsgId: '',
        canScrollY: true,
      }, () =>
        {
          setTimeout(() => {
            this.setState({ 
              viewMsgId: newViewMsgId,
            });
            LOADING_FLAG = false;
          }, 1000)
        }
      );
    }, 200)
  }

  handleInputArea = () => {
    console.log('input area', FOOTER_HEIGHT * this.state.radio);
    this.setState({
      showUtil: false,
      showEmoji: false,
      footerHeight: FOOTER_HEIGHT * this.state.radio,
    });
  };

  handleInput = event => {
    const { value } = event.detail;
    console.log('handleInput: ', value);
    if (value.substring(value.length -1) === '@') {
      this.setState({
        showMemberAt: true,
        atingMember: true,
        // memberAtFilte: value.replace('@', '')
      });
    } else {
      // this.setState({
      //   showMemberAt: false,
      //   // atingMember: false,
      // });
    }
    if (this.state.atingMember) {
      this.setState({
        memberAtFilte: value.replace('@', '')
      });
      console.log('memberAtFilte');
      console.log(this.state.memberAtFilte, value.replace('@', ''));
    } else {
      this.setState({
        memberAtFilte: ''
      });
    }
    const { dispatchInfo } = this.state;
    const { roomType } = this.state.room;
    console.log('~~~~~~~~handleInput~~~~this.state.inputFocus~~~~~~', this.state.inputFocus)
    // Mark: 安卓发送消息之后会触发一次旧的消息，即使设置了 input 为空
    if (!this.state.inputFocus) {
      return;
    }
    this.setState(
      {
        input: value,
      }
    );
  };

  handleToggleUtil = () => {
    const { utilHeight } = this.state;
    if (this.state.showUtil) {
      this.handleInputArea();
    } else {
      this.setState(
        {
          showUtil: true,
          showEmoji: false,
          footerHeight: FOOTER_HEIGHT * this.state.radio + utilHeight,
        },
        () => {
          this.scrollToBottom(true);
        },
      );
    }
  };

  handleShowEmoji = () => {
    const { emojiHeight } = this.state;
    if (!this.state.showEmoji) {
      this.setState(
        {
          showUtil: false,
          showEmoji: true,
          footerHeight: FOOTER_HEIGHT * this.state.radio + emojiHeight,
        },
        () => {
          setTimeout(() => {
            this.scrollToBottom(true);
          });
        },
      );
    }
  };

  handleHideEmoji = () => {
    if (this.state.showEmoji) {
      this.handleInputArea();
      this.handleInputFocus();
    }
  };

  handleEmojiSelect = emoji => {
    console.log(`~~~~~~~~~~~~~~handleEmojiSelect~~~~~~~~~~~~~`, this.state.input, this.state.input.trim());
    this.setState({
      input: `${this.state.input.trim()}${emoji} `,
    });
  };

  handleConvo = throttle(async ({ widget, content }) => {
    const { dispatchInfo } = this.state;
    const { dispatchState, dispatchFrom } = dispatchInfo;
    const { type, title, params } = widget;
    const { action, value, href, clickable } = params;

    // console.log('widget', widget);
    // console.log('content', content);

    const roomId = this.roomId;

    let queueRes = null;

    if (type === 'radioButton' && !clickable) {
      return;
    }

    if (type === 'button') {
      switch (value) {
        case 'leaveMsg':
          wxRouter.navigateTo(NAV_PAGES.LEAVE_MESSAGE, { roomId });
          break;
        case 'switchCustomerService':
          if (dispatchState === DISPATCH_STATE.dispatching) {
            Taro.showToast({
              title: '您有咨询消息正在处理中，请稍等...',
              icon: 'none',
              mask: true,
            });
            return;
          }
          queueRes = await this.handleQueue(
            {
              msgtype: 'm.text',
              body: widget.params.payload.question || '',
            },
            'customer-bot',
          );
          this.setState({ curOrderId: queueRes.orderId });
          await service.adviser.addDispatchQuestion({
            pattern: 'B',
            orderId: queueRes.orderId,
            question: JSON.stringify(
              {
                msgtype: 'm.text',
                body: widget.params.payload.question || '',
                order_id: queueRes.orderId,
              } || {},
            ),
          });
          break;
        case 'unsolved':
        case 'ok':
        default:
          break;
      }
    }

    if (type === 'footer') {
      switch (title) {
        case '回复详情':
          const reg = /(\w*)$/gi;
          const result = href && href.match(reg);
          if (result && result[0]) {
            wxRouter.navigateTo(NAV_PAGES.MESSAGE_DETAIL, {
              orderId: result[0],
            });
          }
          break;
        case '换一批':
          break;
        default:
          break;
      }
    }

    if (type === 'item') {
      const userSession = authModel.getUserSession() || {};
      switch(action) {
        case 'href': 
          console.log('url', `${href}&jwt=${userSession.jwt}`);
          Taro.navigateTo({
            url: `/packages/common/pages/webview/index?url=${encodeURIComponent(
              `${href}&jwt=${userSession.jwt}`,
            )}`,
          });
        break;
      }
    }

    if (type === 'radioButton' && clickable) {
      this.handleRadioClick(widget, content);
    }

    if (action === 'reply' || action === 'sendConvReply') {
      if (
        dispatchState === DISPATCH_STATE.dispatching &&
        type === 'item' &&
        dispatchFrom === 'customer-bot'
      ) {
        this.sendTextMessage(widget.title);
      } else {
        imModel.sendConvoReplyMessage(roomId, {
          originContent: queueRes
            ? { ...content, orderId: queueRes.orderId }
            : content,
          reply: widget,
          hide: type === 'radioButton',
          extend: {
            stopBot:
              dispatchState === DISPATCH_STATE.dispatching &&
              dispatchFrom === 'customer-bot',
          },
        });
      }
    }
  }, 300);

  handleRadioClick = async (widget, content) => {
    const { params } = widget;
    const { value, payload } = params;
    const { orderId } = payload;
    const { advisorInfo } = this.state;
    const roomId = this.roomId;
    const { staffId } = advisorInfo;
    const { msgid } = content;

    const userInfo = authModel.getUserInfo();
    const { retailId } = userInfo;

    await service.adviser.sendEvaluation({
      orderId,
      roomId,
      staffId,
      pattern: 'B',
      score: parseInt(value),
      note: '',
      retailId,
    });

    await service.adviser.sendEvalMsg({
      roomId,
      msgId: msgid,
      value,
      orderId,
      appType: 'retail',
      staffId,
    });
  };

  handleQueue = async (question, from = 'dispatch-bot') => {
    const userInfo = authModel.getUserInfo();
    const { retailId } = userInfo;
    let location = null;
    try {
      location = await Taro.getLocation();
    } catch (error) {
      // Taro.showToast({
      //   title: '您未开通定位权限，请至系统设置中修改定位服务权限',
      //   icon: 'none',
      //   mask: true,
      //   duration: 3000,
      // })
      // return
    }
    const res = await service.adviser.joinWorkOrderQueue({
      pattern: 'B',
      retailId,
      from,
      roomId: this.roomId,
      question: JSON.stringify(question || {}),
      location,
      questionType: this.state.dispatchInfo.questionType,
      city: this.props.userCity,
    });
    if (!res) {
      // Taro.showToast({
      //   title: "派单失败，请重试",
      //   icon: "none",
      //   mask: true
      // });
      return false;
    }
    this.setState({ curOrderId: res.orderId });
    return res;
  };

  handleToolAction = async action => {
    const { type, content } = action;
    let queueRes = null;
    switch (type) {
      case 'leave-message':
        const roomId = this.roomId;
        wxRouter.navigateTo(NAV_PAGES.LEAVE_MESSAGE, { roomId });
        break;
      case 'image':
        queueRes = await this.handleImage(content);
        break;
      case 'location':
        queueRes = await this.handleChooseLocation();
        break;
      default:
        break;
    }
    return queueRes;
  };

  handleAdvisorDetail = () => {
    const id = this.state.advisorInfo.staffId;
    // wxRouter.navigateTo(NAV_PAGES.ADVISOR, { staffId: id });
    const { cRouter } = Taro.getApp().globalData;
    cRouter.navigateTo({
      name: 'STUDIO_STAFF',
      query: { fcid: id },
    });
  };

  handleCloseOrder = async () => {
    const roomId = this.roomId;
    const { orderInfo } = this.state.room || {
      roomType: '',
      orderInfo: {},
    };
    const { retailId, staffId, orderId } = orderInfo;
    const res = await service.adviser.closeWorkOrder({
      retailId,
      staffId,
      orderId,
      roomId,
      pattern: 'B',
    });
    if (res) {
      await service.adviser.sendEvalMsg({
        roomId,
        orderId,
        appType: 'retail',
        staffId,
      });
    }
  };

  closeSelectModal = () => {
    this.setState({
      showTypes: false,
    });
  };

  onSelectType = async (type, e) => {
    console.log('type', type);
    console.log('phone e', e);
    console.log('this.state.code', this.state.code);
    if (!e.target.encryptedData) {
      if (extInfo.CUSTOM_CONFIG.FEATURE_FORCE_CONSULTING_WITH_PHONE) {
        Taro.showModal({
          content: '拒绝授权，您将无法正常使用我们的功能',
          showCancel: false,
        });
      } else {
        this.handleQuestionType(type);
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
      this.handleQuestionType(type);
      await authModel.reFreshUserInfo();
    });
  };

  handleQuestionType = type => {
    if (extInfo.CUSTOM_CONFIG.FEATURE_AUTOMATIC_ADVISORY) {
      const text = `您好，我想咨询${type}`;
      this.sendTextMessage(text);
    }
    imModel.selectDispachQuestionType(type);
    this.setState({
      showTypes: false,
      inputFocus: true,
      placeholder: '请输入您需要咨询的问题',
    });
  };
  handleInputFocus = e => {
    console.log('input focus', e, FOOTER_HEIGHT * this.state.radio);
    if (e) {
      const { height } = e.detail;
      // const height = 346;
      if (!Taro.getSystemInfo().inFinChat) {
        this.setState(
          {
            keyboardHeight: height * this.state.radio,
            showUtil: false,
            showEmoji: false,
            footerHeight: FOOTER_HEIGHT * this.state.radio,
          },
          () => {
            this.scrollToBottom(true);
          },
        );
      } else {
        this.setState(
          {
            // keyboardHeight: height * this.state.radio,
            showUtil: false,
            showEmoji: false,
            footerHeight: FOOTER_HEIGHT * this.state.radio,
          },
          () => {
            this.scrollToBottom(true);
          },
        );
      }
    }
    // setTimeout(() => {
      this.setState({
        inputFocus: true,
      });
    // }, 500)
  };

  memberAtChose = (m) => {
    // this.setState({
    //   showMemberAt: false,
    //   inputFocus: true,
    //   input: `@${m.name}`,
    //   atingMember: false,
    // })
    const newvalue = `${this.state.input}${m.name} `;
    this.setState({
      // showMemberAt: false,
      input: newvalue,
      // inputFocus: true,
    });
    setTimeout(() => {
      this.setState({
        showMemberAt: false,
        // inputFocus: true,
      },() => {
        this.setState({
          atingMember: false,
          inputFocus: true,
          cursorPosition: newvalue.length,
        })
      })
    }, 200);
    event.preventDefault();
  }

  handleInputBlur = () => {
    this.setState({
      inputFocus: false,
      keyboardHeight: 0,
      showMemberAt: false,
      atingMember: false,
      memberAtFilte: '',
    });
    Taro.pageScrollTo({
      scrollTop: 0,
      duration: 0,
    });
  };

  handleSearch = throttle(async () => {
    const input = this.state.input;
    const res = await service.adviser.searchKnowledgeByKey({
      key: input,
      size: 4,
    });
    if (res && res.result) {
      this.setState({
        searchResult: {
          keyword: input,
          result: res.result.source,
        },
      });
    } else {
      this.setState({
        searchResult: {
          keyword: '',
          result: [],
        },
      });
    }

  }, 300);

  handleSuggestSelect = async text => {
    // const { roomType } = this.state;
    const { roomType } = this.state.room;
    if (roomType === ROOMTYPES.dispatch) {
      if (!this.smartBotRoomId) {
        Taro.showToast({ title: '没找到智能客服房间', icon: 'none' });
        return;
      }
      // wxRouter.redirectTo(NAV_PAGES.ROOM, {
      //   roomId: this.smartBotRoomId,
      //   sendText: text,
      // })
      imModel.enterRoom(this.smartBotRoomId, {
        sendMsg: {
          msgtype: 'm.text',
          body: text,
        },
        redirect: true,
      });
      return;
    }
    const res = await this.sendTextMessage(text);
    if (res) {
      this.setState({
        searchResult: {
          keyword: '',
          result: [],
        },
      });
    }
  };

  handleChooseLocation = async () => {
    const data = await Taro.getSetting();
    console.log('~~~~~~~~~~handleChooseLocation  Taro.getSetting()~~~~~~~~~~', data);
    if (!data.authSetting['scope.userLocation']) {
      try {
        await Taro.authorize({ scope: 'scope.userLocation' });
      } catch (error) {
        console.log(error);
        const response = await Taro.showModal({
          title: '提示',
          content: '该功能需要地理位置授权',
        });
        if (response.confirm) {
          const auth = await Taro.openSetting();
          if (auth.authSetting && auth.authSetting['scope.userLocation']) {
            this.handleChooseLocation();
          }
        } else {
          return;
        }
      }
    }
    const res = await Taro.chooseLocation();
    const extend = this.getMessageExtend();
    const queueRes = await this.checkNeedQueue({
      body: '[位置信息]',
      msgtype: 'm.location',
      info: {
        address: res.address,
        latitude: res.latitude,
        longitude: res.longitude,
        name: res.name,
      },
      extend,
    });
    if (queueRes) {
      extend.order_id = queueRes.orderId;
    }
    imModel.sendLocationMessage(this.roomId, {
      name: res.name,
      address: res.address,
      latitude: res.latitude,
      longitude: res.longitude,
      extend,
    });
  };

  handleImage = async tempFiles => {
    if (tempFiles.length !== 1) {
      console.log('invalid image num');
      return;
    }

    const name = 'image';
    const imageFile = tempFiles[0];
    const imageInfo = await Taro.getImageInfo({
      src: imageFile.path,
    });
    const mimetype = `image/${imageInfo.type}` || getMimeType(imageFile.path);

    const extend = this.getMessageExtend();
    const queueRes = await this.checkNeedQueue({
      msgtype: 'm.image',
      body: 'image',
      url: '',
      info: {
        mimetype,
        h: imageInfo.height,
        w: imageInfo.width,
        thumbnail_info: {
          mimetype,
          h: imageInfo.height,
          w: imageInfo.width,
        },
        thumbnail_url: '',
      },
      extend,
    });
    if (queueRes) {
      extend.order_id = queueRes.orderId;
    }
    const response = await imModel.sendImageMessage(this.roomId, {
      name,
      blob: imageFile.path,
      path: imageFile.path,
      mimetype,
      width: imageInfo.width,
      height: imageInfo.height,
      size: imageInfo.size,
      extend,
    });
    if (!response) {
      Taro.showToast({
        title: '发送失败',
        icon: 'none',
        mask: true,
      });
    }
  };

  getMessageExtend = () => {
    const { orderInfo } = this.state.room || {
      roomType: '',
      orderInfo: {},
    };
    const { orderId } = orderInfo;
    let extend = {};
    if (orderId) {
      extend.order_id = orderId;
    }
    return extend;
  };

  handleClickBack = () => {
    // const pages = Taro.getCurrentPages();
    // if (pages.length > 1) {
    //   Taro.navigateBack();
    //   return;
    // }
    // const fcid = this.state.advisorInfo.staffId;
    // console.log('DEBUG: handleClickBack => fcid', fcid);
    // const { cRouter } = Taro.getApp().globalData;
    // cRouter.navigateTo({
    //   name: 'STUDIO_TWEET',
    //   query: { fcid },
    // });
    wxRouter.switchTab(NAV_PAGES.HOME);
  };

  checkNeedQueue = async content => {
    const { dispatchInfo, advisorInfo, curOrderId } = this.state;
    const { roomType, orderInfo } = this.state.room || {
      roomType: '',
      orderInfo: {},
    };
    const { dispatchState, questionType } = dispatchInfo;
    const staffId = advisorInfo.staffId || orderInfo.staffId;
    const isDispatching = dispatchState === 'DISPATCHING';
    const isDispatchRoom = roomType === ROOMTYPES.dispatch;
    const isRightRoom = this.isRightDispatchingRoom();
    const needQueue = isDispatchRoom && !isDispatching;
    const needReopenOreder =
      roomType === ROOMTYPES.advisor && orderInfo.isClosed;
    const needSendQuestion = needQueue || (isDispatching && isRightRoom);
    let queueRes = null;
    if (needQueue) {
      queueRes = await this.handleQueue(content);
    }
    if (needReopenOreder) {
      queueRes = await this.handleReopenOrder(content, staffId, this.roomId);
    }
    // console.log('needSendQuestion', needSendQuestion);
    if (needSendQuestion) {
      await service.adviser.addDispatchQuestion({
        pattern: 'B',
        orderId: !queueRes ? orderInfo.orderId || curOrderId : queueRes.orderId,
        question: JSON.stringify(content || {}),
      });
    }
    return queueRes;
  };

  closeActivityModal() {
    this.setState({ showChannelActivity: false });
  }

  goActivityDetail() {
    // console.log(ENV_VERSION);
    // console.log(service.config);
    const STUDIO_ACTIVITY_DETAIL = 'STUDIO_ACTIVITY_DETAIL';
    const app = Taro.getApp();
    const { cRouter } = app.globalData;
    const { activityDetail } = this.state;
    const pages = Taro.getCurrentPages();
    const previousPage = pages[pages.length - 2];

    const prefixPath = path => {
      const prefix = path.startsWith('/') ? '' : '/';
      return `${prefix}${path}`;
    };

    if (
      previousPage &&
      prefixPath(previousPage.route) ===
        prefixPath(MERGE_ROUTE_CONFIG[STUDIO_ACTIVITY_DETAIL])
    ) {
      Taro.navigateBack();
      return;
    }
    cRouter.navigateTo({
      name: STUDIO_ACTIVITY_DETAIL,
      query: {
        fcid: activityDetail.adviserId,
        id: activityDetail.id,
      },
    });
    // wxRouter.navigateTo(NAV_PAGES.ACTIVITY_DETAIL, {
    //   fcid: activityDetail.adviserId,
    //   id: activityDetail.id,
    // })
    // Taro.navigateToMiniProgram({
    //   appId: extInfo.WORK_APP_ID,
    //   path: `pages/activity/ActivityDetail?fcid=${activityDetail.adviserId}&id=${activityDetail.id}`,
    //   envVersion: ENV_VERSION,
    // })
  }

  goActivityHistory = () => {
    console.log('DEBUG: goActivityHistory');
    wxRouter.switchTab(NAV_PAGES.HOME);
  };

  handleScroll = (e) => {
    console.log(e);
  }

  onCheckDetail = () => {
    wxRouter.navigateTo(NAV_PAGES.ROOM_DETAIL);
  };

  triggleShowAddOne = (val) => {
    this.setState({
      showAddOne: val,
    });
  }

  render() {
    console.log('ROOM PAGE RENDER');
    console.log(this.navBarHeight);
    const {
      // layouts
      footerHeight,
      headerHeight,
      bottomHeight,
      windowHeight,
      emojiHeight,
      utilHeight,
      inputHeight,
      isFullScreen,
      radio,
      showUtil,
      showEmoji,
      showTypes,

      isBanSendMsg,
      advisorInfo,
      video,
      input,
      inputFocus,
      searchResult,

      questionTypes,
      dispatchInfo,
      placeholder,

      scrollTop,
      viewMsgId,

      showChannelActivity,
      channelActivityImage,
      activityDetail,
      hasMobile,

      loadingTimeline,
      hasMoreBack,
      hasMoreFront,
      canScrollY,
      showAddOne,
      isLoading,
      showMemberAt,
      memberAtFilte,
    } = this.state;
    const { roomType, orderInfo, name, isChannel, isDirect, isNormalRobot, isGroup, isArchive, members } = this.state.room || {
      roomType: '',
      orderInfo: {},
    };
    console.log('room member: ', members);
    const filtermembers = members.filter(e => e.name.indexOf(memberAtFilte) > -1);
    console.log('filtermembers: ', filtermembers);
    const { channelId } = this.$router.params || {};
    // console.log('DEBUG this.$router.params => channelId', channelId);

    const { dispatchState, questionType } = dispatchInfo;
    const scrollViewHeight = this.getScrollHeight();
    const curTimeline = this.state.timeline || [];
    console.log('========curTimeline========');
    console.log(curTimeline);
    const {
      APP_NAME,
      CUSTOM_CONFIG: { DISPATCH_TIMEOUT_REDIRECT: redirectType },
    } = extInfo;
    const timeoutRedirectToLeaveMsg =
      redirectType === 'leave-msg' || roomType === ROOMTYPES.smartBot;

    const tipMessage = {
      content: {
        body: `${APP_NAME}为您服务，请${
          questionTypes.length > 0
            ? '选择您要咨询的业务范围'
            : '请输入您要咨询的问题'
        }`,
        msgType: 'm.local.notice',
      },
    };
    const questionMessage = {
      content: {
        body: `您已选择：${questionType}`,
        msgType: 'm.local.notice',
      },
    };
    const dispatchMessage = {
      content: {
        body: '正在为您匹配服务人员，请稍侯...',
        msgType: 'm.local.notice',
      },
    };
    const timeoutMessage = {
      content: {
        body: '尊敬的客户，当前客服繁忙，您可选择',
        linkText: timeoutRedirectToLeaveMsg ? '去留言' : '智能客服',
        url: timeoutRedirectToLeaveMsg
          ? this.leaveMsgUrl
          : this.smartBotRoomUrl,
        msgType: 'm.local.notice',
      },
    };
    const { navBarHeight } = this.props;

    const modalHeight = windowHeight - navBarHeight * radio;
    const inputWarpHeight = FOOTER_HEIGHT * this.state.radio;

    return (
      <View className='index'>
        {!canScrollY ? (
          <View className="loading-mask"></View>
        ) : (
          ''
        )}
        {/* <NavBar
          showBackBtn={true} 
          title={name} 
          onClickBack={this.handleClickBack} 
          showDetailBtn={isChannel || isGroup}
          onCheckDetail={this.onCheckDetail} /> */}
        {channelId && (
          <View
            className='modal-history'
            onClick={this.goActivityHistory.bind(this)}
          >
            <View className='icon-consult_history_btn'></View>
          </View>
        )}
        {video ? (
          <View
            className='video-wrap'
            onClick={this.handleVideo.bind(this, null)}
          >
            <Video
              className='video'
              src={video.url}
              controls
              autoplay
              poster={video.poster}
              initialTime='0'
              id='video'
              loop={false}
              muted={false}
            />
          </View>
        ) : (
          ''
        )}
        {
          !isLoading && (
            <ScrollView
              className='records'
              scrollY={canScrollY}
              scrollWithAnimation={false}
              scrollIntoView={viewMsgId}
              scrollTop={scrollTop}
              style={{ height: `${scrollViewHeight}rpx` }}
              upperThreshold='50'
              onTap={this.handleInputArea}
              onScrollToUpper={() => this.handleMoreTimeLine('BACKWORDS')}
              >
              {
                loadingTimeline &&
                <ScrollLoading
                  loading={loadingTimeline}
                  hasMore={hasMoreBack}
                />
              }
              {roomType === ROOMTYPES.dispatch ? (
                <View className='msg-warper' id='tip-msg'>
                  <Message message={tipMessage} />
                </View>
              ) : null}
              {roomType === ROOMTYPES.dispatch && questionType ? (
                <View className='msg-warper' id='question-msg'>
                  <Message message={questionMessage} />
                </View>
              ) : null}
              {curTimeline.map(message => {
                return (
                  <View
                    className='msg-warper'
                    key={message.id}
                    id={'id' + `${message.id}`.replace(/[^\d]/g, '')}
                  >
                    <Message
                      room={this.state.room}
                      showName={roomType === ROOMTYPES.channel}
                      message={message}
                      onVideo={this.handleVideo}
                      onConvo={this.handleConvo}
                      onLink={this.handleLink}
                      onLocation={this.handleLocation}
                      onMessagePress={this.handleMessagePress.bind(this, message)}
                      onReSend={this.handleResend.bind(this, message)}
                      roomType={roomType}
                    />
                  </View>
                );
              })}
              {this.isRightDispatchingRoom() && dispatchState === 'DISPATCHING' ? (
                <View className='msg-warper' id='dispatch-msg'>
                  <Message message={dispatchMessage} />
                </View>
              ) : null}
              {this.isRightDispatchingRoom() && dispatchState === 'TIMEOUT' ? (
                <View className='msg-warper' id='timeout-msg'>
                  <Message message={timeoutMessage} />
                </View>
              ) : null}
              
              {/* <View style={{height: '28px', width: '100%'}}></View> */}
            </ScrollView>
          )
        }
        {input && searchResult && searchResult.result.length > 0 ? (
          <SuggestBox
            suggests={searchResult}
            onSelect={this.handleSuggestSelect}
          />
        ) : (
          ''
        )}

        
        {isBanSendMsg ? (
          <View
            className='footer-mute'
            style={{ height: `${footerHeight}rpx` }}
          >
            本频道已开启禁言
          </View>
        ) : isArchive ? (
          <View
            className='footer-mute'
            style={{ height: `${footerHeight}rpx` }}
          >
            该频道已归档
          </View>
        ) : !isLoading ? (
          <View className='footer' style={{ height: `${footerHeight}rpx` }}>
            {
              showMemberAt && (
                <View className="show-members-at">
                  {
                    filtermembers.map(m => {
                      return (
                        <View onClick={this.memberAtChose.bind(this,m)}>
                          <View className="members-item">
                            <Avatar url={m.avatar} size={60}></Avatar>
                          </View>
                          {m.name}
                        </View>
                      )
                    })
                  }
                </View>
              )
            }
            <View
              className='input-wrap'
              style={{ height: `${inputWarpHeight}rpx` }}
            >
              {!showTypes && !isLoading ? (
                <Input
                  cursor-spacing={(FOOTER_HEIGHT - INPUT_HEIGHT) / 2}
                  className={`input ${this.state.platform}`}
                  style={{ height: `${inputHeight}rpx` }}
                  value={input}
                  focus={inputFocus}
                  placeholder={placeholder}
                  placeholderStyle='color: 9b9b9b'
                  cursor={cursorPosition}
                  confirmHold
                  confirmType='send'
                  onInput={this.handleInput}
                  onConfirm={this.sendTextMessage}
                  onFocus={this.handleInputFocus}
                  onBlur={this.handleInputBlur}
                  adjustPosition={false}
                  maxlength={roomType === ROOMTYPES.dispatch ? 200 : -1}
                />
              ) : (
                ''
              )}

              {showEmoji ? (
                <View className='icon' onTap={this.handleHideEmoji}>
                  &#xe604;
                </View>
              ) : (
                <View className='icon' onTap={this.handleShowEmoji}>
                  &#xe603;
                </View>
              )}
              {showEmoji ? (
                <View className='icon' style={{ fontSize: '35rpx' }} onTap={this.sendTextMessage}>
                  发送
                </View>
              ) : (
                <View className='icon' onTap={this.handleToggleUtil}>
                  &#xe601;
                </View>
              )}
            </View>

            {showEmoji ? (
              <EmojiList
                onSelect={this.handleEmojiSelect}
                height={emojiHeight}
              />
            ) : (
              ''
            )}
            {showUtil ? (
              <ToolBox
                onAction={this.handleToolAction}
                roomId={this.$router.params.roomId}
                roomType={roomType}
                orderId={orderInfo ? orderInfo.orderId : ''}
                isOrderClosed={orderInfo ? orderInfo.isClosed : true}
                dispatchInfo={dispatchInfo}
                height={utilHeight}
              />
            ) : (
              ''
            )}
          </View>
        ) : ('')}
        {isFullScreen && (
          <View
            style={{
              height: `${bottomHeight}rpx`,
              width: '100%',
              backgroundColor: '#f5f5f6',
            }}
          ></View>
        )}
      </View>
    );
  }
}