import Taro, { Component } from '@tarojs/taro';
import classNames from 'classnames';
import ProductItem from '@/components/product-item';
import service from '@/service';
import authModel from '@/model/auth';
import extInfo from '@/utils/ext';
import { View, Text, Picker, Form, Button } from '@tarojs/components';
import './index.scss';

export default class MecroWeb extends Component {
  checkoutConsultRoom = false;
  isShow = false;
  config = {
    navigationBarTitleText: '微官网',
    navigationBarBackgroundColor: extInfo.THEME_COLOR.NAV_bg,
    navigationBarTextStyle: 'black',
    // backgroundTextStyle: 'dark',
    backgroundTextStyle: 'light',
    backgroundColor: '#f3f5f5',
    disableScroll: false,
    enablePullDownRefresh: true,
    onReachBottomDistance: 30,
  };

  constructor() {
    super();
    this.state = {
      showPicker: false,
      hasMore: true,
      productList: [],
      pickerIdx: 0,
      isFullScreen: false,
    };
    this.productTypes = [
      {
        type: 'deposit',
        name: '存款',
        active: true,
      },
      // 贷款
      {
        type: 'loan',
        name: '贷款',
        active: false,
      },
      //电子银行
      {
        type: 'internetBank',
        name: '电子银行',
        active: false,
      },
    ];
    this.productMap = new Map();
    this.curScrollTop = 0;
  }

  componentWillMount() {
    // this.initScrollHeight();
    this.initProductMap();
    this.initDeviceInfo();
  }

  componentWillUnmount() {}

  async componentDidMount() {
    this.initProduct();
  }

  componentDidHide() {}
  componentDidShow() {}

  async onPullDownRefresh() {
    let { pickerIdx } = this.state;
    await this.refreshProductList(pickerIdx);
    setTimeout(() => Taro.stopPullDownRefresh(), 500);
    // Taro.stopPullDownRefresh();
  }

  async onReachBottom() {
    this.loadMoreProduct();
  }

  // initScrollHeight = () => {
  //   const { windowHeight } = Taro.getSystemInfoSync();
  //   const scrollHeight = windowHeight - SWITCH_BAR_HEIGHT;
  //   this.setState({ scrollHeight });
  // };

  initProductMap = () => {
    this.productTypes.forEach(item => {
      this.productMap.set(item.type, {
        scrollTop: 0,
        page: 0,
        size: 20,
        type: item.type,
        hasMore: true,
        loadingMore: false,
        refreshing: false,
        productList: [],
      });
    });
  };

  initProduct = async () => {
    // get initList();
    const newPordInfo = await this.fetchProduct(this.productTypes[0].type);
    this.updateProduct(newPordInfo);
  };

  initDeviceInfo = () => {
    const { screenHeight, screenWidth } = Taro.getSystemInfoSync();
    const isFullScreen = screenHeight / screenWidth > 2;
    this.setState({ isFullScreen });
  };

  loadMoreProduct = async () => {
    const { pickerIdx } = this.state;
    const type = this.productTypes[pickerIdx].type;
    this.setState({ loadingMore: true });
    const newPordInfo = await this.fetchProduct(type);
    this.setState({ loadingMore: false });
    this.updateProduct(newPordInfo);
  };

  refreshProductList = async (pickerIdx) => {
    const type = this.productTypes[pickerIdx].type;
    this.resetProduct(type);
    this.setState({ refreshing: true });
    const newPordInfo = await this.fetchProduct(type);
    this.setState({ refreshing: false });
    this.updateProduct(newPordInfo);
  };

  resetProduct = type => {
    this.productMap.set(type, {
      scrollTop: 0,
      page: 0,
      size: 20,
      type,
      hasMore: true,
      loadingMore: false,
      refreshing: false,
      productList: [],
    });
  };

  fetchProduct = async type => {
    const curProduct = this.productMap.get(type);
    const { page, size, productList, hasMore } = curProduct;
    if (!hasMore) return;
    const { staffId, shareId, shareViewName } = this.$router.params;
    console.log('->>>>>>');
    console.log(staffId, shareId, shareViewName);
    // Taro.showLoading();
    try {
      const res = await service.product.getProductList(
        type,
        page,
        size,
        staffId,
        shareId,
        shareViewName,
      );
      const { content } = res;
      const hasMore = content.length === size;
      const newPordInfo = {
        ...curProduct,
        page: hasMore ? page + 1 : page,
        hasMore,
        productList: [...productList, ...content],
      };
      this.productMap.set(type, newPordInfo);
      // Taro.hideLoading();
      return newPordInfo;
    } catch (error) {
      // Taro.hideLoading();
      Taro.showToast({ title: '获取产品失败', icon: 'fail' });
      return null;
    }
  };

  updateProduct = newPordInfo => {
    if (!newPordInfo) return;
    const { productList, scrollTop, hasMore } = newPordInfo;
    this.setState({ productList, hasMore });
    Taro.pageScrollTo({
      scrollTop,
      duration: 0,
    });
    // console.log(ele);
    this.curScrollTop = scrollTop;
  };

  handlePickerCancel = () => {
    this.setState({ showPicker: false });
  };

  handlePickerChange = async e => {
    const curType = this.productTypes[this.state.pickerIdx].type;
    const curProduct = this.productMap.get(curType);
    this.productMap.set(curType, {
      ...curProduct,
      scrollTop: this.curScrollTop,
    });

    const pickerIdx = Number(e.detail.value);
    const type = this.productTypes[pickerIdx].type;
    this.setState({ showPicker: false, pickerIdx });
    let nextProduct = this.productMap.get(type);
    if (nextProduct.productList.length === 0) {
      nextProduct = await this.fetchProduct(type);
    }
    this.updateProduct(nextProduct);
  };

  handlePickerTap = () => {
    this.setState({ showPicker: true });
    Taro.createSelectorQuery()
      .selectViewport()
      .scrollOffset(res => {
        this.curScrollTop = res.scrollTop;
      })
      .exec();
  };

  handleScroll = async e => {
    // console.log('e.detail.scrollTop', e.detail.scrollTop);
    this.curScrollTop = e.detail.scrollTop;
    // console.log(e.detail.scrollTop);
    // console.log(e.detail.scrollTop <= 10 && !this.state.refreshing);
    if (e.detail.scrollTop <= 1 && !this.state.refreshing) {
      Taro.startPullDownRefresh();
      // await this.refreshProductList();
      // Taro.stopPullDownRefresh();
    }
  };

  handleProductTap = (id, status) => () => {
    if (status == 0) {
      Taro.showToast({ title: '资源不存在', icon: 'none', duration: 1000 });
      return;
    }
    const { staffId } = this.$router.params;
    Taro.navigateTo({
      url: `/packages/micro-web/pages/reservation/index?staffId=${staffId}&productId=${id}`,
    });
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

  handleProductTypeChange = async (index) => {
    let { productTypes } = this.state;
    let type = '';
    productTypes.map((i, v) => {
      i.active = v == index;
      if (i.active) type = i.type;
      return i;
    });
    this.setState({ pickerIdx: index });
    this.setState({ productTypes });
    this.refreshProductList(index);
  };

  render() {
    const {
      pickerIdx,
      showPicker,
      productList,
      hasMore,
      isFullScreen,
      loadingMore,
    } = this.state;
    const iconClass = classNames({
      'e-tab_icon': true,
      's-tab_active': showPicker,
    });
    return (
      <View className='micro-web'>
        <View className='l-header'>
          <View className='m-type'>
            {this.productTypes.map((item, index) => {
              return (
                <View
                  className={item.active ? 'm-type_item active' : 'm-type_item'}
                  key={item.name}
                  onClick={this.handleProductTypeChange.bind(this,index)}>
                  {item.name}
                </View>
              )
            })}
          </View>
        </View>
        <View className='l-body'>
          <View
            className='m-list'
            // scrollY
            // scrollWithAnimation={false}
            // scrollTop={scrollTop}
            // style={{ height: `${scrollHeight}PX` }}
            // lowerThreshold='30'
            // onScrolltolower={this.loadMoreProduct}
            // onScroll={this.handleScroll}
            // enableBackToTop
          >
            <View className='e-refreshing'>加载中...</View>
            <Form report-submit onSubmit={this.handleSubmit}>
              {productList.map(item => (
                <View
                  id={item.id}
                  key={item.id}
                  className='e-item_warp'
                  onTap={this.handleProductTap(item.id, item.status)}
                >
                  <Button className='hide-submt-btn' form-type='submit' />

                  <ProductItem
                    productData={item}
                    typeName={item.typeName}
                    isDetail={false}
                  />

                </View>
              ))}
            </Form>
            {!hasMore && <View className='e-no_more'>没有更多了</View>}
            {loadingMore && <View className='e-loading_more'>加载中...</View>}
            {isFullScreen && (
              <View style={{ width: '100%', height: '34px' }}></View>
            )}
          </View>
        </View>
      </View>
    );
  }
}
