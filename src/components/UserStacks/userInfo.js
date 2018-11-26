import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import * as utils from '../../utils';

class UserInfo extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '个人信息'
    };
  };
  render() {
    __DEV__ && console.log('userInfo_screen props:', this.props);
    const { user, user_settings, navigation } = this.props;
    const { is_finished_contest } = user_settings;
    return (
      <ScrollView>
        <View style={styles.block}>
          <List containerStyle={styles.listContainer}>
            <ListItem
              title="用户名"
              rightTitle={user.name}
              rightTitleStyle={styles.listItemRightTitle}
              containerStyle={styles.listItemContainer}
              titleStyle={styles.listItemTitle}
              onPress={() => navigation.push('SetUserName')}
            />
          </List>
        </View>
        <View style={styles.block}>
          <List containerStyle={styles.listContainer}>
            <ListItem
              title="手机号"
              rightTitle={user.mobile}
              rightTitleStyle={styles.listItemRightTitle}
              containerStyle={styles.listItemContainerWithBorder}
              titleStyle={styles.listItemTitle}
            />
            <ListItem
              title="电子邮箱"
              rightTitle={user.mail ? user.mail : '未绑定'}
              rightTitleStyle={user.mail ? styles.listItemRightTitle : styles.rightTitle_not_finished}
              containerStyle={styles.listItemContainer}
              titleStyle={styles.listItemTitle}
              onPress={() => navigation.push('SetEmail')}
            />
          </List>
        </View>
        <View style={styles.block}>
          <List containerStyle={styles.listContainer}>
            <ListItem
              title="风险承受能力评估"
              rightTitle={
                is_finished_contest ? utils.userUtils.getUserRiskLevel(user_settings.contest_score) : '未评估'
              }
              rightTitleStyle={is_finished_contest ? styles.listItemRightTitle : styles.rightTitle_not_finished}
              containerStyle={styles.listItemContainer}
              titleStyle={styles.listItemTitle}
              onPress={() => navigation.push('TestIntroduce')}
            />
          </List>
        </View>
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
  listContainer: {
    marginTop: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0
  },
  listItemContainer: {
    borderBottomWidth: 0,
    borderBottomColor: '#ffffff',
    height: 45
  },
  listItemContainerWithBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    height: 45
  },
  listItemTitle: {
    fontSize: 14
  },
  listItemRightTitle: {
    fontSize: 13,
    color: '#646464'
  },
  rightTitle_not_finished: {
    color: 'red',
    fontSize: 12
  }
});

const mapState2Props = state => {
  return {
    user: state.user,
    user_settings: state.user_settings
  };
};

export default connect(
  mapState2Props,
  null
)(UserInfo);
