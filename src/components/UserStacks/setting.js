import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { List, ListItem, Button } from 'react-native-elements';
import { colors } from '../../config';

class SettingScreen extends Component {
  static navigationOptions = {
    title: '设置'
  };
  render() {
    const { navigation } = this.props;
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
              onPress={() => navigation.navigate('UserInfo')}
            />
          </List>
        </View>
        <View style={styles.block}>
          <List containerStyle={styles.listContainer}>
            <ListItem
              title="登录密码"
              leftIcon={{ name: 'keyboard-variant', color: colors.SETTING_ICON_COLOR, type: 'material-community' }}
              containerStyle={styles.listItemContainerWithBorder}
              titleStyle={styles.listItemTitle}
              rightTitle="修改"
              rightTitleStyle={styles.listItemRightTitle}
            />
            <ListItem
              title="支付密码"
              containerStyle={styles.listItemContainer}
              titleStyle={styles.listItemTitle}
              leftIcon={{ name: 'lock-outline', color: colors.SETTING_ICON_COLOR }}
              rightTitle="修改/重置"
              rightTitleStyle={styles.listItemRightTitle}
            />
          </List>
        </View>
        <View style={styles.block}>
          <List containerStyle={styles.listContainer}>
            <ListItem
              title="修改银行卡"
              rightTitleStyle={{ color: 'red', fontSize: 12 }}
              containerStyle={styles.listItemContainer}
              titleStyle={styles.listItemTitle}
              leftIcon={{ name: 'credit-card', color: colors.SETTING_ICON_COLOR, type: 'material-community' }}
            />
          </List>
        </View>
        <View style={styles.block}>
          <List containerStyle={styles.listContainer}>
            <ListItem
              title="关于我们"
              containerStyle={styles.listItemContainerWithBorder}
              titleStyle={styles.listItemTitle}
              leftIcon={{ name: 'people', color: colors.SETTING_ICON_COLOR }}
            />
            <ListItem
              title="检查更新"
              rightTitle="当前版本：1.0.0"
              rightTitleStyle={styles.version}
              containerStyle={styles.listItemContainer}
              titleStyle={styles.listItemTitle}
              leftIcon={{ name: 'refresh', color: colors.SETTING_ICON_COLOR }}
            />
          </List>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="退出登录"
            backgroundColor={colors.THEME_COLOR}
            borderRadius={5}
            fontSize={18}
            fontWeight="400"
          />
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
    borderBottomColor: '#ffffff'
  },
  listItemContainerWithBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  listItemTitle: {
    fontSize: 14
  },
  listItemRightTitle: {
    fontSize: 13,
    color: '#646464'
  },
  subtitleContainer: {
    paddingTop: 5
  },
  buttonContainer: {
    marginTop: 20
  },
  version: {
    fontSize: 12
  }
});

export default SettingScreen;
