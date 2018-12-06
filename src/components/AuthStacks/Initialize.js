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
        return;
      }
      try {
        const res = await this.props.accountInfo({
          mobile,
          ticket
        });
        if (res.code === 0) {
          const { lender_contract, cardInfo, queryBalanceByContract } = this.props;
          await cardInfo({
            mobile,
            ticket,
            contract: lender_contract.contracts
          }).catch(error => {
            Alert.alert('错误', error.message);
          });
          await queryBalanceByContract({
            mobile,
            ticket,
            contracts: lender_contract.contracts
          });
          navigation.navigate('App');
          return res;
        }
      } catch (error) {
        Alert.alert('获取用户信息失败');
      }
    });
  }

  render() {
    __DEV__ && console.log('bootstrap screen props:', this.props);
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
    mobile: state.mobile,
    lender_contract: state.lender_contract
  };
};

// const mapDispatch2Props = dispatch => {
//   return {
//     accountInfo: userActions.accountInfo,
//     cardInfo: cardActions.cardInfo,
//     dispatch
//   };
// };
export default (Initialize = connect(
  mapState2props,
  userActions
)(BootStrap));
