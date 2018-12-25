import React, { Component } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { colors } from '../../config';
import { connect } from 'react-redux';
import { Form, Input, Tip } from 'beeshell';
import { Button } from 'react-native-elements';
import * as SmsApis from '../../apis/sms';
import * as userActions from '../../actions/user';

const FormItem = Form.Item;

class SmsLogin extends Component {
  static navigationOptions = {
    title: '手机号验证'
  };
  constructor(props) {
    super(props);
    this.state = {
      tipText: '',
      hasSendMsg: false,
      timer: 60,
      smsCode: '',
      mobile: '',
      status: 0
    };
  }

  componentWillUnmount() {
    clearInterval(this.sendMsgTimer);
  }

  getSmsCode = async () => {
    const { mobile } = this.state;
    if (mobile.length === 0) {
      this.$tips('请输入手机号！');
      return;
    } else if (mobile.length !== 11) {
      this.$tips('请输入正确的手机号！');
      return;
    }
    try {
      const res = await SmsApis.CommonSms({ mobile });
      if (res.code === 0) {
        this.$tips('短信已下发，请注意查收！');
        this.setState({ hasSendMsg: true });
        let { timer } = this.state;
        this.sendMsgTimer = setInterval(() => {
          // __DEV__ && console.log('second to resend:', timer);
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
    const { mobile, smsCode } = this.state;
    const { SmsLogin, navigation } = this.props;
    if (!smsCode) {
      this.$tips('请输入验证码！');
      return;
    }
    try {
      this.setState({ status: 1 });
      const res = await SmsLogin({
        mobile,
        code: smsCode
      });
      if (res.code === 0) {
        this.$tips('手机号验证成功');
        navigation.push('ResetLoginPwd');
        return res;
      } else {
        this.setState({ status: 0 });
        Alert.alert('验证失败', '请重新验证', [{ text: '确认' }]);
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
    // __DEV__ && console.log('modify_login_psaaword props:', this.props);
    let { hasSendMsg, timer } = this.state;
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
        <View>
          <Form>
            <FormItem prop="password" label="手机号" hasLine labelWidth={70}>
              <Input
                placeholder="请输入您的手机账号"
                textAlign="left"
                value={this.state.mobile}
                onChange={text => {
                  this.setState({ mobile: text });
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
            title={this.state.status === 0 ? '验证' : '手机号验证中...'}
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
  return {};
};

export default connect(
  mapState2props,
  userActions
)(SmsLogin);
