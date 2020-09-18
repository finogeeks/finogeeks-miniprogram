import Taro, { Component } from '@tarojs/taro';
import '@tarojs/async-await';
import { Provider } from '@tarojs/redux';
import authModel from '@/model/auth';
import extInfo from '@/utils/ext';

import { CombineRouter, CombineStore, eventBus } from './merge-tools';

import { getCacheSync, setCacheSync } from './utils/store';
import store from './store';
// import { reportPresence } from './utils/api';

import Index from './pages/login/index';
import './app.scss';
import { MERGE_ROUTE_CONFIG } from './constants/navigation';

const cRouter = new CombineRouter(MERGE_ROUTE_CONFIG);
const cStore = new CombineStore({ extConfig: {} });

const TAB_ACTIVE_COLOR_VALUE = TAB_ACTIVE_COLOR.substring(1);

// const extInfo = getExtInfo();

class App extends Component {
  config = {
    pages: [
      'pages/login/index',
      'pages/home/index',
      'pages/me/index',
      'pages/room/index',
      'pages/media-preview/index',
      'pages/contacts/index',
      'pages/globalsearch/index',
      'pages/type-search/index',
      'pages/room-detail/index',
      'pages/join-room/index',
      'packages/common/pages/webview/index',
      // 'packages/common/pages/advisor/index',
      'packages/common/pages/binding/index',
      'packages/common/pages/history/index',
      'packages/common/pages/leave-message/index',
      'packages/common/pages/message-detail/index',
      'packages/common/pages/privacy/index',
      'packages/common/pages/settings/index',
    ],
    tabBar: {
      'backgroundColor': '#FFF',
      'color': '#9B9B9B',
      'borderStyle': 'black',
      'selectedColor': TAB_ACTIVE_COLOR,
      'position': 'bottom',
      'list': [
        {
          'pagePath': 'pages/home/index',
          'text': '消息',
          'iconPath': './assets/toolbar/messages_normal.png',
          'selectedIconPath': './assets/toolbar/messages_selected.png',
        },
        {
          'pagePath': 'pages/me/index',
          'text': '我的',
          'iconPath': './assets/toolbar/me_normal.png',
          'selectedIconPath': './assets/toolbar/me_selected.png',
        },
      ],
    },
    networkTimeout: {
      request: process.env.REQUEST_TIMEOUT,
      uploadFile: process.env.FILE_TIMEOUT,
      downloadFile: process.env.FILE_TIMEOUT,
    },
    // permission: {
    //   'scope.userLocation': {
    //     desc: '获取您的位置信息将有助于增强使用时的体验',
    //   },
    // },
    navigateToMiniProgramAppIdList: [
      'wxf676eeae1babc746',
      'wxae565e53a45f4200',
      'wx840d3b17c78201d9',
      'wxca32cd132ab78a69',
    ],
    window: {
      // "navigationStyle": 'custom',
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#FAFAFA',
      navigationBarTitleText: '',
      navigationBarTextStyle: 'black',
    },
    debug: true,
    plugins: {
      wxparserPlugin: {
        version: '0.2.1',
        provider: 'wx9d4d4ffa781ff3ac',
      },
    }
  };

  globalData = {
    cRouter,
    cStore,
    eventBus,
    authModel,
  };

  componentDidMount() {
    cStore.commit('extConfig', extInfo);
    try {
      const logs = getCacheSync('logs') || [];
      setCacheSync('logs', logs);
      wx.onMemoryWarning(ev => {
        // 上报小程序内存警告
        wx.reportMonitor('0', 1);
        console.log('DEBUG: App -> onMemoryWarning -> ev', ev);
      });
    } catch (error) {
      console.log(error);
      Taro.clearStorageSync();
    }
  }

  componentDidShow() {
    // const userInfo = authModel.getUserInfo();
    // const fcid = userInfo && userInfo.retailId;
    // const userSession = authModel.getUserSession();
    // if (fcid && service.isAuth)
    //   service.report
    //     .reportPresence(
    //       fcid,
    //       true,
    //       userSession && userSession.access_token,
    //       userSession && userSession.jwt,
    //     )
    //     .catch(error => {
    //       console.log('reportPresence', error);
    //     });
  }

  componentDidHide() {
    // const userInfo = authModel.getUserInfo();
    // const fcid = userInfo && userInfo.retailId;
    // if (fcid)
    //   service.report.reportPresence(fcid, false).catch(error => {
    //     console.log('reportPresence', error);
    //   });
  }

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById('app'));
