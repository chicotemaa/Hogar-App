import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import {RootStackParams} from '../navigator/StackNavigator';
import {DetalleButton} from './Historial/DetalleButton';
import {Estado} from './Historial/Estado';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface Props
  extends StackScreenProps<RootStackParams, 'HistorialSolicitudesScreen'> {
  number: string;
  title: string;
  location: string;
  date: string;
  estado: 'Pendiente' | 'Generada OT' | 'Derivada';
}

export const ItemHistorial = ({
  number,
  title,
  location,
  date,
  estado,
  navigation,
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
        <View style={{flex: 1}}>
          <View style={{paddingVertical:10,borderBottomWidth: 1, flex: 1, borderColor: '#D1D1D1'}}>
            <Text style={styles.number}>#{number}</Text>
          </View>
          <Text style={styles.title}>{title}</Text>

          <View style={{flexDirection: 'row', marginBottom:10}}>
            <Icon
              size={20}
              name="map-marker-alt"
              color="red"
              style={{marginRight: 11}}
            />
            <Text style={styles.info}>{location}</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Icon
              size={18}
              name="calendar-alt"
              color="skyblue"
              style={{marginRight: 10}}
            />
            <Text style={[styles.info, {textAlignVertical: 'top'}]}>
              {formatDate(date)}
            </Text>
          </View>
        </View>
        <View
          style={{flex: 1, justifyContent: 'space-between', marginRight: 5}}>
          <View style={{paddingVertical:10,borderBottomWidth: 1, borderColor: '#D1D1D1'}}>
            <Estado estado={estado} />
          </View>
          <DetalleButton codigo={number} navigation={navigation} />
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
    width: '200%',
    marginVertical: 15,
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
