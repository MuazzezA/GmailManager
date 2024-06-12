import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import GText from '../components/GText.tsx';
import {ScrollView} from 'react-native-gesture-handler';
import {colors} from '../constants/Theme.ts';
import {TextInput} from 'react-native-paper';

const Support = () => {
  const [text, setText] = useState('');

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
        style={{
          height: 38,
          textAlignVertical: 'top',
          backgroundColor: colors.secondary,
        }}
        onChangeText={val => setText(val)}
        value={text}
      />
      <TextInput
        multiline={true}
        numberOfLines={10}
        maxLength={250}
        underlineColorAndroid="transparent"
        style={{
          height: 200,
          textAlignVertical: 'top',
          backgroundColor: colors.secondary,
        }}
        onChangeText={val => setText(val)}
        value={text}
      />

      <TouchableOpacity
        onPress={() => {}}
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
});
export default Support;
