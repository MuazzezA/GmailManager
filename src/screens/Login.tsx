import React, {useEffect} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {useSignInGoogle} from '../hooks/useSignInGoogle.ts';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScreenName} from '../navigation/ScreenName.ts';
import GText from '../components/GText.tsx';
import {colors} from '../constants/Theme.ts';
import SplashScreen from 'react-native-splash-screen';

const {width, height} = Dimensions.get('window');
// @ts-ignore
const Login = ({navigation}) => {
  const {signIn, loading, isSuccess} = useSignInGoogle();
  useEffect(() => {
    SplashScreen.hide();
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
        size={24}
        text={'GMAIL MANAGER'}
        weight={'bold'}
        color={colors.primary}
      />
      <GText
        size={12}
        text={
          'The GmailManager app allows you to list your emails and organize them into folders. All data is stored only on your device and is not shared with any other person or organization. '
        }
        weight={'500'}
        color={colors.text}
        style={styles.info}
      />
      <GText
        size={14}
        text={'Sign In With Google'}
        weight={'600'}
        color={colors.text}
        style={styles.text}
      />
      <View style={styles.shadow}>
        <GoogleSigninButton onPress={signIn} disabled={loading} />
      </View>
      <View style={styles.privacy}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(ScreenName.TERMSANDPRIVACY, {type: 'privacy'})
          }>
          <GText
            text={'Click to read the Privacy Policy.'}
            style={styles.underline}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(ScreenName.TERMSANDPRIVACY, {type: 'terms'})
          }>
          <GText
            text={'Click to read the Terms Of Service.'}
            style={styles.underline}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: height * 0.1,
    gap: 22,
  },
  image: {
    resizeMode: 'contain',
    opacity: 0.3,
    position: 'absolute',
    width: width * 1.5,
    left: 0,
    top: height * 0.1,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  privacy: {
    position: 'absolute',
    bottom: height * 0.1,
    gap: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  underline: {textDecorationLine: 'underline'},
  info: {
    textAlign: 'center',
    padding: width * 0.1,
  },
  text: {
    textAlign: 'center',
  },
});
export default Login;
