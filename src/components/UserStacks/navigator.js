import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import UserScreen from './User';
import { colors } from '../../config';

const userStack = createStackNavigator(
  {
    userHome: UserScreen
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
    }
  }
);

export default userStack;
