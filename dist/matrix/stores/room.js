"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base = require("./base.js");

var _base2 = _interopRequireDefault(_base);

var _room = require("../interface/room.js");

var _store = require("../interface/store.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RoomStore = function (_BaseStore) {
  _inherits(RoomStore, _BaseStore);

  function RoomStore() {
    _classCallCheck(this, RoomStore);

    var _this = _possibleConstructorReturn(this, (RoomStore.__proto__ || Object.getPrototypeOf(RoomStore)).call(this, 'ROOM'));

    _this.roomList = [];
    _this.basicRoomList = [];
    return _this;
  }

  _createClass(RoomStore, [{
    key: "init",
    value: function init(rooms) {
      var _this2 = this;

      rooms.forEach(function (room) {
        _this2.store[room.id] = room;
      });
      this.roomList = rooms.sort(this.compareRoom);
      this.basicRoomList = this.buildBasicList();
    }
  }, {
    key: "buildBasicRoom",
    value: function buildBasicRoom(room) {
      // console.log(room);
      return {
        id: room.id,
        name: room.name,
        roomType: room.roomType,
        avatar: room.avatar,
        isOnline: room.isOnline,
        unread: room.unread,
        isHide: room.isHide,
        createdAt: room.createdAt,
        updatedAt: room.updatedAt,
        lastMessage: room.lastMessage,
        members: room.members,
        isChannel: room.isChannel,
        isArchive: room.isArchive,
        isDirect: room.isDirect,
        isNormalRobot: room.isNormalRobot,
        isCrossDomain: room.isCrossDomain,
        federate: room.federate,
        publicChannel: room.publicChannel,
        isSecret: room.isSecret,
        isGroup: room.isGroup,
        powerLevel: room.powerLevel,
        isDelete: room.isDelete
      };
    }
  }, {
    key: "beforeEmitUpdate",
    value: function beforeEmitUpdate(event) {
      var type = event.type,
          id = event.id,
          item = event.item;

      var curRoomIdx = this.roomList.findIndex(function (room) {
        return room.id === id;
      });
      switch (type) {
        case _store.Action.ADD:
          this.roomList = [].concat(_toConsumableArray(this.roomList), [item]).sort(this.compareRoom);
          break;
        case _store.Action.PUT:
          if (curRoomIdx === -1) {
            this.roomList = [].concat(_toConsumableArray(this.roomList), [item]).sort(this.compareRoom);
          } else {
            this.roomList[curRoomIdx] = item;
            this.roomList.sort(this.compareRoom);
          }
          break;
        case _store.Action.DELETE:
          this.roomList.filter(function (room) {
            return room.id !== id;
          });
          break;
        case _store.Action.UPDATE:
          this.roomList[curRoomIdx] = item;
          this.roomList.sort(this.compareRoom);
          break;
        default:
          break;
      }
      this.basicRoomList = this.buildBasicList();
    }
  }, {
    key: "compareRoom",
    value: function compareRoom(a, b) {
      return b.updatedAt - a.updatedAt;
    }
  }, {
    key: "filterBasicRoom",
    value: function filterBasicRoom(room, idx) {
      var MAX_NUM = 250;
      return room && room.membership !== 'leave' && room.roomType !== _room.RoomType.dispatch && !room.isHide && idx < MAX_NUM;
    }
  }, {
    key: "buildBasicList",
    value: function buildBasicList() {
      return this.roomList.filter(this.filterBasicRoom).map(this.buildBasicRoom);
    }
  }]);

  return RoomStore;
}(_base2.default);

exports.default = RoomStore;