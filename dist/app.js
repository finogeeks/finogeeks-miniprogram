"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require("./npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

require("./npm/@tarojs/async-await/index.js");

var _index3 = require("./npm/@tarojs/redux/index.js");

var _auth = require("./model/auth.js");

var _auth2 = _interopRequireDefault(_auth);

var _ext = require("./utils/ext.js");

var _ext2 = _interopRequireDefault(_ext);

var _index4 = require("./merge-tools/index.js");

var _store = require("./utils/store.js");

var _index5 = require("./store/index.js");

var _index6 = _interopRequireDefault(_index5);

var _navigation = require("./constants/navigation.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import { reportPresence } from './utils/api';

(0, _index3.setStore)(_index6.default);

if (_index3.ReduxContext.Provider) {
  _index3.ReduxContext.Provider({
    store: _index6.default
  });
  _index3.ReduxContext.Provider({
    store: _index6.default
  });
}

var cRouter = new _index4.CombineRouter(_navigation.MERGE_ROUTE_CONFIG);
var cStore = new _index4.CombineStore({ extConfig: {} });

var TAB_ACTIVE_COLOR_VALUE = "#4285f4".substring(1);

// const extInfo = getExtInfo();

var _App = function (_BaseComponent) {
  _inherits(_App, _BaseComponent);

  function _App() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, _App);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _App.__proto__ || Object.getPrototypeOf(_App)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      pages: ['pages/login/index', 'pages/home/index', 'pages/me/index', 'pages/room/index', 'pages/media-preview/index', 'pages/contacts/index', 'pages/globalsearch/index', 'pages/type-search/index', 'pages/room-detail/index', 'pages/join-room/index', 'packages/common/pages/webview/index',
      // 'packages/common/pages/advisor/index',
      'packages/common/pages/binding/index', 'packages/common/pages/history/index', 'packages/common/pages/leave-message/index', 'packages/common/pages/message-detail/index', 'packages/common/pages/privacy/index', 'packages/common/pages/settings/index'],
      tabBar: {
        'backgroundColor': '#FFF',
        'color': '#9B9B9B',
        'borderStyle': 'black',
        'selectedColor': "#4285f4",
        'position': 'bottom',
        'list': [{
          'pagePath': 'pages/home/index',
          'text': '消息',
          'iconPath': './assets/toolbar/messages_normal.png',
          'selectedIconPath': './assets/toolbar/messages_selected.png'
        }, {
          'pagePath': 'pages/me/index',
          'text': '我的',
          'iconPath': './assets/toolbar/me_normal.png',
          'selectedIconPath': './assets/toolbar/me_selected.png'
        }]
      },
      networkTimeout: {
        request: 45000,
        uploadFile: 90000,
        downloadFile: 90000
      },
      // permission: {
      //   'scope.userLocation': {
      //     desc: '获取您的位置信息将有助于增强使用时的体验',
      //   },
      // },
      navigateToMiniProgramAppIdList: ['wxf676eeae1babc746', 'wxae565e53a45f4200', 'wx840d3b17c78201d9', 'wxca32cd132ab78a69'],
      window: {
        // "navigationStyle": 'custom',
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#FAFAFA',
        navigationBarTitleText: '',
        navigationBarTextStyle: 'black'
      },
      debug: true,
      plugins: {
        wxparserPlugin: {
          version: '0.2.1',
          provider: 'wx9d4d4ffa781ff3ac'
        }
      }
    }, _this.globalData = {
      cRouter: cRouter,
      cStore: cStore,
      eventBus: _index4.eventBus,
      authModel: _auth2.default
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(_App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      cStore.commit('extConfig', _ext2.default);
      try {
        var logs = (0, _store.getCacheSync)('logs') || [];
        (0, _store.setCacheSync)('logs', logs);
        wx.onMemoryWarning(function (ev) {
          // 上报小程序内存警告
          wx.reportMonitor('0', 1);
          console.log('DEBUG: App -> onMemoryWarning -> ev', ev);
        });
      } catch (error) {
        console.log(error);
        _index2.default.clearStorageSync();
      }
    }
  }, {
    key: "componentDidShow",
    value: function componentDidShow() {
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
  }, {
    key: "componentDidHide",
    value: function componentDidHide() {
      // const userInfo = authModel.getUserInfo();
      // const fcid = userInfo && userInfo.retailId;
      // if (fcid)
      //   service.report.reportPresence(fcid, false).catch(error => {
      //     console.log('reportPresence', error);
      //   });
    }
  }, {
    key: "componentDidCatchError",
    value: function componentDidCatchError() {}

    // 在 App 类中的 render() 函数没有实际作用
    // 请勿修改此函数

  }, {
    key: "_createData",
    value: function _createData() {}
  }]);

  return _App;
}(_index.Component);

exports.default = _App;

App(require('./npm/@tarojs/taro-weapp/index.js').default.createApp(_App));
_index2.default.initPxTransform({
  "designWidth": 750,
  "deviceRatio": {
    "640": 1.17,
    "750": 1,
    "828": 0.905
  }
});