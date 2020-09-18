import Taro, { Component } from '@tarojs/taro';
import { View, Text, Input, Button } from '@tarojs/components';
import extInfo from '@/utils/ext';
// import isEmpty from '@/utils/lodash-local/is-equal'
import ListItem from '@/components/list-item';
// TODO: replace this
import service from '@/service';
import wxRouter from '@/router';
// import NavBar from "@/components/nav-bar";
import { getCacheSync } from '@/utils/store';
import { NAV_PAGES } from '@/constants/navigation';
import './index.scss';

const MAX_SMSCODE_INTERVAL = 60;

export default class Binding extends Component {
  config = {
    navigationBarTitleText: '手机绑定',
    navigationBarBackgroundColor: extInfo.THEME_COLOR.NAV_bg,
    navigationBarTextStyle: 'black',
  };

  constructor() {
    super();
    this.account = null;
    this.timer = null;
    this.phone = '';
    this.code = '';
    this.loading = false;
    this.state = {
      step: -1,
      isLoading: false,
      canConfirm: false,
      sendCodeRemain: 0,
      canSendCode: false,
    };
  }

  componentDidMount() {
    const { account } = this.$router.params;
    if (!account) {
      return;
    }
    this.account = JSON.parse(account);
    if (this.account.accountType === 'icbc') {
      this.setState({ step: 2 });
    } else {
      this.setState({ step: 0 });
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    if (this.state.step === 1) {
      this.handleBack();
    }
  }

  handleSendSmsCode = async () => {
    if (!this.state.canSendCode || this.state.sendCodeRemain > 0) {
      return;
    }
    try {
      Taro.showLoading({
        title: '获取中',
      });
      await service.common.sendSmsCode(this.phone);
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
      this.setState({
        sendCodeRemain: MAX_SMSCODE_INTERVAL,
        canSendCode: false,
      });
      this.timer = setInterval(() => {
        if (this.state.sendCodeRemain === 0) {
          this.setState({
            canSendCode: true,
            canSendCode: this.phone.length >= 11,
          });
          clearInterval(this.timer);
          this.timer = null;
          return;
        }
        this.setState({ sendCodeRemain: this.state.sendCodeRemain - 1 });
      }, 1000);
    } catch (error) {
      Taro.showModal({
        title: '获取失败',
        content: '获取验证码失败，请稍后重试',
        showCancel: false,
      });
    } finally {
      Taro.hideLoading();
    }
  };

  handleSubmit = async () => {
    if (this.loading || !this.state.canConfirm) {
      return;
    }
    try {
      this.loading = true;
      this.setState({ isLoading: true });
      Taro.showLoading({
        title: '提交中',
      });
      const userSession = getCacheSync('userSession');
      const openId = userSession['openId'] || '';
      await service.common.bindAccount({
        prev: {
          fcid: this.account.fcid,
          accountId: this.account.accountId,
          accountType: this.account.accountType,
        },
        accountId: this.phone,
        accountData: {
          phone: this.phone,
          smsCode: this.code,
          openId,
        },
      });
      await this.handleRestart();
      this.setState({ step: 1 });

      // 临时 de active activity
      // if (!isEmpty(wxService.getActivity())) {
      //   countBinding().catch(() => {})
      // }
    } catch (err) {
      console.log(err);
      Taro.showModal({
        title: '提交失败',
        content: (err.data && err.data.error) || '未知错误',
        showCancel: false,
      });
    } finally {
      this.loading = false;
      this.setState({ isLoading: false });
      Taro.hideLoading();
    }
  };

  handleBack = () => {
    wxRouter.switchTab(NAV_PAGES.ME);
  };

  handleRestart = async () => {
    await service.reStart();
  };

  handlePhoneInput = event => {
    const { value } = event.detail;
    this.phone = value;
    const canSendCode = this.phone.length >= 11 && !this.timer;
    this.setState({
      canSendCode,
      canConfirm: canSendCode && this.code.length >= 4,
    });
  };

  handleCodeInput = event => {
    const { value } = event.detail;
    this.code = value;
    this.setState({
      canConfirm: this.code.length >= 4 && this.phone.length >= 11,
    });
  };

  render() {
    if (this.state.step === -1) {
      return <View className='index'></View>;
    }
    const smsBtnStyle =
      !this.state.isLoading && this.state.canSendCode
        ? {
            color: '#FFF',
            backgroundColor: extInfo.THEME_COLOR.Btn_n,
          }
        : {
            color: '#FFF',
            backgroundColor: extInfo.THEME_COLOR.Btn_d,
          };
    const confirmBtnStyle =
      !this.state.isLoading && this.state.canConfirm
        ? {
            color: '#FFF',
            backgroundColor: extInfo.THEME_COLOR.Btn_n,
          }
        : {
            color: '#FFF',
            backgroundColor: extInfo.THEME_COLOR.Btn_d,
          };
    return (
      <View className='index'>
        {/* <NavBar title='手机绑定' /> */}
        {this.state.step === 0 && (
          <View className='container'>
            <View className='item'>
              <Text className='left_label'>手机号</Text>
              <Input
                className='input'
                type='number'
                placeholder='请输入手机号'
                placeholderClass='input-placeholder'
                maxLength='11'
                onInput={this.handlePhoneInput}
              />
            </View>
            <View className='item'>
              <Text className='left_label'>验证码</Text>
              <Input
                className='input'
                type='number'
                placeholder='请输入验证码'
                placeholderClass='input-placeholder'
                maxLength='8'
                onInput={this.handleCodeInput}
              />
              <View className='right_label'>
                <Button
                  className='action'
                  style={smsBtnStyle}
                  onClick={this.handleSendSmsCode}
                >
                  {this.state.sendCodeRemain
                    ? `重新获取${this.state.sendCodeRemain}s`
                    : '获取验证码'}
                </Button>
              </View>
            </View>
            <View className='confirm'>
              <Button
                className='action'
                style={confirmBtnStyle}
                onClick={this.handleSubmit}
              >
                确定
              </Button>
            </View>
          </View>
        )}
        {this.state.step === 1 && (
          <View className='container'>
            <View className='success_icon'>&#xe631;</View>
            <View className='tips'>绑定成功</View>
            <View className='confirm'>
              <Button
                className='action'
                style={{
                  color: '#FFF',
                  backgroundColor: extInfo.THEME_COLOR.Btn_n,
                }}
                onClick={this.handleBack}
              >
                返回
              </Button>
            </View>
          </View>
        )}
        {this.state.step === 2 && (
          <View className='container'>
            <ListItem
              name='手机号'
              statusText={this.account.accountData.phone || ''}
            ></ListItem>
          </View>
        )}
      </View>
    );
  }
}
