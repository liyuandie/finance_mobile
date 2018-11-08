import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { List, ListItem, Icon, Badge } from 'react-native-elements';
import { colors } from '../../config';

class UserScreen extends Component {
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
      headerRightContainerStyle: { paddingRight: 15 }
    };
  };
  render() {
    const { navigation } = this.props;
    return (
      <ScrollView>
        <View style={styles.block}>
          <View style={styles.total_container}>
            <Text>持有资产(元)</Text>
            <Text style={styles.amount}>0.00</Text>
          </View>
          <View style={styles.profit_and_investing}>
            <View style={styles.row_box}>
              <Text>投资中(元)</Text>
              <Text style={styles.amount}>0.00</Text>
            </View>
            <View style={styles.row_box}>
              <Text>预期收益(元)</Text>
              <Text style={styles.amount}>0.00</Text>
            </View>
          </View>
        </View>
        <View style={styles.block}>
          <List containerStyle={styles.listContainer}>
            <ListItem
              title="账户余额(元)"
              rightTitle="100,000,000"
              rightTitleStyle={styles.listItemRightTitle}
              leftIcon={{ name: 'account-balance-wallet', color: colors.THEME_COLOR, type: 'materialIcon' }}
              containerStyle={styles.listItemContainer}
              titleStyle={styles.listItemTitle}
              onPress={() => navigation.navigate('Balance')}
            />
          </List>
        </View>
        <View style={styles.block}>
          <List containerStyle={styles.listContainer}>
            <ListItem
              title="出借记录"
              leftIcon={{ name: 'event-note', color: colors.THEME_COLOR, type: 'materialIcon' }}
              containerStyle={styles.listItemContainerWithBorder}
              titleStyle={styles.listItemTitle}
            />
            <ListItem
              title="我的借款"
              leftIcon={{ name: 'home-currency-usd', color: colors.THEME_COLOR, type: 'material-community' }}
              containerStyle={styles.listItemContainer}
              titleStyle={styles.listItemTitle}
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
          <List containerStyle={styles.listContainer}>
            <ListItem
              title="我的银行卡"
              leftIcon={{ name: 'bank', color: colors.THEME_COLOR, type: 'material-community' }}
              containerStyle={styles.listItemContainer}
              titleStyle={styles.listItemTitle}
            />
          </List>
        </View>
        <View style={styles.block}>
          <List containerStyle={styles.listContainer}>
            <ListItem
              title="联系客服"
              rightTitle="400-888-9801"
              leftIcon={{ name: 'headphones', color: colors.THEME_COLOR, type: 'material-community' }}
              containerStyle={styles.listItemContainer}
              titleStyle={styles.listItemTitle}
            />
          </List>
        </View>
      </ScrollView>
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
  block: {
    marginBottom: 10,
    backgroundColor: '#ffffff',
    flex: 1,
    justifyContent: 'center'
  },
  listContainer: {
    marginTop: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0
  },
  listItemContainer: {
    borderBottomWidth: 0,
    borderBottomColor: '#ffffff',
    marginLeft: 10,
    marginRight: 10
  },
  listItemContainerWithBorder: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#bebebe',
    marginLeft: 10,
    marginRight: 10
  },
  listItemTitle: {
    fontSize: 14
  },
  total_container: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center'
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
    fontSize: 20,
    fontWeight: '500',
    color: colors.THEME_COLOR
  },
  listItemRightTitle: {
    fontSize: 15,
    color: '#646464'
  }
});
const userStack = createStackNavigator(
  {
    userHome: UserScreen
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: colors.THEME_COLOR
      },
      headerTintColor: colors.HEADER_TINT_COLOR,
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }
  }
);

export default userStack;
