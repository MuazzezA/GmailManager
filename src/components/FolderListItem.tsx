import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {colors} from '../constants/Theme.ts';
import {ScreenName} from '../navigation/ScreenName.ts';
import GText from './GText.tsx';
import Trash from '../assets/icons/trash.svg';
import React, {useCallback} from 'react';
import {FolderType} from '../types/FolderType.ts';
import {BannerAds} from './BannerAds.tsx';
import ads from '../constants/Ads.ts';
import {useNavigation} from '@react-navigation/native';

export const FolderListItem = ({
  data,
  deleteFolder,
}: {
  data: {item: FolderType; index: number};
  deleteFolder: (item: FolderType) => void;
}) => {
  const navigation = useNavigation();
  const folderItem = useCallback(() => {
    return (
      <TouchableOpacity
        style={styles.folderContainer}
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate(ScreenName.MAIL_LIST, {folder: data.item});
        }}>
        <View style={styles.gap}>
          <GText text={data.item.folderName} style={styles.nameText} />
          <GText text={data.item.folderSubject} style={styles.subjectText} />
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.trash}
          onPress={() => deleteFolder(data.item)}>
          <Trash width="24" height="24" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }, []);

  return (
    <>
      {data.index % 4 === 0 && (
        <BannerAds style={styles.ads} adId={ads.FOLDER_BANNER} />
      )}
      {folderItem()}
    </>
  );
};

const styles = StyleSheet.create({
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
    borderColor: colors.primary,
  },
  nameText: {
    fontSize: 16,
    fontWeight: '600',
  },
  subjectText: {},
  gap: {gap: 8},
  trash: {padding: 8},
  ads: {marginBottom: 12},
});
