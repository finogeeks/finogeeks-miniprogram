"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require("../../npm/redux/lib/redux.js");

var _navigation = require("./navigation.js");

var _navigation2 = _interopRequireDefault(_navigation);

var _user = require("./user.js");

var _user2 = _interopRequireDefault(_user);

var _search = require("./search.js");

var _search2 = _interopRequireDefault(_search);

var _redact = require("./redact.js");

var _redact2 = _interopRequireDefault(_redact);

var _room = require("./room.js");

var _room2 = _interopRequireDefault(_room);

var _detect = require("./detect.js");

var _detect2 = _interopRequireDefault(_detect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
  navigation: _navigation2.default,
  user: _user2.default,
  search: _search2.default,
  redact: _redact2.default,
  room: _room2.default,
  detect: _detect2.default
});