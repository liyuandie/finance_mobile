import React, { Component } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Input } from 'beeshell';
import { NAVIGATION_COMMON_STYLES } from '../../../config';
import * as userActions from '../../../actions/user';
import * as userApis from '../../../apis/account';

class SetEmail extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '绑定邮箱',
      headerRight: (
        <Text style={NAVIGATION_COMMON_STYLES.headerRight} onPress={navigation.getParam('submit')}>
          绑定
        </Text>
      ),
      headerRightContainerStyle: { paddingRight: 15 }
      // headerBackTitle: '取消'
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.user.mail
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({ submit: this.submit });
  }

  submit = async () => {
    const { mobile, ticket, accountInfo, navigation } = this.props;
    const email = this.state.email;
    try {
      const res = await userApis.modifyEmail({
        mobile,
        ticket,
        email
      });
      if (res.code === 0) {
        await accountInfo({
          mobile,
          ticket
        })
          .then(() => {
            navigation.goBack();
          })
          .catch(e => {
            Alert.alert('错误', '网络错误，稍后再试', [{ text: '确定' }]);
          });
      }
      return res;
    } catch (error) {
      Alert.alert('错误', '请稍后再试', [{ text: '确定' }]);
      return error;
    }
  };
  render() {
    __DEV__ && console.log('set_email screen props:', this.props);
    return (
      <View style={styles.container}>
        <View style={styles.block}>
          <Input
            placeholder="请输入电子邮箱"
            textAlign="left"
            value={this.state.email}
            onChange={value => {
              this.setState({ email: value });
            }}
            style={styles.input}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: 'red',
    height: 45,
    marginTop: 20
  },
  input: {
    marginLeft: 20,
    color: '#646464'
  }
});

const mapState2Props = state => {
  return {
    user: state.user,
    mobile: state.mobile,
    ticket: state.ticket
  };
};

export default connect(
  mapState2Props,
  userActions
)(SetEmail);
