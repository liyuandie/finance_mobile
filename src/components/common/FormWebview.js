import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { WebView } from 'react-native-webview';
import { colors } from '../../config';
const { width } = Dimensions.get('window');
import ProgressBar from 'react-native-progress/Bar';
import { WebviewSource } from '../../sdk-pzh-bank/config/webview';
import { baseCfg } from '../../sdk-pzh-bank/config';

class PersonalSignContract extends Component {
  static navigationOptions = ({ navigation }) => {
    const title = navigation.getParam('title');
    return {
      title: title ? title : '加载中'
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      loadProgress: 0,
      hasSend: false
    };
  }

  componentDidMount() {}

  _postMessage = data => {
    const { hasSend } = this.state;
    if (hasSend === true) return;
    this.webview.postMessage(JSON.stringify(data));
    this.setState({
      hasSend: !hasSend
    });
  };

  _handleMessage = e => {
    const { navigation } = this.props;
    const res = JSON.parse(e.nativeEvent.data);
    __DEV__ && console.log('存管同步页面回执：', res);
    if (res.code === 1) {
      navigation.goBack();
    } else {
      switch (res.service) {
        case baseCfg.service.personalContract:
          navigation.navigate('User');
        case baseCfg.service.investTender:
          navigation.goBack();
      }
    }
  };

  _renderLoading = () => {
    return (
      <View style={styles.empty_container}>
        <ProgressBar progress={this.state.loadProgress} width={200} color={colors.THEME_COLOR} />
        <Text style={styles.empty_text}>玩命加载中...</Text>
      </View>
    );
  };
  _renderError = () => {
    const { navigation } = this.props;
    return (
      <View style={styles.empty_container}>
        <Text style={styles.empty_text}>请稍后再试！</Text>
        <Button
          title="返回"
          containerViewStyle={styles.btn}
          backgroundColor={colors.THEME_COLOR}
          borderRadius={20}
          buttonStyle={{ width: width * 0.8, height: 40 }}
          fontSize={15}
          onPress={() => navigation.goBack()}
        />
      </View>
    );
  };

  render() {
    const { navigation } = this.props;
    const formData = navigation.getParam('formData');
    __DEV__ && console.log('PersonalSignContract screen props:', this.props, formData);
    return (
      <View style={styles.container}>
        <WebView
          source={{ uri: WebviewSource }}
          ref={ref => (this.webview = ref)}
          onLoadProgress={e => {
            this.setState({ loadProgress: e.nativeEvent.progress });
            console.log(e.nativeEvent.progress);
          }}
          onLoadEnd={() => this._postMessage(formData)}
          startInLoadingState={true}
          renderLoading={this._renderLoading}
          renderError={this._renderError}
          onMessage={e => this._handleMessage(e)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1
  },
  empty_container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  empty_text: {
    fontSize: 13,
    color: '#646464',
    paddingTop: 10
  },
  btn: {
    marginTop: 20,
    marginBottom: 20
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
)(PersonalSignContract);
