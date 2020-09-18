import Taro from '@tarojs/taro';
import { formatUrlParams } from '@/utils/tool';
import {
  // NAV_PAGES,
  NAV_INIT,
  NAV_REDIRECT,
  NAV_TO,
  NAV_BACK,
  NAV_SWITCH_TAB,
} from '@/constants/navigation';

export const navigateTo = (url, params) => {
  return async dispatch => {
    try {
      const pageUrl = formatUrlParams(url, params);
      dispatch({
        type: NAV_TO,
        page: {
          url,
          params,
        },
      });
      await Taro.navigateTo({ url: pageUrl });
    } catch (error) {}
  };
};

export const navigateBack = () => {
  return async dispatch => {
    try {
      dispatch({
        type: NAV_BACK,
      });
      await Taro.navigateBack();
    } catch (error) {}
  };
};

export const switchTab = (url, params) => {
  console.log('switchtab: ', params);
  return async (dispatch, getState) => {
    const { navigation } = getState();
    // console.log(navigation.curPage.url, url);
    // if (navigation.curPage.url === url) return;
    try {
      const pageUrl = formatUrlParams(url, params);
      await dispatch({
        type: NAV_SWITCH_TAB,
        page: {
          url,
          params,
        },
      });
      await Taro.switchTab({ url: pageUrl });
    } catch (error) {}
  };
};

export const changeParams = (url) => {
  return async (dispatch, getState) => {
    // console.log(navigation.curPage.url, url);
    // if (navigation.curPage.url === url) return;
    try {
      const pageUrl = formatUrlParams(url, params);
      await dispatch({
        type: CHANGE_PARAMS,
        page: {
          url,
          params: null,
        },
      });
    } catch (error) {}
  };
};

export const redirectTo = (url, params) => {
  return async dispatch => {
    try {
      const pageUrl = formatUrlParams(url, params);
      dispatch({
        type: NAV_REDIRECT,
        page: {
          url,
          params,
        },
      });
      await Taro.redirectTo({ url: pageUrl });
    } catch (error) {}
  };
};

export const initNavigation = (initPages, initStyle) => {
  return async dispatch => {
    try {
      dispatch({
        type: NAV_INIT,
        initPages,
        initStyle,
      });
    } catch (error) {}
  };
};
