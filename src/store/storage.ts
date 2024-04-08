import EncryptedStorage from 'react-native-encrypted-storage';
import {USER_ACCESS_TOKEN, USER_DATA} from '../constants/General.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const setUserSession = async (token: string) => {
  try {
    await EncryptedStorage.setItem(
      USER_ACCESS_TOKEN,
      JSON.stringify({
        token: token,
      }),
    );
  } catch (error) {
    console.error('ERROR setUserSession : ', error);
  }
};

export const getUserSession = async () => {
  try {
    const session = await EncryptedStorage.getItem(USER_ACCESS_TOKEN);
    return session ? session : '';
  } catch (error) {
    console.error('ERROR getUserSession : ', error);
    return '';
  }
};

export const clearUserSession = async () => {
  try {
    await EncryptedStorage.clear();
  } catch (e) {
    console.error('ERROR clearUserSession : ', e);
  }
};

export const storeUserData = async (value: {}) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(USER_DATA, jsonValue);
  } catch (error) {
    console.error('ERROR storeUserData : ', error);
  }
};

export const getUserData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(USER_DATA);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('ERROR getUserData : ', error);
  }
};

export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.error('ERROR clearStorage : ', e);
  }
};
