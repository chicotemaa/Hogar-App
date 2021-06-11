import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface Props {
  id: string;
  titulo: string;
  location: string;
  date: string;
  estado: string;
  goToScreen: Function;
}

export const ItemOT = ({
  id,
  titulo,
  location,
  date,
  estado,
  goToScreen,
}: Props) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 10,
          marginVertical: 5,
        }}>
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.number}>#{id}</Text>
            <Estado estado={estado} />
          </View>
          <Text style={styles.title}>{titulo}</Text>
          <View style={styles.divisor} />
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.tecnico}>Técnico:</Text>
                <Text
                  style={[
                    styles.tecnico,
                    {paddingHorizontal: 5, textAlign: 'auto'},
                  ]}>
                  Martin Sastre
                </Text>
              </View>
              <View>
                {/* TODO: Si se llega a solicitar información del técnico
                <TouchableOpacity>
                  <Text style={[styles.tecnico, {color: '#3B58A5'}]}>
                    Ver info
                  </Text>
                </TouchableOpacity> */}
              </View>
            </View>
            <View style={styles.divisor} />
            <View>
              <Text style={styles.info}>{location}</Text>
              <Text style={styles.info}>{date}</Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{padding: 10, alignSelf: 'center', margin: 2, width: '100%'}}>
        <View style={[styles.divisor]} />
        <DetalleBtn estado={estado} goToScreen={goToScreen} />
      </View>
    </View>
  );
};

function formatDate(date: string) {
  return date.split('T', 1);
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 4,
    marginHorizontal: 8,
    marginVertical: 10,
    elevation: 6,
  },
  number: {
    fontSize: 23,
    color: '#3D3D3D',
    marginBottom: 15,
  },
  title: {
    marginTop: 3,
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 19,
  },
  tecnico: {
    marginTop: 3,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#474747',
    fontSize: 18,
  },
  divisor: {
    height: 1,
    width: '100%',
    backgroundColor: '#CCCCCC',
    marginBottom: 5,
  },
  info: {
    marginVertical: 3,
    color: 'grey',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

interface PropEstado {
  estado: string;
}

const Estado = ({estado}: PropEstado) => {
  const colores = {
    Pendiente: 'red',
    'Estoy en camino': '#AF8308',
    'Me recibió': 'blue',
    'No me atendió': 'brown',
    Finalizado: 'green',
    'No me recibió': 'purple',
  };
  return (
    <Text
      style={{
        fontSize: 21,
        fontWeight: 'bold',
        color: colores[estado],
        textAlign: 'right',
      }}>
      {estado}
    </Text>
  );
};

interface PropBtn {
  estado: string;
  goToScreen: Function;
}
const DetalleBtn = ({estado, goToScreen}: PropBtn) => {
  const colorBtn = estado == 'Finalizado' ? 'green' : '#5E5E5E';
  return (
    <View style={{marginVertical: 5}}>
      <TouchableOpacity
        disabled={estado != 'Finalizado'}
        onPress={() => {
          goToScreen();
        }}>
        <Text
          style={{
            borderColor: colorBtn,
            color: colorBtn,
            fontSize: 20,
            fontWeight: 'bold',
            alignSelf: 'center',
          }}>
          {estado === 'Finalizado'
            ? 'Ver detalle'
            : 'Detalle aún no disponible'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
