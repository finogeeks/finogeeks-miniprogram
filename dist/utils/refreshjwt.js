"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stopJwtRefresh = exports.startJwtRefresh = undefined;

// function monitorUserOperate() {
//     clearTimeout(userMonitor)
//     userMonitor = setTimeout(() => {
//         emitter.emit('TOKEN_INVALID');
//     }, overDueTime*1000);
// }
var refreshjwt = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var _this = this;

    var oldinfo;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // await authModel.clearAuth();
            // console.log('refresh_token', err);
            // Taro.reLaunch({
            //     url: NAV_PAGES.LOGIN
            // });
            // console.log('当前token已失效,请重新登录    refreshjwt');
            // Taro.showToast({ title: '当前token已失效,请重新登录', icon: 'none' });
            oldinfo = (0, _store.getCacheSync)('userSession');

            console.log('~~~~~~refreshjwt~~~~~~~~`', oldinfo);
            // console.log(wx.getStorageSync('userSession'));
            // wx.getStorage({
            //     key: 'userSession',
            //     success (res) {
            //         console.log('~~~~~~refreshjwt  getStorage~~~~~~~~`', res.data)
            //     }
            // })
            (0, _httpClient.request)({
              url: "/api/v1/registry/token",
              method: 'post',
              // needAuth: true,
              data: {
                user_id: oldinfo.userId,
                refresh_token: oldinfo.refresh_token,
                grant_type: 'refresh_token'
              }
            }).then(function (res) {
              console.log('refresh token res : ', res);
              var newinfo = Object.assign(oldinfo, res.data, {
                jwt: res.data.jwt_token
              });
              (0, _store.setCacheSync)('userSession', newinfo);
              (0, _httpClient.refresh)(res.data.jwt_token);
            }).catch(function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(err) {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        stopJwtRefresh();
                        _context.next = 3;
                        return _auth2.default.clearAuth();

                      case 3:
                        console.log('refresh_token', err);
                        _index2.default.reLaunch({
                          url: _navigation.NAV_PAGES.LOGIN
                        });
                        _index2.default.showToast({ title: '当前token已失效,请重新登录', icon: 'none' });
                        // await authModel.clearAuth();
                        // Taro.reLaunch({
                        //     url: NAV_PAGES.LOGIN
                        // });
                        _index2.default.showToast({ title: '当前token已失效,请重新登录', icon: 'none' });

                      case 7:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, _this);
              }));

              return function (_x) {
                return _ref2.apply(this, arguments);
              };
            }());
            // const jwtinfo = IAM.getInfo();
            // axios.post('/api/v1/registry/token', {
            //     user_id: jwtinfo.user_id,
            //     refresh_token: jwtinfo.refresh_token,
            //     grant_type: 'refresh_token'
            // })
            // .then(res => {
            //     console.log('refresh_token', res);
            //     const newjwtinfo = Object.assign(jwtinfo, res.data, {jwt: res.headers.authorization});
            //     IAM.setInfo(newjwtinfo);
            //     Vue.prototype.$fcNetdisk.init(
            //         '', 
            //         newjwtinfo.userId,
            //         newjwtinfo.jwt,
            //         newjwtinfo.access_token,
            //     );
            // })
            // .catch(err => {
            //     console.log('refresh_token', err);
            //     emitter.emit('TOKEN_INVALID');
            // })

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function refreshjwt() {
    return _ref.apply(this, arguments);
  };
}();

var startJwtRefresh = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            // refreshjwt();
            // console.log('startJwtRefresh');
            // body.addEventListener("click",monitorUserOperate);
            // body.addEventListener("keydown",monitorUserOperate);
            // body.addEventListener("mousemove",monitorUserOperate);
            // body.addEventListener("mousewheel",monitorUserOperate);
            // userMonitor = setTimeout(() => {
            //     console.log('长时间未操作');
            //     emitter.emit('TOKEN_INVALID');
            // }, overDueTime*1000);
            console.log('startJwtRefresh overDueTime  ', overDueTime);
            jwtRefresher = setInterval(refreshjwt, overDueTime);
            // jwtRefresher = setTimeout(refreshjwt, overDueTime)

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function startJwtRefresh() {
    return _ref3.apply(this, arguments);
  };
}();

var _store = require("./store.js");

var _httpClient = require("./http-client.js");

var _index = require("../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _navigation = require("../constants/navigation.js");

var _auth = require("../model/auth.js");

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
// import emitter from '@/utils/event-emitter';
// import IAM from '@/model/iam';
// import axios from 'axios';
// import Vue from 'vue'
// import store from './store'
// const testHostnameList = ['localhost','finchat-dev.finogeeks.club'];
// const showSingUpHostname = ['localhost','finchat-dev.finogeeks.club', 'chat.finogeeks.com'];
// const hostname = window.location.hostname;
// const isDev = testHostnameList.indexOf(hostname) > -1;
// const overDueTime = (IAM.getInfo() && IAM.getInfo().expires_in) || (testHostnameList.indexOf(hostname) > -1 ? 120 : 7200);
// const body = document.querySelector('html');
// let userMonitor;


var overDueTime = ((0, _store.getCacheSync)('userSession').expires_in || 150) * 0.7 * 1000;
console.log('jwtRefresh ~~~ ', overDueTime);
var jwtRefresher = void 0;
function stopJwtRefresh() {
  console.log('stopJwtRefresh');
  // store.commit('setShowLoadingMask', false);
  // body.removeEventListener("click",monitorUserOperate);
  // body.removeEventListener("keydown",monitorUserOperate);
  // body.removeEventListener("mousemove",monitorUserOperate);
  // body.removeEventListener("mousewheel",monitorUserOperate);
  // clearTimeout(userMonitor)
  clearInterval(jwtRefresher);
}
exports.startJwtRefresh = startJwtRefresh;
exports.stopJwtRefresh = stopJwtRefresh;