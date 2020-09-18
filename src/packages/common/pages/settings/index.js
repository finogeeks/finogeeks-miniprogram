import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import ListItem from '@/components/list-item';
import extInfo from '@/utils/ext';
import { version } from '@/utils/version';
import NavBar from '@/components/nav-bar';
import './index.scss';

export default class Settings extends Component {
  config = {
    navigationBarTitleText: '设置',
    navigationBarBackgroundColor: extInfo.THEME_COLOR.NAV_bg,
    navigationBarTextStyle: 'black',
    disableScroll: true,
    // navigationStyle: 'custom',
  };

  // componentWillMount() {
  //   const app = Taro.getApp();
  //   const { cStore, cRouter } = app.globalData;
  //   const extra = cRouter.getExtra({ name: 'HOME' });
  //   console.log('extra', extra);
  //   const nextExtra = cRouter.getExtra({ name: 'HOME' });
  //   console.log('nextExtra', nextExtra);

  // }
  handleClickBack = () => {
    Taro.navigateBack();
  };

  render() {
    return (
      <View className='index'>
        {/* <NavBar showBackBtn={true} title={'设置'} onClickBack={this.handleClickBack} /> */}
        <View className='container'>
          <ListItem
            name='版本信息'
            statusText={`v${version}`}
            padding={60}
          ></ListItem>
        </View>
      </View>
    );
  }
}
