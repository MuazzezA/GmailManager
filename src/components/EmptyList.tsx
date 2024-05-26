import React from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import GText from './GText.tsx';
import {colors} from '../constants/Theme.ts';
const {width, height} = Dimensions.get('window');

export const EmptyList = ({showModal}: {showModal: () => void}) => {
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
};
const styles = StyleSheet.create({
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
});
