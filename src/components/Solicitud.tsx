import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Divider } from 'react-native-paper';
import {
  Solicitudes,
  solicitudEstadoLabel,
  SucursalDeCliente,
} from '~/api/types';

interface Props {
  solicitud?: Solicitudes;
  sucursal?: SucursalDeCliente;
}

export const Solicitud = ({ solicitud, sucursal }: Props) => {
  return (
    <ScrollView>
      <View>
        <View style={styleSolicitud.body}>
          <View style={{ marginBottom: 20 }}>
            <Elemento title={'Incidencia'} body={solicitud?.necesitasAyuda} />
            <Elemento
              title={'Código incidencia'}
              body={solicitud?.id.toString()}
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <Elemento title={'Fecha'} body={formatDate(solicitud?.createdAt)} />
            <Elemento title={'Hora'} body={formatHour(solicitud?.createdAt)} />
          </View>
          <View style={{ marginBottom: 20 }}>
            <Elemento title={'Sucursal'} body={sucursal?.direccion} />
            <Elemento title={'Sector'} body={solicitud?.pisoSector} />
          </View>
          <View style={{ marginBottom: 20 }}>
            <Elemento
              title={'Estado'}
              body={
                solicitud?.estado !== undefined
                  ? solicitudEstadoLabel[solicitud?.estado]
                  : ''
              }
            />
            <Elemento
              title={'Tipo de Servicio'}
              body={solicitud?.servicio?.titulo}
            />
          </View>

          <Elemento title={'Descripción'} body={solicitud?.consulta} />
          <Elemento title={'Fotos'} body={''} />
          {solicitud?.imagen ? mostrarImagen(solicitud.imagen, '') : noImagen()}
        </View>
      </View>
    </ScrollView>
  );
};

interface PropsElement {
  title: string;
  body: string | undefined;
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
const Elemento = ({ title, body }: PropsElement) => {
  const flexD = title === 'Descripción' ? 'column' : 'row';
  return (
    <View style={styleSolicitud.containerElement}>
      <View style={{ flexDirection: flexD, paddingHorizontal: 20 }}>
        <Text style={styleSolicitud.titleElement}>{title}</Text>
        {title === 'Descripción' ? (
          <>
            <Divider
              style={{
                marginTop: 5,
                marginBottom: 10,
                backgroundColor: '#DFDFDF',
                height: 2,
              }}
            />
            <Text style={{ fontSize: 17, marginBottom: 15 }}>{body}</Text>
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

function formatHour(fecha: string | undefined) {
  if (!fecha) {
    return '';
  }
  const date = new Date(fecha);
  return (
    date.getHours() +
    ':' +
    (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
  );
}

function formatDate(fecha: string | undefined) {
  if (!fecha) {
    return '';
  }
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
