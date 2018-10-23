import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { List, ListItem, Button } from 'react-native-elements';
import { colors } from '../../config';

class SettingScreen extends Component {
  static navigationOptions = {
    title: '设置'
  };
  render() {
    return (
      <ScrollView>
        <View style={styles.block}>
          <List containerStyle={styles.listContainer}>
            <ListItem
              title="吴彦祖"
              rightTitle="个人信息"
              rightTitleStyle={styles.listItemRightTitle}
              subtitle="131****5197"
              subtitleContainerStyle={styles.subtitleContainer}
              leftIcon={{ name: 'account-circle', color: colors.THEME_COLOR, type: 'material-community', size: 50 }}
              containerStyle={styles.listItemContainer}
              titleStyle={styles.listItemTitle}
            />
          </List>
        </View>
        <View style={styles.block}>
          <List containerStyle={styles.listContainer}>
            <ListItem
              title="登录密码"
              containerStyle={styles.listItemContainerWithBorder}
              titleStyle={styles.listItemTitle}
            />
            <ListItem title="支付密码" containerStyle={styles.listItemContainer} titleStyle={styles.listItemTitle} />
          </List>
        </View>
        <View style={styles.block}>
          <List containerStyle={styles.listContainer}>
            <ListItem
              title="修改银行卡"
              rightTitleStyle={{ color: 'red', fontSize: 12 }}
              containerStyle={styles.listItemContainer}
              titleStyle={styles.listItemTitle}
            />
          </List>
        </View>
        <View style={styles.block}>
          <List containerStyle={styles.listContainer}>
            <ListItem
              title="关于我们"
              containerStyle={styles.listItemContainerWithBorder}
              titleStyle={styles.listItemTitle}
            />
            <ListItem
              title="检查更新"
              rightTitle="当前版本：1.0.0"
              containerStyle={styles.listItemContainer}
              titleStyle={styles.listItemTitle}
            />
          </List>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="退出登录" backgroundColor={colors.THEME_COLOR} rounded fontSize={18} fontWeight="400" />
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
  },
  subtitleContainer: {
    paddingTop: 5
  },
  buttonContainer: {
    marginTop: 20
  }
});

export default SettingScreen;
