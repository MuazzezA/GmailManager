import React, {useEffect} from 'react';
import {Dimensions, Image, StyleSheet, Text} from 'react-native';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {useSignInGoogle} from '../hooks/useSignInGoogle.ts';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScreenName} from '../navigation/ScreenName.ts';
import GText from '../components/GText.tsx';
import {colors} from '../constants/Theme.ts';
const {width, height} = Dimensions.get('window');
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
      <Image
        source={require('../assets/icons/email-2.png')}
        style={styles.image}
      />
      <GText
        size={20}
        text={'GMAIL MANAGER'}
        weight={'bold'}
        color={colors.primary}
      />
      <GoogleSigninButton onPress={signIn} disabled={loading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: width * 0.7,
    gap: 20,
  },
  image: {
    resizeMode: 'contain',
    opacity: 0.3,
    position: 'absolute',
    width: width * 1.5,
    left: 0,
    top: height * 0.1,
  },
});
export default Login;
