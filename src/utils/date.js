import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';

// const config = {
//   months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
//   monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
//   weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
//   weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
//   weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
//   longDateFormat: {
//     LT: 'HH:mm',
//     LTS: 'HH:mm:ss',
//     L: 'YYYY-MM-DD',
//     LL: 'YYYY年MM月DD日',
//     LLL: 'YYYY年MM月DD日Ah点mm分',
//     LLLL: 'YYYY年MM月DD日ddddAh点mm分',
//     l: 'YYYY-M-D',
//     ll: 'YYYY年M月D日',
//     lll: 'YYYY年M月D日 HH:mm',
//     llll: 'YYYY年M月D日dddd HH:mm'
//   },
//   meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
//   meridiemHour: function (hour, meridiem) {
//     if (hour === 12) {
//       hour = 0;
//     }
//     if (meridiem === '凌晨' || meridiem === '早上' ||
//       meridiem === '上午') {
//       return hour;
//     } else if (meridiem === '下午' || meridiem === '晚上') {
//       return hour + 12;
//     } else {
//       return hour >= 11 ? hour : hour + 12;
//     }
//   },
//   meridiem: function (hour, minute) {
//     const hm = hour * 100 + minute;
//     if (hm < 600) {
//       return '凌晨';
//     } else if (hm < 900) {
//       return '早上';
//     } else if (hm < 1130) {
//       return '上午';
//     } else if (hm < 1230) {
//       return '中午';
//     } else if (hm < 1800) {
//       return '下午';
//     } else {
//       return '晚上';
//     }
//   },
//   calendar: {
//     sameDay: '[今天]LT',
//     nextDay: '[明天]LT',
//     nextWeek: '[下]ddddLT',
//     lastDay: '[昨天]LT',
//     lastWeek: '[上]ddddLT',
//     sameElse: 'L'
//   },
//   dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/,
//   ordinal: function (number, period) {
//     switch (period) {
//       case 'd':
//       case 'D':
//       case 'DDD':
//         return number + '日';
//       case 'M':
//         return number + '月';
//       case 'w':
//       case 'W':
//         return number + '周';
//       default:
//         return number;
//     }
//   },
//   relativeTime: {
//     future: '%s内',
//     past: function (number) {
//       console.log('number', number);
//       if (number === '昨天') return number
//       return `${number}前`
//     },
//     s: '几秒',
//     ss: '%d秒',
//     m: '1分钟',
//     mm: '%d分钟',
//     h: '1小时',
//     hh: '%d小时',
//     d: '昨天',
//     dd: '%d天',
//     M: '1个月',
//     MM: '%d个月',
//     y: '1年',
//     yy: '%d年'
//   },
//   week: {
//     // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
//     dow: 1, // Monday is the first day of the week.
//     doy: 4  // The week that contains Jan 4th is the first week of the year.
//   }
// }

dayjs.locale('zh-cn');
dayjs.extend(relativeTime);
// import dayjs from 'dayjs';
// dayjs.locale(config, null, true)

export default dayjs;

export function formatTimestamp(timestamp, id) {
  const curTime = dayjs();
  const curWeek = curTime.day();
  const curDay = curTime.date();
  const curYear = curTime.year();
  const curMonth = curTime.month();
  const time = dayjs(timestamp);
  const week = time.day();
  const day = time.date();
  const year = time.year();
  const month = time.month();
  let weekfirstday = curTime.valueOf() - (1000*3600*24*(curWeek-1));
  weekfirstday = new Date(weekfirstday).setHours(0);
  weekfirstday = new Date(weekfirstday).setMinutes(0);
  weekfirstday = new Date(weekfirstday).setSeconds(0);
  // if (id === '!152949689514196992:finogeeks.club') {
  //   console.log('formatTimestamp');
  //   console.log(time, week, day, year, month);
  //   console.log(curTime, curWeek, curDay, curYear, curMonth, curTime.valueOf());
  //   console.log(curTime.valueOf(), time.valueOf(), weekfirstday);
  // }
  if (curYear === year) {
    if (curWeek === week && (time.valueOf() > weekfirstday || time.valueOf() === weekfirstday)) {
      if (curDay === day) {
        return time.format('HH:mm');
      }
      return time.format('ddd HH:mm');
    }
    return time.format('MM/DD HH:mm');
  }
  return time.format('YYYY/MM/DD HH:mm');
}

export function getRelativeTime(timestamp) {
  try {
    const curTime = dayjs();
    const curWeek = curTime.day();
    const curDay = curTime.date();
    const curYear = curTime.year();
    const time = dayjs(timestamp);
    const week = time.day();
    const day = time.date();
    const year = time.year();

    if (curDay === day || curDay - 1 === day) {
      const curTimeValue = dayjs(timestamp).fromNow();
      return curTimeValue === '昨天'
        ? `${curTimeValue} ${time.format('HH:mm')}`
        : time.format('HH:mm');
    }
    if (curTime.valueOf() - timestamp <= 1000 * 60 * 60 * 24 * 7)
      return time.format('ddd HH:mm');
    return time.format('YYYY年MM月DD日 HH:mm');
  } catch (error) {
    console.log('time error', error);
  }
}
