"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require("../matrix/index.js");

var _index2 = _interopRequireDefault(_index);

var _room = require("../matrix/interface/room.js");

var _dispatch = require("../matrix/interface/dispatch.js");

var _index3 = require("../npm/@tarojs/taro-weapp/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../router/index.js");

var _index6 = _interopRequireDefault(_index5);

var _navigation = require("../constants/navigation.js");

var _store = require("../utils/store.js");

var _httpClient = require("../utils/http-client.js");

var _interface = require("./interface.js");

var _index7 = require("../service/index.js");

var _index8 = _interopRequireDefault(_index7);

var _dispatch2 = require("../constants/dispatch.js");

var _room2 = require("../store/actions/room.js");

var _message = require("../matrix/interface/message.js");

var _index9 = require("../store/index.js");

var _index10 = _interopRequireDefault(_index9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var IM = function () {
  function IM() {
    var _this = this;

    _classCallCheck(this, IM);

    this.start = function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(userId) {
        var isReady;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _this.matrix.start();

              case 3:
                isReady = _context.sent;

                if (isReady) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return", false);

              case 6:
                _this.userId = userId;
                _this.isReady = isReady;
                // this.updateUnreadBadge();
                _this.matrix.room.onUpdate(_this.handleRoomUpdate);
                _this.matrix.user.onUpdate(_this.handleUserUpdate);
                _this.matrix.dispatch.onUpdate(_this.handleDispatchUpdate);
                _this.matrix.timeline.onUpdate(_this.handleTimelineUpdate);
                _this.matrix.mxClient.on('toDeviceEvent', _this.handleDeviceEvent);
                _context.next = 18;
                break;

              case 15:
                _context.prev = 15;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", false);

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this, [[0, 15]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();

    this.enterRoom = function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(roomId) {
        var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var params, room, res, readyRoom;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (roomId) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return");

              case 2:
                params = { roomId: roomId };
                room = _this.getRoom(roomId);
                // if (!room && !autoJoin) return false;

                if (!(!room && opts.autoJoin)) {
                  _context2.next = 20;
                  break;
                }

                _context2.prev = 5;
                _context2.next = 8;
                return _index8.default.common.joinRoom(roomId, opts.staffId, true);

              case 8:
                res = _context2.sent;

                if (!(res.status !== 0)) {
                  _context2.next = 12;
                  break;
                }

                _index4.default.showToast({ title: res.message, icon: 'none' });
                return _context2.abrupt("return", false);

              case 12:
                params.firstEnterRoom = true;
                _context2.next = 20;
                break;

              case 15:
                _context2.prev = 15;
                _context2.t0 = _context2["catch"](5);

                console.log('error', _context2.t0);
                _index4.default.showToast({ title: _context2.t0.data.errcode, icon: 'none' });
                return _context2.abrupt("return", false);

              case 20:
                _context2.next = 22;
                return _this.matrix.room.waitRoomReady(roomId, opts.join);

              case 22:
                readyRoom = _context2.sent;

                if (readyRoom) {
                  _context2.next = 26;
                  break;
                }

                _index4.default.showToast({ title: '房间获取超时', icon: 'none' });
                return _context2.abrupt("return");

              case 26:
                ;
                _index10.default.dispatch((0, _room2.addViewingRoom)(room));
                // await this.addViewingRoom(roomId);
                if (opts.reopenOrder) {
                  // url += `&reopenOrder=true`
                  params.reopenOrder = true;
                }
                if (opts.sendMsg) {
                  // url += `&sendMsg=${sendMsg}`
                  // params.sendMsg = sendMsg
                  (0, _store.setCacheSync)('sendMsg', opts.sendMsg);
                }
                if (opts.dispatchQuestionType) {
                  // url += `&dispatchQuestionType=${dispatchQuestionType}`
                  params.dispatchQuestionType = opts.dispatchQuestionType;
                }
                if (opts.staffId) {
                  // url += `&staffId=${staffId}`
                  params.staffId = opts.staffId;
                }
                if (opts.channelId) {
                  // url += `&staffId=${staffId}`
                  params.channelId = opts.channelId;
                }
                // console.log('params', params);
                if (opts.redirect) {
                  _index6.default.redirectTo(_navigation.NAV_PAGES.ROOM, params);
                } else {
                  _index6.default.navigateTo(_navigation.NAV_PAGES.ROOM, params);
                }
                return _context2.abrupt("return", true);

              case 35:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, _this, [[5, 15]]);
      }));

      return function (_x3) {
        return _ref2.apply(this, arguments);
      };
    }();

    this.enterAdvisorRoom = function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(staffId, sendMsg, redirect) {
        var formId = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
        var rooms, targetRoom, targetRoomId, res, readyRoom, userSession;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                // console.log('enter adivor ID');
                // console.log('target staffId: ', staffId)
                rooms = _this.matrix.room.getRooms();
                targetRoom = rooms.find(function (room) {
                  return room.orderInfo.staffId === staffId;
                });
                targetRoomId = null;

                if (!targetRoom) {
                  _context3.next = 7;
                  break;
                }

                targetRoomId = targetRoom.id;
                _context3.next = 13;
                break;

              case 7:
                _context3.next = 9;
                return _index8.default.adviser.getDirectDispatchRoom({
                  staffId: staffId,
                  retailId: _this.userId
                });

              case 9:
                res = _context3.sent;

                if (res) {
                  _context3.next = 12;
                  break;
                }

                return _context3.abrupt("return", false);

              case 12:
                targetRoomId = res.roomId;

              case 13:
                _context3.next = 15;
                return _this.matrix.room.waitRoomReady(targetRoomId);

              case 15:
                readyRoom = _context3.sent;

                if (readyRoom) {
                  _context3.next = 18;
                  break;
                }

                return _context3.abrupt("return", false);

              case 18:
                _this.enterRoom(targetRoomId, {
                  staffId: staffId,
                  sendMsg: sendMsg,
                  redirect: redirect,
                  reopenOrder: true
                });

                if (formId) {
                  _context3.next = 21;
                  break;
                }

                return _context3.abrupt("return", true);

              case 21:
                userSession = (0, _store.getCacheSync)('userSession');

                _index8.default.report.reportFormId(targetRoomId, 'adviser', formId, userSession.openId, userSession.userId).catch(function (error) {
                  console.log('reportFormId error', error);
                });
                return _context3.abrupt("return", true);

              case 24:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, _this);
      }));

      return function (_x5, _x6, _x7) {
        return _ref3.apply(this, arguments);
      };
    }();

    this.enterDisptachRoom = function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(retailId, dispatchQuestionType, sendMsg) {
        var _matrix$dispatch$getS, dispatchState, dispatchRoomId, from, advisorRoomData, targetRoomId;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _matrix$dispatch$getS = _this.matrix.dispatch.getState(), dispatchState = _matrix$dispatch$getS.dispatchState, dispatchRoomId = _matrix$dispatch$getS.dispatchRoomId, from = _matrix$dispatch$getS.from;

                if (!(dispatchState === _dispatch.DispatchState.dispatching)) {
                  _context4.next = 3;
                  break;
                }

                return _context4.abrupt("return", _this.enterRoom(dispatchRoomId));

              case 3:
                _context4.next = 5;
                return _index8.default.adviser.getAdvisorRoomInfo({
                  pattern: 'B',
                  retailId: retailId
                });

              case 5:
                _context4.t0 = _context4.sent;

                if (_context4.t0) {
                  _context4.next = 8;
                  break;
                }

                _context4.t0 = {};

              case 8:
                advisorRoomData = _context4.t0;
                targetRoomId = advisorRoomData.roomId;
                // console.log('get dispatch advisor room: ', targetRoomId);

                _this.enterRoom(targetRoomId, { dispatchQuestionType: dispatchQuestionType, sendMsg: sendMsg });

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, _this);
      }));

      return function (_x8, _x9, _x10) {
        return _ref4.apply(this, arguments);
      };
    }();

    this.getRoomGroupAvatar = function (roomId) {
      return _this.matrix.room.getRoomGroupAvatar(roomId);
    };

    this.hideRoom = function (roomId) {
      return _this.matrix.room.hideRoom(roomId);
    };

    this.getSmartBotRoomId = function () {
      var rooms = _this.matrix.room.getRooms();
      var aiRoom = rooms.find(function (room) {
        return room.roomType === _room.RoomType.smartBot;
      });
      return aiRoom ? aiRoom.id : '';
    };

    this.addViewingRoom = function (roomId) {
      return _this.matrix.timeline.addViewingRoom(roomId);
    };

    this.removeViewingRoom = function (roomId) {
      return _this.matrix.timeline.removeViewingRoom(roomId);
    };

    this.getDispatchData = function () {
      return _this.matrix.dispatch.getState();
    };

    this.closeDispatch = function () {
      return _this.matrix.dispatch.close();
    };

    this.selectDispachQuestionType = function (type) {
      return _this.matrix.dispatch.selectQuestionType(type);
    };

    this.getUser = function (userId) {
      return _this.matrix.user.getUser(userId);
    };

    this.setReceipt = function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(roomId) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", _this.matrix.timeline.setReceipt(roomId));

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, _this);
      }));

      return function (_x11) {
        return _ref5.apply(this, arguments);
      };
    }();

    this.sendMessage = function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(roomId, content) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                return _context6.abrupt("return", _this.matrix.timeline.sendMessage(roomId, content));

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, _this);
      }));

      return function (_x12, _x13) {
        return _ref6.apply(this, arguments);
      };
    }();

    this.sendTextMessage = function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(roomId, content) {
        var response;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return _this.sendMessage(roomId, _extends({}, content, {
                  msgtype: _message.MessageType.Text
                }));

              case 2:
                response = _context7.sent;
                return _context7.abrupt("return", response);

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, _this);
      }));

      return function (_x14, _x15) {
        return _ref7.apply(this, arguments);
      };
    }();

    this.sendLocationMessage = function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(roomId, content) {
        var response;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return _this.sendMessage(roomId, _extends({}, content, {
                  msgtype: _message.MessageType.Location
                }));

              case 2:
                response = _context8.sent;
                return _context8.abrupt("return", response);

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, _this);
      }));

      return function (_x16, _x17) {
        return _ref8.apply(this, arguments);
      };
    }();

    this.sendConvoReplyMessage = function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(roomId, content) {
        var response;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return _this.sendMessage(roomId, _extends({}, content, {
                  msgtype: _message.MessageType.ConvoReply
                }));

              case 2:
                response = _context9.sent;
                return _context9.abrupt("return", response);

              case 4:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, _this);
      }));

      return function (_x18, _x19) {
        return _ref9.apply(this, arguments);
      };
    }();

    this.sendConvoMessage = function () {
      var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(roomId, content) {
        var response;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return _this.sendMessage(roomId, _extends({}, content, {
                  msgtype: _message.MessageType.ConvoUI
                }));

              case 2:
                response = _context10.sent;
                return _context10.abrupt("return", response);

              case 4:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, _this);
      }));

      return function (_x20, _x21) {
        return _ref10.apply(this, arguments);
      };
    }();

    this.sendImageMessage = function () {
      var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(roomId, content) {
        var pending, pendingPayload, uploaded, success;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                // Add pending message during upload
                // expect to get { messageId, content }
                pending = _this.matrix.timeline.addPendingMessage(roomId, _extends({}, content, {
                  url: content.path,
                  msgtype: _message.MessageType.Image
                }));
                pendingPayload = _extends({ roomId: roomId }, content, pending);
                // Upload to the netdisk
                // expected to get { url }

                _context11.next = 4;
                return (0, _httpClient.upload)(pendingPayload);

              case 4:
                uploaded = _context11.sent;

                if (!(uploaded && uploaded.error)) {
                  _context11.next = 9;
                  break;
                }

                // Handle upload error
                _this.matrix.timeline.updatePendingMessage(roomId, _extends({}, content, pending, { status: 'error' }));
                _context11.next = 15;
                break;

              case 9:
                if (!uploaded) {
                  _context11.next = 15;
                  break;
                }

                // Remove pending message when upload is done, before sending the real message (avoid flashing)
                _this.matrix.timeline.removePendingMessage(roomId, pendingPayload);
                // Send the real message out
                _context11.next = 13;
                return _this.matrix.timeline.sendMessage(roomId, _extends({}, pendingPayload, uploaded, {
                  msgtype: _message.MessageType.Image
                }));

              case 13:
                success = _context11.sent;
                return _context11.abrupt("return", success);

              case 15:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, _this);
      }));

      return function (_x22, _x23) {
        return _ref11.apply(this, arguments);
      };
    }();

    this.redactMessage = function () {
      var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(roomId, messageId) {
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                return _context12.abrupt("return", _this.matrix.timeline.redactMessage(roomId, messageId));

              case 1:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, _this);
      }));

      return function (_x24, _x25) {
        return _ref12.apply(this, arguments);
      };
    }();

    this.resendMessage = function () {
      var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(roomId, messageId) {
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                return _context13.abrupt("return", _this.matrix.timeline.resendMessage(roomId, messageId));

              case 1:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, _this);
      }));

      return function (_x26, _x27) {
        return _ref13.apply(this, arguments);
      };
    }();

    this.loadMoreTimeline = function () {
      var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(roomId, dir) {
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                return _context14.abrupt("return", _this.matrix.timeline.loadMoreTimeline(roomId, dir));

              case 1:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, _this);
      }));

      return function (_x28, _x29) {
        return _ref14.apply(this, arguments);
      };
    }();

    this.transUrl = function (url) {
      return _this.matrix.user.transUrl(url);
    };

    this.handleRoomUpdate = function () {
      var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(e) {
        var basicRooms, rooms, event, pages;
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                console.log('ROOM UPDATE: ', e);
                basicRooms = _this.matrix.room.getBasicRooms();
                rooms = _this.matrix.room.getRooms();
                event = {
                  rooms: rooms,
                  basicRooms: basicRooms,
                  room: e.item
                };

                _this.updateUnreadBadge();
                _this.eventCenter.trigger(_interface.IMEvent.ROOM, event);

                if (!(e.prevItem && e.prevItem.membership !== e.item.membership)) {
                  _context15.next = 15;
                  break;
                }

                _context15.t0 = e.item.membership;
                _context15.next = _context15.t0 === 'leave' ? 10 : 14;
                break;

              case 10:
                _index4.default.showToast({
                  title: "\u60A8\u5DF2\u79BB\u5F00\u623F\u95F4\uFF1A" + e.item.name,
                  icon: 'none'
                });
                pages = _index4.default.getCurrentPages();

                if (_this.matrix.timeline.isViewingRoom(e.item.id)) {
                  // console.log(pages.length);
                  // if (pages.length === 2) {
                  //   setTimeout(() => wxRouter.navigateBack(), 0);
                  // } else {
                  //   setTimeout(() =>  wxRouter.switchTab(NAV_PAGES.HOME), 0);
                  // }
                  setTimeout(function () {
                    return _index6.default.switchTab(_navigation.NAV_PAGES.HOME);
                  }, 0);
                }
                return _context15.abrupt("break", 15);

              case 14:
                return _context15.abrupt("break", 15);

              case 15:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, _this);
      }));

      return function (_x30) {
        return _ref15.apply(this, arguments);
      };
    }();

    this.handleUserUpdate = function () {
      var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(e) {
        return regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                console.log('USER UPDATE: ', e);
                _this.eventCenter.trigger(_interface.IMEvent.USER, e);

              case 2:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, _this);
      }));

      return function (_x31) {
        return _ref16.apply(this, arguments);
      };
    }();

    this.handleDispatchUpdate = function () {
      var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(e) {
        var dispatchState, acceptRoomId, dispatchRoomId, from, pages, curPage, curRoomId, curRoom, isInDispatchRoom, that;
        return regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                console.log('DISPATCH UPDATE', e);
                dispatchState = e.dispatchState, acceptRoomId = e.acceptRoomId, dispatchRoomId = e.dispatchRoomId, from = e.from;
                // console.log('newstate: ', dispatchState);

                pages = _index4.default.getCurrentPages();
                curPage = pages[pages.length - 1];
                curRoomId = curPage.route === 'pages/room/index' ? curPage.options.roomId : '';
                curRoom = _this.matrix.room.getRoom(curRoomId);
                // console.log('smartBotRoomId', smartBotRoomId);

                isInDispatchRoom = curRoomId === dispatchRoomId && from === 'dispatch-bot';
                // const isInSmartBotRoom = curRoomId === smartBotRoomId
                // console.log('curRoomId', curRoomId);
                // console.log('isInDispatchRoom', isInDispatchRoom);

                if (dispatchState !== _dispatch2.DISPATCH_STATE.dispatching) {
                  (0, _store.setCacheSync)('setCacheSync', []);
                }
                console.log('this.dispatchModalShowed', _this.dispatchModalShowed);
                _context17.t0 = dispatchState;
                _context17.next = _context17.t0 === _dispatch2.DISPATCH_STATE.accepted ? 12 : _context17.t0 === 'DISPATCHING' ? 21 : _context17.t0 === 'TIMEOUT' ? 22 : 23;
                break;

              case 12:
                // handle accepted state
                _this.matrix.dispatch.close();

                if (!isInDispatchRoom) {
                  _context17.next = 20;
                  break;
                }

                // console.log('acceptRoomId', acceptRoomId);
                // console.log('dispatchRoomId', dispatchRoomId);
                console.log('acceptRoomId === dispatchRoomId', acceptRoomId === dispatchRoomId);

                if (!(acceptRoomId === dispatchRoomId)) {
                  _context17.next = 17;
                  break;
                }

                return _context17.abrupt("return");

              case 17:
                // Taro.redirectTo({ url, })
                // wxRouter.redirectTo(NAV_PAGES.ROOM, { roomId: acceptRoomId })
                _this.enterRoom(acceptRoomId, { redirect: true });
                _context17.next = 21;
                break;

              case 20:
                if (!_this.dispatchModalShowed) {
                  that = _this;

                  that.dispatchModalShowed = true;
                  _index4.default.showModal({
                    title: '派单成功',
                    content: '您的专属客服已到位',
                    cancelText: '稍后进入',
                    confirmText: '进入房间',
                    success: function success(res) {
                      that.matrix.dispatch.close();
                      // this.isShowModal = false;
                      that.dispatchModalShowed = false;
                      if (!res.confirm) {
                        return;
                      }
                      if (pages.length >= 2) {
                        // Taro.redirectTo({ url, })
                        // wxRouter.redirectTo(NAV_PAGES.ROOM, { roomId: acceptRoomId })
                        that.enterRoom(acceptRoomId, { redirect: true });
                      } else {
                        // Taro.navigateTo({ url, })
                        // wxRouter.navigateTo(NAV_PAGES.ROOM, { roomId: acceptRoomId })
                        that.enterRoom(acceptRoomId);
                      }
                    }
                  });
                }

              case 21:
                return _context17.abrupt("break", 24);

              case 22:
                // const viewingRoom = store.getState().room.viewingRoom;
                if (!curRoom || curRoom.roomType !== 'DISPATCH' && curRoom.roomType !== 'SMART_BOT') {
                  _this.matrix.dispatch.close();
                }

              case 23:
                return _context17.abrupt("break", 24);

              case 24:
                _this.eventCenter.trigger(_interface.IMEvent.DISPATCH, e);

              case 25:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, _this);
      }));

      return function (_x32) {
        return _ref17.apply(this, arguments);
      };
    }();

    this.handleTimelineUpdate = function () {
      var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(event) {
        return regeneratorRuntime.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                console.log('======handleTimelineUpdate======');
                console.log(event);
                _this.eventCenter.trigger(_interface.IMEvent.TIMELINE, event);

              case 3:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, _this);
      }));

      return function (_x33) {
        return _ref18.apply(this, arguments);
      };
    }();

    this.updateUnreadBadge = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19() {
      var rooms, unread, badgeText;
      return regeneratorRuntime.wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              // console.log('======updateUnreadBadge=====');
              rooms = _this.getBasicRooms();
              unread = rooms.reduce(function (pre, cur) {
                // if (cur.unread) {
                //   console.log(cur);
                // }
                return pre + (cur.isArchive ? 0 : cur.unread);
              }, 0);

              console.log(unread);
              _context19.prev = 3;

              if (!(unread === 0)) {
                _context19.next = 8;
                break;
              }

              _context19.next = 7;
              return _index4.default.removeTabBarBadge({ index: 0 });

            case 7:
              return _context19.abrupt("return");

            case 8:
              badgeText = unread > 99 ? '99+' : unread;
              _context19.next = 11;
              return _index4.default.setTabBarBadge({ index: 0, text: "" + badgeText });

            case 11:
              _context19.next = 16;
              break;

            case 13:
              _context19.prev = 13;
              _context19.t0 = _context19["catch"](3);
              return _context19.abrupt("return");

            case 16:
            case "end":
              return _context19.stop();
          }
        }
      }, _callee19, _this, [[3, 13]]);
    }));

    this.handleDeviceEvent = function (mxEvent) {
      console.log('handleDeviceEvent', mxEvent);
      var event = mxEvent.event;
      // const pages = Taro.getCurrentPages()

      if (event && event.type === 'm.swan.push_retail.transfer') {
        // hack，确保房间信息准备完成。
        var that = _this;
        setTimeout(function () {
          if (that.reDispatchModalShowed) return;
          that.reDispatchModalShowed = true;
          // const url = `/pages/room/index?roomId=${event.content.newRoomId}`
          _index4.default.showModal({
            title: '转单成功',
            content: '您新客服已到位',
            cancelText: '稍后进入',
            confirmText: '进入房间',
            success: function success(res) {
              that.reDispatchModalShowed = false;
              if (!res.confirm) return;
              that.enterRoom(event.content.newRoomId, { redirect: true });
              // if (pages.length >= 2) {
              //   // Taro.redirectTo({ url })
              //   wxRouter.redirectTo(NAV_PAGES.ROOM, { roomId: event.content.newRoomId })
              // } else {
              //   // Taro.navigateTo({ url })
              //   wxRouter.navigateTo(NAV_PAGES.ROOM, { roomId: event.content.newRoomId })
              // }
            }
          });
        }, 500);
      }
    };

    this.isReady = false;
    this.matrix = _index2.default;
    this.eventCenter = new _index3.Events();
    this.dispatchModalShowed = false;
    this.reDispatchModalShowed = false;
  }

  _createClass(IM, [{
    key: "stop",
    value: function stop() {
      this.isReady = false;
      this.matrix.stop();
    }
  }, {
    key: "get",
    value: function get() {
      return this.matrix.mxClient;
    }
  }, {
    key: "init",
    value: function init() {}
  }, {
    key: "getBasicRooms",
    value: function getBasicRooms() {
      return this.matrix.room.getBasicRooms();
    }
  }, {
    key: "getRoom",
    value: function getRoom(roomId) {
      return this.matrix.room.getRoom(roomId);
    }
  }, {
    key: "on",
    value: function on(type) {
      var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

      this.eventCenter.on(type, cb);
    }
  }, {
    key: "off",
    value: function off(type, cb) {
      this.eventCenter.off(type, cb);
    }
  }]);

  return IM;
}();

var im = new IM();
exports.default = im;