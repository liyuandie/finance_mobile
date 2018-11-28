import React, { Component } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { colors } from '../../config';
import { connect } from 'react-redux';
import { Form, Input, Tip, ConfirmModal } from 'beeshell';
import { Button } from 'react-native-elements';
import * as SmsApis from '../../apis/sms';
import * as PwdApis from '../../apis/password';
import * as userActions from '../../actions/user';

const FormItem = Form.Item;

class ChangeLoginPassword extends Component {
  static navigationOptions = {
    title: '修改登录密码'
  };
  constructor(props) {
    super(props);
    this.state = {
      tipText: '',
      hasSendMsg: false,
      timer: 60,
      newPwd: '',
      confirmNewPwd: '',
      smsCode: ''
    };
  }

  componentWillUnmount() {
    clearInterval(this.sendMsgTimer);
  }

  getSmsCode = async () => {
    const { mobile } = this.props;
    try {
      const res = await SmsApis.loginPwdSms({ mobile });
      if (res.code === 0) {
        this.$tips('短信已下发，请注意查收！');
        this.setState({ hasSendMsg: true });
        let { timer } = this.state;
        this.sendMsgTimer = setInterval(() => {
          console.log('second to resend:', timer);
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
      Alert.alert('错误', error.message, [{ text: '确认' }]);
    }
  };

  submit = async () => {
    const { newPwd, confirmNewPwd, smsCode } = this.state;
    if (!newPwd || !confirmNewPwd) {
      this.$tips('请输入新的登录密码！');
      return;
    }
    if (!smsCode) {
      this.$tips('请输入验证码！');
      return;
    }
    if (newPwd.length < 6) {
      this.$tips('密码不能少于6位字符！');
      return;
    }
    if (newPwd !== confirmNewPwd) {
      this.$tips('两次输入密码不一致！');
      return;
    }
    try {
      const { mobile, ticket } = this.props;
      const res = await PwdApis.modifyLoginPwd({
        mobile,
        ticket,
        new_password: newPwd,
        auth_code: smsCode
      });
      if (res.code === 0) {
        this.$tips('密码修改成功');
        this._confirmModal.open();
        return res;
      }
    } catch (error) {
      Alert.alert('错误', error.message, [{ text: '确认' }]);
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
    __DEV__ && console.log('modify_login_psaaword props:', this.props);
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
          title="提示"
          body="您的账户密码已修改，请重新登录！"
          cancelable={false}
          confirmCallback={() => {
            clearAuth();
            navigation.navigate('Initialize');
          }}
        />
        <View>
          <Form>
            <FormItem prop="mobile" label="新密码" hasLine labelWidth={70}>
              <Input
                placeholder="新的密码"
                textAlign="left"
                secureTextEntry={true}
                value={this.state.newPwd}
                onChange={text => {
                  this.setState({ newPwd: text });
                }}
              />
            </FormItem>
            <FormItem prop="password" label="确认密码" hasLine labelWidth={70}>
              <Input
                placeholder="确认新的密码"
                textAlign="left"
                secureTextEntry={true}
                value={this.state.confirmNewPwd}
                onChange={text => {
                  this.setState({ confirmNewPwd: text });
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
            title="确认修改"
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
)(ChangeLoginPassword);
