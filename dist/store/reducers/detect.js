"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = detect;

var _detect = require("../../constants/detect.js");

var INITIAL_STATE = {};

function detect() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var _ref = arguments[1];
  var type = _ref.type,
      detect = _ref.detect;

  switch (type) {
    case _detect.SAVE_DETECT_STATE:
      console.log('==========SAVE_DETECT_STATE========');
      console.log(detect);
      console.log(Object.assign(state, detect));
      return Object.assign(state, detect);
    default:
      return state;
  }
}