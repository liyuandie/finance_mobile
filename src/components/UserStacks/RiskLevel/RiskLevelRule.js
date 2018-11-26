import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { colors } from '../../../config';
import { Table, Row, Rows } from 'react-native-table-component';

class RiskLevelRule extends Component {
  static navigationOptions = {
    title: '客户等级规则'
  };
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['客户等级', '风险承受类型', '风险测试总分', '投资权限', '单笔投资限额', '累计投资限额'],
      tableData: [
        ['I类客户', '保守型', '0分≤总分≤30', '5星产品', '100万', '500万'],
        ['II类客户', '稳健型', '30分＜总分≤60', '3星-5星产品', '100万', '800万'],
        ['III类客户', '积极型', '总分＞60分', '全部产品', '100万', '1000万']
      ]
    };
  }

  render() {
    const { tableHead, tableData } = this.state;
    return (
      <View style={styles.container}>
        <Table borderStyle={{ borderWidth: 0.5, borderColor: colors.THEME_COLOR }}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text} />
          <Rows data={tableData} textStyle={styles.text} style={styles.data} />
        </Table>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff'
  },
  head: {
    height: 40,
    backgroundColor: '#f1f8ff'
  },
  text: {
    margin: 6,
    fontSize: 7,
    textAlign: 'center'
  },
  data: {
    height: 30
  }
});

export default RiskLevelRule;
