import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class InvestScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>products page</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  }
});

export default InvestScreen;
