import Taro, { Component } from '@tarojs/taro';
import { WebView, View } from '@tarojs/components';
import QueryString from 'qs';
import service from '@/service';
import imModel from '@/model/im';
import authModel from '@/model/auth';
import wxRouter from '@/router';
// import NavBar from "@/components/nav-bar";
import { NAV_PAGES } from '@/constants/navigation';

export default class WebPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: this.$router.params.url,
    };
    this.restarting = false;
    this.willConsult = false;
    this.willUnmount = false;
  }

  config = {
    navigationBarTitleText: '跳转中',
  };

  componentDidMount() {
    const { title } = this.$router.params;
    if (title) {
      Taro.setNavigationBarTitle({ title: decodeURIComponent(title) });
    }
  }

  componentWillUnmount() {
    this.willUnmount = true;
  }

  // onShareAppMessage(options) {
  //   if (options.webViewUrl.includes('lottery')) {
  //     this.shareActivity();
  //     return {
  //       title: '我在工行猜红包，快来助我一臂之力吧！',
  //       path: '/pages/login/index',
  //       imageUrl:
  //         extInfo.BASE_URL + '/statics/images/activity/share.png',
  //     };
  //   }
  // }

  // shareActivity = async () => {
  //   try {
  //     await shareActivityDaily();
  //     if (!this.restarting) {
  //       this.refreshWebview();
  //     }
  //   } catch (error) {}
  // };

  // share and webview destroy will trigger 'onMessage' twice
  onMessage = async event => {
    console.log('onMessage data', event.detail.data);
    const datas = event.detail.data;

    // record consult action
    this.willConsult = !!datas.find(
      data => data.action === 'CONSULT' || data.action === 'CONSULT_ADVISOR',
    );

    for (const data of datas) {
      switch (data.action) {
        case 'BIND_PHONE':
          await this.bindPhone();
          break;
        case 'CONSULT':
          await this.consult(data.payload.message);
          break;
        case 'CONSULT_ADVISOR':
          await this.consultAdvisor(data.payload.staffId, data.payload.message);
          break;
        default:
          break;
      }
    }
  };

  bindPhone = async () => {
    // ignore if restaring or phone is already bound
    if (!authModel.getUserInfo().accountData.phone && !this.restarting) {
      try {
        this.restarting = true;
        // TODO: replace this
        await service.reStart();
        const {
          userId: fcid,
          jwt,
          accessToken,
          accountType,
        } = authModel.getUserSession();
        const { mobile: phone } = authModel.getUserInfo();
        if (phone) {
          const searchStart = this.state.url.indexOf('?');
          const search = this.state.url.slice(searchStart + 1);
          const query = QueryString.parse(search);
          Object.assign(query, {
            fcid,
            jwt,
            accessToken,
            accountType,
            phone,
          });
          console.log('new query', query);
          const newUrl = `${this.state.url.slice(
            0,
            searchStart,
          )}?${QueryString.stringify(query)}`;
          this.refreshWebview(newUrl);
        }
      } catch (error) {
        console.error('Bind phone fail!', error);
      } finally {
        this.restarting = false;
      }
    } else {
      console.warn('The phone is already bound!');
    }
  };

  consult = async text => {
    if (text) {
      try {
        const sendMsg = decodeURIComponent(text);
        const userInfo = authModel.getUserInfo();
        const staffId = userInfo.bindStaffId;
        const retailId = userInfo.retailId;
        const dispatchQuestionType = '投资理财';
        if (userInfo.bindStaffId) {
          imModel.enterAdvisorRoom(staffId, sendMsg, true);
        } else {
          imModel.enterDisptachRoom(retailId, dispatchQuestionType, sendMsg);
        }
      } catch (error) {
        console.error('decode message fail');
      }
    }
  };

  consultAdvisor = async (staffId, msg) => {
    const success = await imModel.enterAdvisorRoom(staffId, msg, true);
    if (!success) {
      wxRouter.switchTab(NAV_PAGES.HOME);
    }
  };

  refreshWebview = newUrl => {
    // if going to consult or will unmount, not redirect to webview
    if (!this.willConsult && !this.willUnmount) {
      // Taro.redirectTo({
      //   url: `/packages/common/pages/webview/index?url=${encodeURIComponent(newUrl || this.state.url)}`,
      // })
      wxRouter.redirectTo(NAV_PAGES.WEBVIEW, {
        url: encodeURIComponent(newUrl || this.state.url),
      });
    }
  };

  render() {
    const { url } = this.state;
    console.log('Webview url', decodeURIComponent(url));
    return (
      <View>
        {/* <NavBar /> */}
        <WebView src={decodeURIComponent(url)} onMessage={this.onMessage} />
      </View>
    );
  }
}
