import React, {useEffect, useLayoutEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, TouchableOpacity, View} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {ScreenName} from '../navigation/ScreenName.ts';
import {getEmailSender} from '../helpers/getEmailSender.ts';
import WebView from 'react-native-webview';
import {getMailBody} from '../helpers/getMailBody.tsx';
import {MailType} from '../types/MailType.ts';
import Plus from '../assets/icons/plus.svg';
import {FolderListModal} from '../components/FolderListModal.tsx';
import {useSaveMail} from '../hooks/useSaveMail.ts';

const Detail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const mail = route.params?.mail as MailType;
  const sender = getEmailSender(mail);

  const [isModalVisible, setModalVisible] = useState(false);

  const {addToFolder, deleteFromFolder, isSavedMail} = useSaveMail();
  const savedFolder = isSavedMail(mail.id.toString());

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
          style={styles.padding}
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
        style={styles.flex}
      />
      {isModalVisible && (
        <FolderListModal
          savedFolderId={savedFolder}
          visible={isModalVisible}
          setModalVisible={setModalVisible}
          saveToFolder={folderId => addToFolder(mail.id, folderId)}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  padding: {padding: 6},
  flex: {flex: 1},
});
export default Detail;
