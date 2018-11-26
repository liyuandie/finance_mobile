import React, { Component } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { colors } from '../../../config';
import { connect } from 'react-redux';
import * as testApis from '../../../apis/contest';
import { Radio } from 'beeshell';
import { Button } from 'react-native-elements';
import { Card } from 'react-native-elements';

class Test extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '风险承受能力测试'
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      currentQuestionIndex: 0,
      questions: [],
      score: 0,
      total_score: 0
    };
  }
  async componentDidMount() {
    const { mobile, ticket } = this.props;
    try {
      const res = await testApis.getQuestionnaire({
        mobile,
        ticket
      });
      this.setState({ questions: res.questions });
      __DEV__ && console.log('question naires:', this.state.questions);
    } catch (error) {
      Alert.alert('错误', error.message, [{ text: '确定' }]);
    }
  }

  handlePress = async () => {
    const { currentQuestionIndex, questions } = this.state;
    const { mobile, ticket, navigation } = this.props;
    await this.setState({
      total_score: this.state.total_score + this.state.score,
      score: 0
    });
    __DEV__ && console.log('current total_score:', this.state.total_score, this.state.score);
    if (currentQuestionIndex + 1 >= questions.length) {
      const res = await testApis.submitScore({
        mobile,
        ticket,
        score: this.state.total_score
      });
      const { code } = res;
      if (code === 0) {
        navigation.push('TestResult', { result: this.state.total_score });
      }
    } else {
      this.setState({
        currentQuestionIndex: this.state.currentQuestionIndex + 1
      });
    }
  };

  render() {
    const { questions, currentQuestionIndex } = this.state;
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return null;
    return (
      <View style={styles.container}>
        <Text style={styles.tips}>请仔细阅读以下题目，并选出每个题目中最适合您的选项：</Text>
        <View style={styles.questionContainer}>
          <Card title={currentQuestion.order.toString() + '、' + currentQuestion.question} titleStyle={styles.question}>
            <Radio
              onChange={async score => {
                await this.setState({
                  score: score
                });
                __DEV__ && console.log('current select:', this.state.score, score);
              }}
              iconPosition="right"
              checkedValue={this.state.score}
            >
              {currentQuestion.answers.map(x => {
                return <Radio.Item key={x.score} label={x.answer} trueValue={x.score} />;
              })}
            </Radio>
          </Card>
        </View>

        <Button
          title={this.state.currentQuestionIndex + 1 >= this.state.questions.length ? '提交结果' : '下一题'}
          containerViewStyle={styles.btn}
          textStyle={styles.btn_text}
          backgroundColor={colors.THEME_COLOR}
          borderRadius={20}
          onPress={this.handlePress}
        />
      </View>
    );
  }
}

const mapState2Props = state => {
  return {
    user: state.user,
    mobile: state.mobile,
    ticket: state.ticket
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20
  },
  btn: {
    backgroundColor: colors.THEME_COLOR,
    width: '90%',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 40
  },
  btn_text: {
    color: '#ffffff',
    fontSize: 16
  },
  tips: {
    fontSize: 15,
    lineHeight: 20
  },
  questionContainer: {
    marginTop: 30
  },
  question: {
    fontSize: 14,
    color: '#646464',
    lineHeight: 30
  }
});

export default connect(
  mapState2Props,
  null
)(Test);
