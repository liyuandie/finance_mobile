import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';

class UserScreen extends Component {
  static navigationOptions = {
    title: 'Home'
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>user center</Text>
      </View>
    );
  }
}

const userStacks = createStackNavigator({
  User: {
    screen: UserScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  }
});

export default userStacks;
