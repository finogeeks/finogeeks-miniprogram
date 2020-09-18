const extJson = require('./ext.js');
const jsonString = JSON.stringify(extJson)

module.exports = {
  env: {
    NODE_ENV: '"development"',
    // BASE_URL: '"https://api.finolabs.club"',
    // // BASE_URL: '"https://mini.finogeeks.club"',
    // // BASE_URL: '"https://t-fino-api.geekthings.com.cn"', //极盛
    // // BASE_URL: '"https://api.finolabs.club"',
    // // BASE_URL: '"https://mini.finogeeks.club"',
    // HS_NAME: '"icbc.com.cn"',
    // APP_ID: 'wxd256e18732777b2a',
    // // APP_ID: 'wxd256e18732777b2a',
    // APP_NAME: '"凡泰金易联"',
  },
    defineConstants: {
        COMPANY: '"rcb"',
        SHARE_IMG_URL: '"@/assets/common/rcb_share.png"',
        LOGO_IMG_URL: '"@/assets/common/rcb_logo.png"',
        TAB_HOME_ICON_PATH: '"assets/toolbar/rcb_tag_1h.png"',
        TAB_MINE_ICON_PATH: '"assets/toolbar/rcb_tag_2h.png"',
        TAB_DISCOVER_ICON_PATH: '"assets/toolbar/rcb_tag_3h.png"',
        TAB_ACTIVE_COLOR: '"#DB530F"',
        EXT_JSON: jsonString,
    },
    weapp: {},
    h5: {}
  }
