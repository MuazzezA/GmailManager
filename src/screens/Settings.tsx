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
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const Settings = () => {
  const [user, setUser] = useState();

  const userData = useCallback(async () => {
    const data = await getUserData();
    setUser(data.user);
    console.log(data.user);
  }, []);

  useEffect(() => {
    userData().then();
  }, []);

  const deleteData = () => {
    clearUserSession().then();
    clearStorage().then();
  };

  const signOut = async () => {
    await GoogleSignin.signOut();
  };

  if (!user) {
    return <ActivityIndicator style={{flex: 1}} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={styles.row}>
        <View style={{gap: 4}}>
          <GText text={user?.email} size={18} style={styles.text} />
          <GText text={user?.name} size={16} />
        </View>
        <Image source={{uri: user?.photo}} style={styles.image} />
      </View>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => {
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
        }}>
        <GText text={'Delete All My Data'} size={16} style={styles.text} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          Alert.alert('Warning', 'Sign Out', [
            {
              style: 'cancel',
              text: 'Cancel',
              onPress: () => {},
            },
            {
              text: 'Delete',
              onPress: () => signOut(),
              style: 'destructive',
            },
          ]);
          // sign out
        }}
        style={[styles.button, {backgroundColor: colors.primary}]}
        activeOpacity={0.8}>
        <GText
          text={'Sing Out'}
          size={16}
          style={styles.text}
          color={'white'}
        />
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
});
export default Settings;
