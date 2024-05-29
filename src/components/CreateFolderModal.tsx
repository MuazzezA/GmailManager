import {
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import GText from './GText.tsx';
import {Button, TextInput} from 'react-native-paper';
import React from 'react';
import {colors} from '../constants/Theme.ts';
const {width, height} = Dimensions.get('window');

export const CreateFolderModal = ({
  visible,
  hideModal,
  folderName,
  setFolderName,
  folderSubject,
  setFolderSubject,
  doneButtonPress,
}: {
  visible: boolean;
  hideModal: () => void;
  folderName: string;
  setFolderName: React.Dispatch<React.SetStateAction<string>>;
  folderSubject: string;
  setFolderSubject: React.Dispatch<React.SetStateAction<string>>;
  doneButtonPress: () => void;
}) => {
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
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.keyboardView}>
              <TouchableWithoutFeedback onPress={() => {}}>
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
                    onPress={() => doneButtonPress()}>
                    OK
                  </Button>
                </View>
              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
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
  keyboardView: {
    width: width * 0.9,
    alignSelf: 'center',
    height: height * 0.4,
    position: 'absolute',
  },
  input: {
    backgroundColor: colors.background,
  },
  input2: {
    width: '100%',
    marginVertical: 10,
    backgroundColor: colors.background,
  },
});
