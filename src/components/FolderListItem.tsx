import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {colors} from '../constants/Theme.ts';
import {ScreenName} from '../navigation/ScreenName.ts';
import GText from './GText.tsx';
import Trash from '../assets/icons/trash.svg';
import React from 'react';
import {FolderType} from '../types/FolderType.ts';

export const FolderListItem = ({
  item,
  deleteFolder,
}: {
  item: FolderType;
  deleteFolder: (item: FolderType) => void;
}) => {
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
  },
  nameText: {
    fontSize: 16,
    fontWeight: '600',
  },
  subjectText: {},
});
