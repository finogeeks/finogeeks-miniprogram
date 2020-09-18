'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base = require('./base.js');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RoomModule = function (_BaseModule) {
  _inherits(RoomModule, _BaseModule);

  function RoomModule(mxClient, opts) {
    var _this2 = this;

    _classCallCheck(this, RoomModule);

    var _this = _possibleConstructorReturn(this, (RoomModule.__proto__ || Object.getPrototypeOf(RoomModule)).call(this, mxClient, opts));

    _this.init = function () {
      var mxRooms = _this.mxClient.getRooms();
      // console.log('mxRooms: ', mxRooms);
      var rooms = mxRooms.map(_this.buildRoom);
      // console.log('rooms: ', rooms);
      _this.store.room.init(rooms);
      _this.mxClient.on('Room', function (mxRoom) {
        return _this.handleRoomUpdate(mxRoom.roomId);
      });
      _this.mxClient.on('Room.accountData', function (mxEvent, mxRoom) {
        return _this.handleRoomUpdate(mxRoom.roomId);
      });
      _this.mxClient.on('Room.name', function (mxRoom) {
        return _this.handleRoomUpdate(mxRoom.roomId);
      });
      _this.mxClient.on('Room.receipt', function (mxEvent, mxRoom) {
        return _this.handleRoomUpdate(mxRoom.roomId);
      });
      _this.mxClient.on('Room.tags', function (mxEvent, mxRoom) {
        return _this.handleRoomUpdate(mxRoom.roomId);
      });
      _this.mxClient.on('RoomState.events', function (mxEvent, mxState) {
        return _this.handleRoomUpdate(mxState.roomId);
      });
      _this.mxClient.on('RoomState.members', function (mxEvent, mxState, mxMember) {
        return _this.handleRoomUpdate(mxMember.roomId);
      });
      _this.mxClient.on('RoomMember.membership', function (mxEvent, mxMember, oldMembership) {
        return _this.handleRoomUpdate(mxMember.roomId);
      });
    };
    _this.handleRoomUpdate = function (roomId) {
      // console.log('handleRoomUpdate');
      var mxRoom = _this.mxClient.getRoom(roomId);
      // console.log(mxRoom);
      if (!mxRoom) return;
      var newRoom = _this.buildRoom(mxRoom);
      if (!newRoom) return;
      _this.store.room.put(roomId, newRoom);
    };
    _this.waitRoomReady = function (roomId, join) {
      return new Promise(function (resolve) {
        var room = _this.store.room.get(roomId);
        if (!room) {
          var mxRoom = _this.mxClient.getRoom(roomId);
          room = _this.buildRoom(mxRoom);
        }
        // console.log('room', room);
        if (_this.isRoomReady(room, join)) resolve(room);
        var resolveRoom = function () {
          var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(mxRoom) {
            var newRoom;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (mxRoom) {
                      _context.next = 2;
                      break;
                    }

                    return _context.abrupt('return');

                  case 2:
                    newRoom = _this.buildRoom(mxRoom);

                    if (_this.isRoomReady(newRoom)) {
                      _this.mxClient.off('Room', resolveRoom);
                      resolve(newRoom);
                    }

                  case 4:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, _this2);
          }));

          return function resolveRoom(_x) {
            return _ref.apply(this, arguments);
          };
        }();
        // 设置等待超时时间
        setTimeout(function () {
          _this.mxClient.off('Room', resolveRoom);
          resolve(null);
        }, 5000);
        _this.mxClient.on('Room', resolveRoom);
      });
    };
    _this.isRoomReady = function (room, join) {
      return !!room && (room.membership === 'join' || join);
    };
    _this.getRoom = function (roomId) {
      return _this.getLocalRoom(roomId);
    };
    _this.getBasicRooms = function () {
      return _this.store.room.basicRoomList;
    };
    _this.getRooms = function () {
      return _this.store.room.roomList;
    };
    _this.getRoomGroupAvatar = function (roomId) {
      var room = _this.store.room.get(roomId);
      if (!room || !room.members) return [];
      return room.members.slice(0, 4).map(function (member) {
        return member.avatar;
      });
    };
    _this.hideRoom = function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(roomId) {
        var success;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _this.mxClient.setRoomTag(roomId, 'delete', { hiddenAt: Date.now() });

              case 3:
                success = _context2.sent;
                return _context2.abrupt('return', success);

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2['catch'](0);
                return _context2.abrupt('return', false);

              case 10:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2, [[0, 7]]);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }();
    _this.init();
    return _this;
  }

  _createClass(RoomModule, [{
    key: 'onUpdate',
    value: function onUpdate(cb) {
      return this.store.room.onUpdate(cb);
    }
  }]);

  return RoomModule;
}(_base2.default);

exports.default = RoomModule;