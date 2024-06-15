import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RootStackParamList, ScreenName} from './ScreenName.ts';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../screens/Splash.tsx';
import TabNavigation from './TabNavigation.tsx';
import Login from '../screens/Login.tsx';
import Settings from '../screens/Settings.tsx';
import {colors} from '../constants/Theme.ts';
import Detail from '../screens/Detail.tsx';
import MailList from '../screens/MailList.tsx';
import Support from '../screens/Support.tsx';

const Stack = createStackNavigator<RootStackParamList>();
export default function RootNavigation() {
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
        <Stack.Screen
          name={ScreenName.SETTINGS}
          component={Settings}
          options={{
            headerShown: true,
            headerTitle: 'Setting',
          }}
        />
        <Stack.Screen
          name={ScreenName.DETAIL}
          component={Detail}
          options={{
            headerShown: true,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name={ScreenName.MAIL_LIST}
          component={MailList}
          options={{
            headerShown: true,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name={ScreenName.SUPPORT}
          component={Support}
          options={{
            headerShown: true,
            headerBackTitleVisible: false,
            headerTitle: 'Contact Us',
          }}
        />
        <Stack.Screen name={ScreenName.TABS} component={TabNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
