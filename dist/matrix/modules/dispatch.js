"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _isEqual = require("../../utils/lodash-local/is-equal.js");

var _isEqual2 = _interopRequireDefault(_isEqual);

var _store = require("../../utils/store.js");

var _base = require("./base.js");

var _base2 = _interopRequireDefault(_base);

var _dispatch = require("../interface/dispatch.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DISPATCH_STATE_UPDATE = 'DISPATCH_STATE_UPDATE';
var QUESTION_TYPE = 'QUESTION_TYPE';

var DispatchModule = function (_BaseModule) {
  _inherits(DispatchModule, _BaseModule);

  function DispatchModule(mxClient, opts) {
    var _this2 = this;

    _classCallCheck(this, DispatchModule);

    var _this = _possibleConstructorReturn(this, (DispatchModule.__proto__ || Object.getPrototypeOf(DispatchModule)).call(this, mxClient, opts));

    _this.init = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var dispatchData, _ref2, dispatchState, from, acceptRoomId, dispatchRoomId, questionType;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _this.checkState();

            case 2:
              if (!_this.inited) {
                _context.next = 4;
                break;
              }

              return _context.abrupt("return");

            case 4:
              _this.mxClient.on('accountData', _this.handleAccountData);
              _context.next = 7;
              return _this.mxClient.getAccountData({ type: 'm.modular.swan.dispatch' });

            case 7:
              _context.t0 = _context.sent;

              if (_context.t0) {
                _context.next = 10;
                break;
              }

              _context.t0 = {};

            case 10:
              dispatchData = _context.t0;

              if (dispatchData.event) {
                _context.next = 13;
                break;
              }

              return _context.abrupt("return");

            case 13:
              _ref2 = typeof dispatchData.event.content === 'string' ? JSON.parse(dispatchData.event.content) : dispatchData.event.content, dispatchState = _ref2.dispatchState, from = _ref2.from, acceptRoomId = _ref2.acceptRoomId, dispatchRoomId = _ref2.dispatchRoomId, questionType = _ref2.questionType;

              questionType = questionType || (0, _store.getCacheSync)(QUESTION_TYPE);
              dispatchState = dispatchState === _dispatch.DispatchState.dispatching ? dispatchState : _dispatch.DispatchState.close;
              _this.updateDispatchState({
                dispatchState: dispatchState,
                from: from,
                acceptRoomId: acceptRoomId,
                dispatchRoomId: dispatchRoomId,
                questionType: questionType
              });
              _this.inited = true;

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this2);
    }));
    _this.handleAccountData = function (mxEvent) {
      var _mxEvent$event = mxEvent.event,
          type = _mxEvent$event.type,
          content = _mxEvent$event.content;

      if (type === 'm.modular.swan.dispatch') {
        var _ref3 = typeof content === 'string' ? JSON.parse(content) : content,
            dispatchState = _ref3.dispatchState,
            from = _ref3.from,
            dispatchRoomId = _ref3.dispatchRoomId,
            acceptRoomId = _ref3.acceptRoomId,
            questionType = _ref3.questionType;

        questionType = questionType || _this.dispatchData.questionType;
        _this.updateDispatchState({
          dispatchState: dispatchState,
          from: from,
          dispatchRoomId: dispatchRoomId,
          acceptRoomId: acceptRoomId,
          questionType: questionType
        });
      }
    };
    _this.updateDispatchState = function (_ref4) {
      var dispatchState = _ref4.dispatchState,
          from = _ref4.from,
          dispatchRoomId = _ref4.dispatchRoomId,
          acceptRoomId = _ref4.acceptRoomId,
          questionType = _ref4.questionType;

      var newDispatchData = _extends({}, _this.dispatchData, {
        from: from,
        acceptRoomId: acceptRoomId,
        questionType: questionType,
        dispatchState: dispatchState,
        dispatchRoomId: dispatchRoomId
      });
      if (newDispatchData.dispatchState === _this.dispatchData.dispatchState) return;
      if ((0, _isEqual2.default)(newDispatchData, _this.dispatchData)) return;
      _this.dispatchData = newDispatchData;
      _this.eventCenter.trigger(DISPATCH_STATE_UPDATE, _this.dispatchData);
    };
    _this.setQuestionType = function (questionType) {
      try {
        (0, _store.setCacheSync)(QUESTION_TYPE, questionType);
      } catch (error) {
        console.error(error);
        return false;
      }
    };
    _this.getQuestionType = function () {
      try {
        return (0, _store.getCacheSync)(QUESTION_TYPE);
      } catch (error) {
        return '';
      }
    };
    _this.checkState = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var dispatchData, _ref6, dispatchState, dispatchRoomId, orderId, data;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _this.mxClient.getAccountData({ type: 'm.modular.swan.dispatch' });

            case 2:
              _context2.t0 = _context2.sent;

              if (_context2.t0) {
                _context2.next = 5;
                break;
              }

              _context2.t0 = {};

            case 5:
              dispatchData = _context2.t0;

              if (dispatchData.event) {
                _context2.next = 8;
                break;
              }

              return _context2.abrupt("return");

            case 8:
              _ref6 = typeof dispatchData.event.content === 'string' ? JSON.parse(dispatchData.event.content) : dispatchData.event.content, dispatchState = _ref6.dispatchState, dispatchRoomId = _ref6.dispatchRoomId, orderId = _ref6.orderId;
              _context2.next = 11;
              return _this.mxClient.getDispatchState({ orderId: orderId });

            case 11:
              data = _context2.sent;

              if (data) {
                _context2.next = 14;
                break;
              }

              return _context2.abrupt("return");

            case 14:
              if (!(data.dispatchState === dispatchState)) {
                _context2.next = 16;
                break;
              }

              return _context2.abrupt("return");

            case 16:
              _this.mxClient.reSendDispatchState({
                orderId: orderId,
                fcid: data.retailId,
                accountDataState: {
                  acceptRoomId: data.acceptRoomId,
                  dispatchRoomId: dispatchRoomId,
                  dispatchState: data.dispatchState,
                  from: data.from,
                  orderId: orderId,
                  questionType: '',
                  staffId: data.staffId,
                  pattern: data.pattern
                },
                roomState: {
                  acceptRoomId: data.acceptRoomId,
                  dispatchState: data.dispatchState,
                  filter: 'END',
                  orderId: orderId
                }
              });

            case 17:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, _this2);
    }));
    _this.close = function () {
      var dispatchState = _this.dispatchData.dispatchState;

      if (dispatchState === _dispatch.DispatchState.dispatching) return;
      _this.updateDispatchState({
        dispatchState: _dispatch.DispatchState.close,
        questionType: ''
      });
    };
    _this.selectQuestionType = function (questionType) {
      var dispatchState = _this.dispatchData.dispatchState;

      if (dispatchState !== _dispatch.DispatchState.close) return;
      _this.updateDispatchState({
        dispatchState: _dispatch.DispatchState.selected,
        questionType: questionType
      });
    };
    _this.dispatchData = {
      dispatchState: _dispatch.DispatchState.close,
      questionType: _this.getQuestionType(),
      from: '',
      orderId: '',
      pattern: '',
      dispatchRoomId: '',
      acceptRoomId: '',
      staffId: ''
    };
    _this.inited = false;
    _this.init();
    return _this;
  }

  _createClass(DispatchModule, [{
    key: "onUpdate",
    value: function onUpdate(callBack) {
      // make sure every call only register once
      this.eventCenter.off(DISPATCH_STATE_UPDATE, callBack);
      this.eventCenter.on(DISPATCH_STATE_UPDATE, callBack);
    }
  }, {
    key: "offUpdate",
    value: function offUpdate(callBack) {
      this.eventCenter.off(DISPATCH_STATE_UPDATE, callBack);
    }
  }, {
    key: "getState",
    value: function getState() {
      return this.dispatchData;
    }
  }]);

  return DispatchModule;
}(_base2.default);

exports.default = DispatchModule;