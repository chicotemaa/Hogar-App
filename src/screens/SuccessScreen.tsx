import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { styles } from '~/theme/appTheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParams } from '~/navigator/StackNavigator';

const errorAnimation = require('~/assets/lottie/error');
const successAnimation = require('~/assets/lottie/success');

interface Props extends StackScreenProps<RootStackParams, 'SuccessScreen'> {}

export const SuccessScreen = ({ navigation, route }: Props) => {
  const success = route.params?.success || false;
  const isOt = route.params?.isOT || false;

  useEffect(() => {
    setTimeout(() => {
      success ? navigation.navigate('WelcomeScreen') : navigation.goBack();
    }, 3000);
  }, [navigation, success]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Title success={success} isOt={isOt} />
        <View style={{ flex: 5 }}>{lottieAnimation(success)}</View>
        <View style={{ flex: 2 }}>
          <Text style={styles.subtitulo}>{message(success, isOt)}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const Title = ({ success, isOt }: { success: boolean; isOt?: boolean }) => {
  const successSolicitudText = `Solicitud${'\n'}Creada`;
  const successOTText = `Finalizado!${'\n'}`;
  const errorSolicitudText = 'Error al enviar la información';

  return (
    <View style={{ marginTop: 15, flex: 2 }}>
      <Text
        style={[
          styles.title,
          { textAlign: 'center', justifyContent: 'center', width: '60%' },
        ]}>
        {success
          ? isOt
            ? successOTText
            : successSolicitudText
          : errorSolicitudText}
      </Text>
    </View>
  );
};

const message = (success: boolean, isOt: boolean) => {
  if (isOt) {
    return success
      ? 'Información enviada correctamente.'
      : 'Existió un error al enviar la información de la orden de trabajo.';
  }
  return success
    ? 'Su solicitud será procesada en la brevedad'
    : 'Su solicitud no pudo ser generada';
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
