import Taro, { Component } from '@tarojs/taro';
import { View, Text, ScrollView } from '@tarojs/components';
import extInfo from '@/utils/ext';
import './index.scss';

// const mapStateToProps = ({navigation}) => {
//   return {
//     navBarHeight: navigation.style.height + navigation.style.paddingTop,
//   }
// }

// @connect(mapStateToProps)
class Privacy extends Component {
  config = {
    navigationBarTitleText: '隐私声明',
    navigationBarBackgroundColor: extInfo.THEME_COLOR.NAV_bg,
    navigationBarTextStyle: 'black',
    // disableScroll: true
  };

  constructor() {
    // this.state = {
    //   scrollHeight: 0,
    // }
  }

  componentWillMount() {
    const systemInfo = Taro.getSystemInfoSync();
    const { windowHeight } = systemInfo;
    const scrollHeight = windowHeight - this.props.navBarHeight;
    console.log(scrollHeight);
    // this.setState({ scrollHeight })
  }

  render() {
    return (
      <View className='privacy'>
        {/* <NavBar title='隐私声明' /> */}
        {/* <ScrollView
          className='privacy-content'
          scrollY
          scrollWithAnimation
          scrollTop='0'
          style={{ height: `${this.state.scrollHeight}px` }}
          lowerThreshold='20'
          upperThreshold='20'
          enableBackToTop
        > */}
        <View className='title'>工行在线隐私保密声明</View>
        <View className='body'>
          <View className='intro'>本声明将帮助你了解以下内容：</View>
          <View className='section'>
            工商银行（后称“我们”）非常重视用户的隐私和个人信息保护。你在使用工行线上的产品与/或服务时，我们可能会收集和使用你的相关信息。我们希望通过《工行在线隐私保密声明》（“本隐私声明”）向你说明我们在你使用工行在线产品与服务时如何收集、使用和保存这些信息，以及我们为你提供的更新、删除和保护这些信息的方式。
          </View>
          <View className='section'>
            欢迎浏览和使用工行在线。工行在线是中国工商银行广东省分行线上线下一体化服务解决方案，在线客户经理为您提供金融产品、投资理财、网点预约等个性化金融服务。我们尊重并保护所有使用用户的个人隐私权，以下是我们对用户个人信息所采取的收集、使用和保护政策：
          </View>
          <View className='section'>
            1.我们将通过微信或融e联的社交渠道信息验证等形式获取你的个人信息资料，这些个人信息包括：昵称、头像、性别、地理位置、手机号。收集这些信息是为了帮助你完成注册，保护你工行在线帐号的安全。地理位置和手机号码属于敏感信息，收集此类信息是为了寻找离你最近的我行服务人员和满足相关法律法规的网络实名制要求。若你不提供这类信息，你可能无法正常使用我们的相关的功能，但不影响你正常使用本产品的其他功能。
          </View>
          <View className='section'>
            2.为服务用户的和维护我们服务的正常运行，改进及优化我们的服务体验以及保障你的帐号安全，我们还会收集你的如下日志信息：
            <Text className='bold'>
              设备型号、操作系统、唯一设备标识符、登陆IP地址、微信软件版本号、接入网络的方式、类型和状态、网络质量数据、设备加速器（如重力感应设备）、操作日志、服务日志信息（如你在微信搜索、查看的信息、服务故障信息、引荐网址等信息）
            </Text>
            。这类信息是为提供服务必须收集的基础信息。不会披露给第三方，不会用于广告投放、市场营销或基于使用情况进行其他数据挖掘。
          </View>
          <View className='section'>
            3.本网站将采取适当的管理措施和技术手段，以保护您提供的个人信息的安全，防止您的个人资料丢失、被盗用或遭篡改。我们会按照法律法规规定，将境内收集的用户个人信息存储于中国境内。一般而言，我们仅为实现对客服务所必需的时间保留你的个人信息，例如：微信号和手机号码：若你需要使用工行在线的留言服务，我们需要一直保存你的微信号和手机号码，以保证你的留言可以得到及时的回复，当你注销微信帐户后，我们将删除相应的信息；当我们的产品或服务发生停止运营的情形时，我们将以推送通知、公告等形式通知你，并在合理的期限内删除你的个人信息或进行匿名化处理。
          </View>
          <View className='section'>
            4.根据相关法律法规及国家标准，以下情形中，我们可能会收集、使用你的相关个人信息无需征求你的授权同意：1)
            与国家安全、国防安全等国家利益直接相关的；与公共安全、公共卫生、公众知情等重大公共利益直接相关的；2)
            与犯罪侦查、起诉、审判和判决执行等直接相关的；3)
            出于维护你或其他个人的生命、财产、声誉等重大合法权益但又很难得到本人同意的；4)
            所收集的个人信息是你自行向社会公众公开的；5)
            从合法公开披露的信息中收集个人信息的，如合法的新闻报道、政府信息公开等渠道；6)
            根据你要求签订和履行合同所必需的；7)
            用于维护所提供的产品或服务的安全稳定运行所必需的，例如发现、处置产品或服务的故障；8)
            为开展合法的新闻报道所必需的；9)
            出于公共利益开展统计或学术研究所必要，且其对外提供学术研究或描述的结果时，对结果中所包含的个人信息进行去标识化处理的；10)
            法律法规规定的其他情形。请你理解，我们向你提供的功能和服务是不断更新和发展的，如果某一功能或服务未在前述说明中且收集了你的信息，我们会通过页面提示、交互流程、网站公告等方式另行向你说明信息收集的内容、范围和目的，以征得你的同意。
          </View>
          <View className='section'>
            5.我们非常重视对未成年人个人信息的保护。若你是18周岁以下的未成年人，在使用我们的产品与/或服务前，应事先取得你家长或法定监护人的书面同意。工行根据国家相关法律法规的规定保护未成年人的个人信息。对于经父母或法定监护人同意而收集未成年人个人信息的情况，我们只会在受到法律允许、父母或监护人明确同意或者保护未成年人所必要的情况下使用或公开披露此信息。如果我们发现自己在未事先获得可证实的父母或法定监护人同意的情况下收集了未成年人的个人信息，则会设法尽快删除相关数据。
          </View>
          <View className='section'>
            6.本网站对以下情况所导致的个人资料泄露、丢失、被盗用或被篡改不承担任何责任：1）你将用户密码告知他人或与他人共享注册帐户；2）因黑客政击、计算机病毒侵入或发作、政府管制等不可抗力原因；
            <Text className='bold'>
              3）在工行在线小程序中由微信平台推送的其它网站链接。
            </Text>
          </View>
          <View className='section'>
            7.为给你提供更好的服务，本隐私政策也会随业务发展不定期更新，并在生效前通过在线公告或以其他适当方式提醒你相关内容的更新。但未经你明确同意，我们不会削减你依据本隐私政策所应享有的权利。
          </View>
          <View className='section'>
            8.如您对本隐私政策或您个人信息的相关事宜有任何问题、意见或建议，请通过工行在线留言功能或拨打95588客服系统等多种方式与我们联系。
          </View>
          <View className='tips'>
            【特别提示】请仔细阅读《工行在线隐私保密声明》并确定了解我们对你个人信息的处理规则。如你不同意声明中的任何条款，你应立即停止访问或使用工行在线小程序和公众号。
          </View>
        </View>
        {/* </ScrollView> */}
      </View>
    );
  }
}

export default Privacy;
