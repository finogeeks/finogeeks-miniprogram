const extJson = require('./ext.js');
const jsonString = JSON.stringify(extJson)

module.exports = {
    env: {
      NODE_ENV: '"development"',
      // BASE_URL: '"https://api.finolabs.club"',
      // BASE_URL: 'https://gdfdcrcj.icbc.com.cn/ghol/gdbee', // 工行生产
      // BASE_URL: '"https://gdcscmsim.dccnet.com.cn/WxIcbcWalletServer/gdbee"', // 工行
      BASE_URL: '"https://gd.dccnet.com.cn/gdfdcrcj/gdbee"', // 工行测试
      HS_NAME: '"icbc.com.cn"',
      APP_ID: 'wx9f6a2a64040a332a',
      // APP_ID: 'wxd256e18732777b2a',
      APP_NAME: '"工行在线"',
    },
    defineConstants: {
        COMPANY: '"icbc"',
        SHARE_IMG_URL: '"@/assets/common/icbc_share.png"',
        LOGO_IMG_URL: '"@/assets/common/icbc_logo.png"',
        TAB_HOME_ICON_PATH: '"assets/toolbar/icbc_tag_1h.png"',
        TAB_MINE_ICON_PATH: '"assets/toolbar/icbc_tag_2h.png"',
        TAB_DISCOVER_ICON_PATH: '"assets/toolbar/icbc_tag_3h.png"',
        TAB_ACTIVE_COLOR: '"#C7000B"',
        EXT_JSON: jsonString,
    },
    weapp: {},
    h5: {}
  }
