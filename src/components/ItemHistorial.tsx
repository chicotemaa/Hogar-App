import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import {Detalle} from './Historial/Detalle';
import {Estado} from './Historial/Estado';

interface Props {
  number: string;
  title: string;
  location: string;
  date: string;
  estado: 'Pendiente' | 'En Revisión';
}

export const ItemHistorial = ({
  number,
  title,
  location,
  date,
  estado,
}: Props) => {
  formatDate(date);
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
          <Text style={styles.number}>#{number}</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.info}>{location}</Text>
          <Text style={styles.info}>{formatDate(date)}</Text>
        </View>
        <View style={{justifyContent: 'space-between', marginRight: 7}}>
          <Estado estado={estado} />
          <Detalle />
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
