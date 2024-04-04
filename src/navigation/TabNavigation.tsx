import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ScreenName} from './ScreenName.ts';
import Home from '../screens/Home.tsx';
import Folders from '../screens/Folders.tsx';

const Tab = createBottomTabNavigator();
export default function TabNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen name={ScreenName.HOME} component={Home} />
      <Tab.Screen name={ScreenName.FOLDERS} component={Folders} />
    </Tab.Navigator>
  );
}
