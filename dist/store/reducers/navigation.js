"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // import {
//   navigateTo,
//   navigateBack,
//   switchTab,
//   getCurrentPages,
// } from '@tarojs/taro';


exports.default = navigation;

var _navigation = require("../../constants/navigation.js");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var INITIAL_STATE = {
  curPage: null, // { url, params }
  pageStack: null, // [page]
  tabBarUrls: [_navigation.NAV_PAGES.HOME, _navigation.NAV_PAGES.ME],
  style: {
    navHeight: 0,
    statusBarHeight: 0,
    headerHeight: 0,
    maxTitleWidth: 0
  }
};

function navigation() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var _ref = arguments[1];
  var type = _ref.type,
      initPages = _ref.initPages,
      page = _ref.page,
      initStyle = _ref.initStyle;

  switch (type) {
    case _navigation.NAV_INIT:
      return _extends({}, state, {
        curPage: initPages[initPages.length - 1],
        pageStack: [].concat(_toConsumableArray(initPages)),
        style: _extends({}, initStyle)
      });
    case _navigation.NAV_REDIRECT:
      var newPageStack = [].concat(_toConsumableArray(state.pageStack));
      newPageStack[newPageStack.length - 1] = page;
      console.log('newPageStack', newPageStack);
      return _extends({}, state, {
        curPage: page,
        pageStack: newPageStack
      });
    case _navigation.NAV_TO:
      return _extends({}, state, {
        curPage: page,
        pageStack: [].concat(_toConsumableArray(state.pageStack), [page])
      });
    case _navigation.NAV_BACK:
      var length = state.pageStack.length;
      if (length > 1) {
        return _extends({}, state, {
          curPage: state.pageStack[state.pageStack.length - 2],
          pageStack: state.pageStack.slice(0, state.pageStack.length - 1)
        });
      }
      return state;
    case _navigation.NAV_SWITCH_TAB:
      return _extends({}, state, {
        curPage: page,
        pageStack: [page]
      });
    case _navigation.CHANGE_PARAMS:
      return _extends({}, state, {
        curPage: page,
        pageStack: [page]
      });
    default:
      return state;
  }
}