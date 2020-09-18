'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base = require('./base.js');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserModule = function (_BaseModule) {
  _inherits(UserModule, _BaseModule);

  function UserModule(mxClient, opts) {
    var _this2 = this;

    _classCallCheck(this, UserModule);

    var _this = _possibleConstructorReturn(this, (UserModule.__proto__ || Object.getPrototypeOf(UserModule)).call(this, mxClient, opts));

    _this.handleUserUpdate = function (mxUser) {
      if (!mxUser) return;
      var user = _this.buildUser(mxUser);
      _this.store.user.put(user.id, user);
      var rooms = _this.store.room.roomList;
      rooms.forEach(function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(room) {
          var mxRoom, newRoom;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (room.avatarUserIds.includes(user.id)) {
                    _context.next = 2;
                    break;
                  }

                  return _context.abrupt('return');

                case 2:
                  mxRoom = _this.mxClient.getRoom(room.id);
                  newRoom = _this.buildRoom(mxRoom);

                  if (newRoom) {
                    _context.next = 6;
                    break;
                  }

                  return _context.abrupt('return');

                case 6:
                  _this.store.room.put(room.id, newRoom);

                case 7:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this2);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());
    };
    _this.getUser = function (userId) {
      return _this.getLocalUser(userId);
    };
    _this.setAvatarUrl = function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url) {
        var me;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _this.mxClient.setAvatarUrl(url);

              case 3:
                me = _this.getUser(_this.myUserId);

                _this.store.user.put(me.id, _extends({}, me, {
                  avatar: url
                }));
                _context2.next = 10;
                break;

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
    _this.setDisplayName = function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(name) {
        var me;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _this.mxClient.setDispalyName(name);

              case 3:
                me = _this.getUser(_this.myUserId);

                _this.store.user.put(me.id, _extends({}, me, {
                  avatar: name
                }));
                _context3.next = 10;
                break;

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3['catch'](0);
                return _context3.abrupt('return', false);

              case 10:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this2, [[0, 7]]);
      }));

      return function (_x3) {
        return _ref3.apply(this, arguments);
      };
    }();
    _this.init();
    return _this;
  }

  _createClass(UserModule, [{
    key: 'init',
    value: function init() {
      var _this3 = this;

      var mxUsers = this.mxClient.getUsers();
      var users = mxUsers.filter(function (user) {
        return !!user;
      }).map(this.buildUser);
      console.log('users', users);
      this.store.user.init(users);
      this.mxClient.on('User.avatarUrl', function (mxEvent, mxUser) {
        return _this3.handleUserUpdate(mxUser);
      });
      this.mxClient.on('User.displayName', function (mxEvent, mxUser) {
        return _this3.handleUserUpdate(mxUser);
      });
      this.mxClient.on('User.presence', function (mxEvent, mxUser) {
        return _this3.handleUserUpdate(mxUser);
      });
    }
  }, {
    key: 'onUpdate',
    value: function onUpdate(cb) {
      return this.store.user.onUpdate(cb);
    }
  }, {
    key: 'transUrl',
    value: function transUrl(rawUrl) {
      return this.urlTransfer(rawUrl);
    }
  }]);

  return UserModule;
}(_base2.default);

exports.default = UserModule;