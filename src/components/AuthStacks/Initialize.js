import React, { Component } from 'react';
import { Alert, View, Text, Image, StyleSheet, InteractionManager } from 'react-native';
import { connect } from 'react-redux';
import * as userActions from '../../actions/user';

class BootStrap extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      needUpdate: false,
      updateURL: ''
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(async () => {
      const { user, navigation, mobile, ticket } = this.props;
      if (!user) {
        navigation.push('PreAuth');
      }
      try {
        const res = await this.props.accountInfo({
          mobile,
          ticket
        });
        if (res.code === 0) {
          navigation.navigate('App');
        }
      } catch (error) {
        Alert.alert('获取用户信息失败', error.message, [{ text: '重试' }]);
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('gogo_mobile/static/imgs/icon_512.png')} style={styles.logo} />
        <Text style={styles.title}>狗狗金融</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  logo: {
    borderRadius: 30,
    width: 240,
    height: 240,
    maxWidth: '100%',
    maxHeight: '100%'
  },
  title: {
    marginTop: 50,
    fontSize: 32,
    color: '#212121'
  }
});

const mapState2props = state => {
  return {
    user: state.user,
    ticket: state.ticket,
    mobile: state.mobile
  };
};

export default (Initialize = connect(
  mapState2props,
  userActions
)(BootStrap));
