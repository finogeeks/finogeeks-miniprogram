import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './index.scss';

class SuggestBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSelect = text => {
    this.props.onSelect && this.props.onSelect(text);
  };

  getData = () => {
    const { suggests } = this.props;
    const { result, keyword } = suggests;

    return result.map(line => {
      const keys = line.standardQuestion.split(keyword);
      const nodes = keys.reduce((total, current, index) => {
        if (index === 0 && line.standardQuestion.startsWith(keyword)) {
          return total.concat({ value: keyword, type: 'highlight' });
        }
        if (current) {
          let l = [{ value: current, type: 'normal' }];
          if (index !== keys.length - 1) {
            l.push({ value: keyword, type: 'highlight' });
          }
          return total.concat(l);
        }
        return total;
      }, []);
      return {
        nodes,
        text: line.standardQuestion,
      };
    });
  };

  render() {
    const data = this.getData();
    return (
      <View className='suggest'>
        {data.map((item, index) => {
          return (
            <View
              onClick={this.handleSelect.bind(this, item.text)}
              key={index}
              className='item'
            >
              {item.nodes.map((text, i) => {
                return (
                  <Text key={i} className={text.type}>
                    {text.value}
                  </Text>
                );
              })}
            </View>
          );
        })}
      </View>
    );
  }
}

SuggestBox.defaultProps = {
  suggests: {
    keyword: '',
    result: [],
  },
  keyword: '',
  onSelect: () => {},
};

export default SuggestBox;
