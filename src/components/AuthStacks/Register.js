import React, { Component } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { colors } from '../../config';
import { connect } from 'react-redux';
import { Form, Input, Tip, ConfirmModal } from 'beeshell';
import { Button } from 'react-native-elements';
import * as SmsApis from '../../apis/sms';
import * as accountApis from '../../apis/account';
import * as userActions from '../../actions/user';

const FormItem = Form.Item;

class Register extends Component {
  static navigationOptions = {
    title: '注册'
  };
  constructor(props) {
    super(props);
    this.state = {
      tipText: '',
      hasSendMsg: false,
      timer: 60,
      mobile: '',
      password: '',
      confirmPassword: '',
      smsCode: ''
    };
  }

  componentWillUnmount() {
    clearInterval(this.sendMsgTimer);
  }

  getSmsCode = async () => {
    const { mobile } = this.state;
    if (!mobile) {
      this.$tips('请输入您的注册手机号');
      return;
    }
    if (mobile.length !== 11) {
      this.$tips('请输入有效的手机号');
      return;
    }
    try {
      const res = await SmsApis.registerSms({ mobile });
      if (res.code === 0) {
        this.$tips('短信已下发，请注意查收！');
        this.setState({ hasSendMsg: true });
        let { timer } = this.state;
        this.sendMsgTimer = setInterval(() => {
          __DEV__ && console.log('second to resend:', timer);
          timer -= 1;
          this.setState({ timer });
          if (timer === 0) {
            this.setState({ hasSendMsg: false, timer: 60 });
            clearInterval(this.sendMsgTimer);
            return;
          }
        }, 1000);
        return res;
      }
    } catch (error) {
      Alert.alert('错误', '请稍后再试', [{ text: '确认' }]);
    }
  };

  submit = async () => {
    const { mobile, password, confirmPassword, smsCode } = this.state;
    if (!mobile) {
      this.$tips('请输入您的注册手机号');
      return;
    }
    if (mobile.length !== 11) {
      this.$tips('请输入有效的手机号');
      return;
    }
    if (!password || !confirmPassword) {
      this.$tips('请输入您的登录密码！');
      return;
    }
    if (!smsCode) {
      this.$tips('请输入验证码！');
      return;
    }
    if (password.length < 6) {
      this.$tips('密码不能少于6位字符！');
      return;
    }
    if (password !== confirmPassword) {
      this.$tips('两次输入密码不一致！');
      return;
    }
    try {
      const res = await accountApis.register({
        mobile,
        password,
        authcode: smsCode
      });
      if (res.code === 0) {
        this._confirmModal.open();
        return res;
      }
    } catch (error) {
      Alert.alert('错误', '请稍后再试', [{ text: '确认' }]);
    }
  };

  $tips = async signal => {
    try {
      await this.setState({ tipText: signal });
      this._tip.open();
      return;
    } catch (e) {
      return e;
    }
  };

  render() {
    __DEV__ && console.log('register_screen props:', this.props);
    let { hasSendMsg, timer } = this.state;
    const { navigation, clearAuth } = this.props;
    return (
      <View>
        <Tip
          ref={c => {
            this._tip = c;
          }}
          body={this.state.tipText}
          duration={3000}
          alignItems="flex-end"
        />
        <ConfirmModal
          ref={c => {
            this._confirmModal = c;
          }}
          title="注册成功"
          body="您已成功注册狗狗金融账户，立即前往登录"
          cancelable={false}
          confirmCallback={() => {
            navigation.push('Login');
          }}
        />
        <View>
          <Form>
            <FormItem prop="mobile" label="手机号" hasLine labelWidth={70}>
              <Input
                placeholder="请输入您的手机号"
                textAlign="left"
                value={this.state.mobile}
                onChange={text => {
                  this.setState({ mobile: text });
                }}
              />
            </FormItem>
            <FormItem prop="password" label="登录密码" hasLine labelWidth={70}>
              <Input
                placeholder="请设置您的登录密码"
                textAlign="left"
                secureTextEntry={true}
                value={this.state.password}
                onChange={text => {
                  this.setState({ password: text });
                }}
              />
            </FormItem>
            <FormItem prop="confirmPassword" label="确认密码" hasLine labelWidth={70}>
              <Input
                placeholder="确认您的登录密码"
                textAlign="left"
                secureTextEntry={true}
                value={this.state.confirmPassword}
                onChange={text => {
                  this.setState({ confirmPassword: text });
                }}
              />
            </FormItem>
            <FormItem prop="password" label="验证码" hasLine labelWidth={70}>
              <View style={styles.msgCode}>
                <Input
                  placeholder="6位短信验证码"
                  textAlign="left"
                  value={this.state.smsCode}
                  onChange={text => {
                    this.setState({ smsCode: text });
                  }}
                />
                <Button
                  title={hasSendMsg ? `重新发送(${timer}s)` : '获取验证码'}
                  backgroundColor={colors.THEME_COLOR}
                  fontSize={12}
                  disabled={hasSendMsg}
                  fontWeight="400"
                  borderRadius={5}
                  buttonStyle={{ padding: 7 }}
                  onPress={this.getSmsCode}
                />
              </View>
            </FormItem>
          </Form>
        </View>
        <View style={styles.confirm_btn_container}>
          <Button
            title="注册"
            backgroundColor={colors.THEME_COLOR}
            fontSize={18}
            fontWeight="400"
            borderRadius={5}
            onPress={this.submit}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  confirm_btn_container: {
    paddingTop: 20
  },
  msgCode: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
});

const mapState2props = state => {
  return {
    mobile: state.mobile,
    ticket: state.ticket
  };
};

export default connect(
  mapState2props,
  userActions
)(Register);
