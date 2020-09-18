import Taro, { Component } from '@tarojs/taro';
import extInfo from '@/utils/ext';
import { getCacheSync, setCacheSync } from '@/utils/store';
import Avatar from '@/components/avatar';
import ProductItem from '@/components/product-item';
// import { Events } from "@finogeeks/finchat-js-sdk";
import service from '@/service';
import authModel from '@/model/auth';
import imModel from '@/model/im';
import wxRouter from '@/router';

import {
  View,
  Button,
  Text,
  Picker,
  Input,
  Image,
  Form,
} from '@tarojs/components';
import { connect } from '@tarojs/redux';
import httpClient from '@/utils/http-client';
import bgImg from '@/assets/common/product_bg.svg';
import './index.scss';

const primaryColor = extInfo.THEME_COLOR.TP_n;

const mapStateToProps = ({ user }) => {
  const { province, city, district } = user.location || {};
  const userCity = province + city + district || null;
  return {
    userCity,
  };
};

// @connect(
//   mapStateToProps,
// )

@connect(mapStateToProps)
class Reservation extends Component {
  checkoutConsultRoom = false;
  isShow = false;
  config = {
    navigationBarTitleText: '产品详情',
    navigationBarBackgroundColor: extInfo.THEME_COLOR.NAV_bg,
    navigationBarTextStyle: 'black',
    disableScroll: true,
  };

  constructor() {
    super();
    const userSession = getCacheSync('userSession');
    const reservationFromInfo = getCacheSync('reservationFromInfo') || {};
    this.state = {
      productInfo: null,
      advisorInfo: null,
      isFullScreen: false,
      logoUrl: '',
      code: '',
      // form
      name: reservationFromInfo.name || '',
      mobile: '',
      city: reservationFromInfo.city || '',
      company: reservationFromInfo.company || '',
      annualIncome: reservationFromInfo.annualIncome || '',
      reservationSuccess: false,
    };
    this.myId = userSession['userId'];
    this.incomeRegion = ['5万以下', '5-10万', '10-20万', '20-50万', '50万以上'];
  }

  componentWillMount() {}

  componentWillUnmount() {}

  async componentDidMount() {
    this.initDeviceInfo();
    this.initProductInfo();
    this.initAdvisorInfo();
    this.initMobile();
    this.initPosterLogo();
    if (this.props.userCity) {
      this.setState({ city: this.props.userCity });
    }
    const { code } = await Taro.login().catch(() => {});
    this.setState({ code });
    // const advisorInfo = await getAdvisorInfo(this.myId, staffId);
  }

  initDeviceInfo = () => {
    const { screenHeight, screenWidth } = Taro.getSystemInfoSync();
    const isFullScreen = screenHeight / screenWidth > 2;
    this.setState({ isFullScreen });
  };

  initProductInfo = async () => {
    const { productId, staffId } = this.$router.params;
    try {
      const res = await service.product.getProductDetail(productId, staffId);
      if (res.status == 0) {
        Taro.showToast({ title: '资源不存在', icon: 'none', duration: 1000 });
        setTimeout(() => Taro.navigateBack(), 1000);
        return;
      }
      let netdiskDownloadSrc = false;
      let netdiskThumbSrc = false;
      if (res.image && res.image.netdiskId) {
        netdiskDownloadSrc = httpClient.netdiskDownload(res.image.netdiskId);
        netdiskThumbSrc = httpClient.netdiskThumb(res.image.netdiskId, '');
      }
      res.netdiskDownloadSrc = netdiskDownloadSrc;
      res.netdiskThumbSrc = netdiskThumbSrc;
      this.setState({
        productInfo: { ...res },
      });
      console.log('productInfo-->', this);
    } catch (error) {
      Taro.showToast({ title: error.data.error, icon: 'none', duration: 1000 });
      setTimeout(() => Taro.navigateBack(), 1000);
    }
  };

  initAdvisorInfo = async () => {
    const { staffId } = this.$router.params;
    try {
      const res = await service.common.getStaffInfo(staffId);
      this.setState({
        advisorInfo: {
          avatar: res.avatar,
          name: res.name,
          department: res.department,
          role: res.roles.join(''),
          mobile: res.phone,
        },
      });
    } catch (error) {
      console.log('error?-->', error);
      Taro.showToast({ title: error.data.error, icon: 'none', duration: 1000 });
      setTimeout(() => Taro.navigateBack(), 1000);
    }
  };

  initMobile = () => {
    const userInfo = authModel.getUserInfo();
    const mobile = userInfo.mobile
      ? userInfo.mobile
      : userInfo.accountData
      ? userInfo.accountData.phone
      : '';
    this.setState({ mobile });
  };

  initPosterLogo = async () => {
    const res = await service.common.getPosterLogo();
    if (!res.logo) return;
    const logoUrl = httpClient.netdiskThumb(res.logo);
    this.setState({ logoUrl });
  };

  componentDidHide() {}
  componentDidShow() {}

  handleNameChange = e => {
    this.setState({
      name: e.detail.value,
    });
  };

  handleMobileChange = e => {
    this.setState({
      mobile: e.detail.value,
    });
  };

  handleRegionChange = e => {
    this.setState({
      city: e.detail.value.join(''),
    });
  };

  handleCompanyChange = e => {
    this.setState({
      company: e.detail.value,
    });
  };

  handleIncomeChange = e => {
    this.setState({
      annualIncome: this.incomeRegion[e.detail.value],
    });
  };

  makePhoneCall = async () => {
    await Taro.makePhoneCall({
      phoneNumber: this.state.advisorInfo.mobile,
    });
    console.log(123123);
    const resourceType = 'PRODUCT';
    const { staffId, productId: resourceId } = this.$router.params;
    const { userId: retailId } = authModel.getUserSession();
    service.report
      .reportCallPhone({ staffId, retailId, resourceType, resourceId })
      .catch(err => console.log('DEBUG: reportCallPhone error ->', err));
  };

  makeConsult = async () => {
    const { staffId } = this.$router.params;
    const success = await imModel.enterAdvisorRoom(staffId, null, false);
    if (!success) Taro.showToast({ title: '咨询失败', icon: 'none' });
  };

  onGetPhoneMumber = async e => {
    if (!e.target.encryptedData) {
      Taro.showModal({
        content: '拒绝授权，您将无法正常使用我们的功能',
        showCancel: false,
      });
      return;
    }
    const { iv, encryptedData } = e.target;
    try {
      const res = await service.report.reportWxPhome({
        appId: extInfo.APP_ID,
        code: this.state.code,
        encryptedData,
        iv,
      });
      this.setState({ mobile: res.result });
      // this.setState({ mobile: '18122197185' });
    } catch (error) {
      Taro.showToast({
        title: '上报手机号失败，请重试',
        icon: 'none',
        mask: true,
      });
      return;
    }
    const { code } = await Taro.login();
    this.setState({ code });
    await authModel.reFreshUserInfo();
  };

  reserveProduct = async () => {
    const { productId, staffId } = this.$router.params;
    const { name, mobile, city, company, annualIncome } = this.state;
    if (!name) {
      Taro.showToast({ title: '请输入名字', icon: 'none' });
      return;
    }
    if (!mobile) {
      Taro.showToast({ title: '请输入电话', icon: 'none' });
      return;
    }
    if (!city) {
      Taro.showToast({ title: '请输入地址', icon: 'none' });
      return;
    }
    try {
      await service.product.reserveProduct({
        productId,
        staffId,
        name,
        mobile,
        city,
        company,
        annualIncome,
      });
      this.setState({ reservationSuccess: true });
      const reservationFromInfo = {
        name,
        mobile,
        city,
        company,
        annualIncome,
      };
      setCacheSync('reservationFromInfo', reservationFromInfo);
      // Taro.showToast({ title: '预约成功' });
      // setTimeout(() => Taro.navigateBack(), 1500);
    } catch (e) {
      // Taro.showToast({ title: '预约失败', icon: 'none' });
      console.log(e);
      Taro.showModal({ content: e.data.error, showCancel: false });
    }
  };

  handleSubmit = e => {
    const userSession = authModel.getUserSession();
    const openId = userSession.openId;
    service.report
      .reportFormId(
        null,
        'profile',
        e.detail.formId,
        openId,
        userSession.userId,
      )
      .catch(error => {
        console.log('reportFormId error', error);
      });
  };

  previewImage = url => {
    Taro.previewImage({
      current: url,
      urls: [url],
    });
  };

  // testGo = () => {
  //   wxRouter.redirectTo('/packages/micro-web/pages/home/index', {
  //     staffId: '@staff_15310000470:666666.finogeeks.com',
  //     shareViewName: '11',
  //     shareId: '22',
  //   });
  // };

  render() {
    const {
      productInfo,
      advisorInfo,
      isFullScreen,
      name,
      mobile,
      city,
      company,
      annualIncome,
      logoUrl,
      reservationSuccess,
      introduction,
      image,
    } = this.state;

    if (!productInfo) {
      return null;
    }

    let showIntroductionTitle =
      productInfo.introduction || productInfo.netdiskThumbSrc;

    if (reservationSuccess) {
      return (
        <View className='reservation-success'>
          <View style={{ color: primaryColor }} className='e-icon'>
            &#xe637;
          </View>
          <View className='e-info'>已提交预约</View>
          <View className='e-tips'>您的预约信息已提交，</View>
          <View className='e-tips'>客户经理 将在3个工作日内与您联系。</View>
          <View
            className='e-button'
            style={{ backgroundColor: primaryColor }}
            onTap={() => Taro.navigateBack()}
          >
            我知道了
          </View>
        </View>
      );
    }

    return (
      <View className='reservation'>
        <Form report-submit onSubmit={this.handleSubmit}>
          <View className='l-header'>
            {logoUrl && (
              <Image
                className='e-logo_img'
                mode='heightFix'
                src={logoUrl}
              ></Image>
            )}
            <Image className='e-bg_img' src={bgImg}></Image>
            <View
              className='m-background'
              style={{ backgroundColor: primaryColor }}
            ></View>
            <View className='m-product_info'>
              {productInfo && (
                <ProductItem
                  productData={productInfo}
                  typeName={productInfo.typeName}
                  isDetail
                />
              )}
            </View>
          </View>
          <View className='l-body'>
            <View className='m-form'>
              <View className='m-form_item'>
                <View className='e-label'>
                  姓名<Text className='s-highlight'>*</Text>
                </View>
                <Input
                  value={name}
                  className='e-input'
                  maxLength='10'
                  placeholder='请输入姓名'
                  placeholderStyle='color: #D9D9D9'
                  onInput={this.handleNameChange}
                ></Input>
              </View>
              <View className='m-form_item'>
                <View className='e-label'>
                  手机号<Text className='s-highlight'>*</Text>
                </View>
                <Button
                  value={mobile}
                  openType='getPhoneNumber'
                  className='e-input'
                  onGetPhoneNumber={this.onGetPhoneMumber}
                >
                  <Text style={{ color: mobile ? '#333' : '#d9d9d9' }}>
                    {mobile || '请输入手机号'}
                  </Text>
                </Button>
                {/* {mobile ? (
                <View className='e-input'>{mobile}</View>
              ) : (
              )} */}
              </View>
              <View className='m-form_item'>
                <View className='e-label'>
                  所在城市<Text className='s-highlight'>*</Text>
                </View>
                <Picker
                  mode='region'
                  className='e-input'
                  onChange={this.handleRegionChange}
                >
                  {city ? (
                    <Text>{city}</Text>
                  ) : (
                    <Text className='s-placeholder'>定位您的城市</Text>
                  )}
                  <Text className='e-input_icon'>&#xe6d7;</Text>
                </Picker>
              </View>
              <View className='m-form_item'>
                <View className='e-label'>企业单位</View>
                <Input
                  value={company}
                  className='e-input'
                  maxLength='50'
                  placeholder='请填写企业单位'
                  placeholderStyle='color: #D9D9D9'
                  onInput={this.handleCompanyChange}
                ></Input>
              </View>
              <View className='m-form_item'>
                <View className='e-label'>年收入</View>
                <Picker
                  mode='selector'
                  range={this.incomeRegion}
                  className='e-input'
                  onChange={this.handleIncomeChange}
                >
                  {annualIncome ? (
                    <Text>{annualIncome}</Text>
                  ) : (
                    <Text className='s-placeholder'>请选择年收入</Text>
                  )}
                  <Text className='e-input_icon'>&#xe621;</Text>
                </Picker>
              </View>
            </View>
            <View
              className='e-submit_button'
              style={{ backgroundColor: primaryColor }}
              onTap={this.reserveProduct}
            >
              提交预约
              <Button className='hide-submt-btn' form-type='submit' />
            </View>
            {showIntroductionTitle && (
              <View className='m-product'>
                <View class='m-product_title'>产品介绍</View>
                {productInfo.introduction && (
                  <View class='m-product_content'>
                    {productInfo.introduction}
                  </View>
                )}
                {productInfo.netdiskThumbSrc && (
                  <Image
                    mode='widthFix'
                    onClick={this.previewImage.bind(
                      this,
                      productInfo.netdiskDownloadSrc,
                    )}
                    className='m-product_img'
                    src={productInfo.netdiskThumbSrc}
                  ></Image>
                )}
              </View>
            )}
          </View>
          <View className='l-footer'>
            {advisorInfo && (
              <View className='m-adviser'>
                <View className='m-adviser_info'>
                  <Avatar url={advisorInfo.avatar} size={76} circle />
                  <View className='m-adviser_info_detail'>
                    <View className='e-advisor_name'>{advisorInfo.name}</View>
                    <View className='e-advisor_role'>
                      {advisorInfo.department} | {advisorInfo.role}
                    </View>
                  </View>
                </View>
                <View className='m-adviser_opts'>
                  {advisorInfo && advisorInfo.mobile && (
                    <View
                      className='m-adviser_opts_item'
                      onTap={this.makePhoneCall}
                    >
                      <View className='e-icon' style={{ color: primaryColor }}>
                        &#xe6d8;
                      </View>
                      <View>电话</View>
                      <Button className='hide-submt-btn' form-type='submit' />
                    </View>
                  )}
                  <View
                    className='m-adviser_opts_item'
                    onTap={this.makeConsult}
                  >
                    <View className='e-icon' style={{ color: primaryColor }}>
                      &#xe6d6;
                    </View>
                    <View>在线咨询</View>
                    <Button className='hide-submt-btn' form-type='submit' />
                  </View>
                </View>
              </View>
            )}
            {isFullScreen && (
              <View style={{ width: '100%', height: '34px' }}></View>
            )}
          </View>
        </Form>
      </View>
    );
  }
}

export default Reservation;
