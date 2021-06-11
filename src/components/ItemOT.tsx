import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface Props {
  id: string;
  titulo: string;
  location: string;
  date: string;
  goToScreen: Function;
}

export const ItemOT = ({id, titulo, location, date, goToScreen}: Props) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 10,
          marginVertical: 5,
        }}>
        <View>
          <Text style={styles.number}>{id}</Text>
          <Text style={styles.title}>{titulo}</Text>
          <Text style={styles.info}>{location}</Text>
          <Text style={styles.info}>{date}</Text>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
          }}>
          <Estado estado={'No me recibió'} />
          <DetalleBtn goToScreen={goToScreen} />
        </View>
      </View>
    </View>
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
    marginTop: 3,
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 19,
  },
  info: {
    marginTop: 1,
    color: 'grey',
    fontWeight: '600',
    fontSize: 15,
  },
});

interface PropEstado {
  estado: string;
}

const Estado = ({estado}: PropEstado) => {
  const colores = {
    Pendiente: 'red',
    'Estoy en camino': 'yellow',
    'Me recibió': 'blue',
    'No me atendió': 'brown',
    Finalizado: 'green',
    'No me recibió': 'purple',
  };
  return <Text style={{fontSize: 21, color: colores[estado]}}>{estado}</Text>;
};

interface PropBtn {
  goToScreen: Function;
}
const DetalleBtn = ({goToScreen}: PropBtn) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          goToScreen();
        }}>
        <Text
          style={{
            color: '#EC5342',
            fontSize: 21,
            fontWeight: 'bold',
            alignSelf: 'flex-end',
          }}>
          Ver detalle
        </Text>
      </TouchableOpacity>
    </View>
  );
};
