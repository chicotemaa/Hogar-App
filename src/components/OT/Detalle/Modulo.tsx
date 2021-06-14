import React from 'react';
import {Text, View} from 'react-native';

export const Modulo = () => {
  return (
    <View>
      <Subtitulo />
      <Divisor />
      <Campo />
      <Divisor />
    </View>
  );
};

const Subtitulo = () => {
  return (
    <View>
      <Text style={{fontSize: 20, paddingVertical: 10}}>Subtitulo</Text>
    </View>
  );
};

const Divisor = () => {
  return <View style={{borderWidth: 1, borderColor: '#DFDFDF', flex: 1}} />;
};

const Campo = () => {
  const textStyle = {fontSize: 15, flex: 1, paddingVertical: 10};
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text style={textStyle}>Campo</Text>
      <Text style={[textStyle, {textAlign: 'center'}]}>Si</Text>
    </View>
  );
};
