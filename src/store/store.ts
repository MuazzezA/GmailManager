import {create} from 'zustand';

export const useAppStore = create(set => ({
  folders: [],
  setFolders: (data: []) => set({folders: data}),
}));
