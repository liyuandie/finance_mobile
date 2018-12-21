import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { ContractNames, Contracts } from '../../common/constant/contract';

class Contract extends Component {
  static navigationOptions = ({ navigation }) => {
    const type = navigation.getParam('type');
    return {
      title: ContractNames[type]
    };
  };

  render() {
    __DEV__ && console.log('Contract screen props:', this.props);
    const type = this.props.navigation.getParam('type');
    __DEV__ && console.log('Contract screen props:', Contracts, ContractNames);
    return (
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.text}>{Contracts[type]}</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff'
  },
  content: {
    marginLeft: 10,
    marginRight: 10
  },
  text: {
    fontSize: 12,
    letterSpacing: 0.5,
    lineHeight: 15
  }
});

const mapState2Props = state => {
  return {
    user: state.user,
    mobile: state.mobile,
    ticket: state.ticket
  };
};

export default connect(
  mapState2Props,
  null
)(Contract);
