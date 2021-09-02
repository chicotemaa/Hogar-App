import React from 'react';
import { View } from 'react-native';
import { ButtonWithSubtitle } from '../Button';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { styles } from '~/theme/appTheme';
import { RootStackParams } from '~/navigator/StackNavigator';

export const HogarOptions = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const handleSolicitud = () => {};

  const handleNewOt = () => {
    navigation.navigate('NewOTScreen');
  };

  const handleListadoOt = () => {
    navigation.navigate('ListadoOTScreen');
  };

  const colorBtn = '#183A9E';

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
          backgroundColor: '#C7C7C7',
        },
      ]}>
      <View style={{ marginBottom: 15 }}>
        <ButtonWithSubtitle
          title={'Ver solicitudes'}
          color={colorBtn}
          height={70}
          width={270}
          subtitle={'Ver solicitudes realizadas por clientes'}
          onPress={handleSolicitud}
        />
        <ButtonWithSubtitle
          title={'Crear Orden de Trabajo'}
          color={colorBtn}
          height={70}
          width={270}
          subtitle={'Crea una nueva orden de trabajo'}
          onPress={handleNewOt}
        />
        <ButtonWithSubtitle
          title={'Ver ordenes de trabajo'}
          color={colorBtn}
          height={70}
          width={270}
          subtitle={'Acceder al listado de ordenes de trabajos'}
          onPress={handleListadoOt}
        />
      </View>
    </View>
  );
};
