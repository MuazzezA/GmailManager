import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useState} from 'react';
import {setUserSession, storeUserData} from '../store/logic.ts';

export const useSignInGoogle = () => {
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const signIn = async () => {
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const tokenData = await GoogleSignin.getTokens();
      if (tokenData) {
        await storeUserData(userInfo);
        await setUserSession(tokenData.accessToken);
        setLoading(false);
        setIsSuccess(true);
      }
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  return {loading, signIn, isSuccess};
};
