import {
  navigateTo,
  navigateBack,
  switchTab,
  redirectTo,
  initNavigation,
} from '@/actions/navigation';
import { formatUrlParams } from '@/utils/tool';
import Taro from '@tarojs/taro';
import { NAV_PAGES } from '@/constants/navigation';
import store from '../store/index';

class WxRouter {
  navigateTo(url, params) {
    // webview 不支持自定义 navbar, 特殊处理
    if (url === NAV_PAGES.WEBVIEW) {
      const pageUrl = formatUrlParams(url, params);
      return Taro.navigateTo({ url: pageUrl });
    }
    return store.dispatch(navigateTo(url, params));
  }

  navigateBack() {
    return store.dispatch(navigateBack());
  }

  redirectTo(url, params) {
    if (url === NAV_PAGES.WEBVIEW) {
      const pageUrl = formatUrlParams(url, params);
      return Taro.redirectTo({ url: pageUrl });
    }
    return store.dispatch(redirectTo(url, params));
  }

  switchTab(url, params) {
    return store.dispatch(switchTab(url, params));
  }

  initNavigation(initPages, initStyle) {
    return store.dispatch(initNavigation(initPages, initStyle));
  }
}

const wxRouter = new WxRouter();

export default wxRouter;
