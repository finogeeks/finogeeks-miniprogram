import Taro, { Component } from '@tarojs/taro';
import classNames from 'classnames';
import { View } from '@tarojs/components';
import extInfo from '@/utils/ext';
import './index.scss';

class Tabs extends Component {
  constructor() {
    super(...arguments);
  }

  objectToString = style => {
    if (style && typeof style === 'object') {
      let styleStr = '';
      Object.keys(style).forEach(key => {
        const lowerCaseKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        styleStr += `${lowerCaseKey}:${style[key]};`;
      });
      return styleStr;
    } else if (style && typeof style === 'string') {
      return style;
    }
    return '';
  };

  mergeStyle(style1, style2) {
    if (
      style1 &&
      typeof style1 === 'object' &&
      (style2 && typeof style2 === 'object')
    ) {
      return Object.assign({}, style1, style2);
    }
    return this.objectToString(style1) + this.objectToString(style2);
  }

  handleClick() {
    this.props.onClick(...arguments);
  }

  render() {
    const {
      tabList,
      current,
      className,
      customStyle,
      height,
      fixed,
      top,
      zIndex,
    } = this.props;
    const heightStyle = { height };
    const fixedHeight = 88;

    const fixedStyle = {
      zIndex: fixed && zIndex,
      top: fixed && `${top}rpx`,
    };

    const headClass = classNames({
      tabs__header: true,
      tabs__fixed: fixed,
    });

    const bodyClass = classNames({
      tabs__body: true,
    });

    let paddingTop = fixed && fixedHeight + top;
    const bodyStyle = {
      transition: 'unset',
      paddingTop: `${paddingTop}rpx`,
    };
    // let transformStyle = `translate3d(-${current * 100}%, 0px, 0px)`;

    // Object.assign(bodyStyle, {
    //   transform: transformStyle,
    //   "-webkit-transform": transformStyle
    // });

    const tabItems = tabList.map((item, idx) => {
      const itemCls = classNames({
        tabs__item: true,
        'tabs__item--active': current === idx,
      });
      const itemTitleStyle = {
        color: current === idx ? extInfo.THEME_COLOR.Btn_n : '#999',
        borderBottom:
          current === idx ? `4rpx solid ${extInfo.THEME_COLOR.Btn_n}` : 'none',
      };
      return (
        <View
          className={itemCls}
          id={`tab${idx}`}
          key={item.title}
          onClick={this.handleClick.bind(this, idx)}
        >
          <View className='tabs__item-title' style={itemTitleStyle}>
            {item.title}
          </View>
        </View>
      );
    });
    const rootCls = classNames(
      {
        tabs: true,
      },
      className,
    );
    return (
      <View className={rootCls} style={customStyle}>
        <View style={fixedStyle} className={headClass}>
          {tabItems}
        </View>
        <View style={bodyStyle} className={bodyClass}>
          <View className='tabs__underline' />
          {this.props.children}
        </View>
      </View>
    );
  }
}

Tabs.defaultProps = {
  className: '',
  customStyle: '',
  height: '',
  current: 0,
  fixed: false,
  zIndex: 1,
  top: 0,
  tabList: [],
};

export default Tabs;
