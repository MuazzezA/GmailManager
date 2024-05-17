export enum ScreenName {
  SPLASH = 'splash',
  TABS = 'tabs',
  HOME = 'home',
  LOGIN = 'login',
  FOLDERS = 'folders',
  SETTINGS = 'settings',
  DETAIL = 'detail',
}

export type RootStackParamList = {
  [ScreenName.SPLASH]: undefined;
  [ScreenName.TABS]: undefined;
  [ScreenName.HOME]: undefined;
  [ScreenName.LOGIN]: undefined;
  [ScreenName.FOLDERS]: undefined;
  [ScreenName.SETTINGS]: undefined;
  [ScreenName.DETAIL]: {mail: string};
};
