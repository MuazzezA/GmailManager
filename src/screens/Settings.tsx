import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {clearStorage, clearUserSession, getUserData} from '../store/logic.ts';
import GText from '../components/GText.tsx';
import {ScrollView} from 'react-native-gesture-handler';
import {colors} from '../constants/Theme.ts';
import {useSignOutGoogle} from '../hooks/useSignOutGoogle.ts';
import {useNavigation} from '@react-navigation/native';
import {ScreenName} from '../navigation/ScreenName.ts';
import {User} from '../types/User.ts';
import {useAppStore} from '../store/store.ts';

const Settings = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState<User | null | undefined>();
  const {loading, signOut} = useSignOutGoogle();

  const {setFolders, setSavedMails} = useAppStore(state => ({
    setFolders: state.setFolders,
    setSavedMails: state.setSavedMails,
  }));

  const userData = useCallback(async () => {
    const data = await getUserData();
    setUser(data?.user);
  }, []);

  useEffect(() => {
    userData().then().catch();
  }, []);

  const deleteData = () => {
    clearUserSession().then().catch();
    clearStorage().then().catch();
    setFolders([]);
    setSavedMails([]);
    // todo : resetin zustand persist şeklini araştır
  };

  if (!user || loading) {
    return <ActivityIndicator style={styles.screen} />;
  }

  const deleteAction = () => {
    Alert.alert('Warning', 'The folders you created will be deleted.', [
      {
        style: 'cancel',
        text: 'Cancel',
        onPress: () => {},
      },
      {
        text: 'Delete',
        onPress: () => deleteData(),
        style: 'destructive',
      },
    ]);
  };
  const signOutAction = () => {
    Alert.alert('Warning', 'Sign Out', [
      {
        style: 'cancel',
        text: 'Cancel',
        onPress: () => {},
      },
      {
        text: 'Sign Out',
        onPress: () => signOut(),
        style: 'destructive',
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={styles.row}>
        <View style={styles.gap}>
          <GText text={user?.email} size={18} style={styles.text} />
          <GText text={user?.name} size={16} />
        </View>
        <Image source={{uri: user?.photo}} style={styles.image} />
      </View>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => deleteAction()}>
        <GText text={'Delete All My Data'} size={16} style={styles.text} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => signOutAction()}
        style={[styles.button, {backgroundColor: colors.primary}]}
        activeOpacity={0.8}>
        <GText
          text={'Sign Out'}
          size={16}
          style={styles.text}
          color={'white'}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate(ScreenName.SUPPORT)}
        style={[styles.button, {marginTop: 52}]}
        activeOpacity={0.8}>
        <GText text={'Contact Us'} size={16} style={styles.text} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate(ScreenName.PRIVACY)}
        style={styles.button}
        activeOpacity={0.8}>
        <GText text={'Privacy Policy'} size={16} style={styles.text} />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 75,
    width: 75,
    borderRadius: 45,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 16,
    flexWrap: 'wrap',
    gap: 4,
  },
  screen: {
    flex: 1,
  },
  text: {
    fontFamily: 'Quicksand-Bold',
  },
  button: {
    margin: 8,
    padding: 12,
    backgroundColor: colors.secondary,
    borderRadius: 8,
  },
  gap: {gap: 4},
});
export default Settings;
