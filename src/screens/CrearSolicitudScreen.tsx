import React from 'react';
import {StyleSheet,Text, View} from 'react-native';
import { Button } from '../components/Button';
import { styles } from '../theme/appTheme';


export const CrearSolicitudScreen = () => {
  return (
    <View style={styles.container}>
      <View style={stylesWelcome.menuContainer}>
        <View style={stylesWelcome.menu} />
      </View>

      <View
        style={{
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        <Text
          style={{
            fontSize: 40,
            fontWeight: '600',
            paddingVertical: 20,
            textAlign: 'center',
            justifyContent: 'center',
            textAlignVertical: 'center',
          }}>
          Crear{'\n'}Solicitud
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          marginHorizontal: 55,
        }}>
        <Text
          style={{
            fontSize: 19,
            fontWeight: '400',
            textAlign: 'center',
            justifyContent: 'center',
            marginVertical: 5,
          }}>
          Que prioridad tiene su solicitud?
        </Text>
      </View>
      <View
        style={{
          alignSelf: 'center',
          justifyContent: 'center',
          marginVertical: 10,
          flex: 2,
          alignContent: 'center',
        }}>
        <Button
          title="Alta"
          color="#AE1E1E"
          height={50}
          width={250}
          onPress={() => {}}
        />
        <View
          style={{
            justifyContent: 'center',
            paddingVertical: 3,
            paddingHorizontal: 10,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: 'grey',
              fontSize: 15,
              fontWeight: '100',
            }}>
            Solo se puede hacer {'\n'}una solicitud de prioridad alta
          </Text>
        </View>
        <Button
          title="Media"
          color="#BD5534"
          height={50}
          width={250}
          onPress={() => {}}
        />
        <Button
          title="Baja"
          color="#AD8E1E"
          height={50}
          width={250}
          onPress={() => {}}
        />
      </View>
    </View>
  );
};

const stylesWelcome = StyleSheet.create({
  menuContainer: {
    borderWidth:4,
    marginTop:3,
  },
  menu: {
    height: 30,
    backgroundColor: '#473E3E',
    alignSelf: 'flex-end',
    marginHorizontal: 10,
    marginTop:6,
    borderColor: 'blue',
    borderWidth: 2,
  },
  header: {
    flex: 2,
    margin: 5,
    padding: 3,
    alignItems: 'center',
  },
  aclaraciónContainer: {
    margin: 10,
  },
});