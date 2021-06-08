import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from '../components/Button';
import {Header} from '../components/Header';
import {styles as styleGlobal} from '../theme/appTheme';
import {getAllServiciosAPI} from '../api/api';
import {RootStackParams} from '../navigator/StackNavigator';
import {StackScreenProps} from '@react-navigation/stack';

interface Props extends StackScreenProps<RootStackParams, any> {}

interface Servicio {
  ['id']: string;
  descripcion: string;
  titulo: string;
}

export const CrearSolicitudScreen = ({navigation}: Props) => {
  const [servicios, setServicios] = useState([]);
  //TODO: Cambiar empty array por elemento texto que indique cargando
  useEffect(() => {
    getAllServiciosAPI().then(arrayServicios => {
      setServicios(arrayServicios);
    });
  }, []);

  const handlePress = (tipoServicio: String) => {
    console.log('es de tipo:', tipoServicio);
    navigation.navigate('FormSolicitudScreen', {tipoServicio});
  };

  return (
    <>
      <Header pageName={'Crear Solicitud'} />
      <View
        style={[
          styleGlobal.container,
          {flex: 4, justifyContent: 'space-evenly', alignItems: 'center'},
        ]}>
        <View>
          <View>
            <Text style={styleSolicitud.header}>
              De que tipo es su Solicitud?
            </Text>
          </View>
          {servicios.map((servicio: Servicio) => {
            const servicioKey: string = servicio['@id'];
            return (
              <Button
                width={300}
                key={servicioKey}
                title={servicio.titulo}
                color={'#C44433'}
                onPress={() => {
                  console.log(handlePress(servicioKey));
                }}
              />
            );
          })}
        </View>
      </View>
    </>
  );
};

const styleSolicitud = StyleSheet.create({
  header: {
    fontSize: 30,
  },
});
