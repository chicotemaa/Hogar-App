import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import LottieView from 'lottie-react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {styles} from '../theme/appTheme';

const errorAnimation = require('../assets/lottie/error');
const successAnimation = require('../assets/lottie/success');

interface Props extends StackScreenProps<any, any> {}

export const SuccessScreen = ({navigation, route}: Props) => {
  const [success, setSuccess] = useState(true);
  const [animation, setAnimation] = useState(null);

  useEffect(() => {
    setSuccess(route.params.success);
    goToWelcomeScreen();
  }, []);

  const goToWelcomeScreen = async () => {
    setTimeout(() => {
      navigation.navigate('WelcomeScreen');
    }, 5000);
  };

  return (
    <View style={{flex: 1}}>
      <View style={{marginTop: 15, flex: 2}}>
        <Text
          style={[
            styles.title,
            {textAlign: 'center', justifyContent: 'center', width: '70%'},
          ]}>
          {success ? `Solicitud${'\n'}Creada` : 'Error al crear solicitud'}
        </Text>
      </View>
      <View style={{flex: 5}}>{lottieAnimation(success)}</View>
      <View style={{flex: 2}}>
        <Text style={styles.subtitulo}>{message(success)}</Text>
      </View>
    </View>
  );
};

const message = (success: boolean) => {
  return success
    ? `Su solicitud será procesada en la brevedad`
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
