import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { timeUtils, numberUtils, tenderUtils } from '../../../utils';
import { colors } from '../../../config';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import { CheckBox } from 'react-native-elements';

const { width } = Dimensions.get('window');

class CreateInvestOrder extends Component {
  static navigationOptions = {
    title: '出借'
  };
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      amount: '',
      InputErrorMessage: '',
      checked: false,
      profit: '0'
    };
  }

  async componentDidMount() {}

  buyAll = () => {
    const { balance, navigation } = this.props;
    const product = navigation.getParam('product');
    if (balance.usable < product.finance_info.remind) {
      this.setState({
        InputErrorMessage: '余额不足,请充值'
      });
      return;
    }
    this.setState({
      amount: (product.finance_info.remind / 100).toString()
    });
    this.checkInputValue((product.finance_info.remind / 100).toString());
    return;
  };
  checkInputValue = value => {
    const { balance, navigation } = this.props;
    const { usable } = balance;
    const product = navigation.getParam('product');
    let valueNum = parseInt(value);
    __DEV__ && console.log('输入的购买金额是：', valueNum);
    if (valueNum > usable / 100) {
      this.setState({
        InputErrorMessage: '余额不足'
      });
      return;
    }
    if (valueNum > product.finance_info.remind / 100) {
      this.setState({
        InputErrorMessage: '已超出剩余可投资金额'
      });
      return;
    }
    const daysOfEaring = timeUtils.daysOfEaring(product);
    const interest = product.interest / 100;
    const profit = numberUtils.countProfit(valueNum, daysOfEaring, interest);
    this.setState({
      InputErrorMessage: '',
      profit: profit
    });
    return;
  };

  render() {
    __DEV__ && console.log('CreateInvestOrder screen props:', this.props);
    const { navigation, balance } = this.props;
    const product = navigation.getParam('product');
    const { InputErrorMessage, checked, profit } = this.state;
    __DEV__ && console.log('PRODUCT TO INVEST:', product);
    return (
      <View style={styles.container}>
        <View style={styles.block}>
          <View style={styles.col_box}>
            <Text style={styles.name}>— {product.name} —</Text>
            <Text style={styles.interest}>{product.interest.toFixed(2)} %</Text>
            <Text style={styles.small}>年化利率</Text>
          </View>
          <View style={styles.row_box}>
            <Text style={styles.key}>投资期限</Text>
            <Text style={styles.value}>{timeUtils.daysOfEaring(product)} 天</Text>
          </View>
          <View style={styles.row_box}>
            <Text style={styles.key}>剩余可投</Text>
            <Text style={styles.value}>{(product.finance_info.remind / 100).toFixed(2)} 元</Text>
          </View>
          <View style={{ ...styles.row_box, borderBottomWidth: 0 }}>
            <Text style={styles.key}>回款方式</Text>
            <Text style={styles.value}>一次性支付本金和收益</Text>
          </View>
        </View>
        <View style={{ ...styles.block, marginBottom: 10 }}>
          <View style={{ width: '100%' }}>
            <View style={styles.InputContainer}>
              <FormLabel containerStyle={styles.labelContainer} labelStyle={styles.label}>
                出借金额
              </FormLabel>
              <FormInput
                containerStyle={styles.textInputContainer}
                inputStyle={styles.textInput}
                placeholder={'请输入出借金额,起投1元'}
                onChangeText={async x => {
                  await this.setState({ amount: x });
                  this.checkInputValue(x);
                }}
                value={this.state.amount}
              />
              <Button
                title={'全部买入'}
                backgroundColor={colors.THEME_COLOR}
                buttonStyle={styles.allBtn}
                fontSize={10}
                color="#ffffff"
                borderRadius={5}
                containerViewStyle={{
                  marginRight: 10
                }}
                onPress={this.buyAll}
              />
            </View>
          </View>
        </View>
        <View style={styles.tipsContainer}>
          <View style={styles.tips}>
            <Text style={styles.key}>账户可用余额：</Text>
            <Text style={{ ...styles.value, color: colors.THEME_COLOR, paddingRight: 3 }}>{balance.usable / 100}</Text>
            <Text style={styles.value}>元</Text>
          </View>
          <View style={styles.tips}>
            <Text style={styles.key}>预计收益：</Text>
            <Text style={{ ...styles.value, color: colors.LOGO_COLOR, paddingRight: 3 }}>{profit}</Text>
            <Text style={styles.value}>元</Text>
          </View>
        </View>
        <View style={styles.errorMessageContainer}>
          <FormValidationMessage containerStyle={styles.errorContainer} labelStyle={styles.error}>
            {InputErrorMessage}
          </FormValidationMessage>
        </View>
        <View style={styles.submitContainer}>
          <Button
            title="创建订单"
            backgroundColor={colors.THEME_COLOR}
            borderRadius={20}
            buttonStyle={{ width: width * 0.8, height: 40 }}
            fontSize={15}
          />
          <View style={styles.check}>
            <CheckBox
              title="Click Here"
              checked={this.state.checked}
              containerStyle={styles.CheckBoxContainer}
              iconType="material"
              checkedIcon="check-box"
              uncheckedIcon="check-box-outline-blank"
              uncheckedColor="#8e8e8e"
              checkedColor={colors.THEME_COLOR}
              title={'我已仔细阅读并同意'}
              textStyle={styles.CheckBoxText}
              size={18}
              onPress={() => {
                this.setState({
                  checked: !checked
                });
              }}
            />
            <Text style={styles.contract} onPress={() => navigation.push('Contracts', { type: 1 })}>
              《投资须知》
            </Text>
            <Text style={{ ...styles.contract, color: '#272727' }}>与</Text>
            <Text style={styles.contract} onPress={() => navigation.push('Contracts', { type: 2 })}>
              《风险提醒书》
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  block: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    marginBottom: 20
  },
  col_box: {
    alignItems: 'center',
    marginBottom: 30
  },
  row_box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width - 20,
    height: 40,
    alignItems: 'center',
    borderBottomColor: '#bebebe',
    borderBottomWidth: 0.2
  },
  name: {
    color: colors.THEME_COLOR,
    fontSize: 15,
    paddingTop: 20
  },
  interest: {
    color: colors.INTEREST_COLOR,
    fontSize: 30,
    paddingTop: 10,
    fontWeight: '500'
  },
  small: {
    fontSize: 12,
    color: '#8e8e8e',
    paddingTop: 5
  },
  key: {
    fontSize: 13,
    color: '#8e8e8e'
  },
  value: {
    fontSize: 13,
    color: '#272727'
  },
  InputContainer: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  labelContainer: {
    justifyContent: 'center'
  },
  label: {
    fontSize: 13,
    color: colors.THEME_COLOR,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 0,
    marginBottom: 0
  },
  textInputContainer: {
    marginRight: 0,
    marginLeft: 20,
    borderBottomWidth: 0,
    width: width * 0.5
  },
  textInput: {
    fontSize: 13,
    color: '#272727'
  },
  allBtn: {
    height: 15
  },
  allBtn: {
    padding: 8,
    width: 60
  },
  tipsContainer: {
    flexDirection: 'row',
    width: width - 20,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'space-between'
  },
  tips: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  submitContainer: {
    width: width,
    alignItems: 'center',
    marginTop: 50
  },
  errorMessageContainer: {
    width: width,
    alignItems: 'center'
  },
  CheckBoxContainer: {
    backgroundColor: null,
    borderWidth: 0,
    padding: 0,
    margin: 0,
    marginRight: 0
  },
  CheckBoxText: {
    fontSize: 12,
    color: '#272727',
    marginRight: 0,
    marginLeft: 0,
    fontWeight: '400'
  },
  check: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  contract: {
    fontSize: 12,
    color: colors.THEME_COLOR
  },
  errorContainer: {
    marginTop: 10
  },
  error: {
    fontSize: 12
  }
});

const mapState2Props = state => {
  return {
    user: state.user,
    mobile: state.mobile,
    ticket: state.ticket,
    balance: state.balance
  };
};

export default connect(
  mapState2Props,
  null
)(CreateInvestOrder);
