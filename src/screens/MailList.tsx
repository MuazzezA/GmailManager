import React, {useEffect, useLayoutEffect, useMemo, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  SafeAreaView,
  View,
  ActivityIndicator,
} from 'react-native';
import {colors} from '../constants/Theme.ts';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ScreenName} from '../navigation/ScreenName.ts';
import {MailContainer} from '../components/MailContainer.tsx';
import {useUserMails} from '../hooks/useUserMails.ts';
import GText from '../components/GText.tsx';
import {getUserSession} from '../store/logic.ts';
import {useAppStore} from '../store/store.ts';
import {useSaveMail} from '../hooks/useSaveMail.ts';

const MailList = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [session, setSession] = useState();
  const folder = route.params?.folder;
  const {savedMails} = useAppStore(state => ({
    savedMails: state.savedMails,
  }));

  const mailIDList = useMemo(() => {
    if (!savedMails) {
      return [];
    }
    const savedFolder = savedMails.find(saved => saved?.id === folder?.id);
    return savedFolder?.mails;
  }, [savedMails, folder]);

  useLayoutEffect(() => {
    const title =
      folder.folderName?.length > 20
        ? `${folder.folderName.substring(0, 25)}...`
        : folder.folderName;
    navigation.setOptions({
      headerTitle: title,
    });
  }, []);

  useEffect(() => {
    if (!mailIDList || mailIDList?.length < 1) {
      return;
    }
    getUserSession()
      .then(res => {
        setSession(res);
      })
      .catch(() => {});
  }, [mailIDList]);

  const {
    mails,
    pagination,
    setPagination,
    loading: loadingMails,
  } = useUserMails({
    mailIDList,
    session,
  });

  const {deleteFromFolder} = useSaveMail();

  if (loadingMails) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.folderContainer}>
        <GText
          text={folder.folderSubject}
          size={18}
          weight={'600'}
          color={colors.secondary}
        />
        <GText
          text={`Mail Count : ${mailIDList?.length}`}
          color={colors.secondary}
        />
      </View>

      <FlatList
        contentContainerStyle={styles.flatList}
        showsVerticalScrollIndicator={false}
        pagingEnabled={true}
        data={mails}
        renderItem={({item}) => (
          <MailContainer
            key={`mail-${item.id}`}
            mail={item}
            onPress={() => navigation.navigate(ScreenName.DETAIL, {mail: item})}
            isDeleteActive={true}
            deleteMailAction={() => deleteFromFolder(item.id, folder.id)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <GText
              text={'We could not find any registered e-mails in this list.'}
              size={16}
              weight={'600'}
              style={styles.text}
            />
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flatList: {
    padding: 8,
  },
  folderContainer: {
    padding: 8,
    backgroundColor: colors.primary,
    gap: 6,
  },
  empty: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '80%',
  },
  text: {textAlign: 'center'},
});
export default MailList;
