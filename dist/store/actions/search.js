"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateSearch = updateSearch;

var _search = require("../../constants/search.js");

function updateSearch(_ref) {
  var searchResult = _ref.searchResult;

  console.log('==========UPDATE_SEARCH_RESULT========');
  console.log(searchResult);
  return {
    type: _search.UPDATE_SEARCH_RESULT,
    searchResult: searchResult
  };
}