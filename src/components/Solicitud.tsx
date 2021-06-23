import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Divider} from 'react-native-paper';
import {date} from 'quasar';

interface Solicitud {
  id: string;
  fecha: string;
  title: string;
  estado: string;
  servicio: string;
  sucursal: string;
  sector: string;
  consulta: string;
  imagen: string;
  token: string;
}

export const Solicitud = ({
  id,
  fecha,
  title,
  token,
  estado,
  servicio,
  sucursal,
  sector,
  consulta,
  imagen,
}: Solicitud) => {
  return (
    <ScrollView>
      <View>
        <View style={styleSolicitud.body}>
          <View style={{marginBottom: 20}}>
            <Elemento title={'Incidencia'} body={title} />
            <Elemento title={'Código incidencia'} body={id} />
          </View>
          <View style={{marginBottom: 20}}>
            <Elemento title={'Fecha'} body={formatDate(fecha)} />
            <Elemento title={'Hora'} body={formatHour(fecha)} />
          </View>
          <View style={{marginBottom: 20}}>
            <Elemento title={'Sucursal'} body={sucursal} />
            <Elemento title={'Sector'} body={sector} />
          </View>
          <View style={{marginBottom: 20}}>
            <Elemento title={'Estado'} body={estado} />
            <Elemento title={'Tipo de Servicio'} body={servicio} />
          </View>

          <Elemento title={'Descripción'} body={consulta} />
          <Elemento title={'Fotos'} body={''} />
          {imagen === null ? noImagen() : mostrarImagen(imagen, token)}
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
          marginTop: 30,
          marginBottom: 40,
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
  const flexD = title == 'Descripción' ? 'column' : 'row';
  return (
    <View style={styleSolicitud.containerElement}>
      <View style={{flexDirection: flexD, paddingHorizontal: 20}}>
        <Text style={styleSolicitud.titleElement}>{title}</Text>
        {title == 'Descripción' ? (
          <>
            <Divider
              style={{
                marginTop: 5,
                marginBottom: 10,
                backgroundColor: '#DFDFDF',
                height: 2,
              }}
            />
            <Text style={{fontSize: 17, marginBottom: 15}}>{body}</Text>
          </>
        ) : (
          <>
            <Text style={styleSolicitud.bodyElement}>{body}</Text>
          </>
        )}
      </View>
      <Divider
        style={{
          marginTop: 5,
          backgroundColor: '#DFDFDF',
          height: 1,
        }}
      />
    </View>
  );
};

const styleSolicitud = StyleSheet.create({
  containerElement: {
    paddingHorizontal: 0,
    width: '100%',
    marginVertical: 8,
  },
  titleElement: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    color: '#101010',
  },
  header: {
    paddingBottom: 15,
  },
  body: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 3,
  },
  bodyElement: {
    flex: 1,
    fontWeight: '100',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 19,
  },
});

function formatHour(fecha: string) {
  const date = new Date(fecha);
  return (
    date.getHours() +
    ':' +
    (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
  );
}

function formatDate(fecha: string) {
  const date = new Date(fecha);
  const days = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ];
  const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  return (
    days[date.getDay()] +
    ' ' +
    date.getDate() +
    ' ' +
    months[date.getMonth()] +
    ' ' +
    date.getFullYear()
  );
}
