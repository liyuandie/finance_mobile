import { createStackNavigator } from 'react-navigation';
import { colors } from '../config';
import RootTab from './RootTab';
import Setting from '../components/UserStacks/setting';

const AppNavigator = createStackNavigator(
  {
    RootTab: RootTab,
    Setting: Setting
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: colors.THEME_COLOR
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

export default AppNavigator;
