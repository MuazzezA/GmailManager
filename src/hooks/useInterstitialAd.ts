import {
  AdEventType,
  InterstitialAd,
  TestIds,
} from 'react-native-google-mobile-ads';
import {useEffect, useState, useCallback} from 'react';

const useInterstitialAd = (adId?: string) => {
  const adUnitId = __DEV__
    ? TestIds.ADAPTIVE_BANNER
    : adId ?? 'ca-app-pub-8452076246715539/1112548645';

  const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    keywords: ['tools', 'manager'],
  });

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setLoaded(true);
      },
    );
    interstitial.load();
    return () => unsubscribe();
  }, [interstitial]);

  const showAd = useCallback(() => {
    if (loaded) {
      interstitial
        .show()
        .then()
        .catch()
        .finally(() => {
          setLoaded(false);
        });
    }
  }, [loaded, interstitial]);

  return {loaded, showAd};
};

export default useInterstitialAd;
