"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getChannelDetail = exports.getMyInfo = exports.quitRoom = exports.cancleArchiveRoom = exports.archiveRoom = exports.getPosterLogo = exports.getAdvisorInfo = exports.reserveProduct = exports.getProductDetail = exports.getProductList = exports.getSquareFavoriteAdviser = exports.getPosition = exports.unLikeTweet = exports.likeTweet = exports.cancelAttention = exports.addAttention = exports.getSquareFavoriteTimeline = exports.getSquareHotTimeline = exports.getSquareHotAdviser = exports.reportWxPhome = exports.reportPresence = exports.reportFormId = exports.logout = exports.inviteAndJoin = exports.joinRoom = exports.getSceneData = exports.countBinding = exports.shareActivityDaily = exports.getActivityDaily = exports.getGeoInfo = exports.sendSmsCode = exports.getSwanInfo = exports.updateSwan = exports.bindAccount = exports.getAccount = exports.wechatAuth = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var request = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data) {
    var auth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var basic, channelId, domain, userMeta, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (auth) {
              data.header = data.header || {};
              basic = getHttpParams();
              channelId = _index2.default.getStorageSync('__channelId__') || '';

              if (!localBase64Meta && basic.userId) {
                domain = basic.userId.substring(basic.userId.indexOf(':') + 1);
                userMeta = {
                  appType: 'RETAIL',
                  terminal: 'wxapplet',
                  plaform: 'ios',
                  domain: domain
                };

                localBase64Meta = _base.Base64.encode(JSON.stringify(userMeta));
              }

              data.header = _extends({}, data.header, {
                // 'Authorization': `Bearer ${basic.jwt}`,
                'X-Consumer-Custom-ID': basic.userId,
                'X-Consumer-User-Meta': localBase64Meta,
                'X-Consumer-User-Channel': channelId
              });
            }
            _context.next = 3;
            return (0, _fetch.fetch)(data);

          case 3:
            response = _context.sent;
            return _context.abrupt("return", response.data);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function request(_x2) {
    return _ref.apply(this, arguments);
  };
}();

var _index = require("../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _base = require("../npm/js-base64/base64.js");

var _store = require("./store.js");

var _fetch = require("./fetch.js");

var _im = require("../model/im.js");

var _im2 = _interopRequireDefault(_im);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var localBase64Meta = null;

var getHttpParams = function getHttpParams() {
  var _getCacheSync = (0, _store.getCacheSync)('userSession'),
      jwt = _getCacheSync.jwt,
      accessToken = _getCacheSync.accessToken,
      userId = _getCacheSync.userId;

  return { jwt: jwt, accessToken: accessToken, userId: userId };
};

var wechatAuth = exports.wechatAuth = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(code, diviceId, iv, encryptedData, userName, userPassWord) {
    var response;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _fetch.fetch)({
              url: '/api/v1/registry/login',
              method: 'POST',
              header: {
                'content-type': 'application/json'
              },
              data: {
                userId: userName,
                password: userPassWord,
                app_type: 'STAFF',
                login_type: 'pwd'
              }
            });

          case 2:
            response = _context2.sent;
            return _context2.abrupt("return", _extends({}, response.data, { jwt: response.header.Authorization }));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function wechatAuth(_x3, _x4, _x5, _x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}();

var getAccount = exports.getAccount = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(fcid) {
    var basic, response;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            basic = getHttpParams();
            _context3.next = 3;
            return request({
              url: "/api/v1/uac/" + fcid + "/accounts?access_token=" + basic.accessToken + "&jwt=" + basic.jwt,
              method: 'GET',
              header: {
                'content-type': 'application/json'
              }
            });

          case 3:
            response = _context3.sent;
            return _context3.abrupt("return", response.accounts);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function getAccount(_x9) {
    return _ref3.apply(this, arguments);
  };
}();

var bindAccount = exports.bindAccount = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_ref4) {
    var prev = _ref4.prev,
        accountId = _ref4.accountId,
        accountData = _ref4.accountData;
    var basic, response;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            basic = getHttpParams();
            _context4.next = 3;
            return request({
              url: "/api/v1/uac/bind?access_token=" + basic.accessToken + "&jwt=" + basic.jwt,
              method: 'PUT',
              header: {
                'content-type': 'application/json'
              },
              data: {
                prev: prev,
                accountId: accountId,
                accountType: 'icbc',
                accountData: accountData
              }
            });

          case 3:
            response = _context4.sent;
            return _context4.abrupt("return", response);

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function bindAccount(_x10) {
    return _ref5.apply(this, arguments);
  };
}();

var updateSwan = exports.updateSwan = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_ref6) {
    var retailId = _ref6.retailId,
        name = _ref6.name,
        avatar = _ref6.avatar;
    var basic, response;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            basic = getHttpParams();
            _context5.next = 3;
            return request({
              url: "/api/v1/swan/retail/" + retailId + "?access_token=" + basic.accessToken + "&jwt=" + basic.jwt,
              method: 'PUT',
              header: {
                'content-type': 'application/json'
              },
              data: {
                retailId: retailId,
                name: name,
                avatar: avatar
              }
            });

          case 3:
            response = _context5.sent;
            return _context5.abrupt("return", response);

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function updateSwan(_x11) {
    return _ref7.apply(this, arguments);
  };
}();

var getSwanInfo = exports.getSwanInfo = function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_ref8) {
    var fcid = _ref8.fcid;
    var basic, response;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            basic = getHttpParams();
            _context6.next = 3;
            return request({
              url: "/api/v1/swan/retail/" + fcid + "?access_token=" + basic.accessToken + "&jwt=" + basic.jwt,
              method: 'GET',
              header: {
                'content-type': 'application/json'
              }
            });

          case 3:
            response = _context6.sent;
            return _context6.abrupt("return", response);

          case 5:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function getSwanInfo(_x12) {
    return _ref9.apply(this, arguments);
  };
}();

var sendSmsCode = exports.sendSmsCode = function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(phone) {
    var basic, response;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            basic = getHttpParams();
            _context7.next = 3;
            return request({
              url: "/api/v1/platform/sms?access_token=" + basic.accessToken + "&jwt=" + basic.jwt,
              method: 'POST',
              header: {
                'content-type': 'application/json'
              },
              data: {
                phone: phone
              }
            });

          case 3:
            response = _context7.sent;
            return _context7.abrupt("return", response);

          case 5:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  }));

  return function sendSmsCode(_x13) {
    return _ref10.apply(this, arguments);
  };
}();

var getGeoInfo = exports.getGeoInfo = function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(lat, lng) {
    var response;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return request({
              url: "https://apis.map.qq.com/ws/geocoder/v1/?location=" + lat + "," + lng + "&key=KHNBZ-JSAWP-DPSD4-LUCLI-HUQRK-L7BO2",
              method: 'GET',
              header: {
                'content-type': 'application/json'
              }
            });

          case 2:
            response = _context8.sent;
            return _context8.abrupt("return", response);

          case 4:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  }));

  return function getGeoInfo(_x14, _x15) {
    return _ref11.apply(this, arguments);
  };
}();

var getActivityDaily = exports.getActivityDaily = function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            return _context9.abrupt("return", request({
              url: "/api/v1/lottery/activityDaily?from=WECHAT"
            }));

          case 1:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, undefined);
  }));

  return function getActivityDaily() {
    return _ref12.apply(this, arguments);
  };
}();

var shareActivityDaily = exports.shareActivityDaily = function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            return _context10.abrupt("return", request({
              url: "/api/v1/lottery/activityDaily/share?from=WECHAT",
              method: 'POST'
            }));

          case 1:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, undefined);
  }));

  return function shareActivityDaily() {
    return _ref13.apply(this, arguments);
  };
}();

var countBinding = exports.countBinding = function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            return _context11.abrupt("return", request({
              url: '/api/v1/lottery/activityDaily/wechatBind?from=WECHAT',
              method: 'POST'
            }));

          case 1:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, undefined);
  }));

  return function countBinding() {
    return _ref14.apply(this, arguments);
  };
}();

var getSceneData = exports.getSceneData = function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(sceneId) {
    var basic, response;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            basic = getHttpParams();
            _context12.next = 3;
            return request({
              url: "/api/v1/wechat-service/wxa/share/" + sceneId + "?access_token=" + basic.accessToken + "&jwt=" + basic.jwt,
              method: 'GET',
              header: {
                'content-type': 'application/json'
              }
            });

          case 3:
            response = _context12.sent;
            return _context12.abrupt("return", response);

          case 5:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, undefined);
  }));

  return function getSceneData(_x16) {
    return _ref15.apply(this, arguments);
  };
}();

var joinRoom = exports.joinRoom = function () {
  var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(roomId, user_id, qrcode) {
    var basic;
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            basic = getHttpParams();
            return _context13.abrupt("return", request({
              url: "/api/v1/channel/rooms/" + roomId + "/privateJoin?access_token=" + basic.accessToken + "&jwt=" + basic.jwt,
              method: 'POST',
              data: {
                user_id: basic.userId
                // qrcode: true,
              },
              // needToken: true,
              header: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + basic.jwt
              }
            }));

          case 2:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, undefined);
  }));

  return function joinRoom(_x17, _x18, _x19) {
    return _ref16.apply(this, arguments);
  };
}();

var inviteAndJoin = exports.inviteAndJoin = function () {
  var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(roomId, user_id, qrcode) {
    var basic;
    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            basic = getHttpParams();
            return _context14.abrupt("return", request({
              url: "/api/v1/channel/rooms/" + roomId + "/inviteAndJoin?access_token=" + basic.accessToken + "&jwt=" + basic.jwt,
              method: 'POST',
              data: {
                user_id: user_id,
                qrcode: true
              },
              header: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + basic.jwt
              }
            }));

          case 2:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, undefined);
  }));

  return function inviteAndJoin(_x20, _x21, _x22) {
    return _ref17.apply(this, arguments);
  };
}();

var logout = exports.logout = function () {
  var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
    var basic;
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            basic = getHttpParams();
            _context15.next = 3;
            return request({
              method: 'POST',
              url: "/api/v1/registry/homeserver/logout?access_token=" + basic.accessToken + "&jwt=" + basic.jwt,
              data: {
                access_token: basic.accessToken
              },
              header: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + basic.jwt
              }
            });

          case 3:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15, undefined);
  }));

  return function logout() {
    return _ref18.apply(this, arguments);
  };
}();

var reportFormId = exports.reportFormId = function () {
  var _ref19 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(roomId, msgType, formId, openId) {
    var basic;
    return regeneratorRuntime.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            basic = getHttpParams();
            return _context16.abrupt("return", request({
              url: "/api/v1/swan/observe/orders/wechatForm?access_token=" + basic.accessToken + "&jwt=" + basic.jwt,
              method: 'POST',
              data: {
                fcid: basic.userId,
                msgType: msgType,
                roomId: roomId,
                formId: formId,
                openId: openId,
                appletType: 'SWAN_IM'
              }
            }));

          case 2:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16, undefined);
  }));

  return function reportFormId(_x23, _x24, _x25, _x26) {
    return _ref19.apply(this, arguments);
  };
}();

var reportPresence = exports.reportPresence = function () {
  var _ref20 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(fcid, isOnline, accessToken, jwt) {
    var basic;
    return regeneratorRuntime.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            basic = getHttpParams();
            return _context17.abrupt("return", request({
              url: "/api/v1/swan/observe/presence/" + fcid + "/status?access_token=" + (accessToken || basic.accessToken) + "&jwt=" + (jwt || basic.jwt),
              method: 'PUT',
              data: {
                presence: isOnline ? 'online' : 'offline'
              }
            }));

          case 2:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17, undefined);
  }));

  return function reportPresence(_x27, _x28, _x29, _x30) {
    return _ref20.apply(this, arguments);
  };
}();

// 上报用户手机号加密数据
var reportWxPhome = exports.reportWxPhome = function () {
  var _ref22 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(_ref21) {
    var appId = _ref21.appId,
        code = _ref21.code,
        encryptedData = _ref21.encryptedData,
        iv = _ref21.iv;
    var basic;
    return regeneratorRuntime.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            basic = getHttpParams();
            return _context18.abrupt("return", request({
              url: "/api/v1/swan/retail/wxPhone?access_token=" + basic.accessToken + "&jwt=" + basic.jwt,
              method: 'POST',
              data: {
                retailId: basic.userId,
                appId: appId,
                code: code,
                encryptedData: encryptedData,
                iv: iv
              }
            }));

          case 2:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18, undefined);
  }));

  return function reportWxPhome(_x31) {
    return _ref22.apply(this, arguments);
  };
}();

/**
 * 获取热门投顾
 */
var getSquareHotAdviser = exports.getSquareHotAdviser = function () {
  var _ref23 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19() {
    var basic, response;
    return regeneratorRuntime.wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            basic = getHttpParams();
            _context19.next = 3;
            return request({
              url: "/api/v1/adviserZone/square/adviser/hotspot?access_token=" + basic.accessToken + "&jwt=" + basic.jwt,
              method: 'GET',
              header: {
                'content-type': 'application/json'
              }
            });

          case 3:
            response = _context19.sent;
            return _context19.abrupt("return", response);

          case 5:
          case "end":
            return _context19.stop();
        }
      }
    }, _callee19, undefined);
  }));

  return function getSquareHotAdviser() {
    return _ref23.apply(this, arguments);
  };
}();

/**
 * 广场热门观点列表
 */
var getSquareHotTimeline = exports.getSquareHotTimeline = function () {
  var _ref25 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20(_ref24) {
    var page = _ref24.page,
        size = _ref24.size;
    var basic, response;
    return regeneratorRuntime.wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            basic = getHttpParams();
            _context20.next = 3;
            return request({
              url: "/api/v1/adviserZone/square/timeline?access_token=" + basic.accessToken + "&jwt=" + basic.jwt,
              method: 'GET',
              header: {
                'content-type': 'application/json'
              },
              data: { page: page, size: size }
            });

          case 3:
            response = _context20.sent;
            return _context20.abrupt("return", response);

          case 5:
          case "end":
            return _context20.stop();
        }
      }
    }, _callee20, undefined);
  }));

  return function getSquareHotTimeline(_x32) {
    return _ref25.apply(this, arguments);
  };
}();

/**
 * 广场关注观点列表
 */
var getSquareFavoriteTimeline = exports.getSquareFavoriteTimeline = function () {
  var _ref27 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21(_ref26) {
    var page = _ref26.page,
        size = _ref26.size;
    var basic, response;
    return regeneratorRuntime.wrap(function _callee21$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            basic = getHttpParams();
            _context21.next = 3;
            return request({
              url: "/api/v1/adviserZone/square/timeline/favorite?access_token=" + basic.accessToken + "&jwt=" + basic.jwt,
              method: 'GET',
              header: {
                'content-type': 'application/json'
              },
              data: { page: page, size: size }
            });

          case 3:
            response = _context21.sent;
            return _context21.abrupt("return", response);

          case 5:
          case "end":
            return _context21.stop();
        }
      }
    }, _callee21, undefined);
  }));

  return function getSquareFavoriteTimeline(_x33) {
    return _ref27.apply(this, arguments);
  };
}();

/**
 * 网盘预览文件
 * @param fcid
 * @returns {string}
 */
// export const netdiskThumb = (netdiskId, type = 'middle') => {
//   const baseURL = service.config.BASE_URL;
//   const basic = getHttpParams();
//   return `${baseURL}/api/v1/netdisk/thumbnail/${netdiskId}?jwt=${basic.jwt}&type=${type}`;
// };

/**
 * 网盘原文件
 * @param fcid
 * @returns {string}
 */
// export const netdiskDownload = netdiskId => {
//   const baseURL = service.config.BASE_URL;
//   const basic = getHttpParams();
//   return `${baseURL}/api/v1/netdisk/download/${netdiskId}?jwt=${basic.jwt}`;
// };

/**
 * 网盘视频流文件
 * @param fcid
 * @returns {string}
 */
// export const netdiskVideo = netdiskId => {
//   const baseURL = service.config.BASE_URL;
//   const basic = getHttpParams();
//   return `${baseURL}/api/v1/netdisk/download/${netdiskId}/qt?jwt=${basic.jwt}`;
// };

/**
 * 关注投顾
 * @param {*} adviserId
 */
var addAttention = exports.addAttention = function () {
  var _ref28 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee22(adviserId) {
    var basic, response;
    return regeneratorRuntime.wrap(function _callee22$(_context22) {
      while (1) {
        switch (_context22.prev = _context22.next) {
          case 0:
            basic = getHttpParams();
            _context22.next = 3;
            return request({
              url: "/api/v1/adviserZone/a/" + adviserId + "/favorite?access_token=" + basic.accessToken + "&jwt=" + basic.jwt,
              method: 'POST',
              header: {
                'content-type': 'application/json'
              }
            });

          case 3:
            response = _context22.sent;
            return _context22.abrupt("return", response);

          case 5:
          case "end":
            return _context22.stop();
        }
      }
    }, _callee22, undefined);
  }));

  return function addAttention(_x34) {
    return _ref28.apply(this, arguments);
  };
}();

/**
 * 取消关注
 * @param {*} adviserId
 */

var cancelAttention = exports.cancelAttention = function () {
  var _ref29 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee23(adviserId) {
    var basic, response;
    return regeneratorRuntime.wrap(function _callee23$(_context23) {
      while (1) {
        switch (_context23.prev = _context23.next) {
          case 0:
            basic = getHttpParams();
            _context23.next = 3;
            return request({
              url: "/api/v1/adviserZone/a/" + adviserId + "/favorite?access_token=" + basic.accessToken + "&jwt=" + basic.jwt,
              method: 'DELETE',
              header: {
                'content-type': 'application/json'
              }
            });

          case 3:
            response = _context23.sent;
            return _context23.abrupt("return", response);

          case 5:
          case "end":
            return _context23.stop();
        }
      }
    }, _callee23, undefined);
  }));

  return function cancelAttention(_x35) {
    return _ref29.apply(this, arguments);
  };
}();

/**
 * 点赞观点
 * @param timelineId
 * @returns {AxiosPromise}
 */

var likeTweet = exports.likeTweet = function () {
  var _ref30 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee24(timelineId) {
    var basic, response;
    return regeneratorRuntime.wrap(function _callee24$(_context24) {
      while (1) {
        switch (_context24.prev = _context24.next) {
          case 0:
            basic = getHttpParams();

            console.log('basic', basic);
            _context24.next = 4;
            return request({
              url: "/api/v1/adviserZone/timeline/" + timelineId + "/like?access_token=" + basic.accessToken + "&jwt=" + basic.jwt,
              method: 'PUT',
              header: {
                'content-type': 'application/json'
              }
            });

          case 4:
            response = _context24.sent;
            return _context24.abrupt("return", response);

          case 6:
          case "end":
            return _context24.stop();
        }
      }
    }, _callee24, undefined);
  }));

  return function likeTweet(_x36) {
    return _ref30.apply(this, arguments);
  };
}();

/**
 * 取消点赞
 * @param timelineId
 * @returns {AxiosPromise}
 */

var unLikeTweet = exports.unLikeTweet = function () {
  var _ref31 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee25(timelineId) {
    var basic, response;
    return regeneratorRuntime.wrap(function _callee25$(_context25) {
      while (1) {
        switch (_context25.prev = _context25.next) {
          case 0:
            basic = getHttpParams();
            _context25.next = 3;
            return request({
              url: "/api/v1/adviserZone/timeline/" + timelineId + "/unlike?access_token=" + basic.accessToken + "&jwt=" + basic.jwt,
              method: 'PUT',
              header: {
                'content-type': 'application/json'
              }
            });

          case 3:
            response = _context25.sent;
            return _context25.abrupt("return", response);

          case 5:
          case "end":
            return _context25.stop();
        }
      }
    }, _callee25, undefined);
  }));

  return function unLikeTweet(_x37) {
    return _ref31.apply(this, arguments);
  };
}();

/**
 * 获取位置信息
 * @param longitude
 * @param latitude
 * @returns {AxiosPromise}
 */

var getPosition = exports.getPosition = function () {
  var _ref32 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee26(longitude, latitude) {
    var basic, response;
    return regeneratorRuntime.wrap(function _callee26$(_context26) {
      while (1) {
        switch (_context26.prev = _context26.next) {
          case 0:
            basic = getHttpParams();
            _context26.next = 3;
            return request({
              url: "/api/v1/swan/gearing/geocode/city?location=" + longitude + "," + latitude + "&access_token=" + basic.accessToken + "&jwt=" + basic.jwt,
              method: 'GET'
            });

          case 3:
            response = _context26.sent;
            return _context26.abrupt("return", response);

          case 5:
          case "end":
            return _context26.stop();
        }
      }
    }, _callee26, undefined);
  }));

  return function getPosition(_x38, _x39) {
    return _ref32.apply(this, arguments);
  };
}();

/**
 * 获取已关注员工列表
 * @param payload
 * @returns {AxiosPromise}
 */
var getSquareFavoriteAdviser = exports.getSquareFavoriteAdviser = function () {
  var _ref33 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee27() {
    var basic, response;
    return regeneratorRuntime.wrap(function _callee27$(_context27) {
      while (1) {
        switch (_context27.prev = _context27.next) {
          case 0:
            basic = getHttpParams();
            _context27.next = 3;
            return request({
              url: "/api/v1/adviserZone/a/adviser/favorite/list?jwt=" + basic.jwt,
              method: 'get'
            });

          case 3:
            response = _context27.sent;
            return _context27.abrupt("return", response);

          case 5:
          case "end":
            return _context27.stop();
        }
      }
    }, _callee27, undefined);
  }));

  return function getSquareFavoriteAdviser() {
    return _ref33.apply(this, arguments);
  };
}();

/**
 * 获取产品列表信息
 * @param page
 * @param size
 * @param type
 * @returns {AxiosPromise}
 */

var getProductList = exports.getProductList = function () {
  var _ref34 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee28(type, page, size) {
    var basic, response;
    return regeneratorRuntime.wrap(function _callee28$(_context28) {
      while (1) {
        switch (_context28.prev = _context28.next) {
          case 0:
            basic = getHttpParams();
            _context28.next = 3;
            return request({
              url: "/api/v1/adviserZone/product/list/manage?status=1&page=" + page + "&size=" + size + "&type=" + type + "&access_token=" + basic.accessToken + "&jwt=" + basic.jwt,
              method: 'GET'
            });

          case 3:
            response = _context28.sent;
            return _context28.abrupt("return", response);

          case 5:
          case "end":
            return _context28.stop();
        }
      }
    }, _callee28, undefined);
  }));

  return function getProductList(_x40, _x41, _x42) {
    return _ref34.apply(this, arguments);
  };
}();

/**
 * 获取产品详情
 * @param productId
 * @returns {AxiosPromise}
 */

var getProductDetail = exports.getProductDetail = function () {
  var _ref35 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee29(productId) {
    var basic, response;
    return regeneratorRuntime.wrap(function _callee29$(_context29) {
      while (1) {
        switch (_context29.prev = _context29.next) {
          case 0:
            basic = getHttpParams();
            _context29.next = 3;
            return request({
              url: "/api/v1/adviserZone/product/" + productId + "?&access_token=" + basic.accessToken + "&jwt=" + basic.jwt,
              method: 'GET'
            });

          case 3:
            response = _context29.sent;
            return _context29.abrupt("return", response);

          case 5:
          case "end":
            return _context29.stop();
        }
      }
    }, _callee29, undefined);
  }));

  return function getProductDetail(_x43) {
    return _ref35.apply(this, arguments);
  };
}();

/**
 * 预约产品
 * @param productId
 * @returns {AxiosPromise}
 */

var reserveProduct = exports.reserveProduct = function () {
  var _ref37 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee30(_ref36) {
    var productId = _ref36.productId,
        staffId = _ref36.staffId,
        name = _ref36.name,
        mobile = _ref36.mobile,
        city = _ref36.city,
        company = _ref36.company,
        annualIncome = _ref36.annualIncome;
    var basic, response;
    return regeneratorRuntime.wrap(function _callee30$(_context30) {
      while (1) {
        switch (_context30.prev = _context30.next) {
          case 0:
            basic = getHttpParams();
            _context30.next = 3;
            return request({
              url: "/api/v1/adviserZone/sales/booking?&access_token=" + basic.accessToken + "&jwt=" + basic.jwt,
              method: 'POST',
              data: {
                productId: productId,
                staffId: staffId,
                name: name,
                mobile: mobile,
                city: city,
                company: company,
                annualIncome: annualIncome
              }
            });

          case 3:
            response = _context30.sent;
            return _context30.abrupt("return", response);

          case 5:
          case "end":
            return _context30.stop();
        }
      }
    }, _callee30, undefined);
  }));

  return function reserveProduct(_x44) {
    return _ref37.apply(this, arguments);
  };
}();

/**
 * 获取投顾信息
 * @param staffId
 * @returns {AxiosPromise}
 */

var getAdvisorInfo = exports.getAdvisorInfo = function () {
  var _ref38 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee31(staffId) {
    var basic, response;
    return regeneratorRuntime.wrap(function _callee31$(_context31) {
      while (1) {
        switch (_context31.prev = _context31.next) {
          case 0:
            basic = getHttpParams();
            _context31.next = 3;
            return request({
              url: "/api/v1/swan/manager/staff/" + staffId + "?&access_token=" + basic.accessToken + "&jwt=" + basic.jwt,
              method: 'GET'
            });

          case 3:
            response = _context31.sent;
            return _context31.abrupt("return", response);

          case 5:
          case "end":
            return _context31.stop();
        }
      }
    }, _callee31, undefined);
  }));

  return function getAdvisorInfo(_x45) {
    return _ref38.apply(this, arguments);
  };
}();

/**
 * 获取产品海报logo
 * @param staffId
 * @returns {AxiosPromise}
 */

var getPosterLogo = exports.getPosterLogo = function () {
  var _ref39 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee32() {
    var basic, response;
    return regeneratorRuntime.wrap(function _callee32$(_context32) {
      while (1) {
        switch (_context32.prev = _context32.next) {
          case 0:
            basic = getHttpParams();
            _context32.next = 3;
            return request({
              url: "/api/v1/adviserZone/poster/logo?&access_token=" + basic.accessToken + "&jwt=" + basic.jwt,
              method: 'GET'
            });

          case 3:
            response = _context32.sent;
            return _context32.abrupt("return", response);

          case 5:
          case "end":
            return _context32.stop();
        }
      }
    }, _callee32, undefined);
  }));

  return function getPosterLogo() {
    return _ref39.apply(this, arguments);
  };
}();

/**
 * 频道归档
 * @param roomId
 * @returns {AxiosPromise}
 */

var archiveRoom = exports.archiveRoom = function () {
  var _ref40 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee33(roomId) {
    var basic, response;
    return regeneratorRuntime.wrap(function _callee33$(_context33) {
      while (1) {
        switch (_context33.prev = _context33.next) {
          case 0:
            basic = getHttpParams();
            _context33.next = 3;
            return request({
              url: "/api/v1/channel/rooms/" + roomId + "/archive?&access_token=" + basic.accessToken + "&jwt=" + basic.jwt,
              method: 'POST'
            });

          case 3:
            response = _context33.sent;

            _index2.default.navigateBack({ delta: 2 });
            return _context33.abrupt("return", response);

          case 6:
          case "end":
            return _context33.stop();
        }
      }
    }, _callee33, undefined);
  }));

  return function archiveRoom(_x46) {
    return _ref40.apply(this, arguments);
  };
}();

/**
 * 解除一个频道归档
 * @param roomId
 * @returns {AxiosPromise}
 */

var cancleArchiveRoom = exports.cancleArchiveRoom = function () {
  var _ref41 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee34(roomId) {
    var basic, response;
    return regeneratorRuntime.wrap(function _callee34$(_context34) {
      while (1) {
        switch (_context34.prev = _context34.next) {
          case 0:
            basic = getHttpParams();
            _context34.next = 3;
            return request({
              url: "/api/v1/channel/rooms/" + roomId + "/archive?&access_token=" + basic.accessToken + "&jwt=" + basic.jwt,
              method: 'DELETE'
            });

          case 3:
            response = _context34.sent;

            _index2.default.navigateBack({ delta: 1 });
            return _context34.abrupt("return", response);

          case 6:
          case "end":
            return _context34.stop();
        }
      }
    }, _callee34, undefined);
  }));

  return function cancleArchiveRoom(_x47) {
    return _ref41.apply(this, arguments);
  };
}();

/**
 * 退出房间
 * @param roomId
 * @returns {AxiosPromise}
 */

var quitRoom = exports.quitRoom = function () {
  var _ref42 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee35(roomId) {
    var client, res;
    return regeneratorRuntime.wrap(function _callee35$(_context35) {
      while (1) {
        switch (_context35.prev = _context35.next) {
          case 0:
            client = _im2.default.matrix;

            console.log(client);
            _context35.next = 4;
            return client.mxClient.leave(roomId);

          case 4:
            res = _context35.sent;

            _index2.default.navigateBack({ delta: 2 });
            setTimeout(function () {
              _index2.default.showToast({
                title: "\u60A8\u5DF2\u9000\u51FA\u623F\u95F4",
                icon: 'none'
              });
            }, 0);
            return _context35.abrupt("return", res);

          case 8:
          case "end":
            return _context35.stop();
        }
      }
    }, _callee35, undefined);
  }));

  return function quitRoom(_x48) {
    return _ref42.apply(this, arguments);
  };
}();

/**
 * 获取当前用户信息
 * @param fcid  netdiskID
 * @returns {AxiosPromise}
 */

var getMyInfo = exports.getMyInfo = function () {
  var _ref43 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee36(fcid) {
    var basic, response;
    return regeneratorRuntime.wrap(function _callee36$(_context36) {
      while (1) {
        switch (_context36.prev = _context36.next) {
          case 0:
            basic = getHttpParams();
            _context36.next = 3;
            return request({
              url: "/api/v1/fsc/users/" + fcid + "/profiles?myid=" + fcid,
              method: 'POST'
            });

          case 3:
            response = _context36.sent;
            return _context36.abrupt("return", response);

          case 5:
          case "end":
            return _context36.stop();
        }
      }
    }, _callee36, undefined);
  }));

  return function getMyInfo(_x49) {
    return _ref43.apply(this, arguments);
  };
}();

var getChannelDetail = exports.getChannelDetail = function getChannelDetail(roomId) {
  var basic = getHttpParams();
  return request({
    method: 'GET',
    // url: `/api/v1/channel/channels/${roomId}?jwt=${basic.jwt}&access_token=${basic.accessToken}`,
    url: "/api/v1/channel/channels/" + roomId + "?jwt=" + basic.jwt + "&access_token=" + basic.accessToken
  });
};

exports.default = {
  wechatAuth: wechatAuth,
  bindAccount: bindAccount,
  sendSmsCode: sendSmsCode,
  updateSwan: updateSwan,
  getSwanInfo: getSwanInfo,
  getGeoInfo: getGeoInfo,
  getActivityDaily: getActivityDaily,
  countBinding: countBinding,
  getSceneData: getSceneData,
  joinRoom: joinRoom,
  inviteAndJoin: inviteAndJoin,
  reportFormId: reportFormId,
  reportPresence: reportPresence,
  getSquareHotTimeline: getSquareHotTimeline,
  getSquareFavoriteTimeline: getSquareFavoriteTimeline,
  getSquareHotAdviser: getSquareHotAdviser,
  getSquareFavoriteAdviser: getSquareFavoriteAdviser,
  //   netdiskThumb,
  //   netdiskVideo,
  //   netdiskDownload,
  addAttention: addAttention,
  cancelAttention: cancelAttention,
  likeTweet: likeTweet,
  unLikeTweet: unLikeTweet,
  getMyInfo: getMyInfo,
  logout: logout,
  getChannelDetail: getChannelDetail
};