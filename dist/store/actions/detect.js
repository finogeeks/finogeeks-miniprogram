"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveDetectState = saveDetectState;

var _detect = require("../../constants/detect.js");

function saveDetectState(detect) {
  console.log('==========SAVE_DETECT_STATE========');
  console.log(detect);
  return {
    type: _detect.SAVE_DETECT_STATE,
    detect: detect
  };
}