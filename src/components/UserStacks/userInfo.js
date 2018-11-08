import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { colors } from '../../config';

class UserInfo extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '个人信息'
    };
  };
  render() {
    return (
      <ScrollView>
        <View style={styles.block}>
          <List containerStyle={styles.listContainer}>
            <ListItem
              title="用户名"
              rightTitle="吴彦祖"
              rightTitleStyle={styles.listItemRightTitle}
              containerStyle={styles.listItemContainer}
              titleStyle={styles.listItemTitle}
            />
          </List>
        </View>
        <View style={styles.block}>
          <List containerStyle={styles.listContainer}>
            <ListItem
              title="手机号"
              rightTitle="13158855197"
              rightTitleStyle={styles.listItemRightTitle}
              containerStyle={styles.listItemContainerWithBorder}
              titleStyle={styles.listItemTitle}
            />
            <ListItem
              title="电子邮箱"
              rightTitle="907000795@qq.com"
              rightTitleStyle={styles.listItemRightTitle}
              containerStyle={styles.listItemContainer}
              titleStyle={styles.listItemTitle}
            />
          </List>
        </View>
        <View style={styles.block}>
          <List containerStyle={styles.listContainer}>
            <ListItem
              title="风险承受能力评估"
              rightTitle="未评估"
              rightTitleStyle={{ color: 'red', fontSize: 12 }}
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
  }
});

export default UserInfo;
