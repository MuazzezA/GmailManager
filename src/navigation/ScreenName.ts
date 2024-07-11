import {FolderType} from '../types/FolderType.ts';

export enum ScreenName {
  SPLASH = 'splash',
  TABS = 'tabs',
  HOME = 'home',
  LOGIN = 'login',
  FOLDERS = 'folders',
  SETTINGS = 'settings',
  DETAIL = 'detail',
  MAIL_LIST = 'mailList',
  SUPPORT = 'support',
  TERMSANDPRIVACY = 'termsAndPrivacy',
}

export type RootStackParamList = {
  [ScreenName.SPLASH]: undefined;
  [ScreenName.TABS]: undefined;
  [ScreenName.HOME]: undefined;
  [ScreenName.LOGIN]: undefined;
  [ScreenName.FOLDERS]: undefined;
  [ScreenName.SETTINGS]: undefined;
  [ScreenName.DETAIL]: {mail: string};
  [ScreenName.MAIL_LIST]: {folder: FolderType};
  [ScreenName.SUPPORT]: undefined;
  [ScreenName.TERMSANDPRIVACY]: undefined;
};

/*
export type RootStackParamList = {
  SPLASH: undefined;
  TABS: undefined;
  HOME: undefined;
  LOGIN: undefined;
  FOLDERS: undefined;
  SETTINGS: undefined;
  DETAIL: {mail: string};
  MAIL_LIST: {folder: FolderType};
  SUPPORT: undefined;
  PRIVACY: undefined;
};
*/
