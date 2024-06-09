import React, {useEffect, useMemo, useRef} from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {useAppStore} from '../store/store.ts';
import GText from './GText.tsx';
import {EmptyList} from './EmptyList.tsx';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../constants/Theme.ts';
const {height} = Dimensions.get('window');
const MODAL_HEIGHT = height / 2;
export const FolderListModal = ({
  visible,
  setModalVisible,
  saveToFolder,
  savedFolderId,
}: {
  visible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  saveToFolder: (folderId: number) => void;
  savedFolderId: number[];
}) => {
  const {folders} = useAppStore(state => ({
    folders: state.folders,
  }));

  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const savedList = useMemo(
    () => folders && folders?.map(f => savedFolderId.includes(f.id)),
    [folders?.length, savedFolderId],
  );

  return (
    <>
      <Animated.View
        style={[styles.modalBackground, {opacity: fadeAnim}]}></Animated.View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => setModalVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <FlatList
                  data={folders}
                  renderItem={({item, index}) => (
                    <TouchableOpacity
                      style={styles.item}
                      activeOpacity={0.7}
                      onPress={() => saveToFolder?.(item.id)}>
                      <View
                        style={[
                          styles.dot,
                          {
                            backgroundColor:
                              savedList && savedList[index]
                                ? colors.primary
                                : colors.background,
                            borderColor:
                              savedList && savedList[index]
                                ? colors.primary
                                : colors.text,
                          },
                        ]}
                      />
                      <GText style={styles.itemText} text={item.folderName} />
                    </TouchableOpacity>
                  )}
                  ListEmptyComponent={
                    <EmptyList
                      showModal={() => {
                        setModalVisible(false);
                        // @ts-ignore
                        navigation.navigate('folders');
                      }}
                      style={{
                        height: MODAL_HEIGHT * 0.6,
                      }}
                    />
                  }
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    height: MODAL_HEIGHT,
    backgroundColor: 'white',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingTop: 12,
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
    margin: 8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 12,
  },
  itemText: {
    fontSize: 18,
    lineHeight: 28,
  },
  dot: {
    height: 16,
    width: 16,
    borderRadius: 8,
    borderWidth: 2,
    marginTop: 4,
  },
});
