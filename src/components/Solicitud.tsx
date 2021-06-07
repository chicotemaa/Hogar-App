import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Divider} from 'react-native-paper';

interface Solicitud {
  estado: string;
  servicio: string;
  consulta: string;
  imagen: string;
  token: string;
}

export const Solicitud = ({
  token,
  estado,
  servicio,
  consulta,
  imagen,
}: Solicitud) => {
  return (
    <ScrollView>
      <View>
        <View style={styleSolicitud.body}>
          <Elemento title={'Estado'} body={estado} />
          <Elemento title={'Tipo de Servicio'} body={servicio} />
          <Elemento title={'Descripción'} body={consulta} />

          <View style={styleSolicitud.containerElement}>
            <Text style={styleSolicitud.titleElement}>Fotos</Text>
            <Divider
              style={{
                marginTop: 5,
                marginBottom: 10,
                backgroundColor: '#EC5342',
                height: 2,
              }}
            />
            {imagen === null ? noImagen() : mostrarImagen(imagen, token)}
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

function noImagen() {
  return (
    <Text
      style={[
        styleSolicitud.bodyElement,
        {
          color: 'red',
          fontSize: 20,
        },
      ]}>
      No existen imagenes cargadas.
    </Text>
  );
}

function mostrarImagen(imagen: string, token: string) {
  return (
    <Image
      style={{
        width: 300,
        height: 300,
        resizeMode: 'center',
        alignSelf: 'center',
      }}
      source={{
        uri: `data:image/png;base64,${imagen}`,
        headers: {
          Pragma: 'no-cache',
          Authorization: `Bearer ${token}`,
        },
      }}
    />
  );
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
    elevation: 5,
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
    fontSize: 18.5,
  },
});
