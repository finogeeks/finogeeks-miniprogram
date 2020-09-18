import Taro, { Component } from '@tarojs/taro';
import authModel from '@/model/auth';
import extInfo from '@/utils/ext';
import { View, Form, Button } from '@tarojs/components';
import classNames from 'classnames';
import { hexToRgba } from '@/utils/util';
import service from '@/service';

import './index.scss';

const primaryBackgroundStyle = {
  primary: {
    backgroundColor: '#fff',
  },
  defalut: {
    backgroundColor: hexToRgba(extInfo.THEME_COLOR.Btn_n, '0.1'),
  },
};

const primaryColorStyle = {
  primary: {
    color: extInfo.THEME_COLOR.Btn_n,
  },
  defalut: {
    color: extInfo.THEME_COLOR.Btn_n,
  },
};

class Attention extends Component {
  static options = { addGlobalClass: true };
  constructor() {
    super(...arguments);

    this.state = {};
  }
  handlePrimaryStyle = style => {
    const { isFavorited, lightColor } = this.props;

    return isFavorited && lightColor ? style['primary'] : style['defalut'];
  };

  handleClick = e => {
    e.stopPropagation();
    console.log('DEBUG: attentionClick => isFavorited', this.props.isFavorited);
    this.props.onClick(this.props.isFavorited, e);
  };

  handleSubmit = e => {
    if (!authModel.isAuth) return;
    e.stopPropagation();
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

  render() {
    const { className, isFavorited, lightColor } = this.props;
    const rootClass = classNames('attention', className);
    const btnClass = classNames({
      attention__btn: true,
      attention__active: isFavorited,
    });

    const btnStyle = {
      // opacity: lightColor ? 0.1 : 1,
      borderColor: (isFavorited && extInfo.THEME_COLOR.Btn_n) || '',
      ...this.handlePrimaryStyle(primaryBackgroundStyle),
    };

    const iconClass = classNames([
      'iconfont',
      isFavorited ? 'icon-plaza_flow_begin' : 'icon-plaza_flow_none',
    ]);

    const iconStyle = this.handlePrimaryStyle(primaryColorStyle);

    const textActiveClass = classNames({
      attention__text: true,
      attention__text_active: isFavorited || lightColor,
    });

    const textActiveStyle = this.handlePrimaryStyle(primaryColorStyle);

    return (
      <Form report-submit onSubmit={this.handleSubmit}>
        <Button
          className={rootClass}
          form-type='submit'
          onClick={this.handleClick.bind(this)}
        >
          <View className={btnClass} style={btnStyle}>
            <View className={iconClass} style={iconStyle} />
            <View className={textActiveClass} style={textActiveStyle}>
              {isFavorited ? '已关注' : '关注'}
            </View>
          </View>
        </Button>
      </Form>
    );
  }
}

Attention.defaultProps = {
  className: '',
  isFavorited: false,
  fcid: '',
  lightColor: true,
};

export default Attention;
