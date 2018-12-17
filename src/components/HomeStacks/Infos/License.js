import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, Dimensions, ScrollView } from 'react-native';

const { width, height } = Dimensions.get('window');

class License extends Component {
  static navigationOptions = {
    title: '资质执照'
  };

  render() {
    __DEV__ && console.log('License screen props:', this.props);
    return (
      <ScrollView>
        <View style={styles.container}>
          <Image
            source={{
              uri:
                'https://nc-apps.oss-cn-beijing.aliyuncs.com/assets/pzh_infos/license.png?x-oss-process=style/default'
            }}
            style={{ width: width - 20, height: height * 0.6 }}
            resizeMode="stretch"
          />
          <Image
            source={{
              uri: 'https://nc-apps.oss-cn-beijing.aliyuncs.com/assets/pzh_infos/ICP.png?x-oss-process=style/default'
            }}
            style={{ width: width - 20, height: height * 0.5 }}
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

export default License;
