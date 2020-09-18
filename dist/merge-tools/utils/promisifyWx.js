"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function promisifyWx(originFunc) {
  return function (params) {
    return new Promise(function (resolve, reject) {
      originFunc(_extends({}, params, {
        success: function success(e) {
          return resolve(e);
        },
        fail: function fail(e) {
          return reject(e);
        }
      }));
    });
  };
}

exports.default = promisifyWx;