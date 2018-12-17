import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

class Safety extends Component {
  static navigationOptions = {
    title: '安全保障'
  };

  render() {
    __DEV__ && console.log('Safety screen props:', this.props);
    return (
      <View style={styles.container}>
        <Image
          source={{
            uri: 'https://nc-apps.oss-cn-beijing.aliyuncs.com/assets/pzh_infos/risk.png?x-oss-process=style/default'
          }}
          style={{ width: width - 20, height: height * 0.8 }}
          resizeMode="stretch"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    alignItems: 'center'
  }
});

export default Safety;
