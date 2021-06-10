import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';

import LottieView from 'lottie-react-native';
import {Button} from '../components/Button';

const errorAnimation = require('../assets/lottie/error');
const successAnimation = require('../assets/lottie/success');

export const SuccessScreen = ({navigation}) => {
  const [success, setSuccess] = useState(false);
  const seconds = 4;
  const [text, setText] = useState('Ir');

  function handlePress() {
    setSuccess(!success);

    // setTimeout(() => {
    //   navigation.navigate('LoginScreen');
    // }, seconds * 1000);
  }

  useEffect(() => {}, [success]);

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 2}}>
        <Text>
          {success ? 'Solicitud Creada Exitosamente' : 'Solicitud no creada'}
        </Text>
      </View>
      <View style={{flex: 5}}>{lottieAnimation(success)}</View>
      <View style={{flex: 2}}>
        <Text>{message(success)}</Text>
      </View>
      <View style={{flex: 1}}>
        <Button
          title={text}
          width="50%"
          color={'green'}
          onPress={handlePress}
        />
      </View>
    </View>
  );
};

const message = (success: boolean) => {
  return success
    ? `Su solicitud fue creada exitosamente`
    : `Su solicitud no pudo ser generada`;
};

const lottieAnimation = (success: boolean) => {
  return (
    <LottieView
      source={success ? successAnimation : errorAnimation}
      loop={false}
      autoPlay
    />
  );
};
