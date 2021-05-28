import React from 'react';
import {Text} from 'react-native-elements';

interface Props {
  text: string;
  color: string;
  size: number;
}

export const Title = ({text, color, size}: Props) => {
  return (
    <Text style={{color, fontSize: size, textAlign: 'center'}}>{text}</Text>
  );
};
