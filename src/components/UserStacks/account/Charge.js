import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import { colors } from '../../../config';

const { width } = Dimensions.get('window');
class Charge extends Component {
  static navigationOptions = {
    title: '快捷充值'
  };

  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      certType: '01'
    };
  }

  render() {
    __DEV__ && console.log('Charge screen props:', this.props);
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={{ ...styles.block, marginBottom: 10 }}>
          <Text style={styles.title}>充值金额</Text>
          <View style={{ width: '100%', marginBottom: 20 }}>
            <View style={styles.InputContainer}>
              <FormLabel containerStyle={styles.labelContainer} labelStyle={styles.label}>
                ￥
              </FormLabel>
              <FormInput
                containerStyle={styles.textInputContainer}
                inputStyle={styles.textInput}
                onChangeText={x => {
                  this.setState({ amount: x });
                }}
                value={this.state.amount}
                maxLength={8}
              />
            </View>
          </View>
        </View>
        <View style={{ ...styles.block, marginBottom: 10 }}>
          <Text style={{ ...styles.title }}>充值信息</Text>
          <View style={styles.row_box}>
            <Text style={styles.key}>充值账号</Text>
            <Text style={styles.value}>131****5197</Text>
          </View>
          <View style={styles.row_box}>
            <Text style={styles.key}>证件类型</Text>
            <Text style={styles.value}>身份证</Text>
          </View>
          <View style={{ ...styles.row_box, borderBottomWidth: 0 }}>
            <Text style={styles.key}>充值方式</Text>
            <Text style={styles.value}>快捷充值</Text>
          </View>
        </View>

        <Button
          title="下一步"
          backgroundColor={colors.THEME_COLOR}
          borderRadius={5}
          buttonStyle={{ width: width - 40, height: 45 }}
          fontSize={18}
          containerViewStyle={{ marginTop: 20, marginLeft: 20, marginRight: 20 }}
        />
        <Text style={styles.tip}>温馨提示：网银充值请到官方网站个人中心进行充值</Text>
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
    marginBottom: 20
  },
  row_box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width - 40,
    height: 40,
    alignItems: 'center',
    borderBottomColor: '#bebebe',
    borderBottomWidth: 0.2,
    marginLeft: 20
  },
  title: {
    padding: 20,
    fontSize: 15,
    letterSpacing: 0.5,
    fontWeight: '100'
  },
  InputContainer: {
    flexDirection: 'row',
    // height: 100,
    alignItems: 'center'
  },
  labelContainer: {
    justifyContent: 'center'
  },
  label: {
    fontSize: 30,
    color: '#000000',
    marginLeft: 20,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0
  },
  textInputContainer: {
    marginRight: 0,
    marginLeft: 10,

    borderBottomWidth: 0
    // width: width * 0.5
  },
  textInput: {
    fontSize: 45,
    color: '#272727',
    letterSpacing: 2
  },
  key: {
    fontSize: 13,
    color: '#8e8e8e'
  },
  value: {
    fontSize: 13,
    color: '#272727'
  },
  tip: {
    fontSize: 12,
    color: '#8e8e8e',
    textAlign: 'center',
    padding: 10
  }
});

const mapState2Props = state => {
  return {
    mobile: state.mobile,
    ticket: state.ticket
  };
};

export default connect(
  mapState2Props,
  null
)(Charge);
