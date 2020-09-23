/*
 * @Author: yiwenqi
 * @Date: 2019-08-07 11:54:38
 * @LastEditTime: 2019-08-11 15:11:10
 * @LastEditors: yiwenqi
 * @Description: 
 */
const path = require('path')


const config = {
  projectName: 'swan-mina',
  date: '2018-11-20',
  designWidth: 750,
  deviceRatio: {
    '640': 2.34 / 2,
    '750': 1,
    '828': 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: {
    babel: {
      sourceMap: true,
      presets: [
        'env'
      ],
      plugins: [
        'transform-class-properties',
        'transform-decorators-legacy',
        'transform-object-rest-spread'
      ]
    }
  },
  alias: {
    '@/components': path.resolve(__dirname, '..', 'src/components'),
    '@/utils': path.resolve(__dirname, '..', 'src/utils'),
    '@/service': path.resolve(__dirname, '..', 'src/service'),
    '@/assets': path.resolve(__dirname, '..', 'src/assets'),
    '@/actions': path.resolve(__dirname, '..', 'src/store/actions'),
    '@/reducers': path.resolve(__dirname, '..', 'src/store/reducers'),
    '@/constants': path.resolve(__dirname, '..', 'src/constants'),
    '@/router': path.resolve(__dirname, '..', 'src/router'),
    '@/matrix': path.resolve(__dirname, '..', 'src/matrix'),
    '@/model': path.resolve(__dirname, '..', 'src/model'),
    '@/store': path.resolve(__dirname, '..', 'src/store')
    
  },
  defineConstants: {
    ENV_VERSION: process.env.DEV_ENV === 'prod' ? '"release"' : '"trial"',
  },
  copy: {
    patterns: [
      { from: 'src/assets/tabbar/', to: 'dist/assets/tabbar/'}
    ],
    options: {
    }
  },
  env: {
    REQUEST_TIMEOUT: 45000,
    FILE_TIMEOUT: 90000,
    MIN_SDK_VERSION: '"2.1.2"',
  },
  weapp: {
    module: {
      postcss: {
        autoprefixer: {
          enable: true,
          config: {
            browsers: [
              'last 3 versions',
              'Android >= 4.1',
              'ios >= 8'
            ]
          }
        },
        pxtransform: {
          enable: true,
          config: {

          }
        },
        url: {
          enable: true,
          config: {
            limit: 10240 // 设定转换尺寸上限
          }
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    module: {
      postcss: {
        autoprefixer: {
          enable: true
        }
      }
    }
  }
}
const org = process.env.ORG_ENV || 'swan';
module.exports = function (merge) {
  return merge({}, config, require(`./${org}`))
  // if (process.env.NODE_ENV === 'development') {
  //   return merge({}, config, require('./dev'))
  // }
  // return merge({}, config, require('./prod'))
}
