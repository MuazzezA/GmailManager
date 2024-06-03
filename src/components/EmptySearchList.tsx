import GText from './GText.tsx';
import {colors} from '../constants/Theme.ts';
import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

export const EmptySearchList = ({
  cancelSearchAction,
}: {
  cancelSearchAction: () => void;
}) => {
  return (
    <TouchableOpacity
      style={styles.warnTextContainer}
      onPress={cancelSearchAction}
      activeOpacity={0.7}>
      <GText
        text={
          "Sorry, we couldn't find the result you wanted. You can cancel by clicking here."
        }
        color={colors.background}
        weight={'600'}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  warnTextContainer: {
    padding: 12,
    margin: 8,
    marginTop: 32,
    backgroundColor: colors.text,
    borderRadius: 8,
  },
});
