import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, Dimensions, ScrollView } from 'react-native';

const { width, height } = Dimensions.get('window');

class ReviewReport extends Component {
  static navigationOptions = {
    title: '审查报告'
  };

  render() {
    __DEV__ && console.log('ReviewReport screen props:', this.props);
    return (
      <ScrollView>
        <View style={styles.container}>
          <Image
            source={{
              uri:
                'https://nc-apps.oss-cn-beijing.aliyuncs.com/assets/pzh_infos/accountant_report.png?x-oss-process=style/default'
            }}
            style={{ width: width - 20, height: height * 1.2 }}
            resizeMode="stretch"
          />
          <Image
            source={{
              uri:
                'https://nc-apps.oss-cn-beijing.aliyuncs.com/assets/pzh_infos/lawer_report.png?x-oss-process=style/default'
            }}
            style={{ width: width - 20, height: height * 1.2 }}
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

export default ReviewReport;
