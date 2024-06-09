import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {WEB_CLIENT_ID, IOS_CLIENT_ID} from '@env';

export const configureGoogleAPI = () => {
  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/gmail.readonly'],
    webClientId: WEB_CLIENT_ID,
    offlineAccess: true,
    iosClientId: IOS_CLIENT_ID,
  });
};
