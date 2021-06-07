import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Divider} from 'react-native-paper';

interface Solicitud {
  estado?: string;
  servicio: string;
  consulta: string;
}

export const Solicitud = ({estado, servicio, consulta}: Solicitud) => {
  return (
    <ScrollView>
      <View>
        <View style={styleSolicitud.body}>
          <Elemento title={'Estado'} body={'Pendiente'} />
          <Elemento title={'Tipo de Servicio'} body={servicio} />
          <Elemento title={'Descripción'} body={consulta} />

          <View style={styleSolicitud.containerElement}>
            <Text style={styleSolicitud.titleElement}>Fotos</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

interface PropsElement {
  title: string;
  body: string;
}

const Elemento = ({title, body}: PropsElement) => {
  return (
    <View style={styleSolicitud.containerElement}>
      <Text style={styleSolicitud.titleElement}>{title}</Text>
      <Divider
        style={{
          marginTop: 5,
          marginBottom: 10,
          backgroundColor: '#EC5342',
          height: 2,
        }}
      />
      <Text style={styleSolicitud.bodyElement}>{body}</Text>
    </View>
  );
};

const styleSolicitud = StyleSheet.create({
  containerElement: {
    backgroundColor: '#fafafa',
    paddingVertical: 13,
    paddingHorizontal: 15,
    width: '100%',
    borderWidth: 1,
    borderColor: 'transparent',
    marginVertical: 8,
    elevation: 3,
    borderRadius: 6,
  },
  titleElement: {
    fontSize: 25,
    fontWeight: '100',
  },
  header: {
    paddingBottom: 15,
  },
  body: {
    paddingVertical: 3,
  },
  bodyElement: {
    paddingVertical: 10,
    fontSize: 17,
  },
});
