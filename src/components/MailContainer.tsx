import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {colors} from '../constants/Theme.ts';
import GText from './GText.tsx';
import he from 'he';
import {getEmailSubject} from '../helpers/getEmailSubject.ts';
import {MailType} from '../types/MailType.ts';
import {getEmailSender} from '../helpers/getEmailSender.ts';

interface MailBoxProps {
  mail: MailType;
  onPress: () => void;
  index?: number;
}

export const MailContainer = (props: MailBoxProps) => {
  const {mail, onPress} = props;
  const subject = getEmailSubject(mail);
  const sender = getEmailSender(mail);
  return (
    <TouchableOpacity
      style={styles.mailBox}
      key={`mail-${mail.id}${mail.threadId}`}
      onPress={onPress}>
      {!mail ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.box}>
          <GText
            numberOfLines={1}
            text={he.decode(sender)}
            size={16}
            weight={'700'}
          />
          <GText numberOfLines={1} text={he.decode(subject?.value ?? '')} />
          <GText
            numberOfLines={2}
            size={12}
            weight={'300'}
            text={he.decode(mail.snippet ?? '')}
            style={styles.snippetText}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mailBox: {
    backgroundColor: colors.secondary,
    marginVertical: 6,
    padding: 8,
    borderRadius: 8,
  },
  box: {
    gap: 4,
  },
  snippetText: {
    marginTop: 16,
    textAlignVertical: 'top',
    textAlign: 'left',
  },
});
