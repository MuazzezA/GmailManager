import {createJSONStorage, persist} from 'zustand/middleware';
import {createWithEqualityFn} from 'zustand/traditional';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FolderType} from '../types/FolderType.ts';
import {MailType} from '../types/MailType.ts';

export const useAppStore = createWithEqualityFn(
  persist(
    set => ({
      folders: null,
      setFolders: (data: FolderType) => set({folders: data}),
      savedMails: null,
      setSavedMails: (data: MailType | MailType[]) => set({savedMails: data}),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
