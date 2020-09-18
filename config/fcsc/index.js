const extJson = require('./ext.js');

const jsonString = JSON.stringify(extJson)
console.log('base_url:', process.env.BASE_URL);

module.exports = {
    env: {
      NODE_ENV: '"development"',
      BASE_URL: '"digittest.95358.com"',
      APP_ID: 'wx29a0e3dad632cac8',
      APP_NAME: '"智富小店"',
    },
    copy: {
      patterns: [
        { from: 'config/fcsc/ext.json', to: 'dist/ext.json' } // 指定需要 copy 的文件
      ]
    },

    defineConstants: {
        COMPANY: '"swan"',
        SHARE_IMG_URL: '"@/assets/private/fcsc/common/share_bg.png"',
        LOGO_IMG_URL: '"@/assets/private/fcsc/common/logo.png"',
        TAB_HOME_ICON_PATH: '"assets/private/fcsc/tabbar/chat_active.png"',
        TAB_MINE_ICON_PATH: '"assets/private/fcsc/tabbar/mine_active.png"',
        TAB_ACTIVE_COLOR: '"#ED3E26"',
        EXT_JSON: jsonString,
    },
    weapp: {},
    h5: {}
}
