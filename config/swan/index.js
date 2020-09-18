const extJson = require('./ext.js');
const jsonString = JSON.stringify(extJson)
console.log('base_url:', process.env.BASE_URL);

module.exports = {
    env: {
      NODE_ENV: '"development"',
      // BASE_URL: '"https://api.finolabs.club"',
      // BASE_URL: process.env.BASE_URL,
      BASE_URL: '"https://finchat-dev.finogeeks.club"',
      // BASE_URL: '"https://t-fino-api.geekthings.com.cn"', //极盛
      // BASE_URL: '"https://api.finolabs.club"',
      // BASE_URL: '"https://mini.finogeeks.club"',
      HS_NAME: '"icbc.com.cn"',
      APP_ID: 'wxb18a9206964a2af0',
      // APP_ID: 'wxd256e18732777b2a',
      APP_NAME: '"Finogeeks"',
    },
    copy: {
      patterns: [
        { from: 'config/swan/ext.json', to: 'dist/ext.json' } // 指定需要 copy 的文件
      ]
    },
// /Users/jiangxue/finogeeks/miniprogramtest/finchat-package
    defineConstants: {
        COMPANY: '"swan"',
        SHARE_IMG_URL: '"@/assets/logo2.png"',
        LOGO_IMG_URL: '"@/assets/login/logo.png"',
        TAB_HOME_ICON_PATH: '"@/assets/toolbar/swan_tag_1h.png"',
        TAB_MINE_ICON_PATH: '"@/assets/toolbar/swan_tag_2h.png"',
        TAB_DISCOVER_ICON_PATH: '"@/assets/toolbar/swan_tag_3h.png"',
        ROOM_DETAIL_ICON: '"@/assets/room/room_detail.png"',
        MESSAGES_NORMAL: '"@/assets/toolbar/messages_normal.png"',
        MESSAGES_SELECTED: '"@/assets/toolbar/messages_selected.png"',
        CONTACTS_NORMAL: '"@/assets/toolbar/contacts_normal.png"',
        CONTACTS_SELECTED: '"@/assets/toolbar/contacts_selected.png"',
        TAB_ACTIVE_COLOR: '"#4285f4"',
        EXT_JSON: jsonString,
        EV: process.env.DEV_ENV,
        HIDE_PASS: '"@/assets/login/hide_pass.png"',
        SHOW_PASS: '"@/assets/login/show_pass.png"',
        LOGIN_LOGO: '"@/assets/login/login_img.png"',
        FAVICON: '"@/assets/login/favicon.png"',
        DEFAULT_CHANNEL: '"@/assets/room/channel_default.png"'
    },
    weapp: {
      
    },
    h5: {}
}
