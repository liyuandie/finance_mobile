import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { colors, NAVIGATION_COMMON_STYLES, LIST_COMMON_STYLES } from '../../config';
import { connect } from 'react-redux';

class Balance extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '账户余额',
      headerRight: <Text style={NAVIGATION_COMMON_STYLES.headerRight}>明细</Text>,
      headerRightContainerStyle: NAVIGATION_COMMON_STYLES.headerRightContainer
    };
  };
  render() {
    __DEV__ && console.log('lender balance screen props:', this.props);
    const { balance, lender_contract } = this.props;
    let lender_balance = balance.find(x => x.contracts === lender_contract.contracts) || null;
    return (
      <ScrollView>
        <View style={styles.balanceContainer}>
          <Text style={styles.title}>账户余额(元)</Text>
          <Text style={styles.amount}>{(lender_balance.usable / 100).toFixed(2)}</Text>
        </View>
        <View>
          <List containerStyle={styles.listContainer}>
            <ListItem
              title="充值"
              leftIcon={{ name: 'credit-card', color: colors.THEME_COLOR, size: 20 }}
              containerStyle={styles.listItemContainerWithBorder}
              titleStyle={styles.listItemTitle}
            />
            <ListItem
              title="提现"
              containerStyle={styles.listItemContainer}
              titleStyle={styles.listItemTitle}
              leftIcon={{ name: 'wallet', color: colors.LOGO_COLOR, type: 'material-community', size: 20 }}
            />
          </List>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  headerRight: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '500'
  },
  balanceContainer: {
    height: 150,
    backgroundColor: colors.THEME_COLOR
  },
  title: {
    color: '#ffffff',
    paddingLeft: 10,
    paddingTop: 20,
    paddingBottom: 20
  },
  amount: {
    color: '#ffffff',
    fontSize: 40,
    paddingLeft: 10
  },
  listContainer: {
    marginTop: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0
  },
  listItemContainer: {
    borderBottomWidth: 0,
    borderBottomColor: '#ffffff',
    height: 40
  },
  listItemContainerWithBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    height: 40
  },
  listItemTitle: {
    fontSize: 15,
    fontWeight: '400',
    color: '#000000'
  }
});

const mapState2Props = state => {
  return {
    balance: state.balance,
    lender_contract: state.lender_contract,
    mobile: state.mobile,
    ticket: state.ticket
  };
};

export default (BalanceScreen = connect(
  mapState2Props,
  null
)(Balance));
