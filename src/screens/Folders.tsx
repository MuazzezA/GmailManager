import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {FlatList, StyleSheet, View, TouchableOpacity} from 'react-native';
import {colors} from '../constants/Theme.ts';
import GText from '../components/GText.tsx';
import Plus from '../assets/icons/plus.svg';
import Trash from '../assets/icons/trash.svg';
import {useNavigation} from '@react-navigation/native';
import {useFolders} from '../hooks/useFolders.ts';
import {EmptyList} from '../components/EmptyList.tsx';
import {CreateFolderModal} from '../components/CreateFolderModal.tsx';
import {FolderType} from '../types/FolderType.ts';
import {ScreenName} from '../navigation/ScreenName.ts';
import {BannerAds} from '../components/BannerAds.tsx';
import useInterstitialAd from '../hooks/useInterstitialAd.ts';
import ads from '../constants/Ads.ts';

const Folders = () => {
  const navigation = useNavigation();
  const [folderName, setFolderName] = React.useState('');
  const [folderSubject, setFolderSubject] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const {loaded, showAd} = useInterstitialAd({adId: ads.AFTER_FOLDER_FULL!});

  const {createFolder, deleteFolder, folders} = useFolders();
  const [showAds, setShowAds] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const createFolderItem = () => {
    createFolder({
      folderName: folderName,
      folderSubject: folderSubject,
      createAfter: () => {
        setFolderName('');
        setFolderSubject('');
        hideModal();
        setShowAds(true);
      },
    });
  };

  useEffect(() => {
    console.log(loaded);
    if (showAds && loaded) {
      try {
        showAd();
      } catch (e) {
        console.error('show ads error');
      }
    }
  }, [showAds, loaded]);

  const renderItem = useCallback(({item}: {item: FolderType}) => {
    return (
      <TouchableOpacity
        style={[styles.folderContainer, {borderColor: colors.primary}]}
        activeOpacity={0.8}
        onPress={() => {
          // @ts-ignore
          navigation.navigate(ScreenName.MAIL_LIST, {folder: item});
        }}>
        <View style={{gap: 8}}>
          <GText text={item.folderName} style={styles.nameText} />
          <GText text={item.folderSubject} style={styles.subjectText} />
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{padding: 8}}
          onPress={() => deleteFolder(item)}>
          <Trash width="24" height="24" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{padding: 6}}
          activeOpacity={0.8}
          onPress={showModal}>
          <Plus stroke={colors.secondary} />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <View style={styles.safe}>
      <FlatList
        data={folders}
        renderItem={({item, index}) => (
          <>
            {index % 4 === 0 && (
              <BannerAds style={{marginBottom: 12}} adId={ads.FOLDER_BANNER} />
            )}
            {renderItem({item})}
          </>
        )}
        ListEmptyComponent={<EmptyList showModal={showModal} />}
        contentContainerStyle={styles.list}
      />
      <CreateFolderModal
        doneButtonPress={createFolderItem}
        folderName={folderName}
        folderSubject={folderSubject}
        hideModal={hideModal}
        setFolderName={setFolderName}
        setFolderSubject={setFolderSubject}
        visible={visible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {flexGrow: 1, paddingTop: 12, gap: 12},
  folderContainer: {
    backgroundColor: colors.secondary,
    padding: 8,
    borderRadius: 4,
    marginHorizontal: 8,
    borderLeftWidth: 4,
    gap: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 16,
    fontWeight: '600',
  },
  subjectText: {},
});
export default Folders;
