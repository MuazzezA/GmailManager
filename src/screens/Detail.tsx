import React from 'react';
import {StyleSheet, Text, SafeAreaView} from 'react-native';
import {useRoute} from '@react-navigation/native';

const Detail = () => {
  const route = useRoute<ScreenName.DETAIL>();
  const mail = route.params?.mail;

  return <SafeAreaView style={{gap: 20}} />;
};

const styles = StyleSheet.create({});
export default Detail;
