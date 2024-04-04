import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ScreenName} from './ScreenName.ts';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../screens/Splash.tsx';
import TabNavigation from './TabNavigation.tsx';
import Login from '../screens/Login.tsx';
import Settings from '../screens/Settings.tsx';

const Stack = createStackNavigator();
export default function RootNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name={ScreenName.SPLASH}
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen name={ScreenName.LOGIN} component={Login} />
        <Stack.Screen name={ScreenName.SETTINGS} component={Settings} />
        <Stack.Screen name={ScreenName.TABS} component={TabNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
