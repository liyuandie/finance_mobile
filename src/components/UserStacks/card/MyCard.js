import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { colors } from '../../../config';
import { Button } from 'react-native-elements';
import { cardUtils } from '../../../utils';

class MyCard extends Component {
  static navigationOptions = {
    title: '我的银行卡',
    headerStyle: {
      backgroundColor: '#5B5B5B',
      borderBottomWidth: 0
    }
  };

  render() {
    __DEV__ && console.log('my_card screen props:', this.props);
    const { user_settings, navigation, card_info } = this.props;
    if (!card_info) {
      return (
        <View style={styles.container}>
          <Text style={styles.tip}>您还未绑定银行卡，前往开通存管账户，立即绑定银行卡。</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.bank_name}>{cardUtils.transformBankCode2Name(card_info.bank_code)}</Text>
          {/* <Text style={styles.user_name}>持卡人：李袁堞</Text> */}
          <View style={styles.bank_number_container}>
            <Text style={{ ...styles.bank_number, fontSize: 30 }}>****</Text>
            <Text style={{ ...styles.bank_number, fontSize: 30 }}>****</Text>
            <Text style={{ ...styles.bank_number, fontSize: 30 }}>****</Text>
            <Text style={styles.bank_number}>{card_info.bank_account_number.slice(-4)}</Text>
          </View>
        </View>
        <Text style={styles.tip}>
          温馨提示：每个账户只能绑定一张银行卡，如因银行卡遗失、失效需要更换绑定的银行卡，请联系客服。
        </Text>
        <Button
          title="解绑"
          containerViewStyle={styles.btn}
          textStyle={styles.btn_text}
          backgroundColor="#00CACA"
          // borderRadius={5}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#5B5B5B',
    flex: 1,
    alignItems: 'center'
  },
  card: {
    width: '90%',
    height: 120,
    backgroundColor: colors.BANK_CARD_BACKGROUND,
    borderRadius: 10,
    marginTop: 20
  },
  bank_name: {
    color: '#ffffff',
    padding: 5,
    paddingLeft: 30,
    fontSize: 16
  },
  user_name: {
    color: '#ffffff',
    paddingLeft: 30,
    fontSize: 10
  },
  bank_number_container: {
    flexDirection: 'row',
    padding: 30,
    justifyContent: 'space-between',
    width: '90%'
  },
  bank_number: {
    color: '#ffffff',
    fontSize: 20
  },
  btn: {
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    marginTop: 10,
    borderColor: '#00CACA',
    borderWidth: 1,
    width: '100%',
    position: 'absolute',
    bottom: 0
  },
  btn_text: {
    color: '#ffffff',
    fontSize: 16
  },
  tip: {
    width: '90%',
    paddingTop: 20,
    fontSize: 12,
    lineHeight: 16,
    color: '#d0d0d0'
  }
});

const mapState2Props = state => {
  return {
    user: state.user,
    card_info: state.card_info
  };
};

export default connect(
  mapState2Props,
  null
)(MyCard);
