import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {styles} from '../theme/appTheme';
import {ItemHistorial} from '../components/ItemHistorial';
import {ScrollView} from 'react-native-gesture-handler';
import {getSolicitudesAPI} from '../api/apiClientes';
import {RootStackParams} from '../navigator/StackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import {windowWidth, windowHeight} from '../../App';

interface Props
  extends StackScreenProps<RootStackParams, 'HistorialSolicitudesScreen'> {}

export const HistorialSolicitudesScreen = ({navigation, route}: Props) => {
  //TODO:  Obtener de la API los elementos y renderizar con un map todos los items
  const {access_token} = route.params;
  const empty = (
    <View>
      <Text style={stylesHistorial.message}>No hay solicitudes</Text>
    </View>
  );
  const [Items, setItems] = useState(empty);

  useEffect(() => {
    mostrarSolicitudes();
  }, []);

  const mostrarSolicitudes = async () => {
    getSolicitudesAPI(access_token)
      .then(array => {
        setItems(getItems(array));
      })
      .catch(() => {
        setItems(empty);
      });

    function getItems(array) {
      if (array.length === 0) {
        console.log('aca entra');
        return empty;
      } else {
        return array.map((element: Solicitud) => {
          return (
            <ItemHistorial
              key={element.number.toString()}
              date={element.date}
              location={element.location}
              number={element.number}
              title={element.title}
              estado={element.estado}
            />
          );
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 1, marginVertical: 6, paddingVertical: 1}}>
        <Text style={stylesHistorial.title}> Historial{'\n'} Solicitudes</Text>
      </View>
      <View style={stylesHistorial.containerItems}>
        <ScrollView>{Items}</ScrollView>
      </View>
    </View>
  );
};

const stylesHistorial = StyleSheet.create({
  containerItems: {
    flex: 3,
    height: 0.2 * windowHeight,
    flexDirection: 'column-reverse',
    marginHorizontal: 15,
    marginBottom: 40,
    padding: 4,
  },
  title: {
    fontSize: 0.11 * windowWidth,
    fontWeight: '900',
    alignSelf: 'center',
    textAlign: 'center',
    textShadowColor: '#000000',
    textShadowRadius: 0,
  },
  message: {
    fontSize: 30,
    marginVertical: 200,
    textAlign: 'center',
    fontWeight: '500',
  },
});

interface Solicitud {
  title: string;
  number: string;
  estado: 'Pendiente' | 'En Revisión';
  date: string;
  location: string;
}
