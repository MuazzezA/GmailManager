import {createJSONStorage, persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FolderType} from '../types/FolderType.ts';
import {SavedMailType} from '../types/MailType.ts';
import {StateCreator} from 'zustand';
import {createWithEqualityFn} from 'zustand/traditional';

type AppStateType = {
  folders: FolderType[] | null;
  setFolders: (data: FolderType[]) => void;
  savedMails: SavedMailType[] | null;
  setSavedMails: (data: SavedMailType[]) => void;
};

const appStateSlice: StateCreator<
  AppStateType,
  [['zustand/persist', unknown]]
> = set => ({
  folders: null,
  setFolders: (data: FolderType[]) => set({folders: data}),
  savedMails: null,
  setSavedMails: (data: SavedMailType[]) => set({savedMails: data}),
});

export const useAppStore = createWithEqualityFn<AppStateType>()(
  persist(appStateSlice, {
    name: 'app-storage',
    storage: createJSONStorage(() => AsyncStorage),
  }),
);
