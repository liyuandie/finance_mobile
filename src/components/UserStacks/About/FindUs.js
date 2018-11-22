import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { List, ListItem, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { colors } from '../../../config';

class FindUs extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '联系我们'
    };
  };
  render() {
    __DEV__ && console.log('find_us_screen props:', this.props);
    return (
      <View style={styles.container}>
        <View style={styles.text_container}>
          <Text style={styles.text}>公司名称：四川联创利民科技有限公司</Text>
          <Text style={styles.text}>公司电话：400-888-9801</Text>
          <Text style={styles.text}>投诉电话：028-85567402</Text>
          <Text style={styles.text}>电子邮箱：service@gogofinance.com</Text>
          <Text style={styles.text}>公司地址：四川省成都市武侯区领事馆路7号保利中心南塔907</Text>
        </View>
        <View />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    flex: 1
  },
  text_container: {
    paddingTop: 30,
    paddingBottom: 30
  },
  text: {
    lineHeight: 30,
    fontSize: 12,
    fontWeight: '400'
  }
});

const mapState2Props = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapState2Props,
  null
)(FindUs);
