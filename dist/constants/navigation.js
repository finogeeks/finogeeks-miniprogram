'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var NAV_PAGES = {
  HOME: '/pages/home/index',
  LOGIN: '/pages/login/index',
  ME: '/pages/me/index',
  ROOM: '/pages/room/index',
  MEDIA_PREVIEW: '/pages/media-preview/index',
  ROOM_DETAIL: '/pages/room-detail/index',
  ADVISOR: '/packages/common/pages/advisor/index',
  BINDING: '/packages/common/pages/binding/index',
  HISTORY: '/packages/common/pages/history/index',
  LEAVE_MESSAGE: '/packages/common/pages/leave-message/index',
  MESSAGE_DETAIL: '/packages/common/pages/message-detail/index',
  PRIVACY: '/packages/common/pages/privacy/index',
  WEBVIEW: '/packages/common/pages/webview/index',
  SETTING: '/packages/common/pages/settings/index',
  ACTIVITY_DETAIL: '/studio/pages/activity/ActivityDetail',
  VIEW_MICRO_WEB: '/packages/micro-web/pages/home/index',
  JOINROOM: '/pages/join-room/index'
};

var MERGE_ROUTE_CONFIG = {
  SWAN_LOGIN: '/pages/login/index',
  SWAN_RPODUCT_RESERVATION: '/packages/micro-web/pages/reservation/index',
  STUDIO_TWEET: '/studio/pages/tweet/tweet',
  STUDIO_WEBVIEW: '/studio/pages/public/webview',
  STUDIO_TWEET_DETAIL: '/studio/pages/tweet/tweet-detail',
  STUDIO_SQUARE_STAFFS: '/studio/pages/square/square-staffs',
  STUDIO_ACTIVITY_DETAIL: '/studio/pages/activity/activity-detail',
  STUDIO_KNOWLEDGE_DETAIL: '/studio/pages/knowledge/knowledge-detail',
  STUDIO_PRODUCT_DETAIL: '/studio/pages/product/product-detail',
  STUDIO_STAFF: '/studio/pages/staff/staff',
  STUDIO_PUBLIC_ERROR: '/studio/pages/public/error',
  STUDIO_PUBLIC_DOWNLOAD_APP: '/studio/pages/public/download-app',
  COMMON_WEBVIEW: '/packages/common/pages/webview/index'
};

var NAV_REDIRECT = 'NAV_REDIRECT';
var NAV_TO = 'NAV_TO';
var NAV_BACK = 'NAV_BACK';
var NAV_SWITCH_TAB = 'NAV_SWITCH_TAB';
var NAV_INIT = 'NAV_INIT';
var CHANGE_PARAMS = 'CHANGE_PARAMS';

exports.NAV_PAGES = NAV_PAGES;
exports.NAV_INIT = NAV_INIT;
exports.NAV_REDIRECT = NAV_REDIRECT;
exports.NAV_TO = NAV_TO;
exports.NAV_BACK = NAV_BACK;
exports.NAV_SWITCH_TAB = NAV_SWITCH_TAB;
exports.MERGE_ROUTE_CONFIG = MERGE_ROUTE_CONFIG;
exports.CHANGE_PARAMS = CHANGE_PARAMS;