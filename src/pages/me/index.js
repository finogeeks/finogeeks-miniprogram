import Taro, { Component } from '@tarojs/taro';
import { View, Text, ScrollView, Button } from '@tarojs/components';
import ListItem from '@/components/list-item';
import Avatar from '@/components/avatar';
import authModel from '@/model/auth';
import imModel from '@/model/im';
import extInfo from '@/utils/ext';
import wxRouter from '@/router';
import { NAV_PAGES } from '@/constants/navigation';
import { deleteAllRooms } from '@/actions/room';
import service from '@/service';
import matrix from '@/matrix';
import NavBar from '@/components/nav-bar';
import { logout } from '@/utils/api';
import store from '@/store';
import { set as setGlobalData, get as getGlobalData } from '@/utils/globaldata';
import './index.scss';
import { stopJwtRefresh } from '@/utils/refreshjwt';

class Me extends Component {
  config = {
    navigationBarTitleText: '我的',
    navigationBarBackgroundColor: extInfo.THEME_COLOR.NAV_bg,
    navigationBarTextStyle: 'black',
    navigationStyle: 'custom',
  };

  constructor() {
    super();
    this.appName = extInfo.APP_NAME;
    this.state = {
      account: null,
      userInfo: {},
      init: false,
      mobile: '',
      appName: extInfo.APP_NAME,
    };
  }

  componentWillMount() {
    // wx.setNavigationBarColor({
    //   frontColor: '#ffffff',
    //   backgroundColor: extInfo.THEME_COLOR.NAV_bg,
    // });
    this.handleInitUser();
    // if (authModel.isAuth) {
    //   this.handleInitUser();
    //   this.initMobile();
    // }
  }

  // initMobile = () => {
  //   const userInfo = authModel.getUserInfo();
  //   this.setState({ mobile: userInfo.mobile });
  // };

  async componentDidShow() {
    if (!Taro.getSystemInfoSync().inFinChat) {
      const { code } = await Taro.login();
      this.setState({ code });
    }
    // if (authModel.isAuth) {
    //   this.handleInitUser();
    //   this.initMobile();
    // }
  }

  handleInitUser = async () => {
    let userInfo = authModel.getUserSession();
    userInfo = await matrix.user.getUser(userInfo.userId)
    this.setState({ userInfo });
    await this.checkAccount(userInfo.retailId);
  };

  checkAccount = async fcid => {
    if (!fcid) {
      return;
    }
    try {
      const accounts = await service.user.getAccount(fcid);
      const searchIndex = accounts.findIndex(
        account => account.accountType === 'icbc',
      );
      if (searchIndex > -1) {
        this.setState({ account: accounts[searchIndex] });
      } else {
        this.setState({
          account: accounts.find(account => account.accountType === 'weixin'),
        });
      }
    } catch (error) {
      // Taro.showModal({
      //   title: '',
      //   content: 'UAC服务异常, 请稍后重试',
      //   showCancel: false,
      // })
    } finally {
      this.setState({ init: true });
    }
  };

  isNotBind = () => {
    return (
      !this.state.account ||
      (this.state.account.accountType !== 'icbc' ||
        !this.state.account.accountData ||
        !this.state.account.accountData.phone)
    );
  };

  handleBinding = () => {
    if (!this.state.init) {
      return;
    }
    if (!this.state.account || !this.state.account.accountType) {
      this.checkAccount(this.userInfo && this.userInfo.retailId);
    } else {
      // Taro.navigateTo({
      //   url: `/packages/common/pages/binding/index?account=${JSON.stringify(this.state.account)}`
      // })
      wxRouter.navigateTo(NAV_PAGES.BINDING, {
        account: JSON.stringify(this.state.account),
      });
    }
  };

  handleSetting = () => {
    Taro.navigateTo({
      url: NAV_PAGES.SETTING
    })
    // wxRouter.navigateTo(NAV_PAGES.SETTING);
  };

  handlePrivacy = () => {
    // Taro.navigateTo({
    //   url: '/packages/common/pages/privacy/index'
    // })
    wxRouter.navigateTo(NAV_PAGES.PRIVACY);
  };

  goToAuthPage = () => {
    if (authModel.isAuth) return;
    authModel.goToAuthPage();
  };

  handleLogOut = async () => {
    stopJwtRefresh();
    Taro.showLoading({ title: '正在退出' });
    await logout();
    await imModel.stop();
    // Taro.clearStorageSync();
    await authModel.clearAuth();
    setGlobalData('showRoomList', false);
    setGlobalData('firstRenderHome', true);
    setGlobalData('hasEnterRoom', false);
    // store.dispatch(deleteAllRooms());
    setTimeout(() => {
      // Taro.redirectTo({ url: NAV_PAGES.LOGIN });
      Taro.reLaunch({
        url: NAV_PAGES.LOGIN
      });
      Taro.hideLoading();
    }, 1000);
  }

  render() {
    console.log('~~~~~~~~~~~~page me~~~~~~~~~~~~');
    console.log(this.state.userInfo);
    return (
      <View className='index'>
        <NavBar showBackBtn={false} title={'我的'} />
        <View className='header'>
          <View className='upper' onClick={this.goToAuthPage}>
            <Avatar
              className='avatar'
              url={this.state.userInfo.avatar}
              circle
              outterCircle
              size={140}
            />
          </View>
          <View className='bottom' onClick={this.goToAuthPage}>
            <Text className='name'>
              {authModel.isAuth ? this.state.userInfo.name : '未登录'}
            </Text>
          </View>
        </View>
        <ScrollView
          className='page_main'
          scrollY
          scrollWithAnimation
          scrollTop='0'
        >
          <View className='wrap'>
            <ListItem
              name='设置'
              icon='&#xe620;'
              hasRightArrow
              activeStyle
              onClick={this.handleSetting}
            ></ListItem>
            {/* {this.state.appName === '工行在线' ? (
              <ListItem
                name='隐私声明'
                icon='&#xe642;'
                hasRightArrow
                activeStyle
                onClick={this.handlePrivacy}
              ></ListItem>
            ) : null} */}
          </View>
          <View className="bottom-btn" onClick={this.handleLogOut}>
            退出登录
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Me;
