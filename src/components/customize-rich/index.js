/*

 * @Author: Lero
 * @Description: 自定义富文本渲染组件
 * @Date: 2019-09-23 09:46:59
 * @LastEditTime: 2019-09-26 20:13:05
 */
import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import classNames from 'classnames';
// import extInfo from '@/utils/ext';
// import authModel from '@/model/auth';
import './index.scss';

class CustomizeRich extends Component {
  constructor() {
    super(...arguments);
  }
  // onClickStock = async (item, e) => {
  //   e.stopPropagation();
  //   const isAuth = await this.props.checkGuestLogin();
  //   if (!isAuth) return;
  //   const market = item.value.substr(1, 2);
  //   const code = item.value.substr(3, 6);
  //   const userSession = authModel.getUserSession() || {};
  //   const { staffId } = this.props;
  //   const url = `${extInfo.BASE_URL}/webapps/pages/stockdetail?code=${code}&market=${market}&staffId=${staffId}&jwt=${userSession.jwt}`;
  //   Taro.navigateTo({
  //     url: `/packages/common/pages/webview/index?url=${encodeURIComponent(
  //       url,
  //     )}`,
  //   });
  // };
  render() {
    const { textResource } = this.props;
    return (
      <View className='rich'>
        {textResource.map((item, index) => {
          return (
            // <View
            //   onClick={item.name !== 'stock' ? null : e => e.stopPropagation()}
            //   key={index}
            // >
            <Text
              className={classNames(item.class)}
              style={item.style}
              key={index}
              // onClick={
              //   item.name === 'stock'
              //     ? this.onClickStock.bind(this, item)
              //     : null
              // }
            >
              {item.value && item.name === 'stock'
                ? item.displayValue
                : item.value}
            </Text>
            // </View>
          );
        })}
      </View>
    );
  }
}

CustomizeRich.defaultProps = {
  textResource: [],
  staffId: '',
};

export default CustomizeRich;
