/**
 *
 * Muazzez Aydın
 * JR. Mobile Developer
 *
 */

import 'react-native-gesture-handler';
import React from 'react';
import {PaperProvider, MD3LightTheme as DefaultTheme} from 'react-native-paper';
import {colors} from './src/constants/Theme.ts';
import RootNavigation from './src/navigation/RootNavigation.tsx';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    secondary: colors.secondary,
  },
};
function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <RootNavigation />
      </PaperProvider>
    </SafeAreaProvider>
  );
}

export default App;
