'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var isCompatible = exports.isCompatible = function isCompatible(version) {
  if (typeof version !== 'string') {
    return false;
  }
  var versionPatterns = version.split('.');
  var minVersionPatterns = "2.1.2".split('.');
  if (minVersionPatterns.length !== versionPatterns.length) {
    return false;
  }
  for (var index = 0; index < versionPatterns.length; index += 1) {
    var pattern = Number(versionPatterns[index]);
    var minPattern = Number(minVersionPatterns[index]);
    if (pattern > minPattern) {
      return true;
    } else if (pattern < minPattern) {
      return false;
    } else if (index === versionPatterns.length - 1 && pattern >= minPattern) {
      return true;
    }
  }
  return false;
};

var version = exports.version = '1.0.0';

exports.default = {
  isCompatible: isCompatible,
  version: version
};