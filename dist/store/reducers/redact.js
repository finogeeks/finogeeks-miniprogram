"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = redact;

var _redact = require("../../constants/redact.js");

var INITIAL_STATE = {};

function redact() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var _ref = arguments[1];
  var type = _ref.type,
      redact = _ref.redact;

  switch (type) {
    case _redact.SAVE_REDACT_MESSAGE:
      console.log('==========SAVE_REDACT_MESSAGE========');
      console.log(redact);
      console.log(Object.assign(state, redact));
      return Object.assign(state, redact);
    default:
      return state;
  }
}