import {useAppStore} from '../store/store.ts';
import {shallow} from 'zustand/shallow';
import {FolderType} from '../types/FolderType.ts';

export const useFolders = () => {
  const {setFolders, folders, setSavedMails, savedMails} = useAppStore(
    state => ({
      setFolders: state.setFolders,
      folders: state.folders,
      setSavedMails: state.setSavedMails,
      savedMails: state.savedMails,
    }),
    shallow,
  );

  const createFolder = ({
    folderName,
    folderSubject,
    createAfter = () => {},
  }: {
    folderName: string;
    folderSubject: string;
    createAfter: () => void;
  }) => {
    if (folderName.length > 3 && folderSubject.length > 5) {
      if (folders?.length > 0) {
        setFolders([
          ...folders,
          {
            folderName,
            folderSubject,
            id: folders.length,
          },
        ]);
        setSavedMails([
          ...savedMails,
          {
            id: folders.length,
            mails: [],
          },
        ]);
      } else {
        setFolders([
          {
            folderName,
            folderSubject,
            id: 0,
          },
        ]);
        setSavedMails([
          {
            id: 0,
            mails: [],
          },
        ]);
      }

      createAfter?.();
    }
  };

  const deleteFolder = (folder: FolderType[]) => {
    const newFolders = folders?.filter((f: FolderType) => f.id !== folder?.id);
    setFolders(newFolders);
  };

  return {createFolder, deleteFolder, folders};
};
