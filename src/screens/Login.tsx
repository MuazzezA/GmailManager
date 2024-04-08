import React, {useEffect} from 'react';
import {StyleSheet, Text} from 'react-native';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {useSignInGoogle} from '../hooks/useSignInGoogle.ts';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScreenName} from '../navigation/ScreenName.ts';

// @ts-ignore
const Login = ({navigation}) => {
  const {signIn, loading, isSuccess} = useSignInGoogle();
  useEffect(() => {
    if (isSuccess) {
      navigation.replace(ScreenName.TABS);
    }
  }, [isSuccess, navigation]);
  return (
    <SafeAreaView style={styles.screen}>
      <Text>WELCOME</Text>
      <GoogleSigninButton onPress={signIn} disabled={loading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 120,
    gap: 20,
  },
});
export default Login;
