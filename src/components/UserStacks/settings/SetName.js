import React, { Component } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Input } from 'beeshell';
import { NAVIGATION_COMMON_STYLES } from '../../../config';
import * as userActions from '../../../actions/user';
import * as userApis from '../../../apis/account';

class SetUserName extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '设置用户名',
      headerRight: (
        <Text style={NAVIGATION_COMMON_STYLES.headerRight} onPress={navigation.getParam('submit')}>
          保存
        </Text>
      ),
      headerRightContainerStyle: { paddingRight: 15 }
      // headerBackTitle: '取消'
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      new_name: this.props.user.name
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({ submit: this.submit });
  }

  submit = async () => {
    const { mobile, ticket, accountInfo, navigation } = this.props;
    const name = this.state.new_name;
    try {
      const res = await userApis.modifyUserName({
        mobile,
        ticket,
        name
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
    __DEV__ && console.log('set_user_name screen props:', this.props);
    return (
      <View style={styles.container}>
        <View style={styles.block}>
          <Input
            placeholder="请输入用户名"
            textAlign="left"
            value={this.state.new_name}
            onChange={value => {
              this.setState({ new_name: value });
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
)(SetUserName);
