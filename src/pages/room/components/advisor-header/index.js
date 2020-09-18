import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import service from '@/services/';
import Avatar from '@/components/avatar';
import extInfo from '@/utils/ext';
import './index.scss';

const primaryBtnStyle = {
  color: extInfo.THEME_COLOR.TP_n,
  borderColor: extInfo.THEME_COLOR.TP_n,
};
class AdvisorHeader extends Component {
  constructor(props) {
    super(props);
  }

  handleEnterDetial = () => {
    this.props.onEnterDetail && this.props.onEnterDetail();
  };

  handleClose = async e => {
    e.stopPropagation();
    const { orderInfo } = this.props;

    if (!orderInfo.isClosed) {
      const response = await Taro.showModal({
        title: '是否已完成服务？',
        content: '发起评价将结束本次服务',
        confirmColor: '#4285F4',
        confirmText: '继续服务',
        cancelColor: '#4285F4',
        cancelText: '结束服务',
      });
      if (response.cancel) {
        this.props.onClose && this.props.onClose();
      } else {
        return;
      }
    }
  };

  render() {
    const { advisorInfo, orderInfo, height } = this.props;
    return (
      <View
        className='advisor-header'
        style={{
          height: `${height}rpx`,
          visibility: advisorInfo.name ? 'visible' : 'hidden',
        }}
        onTap={this.handleEnterDetial}
      >
        <View className='avatar'>
          <Avatar url={advisorInfo.avatar} size={90} />
        </View>
        <View className='info'>
          <View className='title'>
            <Text className='name'>{advisorInfo.name}</Text>
            {advisorInfo.roles && advisorInfo.roles[0] && (
              <View className='badge' style={primaryBtnStyle}>
                {advisorInfo.roles[0]}
              </View>
            )}
          </View>
          {advisorInfo.account && (
            <View className='tip'>{`员工编号：${advisorInfo.account}`}</View>
          )}
          {advisorInfo.departments && advisorInfo.departments[0] && (
            <View className='tip'>{`网点：${advisorInfo.departments[0]}`}</View>
          )}
        </View>
        <View className='operation' onTap={this.handleClose}>
          <View className={`btn ${orderInfo.isClosed ? '' : 'active'}`}>
            &#xe62b;
          </View>
          <Text className='text'>评价</Text>
        </View>
      </View>
    );
  }
}

AdvisorHeader.defaultProps = {
  info: {},
  advisorInfo: {},
  orderInfo: {},
  height: 0,
  onEnterDetail: () => {},
  onClose: () => {},
};

export default AdvisorHeader;
