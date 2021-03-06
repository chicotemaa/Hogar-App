import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Title } from '~/components/Title';
import { Button } from '~/components/Button';
import { styles } from '~/theme/appTheme';

export const WelcomeOptions = ({ navigation }) => {
  const handleSolicitud = () => {
    navigation.navigate('FormSolicitudScreen');
  };
  return (
    <View
      style={[
        styles.container,
        {
          flex: 2,
          borderTopWidth: 10,
          borderTopColor: 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        },
      ]}>
      <View style={{ marginBottom: 15 }}>
        <Button
          title={'Solicitar asistencia'}
          color="#183A9E"
          height={70}
          width={270}
          onPress={handleSolicitud}
        />
        <View style={stylesWelcome.aclaraciĆ³nContainer}>
          <Title color="#343030" text={'Crear una nueva solicitud'} size={14} />
        </View>

        <Button
          title={'Ver mis solicitudes'}
          color="#183A9E"
          height={70}
          width={270}
          onPress={() => navigation.navigate('HistorialSolicitudesScreen')}
        />
        <View style={stylesWelcome.aclaraciĆ³nContainer}>
          <Title
            color="#343030"
            text={'Ver un historial de solicitudes previas'}
            size={14}
          />
        </View>
        <Button
          title={'Ver ordenes de trabajo'}
          color="#183A9E"
          height={70}
          width={270}
          onPress={() => navigation.navigate('ListadoOTScreen')}
        />
        <View style={stylesWelcome.aclaraciĆ³nContainer}>
          <Title
            color="#343030"
            text={'Ver ordenes de trabajo de sus solicitudes'}
            size={14}
          />
        </View>
      </View>
    </View>
  );
};

const stylesWelcome = StyleSheet.create({
  menuContainer: {
    margin: 5,
  },
  menu: {
    height: 30,
    backgroundColor: '#473E3E',
    alignSelf: 'flex-end',
    margin: 10,
    borderColor: 'blue',
    borderWidth: 2,
  },
  header: {
    flex: 2,
    margin: 10,
    padding: 3,
    alignItems: 'center',
  },
  aclaraciĆ³nContainer: {
    margin: 10,
  },
});
