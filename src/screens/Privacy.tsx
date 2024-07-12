import React, {useLayoutEffect} from 'react';
import GText from '../components/GText.tsx';
import {privacyPolicy} from '../constants/PrivacyPolicy.ts';
import {terms} from '../constants/Terms.ts';
import {ScrollView} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

const TermsAndPrivacy = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const type = route.params?.type ?? 'privacy';

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: type?.toUpperCase(),
    });
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <GText text={type === 'privacy' ? privacyPolicy : terms} size={16} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    padding: 12,
  },
});

export default React.memo(TermsAndPrivacy);
