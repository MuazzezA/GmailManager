import React from 'react';
import {StyleSheet, Text, SafeAreaView} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {ScreenName} from '../navigation/ScreenName.ts';
import {getEmailSender} from '../helpers/getEmailSender.ts';
import {getEmailSubject} from '../helpers/getEmailSubject.ts';

const Detail = () => {
  const route = useRoute<ScreenName.DETAIL>();
  const mail = route.params?.mail;
  const sender = getEmailSender(mail);
  const subject = getEmailSubject(mail);
  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.senderText}>{sender}</Text>
      <Text style={styles.subjectText}>{subject}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    gap: 8,
    flex: 1,
    marginHorizontal: 8,
  },
  senderText: {
    fontSize: 22,
    fontWeight: '700',
  },
  subjectText: {
    fontSize: 18,
    fontWeight: '300',
  },
});
export default Detail;
