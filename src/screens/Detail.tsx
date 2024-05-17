import React, {useEffect, useLayoutEffect, useState} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {ScreenName} from '../navigation/ScreenName.ts';
import {getEmailSender} from '../helpers/getEmailSender.ts';
import WebView from 'react-native-webview';
import {getMailBody} from '../helpers/getMailBody.tsx';
import {MailType} from '../types/MailType.ts';

const Detail = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<ScreenName.DETAIL>>();
  const mail = route.params?.mail as MailType;
  const sender = getEmailSender(mail);

  useLayoutEffect(() => {
    const title =
      sender?.length > 20 ? `${sender.substring(0, 25)}...` : sender;
    navigation.setOptions({
      headerTitle: title,
    });
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <WebView
        showsVerticalScrollIndicator={false}
        originWhitelist={['*']}
        bounces={false}
        source={{html: getMailBody(mail)}}
        style={{flex: 1}}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    gap: 8,
    flex: 1,
    marginHorizontal: 8,
    backgroundColor: 'white',
  },
});
export default Detail;
