"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toThousands = exports.hexToRgba = exports.sliceTweet = exports.formatCount = exports.parseParams = exports.throttle = exports.formatTime = undefined;
exports.generateUuid = generateUuid;
exports.handleStock = handleStock;
exports.cleanStock = cleanStock;

var _dayjsMin = require("../npm/dayjs/dayjs.min.js");

var _dayjsMin2 = _interopRequireDefault(_dayjsMin);

var _relativeTime = require("../npm/dayjs/plugin/relativeTime.js");

var _relativeTime2 = _interopRequireDefault(_relativeTime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * @Author: Lero
 * @Description:
 * @Date: 2019-09-06 19:29:35
 * @LastEditTime: 2019-09-25 17:10:14
 */
_dayjsMin2.default.locale('zh-cn');
_dayjsMin2.default.extend(_relativeTime2.default);

var formatTime = exports.formatTime = function formatTime(time) {
  var relative = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  if (!time) {
    return '';
  }

  var momentTweet = (0, _dayjsMin2.default)(time);
  var momentNow = (0, _dayjsMin2.default)();
  if (momentTweet.isSame(momentNow, 'day') && relative) {
    return momentTweet.fromNow();
  } else if (momentTweet.isSame(momentNow, 'year')) {
    return momentTweet.format('M月D日 HH:mm');
  }

  return momentTweet.format('YYYY年M月D日 HH:mm');
};

var throttle = exports.throttle = function throttle(fn, delay) {
  var timer = null;
  return function () {
    var context = this,
        args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
};

var parseParams = exports.parseParams = function parseParams(url) {
  var ret = {};
  var arr = url.split('?');
  var seg = arr[arr.length - 1].split('&');
  var len = seg.length;
  var i = 0,
      s = void 0;
  for (; i < len; i++) {
    if (!seg[i]) {
      continue;
    }
    s = seg[i].split('=');
    ret[s[0]] = s[1];
  }
  return ret;
};

var formatCount = exports.formatCount = function formatCount(count) {
  var num = parseInt(count);

  if (num <= 0) {
    return '';
  } else if (num >= 100000) {
    return '10W+';
  } else if (num >= 10000) {
    return parseInt(num / 1000) / 10 + 'W';
  }

  return num;
};

var sliceTweet = exports.sliceTweet = function sliceTweet(str, len) {
  var strArr = Array.from(str);
  var strLen = strArr.length;
  return len > strLen ? str : strArr.slice(0, len).join('') + "...";
};

var hexToRgba = exports.hexToRgba = function hexToRgba(hex) {
  var opacity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;

  var sColor = hex.toLowerCase();

  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = '#';
      for (var _i = 1; _i < 4; _i += 1) {
        sColorNew += sColor.slice(_i, _i + 1).concat(sColor.slice(_i, _i + 1));
      }
      sColor = sColorNew;
    }
    //处理六位的颜色值
    var sColorChange = [];
    for (var i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)));
    }

    return 'rgba(' + sColorChange.join(',') + ',' + opacity + ')';
  } else {
    return sColor;
  }
};

var toThousands = exports.toThousands = function toThousands(num) {
  var formateNum = (num || 0).toString();
  var temp = formateNum.length % 3;
  switch (temp) {
    case 1:
      formateNum = '00' + formateNum;
      break;
    case 2:
      formateNum = '0' + formateNum;
      break;
  }
  return formateNum.match(/\d{3}/g).join(',').replace(/^0+/, '');
};

// 随机生成UUID（V4）
function generateUuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}

// 处理股票文本
function handleStock(string) {
  string = string.replace(' ', "\xA0");
  var enterArr = string.split('\n');
  var pArr = [{
    name: 'p',
    class: 'customize-rich-p',
    value: '',
    style: ''
  }];
  var dataArr = [];
  var resultArr = [];
  enterArr.forEach(function (element) {
    var stockTexts = [];
    // eslint-disable-next-line no-control-regex
    var reg = /\$S[Z|H]\d{6}\s<.+>\$/g;
    var stocks = element.match(reg);
    var array = element.split(reg);
    // 去除数组最后一个空值
    if (array[array.length - 1] === '') array.pop();
    array.forEach(function (item, index) {
      stockTexts.push({
        name: 'span',
        class: 'customize-rich-span',
        value: item,
        style: ''
      });
      if (stocks && stocks[index]) {
        stockTexts.push({
          name: 'stock',
          class: 'customize-rich-stock',
          value: stocks[index],
          style: 'text-decoration:underline;color:#4285f4'
        });
      }
    });
    stockTexts.forEach(function (e) {
      if (e.name === 'stock') {
        e.displayValue = e.value.match(/<(\S*)>/)[1];
      }
    });
    dataArr.push(stockTexts);
  });
  dataArr.forEach(function (element) {
    resultArr.push(element);
    resultArr.push(pArr);
  });
  return resultArr.flat();
}

function cleanStock(string) {
  var reg1 = /\$S[Z|H]\d{6}\s</g;
  var reg2 = />\$/g;
  var string1 = string.replace(reg1, '');
  var string2 = string1.replace(reg2, '');
  return string2;
}

exports.default = {
  formatTime: formatTime,
  throttle: throttle,
  parseParams: parseParams,
  sliceTweet: sliceTweet,
  formatCount: formatCount,
  hexToRgba: hexToRgba,
  handleStock: handleStock,
  cleanStock: cleanStock
};