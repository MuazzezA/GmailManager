import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ScreenName} from './ScreenName.ts';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../screens/Splash.tsx';
import TabNavigation from './TabNavigation.tsx';
import Login from '../screens/Login.tsx';
import Settings from '../screens/Settings.tsx';
import {colors} from '../constants/Theme.ts';
import Detail from '../screens/Detail.tsx';
import {ScreenParams} from '../types/ScreenType.ts';
// import {useAuthValidation} from '../hooks/useAuthValidation.ts';

const Stack = createStackNavigator<ScreenParams>();
export default function RootNavigation() {
  // const {validate} = useAuthValidation();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={ScreenName.SPLASH}
        screenOptions={{
          headerShown: false,
          cardStyle: {backgroundColor: colors.background},
        }}>
        <Stack.Screen
          name={ScreenName.SPLASH}
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen name={ScreenName.LOGIN} component={Login} />
        <Stack.Screen name={ScreenName.SETTINGS} component={Settings} />
        <Stack.Screen
          name={ScreenName.DETAIL}
          component={Detail}
          options={{
            headerShown: true,
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen name={ScreenName.TABS} component={TabNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
