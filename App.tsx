/**
 *
 * Muazzez Aydın
 * JR. Mobile Developer
 *
 */

import React, {useEffect} from 'react';
import {PaperProvider, MD3LightTheme as DefaultTheme} from 'react-native-paper';
import {colors} from './src/constants/Theme.ts';
import RootNavigation from './src/navigation/RootNavigation.tsx';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {configureGoogleAPI} from './src/helpers/configureGoogleAPI.ts';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    secondary: colors.secondary,
  },
};

function App() {
  useEffect(() => {
    configureGoogleAPI();
  }, []);

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <RootNavigation />
      </PaperProvider>
    </SafeAreaProvider>
  );
}

export default App;
