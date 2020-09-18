"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _room = require("./room.js");

var _room2 = _interopRequireDefault(_room);

var _user = require("./user.js");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var IMStore = function IMStore() {
  _classCallCheck(this, IMStore);

  this.room = new _room2.default();
  this.user = new _user2.default();
};

exports.default = IMStore;