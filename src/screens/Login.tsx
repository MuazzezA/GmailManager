import React, {useEffect} from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
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
        style={{
          textAlign: 'center',
          padding: width * 0.1,
        }}
      />
      <GText
        size={14}
        text={'Sing In With Google'}
        weight={'600'}
        color={colors.text}
        style={{
          textAlign: 'center',
        }}
      />
      <View style={styles.shadow}>
        <GoogleSigninButton onPress={signIn} disabled={loading} />
      </View>
      <View></View>
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
});
export default Login;
