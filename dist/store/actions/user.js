"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setUserInfo = setUserInfo;
exports.setUserSession = setUserSession;
exports.setUserLocaton = setUserLocaton;

var _user = require("../../constants/user.js");

function setUserInfo(userInfo) {
  return {
    type: _user.SET_USER_INFO,
    userInfo: userInfo
  };
}

function setUserSession(userSession) {
  return {
    type: _user.SET_USER_SESSION,
    userSession: userSession
  };
}

function setUserLocaton(userLocation) {
  return {
    type: _user.SET_USER_LOCATION,
    userLocation: userLocation
  };
}