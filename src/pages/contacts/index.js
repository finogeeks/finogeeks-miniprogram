import Taro, { Component } from '@tarojs/taro';
// import { Events } from "@finogeeks/finchat-js-sdk";
// import service from '@/services';
import { View, ScrollView, Text, Form, Button } from '@tarojs/components';
import { reportFormId } from '@/utils/api';
import { setCache, getCacheSync } from '@/utils/store';
// import { DISPATCH_STATE } from '@/services/dispatch-service';
// import Activity from "@/components/activity";
import NavBar from "@/components/nav-bar";
import { connect, Provider } from '@tarojs/redux';
// import store from '@/store';
import wxRouter from '@/router';
// import { bindActionCreators } from 'redux'
// import { NAV_PAGES } from '@/constants/navigation';
// import { ROOMTYPES } from '@/constants/room';
// import RoomItem from './components/room-item';
import './index.scss';
// import '../../finochat-app.scss';

const shareImage = require(SHARE_IMG_URL);

// const mapStateToProps = ({ navigation, room }) => {
//   return {
//     navBarHeight: navigation.style.navHeight + navigation.style.statusBarHeight,
//     basicRooms: room.basicRooms || [],
//   };
// };

// @connect(mapStateToProps)
export default class Home extends Component {
  checkoutConsultRoom = false;
  isShow = false;
  config = {
    // navigationBarTitleText: '消息',
    // navigationBarBackgroundColor: service.config.THEME_COLOR.NAV_bg,
    // navigationBarTextStyle: 'black',
    // disableScroll: true,
    navigationStyle: 'custom',
  };
  
  constructor() {
    super();
    this.state = {
      // rooms: [],
      scrollHeight: 0,
      hasMobile: false,
      showNavBar: true,
      // pageTitle: '消息'
    };
  }

  componentWillMount() {
    
  }

  componentWillUnmount() {}

  async componentDidShow() {
    
  }

  componentDidHide() {
    
  }

  onShareAppMessage() {
    return {
      title: '消息',
      path: 'pages/login/index',
      imageUrl: shareImage,
    };
  }

  handleClickBack = () => {
    // console.log(Taro.getCurrentPages());
    // this.setState({ showNavBar: false });
    // pages/index/index
    // Taro.navigateBack();
    Taro.navigateBack();
    // Taro.switchTab({ url: '/pages/index/index' });
    // Taro.navigateBack({
    //   delta: 2
    // });
  }

  render() {
    const { scrollHeight, hasMobile, showNavBar } = this.state;
    const { basicRooms } = this.props;
    console.log('===========basicRooms======123=========');
    console.log(basicRooms);
    const roomList = basicRooms || [];
    // console.log('roomList', roomList);
    return (
      <Provider store={store}>
        <View className='index'>
          {/* <NavBar title={pageTitle} /> */}
          {/* <Activity /> */}
          {
            showNavBar ? (
              <NavBar title={'通讯录'} onClickBack={this.handleClickBack} />
            ) : ''
          }
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
            通讯录
          </ScrollView>
        </View>
      </Provider>
    );
  }
}
