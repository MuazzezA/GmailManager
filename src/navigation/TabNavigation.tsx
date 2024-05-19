import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ScreenName} from './ScreenName.ts';
import Home from '../screens/Home.tsx';
import Folders from '../screens/Folders.tsx';
import MailSvg from '../assets/icons/email.svg';
import FolderSvg from '../assets/icons/folders.svg';
import {colors} from '../constants/Theme.ts';

const Tab = createBottomTabNavigator();
export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.text,
          borderRadius: 4,
        },
        headerTintColor: colors.background,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: colors.text,
          borderTopWidth: 4,
          borderTopColor: colors.primary,
          borderTopStartRadius: 8,
          borderTopEndRadius: 8,
        },
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name={ScreenName.HOME}
        component={Home}
        options={{
          headerTitle: 'Home',
          tabBarLabel: '',
          tabBarIcon: ({size, focused}) => (
            <MailSvg
              width={focused ? size * 1.2 : size}
              height={focused ? size * 1.2 : size}
            />
          ),
        }}
      />
      <Tab.Screen
        name={ScreenName.FOLDERS}
        component={Folders}
        options={{
          headerTitle: 'Folders',
          tabBarLabel: '',
          tabBarIcon: ({size, focused}) => (
            <FolderSvg
              width={focused ? size * 1.2 : size}
              height={focused ? size * 1.2 : size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
