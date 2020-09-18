"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = search;

var _search = require("../../constants/search.js");

var INITIAL_STATE = {};

function search() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var _ref = arguments[1];
  var type = _ref.type,
      searchResult = _ref.searchResult;

  switch (type) {
    case _search.UPDATE_SEARCH_RESULT:
      console.log('==========UPDATE_SEARCH_RESULT========');
      console.log(searchResult);
      return _extends({}, state, {
        searchResult: searchResult
      });
    default:
      return state;
  }
}