import React, {useEffect, useLayoutEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {ScreenName} from '../navigation/ScreenName.ts';
import {getEmailSender} from '../helpers/getEmailSender.ts';
import WebView from 'react-native-webview';
import {getMailBody} from '../helpers/getMailBody.tsx';
import {MailType} from '../types/MailType.ts';
import Plus from '../assets/icons/plus.svg';
import {FolderListModal} from '../components/FolderListModal.tsx';

const Detail = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<ScreenName.DETAIL>>();
  const mail = route.params?.mail as MailType;
  const sender = getEmailSender(mail);

  const [isModalVisible, setModalVisible] = useState(false);
  const isInFolders = () => {
    return false;
    // todo : folder list empty check -> create folder -> add auto
  };

  const openFolderList = () => {
    setModalVisible(!isModalVisible);
  };

  useLayoutEffect(() => {
    const title =
      sender?.length > 20 ? `${sender.substring(0, 25)}...` : sender;
    navigation.setOptions({
      headerTitle: title,
      headerRight: () => (
        <TouchableOpacity
          style={{padding: 6}}
          activeOpacity={0.8}
          onPress={openFolderList}>
          <Plus />
        </TouchableOpacity>
      ),
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
      <FolderListModal
        visible={isModalVisible}
        setModalVisible={setModalVisible}
        mail={mail}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    gap: 8,
    flex: 1,
  },
});
export default Detail;
