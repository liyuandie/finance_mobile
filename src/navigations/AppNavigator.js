import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { colors } from '../config';
import RootTab from './RootTab';
import Setting from '../components/UserStacks/settings/setting';
import UserInfo from '../components/UserStacks/settings/userInfo';
import Balance from '../components/UserStacks/account/Balance';
import LoginScreen from '../components/AuthStacks/login';
import PreAuth from '../components/AuthStacks/PreAuth';
import Initialize from '../components/AuthStacks/Initialize';
import ChangeLoginPassword from '../components/UserStacks/settings/ChangeLoginPassword';
import AboutUs from '../components/UserStacks/About/AboutUs';
import FindUs from '../components/UserStacks/About/FindUs';
import SetUserName from '../components/UserStacks/settings/SetName';
import SetEmail from '../components/UserStacks/settings/SetEmail';
import TestIntroduce from '../components/UserStacks/RiskLevel/TestIntroduce';
import RiskLevelRule from '../components/UserStacks/RiskLevel/RiskLevelRule';
import Test from '../components/UserStacks/RiskLevel/Test';
import TestResult from '../components/UserStacks/RiskLevel/TestResult';
import MyCard from '../components/UserStacks/card/MyCard';
import TradingRecord from '../components/UserStacks/account/TradingRecord';

const AppStack = createStackNavigator(
  {
    RootTab,
    Setting,
    UserInfo,
    Balance,
    ChangeLoginPassword,
    AboutUs,
    FindUs,
    SetUserName,
    SetEmail,
    TestIntroduce,
    RiskLevelRule,
    Test,
    TestResult,
    MyCard,
    TradingRecord
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: colors.THEME_COLOR,
        borderBottomWidth: 0
      },
      headerTintColor: colors.HEADER_TINT_COLOR,
      headerTitleStyle: {
        fontWeight: 'bold'
      },
      headerBackTitle: null
      // header: null
    },
    initialRouteName: 'RootTab'
  }
);

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    PreAuth: PreAuth,
    Initialize: Initialize
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: colors.THEME_COLOR,
        borderBottomWidth: 0
      },
      headerTintColor: colors.HEADER_TINT_COLOR,
      headerTitleStyle: {
        fontWeight: 'bold'
      }
      // header: null
    },
    initialRouteName: 'Initialize'
  }
);

const AppNavigator = createSwitchNavigator(
  {
    Auth: AuthStack,
    App: AppStack
  },
  {
    initialRouteName: 'Auth'
  }
);

export default AppNavigator;
