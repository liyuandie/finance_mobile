import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, Dimensions, ScrollView } from 'react-native';

const { width, height } = Dimensions.get('window');

class BankInfo extends Component {
  static navigationOptions = {
    title: '银行存管'
  };

  render() {
    __DEV__ && console.log('BankInfo screen props:', this.props);
    return (
      <ScrollView>
        <View style={styles.container}>
          <Image
            source={{
              uri: 'https://nc-apps.oss-cn-beijing.aliyuncs.com/assets/pzh_infos/bank1.png?x-oss-process=style/default'
            }}
            style={{ width: width - 20, height: height * 0.9 }}
            resizeMode="stretch"
          />
          <Image
            source={{
              uri: 'https://nc-apps.oss-cn-beijing.aliyuncs.com/assets/pzh_infos/bank2.png?x-oss-process=style/default'
            }}
            style={{ width: width - 20, height: height * 0.9 }}
            resizeMode="stretch"
          />
          <Image
            source={{
              uri: 'https://nc-apps.oss-cn-beijing.aliyuncs.com/assets/pzh_infos/bank3.png?x-oss-process=style/default'
            }}
            style={{ width: width - 20, height: height * 0.8 }}
            resizeMode="stretch"
          />
          <Image
            source={{
              uri: 'https://nc-apps.oss-cn-beijing.aliyuncs.com/assets/pzh_infos/bank4.png?x-oss-process=style/default'
            }}
            style={{ width: width - 20, height: height * 0.8 }}
            resizeMode="stretch"
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    alignItems: 'center'
  }
});

export default BankInfo;
