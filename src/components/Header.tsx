import React from 'react';
import {Text, View} from 'react-native';

interface Props {
  id: string;
  title: string;
  fecha: string;
}

export const Header = ({id, title, fecha}: Props) => {
  return (
    <View
      style={{
        backgroundColor: '#EC5342',
        flex: 2,
        borderBottomEndRadius: 26,
        borderBottomLeftRadius: 26,
        elevation: 5,
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
            Solicitud # {id}
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
            <Text style={{alignSelf: 'center', fontSize: 30}}>{title}</Text>
          </View>
          <View
            style={{
              backgroundColor: '#E3E2E0',
              height: 45,
              marginBottom: 15,
              borderRadius: 8,
            }}>
            <Text style={{alignSelf: 'center', fontSize: 30}}>{fecha}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
