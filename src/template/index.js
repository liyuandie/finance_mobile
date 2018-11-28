import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';

class xxxxxx extends Component {
  static navigationOptions = {
    title: 'xxxxxx'
  };

  render() {
    __DEV__ && console.log('test_introduce screen props:', this.props);
    const { user_settings, navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text>xxxxxxxx</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1
  }
});

const mapState2Props = state => {
  return {
    user: state.user,
    user_settings: state.user_settings,
    monile: state.mobile,
    ticket: state.ticket
  };
};

export default connect(
  mapState2Props,
  null
)(xxxxxx);
