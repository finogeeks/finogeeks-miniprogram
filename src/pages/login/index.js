import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text, Image } from '@tarojs/components';
import extInfo from '@/utils/ext';
import { isCompatible } from '@/utils/version';
import { DISPATCH_STATE } from '@/constants/dispatch';
import service from '@/service';
import { parseParams } from '@/utils/util';
import wxRouter from '@/router';
import { NAV_PAGES, MERGE_ROUTE_CONFIG } from '@/constants/navigation';
import { connect } from '@tarojs/redux';
import { bindActionCreators } from 'redux';
import { setUserLocaton, setUserInfo, setUserSession } from '@/actions/user';
import authModel from '@/model/auth';
import imModel from '@/model/im';
import './index.scss';
import store from '../../store';
import { saveDetectState } from '@/actions/detect';
import detect from '../../store/reducers/detect';
import { set as setGlobalData, get as getGlobalData } from '@/utils/globaldata';
import { startJwtRefresh } from '@/utils/refreshjwt'
import { getCacheSync, setCacheSync, removeCacheSync } from '../../utils/store';
// import '../../assets/common/login_bg.svg';

const logoImage = require(LOGO_IMG_URL);
const shareImage = require(SHARE_IMG_URL);
const hidePassImg = require(HIDE_PASS);
const showPassImg = require(SHOW_PASS);
const loginLogo = require(LOGIN_LOGO);
const favicon = require(FAVICON);

const loginBtnStyle = {
  color: '#FFF',
  backgroundColor: extInfo.THEME_COLOR.Btn_n,
};

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({ setUserLocaton }, dispatch),
  };
}
@connect(
  () => ({}),
  mapDispatchToProps,
)
class Login extends Component {
  config = {
    navigationBarTitleText: extInfo.APP_NAME,
    navigationBarBackgroundColor: extInfo.THEME_COLOR.NAV_bg,
    navigationBarTextStyle: 'black',
  };
  constructor(props) {
    super(props);
    this.authComplete = false;
    this.state = {
      canShow: false,
      isLoading: false,
      hasAuthed: true,
      userName: '',
      userPassWord: '',
      showPass: true,
      showPage: '',
      loginCode: '',
      nickName: '',
      avatarUrl: ''
    };
  }

  async componentWillMount() {
    service.detect.getDetectControl().then(res => {
      store.dispatch(saveDetectState({
        needDetect: res,
      }));
    });
    // Taro.showLoading();
    this.initNavigation();
    await this.start();
    // Taro.hideLoading();
  }

  componentWillUnmount() {
    if (!this.authComplete) {
      authModel.triggerAuthCompelte();
    }
    
  }

  preAuthLocation = async () => {
    try {
      await Taro.getLocation();
    } catch (error) {
      return null;
    }
  };

  getInitStyle = () => {
    const systemInfo = Taro.getSystemInfoSync();
    // Taro 暂未实现此功能
    // const actionButtonInfo = Taro.getMenuButtonBoundingClientRect();
    const { statusBarHeight, windowWidth } = systemInfo;
    let navHeight = (88 * windowWidth) / 750;
    navHeight = navHeight < 44 ? 44 : navHeight;
    // const maxTitleWidth = (actionButtonInfo.left - windowWidth / 2) * 2;

    return {
      navHeight,
      statusBarHeight,
      // maxTitleWidth,
      headerHeight: navHeight + statusBarHeight,
    };
  };

  componentDidShow() {
    Taro.setNavigationBarTitle({ title: extInfo.APP_NAME });
    console.log('~~~~~~~~~~getSystemInfoSync~~~~~~~~~~~', Taro.getSystemInfoSync());
    if (Taro.getSystemInfoSync().inFinChat) {
      this.setState({
        showPage: 'third'
      })
    } else {
      this.setState({
        showPage: 'first'
      })
      Taro.login({
        success: (res) => {
          this.setState({
            loginCode: res.code
          })
        }
      })
    }

    // Taro.getUserInfo({
    //   success: (userInfo) => {
    //     const {nickName, avatarUrl} = userInfo.userInfo;
    //     this.setState({
    //       nickName,
    //       avatarUrl
    //     })
    //   }
    // })
  }

  onShareAppMessage() {
    return {
      title: extInfo.APP_NAME,
      path: 'pages/login/index',
      imageUrl: shareImage,
    };
  }

  async initNavigation() {
    const initStyle = this.getInitStyle();
    console.log('LOGIN INITNAVIGATION');
    console.log(initStyle);
    wxRouter.initNavigation([{ url: NAV_PAGES.LOGIN }], initStyle);
  }

  handleStartError = async () => {
    authModel.clearAuth();
    console.log('route', this.$router.params);
    this.setState({
      canShow: true,
      hasAuthed: false,
    });
    return;

    // // 若没有type 则默认跳转去广场页
    // if (!type) {
    // }
    // this.setState({
    //   canShow: true,
    //   hasAuthed: false,
    // });
    // return;
  };

  start = async () => {
    const isAuth = await authModel.checkAuth({checkJwt: false, checkAuth: false});
    console.log('LOGIN START');
    console.log(isAuth);
    if (isAuth) {
      // await this.preAuthLocation();
      console.log(imModel.isReady);
      if (!imModel.isReady) {
        await imModel.start(authModel.userSession.userId);
        // imModel.matrix
        const userInfo = await imModel.matrix.user.getUser(authModel.userSession.userId)
        // console.log(`~~~~~~~~~~~~login matrixstart userinfo:  ${userInfo}~~~~~~~~~~~~~~`);
        // console.log(userInfo);
        setCacheSync('userInfo', userInfo);
        store.dispatch(setUserInfo(userInfo));
        !Taro.getSystemInfoSync().inFinChat && await authModel.getUserPosition()
        // await Promise.all[
        //   (authModel.syncUserInfo(), authModel.getUserPosition())
        // ];
      }
      this.handleInitAction();
    } else {
      if (imModel.matrix.mxClient) await imModel.stop();
      this.handleStartError();
    }
  };

  onSetUserInfo = async () => {
    Taro.showLoading({ title: '加载中' });
    try {
      await authModel.login(this.state.userName, this.state.userPassWord);
      await this.start();
      Taro.hideLoading();
      Taro.showToast({
        title: '登录成功',
        icon: 'success',
        mask: true,
        duration: 1500,
      });
    } catch (error) {
      Taro.hideLoading();
      console.log(error);
      this.handleStartError();
      Taro.showToast({
        title: error && error.data && error.data.error,
        icon: 'none',
        mask: true,
        duration: 1500,
      });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  checkCompatible() {
    const wcSystemInfo = Taro.getSystemInfoSync();
    // console.log(wcSystemInfo);
    const canRun = isCompatible(wcSystemInfo.SDKVersion);
    if (!canRun) {
      Taro.showModal({
        title: '',
        content: '当前微信版本较低, 请升级至最新版本',
        showCancel: false,
      });
    }

    return canRun;
  }

  handleInitAction = async () => {
    Taro.showLoading({ title: '加载中' });
    // this.preAuthLocation();
    try {
      console.log('LOGIN PARAMS: ', this.$router.params);
      const { type, roomId, fcid } = await this.getActionParams();
      const value = {};
      const { cRouter } = Taro.getApp().globalData;
      console.log('ACTION PARAMS:', type, roomId);
      // startJwtRefresh();
      switch (type) {
        case 'BIND_ADVISOR':
          console.log(value);
          await this.bindAdvisor(value.advisorId);
          return;
        case 'CONSULT_ADVISOR':
          await this.consultAdviosr(value.advisorId, value.msg, value.formId);
          return;
        case 'ENTER_ROOM':
          // await this.enterRoom(value.roomId, value.staffId);
          wxRouter.switchTab(NAV_PAGES.HOME, {enterRoom: roomId, fcid});
          // imModel.enterRoom(value.roomId);
          return;
        case 'VIEW_ROOMS':
          wxRouter.switchTab(NAV_PAGES.HOME);
          return;
        case 'VIEW_MICRO_WEB':
          wxRouter.redirectTo(NAV_PAGES.VIEW_MICRO_WEB, {
            staffId: value.staffId,
            shareViewName: value.shareViewName,
            shareId: value.shareId,
          });
          return;
        case 'REDIRECT_TO_PAGE':
          if (value.name) {
            cRouter.redirectTo(value);
          } else {
            if (
              value.page.includes(NAV_PAGES.SQUARE) ||
              value.page.includes(NAV_PAGES.HOME) ||
              value.page.includes(NAV_PAGES.ME)
            ) {
              wxRouter.switchTab(value.page, {
                ...value.query,
              });
            } else {
              wxRouter.redirectTo(value.page, {
                ...value.query,
              });
            }
          }
          return;
        case 'AUTH':
          this.authComplete = true;
          Taro.navigateBack({
            complete: () =>
              setTimeout(() => authModel.triggerAuthCompelte(), 300),
          });
          return;
        case 'CONSULT_ROOM':
          // 临时处理，兼容低配置安卓机
          setTimeout(() => this.handleConsult(value), 500);
          // this.handleConsult(value);
          return;
        default:
          imModel.updateUnreadBadge();
          wxRouter.switchTab(NAV_PAGES.HOME);
          break;
      }
      // Taro.switchTab({ url: `/pages/home/index` });
      // wxRouter.switchTab(NAV_PAGES.HOME);
    } catch (error) {
      console.log(error);
      // Taro.switchTab({ url: `/pages/home/index` });
    }
    Taro.hideLoading();
    return true;
  };

  handleConsult = async value => {
    const { dispatchState, from, dispatchRoomId } = service.dispatch.getState();
    console.log('DEBUG: handleConsult => value.channelId', value);
    Taro.setStorageSync('__channelId__', value.channelId);
    if (value.channelId) {
      const { cRouter } = Taro.getApp().globalData;
      const data = await service.adviser.getChannelInfo(value);
      if (!data) {
        cRouter.redirectTo({
          path: MERGE_ROUTE_CONFIG.STUDIO_PUBLIC_ERROR,
          query: {
            type: 'channelDisable',
          },
        });
        return;
      }
    }

    if (
      dispatchState === DISPATCH_STATE.dispatching &&
      from === 'customer-bot'
    ) {
      Taro.showToast({
        title: '您有咨询消息正在处理中，请稍等...',
        icon: 'none',
        mask: true,
      });
      return;
    }
    if (dispatchState === DISPATCH_STATE.dispatching) {
      console.log('checkout dispatching room', dispatchRoomId, from);
      imModel.enterRoom(dispatchRoomId);
      return dispatchRoomId;
    }
    // console.log('get dispatch advisor room: ', advisorRoomData.roomId);

    const advisorRoomData =
      (await service.adviser.getAdvisorRoomInfo({
        pattern: 'B',
        retailId: authModel.getUserInfo().retailId,
      })) || {};
    if (!advisorRoomData.roomId) {
      Taro.showToast({
        title: '咨询失败，请重试',
        icon: 'none',
        mask: true,
      });
      return;
    }
    imModel.enterRoom(advisorRoomData.roomId, {
      redirect: true,
      channelId: value.channelId,
    });
  };

  getActionParams = async () => {
    let { scene, type, value, roomId, fcid } = this.$router.params;
    console.log('getActionParams  fcid:  ', fcid);
    let decodeValue = {};
    if (scene) {
      console.log('action sence:', scene);
      // handle scene
      const sceneData = await service.common.getSceneData(scene);
      const parseData = parseParams(sceneData.queryString);
      type = parseData.type;
      try {
        decodeValue = JSON.parse(decodeURIComponent(parseData.value));
      } catch (error) {}
    } else if (value) {
      decodeValue = JSON.parse(decodeURIComponent(value));
    }
    return { type, value: decodeValue, roomId, fcid };
  };

  bindAdvisor = async advisorId => {
    console.log('advisorId', advisorId);
    if (advisorId) {
      const userInfo = authModel.getUserInfo();
      const { retailId } = userInfo;
      const res = await service.adviser.bindAdvisor({
        retailId,
        bindStaffId: advisorId,
      });
      console.log('action bindres', res);
    }
    // Taro.switchTab({ url: `/pages/home/index` });
    wxRouter.switchTab(NAV_PAGES.HOME);
    return true;
  };

  consultAdviosr = async (advisorId, msg, formId) => {
    if (!advisorId) {
      // Taro.switchTab({ url: `/pages/home/index` });
      wxRouter.switchTab(NAV_PAGES.HOME);
    }
    console.log('action consult advisor', advisorId);
    const success = await imModel.enterAdvisorRoom(
      advisorId,
      msg,
      true,
      formId,
    );
    if (!success) {
      wxRouter.switchTab(NAV_PAGES.HOME);
    }
  };

  enterRoom = async (roomId, staffId) => {
    console.log('DEBUG: enterRoom -> roomId, staffId', roomId, staffId);
    const success = await imModel.enterRoom(roomId, {
      autoJoin: staffId ? true : false,
      staffId,
      redirect: true,
    });
    console.log('success', success);
    if (!success) {
      wxRouter.switchTab(NAV_PAGES.HOME);
    }
  };

  handleLogin = async res => {
    if (!res.detail.userInfo) {
      console.log('登录失败信息：', res);
      Taro.showModal({
        title: '',
        content: '拒绝授权, 您将无法正常使用我们的功能',
        showCancel: false,
      });
      return;
    }
    await this.onSetUserInfo();
  };

  handleShowPass = () => {
    console.log('=========handleShowPass==========');
    this.setState({
      showPass: !this.state.showPass,
    });
  }

  passWordChange = (val) => {
    this.setState({
      userPassWord: val.currentTarget.value,
    });
  }

  userNameChange = (val) => {
    this.setState({
      userName: val.currentTarget.value,
    });
  }

  getPhoneNumber = (phone) => {
    console.log(phone);
    if (!phone.detail.encryptedData) {
      return;
    }
    Taro.getUserInfo({
      success: (userInfo)=> {
        console.log(userInfo);
        const {nickName, avatarUrl} = userInfo.userInfo;
        // Taro.login({
        //   success: (res) => {
        //     console.log(res)
            this.onwxlogin(nickName, avatarUrl, this.state.loginCode, phone.detail.encryptedData, phone.detail.iv);
            // this.onwxlogin(nickName, avatarUrl, res.code, phone.detail.encryptedData, phone.detail.iv);
        //   }
        // });
      }
    })
  }

  onwxlogin = async (nick_name, avatar, code, encrypted_data, iv) => {
    console.log('~~~~~~~~~~~~~~~~~onwxlogin~~~~~~~~~~~~~~~~~', nick_name, avatar, code, encrypted_data, iv);
    Taro.showLoading({ title: '加载中' });
    try {
      await authModel.wxlogin(nick_name, avatar, code, encrypted_data, iv);
      await this.start();
      Taro.hideLoading();
      Taro.showToast({
        title: '登录成功',
        icon: 'success',
        mask: true,
        duration: 1500,
      });
    } catch (error) {
      Taro.hideLoading();
      console.log(error);
      this.handleStartError();
      Taro.showToast({
        title: error && error.data && error.data.error,
        icon: 'none',
        mask: true,
        duration: 1500,
      });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleAccess = async res => {
    if (!res.detail.userInfo) {
      console.log('登录失败信息：', res);
      Taro.showModal({
        title: '',
        content: '拒绝授权, 您可以使用”已有账号登录“功能',
        showCancel: false,
      });
      return;
    }
    Taro.getUserInfo({
      success: (userInfo)=> {
        console.log(userInfo);
        const {nickName, avatarUrl} = userInfo.userInfo;
        const { encryptedData, iv } = userInfo
        // Taro.login({
        //   success: (res) => {
        //     console.log(res)
            this.onwxlogin(nickName, avatarUrl, this.state.loginCode, encryptedData, iv);
            // this.onwxlogin(nickName, avatarUrl, res.code, phone.detail.encryptedData, phone.detail.iv);
        //   }
        // });
      }
    })
    // this.setState({
    //   showPage: 'second'
    // });
  };

  goPwdLogin = () => {
    console.log('~~~~~~~~~~~~~goPwdLogin~~~~~~~~~~~~~');
    this.setState({
      showPage: 'third'
    });
  }

  render() {
    const { showPass, showPage } = this.state;
    const systeminfo = Taro.getSystemInfoSync();
    console.log('LOGIN RENDER');
    console.log(this.props);
    if (this.state.canShow && !this.state.hasAuthed && showPage === 'first' && !systeminfo.inFinChat) {
      return (<View>
        <View className="login-title">
          交流中交易
        </View>
        <View className="login-second-title">
          专属金融领域的通讯与协同平台
        </View>
        <View>
          <Image className="login-img" src={loginLogo} />
        </View>
        <Button
          className="access-btn"
          openType='getUserInfo'
          onGetUserInfo={this.handleAccess}
          >
          微信登录
        </Button>
        <View
          className="account-login-btn"
          onClick={this.goPwdLogin}
          >
          已有账号登录
        </View>
      </View>)
    } else if (this.state.canShow && !this.state.hasAuthed && showPage === 'second' && !systeminfo.inFinChat) {
      return(
        <View>
          <Image src={favicon} className='secondpage-logo' />
          <View className="favi-title">Finchat</View>
          <View className="login-second-title">申请获取你的微信绑定手机号</View>
          <Button
            className="access-btn"
            openType='getPhoneNumber'
            onGetPhoneNumber={this.getPhoneNumber}
            >
            获取手机号
          </Button>
          <View
            className="account-login-btn"
            onClick={this.goPwdLogin}
            >
            已有账号登录
          </View>
        </View>
      )
    } else if (this.state.canShow && !this.state.hasAuthed && showPage === 'third') {
      return (
        // <Provider store={store}>
          <View className='index'>
            <Image src={logoImage} className='logo' />
            <Text className='sub-title'>{this.state.intro}</Text>
            <Text className='name-title'>账号</Text>
            <Input value={this.state.userName} className="user-name" type='text' placeholder='请输入用户名/手机号' maxLength='20' onInput={this.userNameChange}/>
            <View className="part-line"></View>
            <Text className='pass-title'>密码</Text>
            <Input password={showPass} value={this.state.userPassWord} className="user-name" type='text' placeholder='请输入密码' maxLength='20' onInput={this.passWordChange}/>
            <View className="part-line">
              <View className="show-pass-container" onClick={this.handleShowPass}>
                {showPass ? (
                  <Image src={showPassImg} className='show-pass-control'/>
                ) : (
                  <Image src={hidePassImg} className='show-pass-control'/>
                )}
              </View>
            </View>
            {systeminfo.inFinChat ? (
              <View
                className={['login-btn', 'login-view', this.state.userPassWord.length > 0 && this.state.userName.length > 0 ? 'can-submit' :'' ]}
                loading={this.state.isLoading}
                onClick={this.onSetUserInfo}
                >
                登陆
              </View>
            ) : (
              <Button
                loading={this.state.isLoading}
                openType='getUserInfo'
                onGetUserInfo={this.handleLogin}
                className={['login-btn', this.state.userPassWord.length > 0 && this.state.userName.length > 0 ? 'can-submit' :'' ]}
              >
                登录
              </Button>
            )}
          </View>
        // </Provider>
      );
    }
  }
}

export default Login;
