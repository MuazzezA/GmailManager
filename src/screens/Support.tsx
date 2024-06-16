import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, TextInput, Alert} from 'react-native';
import GText from '../components/GText.tsx';
import {ScrollView} from 'react-native-gesture-handler';
import {colors} from '../constants/Theme.ts';
import Mailer from 'react-native-mail';

const Support = () => {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');

  const handleEmail = () => {
    Mailer.mail(
      {
        subject: text,
        recipients: ['mailmngrteam90tr@gmail.com'],
        ccRecipients: [],
        bccRecipients: [],
        body: text,
        isHTML: false,
      },
      (error, event) => {
        Alert.alert(
          error,
          event,
          [
            {
              text: 'Ok',
              onPress: () => console.log('OK: Email Error Response'),
            },
            {
              text: 'Cancel',
              onPress: () => console.log('CANCEL: Email Error Response'),
            },
          ],
          {cancelable: true},
        );
      },
    );
  };
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <GText
        size={14}
        text={
          'You can contact us for your comments, suggestions and complaints.' +
          'If you are reporting an error, please describe the error in stages.'
        }
        weight={'500'}
        color={colors.text}
        style={{
          padding: 12,
        }}
      />
      <TextInput
        numberOfLines={2}
        maxLength={75}
        underlineColorAndroid="transparent"
        placeholder={'Title...'}
        style={styles.input}
        onChangeText={val => setTitle(val)}
        value={title}
      />
      <TextInput
        multiline={true}
        numberOfLines={10}
        maxLength={250}
        placeholder={'Description...'}
        underlineColorAndroid="transparent"
        style={styles.textArea}
        onChangeText={val => setText(val)}
        value={text}
      />

      <TouchableOpacity
        onPress={() => handleEmail()}
        style={styles.button}
        activeOpacity={0.8}>
        <GText text={'Send'} size={16} style={styles.text} color={'white'} />
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
  screen: {
    flex: 1,
  },
  text: {
    fontFamily: 'Quicksand-Bold',
  },
  button: {
    margin: 8,
    padding: 12,
    backgroundColor: colors.text,
    borderRadius: 8,
  },
  input: {
    height: 42,
    backgroundColor: colors.secondary,
    margin: 12,
    padding: 12,
    borderRadius: 8,
  },
  textArea: {
    margin: 12,
    backgroundColor: colors.secondary,
    height: 150,
    alignItems: 'flex-start',
    textAlignVertical: 'top',
    padding: 12,
    paddingTop: 12,
    borderRadius: 8,
  },
});
export default Support;
