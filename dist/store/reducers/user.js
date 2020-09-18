"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = user;

var _user = require("../../constants/user.js");

var INITIAL_STATE = {
  info: null,
  session: null,
  location: null
};

function user() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var _ref = arguments[1];
  var type = _ref.type,
      userInfo = _ref.userInfo,
      userSession = _ref.userSession,
      userLocation = _ref.userLocation;

  switch (type) {
    case _user.SET_USER_INFO:
      return _extends({}, state, {
        info: userInfo
      });
    case _user.SET_USER_SESSION:
      return _extends({}, state, {
        session: userSession
      });
    case _user.SET_USER_LOCATION:
      return _extends({}, state, {
        location: userLocation
      });
    default:
      return state;
  }
}