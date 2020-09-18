import Taro, { Component } from '@tarojs/taro';
import { View, Block } from '@tarojs/components';
import './index.scss';
import CFooter from './footer';
import CButton from './button';
import CItem from './item';
import CLine from './line';
import CHeader from './header';
import CHyperText from './hyperText';
import CRadioButton from './radio-button';

class CWidget extends Component {
  handleWidgetTap = () => {
    this.props.onWidgetTap({
      widget: { ...this.props.widget },
    });
  };

  render() {
    const { type, title, params } = this.props.widget;
    const {
      action,
      value,
      payload,
      icon,
      date,
      href,
      height,
      margin,
      color,
      background,
      show,
      size,
    } = params || {};
    return (
      <View
        className='convo-widget'
        onTap={this.handleWidgetTap}
        style={{
          display: show === 'staff' ? 'none' : 'block',
        }}
      >
        {type === 'header' && (
          <CHeader title={title} icon={icon} date={date} href={href} />
        )}
        {type === 'footer' && (
          <CFooter title={title} icon={icon} date={date} href={href} />
        )}
        {type === 'item' && <CItem title={title} action={action} />}
        {type === 'button' && (
          <CButton
            title={title}
            action={action}
            value={value}
            payload={payload}
          />
        )}
        {type === 'line' && (
          <CLine title={title} height={height} margin={margin} color={color} />
        )}
        {type === 'hypertext' && (
          <CHyperText title={title} action={action} href={href} />
        )}
        {type === 'radioButton' && (
          <CRadioButton
            title={title}
            action={action}
            href={href}
            value={value}
            background={background}
            color={color}
            height={height}
            show={show}
            size={size}
            icon={icon}
          />
        )}
      </View>
    );
  }
}

CWidget.defaultProps = {
  widget: {
    expriation: -1,
    title: '',
    type: '',
    params: {},
  },
  onWidgetTap: () => {},
};

export default CWidget;
