import React, { Component } from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
import { Input, Form } from 'beeshell';
import { Button } from 'react-native-elements';
import { colors } from '../../config';
import * as userActions from '../../actions/user';
import { connect } from 'react-redux';
import { Tip } from 'beeshell';
const FormItem = Form.Item;

class LoginForm extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '登录',
      headerRight: <Text style={{ color: '#ffffff' }}>忘记密码</Text>,
      headerRightContainerStyle: { paddingRight: 15 }
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      mobile: '',
      password: '',
      status: 0, //0：输入中 1：正在登陆
      tipText: ''
    };
  }

  login = async () => {
    try {
      const { mobile, password } = this.state;
      if (mobile.length === 0 || password.length === 0) {
        this.$tips('请输入手机号与密码！');
        return;
      } else if (mobile.length !== 11) {
        this.$tips('请输入正确的手机号！');
        return;
      } else if (password.length < 6) {
        this.$tips('密码不能小于6位字符！');
        return;
      }
      this.setState({ status: 1 });
      const res = await this.props.login({
        mobile,
        password
      });
      __DEV__ && console.log(res);
      if (res.code === 0) {
        this.props.navigation.push('Initialize');
        return res;
      } else {
        this.setState({ status: 0 });
        Alert.alert('登陆失败', res.message, [{ text: '重试' }]);
      }
    } catch (error) {
      Alert.alert('登陆失败', error.message, [{ text: '重试' }]);
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
    return (
      <View style={styles.container}>
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
            <FormItem prop="mobile" label="手机号" hasLine style={styles.formItemLabel}>
              <Input
                placeholder="请输入手机号"
                textAlign="left"
                value={this.state.name}
                onChange={text => {
                  this.setState({ mobile: text });
                }}
              />
            </FormItem>
            <FormItem prop="password" label="密码" hasLine>
              <Input
                placeholder="请输入密码"
                textAlign="left"
                value={this.state.password}
                secureTextEntry={true}
                onChange={text => {
                  this.setState({ password: text });
                }}
              />
            </FormItem>
          </Form>
        </View>
        <View style={styles.loginButtonContainer}>
          <Button
            title={this.state.status === 0 ? '确认登录' : '登录中...'}
            backgroundColor={colors.THEME_COLOR}
            fontSize={18}
            fontWeight="400"
            onPress={this.login}
            borderRadius={5}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  formItemLabel: {
    color: 'red'
  },
  loginButtonContainer: {
    paddingTop: 20
  }
});

export default (Login = connect(
  null,
  userActions
)(LoginForm));
