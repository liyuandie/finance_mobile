import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { colors } from '../config';
import RootTab from './RootTab';
import Setting from '../components/UserStacks/setting';
import UserInfo from '../components/UserStacks/userInfo';
import Balance from '../components/UserStacks/balance';
import LoginScreen from '../components/AuthStacks/login';
import PreAuth from '../components/AuthStacks/PreAuth';
import Initialize from '../components/AuthStacks/Initialize';
import ChangeLoginPassword from '../components/UserStacks/ChangeLoginPassword';

const AppStack = createStackNavigator(
  {
    RootTab: RootTab,
    Setting: Setting,
    UserInfo: UserInfo,
    Balance: Balance,
    ChangeLoginPassword: ChangeLoginPassword
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
