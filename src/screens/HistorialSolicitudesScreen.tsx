import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {styles} from '../theme/appTheme';
import {ItemHistorial} from '../components/ItemHistorial';
import {ScrollView} from 'react-native-gesture-handler';
import {getSolicitudesAPI} from '../api/apiClientes';
import {RootStackParams} from '../navigator/StackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import {windowWidth, windowHeight} from '../../App';
import {getData} from '../api/api';
import {Header} from '../components/Header';

interface Props
  extends StackScreenProps<RootStackParams, 'HistorialSolicitudesScreen'> {}

interface Solicitud {
  title: string;
  number: string;
  estado: 'Pendiente' | 'Generada OT' | 'Derivada';
  date: string;
  location: string;
}

export const HistorialSolicitudesScreen = ({navigation}: Props) => {
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
    getData('access_token').then((token: string) => {
      getSolicitudesAPI(token)
        .then(array => {
          setItems(getItems(array));
        })
        .catch(() => {
          setItems(empty);
        });

      function getItems(array) {
        if (array.length === 0) {
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
                estado={getEstado(element.estado)}
                navigation={navigation}
              />
            );
          });
        }
      }
    });
  };

  return (
    <>
      <Header pageName={'Solicitudes'} />
      <View style={[styles.container, {flex: 9}]}>
        <View style={stylesHistorial.containerItems}>
          <ScrollView>{Items}</ScrollView>
        </View>
      </View>
    </>
  );
};

const stylesHistorial = StyleSheet.create({
  containerItems: {
    flex: 3.9,
    flexDirection: 'column-reverse',
    marginHorizontal: 1,
    marginBottom: 10,    
  },  
  message: {
    fontSize: 30,
    marginVertical: 200,
    textAlign: 'center',
    fontWeight: '500',
  },
});

function getEstado(estado: number): 'Pendiente' | 'Generada OT' | 'Derivada' {
  switch (estado) {
    case 0:
      return 'Pendiente';
    case 1:
      return 'Generada OT';
    default:
      return 'Derivada';
  }
}
