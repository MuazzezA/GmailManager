import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {colors} from '../constants/Theme.ts';
import {useNavigation} from '@react-navigation/native';
import {ScreenName} from '../navigation/ScreenName.ts';
import {MailContainer} from '../components/MailContainer.tsx';
import {useGetPrepareMail} from '../hooks/useGetPrepareMail.ts';
import {useUserMails} from '../hooks/useUserMails.ts';
import {useSearchMail} from '../hooks/useSearchMail.ts';
import SearchIcon from '../assets/icons/search.svg';
import CloseIcon from '../assets/icons/close.svg';
import {EmptySearchList} from '../components/EmptySearchList.tsx';
const PER_COUNT = 30;

const Home = () => {
  const navigation = useNavigation();
  const [text, setText] = React.useState('');
  const [isActiveSearch, setIsActiveSearch] = React.useState(false);
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
  const {searchMail, searchResult, searchResultLoading} = useSearchMail();

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
  const isVisibleLoader =
    (isActiveSearch && searchResult?.length > 5) ||
    (!isActiveSearch && mails?.length > 5);

  const searchAction = () => {
    searchMail(text).then(res => {
      setIsActiveSearch(true);
    });
  };

  const cancelSearchAction = () => {
    setIsActiveSearch(false);
    setText('');
  };

  const searchButtonAction = () => {
    if (isActiveSearch) {
      setIsActiveSearch(false);
      setText('');
    } else {
      searchMail(text).then(res => {
        setIsActiveSearch(true);
      });
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.inputContainer}>
        <TextInput
          label="Search"
          mode="flat"
          value={text}
          onChangeText={(value: string) => {
            if (isActiveSearch) {
              setIsActiveSearch(false);
            }
            setText(value);
            // searchMail(value).then();
          }}
          style={styles.input}
        />
        <TouchableOpacity activeOpacity={0.7} onPress={searchButtonAction}>
          {isActiveSearch ? <CloseIcon /> : <SearchIcon />}
        </TouchableOpacity>
      </View>
      {/*<View style={styles.actionContainer}>
         todo : filters and selectable
        <GText text={'filters'} />
      </View>*/}
      {!session ||
      loadingIDList ||
      loadingMails ||
      !mails ||
      searchResultLoading ? (
        <ActivityIndicator style={styles.indicator} />
      ) : (
        <FlatList
          style={{marginTop: 2}}
          contentContainerStyle={styles.flatList}
          showsVerticalScrollIndicator={false}
          pagingEnabled={true}
          data={isActiveSearch ? searchResult : mails}
          onEndReached={onEndReachedFlatList}
          ListFooterComponent={
            isVisibleLoader ? (
              <ActivityIndicator style={styles.indicator} />
            ) : null
          }
          ListEmptyComponent={
            <EmptySearchList cancelSearchAction={cancelSearchAction} />
          }
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
    backgroundColor: colors.background,
  },
  flatList: {
    padding: 8,
  },
  input: {
    backgroundColor: colors.background,
    width: '85%',
  },
  indicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  actionContainer: {
    padding: 8,
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
export default Home;
