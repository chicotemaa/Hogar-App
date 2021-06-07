import React from 'react';
import {Text, View} from 'react-native';

export const HeaderNuevo = () => {
  return (
    <View
      style={{
        backgroundColor: '#EC5342',
        flex: 2,
        borderBottomEndRadius: 26,
        borderBottomLeftRadius: 26,
      }}>
      <View style={{marginHorizontal: 15}}>
        <View>
          <Text
            style={{
              color: 'white',
              fontSize: 43,
              fontWeight: 'bold',
              textShadowRadius: 30,
            }}>
            Solicitud #144
          </Text>
        </View>
        <View
          style={{
            backgroundColor: 'grey',
            height: 2,
            marginBottom: 10,
            borderRadius: 10,
          }}
        />
        <View style={{justifyContent: 'space-between'}}>
          <View
            style={{
              backgroundColor: '#E3E2E0',
              height: 45,
              marginBottom: 15,
              borderRadius: 8,
              justifyContent: 'center',
            }}>
            <Text style={{alignSelf: 'center', fontSize: 30}}>
              Vidrios Rotos
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#E3E2E0',
              height: 45,
              marginBottom: 15,
              borderRadius: 8,
            }}>
            <Text style={{alignSelf: 'center', fontSize: 30}}>
              06-06-2021 14:56
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
