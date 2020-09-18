module.exports = {
  extEnable: true,
  extAppid: 'wx415a14d7c4832f96',
  directCommit: false,
  ext: {
    BASE_URL: process.env.BASE_URL,
    ORG_ID: '',
    APP_ID: 'wx415a14d7c4832f96',
    APP_NAME: '悦农在线',
    HS_DOMAIN: 'im.icbc.com.cn',
    APP_DESCRIPTION: '一个能让您的咨询被高效解决的应用',
    CATEGORY: 'stock',
    LOGIN_TYPE: 'unionid', // 私有化和个人体验unionid登录，SaaS租户用openid登录（SaaS租户的小程序不会绑定到凡泰开放平台，获取不到unionid）
    THEME_COLOR: {
      NAV_bg: '#DB530F',
      TP_n: '#DB530F',
      TP_p: '#AF420C',
      TP_d: '#F2B698',
      Btn_n: '#DB530F',
      Btn_p: '#AF420C',
      Btn_d: '#F2B698',
      Bubble_Host_fill: '#FEF2EC',
      Bubble_Host_border: '#FFD3BD',
      Bubble_Guest_fill: '#FFFFFF',
      Bubble_Guest_border: '#CFCFCF',
    },
    CUSTOM_CONFIG: {
      DISPATCH_TIMEOUT_REDIRECT: 'smart-bot',
      LEAVE_MESSAGE_SELECT_LOCATION: false,
      FEATURE_FORCE_CONSULTING_WITH_PHONE: false,
      FEATURE_TWEET_TIP_TYPE: '',
      FEATURE_COMMENT_WITH_FUND_ACCOUNT: false, 
      FUND_ACCOUNT_LOGIN_URL: ""
    },
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#FAFAFA',
    navigationBarTitleText: '',
    navigationBarTextStyle: 'black',
  },
};
