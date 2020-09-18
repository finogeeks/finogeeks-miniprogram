import Taro, { Component } from '@tarojs/taro';
import { View, Text, Input, Icon } from '@tarojs/components';
import classNames from 'classnames';

import './index.scss';

class SearchBar extends Component {
  constructor(props) {
    super(...arguments);
    this.state = {
      isFocus: props.focus,
    };
  }

  handleFocus = (...arg) => {
    this.setState({
      isFocus: true,
    });
    this.props.onFocus(...arg);
  };

  handleBlur = (...arg) => {
    this.setState({
      isFocus: false,
    });
    this.props.onBlur(...arg);
  };

  handleChange = (e, ...arg) => this.props.onChange(e.target.value, ...arg);

  handleClear = (...arg) => {
    if (this.props.onClear) {
      this.props.onClear();
    } else {
      this.props.onChange('', ...arg);
    }
  };

  handleConfirm = (...arg) => this.props.onConfirm(...arg);

  handleActionClick = (...arg) => this.props.onActionClick(...arg);
  render() {
    const {
      value,
      placeholder,
      maxLength,
      fixed,
      focus,
      disabled,
      showActionButton,
      actionName,
      className,
      customStyle,
    } = this.props;
    const { isFocus } = this.state;
    const fontSize = 16;
    const rootCls = classNames(
      'search-bar',
      {
        'search-bar--fixed': fixed,
      },
      className,
    );
    const placeholderWrapStyle = {};
    const actionStyle = {};
    if (isFocus || (!isFocus && value)) {
      actionStyle.opacity = 1;
      actionStyle.marginRight = `0`;
      placeholderWrapStyle.flexGrow = 0;
    } else if (!isFocus && !value) {
      placeholderWrapStyle.flexGrow = 0;
      actionStyle.opacity = 0;
      actionStyle.marginRight = `-${(actionName.length + 1) * fontSize +
        fontSize / 2}px`;
    }
    if (showActionButton) {
      actionStyle.opacity = 1;
      actionStyle.marginRight = `0`;
    }

    const clearIconStyle = { display: 'flex' };
    const placeholderStyle = { visibility: 'hidden' };
    if (!value.length) {
      clearIconStyle.display = 'none';
      placeholderStyle.visibility = 'visible';
    }
    return (
      <View className={rootCls} style={customStyle}>
        <View className='search-bar__input-cnt'>
          <View
            className='search-bar__placeholder-wrap'
            style={placeholderWrapStyle}
          >
            <Icon className='icon icon-search' type='search' size='16' />
            <Text className='search-bar__placeholder' style={placeholderStyle}>
              {isFocus ? '' : placeholder}
            </Text>
          </View>
          <Input
            className='search-bar__input'
            type='text'
            confirmType='search'
            value={value}
            focus={focus}
            disabled={disabled}
            maxLength={maxLength}
            onInput={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onConfirm={this.handleConfirm}
          />
          <View
            className='search-bar__clear'
            style={clearIconStyle}
            onTouchStart={this.handleClear}
          >
            <Icon className='icon icon-clear' type='clear' size='16' />
          </View>
        </View>
        <View
          className='search-bar__action'
          style={actionStyle}
          onClick={this.handleActionClick}
        >
          {actionName}
        </View>
      </View>
    );
  }
}

SearchBar.defaultProps = {
  className: '',
  customStyle: '',
  value: '',
  placeholder: '搜索',
  maxLength: 140,
  fixed: false,
  focus: false,
  disabled: false,
  showActionButton: false,
  actionName: '取消',
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  onConfirm: () => {},
  onActionClick: () => {},
};

export default SearchBar;
