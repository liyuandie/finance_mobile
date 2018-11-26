import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { colors, NAVIGATION_COMMON_STYLES } from '../../../config';
import { Button } from 'react-native-elements';
import * as userActions from '../../../actions/user';
import { Icon } from 'react-native-elements';
import { userUtils } from '../../../utils';

class TestResult extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '测评结果',
      headerRight: (
        <Icon
          name="question-circle-o"
          type="font-awesome"
          color="#ffffff"
          onPress={() => navigation.push('RiskLevelRule')}
        />
      ),
      headerRightContainerStyle: NAVIGATION_COMMON_STYLES.headerRightContainer,
      headerLeft: null
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      user_level: '',
      result: 0
    };
  }

  componentDidMount() {
    const result = this.props.navigation.getParam('result');
    const user_level = userUtils.getUserRiskLevel(result);
    this.setState({
      result: result,
      user_level: user_level
    });
  }
  handlePress = async () => {
    try {
      const { mobile, ticket, accountInfo, navigation } = this.props;
      const res = await accountInfo({
        mobile,
        ticket
      });
      if (res.code === 0) {
        navigation.navigate('UserInfo');
      }
    } catch (error) {
      Alert.alert('错误', error.message, [{ text: '确认' }]);
    }
  };

  render() {
    __DEV__ && console.log('test_result screen props:', this.props);
    const { navigation, accountInfo } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.success}>
          <Icon name="check-circle" size={40} color={colors.ICON_SUCCESS} />
          <Text style={styles.text_success}>提交成功！</Text>
        </View>
        <View style={styles.result_box}>
          <View style={styles.result_container}>
            <Text style={styles.text_success}>您的测评分数为:</Text>
            <Text style={styles.text_result}>{this.state.result}</Text>
            <Text style={styles.text_success}>分</Text>
          </View>
          <View style={styles.result_container}>
            <Text style={styles.text_success}>您的测评结果为:</Text>
            <Text style={styles.text_user_level}>{this.state.user_level}</Text>
          </View>
        </View>

        <View>
          <Button
            title="完成测评"
            // disabled={user_settings.is_finished_contest}
            containerViewStyle={styles.btn}
            textStyle={styles.btn_text}
            backgroundColor={colors.THEME_COLOR}
            borderRadius={20}
            onPress={() => this.handlePress()}
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
  success: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30
  },
  text_success: {
    color: '#272727',
    padding: 10
  },
  result_box: {
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  result_container: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  text_result: {
    color: '#FF2D2D',
    fontSize: 35
  },
  text_user_level: {
    color: '#FF8000',
    fontSize: 18
  },
  btn: {
    backgroundColor: colors.THEME_COLOR,
    width: '90%',
    alignSelf: 'center',
    marginTop: 50,
    borderColor: colors.THEME_COLOR,
    borderWidth: 1
  },
  btn_text: { color: '#ffffff', fontSize: 16 }
});

const mapState2Props = state => {
  return {
    user: state.user,
    user_settings: state.user_settings,
    mobile: state.mobile,
    ticket: state.ticket
  };
};

export default connect(
  mapState2Props,
  userActions
)(TestResult);
