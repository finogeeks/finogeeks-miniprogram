import Taro, { Component } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { bindActionCreators } from 'redux';
import { View, CoverImage, Image } from '@tarojs/components';
import { NAV_PAGES } from '@/constants/navigation';
import * as navActions from '@/actions/navigation';
import './index.scss';

const backImage = require('../../assets/navbar/arrow_back.png');
const homeImage = require('../../assets/navbar/arrow_back.png');
const roomDetailImg = require(ROOM_DETAIL_ICON);

function mapStateToProps(state) {
  return {
    navigation: state.navigation,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(navActions, dispatch),
  };
}
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    
  }

  handleClick = () => {
    this.props.navigateBack();
  };
  handleClickBack = () => {
    this.props.onClickBack();
    // this.props.navigateBack();
  };

  handleCheckDetail = () => {
    this.props.onCheckDetail();
  };

  render() {
    const { showBackBtn, showDetailBtn } = this.props;
    const {
      navHeight,
      statusBarHeight,
      maxTitleWidth,
    } = this.props.navigation.style;
    const { title } = this.props;
    return (
      <View
        className='nav-bar'
        style={{ paddingTop: `${statusBarHeight}px`, height: `${navHeight}px` }}
      >
        <View className='btns e-hairline'>
          {showBackBtn && (
            <View className='e-btns' onClick={this.handleClickBack}>
              <Image src={backImage} className='s-btns_back' />
            </View>
          )}
          {/* {showDetailBtn && (
            <View className='e-btns' onClick={this.handleCheckDetail}>
              <CoverImage src={roomDetailImg} className='s-btns_detail' />
            </View>
          )} */}
        </View>

        <View className='title' style={{ width: `${maxTitleWidth}px`, textAlign: 'center' }}>
          {title}
        </View>
      </View>
    );
  }
}

NavBar.defaultProps = {
  title: '',
  showBackBtn: false,
  showHomeBtn: false,
  showDetailBtn: false,
};

export default NavBar;
