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
import {FolderListItem} from '../components/FolderListItem.tsx';

const Folders = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);
  const {loaded, showAd} = useInterstitialAd({adId: ads.AFTER_FOLDER_FULL!});
  const {createFolder, deleteFolder, folders} = useFolders();
  const [showAds, setShowAds] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const createFolderItem = ({
    folderName,
    folderSubject,
  }: {
    folderSubject: string;
    folderName: string;
  }) => {
    createFolder({
      folderName: folderName,
      folderSubject: folderSubject,
      createAfter: () => {
        hideModal();
        setShowAds(true);
      },
    });
  };

  useEffect(() => {
    console.log('loaded : ', loaded);
    if (showAds && loaded) {
      try {
        showAd();
      } catch (e) {
        console.error('show ads error');
      }
    }
  }, [showAds, loaded]);

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
        renderItem={data => (
          <FolderListItem data={data} deleteFolder={deleteFolder} />
        )}
        ListEmptyComponent={<EmptyList showModal={showModal} />}
        contentContainerStyle={styles.list}
      />
      <CreateFolderModal
        doneButtonPress={createFolderItem}
        hideModal={hideModal}
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
});
export default Folders;
