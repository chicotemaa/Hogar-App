import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { RootStackParams } from '~/navigator/StackNavigator';
import { DetalleButton } from './Historial/DetalleButton';
import { Estado } from './Historial/Estado';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { getSucursalCliente } from '~/api/apiClientes';
import { TransitionView } from './TransitionView';
import { Solicitudes, SucursalDeClienteApiPath } from '~/api/types';

interface Props {
  index: number;
  solicitud: Solicitudes;
  navigation: StackNavigationProp<
    RootStackParams,
    'HistorialSolicitudesScreen'
  >;
}

export const ItemHistorial = ({ index, solicitud, navigation }: Props) => {
  const [street, setStreet] = useState('');

  useEffect(() => {
    getStreetSucursal(solicitud.SucursalDeCliente);
  }, [solicitud.SucursalDeCliente]);

  async function getStreetSucursal(sucursalName: SucursalDeClienteApiPath) {
    const sucursal = await getSucursalCliente(sucursalName);
    setStreet(sucursal.direccion);
  }

  return (
    <TransitionView index={index}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 10,
          marginVertical: 5,
        }}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              paddingVertical: 10,
              borderBottomWidth: 1,
              flex: 1,
              borderColor: '#D1D1D1',
            }}>
            <Text style={styles.number}>#{solicitud.id}</Text>
          </View>
          <Text style={styles.title}>{solicitud.necesitasAyuda}</Text>

          <View style={{ flexDirection: 'row', marginBottom: 20 }}>
            <Icon
              size={20}
              name="map-marker-alt"
              color="red"
              style={{ marginRight: 11 }}
            />
            <Text style={[styles.info, { width: '135%' }]}>{street}</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Icon
              size={18}
              name="calendar-alt"
              color="skyblue"
              style={{ marginRight: 10 }}
            />
            <Text style={[styles.info, { textAlignVertical: 'top' }]}>
              {formatDate(solicitud.createdAt)}
            </Text>
          </View>
        </View>
        <View
          style={{ flex: 1, justifyContent: 'space-between', marginRight: 5 }}>
          <View
            style={{
              paddingVertical: 10,
              borderBottomWidth: 1,
              borderColor: '#D1D1D1',
            }}>
            <Estado estado={solicitud.estado} />
          </View>
          <DetalleButton
            codigo={solicitud.id.toString()}
            navigation={navigation}
          />
        </View>
      </View>
    </TransitionView>
  );
};

function formatDate(date: string) {
  return date.split('T', 1);
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 4,
    marginHorizontal: 8,
    marginVertical: 10,
    elevation: 6,
  },
  number: {
    fontSize: 23,
    color: 'grey',
    marginBottom: 3,
  },
  title: {
    width: '200%',
    marginVertical: 11,
    fontWeight: '700',
    fontSize: 17,
    color: '#383838',
  },
  info: {
    alignContent: 'center',
    marginTop: 1,
    color: 'grey',
    fontWeight: '600',
    fontSize: 15,
    textAlignVertical: 'top',
  },
});
