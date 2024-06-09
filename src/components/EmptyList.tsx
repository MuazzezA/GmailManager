import React from 'react';
import {Dimensions, Image, StyleSheet, View, ViewStyle} from 'react-native';
import GText from './GText.tsx';
import {colors} from '../constants/Theme.ts';
import {BannerAds} from './BannerAds.tsx';
const {width, height} = Dimensions.get('window');

export const EmptyList = ({
  showModal,
  style,
}: {
  showModal: () => void;
  style?: ViewStyle;
}) => {
  return (
    <View style={{...styles.emptyList, ...style}}>
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
      <BannerAds />
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
    marginBottom: 32,
  },
});
