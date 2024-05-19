import {createJSONStorage, persist} from 'zustand/middleware';
import {createWithEqualityFn} from 'zustand/traditional';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAppStore = createWithEqualityFn(
  persist(
    set => ({
      folders: null,
      setFolders: data => set({folders: data}),
      savedMails: null,
      setSavedMails: data => set({savedMails: data}),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
