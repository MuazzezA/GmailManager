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
import Trash from '../assets/icons/trash.svg';

interface MailBoxProps {
  mail: MailType;
  onPress: () => void;
  index?: number;
  isDeleteActive?: boolean;
  deleteMailAction?: () => void;
}

export const MailContainer = (props: MailBoxProps) => {
  const {mail, onPress} = props;
  const subject = getEmailSubject(mail);
  const sender = getEmailSender(mail);
  return (
    <TouchableOpacity
      activeOpacity={0.8}
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
            size={18}
            weight={'700'}
          />
          <GText
            size={14}
            weight={'400'}
            numberOfLines={1}
            text={he.decode(subject ?? '')}
          />
          <GText
            numberOfLines={2}
            size={14}
            weight={'300'}
            text={he.decode(mail.snippet ?? '')}
            style={styles.snippetText}
          />
        </View>
      )}
      {props?.isDeleteActive && (
        <TouchableOpacity
          style={styles.deleteIcon}
          activeOpacity={0.8}
          onPress={() => props.deleteMailAction?.()}>
          <Trash width="24" height="24" />
        </TouchableOpacity>
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
    marginTop: 8,
    textAlignVertical: 'top',
    textAlign: 'left',
  },
  deleteIcon: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 8,
  },
});
