import React, { Component } from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation';
import ShangPiao from './ShangPiao';
import YinPiao from './YinPiao';
import CunDan from './CunDan';

import { colors } from '../../config';
import { Dimensions, View, StyleSheet } from 'react-native';
import { ButtonGroup } from 'react-native-elements';

const headerTabs = ['银票', '商票', '存单'];

const { width, length } = Dimensions.get('window');

class TabBarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0
    };
  }

  updateIndex = selectedIndex => {
    const { navigation } = this.props;
    this.setState({ selectedIndex });
    if (selectedIndex === 0) {
      navigation.navigate('yinpiao');
    }
    if (selectedIndex === 1) {
      navigation.navigate('shangpiao');
    }
    if (selectedIndex === 2) {
      navigation.navigate('cundan');
    }
  };

  componentDidMount() {
    // const didBlurSubscription = this.props.navigation.addListener('didBlur', ({ state }) => {
    //   console.log('2222223333333');
    //   this.setState({
    //     selectedIndex: state.index
    //   });
    // });
  }
  componentWillReceiveProps(nextProps) {
    const routeIndex = nextProps.navigation.state.index;
    this.setState({
      selectedIndex: routeIndex
    });
  }

  render() {
    console.log('invest page tabBar props:', this.props.navigation.state.index);
    return (
      <View style={styles.tabBarContainer}>
        <ButtonGroup
          selectedIndex={this.state.selectedIndex}
          buttons={headerTabs}
          onPress={() => this.props.navigation.navigate('cundan')}
          containerStyle={styles.tabBtnContainer}
          buttonStyle={styles.tabBtn}
          selectedButtonStyle={styles.selectedTabBtn}
          textStyle={styles.label}
          selectedTextStyle={styles.selectedLabel}
          onPress={this.updateIndex}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabBarContainer: {
    backgroundColor: colors.THEME_COLOR,
    height: 70,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  tabBtnContainer: {
    height: 30,
    width: width * 0.6
  },
  tabBtn: {
    backgroundColor: colors.THEME_COLOR,
    borderColor: '#ffffff'
  },
  label: {
    fontSize: 13,
    color: '#ffffff'
  },
  selectedLabel: {
    color: colors.THEME_COLOR
  },
  selectedTabBtn: {
    backgroundColor: '#ffffff'
  }
});

const InvestStack = createMaterialTopTabNavigator(
  {
    yinpiao: YinPiao,
    shangpiao: ShangPiao,
    cundan: CunDan
  },
  {
    navigationOptions: {},
    tabBarOptions: {},
    initialRouteName: 'yinpiao',
    tabBarComponent: TabBarComponent
  }
);

export default InvestStack;
