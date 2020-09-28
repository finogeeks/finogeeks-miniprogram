import Taro from '@tarojs/taro';
import isEmpty from './lodash-local/is-empty';
declare var EXT_JSON: any;

const extInfo = {
  "extEnable": true,
  "extAppid": "wxb18a9206964a2af0",
  "directCommit": false,
  "ext": {
    "APP_ID": "wxb18a9206964a2af0",
    "APP_NAME": "Finchat",
    "BASE_URL": "https://api.finogeeks.club",
    // "BASE_URL": "https://finchat-dev.finogeeks.club",
    "INTRO": "在线咨询",
    "WELCOME": "欢迎登陆",
    "THEME_COLOR": {
      "NAV_bg": "#ffffff",
      "TP_n":"#1951AE",
      "TP_p":"#113879",
      "TP_d":"#9EBAE8",
      "Btn_n":"#12B6CC",
      "Btn_p":"#113879",
      "Btn_d":"#9EBAE8",
      "Bubble_Host_fill":"#EDFAFF",
      "Bubble_Host_border":"#BBD4FF",
      "Bubble_Guest_fill":"#FFFFFF",
      "Bubble_Guest_border":"#CFCFCF"
    },
    "CONFIG": {
      "DISPATCH_TIMEOUT_REDIRECT": "smart-bot",
      "LEAVE_MESSAGE_SELECT_LOCATION": false
    },
    "CUSTOM_CONFIG": {
      "DISPATCH_TIMEOUT_REDIRECT": "smart-bot",
      "LEAVE_MESSAGE_SELECT_LOCATION": false,
      "FEATURE_FORCE_CONSULTING_WITH_PHONE": false,
      "FEATURE_TWEET_TIP_TYPE": "RISK_AND_DISCLAIMER",
      "FEATURE_COMMENT_WITH_FUND_ACCOUNT": true, 
      "FUND_ACCOUNT_LOGIN_URL": "https://wxnewtest.fcsc.com/fcscoauth/oauth/authorize?client_id=IF08-06411&redirect_uri=https://swan.finogeeks.club/webapps/pages/authorize&response_type=token&scope=api_info"
    }
  },
  "window": {
    "backgroundTextStyle": "light",
    "navigationBarBackgroundColor": "#ffffff",
    "navigationBarTitleText": "",
    "navigationBarTextStyle": "black"
  }
}
;
export function getExtInfo() {
  // const extInfo = Taro.getExtConfigSync();
  // return !isEmpty(extInfo) ? extInfo : EXT_JSON.ext;
  return extInfo.ext;
}
export default extInfo.ext;