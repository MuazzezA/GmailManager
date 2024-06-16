import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useState} from 'react';
import {clearStorage, clearUserSession} from '../store/logic.ts';
import {CommonActions, useNavigation} from '@react-navigation/native';

export const useSignOutGoogle = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const signOut = async () => {
    setLoading(true);
    try {
      await GoogleSignin.signOut();
      await clearUserSession();
      await clearStorage();
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'login'}],
        }),
      );
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return {loading, signOut};
};
