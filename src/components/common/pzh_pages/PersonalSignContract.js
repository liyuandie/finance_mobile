import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { baseCfg, callbackCfg } from '../../../sdk-pzh-bank/config';
import { timeUtils, numberUtils } from '../../../utils';
import { colors } from '../../../config';
import * as pzhApis from '../../../apis/pzh_account';
import { getReqDataForPersonalSignContract } from '../../../sdk-pzh-bank/utils/reqData';
import { pzh_getBasicForm, pzh_getStrToSign, pzh_getStrForReqData } from '../../../sdk-pzh-bank/utils/form';

const { width } = Dimensions.get('window');

class PersonalSignContract extends Component {
  static navigationOptions = {
    title: '个人用户签约'
  };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      errorMsg: ''
    };
  }

  submit = async () => {
    const { mobile, ticket, user, navigation } = this.props;
    const { name } = this.state;
    if (!name) {
      this.setState({
        errorMsg: '请输入您的真实姓名'
      });
      return;
    } else if (name.indexOf(' ') >= 0) {
      this.setState({
        errorMsg: '名字中不能包含空格'
      });
      return;
    }
    try {
      const res = await pzhApis.personalSignContract({
        mobile,
        ticket,
        user_id: user.id.toString(),
        user_type: '01',
        user_mobile: mobile,
        user_name: name,
        remark: 'no',
        busway: '01',
        apply_time: timeUtils.getCurrentTime()
      });
      __DEV__ && console.log('order number is:', res.order_no);
      if (res.code === 0) {
        const orderNo = res.order_no;
        const applyTime = timeUtils.getCurrentTime();
        const reqDataObj = getReqDataForPersonalSignContract(orderNo, name, callbackCfg, applyTime);
        const strToSign = pzh_getStrToSign(reqDataObj, baseCfg);
        let formData = pzh_getBasicForm(
          baseCfg.GETWAYS.signContract,
          strToSign,
          baseCfg.service.personalContract,
          baseCfg
        );
        formData.reqData = pzh_getStrForReqData(reqDataObj);
        navigation.push('FormWebview', {
          title: '开通存管账户',
          formData: formData
        });
      } else {
        Alert.alert(res.message);
      }
    } catch (error) {
      Alert.alert('出错啦');
      __DEV__ && console.log(error);
    }
  };

  render() {
    __DEV__ && console.log('PersonalSignContract screen props:', this.props);
    const { errorMsg } = this.state;
    const { mobile } = this.props;
    return (
      <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center' }}>
        <Text style={styles.title}>—— 签约信息 ——</Text>
        <View style={styles.row_box}>
          <FormLabel labelStyle={styles.label} containerStyle={styles.labelContainer}>
            签约类型
          </FormLabel>
          <Text style={styles.value}>个人用户</Text>
        </View>
        <View style={styles.row_box}>
          <FormLabel labelStyle={styles.label} containerStyle={styles.labelContainer}>
            角色类型
          </FormLabel>
          <Text style={styles.value}>出借人</Text>
        </View>
        <View style={styles.row_box}>
          <FormLabel labelStyle={styles.label} containerStyle={styles.labelContainer}>
            手机号码
          </FormLabel>
          <Text style={styles.value}>{numberUtils.encryptMobile(mobile)}</Text>
        </View>
        <View style={{ ...styles.row_box, marginTop: 10 }}>
          <FormLabel labelStyle={styles.label} containerStyle={styles.labelContainer}>
            真实姓名
          </FormLabel>
          <FormInput
            containerStyle={styles.inputContainer}
            placeholder="请输入您的真实姓名"
            inputStyle={styles.input}
            value={this.state.name}
            onChangeText={value => {
              this.setState({
                name: value,
                errorMsg: ''
              });
            }}
          />
        </View>
        <FormValidationMessage labelStyle={styles.errorText}>{errorMsg}</FormValidationMessage>
        <Button
          title="确认信息"
          containerViewStyle={styles.btn}
          backgroundColor={colors.THEME_COLOR}
          borderRadius={20}
          buttonStyle={{ width: width * 0.8, height: 40 }}
          fontSize={15}
          onPress={this.submit}
        />
        <Text style={styles.title}>—— 为什么选择存管银行？ ——</Text>
        <Text style={styles.text}>
          2016年8月，银监会就P2P网贷行业的监管问题发布了《网络借贷信息中介机构业务活动管理暂行办法》。其中第28条明确表示：“网络借贷信息中介机构应当实行自身资金与出借人和借款人资金的隔离管理，并选择符合条件的银行业金融机构作为出借人与借款人的资金存管机构。”落实银行存管已经成为衡量网贷平台是否合规的硬性指标。
        </Text>
        <Text style={styles.title}>—— 关于攀枝花市商业银行 ——</Text>
        <Text style={styles.text}>
          攀枝花市商业银行成立20年来，本着为中小企业提供优质、高效的服务的目标，着力打造中小企业金融品牌，以专业化团队、专业化产品、专业化服务、专业化管理，在中小企业业务领域开展多项创新。攀枝花市商业银行始终坚持把“发展攀枝花经济，服务攀枝花人民”作为构建自身经营特色的方向，紧紧围绕市委、市政府确立的打造区域性金融中心和经济社会发展目标，全面深化支持区县域经济发展战略，不断增强信贷经营与地方经济发展的融合度，积极筹集资金支持地方经济建设。11年来，累计发放贷款（含贴现）超过540亿元。
        </Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff'
  },
  title: {
    paddingTop: 10,
    textAlign: 'center',
    color: colors.THEME_COLOR,
    fontSize: 13,
    paddingBottom: 10
  },
  value: {
    color: '#272727',
    fontSize: 13
  },
  row_box: {
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    width: width - 20,
    marginTop: 20
  },
  inputContainer: {
    marginLeft: 0,
    marginRight: 0,
    borderBottomWidth: 0.5
    // width: '100%'
  },
  input: {
    width: width * 0.7,
    fontSize: 13,
    color: '#272727',
    height: 40
  },
  labelContainer: {
    justifyContent: 'center'
  },
  label: {
    marginRight: 20,
    marginLeft: 0,
    marginTop: 0,
    marginBottom: 0,
    color: '#8e8e8e',
    fontSize: 13
  },
  btn: {
    marginTop: 20,
    marginBottom: 20
  },
  text: {
    fontSize: 12,
    color: '#646464',
    lineHeight: 18,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
    paddingBottom: 20,
    letterSpacing: 0.5
  },
  errorText: {
    fontSize: 13,
    paddingTop: 10
  }
});

const mapState2Props = state => {
  return {
    mobile: state.mobile,
    ticket: state.ticket,
    user: state.user
  };
};

export default connect(
  mapState2Props,
  null
)(PersonalSignContract);
