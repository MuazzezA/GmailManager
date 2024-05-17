import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {colors} from '../constants/Theme.ts';
import {useNavigation} from '@react-navigation/native';
import {ScreenName} from '../navigation/ScreenName.ts';
import {MailContainer} from '../components/MailContainer.tsx';
import {useGetPrepareMail} from '../hooks/useGetPrepareMail.ts';
import {useUserMails} from '../hooks/useUserMails.ts';
import {useSearchMail} from '../hooks/useSearchMail.ts';
const PER_COUNT = 30;

const Home = () => {
  const navigation = useNavigation();
  const [text, setText] = React.useState('');
  const {session, mailIDList, loading: loadingIDList} = useGetPrepareMail();
  const {
    mails,
    pagination,
    setPagination,
    loading: loadingMails,
  } = useUserMails({
    mailIDList,
    session,
    loadingIDList,
  });
  const {searchMail, searchResult} = useSearchMail(mails);

  const onEndReachedFlatList = () => {
    if (
      !loadingIDList &&
      mailIDList?.length > 0 &&
      !!session &&
      !loadingMails &&
      mails.length <= pagination.end
    ) {
      setPagination({
        start: pagination.end,
        end: pagination.end + PER_COUNT,
      });
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <TextInput
        label="Search"
        mode="flat"
        value={text}
        onChangeText={(value: string) => searchMail(value)}
        style={styles.input}
      />
      {!session || loadingIDList || !mails ? (
        <ActivityIndicator style={styles.indicator} />
      ) : (
        <FlatList
          contentContainerStyle={styles.flatList}
          showsVerticalScrollIndicator={false}
          pagingEnabled={true}
          data={mails}
          onEndReached={onEndReachedFlatList}
          ListFooterComponent={<ActivityIndicator style={styles.indicator} />}
          renderItem={({item}) => (
            <MailContainer
              key={`mail-${item.id}`}
              mail={item}
              onPress={() =>
                //@ts-ignore
                navigation.navigate(ScreenName.DETAIL, {mail: item})
              }
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.text,
  },
  flatList: {
    padding: 8,
  },
  input: {
    backgroundColor: colors.background,
    marginHorizontal: 8,
  },
  indicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
});
export default Home;
