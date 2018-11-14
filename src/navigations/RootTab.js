import { createBottomTabNavigator } from 'react-navigation';
import HomeScreen from '../components/HomeStacks/Home';
import InvestScreen from '../components/InvestStacks/Invest';
import UserScreen from '../components/UserStacks/navigator';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../config';
import { tabBarCfg } from '../config';

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
      activeTintColor: colors.THEME_COLOR,
      inactiveTintColor: colors.INACTIVE_TINT_COLOR,
      style: {
        borderTopWidth: 0.5,
        borderTopColor: '#e0e0e0',
        height: 45
      }
    }
  }
);
RootTabs.navigationOptions = {
  header: null
};

export default RootTabs;
