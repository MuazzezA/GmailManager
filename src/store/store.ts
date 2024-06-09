import {createJSONStorage, persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FolderType} from '../types/FolderType.ts';
import {MailType} from '../types/MailType.ts';
import {StateCreator} from 'zustand';
import {createWithEqualityFn} from 'zustand/traditional';

type AppStateType = {
  folders: FolderType[] | null;
  setFolders: (data: FolderType[]) => void;
  savedMails: MailType | MailType[] | null;
  setSavedMails: (data: MailType | MailType[]) => void;
};

const appStateSlice: StateCreator<
  AppStateType,
  [['zustand/persist', unknown]]
> = set => ({
  folders: null,
  setFolders: (data: FolderType[]) => set({folders: data}),
  savedMails: null,
  setSavedMails: (data: MailType | MailType[]) => set({savedMails: data}),
});

export const useAppStore = createWithEqualityFn<AppStateType>()(
  persist(appStateSlice, {
    name: 'forest-storage',
    storage: createJSONStorage(() => AsyncStorage),
  }),
);
