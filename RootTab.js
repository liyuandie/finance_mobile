import { createBottomTabNavigator } from 'react-navigation';
import HomeScreen from './src/components/HomeStacks/Home';
import InvestScreen from './src/components/InvestStacks/Invest';
import UserScreen from './src/components/UserStacks/User';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const tabBarCfg = {
  Home: {
    label: '首页',
    iconName: 'home'
  },
  Invest: {
    label: '投资',
    iconName: 'finance'
  },
  User: {
    label: '我',
    iconName: 'account'
  }
};

const RootTabs = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Invest: InvestScreen,
    User: UserScreen
  },
  {
    navigationOptions: ({ navigation }) => {
      let Cfg;
      const { routeName } = navigation.state;
      if (routeName === 'Home') {
        Cfg = tabBarCfg.Home;
      } else if (routeName === 'Invest') {
        Cfg = tabBarCfg.Invest;
      } else if (routeName === 'User') {
        Cfg = tabBarCfg.User;
      }
      return {
        tabBarIcon: ({ tintColor }) => <Icon name={Cfg.iconName} color={tintColor} size={24} />,
        tabBarLabel: Cfg.label
      };
    },
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: '#8e8e8e',
      style: {
        borderTopWidth: 0.5,
        borderTopColor: '#e0e0e0',
        height: 45
      }
    }
  }
);

export default class RootScreen extends Component {
  render() {
    return <RootTabs />;
  }
}
