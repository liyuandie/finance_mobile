import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, Dimensions, ScrollView } from 'react-native';

const { width, height } = Dimensions.get('window');

class RiskManage extends Component {
  static navigationOptions = {
    title: '风险管理制度'
  };

  render() {
    __DEV__ && console.log('RiskManage screen props:', this.props);
    return (
      <View style={styles.container}>
        <Image
          source={{
            uri:
              'https://nc-apps.oss-cn-beijing.aliyuncs.com/assets/pzh_infos/yewuliucheng.png?x-oss-process=style/default'
          }}
          style={{ width: width - 20, height: height * 0.7 }}
          resizeMode="stretch"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    flex: 1
  }
});

export default RiskManage;
