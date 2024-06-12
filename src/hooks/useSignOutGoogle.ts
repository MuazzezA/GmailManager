import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useState} from 'react';
import {clearStorage, clearUserSession} from '../store/logic.ts';

export const useSignOutGoogle = () => {
  const [loading, setLoading] = useState(false);

  const signOut = async () => {
    setLoading(true);
    try {
      await GoogleSignin.signOut();
      await clearUserSession();
      await clearStorage();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return {loading, signOut};
};
