import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { colors } from '../../config';

class PreAuth extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      mobile: '',
      password: ''
    };
  }

  handleBtnPress = single => {
    this.props.navigation.push(single);
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('gogo_mobile/static/imgs/icon_512.png')}
          style={{ alignSelf: 'center', width: 200, height: 200 }}
        />
        <Button
          title="登录"
          containerViewStyle={{ ...styles.btnContainer, marginTop: 60 }}
          textStyle={styles.text}
          backgroundColor={colors.THEME_COLOR}
          borderRadius={6}
          onPress={() => this.handleBtnPress('Login')}
        />
        <Button
          title="注册"
          containerViewStyle={styles.regBtn}
          textStyle={{ ...styles.text, color: '#646464' }}
          backgroundColor="#ffffff"
          borderRadius={6}
          // buttonStyle={{ backgroundColor: '#ffffff' }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    alignItems: 'center'
  },
  btnContainer: {
    backgroundColor: colors.THEME_COLOR,
    width: '90%',
    alignSelf: 'center'
  },
  text: { color: 'white', fontSize: 16 },
  regBtn: {
    backgroundColor: '#ffffff',
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    borderColor: colors.THEME_COLOR,
    borderWidth: 1
  }
});

export default PreAuth;
