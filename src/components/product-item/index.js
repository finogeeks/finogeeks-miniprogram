import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { toThousands } from '@/utils/util';
import extInfo from '@/utils/ext';
import './index.scss';
//字段字典
const fieldDictionaries = {
  //存款年利率
  depositInterestRate: '年利率',
  //贷款年利率
  loanRates: '年利率',
  depositTerm: '存期',
  purchaseAmount: '起购金额',
  loanTerm: '贷款期限',
  loanAmount: '最高可借',
  incomeType: '收益类型',
  incomeIndex: '收益指标',
  productTerm: '产品期限',
  comm3M: '近3月涨幅',
  navVal: '单位净值',
  expRateSevenDay: '七日年化',
  incPerTenThousand: '万份收益',
};
//不同产品类型，需要展示的不同字段
const typesOwnedFields = {
  //存款
  deposit: ['depositInterestRate', 'depositTerm', 'purchaseAmount'],
  //贷款
  loan: ['loanRates', 'loanTerm', 'loanAmount'],
  //定期理财
  regular: ['incomeType', 'productTerm', 'purchaseAmount'],
  //活期理财
  current: ['incomeType', 'productTerm', 'purchaseAmount'],
  //混合型基金
  hybridFund: ['comm3M', 'navVal', 'purchaseAmount'],
  //股票型基金
  equityFund: ['comm3M', 'navVal', 'purchaseAmount'],
  //债券型基金
  bondFund: ['comm3M', 'navVal', 'purchaseAmount'],
  //指数型基金
  indexFund: ['comm3M', 'navVal', 'purchaseAmount'],
  //FOF型基金
  fof: ['comm3M', 'navVal', 'purchaseAmount'],
  //QDII型基金
  qdii: ['comm3M', 'navVal', 'purchaseAmount'],
  //货币型基金
  currency: ['expRateSevenDay', 'incPerTenThousand', 'purchaseAmount'],
  //短期理财债券型基金
  shortTerm: ['expRateSevenDay', 'incPerTenThousand', 'purchaseAmount'],
  //短期理财债券型基金 - 兼容
  shortBondTerm: ['expRateSevenDay', 'incPerTenThousand', 'purchaseAmount'],
};
class ProductItem extends Component {

  async componentDidMount() {
    // console.log('productData--->');
    // console.log(this.props.productData);
    this.getFieldsData();
    this.getProductTypeName();
  };

  // 小数位不足2位的补零补足2位，小数位大于四位的只保留四位小数(直接截取)
  processDecimalPoint = (_val, isPercentage) => {
    let val = _val ? `${_val}` : '0';
    let lessThanZero = false;
    if (val.indexOf('-') >= 0) {
      val = val.replace('-', '');
      lessThanZero = true;
    }
    console.log('lessThanZero-->', lessThanZero);
    let incomeIndex = val ? val : 0;
    let pointIndex = `${incomeIndex}`.indexOf('.');
    var handleDecimalPoint = str => {
      let textStr = `${str ? str : '0'}`;
      let textStrArr = textStr.split('.');
      if (textStrArr[1] == undefined) {
        textStrArr[1] = '00';
      } else if (textStrArr[1].length > 0 && textStrArr[1].length < 2) {
        textStrArr[1] += `${Math.pow(10, 2 - textStrArr[1].length)}`.replace(
          '1',
          '',
        );
      } else if (textStrArr[1].length > 4) {
        textStrArr[1] = textStrArr[1].substring(0, 4);
      }
      if (lessThanZero) textStrArr.unshift('-');
      return [textStrArr.join('.'), textStrArr];
    };
    if (isPercentage) {
      let res = handleDecimalPoint(incomeIndex);
      return res[0];
    } else {
      //先移小数点(转换成百分数小数)，在处理小数点位数
      let allStrArr = [
        ...`${incomeIndex}`.replace('.', '').split(''),
        '0',
        '0',
      ];
      allStrArr.splice(pointIndex + 2, 0, '.');
      let newStr = allStrArr.join('');
      let integerArr = newStr.split('.')[0].split('');
      let newInteger = Number(integerArr.join(''));
      let decimalLen = newStr.split('.')[1].length - 2;
      let decimalStr = newStr
        .split('.')[1]
        .split('')
        .slice(0, decimalLen)
        .join('');
      let newDecimal = decimalStr;
      if (decimalLen < 1) {
        newDecimal = '00';
      } else if (decimalLen > 0 && decimalLen < 2) {
        newDecimal =
          decimalStr + `${Math.pow(10, 2 - decimalLen)}`.replace('1', '');
      } else if (decimalLen > 4) {
        newDecimal = decimalStr.slice(0, 4);
      }
      let res = `${newInteger}.${newDecimal}%`;
      if (lessThanZero) res = `-${res}`;
      return res;
    }
  };

  //小数位固定保留四位，不够的补零
  toFixed4 = val => {
    let textStr = `${val ? val : '0'}`;
    let textStrArr = textStr.split('.');
    if (textStrArr[1] == undefined) {
      textStrArr[1] = '0000';
    } else if (textStrArr[1].length > 0 && textStrArr[1].length < 4) {
      textStrArr[1] += `${Math.pow(10, 4 - textStrArr[1].length)}`.replace(
        '1',
        '',
      );
    } else if (textStrArr[1].length > 4) {
      textStrArr[1] = textStrArr[1].substring(0, 4);
    }
    return textStrArr.join('.');
  };

  //小数位有就展示，没有就不展示，最多展示2位，多了直接截取
  max2 = val => {
    let textStr = `${val ? val : '0'}`;
    let textStrArr = textStr.split('.');
    if (textStrArr[1] !== undefined) {
      textStrArr[1] = textStrArr[1].substring(0, 2);
    }
    return textStrArr.join('.');
  };

  //时间段处理
  timeSlot = timeSlotObj => {
    const deadline = (min, max) => {
      if (!min && !max) return '--';
      if (min === max || !min || !max) {
        const value = Number(min ? min : max || 0);
        if (value % 12 === 0) return `${value / 12}年`;
        return `${value}月`;
      }
      if (min % 12 === 0 && max % 12 === 0) return `${min / 12}-${max / 12}年`;
      return `${min}-${max}月`;
    }
    if (
      typeof timeSlotObj !== 'object' ||
      !timeSlotObj.min ||
      !timeSlotObj.max
    ) {
      return '--';
    }
    return deadline(timeSlotObj.min, timeSlotObj.max);
  };

  //获取产品类型名称
  getProductTypeName = async () => {
    const { typeName } = this.props;
    this.setState({ productTypeName : typeName || '产品类型名称' });
  };

  //年利率(存款)
  depositInterestRate = () => {
    let productData = this.props.productData;
    let val = this.processDecimalPoint(productData.depositInterestRate);
    return val;
  };

  //年利率(贷款)
  loanRates = () => {
    let productData = this.props.productData;
    let val = this.processDecimalPoint(productData.loanRates);
    return val;
  };

  //存期
  depositTerm = () => {
    let productData = this.props.productData;
    return this.timeSlot(productData.depositTerm);
  };

  //起购金额
  purchaseAmount = () => {
    let productData = this.props.productData;
    let purchaseAmount = productData.purchaseAmount;
    let value = purchaseAmount ? this.max2(purchaseAmount).toLocaleString() : '0';
    return value + '元';
  };

  //贷款期限
  loanTerm = () => {
    let productData = this.props.productData;
    return this.timeSlot(productData.loanTerm);
  };

  //贷款额度
  loanAmount = () => {
    let productData = this.props.productData;
    let loanAmount = productData.loanAmount;
    let value = loanAmount ? this.max2(loanAmount).toLocaleString() : '0';
    return value + '元';
  };

  //收益类型
  incomeType = () => {
    return this.props.productData.incomeType;
  };

  //收益指标
  incomeIndex = () => {
    let productData = this.props.productData;
    let incomeIndex = productData.incomeIndex;
    let incomeType = productData.incomeType
    return this.processDecimalPoint(incomeIndex, incomeType == '最新净值');
  };

  //产品期限
  productTerm = () => {
    let productData = this.props.productData;
    let productTerm = this.timeSlot(productData.productTerm);
    if (productData.type == 'current') {
      productTerm = '无固定';
    }
    return productTerm;
  };

  //近3月涨幅
  comm3M = () => {
    let productData = this.props.productData;
    return this.processDecimalPoint(productData.comm3M);
  };

  //单位净值(固定保留四位小数)
  navVal = () => {
    return this.toFixed4(this.props.productData.navVal);
  };

  //七日年化
  expRateSevenDay = () => {
    let productData = this.props.productData;
    let val = this.processDecimalPoint(productData.expRateSevenDay).replace(
        '%',
        '',
      );
    return this.toFixed4(val) + '%';
  };

  //万份收益
  incPerTenThousand = () => {
    let productData = this.props.productData;
    return this.processDecimalPoint(productData.incPerTenThousand, true);
  };

  getFieldsData = () => {
    const { type } = this.props.productData;
    if (!type || !typesOwnedFields[type]) return [];
    let fieldsData = [];
    typesOwnedFields[type].forEach(field => {
      let value = this.props.productData[field] || '--';
      if (typesOwnedFields[type].indexOf(field) > -1) {
        value = this[field]();
      }
      let dataObj = {
        type: fieldDictionaries[field] || '--',
        value: value,
      };
      if (field == 'incomeType') {
        dataObj.type = this.incomeType();
        dataObj.value = this.incomeIndex();
      }
      if (type == 'deposit' && field == 'purchaseAmount') {
        dataObj.type = '起存金额';
      }
      fieldsData.push(dataObj);
    });
    this.setState({ fieldsData })
    return fieldsData;
  };

  getRenderProps = () => {
    let { productTypeName, fieldsData } = this.state;
    const {
      name,
      code,
      advantage,
      condition,
      tags,
      type,
    } = this.props.productData;
    let { isDetail } = this.props;
    return {
      productTypeName,
      name,
      code,
      advantage: advantage || '',
      condition: condition || '',
      fieldsData,
      tags,
      type,
      isDetail
    }
  };

  render() {
    const {
      productTypeName,
      name,
      code,
      advantage,
      condition,
      fieldsData,
      tags,
      type,
      isDetail
    } = this.getRenderProps();
    const primaryColor = extInfo.THEME_COLOR.TP_n;
    // console.log('getRenderProps', this.getRenderProps());
    return (
      <View className={ isDetail ? 'product-item' : 'product-item isNotDetail'}>
        { isDetail &&
          (
            <Text className="product-type-name">
              {productTypeName}
            </Text>
          )
        }

        <View className='e-name'>
          <View className='name-code-wrap'>
            <Text
              className="name e-hidden"
              style={{
                color: type === 'internetBank' ? primaryColor : '#333',
              }}
            >
              {name}
            </Text>
            <Text className="code e-hidden">
              {code}
            </Text>
          </View>
        </View>

        {
          type == 'internetBank' &&
          (
            <View className='bank'>
              <View className='name-code-wrap'>
                <Text className="e-advantage e-hidden">
                  {advantage}
                </Text>
                <Text className="e-condition e-hidden">
                  {condition}
                </Text>
              </View>
            </View>
          )
        }

        {
          fieldsData.length == 3 && type !== 'internetBank' &&
          (
            <View className='l-info'>
              <View className='m-data'>
                <View className='e-data-left'>
                  <Text className="e-value e-hidden e-red">
                    {fieldsData[0].value}
                  </Text>
                  <Text className="e-type">
                    {fieldsData[0].type}
                  </Text>
                </View>
                <View className='e-data-middle'>
                  <Text className="e-value e-hidden">
                    {fieldsData[1].value}
                  </Text>
                  <Text className="e-type">
                    {fieldsData[1].type}
                  </Text>
                </View>
                <View className='e-data-right'>
                  <Text className="e-value e-hidden">
                    {fieldsData[2].value}
                  </Text>
                  <Text className="e-type">
                    {fieldsData[2].type}
                  </Text>
                </View>
              </View>
            </View>
          )
        }

        {
          tags.length > 0 && isDetail &&
          (
            <View className='m-tags'>
              {tags.map((item, index) => {
                return (
                  <View className='m-tags-item' key={index}>
                    {item}
                  </View>
                )
              })}
            </View>
          )
        }
      </View>
    );
  }
}

ProductItem.defaultProps = {
  typeName: '', //产品类型名称
  productData: {}, //产品信息
};

export default ProductItem;
