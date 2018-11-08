import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Form } from 'beeshell';
import { Button } from 'react-native-elements';
import { colors } from '../../config';
import * as accountApis from '../../apis/account';
const FormItem = Form.Item;

class Login extends Component {
  static navigationOptions = {
    title: '登录'
  };

  constructor(props) {
    super(props);
    this.state = {
      mobile: '',
      password: ''
    };
  }

  login = async () => {
    const { mobile, password } = this.state;
    const res = await accountApis.login({
      mobile,
      password
    });
    __DEV__ && console.log(res);
    if (res.code === 0) {
      this.props.navigation.navigate('App');
    }
  };
  render() {
    return (
      <View style={styles.container}>
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
            title="确认登录"
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

export default Login;
