"use strict";
function makeEmptyFunction(t) {
  return function () {
    return t;
  };
}var emptyFunction = function () {};emptyFunction.thatReturns = makeEmptyFunction, emptyFunction.thatReturnsFalse = makeEmptyFunction(false), emptyFunction.thatReturnsTrue = makeEmptyFunction(true), emptyFunction.thatReturnsNull = makeEmptyFunction(null), emptyFunction.thatReturnsThis = function () {
  return this;
}, emptyFunction.thatReturnsArgument = function (t) {
  return t;
}, module.exports = emptyFunction;