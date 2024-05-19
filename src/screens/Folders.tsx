import React, {useCallback, useLayoutEffect} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  View,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../constants/Theme.ts';
import {useAppStore} from '../store/store.ts';
import GText from '../components/GText.tsx';
import {Button, TextInput} from 'react-native-paper';
import {shallow} from 'zustand/shallow';
import Plus from '../assets/icons/plus.svg';
import {useNavigation} from '@react-navigation/native';
const {width, height} = Dimensions.get('window');

const Folders = () => {
  const navigation = useNavigation();
  const [folderName, setFolderName] = React.useState('test folder name');
  const [folderSubject, setFolderSubject] = React.useState('test-1');
  const [visible, setVisible] = React.useState(false);

  const {setFolders, folders} = useAppStore(
    state => ({
      setFolders: state.setFolders,
      folders: state.folders,
    }),
    shallow,
  );

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const createFolder = () => {
    if (folderName.length > 3 || folderSubject.length > 5) {
      return;
    }
    const newList = folders
      ? [
          ...folders,
          {
            folderName,
            folderSubject,
            id: folders.length + 1,
          },
        ]
      : [
          {
            folderName,
            folderSubject,
            id: 0,
          },
        ];
    setFolders(newList);
    setFolderName('');
    setFolderSubject('');
    hideModal();
  };

  const renderItem = useCallback(
    ({item, index}: {item: any; index: number}) => {
      return (
        <TouchableOpacity
          style={[styles.folderContainer, {borderColor: colors.primary}]}
          activeOpacity={0.8}
          onPress={() => {
            // todo : go mail list
          }}>
          <GText text={item.folderName} style={styles.nameText} />
          <GText text={item.folderSubject} style={styles.subjectText} />
        </TouchableOpacity>
      );
    },
    [],
  );

  const CreateModal = () => {
    return (
      <View style={styles.centeredView}>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          animationType="fade"
          transparent={true}
          onRequestClose={hideModal}>
          <TouchableWithoutFeedback onPress={hideModal}>
            <View style={styles.modalBackground}>
              <TouchableWithoutFeedback>
                <View style={styles.modalView}>
                  <GText text={'Enter Folder Information'} />
                  <TextInput
                    label="Folder Name"
                    mode="flat"
                    value={folderName}
                    onChangeText={value => setFolderName(value)}
                    style={styles.input2}
                  />
                  <TextInput
                    label="Folder Subject"
                    mode="flat"
                    value={folderSubject}
                    onChangeText={value => setFolderSubject(value)}
                    style={styles.input2}
                  />
                  <Button
                    style={{right: 8, position: 'absolute', bottom: 12}}
                    onPress={createFolder}>
                    OK
                  </Button>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    );
  };

  const listEmpty = useCallback(() => {
    return (
      <View style={styles.emptyList}>
        <GText text={"We couldn't find the folder."} style={styles.emptyText} />
        <Image
          source={require('../assets/icons/empty-box.png')}
          style={styles.image}
        />
        <GText
          text={'Create First Folder'}
          style={{
            ...styles.emptyText,
            textDecorationLine: 'underline',
            color: colors.primary,
          }}
          onPress={showModal}
        />
      </View>
    );
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{padding: 6}}
          activeOpacity={0.8}
          onPress={createFolder}>
          <Plus stroke={colors.secondary} />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <View style={styles.safe}>
      <FlatList
        data={folders}
        renderItem={renderItem}
        ListEmptyComponent={listEmpty}
        contentContainerStyle={styles.list}
      />
      <CreateModal />
    </View>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {flexGrow: 1, paddingTop: 12, gap: 12},
  emptyList: {
    width: width,
    height: height * 0.7,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
    paddingTop: height * 0.2,
  },
  image: {
    resizeMode: 'contain',
    opacity: 0.5,
    width: width * 0.5,
    height: width * 0.5,
    position: 'absolute',
    zIndex: -1,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
  },
  input: {
    backgroundColor: colors.background,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalView: {
    backgroundColor: colors.background,
    padding: 20,
    width: width * 0.9,
    height: height * 0.35,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 10,
    gap: 12,
  },
  input2: {
    width: '100%',
    marginVertical: 10,
    backgroundColor: colors.background,
  },
  folderContainer: {
    backgroundColor: colors.secondary,
    padding: 8,
    borderRadius: 4,
    marginHorizontal: 8,
    borderLeftWidth: 4,
    gap: 8,
  },
  nameText: {
    fontSize: 16,
    fontWeight: '600',
  },
  subjectText: {},
});
export default Folders;
