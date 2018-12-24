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
import Catalogue from '../components/HomeStacks/Infos/Catalogue';
import Company from '../components/HomeStacks/Infos/Company';
import Xinpishengming from '../components/HomeStacks/Infos/Xinpishengming';
import Beianxinxi from '../components/HomeStacks/Infos/beianxinxi';
import FeeStandard from '../components/HomeStacks/Infos/FeeStandard';
import RiskManage from '../components/HomeStacks/Infos/RiskManage';
import ReviewReport from '../components/HomeStacks/Infos/ReviewReport';
import License from '../components/HomeStacks/Infos/License';
import Safety from '../components/HomeStacks/Infos/Safety';
import BankInfo from '../components/HomeStacks/Infos/BankInfo';
import FinancialPro from '../components/InvestStacks/FinancialPro/FinancialPro';
import Buyers from '../components/InvestStacks/FinancialPro/Buyers';
import CreateInvestOrder from '../components/InvestStacks/FinancialPro/CreateInvestOrder';
import Contracts from '../components/common/Contracts';
import SmsLogin from '../components/AuthStacks/SmsLogin';
import ResetLoginPwd from '../components/AuthStacks/ResetLoginPwd';
import InvestRecord from '../components/UserStacks/InvestRecord';

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
    TradingRecord,
    Catalogue,
    Company,
    Xinpishengming,
    Beianxinxi,
    FeeStandard,
    RiskManage,
    ReviewReport,
    License,
    Safety,
    BankInfo,
    FinancialPro,
    Buyers,
    CreateInvestOrder,
    Contracts,
    InvestRecord
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
    Initialize: Initialize,
    SmsLogin: SmsLogin,
    ResetLoginPwd: ResetLoginPwd
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
