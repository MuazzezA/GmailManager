import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../constants/Theme.ts';
import {useNavigation} from '@react-navigation/native';
import {ScreenName} from '../navigation/ScreenName.ts';
import {useAuthValidation} from '../hooks/useAuthValidation.ts';
const Splash = () => {
  const navigation = useNavigation();
  const {validate} = useAuthValidation();
  useEffect(() => {
    setTimeout(() => {
      // todo : user login check

      validate
        ? navigation.navigate(ScreenName.TABS)
        : navigation.navigate(ScreenName.LOGIN);
    }, 1000);
  }, [navigation, validate]);

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
