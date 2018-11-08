import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { colors } from '../../config';

class Balance extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '账户余额',
      headerRight: <Text style={styles.headerRight}>明细</Text>,
      headerRightContainerStyle: { paddingRight: 15 }
    };
  };
  render() {
    return (
      <ScrollView>
        <View style={styles.balanceContainer}>
          <Text style={styles.title}>账户余额(元)</Text>
          <Text style={styles.amount}>0.00</Text>
        </View>
        <View>
          <List containerStyle={styles.listContainer}>
            <ListItem
              title="充值"
              leftIcon={{ name: 'login', color: colors.THEME_COLOR, type: 'material-community', size: 20 }}
              containerStyle={styles.listItemContainerWithBorder}
              titleStyle={styles.listItemTitle}
            />
            <ListItem
              title="提现"
              containerStyle={styles.listItemContainer}
              titleStyle={styles.listItemTitle}
              leftIcon={{ name: 'logout', color: colors.THEME_COLOR, type: 'material-community', size: 20 }}
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
    fontSize: 60,
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
export default Balance;
