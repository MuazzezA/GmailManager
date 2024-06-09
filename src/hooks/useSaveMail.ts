import {useAppStore} from '../store/store.ts';
import {shallow} from 'zustand/shallow';
import {FolderType} from '../types/FolderType.ts';
import {SavedMailType} from '../types/MailType.ts';
import {Alert} from 'react-native';

export const useSaveMail = () => {
  const {folders, setSavedMails, savedMails} = useAppStore(
    state => ({
      setFolders: state.setFolders,
      folders: state.folders,
      savedMails: state.savedMails,
      setSavedMails: state.setSavedMails,
    }),
    shallow,
  );

  const isSavedMailInSpecificFolder = (mailId: string, folderId: number) => {
    if (savedMails) {
      const savedFolder = savedMails.find(
        saved => saved.id.toString() === folderId.toString(),
      );
      return savedFolder && savedFolder.mails.some(m => m.id === mailId);
    }
  };

  const isSavedMail = (mailId: string): number[] => {
    if (savedMails) {
      const savedFolders = savedMails.filter(saved =>
        saved.mails.some(m => m.id === mailId),
      );
      const folderIds = savedFolders.map(savedFolder => savedFolder.id);
      return folderIds.length > 0 ? folderIds : [-1];
    }
    return [-1];
  };

  const addToFolder = (mailId: number, folderId: number) => {
    if (!folders) {
      return;
    }

    const isSaved = isSavedMailInSpecificFolder(mailId.toString(), folderId);

    if (isSaved) {
      Alert.alert(
        'This mail has already been saved to the folder.',
        'Do you want to remove it from the folder?',
        [
          {
            style: 'cancel',
            text: 'Cancel',
            onPress: () => {},
          },
          {
            text: 'Delete',
            onPress: () => deleteFromFolder(mailId, folderId),
            style: 'destructive',
          },
        ],
      );
      return;
    }

    const isCurrentFolder = folders?.some(
      (f: FolderType) => f?.id === folderId,
    );
    const isCurrentSavedMailGroup = savedMails?.some(g => g?.id === folderId);

    if (isCurrentFolder && isCurrentSavedMailGroup) {
      const addData = savedMails?.map((m: SavedMailType) => {
        if (m.id === folderId) {
          return {
            ...m,
            mails: [...(m.mails || []), {id: mailId}],
          };
        }
        return m;
      }) as SavedMailType[];

      setSavedMails(addData);
    } else {
      // todo : create
    }
  };

  const deleteFromFolder = (mailId: number, folderId: number) => {
    const isCurrentSavedMailGroup = savedMails?.some(g => g?.id === folderId);
    if (isCurrentSavedMailGroup && savedMails) {
      const updatedFolders = savedMails.map(folder => {
        if (folder.id === folderId) {
          return {
            ...folder,
            mails: folder?.mails?.filter(
              (mail: {id: string}) => mail.id !== mailId.toString(),
            ),
          };
        }
        return folder;
      });
      setSavedMails(updatedFolders);
    }
  };

  return {addToFolder, deleteFromFolder, isSavedMail};
};
