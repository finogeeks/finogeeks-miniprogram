import Taro, { Component } from '@tarojs/taro';
import {
  View,
  Button,
  Textarea,
  Text,
  Input,
  Picker,
} from '@tarojs/components';
import extInfo from '@/utils/ext';
import { connect } from '@tarojs/redux';
import service from '@/service';
import wxRouter from '@/router';
// import { NAV_PAGES } from "@/constants/navigation";
// import NavBar from "@/components/nav-bar";
import { getCacheSync } from '@/utils/store';
import './index.scss';

const activeBtnStyle = {
  color: '#FFF',
  backgroundColor: extInfo.THEME_COLOR.Btn_n,
};

const disabledBtnStyle = {
  color: 'FFF',
  backgroundColor: extInfo.THEME_COLOR.Btn_d,
};

const mapStateToProps = ({ user }) => {
  const { city, district } = user.location || {};
  const userCity = city + district || null;
  return {
    userCity,
  };
};

@connect(mapStateToProps)
export default class LeaveMessage extends Component {
  config = {
    navigationBarTitleText: '留言',
  };

  constructor() {
    super();
    this.isLoading = false;
    this.state = {
      email: '',
      mobile: '',
      question: '',
      questionPlaceholder:
        '为了更好地为您解决问题，请告知我们以下内容：\r\n1.您的姓名\r\n2.问题描述',
      selectLocation: extInfo.CUSTOM_CONFIG.LEAVE_MESSAGE_SELECT_LOCATION,
      region: [],
      bankList: [],
      notFindBank: false,
      selectIdx: 0,
    };
  }

  componentDidMount = async () => {
    if (this.state.selectLocation) {
      Taro.showLoading({ title: '加载中' });
      await this.initLoaction();
      Taro.hideLoading();
    }
  };

  componentWillUnmount() {}

  componentDidShow() {
    Taro.setNavigationBarTitle({ title: '留言' });
  }

  componentDidHide() {}

  initLoaction = async () => {
    try {
      const loaction = await Taro.getLocation();
      const res = await service.common.getGeoInfo(loaction.latitude, loaction.longitude);
      console.log('res', res);
      const { province, city, district } = res.result.address_component;
      const region = [province, city, district];
      this.setState({ region });
      this.getBankList(city.split('市')[0]);
    } catch (error) {}
  };

  getBankList = async name => {
    const res = await service.adviser.searchBank({ name });
    const bankList =
      res.length > 0 ? [{ id: 'all', name: '全部' }, ...res] : [];
    const notFindBank = !bankList || bankList.length === 0;
    this.setState({ bankList, notFindBank });
  };

  handleQuestionInput = e => {
    const { value } = e.detail;
    this.setState({
      question: value,
    });
  };

  handleMobileInput = e => {
    const { value } = e.detail;
    this.setState({
      mobile: value,
    });
  };

  handleEmailInput = e => {
    const { value } = e.detail;
    this.setState({
      email: value,
    });
  };

  handleSubmit = async () => {
    if (this.isLoading) {
      return;
    }
    const {
      question,
      mobile,
      email,
      bankList,
      notFindBank,
      selectIdx,
    } = this.state;
    const { roomId } = this.$router.params;
    const mobileRes = mobile ? this.checkMobile(mobile) : true;
    const emailRes = email ? this.checkEmail(email) : true;
    if (!question) {
      Taro.showToast({
        title: '请输入想要咨询的问题',
        icon: 'none',
        mask: true,
      });
      return;
    }
    if (!emailRes) {
      Taro.showToast({
        title: '请输入正确的邮箱地址',
        icon: 'none',
        mask: true,
      });
      return;
    }
    if (!mobileRes) {
      Taro.showToast({
        title: '请输入正确的手机号码',
        icon: 'none',
        mask: true,
      });
      return;
    }
    this.isLoading = true;
    try {
      let location;
      try {
        location = await Taro.getLocation();
      } catch (error) {
        console.log(error);
      }
      const userSession = getCacheSync('userSession');
      Taro.showLoading({
        title: '提交中',
      });
      let groupIds = [];
      if (!notFindBank && bankList.length !== 0) {
        const selectedId = bankList[selectIdx].id;
        console.log('notFindBank', notFindBank, bankList);
        groupIds =
          selectedId === 'all'
            ? bankList.slice(1).map(bank => bank.id)
            : [selectedId];
      }
      console.log(groupIds);
      const res = await service.adviser.leaveMsg({
        question,
        email,
        phone: mobile,
        location: location && {
          latitude: location.latitude,
          longitude: location.longitude,
        },
        roomId,
        retailId: userSession['userId'],
        groupIds,
        city: this.props.userCity,
      });
      Taro.hideLoading();
      if (res) {
        // Taro.navigateBack()
        wxRouter.navigateBack();
      } else {
        Taro.hideLoading();
        Taro.showToast({
          title: '提交失败',
          icon: 'none',
          mask: true,
        });
      }
      this.isLoading = false;
    } catch (error) {
      console.log(error);
      this.isLoading = false;
    }
  };

  checkEmail = value => {
    const pattern = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;
    if (pattern.test(value)) {
      return true;
    }
    return false;
  };

  checkMobile = value => {
    if (value.length !== 11) {
      return false;
    }
    return true;
  };

  handleRegionChange = async e => {
    this.setState({
      region: e.detail.value,
    });
    // const res = await service.getMxClient().searchBank({ name: '深圳'});
    this.getBankList(e.detail.value[1].split('市')[0]);
  };

  handleBankChange = e => {
    this.setState({
      selectIdx: e.detail.value,
    });
  };

  checkRegion = () => {
    if (this.state.region.length === 0) {
      Taro.showToast({
        title: '请先选择地区',
        icon: 'none',
        mask: true,
      });
    }
  };

  render() {
    const {
      question,
      email,
      mobile,
      questionPlaceholder,
      selectLocation,
      region,
      bankList,
      selectIdx,
      notFindBank,
    } = this.state;

    return (
      <View className='leave-message'>
        {/* <NavBar title='留言' /> */}
        <View className='label'>
          问题描述<Text className='highlight'>*</Text>
        </View>
        <Textarea
          className='question-text'
          maxlength='-1'
          showConfirmBar={false}
          value={question}
          placeholder={questionPlaceholder}
          placeholder-class='question-text-placeholder'
          selection-start='0'
          onInput={this.handleQuestionInput}
        />
        {selectLocation && (
          <View className='region-info'>
            <Picker
              mode='region'
              onChange={this.handleRegionChange}
              value={region}
            >
              <View className='picker'>
                <View className='title'>地区</View>
                <View className='value'>
                  {region.length > 0 && !!region[0]
                    ? `${region[0]} ${region[1]} ${region[2]}`
                    : '请选择地区'}
                  <View className='right-icon'>&#xe621;</View>
                </View>
              </View>
            </Picker>
            <Picker
              onClick={this.checkRegion}
              onChange={this.handleBankChange}
              range={bankList}
              rangeKey='name'
              value={selectIdx}
              disabled={region.length === 0 || notFindBank}
            >
              <View className='picker top-border'>
                <View className='title'>网点</View>
                <View className='value'>
                  {bankList[selectIdx] ? (
                    <Text className='bank-name'>
                      {bankList[selectIdx].name}
                    </Text>
                  ) : notFindBank ? (
                    <Text className='no-bank'>暂无可选网点</Text>
                  ) : (
                    '请选择网点'
                  )}
                  {!notFindBank && <View className='right-icon'>&#xe621;</View>}
                </View>
              </View>
            </Picker>
          </View>
        )}
        <Text className='label'>邮箱</Text>
        <Input
          className='info'
          value={email}
          placeholder='请输入您的邮箱'
          onInput={this.handleEmailInput}
        />
        <Text className='label'>手机号</Text>
        <Input
          className='info'
          value={mobile}
          placeholder='请输入您的手机号'
          onInput={this.handleMobileInput}
          type='number'
        />
        <Button
          className='submit'
          style={question ? activeBtnStyle : disabledBtnStyle}
          disabled={!question}
          onTap={this.handleSubmit}
        >
          提交
        </Button>
      </View>
    );
  }
}
