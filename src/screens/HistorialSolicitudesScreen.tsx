import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {styles} from '../theme/appTheme';
import {ItemHistorial} from '../components/ItemHistorial';
import {ScrollView} from 'react-native-gesture-handler';
import {getSolicitudesAPI} from '../api/apiClientes';
import {RootStackParams} from '../navigator/StackNavigator';
import {StackScreenProps} from '@react-navigation/stack';

interface Props
  extends StackScreenProps<RootStackParams, 'HistorialSolicitudesScreen'> {}

export const HistorialSolicitudesScreen = ({navigation, route}: Props) => {
  //TODO:  Obtener de la API los elementos y renderizar con un map todos los items
  const {access_token} = route.params;
  const empty = (
    <View>
      <Text>No hay solicitudes</Text>
    </View>
  );
  const [Items, setItems] = useState(empty);

  useEffect(() => {
    mostrarSolicitudes();
  }, []);

  const mostrarSolicitudes = async () => {
    getSolicitudesAPI(access_token).then(array => {
      setItems(getItems(array));
    });

    function getItems(array) {
      return array.map(element => {
        return (
          <ItemHistorial
            date={element.date}
            location={element.location}
            number={element.number}
            title={element.title}
            estado={element.estado}
          />
        );
      });
    }

    {
      /* <ItemHistorial
            date={element.date}
            location={element.location}
            number={element.number}
            title={element.title}
            estado={element.estado}
          /> */
    }

    return (
      <View>
        <Text>hola</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 1, marginVertical: 6}}>
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
    flex: 5,
    flexDirection: 'column-reverse',
    marginHorizontal: 15,
    marginBottom: 40,
    padding: 4,
  },
  title: {
    fontSize: 45,
    fontWeight: '900',
    alignSelf: 'center',
    textAlign: 'center',
  },
  message: {
    fontSize: 30,
    marginVertical: 200,
    textAlign: 'center',
  },
});

interface ArraySolicitudes {
  title: string;
  number: string;
  estado: 'Pendiente' | 'En Revisión';
  date: string;
  location: string;
}
