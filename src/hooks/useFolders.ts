import {useAppStore} from '../store/store.ts';
import {shallow} from 'zustand/shallow';
import {FolderType} from '../types/FolderType.ts';

export const useFolders = () => {
  const {setFolders, folders} = useAppStore(
    state => ({
      setFolders: state.setFolders,
      folders: state.folders,
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
      const newList = folders
        ? [
            ...folders,
            {
              folderName,
              folderSubject,
              id: folders.length + 1,
            },
          ]
        : [
            {
              folderName,
              folderSubject,
              id: 0,
            },
          ];
      setFolders(newList);
      createAfter?.();
    }
  };

  const deleteFolder = (folder: FolderType) => {
    const newFolders = folders.filter((f: FolderType) => f.id !== folder.id);
    setFolders(newFolders);
  };

  return {createFolder, deleteFolder, folders};
};
