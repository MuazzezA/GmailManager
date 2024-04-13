import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ScreenName} from './ScreenName.ts';
import Home from '../screens/Home.tsx';
import Folders from '../screens/Folders.tsx';
import MailSvg from '../assets/icons/email.svg';
import FolderSvg from '../assets/icons/folders.svg';

const Tab = createBottomTabNavigator();
export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name={ScreenName.HOME}
        component={Home}
        options={{
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
