import React, { Component } from 'react';
import { ScrollView, View, Image, Dimensions } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { LIST_COMMON_STYLES } from '../../../config';

const infoItems = [
  {
    name: 'Company',
    title: '公司简介'
  },
  {
    name: 'Xinpishengming',
    title: '信披声明'
  },
  {
    name: 'Beianxinxi',
    title: '备案信息'
  },
  {
    name: 'FeeStandard',
    title: '收费标准'
  },
  {
    name: 'RiskManage',
    title: '风险管理'
  },
  {
    name: 'ReviewReport',
    title: '审查报告'
  },
  {
    name: 'License',
    title: '资质执照'
  }
];

function date() {
  let obj = new Date();
  let year = obj.getFullYear();
  let month = obj.getMonth() + 1;
  let day = obj.getDate();
  return `${year}-${month}-${day}`;
}

class InfoList extends Component {
  static navigationOptions = {
    title: '信息披露'
  };
  render() {
    const { navigation } = this.props;
    return (
      <ScrollView>
        <View>
          <List containerStyle={LIST_COMMON_STYLES.listContainer}>
            {infoItems.map(item => (
              <ListItem
                key={item.name}
                title={item.title}
                containerStyle={LIST_COMMON_STYLES.listItemContainerWithBorder}
                titleStyle={{ ...LIST_COMMON_STYLES.listItemTitle, paddingLeft: 0 }}
                onPress={() => navigation.push(item.name)}
              />
            ))}
          </List>
        </View>
      </ScrollView>
    );
  }
}

export default InfoList;
