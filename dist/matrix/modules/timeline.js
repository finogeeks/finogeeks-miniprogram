"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base = require("./base.js");

var _base2 = _interopRequireDefault(_base);

var _date = require("../../utils/date.js");

var _content = require("../utils/content.js");

var _room = require("../interface/room.js");

var _convo = require("../utils/convo.js");

var convoUtil = _interopRequireWildcard(_convo);

var _message = require("../interface/message.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MAX_MESSAGES_SHOW = 50;
var TIMELINE_UPDATE = 'TIMELINE_UPDATE';

var TimelineModule = function (_BaseModel) {
  _inherits(TimelineModule, _BaseModel);

  function TimelineModule(mxClient, opts) {
    var _this2 = this;

    _classCallCheck(this, TimelineModule);

    var _this = _possibleConstructorReturn(this, (TimelineModule.__proto__ || Object.getPrototypeOf(TimelineModule)).call(this, mxClient, opts));

    _this.viewingRooms = {};
    _this.addViewingRoom = function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(roomId) {
        var room, mxRoom, timelineWindow, createTime, timeline;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                room = _this.store.room.get(roomId);
                mxRoom = _this.mxClient.getRoom(roomId);

                if (mxRoom) {
                  _context.next = 5;
                  break;
                }

                // log Error 
                console.error('room not exit');
                return _context.abrupt("return");

              case 5:
                if (!room) {
                  room = _this.buildRoom(mxRoom);
                  _this.store.room.put(roomId, room);
                }
                if (room.topic && room.topic.isSendEnterRoom) {
                  _this.mxClient.sendEvent(room.id, 'm.room._ext.enter', {
                    body: {
                      userId: _this.myUserId
                    }
                  });
                }
                _context.next = 9;
                return _this.createTimelineWindow(mxRoom);

              case 9:
                timelineWindow = _context.sent;
                createTime = Date.now();
                timeline = _this.getTimelineFromTimelineWindow(mxRoom.roomId, createTime, timelineWindow);

                _this.viewingRooms[roomId] = {
                  createTime: createTime,
                  timelineWindow: timelineWindow,
                  timeline: timeline
                };
                return _context.abrupt("return", {
                  timeline: timeline,
                  canPaginateFront: timelineWindow.canPaginate(_this.mxSdk.EventTimeline.FORWARDS),
                  canPaginateBack: timelineWindow.canPaginate(_this.mxSdk.EventTimeline.BACKWARDS)
                });

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();
    _this.getTimeline = function (roomId) {
      var viewingRoom = _this.viewingRooms[roomId];
      if (!viewingRoom) {
        console.error('need add viewing Room firset');
        return;
      }
      return viewingRoom.timeline;
    };
    _this.removeViewingRoom = function (roomId) {
      delete _this.viewingRooms[roomId];
    };
    _this.loadMoreTimeline = function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(roomId, dir) {
        var viewingRoom, timeline, timelineWindow, paginateDir, newTimeline, canPaginate;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                viewingRoom = _this.viewingRooms[roomId];

                if (viewingRoom) {
                  _context2.next = 4;
                  break;
                }

                console.error('need add viewing Room firset');
                return _context2.abrupt("return", null);

              case 4:
                timeline = viewingRoom.timeline, timelineWindow = viewingRoom.timelineWindow;
                paginateDir = dir === 'BACKWORDS' ? _this.mxSdk.EventTimeline.BACKWARDS : _this.mxSdk.EventTimeline.FORWARDS;

                if (viewingRoom.timelineWindow.canPaginate(paginateDir)) {
                  _context2.next = 8;
                  break;
                }

                return _context2.abrupt("return", {
                  timeline: timeline,
                  canPaginateFront: viewingRoom.timelineWindow.canPaginate(_this.mxSdk.EventTimeline.FORWARDS),
                  canPaginateBack: viewingRoom.timelineWindow.canPaginate(_this.mxSdk.EventTimeline.BACKWARDS)
                });

              case 8:
                _context2.next = 10;
                return timelineWindow.paginate(paginateDir, 20);

              case 10:
                newTimeline = _this.getTimelineFromTimelineWindow(roomId, viewingRoom.createTime, viewingRoom.timelineWindow);

                _this.viewingRooms[roomId].timeline = newTimeline;
                _this.eventCenter.trigger(TIMELINE_UPDATE, {
                  type: dir === 'BACKWORDS' ? "PAGINATE_BACK" : "PAGINATE_FORWARD",
                  timeline: newTimeline
                });
                canPaginate = viewingRoom.timelineWindow.canPaginate(paginateDir);
                return _context2.abrupt("return", {
                  timeline: newTimeline,
                  canPaginateFront: viewingRoom.timelineWindow.canPaginate(_this.mxSdk.EventTimeline.FORWARDS),
                  canPaginateBack: viewingRoom.timelineWindow.canPaginate(_this.mxSdk.EventTimeline.BACKWARDS)
                });

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }));

      return function (_x2, _x3) {
        return _ref2.apply(this, arguments);
      };
    }();
    _this.setReceipt = function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(roomId, messageId) {
        var mxRoom, mxEvent, success;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                mxRoom = _this.mxClient.getRoom(roomId);
                mxEvent = messageId ? mxRoom.findEventById(messageId) : mxRoom.timeline[mxRoom.timeline.length - 1];
                _context3.next = 5;
                return _this.mxClient.sendReadReceipt(mxEvent);

              case 5:
                success = _context3.sent;
                return _context3.abrupt("return", success);

              case 9:
                _context3.prev = 9;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", false);

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, _this2, [[0, 9]]);
      }));

      return function (_x4, _x5) {
        return _ref3.apply(this, arguments);
      };
    }();
    _this.sendMessage = function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(roomId, msgContent) {
        var content, response;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;

                // console.log('msgContent', msgContent);
                content = (0, _content.makeContent)(msgContent);
                // console.log('content', content);

                if (msgContent.url) {
                  // update content url before sending message if url is set in msgContent
                  content = (0, _content.updateContentUrl)(content, msgContent.url);
                }

                if (content) {
                  _context4.next = 5;
                  break;
                }

                throw new Error('Content undefined');

              case 5:
                _context4.next = 7;
                return _this.mxClient.sendMessage(roomId, content);

              case 7:
                response = _context4.sent;
                return _context4.abrupt("return", { messageId: response.event_id, content: content });

              case 11:
                _context4.prev = 11;
                _context4.t0 = _context4["catch"](0);
                return _context4.abrupt("return", false);

              case 14:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, _this2, [[0, 11]]);
      }));

      return function (_x6, _x7) {
        return _ref4.apply(this, arguments);
      };
    }();
    _this.redactMessage = function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(roomId, messageId) {
        var success;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return _this.mxClient.redactEvent(roomId, messageId);

              case 3:
                success = _context5.sent;
                return _context5.abrupt("return", success);

              case 7:
                _context5.prev = 7;
                _context5.t0 = _context5["catch"](0);
                return _context5.abrupt("return", false);

              case 10:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, _this2, [[0, 7]]);
      }));

      return function (_x8, _x9) {
        return _ref5.apply(this, arguments);
      };
    }();
    _this.resendMessage = function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(roomId, messageId) {
        var mxRoom, notSentMxEvent, success;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                mxRoom = _this.mxClient.getRoom(roomId);
                notSentMxEvent = mxRoom.getLiveTimeline().getEvents().find(function (mxEvent) {
                  return mxEvent.event.event_id === messageId && mxEvent.status === _message.EventStatus.NOT_SENT;
                });
                success = _this.mxClient.resendEvent(notSentMxEvent, mxRoom);
                return _context6.abrupt("return", success);

              case 7:
                _context6.prev = 7;
                _context6.t0 = _context6["catch"](0);
                return _context6.abrupt("return", false);

              case 10:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, _this2, [[0, 7]]);
      }));

      return function (_x10, _x11) {
        return _ref6.apply(this, arguments);
      };
    }();
    _this.createTimelineWindow = function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(mxRoom) {
        var timelineSet, timelineWindow;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                timelineSet = mxRoom.getUnfilteredTimelineSet();
                // console.log('timelineSet', timelineSet);

                timelineWindow = new _this.mxSdk.TimelineWindow(_this.mxClient, timelineSet, {
                  windowLimit: 100000
                });
                _context7.next = 4;
                return timelineWindow.load(null, 20);

              case 4:
                _context7.next = 6;
                return timelineWindow.paginate(_this.mxSdk.EventTimeline.BACKWARDS, 20);

              case 6:
                return _context7.abrupt("return", timelineWindow);

              case 7:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, _this2);
      }));

      return function (_x12) {
        return _ref7.apply(this, arguments);
      };
    }();
    _this.getTimelineFromTimelineWindow = function (roomId, createTime, timelineWindow) {
      console.log('=========getTimelineFromTimelineWindow=========');
      console.log(timelineWindow.getEvents());
      var orginTimeline = timelineWindow.getEvents().filter(_this.messageFilter).map(_this.buildMessage);
      // console.log(orginTimeline);
      return _this.computeTimeline(roomId, createTime, orginTimeline);
    };
    _this.handleTimelineEvent = function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(mxEvent, mxRoom, toStartOfTimeline, removed, data) {
        var viewingRoom, timelineWindow, createTime, newTimeline;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (mxRoom) {
                  _context8.next = 2;
                  break;
                }

                return _context8.abrupt("return");

              case 2:
                if (!!mxRoom.tags.hide) {
                  _this.mxClient.deleteRoomTag(mxRoom.roomId, 'hide');
                }
                viewingRoom = _this.viewingRooms[mxRoom.roomId];

                if (!(!viewingRoom || toStartOfTimeline)) {
                  _context8.next = 6;
                  break;
                }

                return _context8.abrupt("return");

              case 6:
                _this.setReceipt(mxRoom.roomId);
                // const room = this.buildRoom(mxRoom);
                // this.store.room.put(mxRoom.roomId, room);
                timelineWindow = viewingRoom.timelineWindow, createTime = viewingRoom.createTime;
                _context8.next = 10;
                return timelineWindow.paginate(_this.mxSdk.EventTimeline.FORWARDS, 1, false);

              case 10:
                newTimeline = _this.getTimelineFromTimelineWindow(mxRoom.roomId, createTime, timelineWindow);
                // console.log('~~~~~~~~~~~~~~~handleTimelineEvent~~~~~~~~~~~~~~~~~~', newTimeline[newTimeline.length - 1], mxEvent);

                viewingRoom.timeline = newTimeline;
                _this.eventCenter.trigger(TIMELINE_UPDATE, {
                  type: "NEW_MESSAGE",
                  timeline: newTimeline,
                  newMessage: newTimeline[newTimeline.length - 1]
                });

              case 13:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, _this2);
      }));

      return function (_x13, _x14, _x15, _x16, _x17) {
        return _ref8.apply(this, arguments);
      };
    }();
    _this.handleLocalEchoUpdated = function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(mxEvent, mxRoom) {
        var viewingRoom, txnId, eventStatus, timeline, eventIdx, newMsg, newTimeline;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                viewingRoom = _this.viewingRooms[mxRoom.roomId];
                // console.log('~~~~~~~~~handleLocalEchoUpdated~~~~~~~~~',viewingRoom, mxEvent); 

                if (viewingRoom) {
                  _context9.next = 3;
                  break;
                }

                return _context9.abrupt("return");

              case 3:
                txnId = mxEvent._txnId;
                // const txnId = mxEvent.event.event_id;

                eventStatus = mxEvent.status;
                timeline = viewingRoom.timeline;
                eventIdx = timeline.findIndex(function (event) {
                  return event.id.includes(txnId) || event.id.includes(mxEvent.event.event_id);
                });
                // console.log('~~~~~~~~~handleLocalEchoUpdated~~~~~~~~~',eventIdx, txnId); 

                if (!(eventIdx === -1)) {
                  _context9.next = 9;
                  break;
                }

                return _context9.abrupt("return");

              case 9:
                newMsg = _this.buildMessage(mxEvent, timeline[eventIdx].id);

                if (eventStatus === 'sent' || eventStatus) {
                  newMsg.status = null;
                }
                newTimeline = [].concat(_toConsumableArray(timeline));

                newTimeline[eventIdx] = newMsg;
                viewingRoom.timeline = newTimeline;
                // console.log('~~~~~~~~~handleLocalEchoUpdated~~~~~~~~~',newMsg);  
                _this.eventCenter.trigger(TIMELINE_UPDATE, {
                  type: "MESSAGE_UPDATE",
                  timeline: newTimeline,
                  updateMessage: newTimeline[eventIdx]
                });

              case 15:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, _this2);
      }));

      return function (_x18, _x19) {
        return _ref9.apply(this, arguments);
      };
    }();
    _this.computeTimeline = function (roomId, createTime, timeline) {
      var room = _this.store.room.get(roomId);
      var mxRoom = _this.mxClient.getRoom(roomId);
      if (!room && !mxRoom) return [];
      if (!room) {
        room = _this.buildRoom(mxRoom);
        _this.store.room.put(room.id, room);
      }
      var filterZone = _this.getFilterZone(room.id, room.roomType, room.states, createTime);
      var result = timeline.reduce(function (previous, current) {
        var isSupportMessage = _this.isSupportMessage(current);
        var isSupportEvent = _this.isSupportEvent(room.roomType, current);
        if (!isSupportMessage && !isSupportEvent) return previous;
        if (_this.isInFilterZone(filterZone, current.time)) return previous;
        var prevTime = previous[previous.length - 1] ? previous[previous.length - 1].time : null;
        var curTime = current.time;
        var timeMsg = _this.getTimeMsg(prevTime, curTime);
        if (timeMsg) {
          previous.push(timeMsg);
        }
        if (convoUtil.isReplaceDisplay(current)) {
          var replaceIndex = previous.findIndex(function (msg) {
            return convoUtil.isReplaceDisplay(msg) && convoUtil.isSameContext(msg, current);
          });
          if (replaceIndex !== -1) {
            var newArr = [].concat(_toConsumableArray(previous));
            newArr[replaceIndex] = current;
            return newArr;
          }
        }
        previous.push(current);
        return previous;
      }, []);
      return result;
    };
    _this.isSupportMessage = function (event) {
      // const content = event.getContent();
      var supportMessage = ['m.notice', 'm.text', 'm.image', 'm.file', 'm.audio', 'm.video', 'm.url', 'm.alert', 'm.location', 'fc.convo.ui', 'fc.convo.reply', 'fc.applet', 'm.combine_forward', 'm.businesscard', 'm.bad.encrypted'];
      return supportMessage.includes(event.content.msgtype) || event.type === 'm.room.message';
    };
    _this.isSupportEvent = function (roomType, event) {
      var supportEvent = ['m.room.create', 'm.room.name', 'm.room.member'];
      // 临时兼容频道
      return supportEvent.includes(event.type) && roomType === _room.RoomType.channel;
    };
    _this.getTimeMsg = function (prevTime, curTime) {
      if (!prevTime) return null;
      if (curTime - prevTime < 180000) return null;
      var relativeTime = (0, _date.getRelativeTime)(curTime);
      return {
        id: "" + prevTime,
        content: {
          body: relativeTime,
          msgType: 'm.local.time'
        },
        user: {
          id: null
        }
      };
    };
    // 获取过滤时间戳区间数组，例[[endStamp1, startsTamp1], [endStamp2, startsTamp2]]
    _this.getFilterZone = function (roomId, roomType, roomStates, createTime) {
      if (roomType === _room.RoomType.smartBot) {
        return [];
      }
      var stateEvents = roomStates || [];
      var filterEvents = stateEvents.filter(function (event) {
        return event.type === 'm.modular.swan.dispatch_filter' && event.content.filter === 'END';
      }).sort(function (a, b) {
        return b.time - a.time;
      });
      // console.log('filterEvents', filterEvents);
      var lastEndEvent = filterEvents.reduce(function (pre, cur) {
        if (pre) return pre;
        var _cur$content = cur.content,
            dispatchState = _cur$content.dispatchState,
            filter = _cur$content.filter,
            acceptRoomId = _cur$content.acceptRoomId;
        // 判断是否为 end 事件

        var isEnd = false;
        if (roomType === roomType.dispatch) {
          if (cur.time <= createTime) {
            isEnd = filter === 'END';
          }
        } else {
          if (acceptRoomId === roomId) {
            isEnd = filter === 'END' && dispatchState === 'TIMEOUT';
          } else {
            isEnd = filter === 'END';
          }
        }
        if (isEnd) return cur;
        return pre;
      }, null);
      if (!lastEndEvent) return [];
      return [[lastEndEvent.time, 0]];
    };
    _this.isInFilterZone = function (zone, time) {
      if (zone.length === 0) return false;
      for (var idx = 0; idx < zone.length; idx++) {
        var ele = zone[idx];
        if (time < ele[0] && time > ele[1]) {
          return true;
        }
      }
      return false;
    };
    _this.init();
    return _this;
  }

  _createClass(TimelineModule, [{
    key: "init",
    value: function init() {
      var _this3 = this;

      this.mxClient.on('Room.timeline', function (mxEvent, mxRoom, toStartOfTimeline, removed, data) {
        return _this3.handleTimelineEvent(mxEvent, mxRoom, toStartOfTimeline, removed, data);
      });
      this.mxClient.on('Room.localEchoUpdated', function (mxEvent, mxRoom) {
        return _this3.handleLocalEchoUpdated(mxEvent, mxRoom);
      });
    }
  }, {
    key: "isViewingRoom",
    value: function isViewingRoom(roomId) {
      return !!this.viewingRooms[roomId];
    }
  }, {
    key: "addPendingMessage",
    value: function addPendingMessage(roomId, content) {
      try {
        var mxRoom = this.mxClient.getRoom(roomId);
        var mxMe = mxRoom.currentState.getMember(this.myUserId);
        var messageId = this.mxClient.makeTxnId();
        var newContent = (0, _content.makeContent)(content);
        var mxEvent = new this.mxSdk.MatrixEvent({
          content: newContent,
          state_key: '',
          type: _message.MessageType.Message,
          sender: this.myUserId,
          room_id: roomId,
          event_id: messageId,
          membership: mxMe.membership,
          // the pending property is added for the case that we need to reupload a file/media
          pending: {
            progress: 0,
            content: newContent,
            payload: content
          }
        });
        mxEvent.status = _message.EventStatus.SENDING;
        mxRoom.addPendingEvent(mxEvent, messageId);
        return { messageId: messageId, content: newContent };
      } catch (error) {
        // this.log(error, 'error')
        return {};
      }
    }
  }, {
    key: "removePendingMessage",
    value: function removePendingMessage(roomId, payload) {
      try {
        var mxEvent = this.updatePendingMessage(roomId, _extends({}, payload, { status: 'queued' }));
        this.mxClient.cancelPendingEvent(mxEvent);
        return true;
      } catch (error) {
        // this.log(error, 'error')
        return false;
      }
    }
  }, {
    key: "updatePendingMessage",
    value: function updatePendingMessage(roomId, payload) {
      try {
        var messageId = payload.messageId,
            status = payload.status;

        var mxRoom = this.mxClient.getRoom(roomId);
        var mxEvent = mxRoom.findEventById(messageId);
        var mxStatus = '';
        switch (status) {
          case 'queued':
            mxStatus = _message.EventStatus.QUEUED;
            break;
          case 'sending':
            mxStatus = _message.EventStatus.SENDING;
            break;
          case 'error':
            mxStatus = _message.EventStatus.NOT_SENT;
            break;
          case 'cancel':
            mxStatus = _message.EventStatus.CANCELLED;
            break;
          case 'sent':
            mxStatus = _message.EventStatus.SENT;
            break;
          case 'encrypting':
            mxStatus = _message.EventStatus.ENCRYPTING;
            break;
          default:
            break;
        }
        mxRoom.updatePendingEvent(mxEvent, mxStatus);
        var viewingRoom = this.viewingRooms[roomId];
        if (viewingRoom) {
          var newTimeline = this.getTimelineFromTimelineWindow(roomId, viewingRoom.createTime, viewingRoom.timelineWindow);
          // console.log('~~~~~~~~~updatePendingMessage~~~~~~~~~~~', newTimeline);
          viewingRoom.timeline = newTimeline;
          this.eventCenter.trigger(TIMELINE_UPDATE, {
            type: "MESSAGE_UPDATE",
            timeline: newTimeline
          });
        }
        return mxEvent;
      } catch (error) {
        return false;
      }
    }
  }, {
    key: "onUpdate",
    value: function onUpdate(cb) {
      this.eventCenter.on(TIMELINE_UPDATE, cb);
    }
  }, {
    key: "offUpdate",
    value: function offUpdate(cb) {
      this.eventCenter.off(TIMELINE_UPDATE, cb);
    }
  }]);

  return TimelineModule;
}(_base2.default);

exports.default = TimelineModule;