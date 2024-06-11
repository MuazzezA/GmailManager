import React from 'react';
import {Text as RNText, TextProps, TextStyle} from 'react-native';
import {colors} from '../constants/Theme.ts';

type FontWeight =
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

interface GTextProps extends TextProps {
  text: string;
  color?: string;
  size?: number;
  weight?: FontWeight;
  style?: TextStyle;
}

const GText = (props: GTextProps) => {
  const {
    text,
    color = colors.text,
    weight = '400',
    size = 14,
    style,
    ...componentProps
  } = props;

  return (
    <RNText
      style={{
        color,
        fontSize: size,
        fontFamily:
          weight === 'bold' ? 'Quicksand-SemiBold' : 'Quicksand-Medium',
        fontWeight: weight,
        ...style,
      }}
      {...componentProps}>
      {text ?? ''}
    </RNText>
  );
};

export default GText;
