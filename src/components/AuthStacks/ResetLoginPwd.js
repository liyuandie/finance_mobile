import React, { Component } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { colors } from '../../config';
import { connect } from 'react-redux';
import { Form, Input, Tip, ConfirmModal } from 'beeshell';
import { Button } from 'react-native-elements';
import * as PwdApis from '../../apis/password';
import * as userActions from '../../actions/user';

const FormItem = Form.Item;

class ResetLoginPwd extends Component {
  static navigationOptions = {
    title: '重置登录密码'
  };
  constructor(props) {
    super(props);
    this.state = {
      tipText: '',
      newPwd: '',
      confirmNewPwd: ''
    };
  }

  componentWillUnmount() {}

  submit = async () => {
    const { newPwd, confirmNewPwd } = this.state;
    if (!newPwd || !confirmNewPwd) {
      this.$tips('请输入新的登录密码！');
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
      const res = await PwdApis.resetLoginPwd({
        mobile,
        ticket,
        new_password: newPwd
      });
      if (res.code === 0) {
        this.$tips('密码重置成功');
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
    __DEV__ && console.log('reset_login_psaaword props:', this.props);
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
            navigation.push('Initialize');
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
          </Form>
        </View>
        <View style={styles.confirm_btn_container}>
          <Button
            title="重置密码"
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
)(ResetLoginPwd);
