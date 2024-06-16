import {BannerAds} from './BannerAds.tsx';
import ads from '../constants/Ads.ts';
import {MailContainer} from './MailContainer.tsx';
import {ScreenName} from '../navigation/ScreenName.ts';
import React from 'react';
import {MailType} from '../types/MailType.ts';
import {useNavigation} from '@react-navigation/native';

export const MailItem = ({item, index}: {item: MailType; index: number}) => {
  const navigation = useNavigation();
  return (
    <>
      {index % 9 === 0 && (
        <BannerAds style={{marginBottom: 12}} adId={ads.HOME_BANNER} />
      )}
      <MailContainer
        key={`mail-${item.id}`}
        mail={item}
        onPress={() => navigation.navigate(ScreenName.DETAIL, {mail: item})}
      />
    </>
  );
};
