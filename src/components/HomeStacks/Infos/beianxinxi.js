import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

class Beianxinxi extends Component {
  static navigationOptions = {
    title: '备案信息'
  };

  render() {
    __DEV__ && console.log('Beianxinxi screen props:', this.props);
    return (
      <View style={styles.container}>
        <Image
          source={{
            uri:
              'https://nc-apps.oss-cn-beijing.aliyuncs.com/assets/pzh_infos/beianxinxi.png?x-oss-process=style/default'
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

export default Beianxinxi;
