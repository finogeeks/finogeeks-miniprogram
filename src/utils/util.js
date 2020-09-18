/*
 * @Author: Lero
 * @Description:
 * @Date: 2019-09-06 19:29:35
 * @LastEditTime: 2019-09-25 17:10:14
 */
import day from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

day.locale('zh-cn');
day.extend(relativeTime);

export const formatTime = (time, relative = true) => {
  if (!time) {
    return '';
  }

  const momentTweet = day(time);
  const momentNow = day();
  if (momentTweet.isSame(momentNow, 'day') && relative) {
    return momentTweet.fromNow();
  } else if (momentTweet.isSame(momentNow, 'year')) {
    return momentTweet.format('M月D日 HH:mm');
  }

  return momentTweet.format('YYYY年M月D日 HH:mm');
};

export const throttle = (fn, delay) => {
  let timer = null;
  return function() {
    var context = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(context, args);
    }, delay);
  };
};

export const parseParams = url => {
  const ret = {};
  const arr = url.split('?');
  const seg = arr[arr.length - 1].split('&');
  const len = seg.length;
  let i = 0,
    s;
  for (; i < len; i++) {
    if (!seg[i]) {
      continue;
    }
    s = seg[i].split('=');
    ret[s[0]] = s[1];
  }
  return ret;
};

export const formatCount = count => {
  const num = parseInt(count);

  if (num <= 0) {
    return '';
  } else if (num >= 100000) {
    return '10W+';
  } else if (num >= 10000) {
    return parseInt(num / 1000) / 10 + 'W';
  }

  return num;
};

export const sliceTweet = (str, len) => {
  const strArr = Array.from(str);
  const strLen = strArr.length;
  return len > strLen ? str : `${strArr.slice(0, len).join('')}...`;
};

export const hexToRgba = (hex, opacity = 1) => {
  let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;

  let sColor = hex.toLowerCase();

  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      let sColorNew = '#';
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    //处理六位的颜色值
    let sColorChange = [];
    for (var i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)));
    }

    return 'rgba(' + sColorChange.join(',') + ',' + opacity + ')';
  } else {
    return sColor;
  }
};

export const toThousands = num => {
  let formateNum = (num || 0).toString();
  const temp = formateNum.length % 3;
  switch (temp) {
    case 1:
      formateNum = '00' + formateNum;
      break;
    case 2:
      formateNum = '0' + formateNum;
      break;
  }
  return formateNum
    .match(/\d{3}/g)
    .join(',')
    .replace(/^0+/, '');
};

// 随机生成UUID（V4）
export function generateUuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// 处理股票文本
export function handleStock(string) {
  string = string.replace(' ', '\u00a0');
  const enterArr = string.split('\n');
  const pArr = [
    {
      name: 'p',
      class: 'customize-rich-p',
      value: '',
      style: '',
    },
  ];
  let dataArr = [];
  let resultArr = [];
  enterArr.forEach(element => {
    let stockTexts = [];
    // eslint-disable-next-line no-control-regex
    const reg = /\$S[Z|H]\d{6}\s<.+>\$/g;
    const stocks = element.match(reg);
    const array = element.split(reg);
    // 去除数组最后一个空值
    if (array[array.length - 1] === '') array.pop();
    array.forEach((item, index) => {
      stockTexts.push({
        name: 'span',
        class: 'customize-rich-span',
        value: item,
        style: '',
      });
      if (stocks && stocks[index]) {
        stockTexts.push({
          name: 'stock',
          class: 'customize-rich-stock',
          value: stocks[index],
          style: 'text-decoration:underline;color:#4285f4',
        });
      }
    });
    stockTexts.forEach(e => {
      if (e.name === 'stock') {
        e.displayValue = e.value.match(/<(\S*)>/)[1];
      }
    });
    dataArr.push(stockTexts);
  });
  dataArr.forEach(element => {
    resultArr.push(element);
    resultArr.push(pArr);
  });
  return resultArr.flat();
}

export function cleanStock(string) {
  const reg1 = /\$S[Z|H]\d{6}\s</g;
  const reg2 = />\$/g;
  const string1 = string.replace(reg1, '');
  const string2 = string1.replace(reg2, '');
  return string2;
}

export default {
  formatTime,
  throttle,
  parseParams,
  sliceTweet,
  formatCount,
  hexToRgba,
  handleStock,
  cleanStock,
};
