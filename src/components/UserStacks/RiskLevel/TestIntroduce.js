import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { colors } from '../../../config';
import { Button } from 'react-native-elements';

class TestIntroduce extends Component {
  static navigationOptions = {
    title: '风险承受能力测试'
  };

  render() {
    __DEV__ && console.log('test_introduce screen props:', this.props);
    const { user_settings, navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          为贯彻落实中国证监会颁发相关政策，规范网上理财产品的销售行为，确保相关产品销售的适用性，切实保障投资人的权益，请及时评估你的风险承受能力。
        </Text>
        <Text style={styles.text}>
          请认真如实选择测评项，避免因测评结果不实影响您在狗狗金融的的出借以及带来不必要的风险。
        </Text>
        <Text style={styles.text}>
          狗狗金融根据出借人的风险承受能力评估的结果，结合标的产品的风险大小，对出借人进行动态分级管理，具体管理措施参见：
        </Text>
        <Text style={styles.text_link} onPress={() => navigation.push('RiskLevelRule')}>
          狗狗金融风险承受能力及客户等级管理规则>
        </Text>
        <View>
          <Button
            title={user_settings.is_finished_contest ? '重新进行测评' : '立即开始测评'}
            // disabled={user_settings.is_finished_contest}
            containerViewStyle={styles.btn}
            textStyle={styles.btn_text}
            backgroundColor="#ffffff"
            borderRadius={20}
            onPress={() => navigation.push('Test')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1
  },
  text: {
    color: '#000000',
    lineHeight: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    letterSpacing: 1.5,
    fontSize: 12,
    fontWeight: 'normal'
  },
  text_link: {
    color: colors.THEME_COLOR,
    lineHeight: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    fontSize: 13
  },
  btn: {
    backgroundColor: '#ffffff',
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    borderColor: colors.THEME_COLOR,
    borderWidth: 1
  },
  btn_text: { color: colors.THEME_COLOR, fontSize: 16 }
});

const mapState2Props = state => {
  return {
    user: state.user,
    user_settings: state.user_settings
  };
};

export default connect(
  mapState2Props,
  null
)(TestIntroduce);
