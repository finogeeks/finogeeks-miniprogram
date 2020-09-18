// import {
//   navigateTo,
//   navigateBack,
//   switchTab,
//   getCurrentPages,
// } from '@tarojs/taro';
import {
  NAV_PAGES,
  NAV_INIT,
  NAV_REDIRECT,
  NAV_TO,
  NAV_BACK,
  NAV_SWITCH_TAB,
  CHANGE_PARAMS,
} from '@/constants/navigation';

const INITIAL_STATE = {
  curPage: null, // { url, params }
  pageStack: null, // [page]
  tabBarUrls: [NAV_PAGES.HOME, NAV_PAGES.ME],
  style: {
    navHeight: 0,
    statusBarHeight: 0,
    headerHeight: 0,
    maxTitleWidth: 0,
  },
};

export default function navigation(
  state = INITIAL_STATE,
  { type, initPages, page, initStyle },
) {
  switch (type) {
    case NAV_INIT:
      return {
        ...state,
        curPage: initPages[initPages.length - 1],
        pageStack: [...initPages],
        style: { ...initStyle },
      };
    case NAV_REDIRECT:
      const newPageStack = [...state.pageStack];
      newPageStack[newPageStack.length - 1] = page;
      console.log('newPageStack', newPageStack);
      return {
        ...state,
        curPage: page,
        pageStack: newPageStack,
      };
    case NAV_TO:
      return {
        ...state,
        curPage: page,
        pageStack: [...state.pageStack, page],
      };
    case NAV_BACK:
      const length = state.pageStack.length;
      if (length > 1) {
        return {
          ...state,
          curPage: state.pageStack[state.pageStack.length - 2],
          pageStack: state.pageStack.slice(0, state.pageStack.length - 1),
        };
      }
      return state;
    case NAV_SWITCH_TAB:
      return {
        ...state,
        curPage: page,
        pageStack: [page],
      };
    case CHANGE_PARAMS:
      return {
        ...state,
        curPage: page,
        pageStack: [page],
      }
    default:
      return state;
  }
}
