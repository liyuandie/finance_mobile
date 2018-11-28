import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { List, ListItem, Button } from 'react-native-elements';
import { colors, VERSION, LIST_COMMON_STYLES } from '../../config';
import * as userActions from '../../actions/user';
import { connect } from 'react-redux';
import { ConfirmModal } from 'beeshell';

class Setting extends Component {
  static navigationOptions = {
    title: '设置'
  };

  logout = async () => {
    const { mobile, ticket, logout, navigation, clearAuth } = this.props;
    try {
      const res = await logout({
        mobile,
        ticket
      });
      if (res.code === 0) {
        clearAuth();
        navigation.push('Initialize');
        return res;
      }
      return res;
    } catch (error) {
      Alert.alert('错误', error.message, [{ text: '确认' }]);
    }
  };
  render() {
    __DEV__ && console.log('setting_screen props:', this.props);
    const { navigation, user, mobile, ticket } = this.props;
    if (!user) return null;
    return (
      <ScrollView>
        <View style={styles.block}>
          <List containerStyle={LIST_COMMON_STYLES.listContainer}>
            <ListItem
              title={user.name}
              rightTitle="个人信息"
              rightTitleStyle={LIST_COMMON_STYLES.listItemRightTitle}
              subtitle={`${user.mobile.slice(0, 3)}****${user.mobile.slice(7, 11)}`}
              subtitleContainerStyle={styles.subtitleContainer}
              leftIcon={{ name: 'account-circle', color: colors.THEME_COLOR, type: 'material-community', size: 50 }}
              containerStyle={LIST_COMMON_STYLES.listItemContainer}
              titleStyle={LIST_COMMON_STYLES.listItemTitle}
              onPress={() => navigation.push('UserInfo')}
            />
          </List>
        </View>
        <View style={styles.block}>
          <List containerStyle={LIST_COMMON_STYLES.listContainer}>
            <ListItem
              title="登录密码"
              leftIcon={{ name: 'keyboard-variant', color: colors.SETTING_ICON_COLOR, type: 'material-community' }}
              containerStyle={LIST_COMMON_STYLES.listItemContainerWithBorder}
              titleStyle={LIST_COMMON_STYLES.listItemTitle}
              rightTitle="修改"
              rightTitleStyle={LIST_COMMON_STYLES.listItemRightTitle}
              onPress={() => navigation.push('ChangeLoginPassword')}
            />
            <ListItem
              title="支付密码"
              containerStyle={LIST_COMMON_STYLES.listItemContainer}
              titleStyle={LIST_COMMON_STYLES.listItemTitle}
              leftIcon={{ name: 'lock-outline', color: colors.SETTING_ICON_COLOR }}
              rightTitle="修改/重置"
              rightTitleStyle={LIST_COMMON_STYLES.listItemRightTitle}
            />
          </List>
        </View>
        <View style={styles.block}>
          <List containerStyle={LIST_COMMON_STYLES.listContainer}>
            <ListItem
              title="修改银行卡"
              rightTitleStyle={{ color: 'red', fontSize: 12 }}
              containerStyle={LIST_COMMON_STYLES.listItemContainer}
              titleStyle={LIST_COMMON_STYLES.listItemTitle}
              leftIcon={{ name: 'credit-card', color: colors.SETTING_ICON_COLOR, type: 'material-community' }}
              onPress={() => navigation.push('MyCard')}
            />
          </List>
        </View>
        <View style={styles.block}>
          <List containerStyle={LIST_COMMON_STYLES.listContainer}>
            <ListItem
              title="关于我们"
              containerStyle={LIST_COMMON_STYLES.listItemContainerWithBorder}
              titleStyle={LIST_COMMON_STYLES.listItemTitle}
              leftIcon={{ name: 'people', color: colors.SETTING_ICON_COLOR }}
              onPress={() => navigation.push('AboutUs')}
            />
            <ListItem
              title="检查更新"
              rightTitle={`当前版本：${VERSION}`}
              rightTitleStyle={styles.version}
              containerStyle={LIST_COMMON_STYLES.listItemContainer}
              titleStyle={LIST_COMMON_STYLES.listItemTitle}
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
            onPress={() => this._confirmModal.open()}
          />
        </View>
        <ConfirmModal
          ref={c => {
            this._confirmModal = c;
          }}
          title="是否退出登录？"
          body={null}
          cancelable={true}
          cancelCallback={() => {
            __DEV__ && console.log('cancel');
          }}
          confirmCallback={() => {
            this.logout();
          }}
        />
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  block: {
    marginBottom: 10,
    backgroundColor: '#ffffff',
    flex: 1,
    justifyContent: 'center'
  },
  subtitleContainer: {
    paddingTop: 5,
    marginLeft: 5
  },
  buttonContainer: {
    marginTop: 20
  },
  version: {
    fontSize: 12
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
)(Setting);
