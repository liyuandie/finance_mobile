import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';

class xxxxxx extends Component {
  static navigationOptions = {
    title: 'xxxxxx'
  };

  render() {
    __DEV__ && console.log('xxxxx screen props:', this.props);
    const { navigation } = this.props;
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
    mobile: state.mobile,
    ticket: state.ticket
  };
};

export default connect(
  mapState2Props,
  null
)(xxxxxx);
