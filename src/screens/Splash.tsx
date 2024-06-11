import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../constants/Theme.ts';
import {useNavigation} from '@react-navigation/native';
import {ScreenName} from '../navigation/ScreenName.ts';
import {useAuthValidation} from '../hooks/useAuthValidation.ts';
import mobileAds from 'react-native-google-mobile-ads';

const Splash = () => {
  const navigation = useNavigation();
  const {validate, loading} = useAuthValidation();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!loading) {
        mobileAds()
          .initialize()
          .then(adapterStatuses => {
            console.info('Ads initialization complete!');
          });
        navigation.navigate(validate ? ScreenName.TABS : ScreenName.LOGIN);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [loading, navigation, validate]);

  return (
    <View style={styles.screen}>
      <Text>Splash</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
export default Splash;
