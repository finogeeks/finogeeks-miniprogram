'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchKnowledgeByKey = exports.bindAdvisor = exports.searchBank = exports.bindStaff = exports.getDirectDispatchRoom = exports.reSendDispatchState = exports.getChannelInfo = exports.getDispatchState = exports.getOrderChatHistory = exports.getAdvisorInfo = exports.sendEvalMsg = exports.getAdviceQuestionType = exports.sendEvaluation = exports.getMessageDetail = exports.leaveMsg = exports.addDispatchQuestion = exports.getAdvisorRoomInfo = exports.closeWorkOrder = exports.cancelWorkOrderQueue = exports.joinWorkOrderQueue = undefined;

var _httpClient = require('../utils/http-client.js');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _this = undefined;

/**
 * Finogeeks Netdisk class
 */
/**
 * 请求派单排队
 * @param {Object} payload
 * @param {string} payload.pattern 模式类型，A模式：结束工单后员工离开房间；B 模式，不离开房间
 * @param {string} payload.retailId 用户 Id
 * @param {string} payload.roomId 房间 Id
 * @param {string} payload.staffId 员工 Id
 * @param {Object} payload.question 提问信息：{msgType: '', body: ''}
 * @param {Array} payload.specialIds 特定员工列表
 * @param {string} payload.location 地理信息：{longitude, latitude}
 * @returns {Object}
 */
var joinWorkOrderQueue = exports.joinWorkOrderQueue = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(payload) {
    var url, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            url = '/api/v1/swan/bot/dispatch/queue';
            _context.prev = 1;
            _context.next = 4;
            return (0, _httpClient.request)({
              method: 'POST',
              url: url,
              data: payload,
              needToken: true
            });

          case 4:
            response = _context.sent;
            return _context.abrupt('return', response.data);

          case 8:
            _context.prev = 8;
            _context.t0 = _context['catch'](1);
            return _context.abrupt('return', false);

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 8]]);
  }));

  return function joinWorkOrderQueue(_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * 取消派单
 * @param {Object} payload
 * @param {string} payload.orderId
 * @param {string} payload.retailId
 * @param {string} payload.roomId
 * @param {string} payload.pattern
 */
var cancelWorkOrderQueue = exports.cancelWorkOrderQueue = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(payload) {
    var url, response;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            url = '/api/v1/swan/bot/dispatch/cancel';
            _context2.prev = 1;
            _context2.next = 4;
            return (0, _httpClient.request)({
              method: 'POST',
              url: url,
              data: payload
            });

          case 4:
            response = _context2.sent;

            _this._cancelQueueRank(payload.orderId);
            return _context2.abrupt('return', response.data);

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2['catch'](1);
            return _context2.abrupt('return', false);

          case 12:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[1, 9]]);
  }));

  return function cancelWorkOrderQueue(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * 关闭工单
 * @param {Object} payload
 * @param {string} payload.retailId
 * @param {string} payload.staffId
 * @param {string} payload.roomId
 * @param {string} payload.orderId
 * @param {string} payload.pattern
 */
var closeWorkOrder = exports.closeWorkOrder = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(payload) {
    var url, response;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            url = '/api/v1/swan/bot/dispatch/close';
            _context3.prev = 1;
            _context3.next = 4;
            return (0, _httpClient.request)({
              method: 'POST',
              url: url,
              data: payload
            });

          case 4:
            response = _context3.sent;
            return _context3.abrupt('return', response.data);

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3['catch'](1);
            return _context3.abrupt('return', false);

          case 11:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[1, 8]]);
  }));

  return function closeWorkOrder(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * 获取派单房间
 * @param {Object} payload
 * @param {string} payload.retailId
 * @param {string} payload.pattern
 */
var getAdvisorRoomInfo = exports.getAdvisorRoomInfo = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_ref4) {
    var pattern = _ref4.pattern,
        retailId = _ref4.retailId;
    var url, response;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            url = '/api/v1/swan/bot/dispatch/' + pattern + '/' + retailId + '/room';
            _context4.prev = 1;
            _context4.next = 4;
            return (0, _httpClient.request)({
              method: 'GET',
              url: url,
              needToken: true
            });

          case 4:
            response = _context4.sent;
            return _context4.abrupt('return', response.data);

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4['catch'](1);
            return _context4.abrupt('return', false);

          case 11:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[1, 8]]);
  }));

  return function getAdvisorRoomInfo(_x4) {
    return _ref5.apply(this, arguments);
  };
}();
/**
 * 添加派单问题
 * @param {Object} payload
 * @param {string} payload.pattern
 * @param {string} payload.orderId
 * @param {string} payload.question
 */
var addDispatchQuestion = exports.addDispatchQuestion = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(payload) {
    var url, response;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            url = '/api/v1/swan/bot/dispatch/question';
            _context5.prev = 1;
            _context5.next = 4;
            return (0, _httpClient.request)({
              method: 'POST',
              url: url,
              data: payload
            });

          case 4:
            response = _context5.sent;
            return _context5.abrupt('return', response.data);

          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5['catch'](1);
            return _context5.abrupt('return', false);

          case 11:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[1, 8]]);
  }));

  return function addDispatchQuestion(_x5) {
    return _ref6.apply(this, arguments);
  };
}();
/**
 * 留言
 * @param {Object} payload
 * @param {string} payload.question
 * @param {string} payload.email
 * @param {string} payload.retailId
 * @param {string} payload.roomId
 * @param {string} payload.phone
 * @param {Object} payload.location
 */
var leaveMsg = exports.leaveMsg = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(payload) {
    var url, response;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            url = '/api/v1/swan/workorder/guestbooks';
            _context6.prev = 1;
            _context6.next = 4;
            return (0, _httpClient.request)({
              method: 'POST',
              url: url,
              data: payload
            });

          case 4:
            response = _context6.sent;
            return _context6.abrupt('return', response.data);

          case 8:
            _context6.prev = 8;
            _context6.t0 = _context6['catch'](1);
            return _context6.abrupt('return', false);

          case 11:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined, [[1, 8]]);
  }));

  return function leaveMsg(_x6) {
    return _ref7.apply(this, arguments);
  };
}();
/**
 * 获取留言详情
 */
var getMessageDetail = exports.getMessageDetail = function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(orderId) {
    var url, response;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            url = '/api/v1/swan/workorder/orders/' + orderId;
            _context7.prev = 1;
            _context7.next = 4;
            return (0, _httpClient.request)({
              method: 'GET',
              url: url
            });

          case 4:
            response = _context7.sent;
            return _context7.abrupt('return', response.data);

          case 8:
            _context7.prev = 8;
            _context7.t0 = _context7['catch'](1);
            return _context7.abrupt('return', false);

          case 11:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined, [[1, 8]]);
  }));

  return function getMessageDetail(_x7) {
    return _ref8.apply(this, arguments);
  };
}();
/**
 * 客户发送评价
 *
 * @param {Object} payload
 * @param {string} payload.orderId
 * @param {string} payload.retailId
 * @param {string} payload.roomId
 * @param {string} payload.staffId
 * @param {string} payload.pattern
 * @param {Object} payload.score
 * @param {Object} payload.note
 */
var sendEvaluation = exports.sendEvaluation = function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(payload) {
    var url, response;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            url = '/api/v1/swan/bot/dispatch/evaluation';
            _context8.prev = 1;
            _context8.next = 4;
            return (0, _httpClient.request)({
              method: 'PUT',
              url: url,
              data: payload
            });

          case 4:
            response = _context8.sent;
            return _context8.abrupt('return', response.data);

          case 8:
            _context8.prev = 8;
            _context8.t0 = _context8['catch'](1);
            return _context8.abrupt('return', false);

          case 11:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined, [[1, 8]]);
  }));

  return function sendEvaluation(_x8) {
    return _ref9.apply(this, arguments);
  };
}();
/**
 * 获取问题分类
 */
var getAdviceQuestionType = exports.getAdviceQuestionType = function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
    var url, response;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            url = '/api/v1/swan/gearing/config/questiontypes';
            _context9.prev = 1;
            _context9.next = 4;
            return (0, _httpClient.request)({
              method: 'GET',
              url: url
            });

          case 4:
            response = _context9.sent;
            return _context9.abrupt('return', response.data);

          case 8:
            _context9.prev = 8;
            _context9.t0 = _context9['catch'](1);
            return _context9.abrupt('return', false);

          case 11:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, undefined, [[1, 8]]);
  }));

  return function getAdviceQuestionType() {
    return _ref10.apply(this, arguments);
  };
}();
/**
 * 发送评价 convo ui msg
 */
var sendEvalMsg = exports.sendEvalMsg = function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(payload) {
    var url, response;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            url = '/api/v1/swan/bot/dispatch/evalmsg';
            _context10.prev = 1;
            _context10.next = 4;
            return (0, _httpClient.request)({
              method: 'PUT',
              url: url,
              data: payload
            });

          case 4:
            response = _context10.sent;
            return _context10.abrupt('return', response.data);

          case 8:
            _context10.prev = 8;
            _context10.t0 = _context10['catch'](1);
            return _context10.abrupt('return', false);

          case 11:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, undefined, [[1, 8]]);
  }));

  return function sendEvalMsg(_x9) {
    return _ref11.apply(this, arguments);
  };
}();
/**
 * 获取客服详情
 * @param {Object} payload
 * @param {string} payload.retailId 客户 id
 * @param {string} payload.staffId 客服 id
 */
var getAdvisorInfo = exports.getAdvisorInfo = function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(_ref12) {
    var retailId = _ref12.retailId,
        staffId = _ref12.staffId;
    var url, response;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            url = '/api/v1/swan/manager/customer/' + retailId + '/find/' + staffId;
            _context11.prev = 1;
            _context11.next = 4;
            return (0, _httpClient.request)({
              method: 'GET',
              url: url
            });

          case 4:
            response = _context11.sent;
            return _context11.abrupt('return', response.data);

          case 8:
            _context11.prev = 8;
            _context11.t0 = _context11['catch'](1);
            return _context11.abrupt('return', false);

          case 11:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, undefined, [[1, 8]]);
  }));

  return function getAdvisorInfo(_x10) {
    return _ref13.apply(this, arguments);
  };
}();
/**
 * 获取客服房间聊天记录
 * @param {Object} payload
 * @param {string} payload.orderId  orderId
 * @param {string} payload.timestamp 时间戳
 */
var getOrderChatHistory = exports.getOrderChatHistory = function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(_ref14) {
    var orderId = _ref14.orderId,
        timestamp = _ref14.timestamp;
    var url, response;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            url = '/api/v1/swan/observe/orders/' + orderId + '/chat';

            if (timestamp) {
              url = url += '?timestamp=' + timestamp;
            }
            _context12.prev = 2;
            _context12.next = 5;
            return (0, _httpClient.request)({
              method: 'GET',
              url: url
            });

          case 5:
            response = _context12.sent;
            return _context12.abrupt('return', response.data);

          case 9:
            _context12.prev = 9;
            _context12.t0 = _context12['catch'](2);
            return _context12.abrupt('return', false);

          case 12:
          case 'end':
            return _context12.stop();
        }
      }
    }, _callee12, undefined, [[2, 9]]);
  }));

  return function getOrderChatHistory(_x11) {
    return _ref15.apply(this, arguments);
  };
}();
/**
 * 获取派单状态
 * @param {Object} payload
 * @param {string} payload.orderId
 */
var getDispatchState = exports.getDispatchState = function () {
  var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(payload) {
    var url, response;
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            url = '/api/v1/swan/bot/dispatch/' + payload.orderId + '/dispatchState';
            _context13.prev = 1;
            _context13.next = 4;
            return (0, _httpClient.request)({
              method: 'GET',
              url: url
            });

          case 4:
            response = _context13.sent;
            return _context13.abrupt('return', response.data);

          case 8:
            _context13.prev = 8;
            _context13.t0 = _context13['catch'](1);
            return _context13.abrupt('return', false);

          case 11:
          case 'end':
            return _context13.stop();
        }
      }
    }, _callee13, undefined, [[1, 8]]);
  }));

  return function getDispatchState(_x12) {
    return _ref16.apply(this, arguments);
  };
}();
/**
 * 获取渠道信息
 * @param {Object} payload
 * @param {string} payload.channelId
 */
var getChannelInfo = exports.getChannelInfo = function () {
  var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(payload) {
    var url, response;
    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            url = '/api/v1/swan/gearing/channels/' + payload.channelId;
            _context14.prev = 1;
            _context14.next = 4;
            return (0, _httpClient.request)({
              method: 'GET',
              url: url
            });

          case 4:
            response = _context14.sent;
            return _context14.abrupt('return', response.data);

          case 8:
            _context14.prev = 8;
            _context14.t0 = _context14['catch'](1);
            return _context14.abrupt('return', false);

          case 11:
          case 'end':
            return _context14.stop();
        }
      }
    }, _callee14, undefined, [[1, 8]]);
  }));

  return function getChannelInfo(_x13) {
    return _ref17.apply(this, arguments);
  };
}();
/**
 * 重新发送 state
 * @param {Object} payload
 * @param {string} payload.orderId
 * @param {string} payload.fcid
 * @param {string} payload.roomId
 * @param {string} payload.roomState
 * @param {string} payload.accountDataState
 */
var reSendDispatchState = exports.reSendDispatchState = function () {
  var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(payload) {
    var url, response;
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            url = '/api/v1/swan/bot/dispatch/' + payload.orderId + '/dispatchState';
            _context15.prev = 1;
            _context15.next = 4;
            return (0, _httpClient.request)({
              method: 'PUT',
              url: url,
              data: payload
            });

          case 4:
            response = _context15.sent;
            return _context15.abrupt('return', response.data);

          case 8:
            _context15.prev = 8;
            _context15.t0 = _context15['catch'](1);
            return _context15.abrupt('return', false);

          case 11:
          case 'end':
            return _context15.stop();
        }
      }
    }, _callee15, undefined, [[1, 8]]);
  }));

  return function reSendDispatchState(_x14) {
    return _ref18.apply(this, arguments);
  };
}();
/**
 * 获取直接派单房间
 * @param {Object} payload
 * @param {string} payload.retailId
 * @param {string} payload.staffId
 */
var getDirectDispatchRoom = exports.getDirectDispatchRoom = function () {
  var _ref19 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(payload) {
    var url, response;
    return regeneratorRuntime.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            url = '/api/v1/swan/bot/dispatch/B/' + payload.retailId + '/room?staffId=' + payload.staffId;
            _context16.prev = 1;
            _context16.next = 4;
            return (0, _httpClient.request)({
              method: 'GET',
              url: url
            });

          case 4:
            response = _context16.sent;
            return _context16.abrupt('return', response.data);

          case 8:
            _context16.prev = 8;
            _context16.t0 = _context16['catch'](1);
            return _context16.abrupt('return', false);

          case 11:
          case 'end':
            return _context16.stop();
        }
      }
    }, _callee16, undefined, [[1, 8]]);
  }));

  return function getDirectDispatchRoom(_x15) {
    return _ref19.apply(this, arguments);
  };
}();
/**
 * 绑定客户
 * @param {Object} payload
 * @param {string} payload.retailId
 * @param {string} payload.bindStaffId
 */
var bindStaff = exports.bindStaff = function () {
  var _ref20 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(payload) {
    var url, response;
    return regeneratorRuntime.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            url = '/api/v1/swan/retail/bind';
            _context17.prev = 1;
            _context17.next = 4;
            return (0, _httpClient.request)({
              method: 'POST',
              url: url,
              data: payload
            });

          case 4:
            response = _context17.sent;
            return _context17.abrupt('return', response.data);

          case 8:
            _context17.prev = 8;
            _context17.t0 = _context17['catch'](1);
            return _context17.abrupt('return', false);

          case 11:
          case 'end':
            return _context17.stop();
        }
      }
    }, _callee17, undefined, [[1, 8]]);
  }));

  return function bindStaff(_x16) {
    return _ref20.apply(this, arguments);
  };
}();
/**
 * 搜索营业部
 * @param {Object} payload
 * @param {string} payload.name
 */
var searchBank = exports.searchBank = function () {
  var _ref21 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(payload) {
    var url, response;
    return regeneratorRuntime.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            // const url = `/api/v1/swan/manager/department/${payload.name}/_fuzzy`
            url = '/api/v1/swan/manager/department/' + encodeURIComponent(payload.name) + '/_fuzzy';
            _context18.prev = 1;
            _context18.next = 4;
            return (0, _httpClient.request)({
              method: 'GET',
              url: url
            });

          case 4:
            response = _context18.sent;
            return _context18.abrupt('return', response.data);

          case 8:
            _context18.prev = 8;
            _context18.t0 = _context18['catch'](1);

            console.log(_context18.t0);
            return _context18.abrupt('return', false);

          case 12:
          case 'end':
            return _context18.stop();
        }
      }
    }, _callee18, undefined, [[1, 8]]);
  }));

  return function searchBank(_x17) {
    return _ref21.apply(this, arguments);
  };
}();
/**
 * 绑定 advisor
 * @param {Object} payload
 * @param {string} payload.retailId
 * @param {string} payload.bindStaffId
 */
var bindAdvisor = exports.bindAdvisor = function () {
  var _ref22 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(payload) {
    var url, response;
    return regeneratorRuntime.wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            url = '/api/v1/swan/retail/bind';
            _context19.prev = 1;
            _context19.next = 4;
            return (0, _httpClient.request)({
              method: 'POST',
              url: url,
              data: payload
            });

          case 4:
            response = _context19.sent;
            return _context19.abrupt('return', response.data);

          case 8:
            _context19.prev = 8;
            _context19.t0 = _context19['catch'](1);

            console.log(_context19.t0);
            return _context19.abrupt('return', false);

          case 12:
          case 'end':
            return _context19.stop();
        }
      }
    }, _callee19, undefined, [[1, 8]]);
  }));

  return function bindAdvisor(_x18) {
    return _ref22.apply(this, arguments);
  };
}();
/**
 * 搜索知识库
 */
var searchKnowledgeByKey = exports.searchKnowledgeByKey = function () {
  var _ref23 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20(payload) {
    var _payload$group, group, _payload$key, key, _payload$size, size, _payload$page, page, url, response;

    return regeneratorRuntime.wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            _payload$group = payload.group, group = _payload$group === undefined ? '全部' : _payload$group, _payload$key = payload.key, key = _payload$key === undefined ? null : _payload$key, _payload$size = payload.size, size = _payload$size === undefined ? 10 : _payload$size, _payload$page = payload.page, page = _payload$page === undefined ? 1 : _payload$page;

            if (key) {
              _context20.next = 3;
              break;
            }

            return _context20.abrupt('return', false);

          case 3:
            url = '/api/v1/swan/knowledge/search/' + encodeURIComponent(group) + '/' + encodeURIComponent(key) + '?size=' + size + '&page=' + page;
            _context20.prev = 4;
            _context20.next = 7;
            return (0, _httpClient.request)({
              method: 'GET',
              url: url
            });

          case 7:
            response = _context20.sent;
            return _context20.abrupt('return', response.data);

          case 11:
            _context20.prev = 11;
            _context20.t0 = _context20['catch'](4);
            return _context20.abrupt('return', false);

          case 14:
          case 'end':
            return _context20.stop();
        }
      }
    }, _callee20, undefined, [[4, 11]]);
  }));

  return function searchKnowledgeByKey(_x19) {
    return _ref23.apply(this, arguments);
  };
}();