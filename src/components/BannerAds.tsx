import {
  BannerAd,
  BannerAdSize,
  TestIds,
  useForeground,
} from 'react-native-google-mobile-ads';
import {Platform, View, ViewStyle} from 'react-native';
import React, {useRef, useState} from 'react';
import {DEFAULT_BANNER} from '@env';
export const BannerAds = ({
  adId,
  style,
}: {
  adId?: string;
  style?: ViewStyle;
}) => {
  const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : adId ?? DEFAULT_BANNER;

  const bannerRef = useRef<BannerAd>(null);

  useForeground(() => {
    Platform.OS === 'ios' && bannerRef.current?.load();
  });
  const [isFail, setIsFail] = useState(false);

  if (isFail) {
    return <></>;
  }

  return (
    <View style={style}>
      <BannerAd
        onAdFailedToLoad={() => setIsFail(true)}
        ref={bannerRef}
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      />
    </View>
  );
};
