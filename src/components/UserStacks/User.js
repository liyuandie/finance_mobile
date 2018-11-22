import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import { View, Text, StyleSheet, ScrollView, Alert, Linking } from 'react-native';
import { List, ListItem, Icon, Badge } from 'react-native-elements';
import { colors, NAVIGATION_COMMON_STYLES, LIST_COMMON_STYLES } from '../../config';
import * as userActions from '../../actions/user';
import { connect } from 'react-redux';
import { ConfirmModal } from 'beeshell';

class User extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '我',
      headerRight: (
        <Icon
          name="settings"
          type="material-community"
          color="#ffffff"
          onPress={() => navigation.navigate('Setting')}
        />
      ),
      headerRightContainerStyle: NAVIGATION_COMMON_STYLES.headerRightContainer
    };
  };

  refresh = async () => {
    const { mobile, ticket, lender_contract, queryBalanceByContract } = this.props;
    try {
      queryBalanceByContract({
        mobile,
        ticket,
        contracts: lender_contract.contracts
      });
    } catch (error) {
      Alert.alert('错误', error.message, [{ text: '确认' }]);
    }
  };
  render() {
    __DEV__ && console.log('user_screen props:', this.props);
    const { navigation, balance, lender_contract, user } = this.props;
    if (!user) return null;
    let lender_balance = balance.find(x => x.contracts === lender_contract.contracts) || null;
    let { total, tender, usable } = lender_balance;
    total = (total / 100).toFixed(2);
    tender = (tender / 100).toFixed(2);
    usable = (usable / 100).toFixed(2);
    return (
      <ScrollView style={styles.container}>
        <View style={styles.block}>
          <View style={styles.total_container}>
            <Text style={styles.total_text}>持有资产(元)</Text>
            <Text style={styles.amount}>{total}</Text>
          </View>
          {/* <View style={styles.profit_and_investing}>
            <View style={styles.row_box}>
              <Text>投资中(元)</Text>
              <Text style={styles.amount}>{tender}</Text>
            </View>
            <View style={styles.row_box}>
              <Text>预期收益(元)</Text>
              <Text style={styles.amount}>0.00</Text>
            </View>
          </View> */}
        </View>
        <View style={styles.block}>
          <List containerStyle={LIST_COMMON_STYLES.listContainer}>
            <ListItem
              title="账户余额"
              rightTitle={`${usable} 元`}
              rightTitleStyle={LIST_COMMON_STYLES.listItemRightTitle}
              leftIcon={{ name: 'account-balance-wallet', color: colors.LOGO_COLOR, type: 'materialIcon', size: 22 }}
              containerStyle={LIST_COMMON_STYLES.listItemContainer}
              titleStyle={LIST_COMMON_STYLES.listItemTitle}
              onPress={() => navigation.push('Balance')}
            />
            {/* <ListItem
              title="投资金额"
              rightTitle={`${tender} 元`}
              rightTitleStyle={styles.listItemRightTitle}
              leftIcon={{ name: 'account-balance-wallet', color: colors.THEME_COLOR, type: 'materialIcon', size: 22 }}
              containerStyle={styles.listItemContainer}
              titleStyle={styles.listItemTitle}
              onPress={() => navigation.navigate('Balance')}
            /> */}
          </List>
        </View>
        <View style={styles.block}>
          <List containerStyle={LIST_COMMON_STYLES.listContainer}>
            <ListItem
              title="出借记录"
              leftIcon={{ name: 'event-note', color: colors.THEME_COLOR, type: 'materialIcon', size: 22 }}
              containerStyle={LIST_COMMON_STYLES.listItemContainerWithBorder}
              titleStyle={LIST_COMMON_STYLES.listItemTitle}
            />
            <ListItem
              title="我的借款"
              leftIcon={{ name: 'equal-box', color: colors.THEME_COLOR, type: 'material-community', size: 22 }}
              containerStyle={LIST_COMMON_STYLES.listItemContainer}
              titleStyle={LIST_COMMON_STYLES.listItemTitle}
            />
            {/* <ListItem
              title="交易明细"
              leftIcon={{ name: 'home-currency-usd', color: colors.THEME_COLOR, type: 'material-community' }}
              containerStyle={styles.listItemContainer}
              titleStyle={styles.listItemTitle}
            /> */}
          </List>
        </View>
        <View style={styles.block}>
          <List containerStyle={LIST_COMMON_STYLES.listContainer}>
            <ListItem
              title="我的银行卡"
              leftIcon={{ name: 'bank', color: colors.ICON_BANK, type: 'material-community', size: 22 }}
              containerStyle={LIST_COMMON_STYLES.listItemContainer}
              titleStyle={LIST_COMMON_STYLES.listItemTitle}
            />
          </List>
        </View>
        <View style={styles.block}>
          <List containerStyle={LIST_COMMON_STYLES.listContainer}>
            <ListItem
              title="联系客服"
              rightTitle="400-888-9801"
              leftIcon={{ name: 'headphones', color: colors.THEME_COLOR, type: 'material-community', size: 22 }}
              containerStyle={LIST_COMMON_STYLES.listItemContainer}
              titleStyle={LIST_COMMON_STYLES.listItemTitle}
              onPress={() => this._confirmModal.open()}
            />
          </List>
        </View>
        <ConfirmModal
          ref={c => {
            this._confirmModal = c;
          }}
          title="联系客服"
          body="请呼叫：400-888-8901"
          cancelable={true}
          confirmTitle="呼叫"
          cancelCallback={() => {
            __DEV__ && console.log('cancel');
          }}
          confirmCallback={() => {
            Linking.canOpenURL('tel:4008889801')
              .then(supported => {
                if (!supported) {
                  Alert.alert('错误', '呼叫失败，请手动拨打');
                } else {
                  return Linking.openURL('tel:4008889801');
                }
              })
              .catch(err => console.error('An error occurred', err));
          }}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0'
  },
  block: {
    marginBottom: 8,
    backgroundColor: '#ffffff',
    flex: 1,
    justifyContent: 'center'
  },
  total_container: {
    height: 150,
    justifyContent: 'center',
    padding: 20
  },
  profit_and_investing: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
  row_box: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60
  },
  amount: {
    fontSize: 25,
    fontWeight: '500',
    color: colors.THEME_COLOR
  },
  total_text: {
    fontSize: 12,
    color: '#7b7b7b',
    fontWeight: '100',
    paddingBottom: 15
  }
});
const mapState2Props = state => {
  return {
    user: state.user,
    mobile: state.mobile,
    ticket: state.ticket,
    balance: state.balance,
    lender_contract: state.lender_contract,
    borrower_contract: state.borrower_contract,
    user_setting: state.user_setting
  };
};

export default connect(
  mapState2Props,
  userActions
)(User);
