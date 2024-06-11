import {Platform} from 'react-native';

const ads = {
  HOME_BANNER: Platform.select({
    ios: 'ca-app-pub-8452076246715539/3483459483',
    android: 'ca-app-pub-8452076246715539/3139844550',
  }),
  AFTER_FOLDER_FULL: Platform.select({
    ios: 'ca-app-pub-8452076246715539/1112548645',
    android: 'ca-app-pub-8452076246715539/8522219082',
  }),
  FOLDER_BANNER: Platform.select({
    ios: 'ca-app-pub-8452076246715539/7501863020',
    android: 'ca-app-pub-8452076246715539/8685585203',
  }),
};

export default ads;
