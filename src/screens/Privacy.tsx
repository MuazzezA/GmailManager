import React from 'react';
import GText from '../components/GText.tsx';
import {privacyPolicy} from '../constants/PrivacyPolicy.js';
import {ScrollView} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';

const Privacy = () => {
  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <GText text={privacyPolicy} size={16} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    padding: 12,
  },
});

export default React.memo(Privacy);
