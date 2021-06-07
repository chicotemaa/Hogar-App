import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {getSolicitudById} from '../api/apiClientes';
import {RootStackParams} from '../navigator/StackNavigator';
import {getData, getImage, getServicioAPI} from '../api/api';
import {Solicitud} from '../components/Solicitud';
import {styles} from '../theme/appTheme';
import {Header} from '../components/Header';

interface Props
  extends StackScreenProps<RootStackParams, 'DetalleSolicitudScreen'> {}

interface InfoSolicitud {
  consulta: string; //description
  createdAt: string;
  estado: string;
  servicio: string;
  necesitasAyuda: string; //incidencia-title
  imagen: string;
  token: string;
}

export const DetallesSolicitudScreen = ({navigation, route}: Props) => {
  const infoSolicitud: InfoSolicitud = {
    consulta: '',
    createdAt: '',
    servicio: '',
    estado: '',
    necesitasAyuda: '',
    imagen: '',
    token: '',
  };

  const [solicitud, setSolicitud] = useState(infoSolicitud);

  const id = route.params.codigo;

  useEffect(() => {
    getData('access_token').then(token => {
      getSolicitudById(id, token).then(solicitud => {
        getImage(solicitud.imagen).then(imagen => {
          getServicio(solicitud.servicio).then(servicio => {
            setSolicitud({
              token,
              consulta: solicitud.consulta,
              createdAt: formatDate(solicitud.createdAt),
              estado: solicitud.estados[solicitud.estado],
              necesitasAyuda: solicitud.necesitasAyuda,
              servicio,
              imagen,
            });
          });
        });
      });
    });
  }, []);

  return (
    <View style={{backgroundColor: '#E7E1E1', flex: 1}}>
      <Header
        id={id}
        title={solicitud.necesitasAyuda}
        fecha={solicitud.createdAt}
      />
      <View style={[styles.container, {flex: 5.3}]}>
        <View>
          <Solicitud
            token={solicitud.token}
            consulta={solicitud.consulta}
            servicio={solicitud.servicio}
            estado={solicitud.estado}
            imagen={solicitud.imagen}
          />
        </View>
      </View>
    </View>
  );
};

const stylesDetalle = StyleSheet.create({
  containerModal: {
    alignSelf: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 30,
    paddingVertical: 200,
    width: '80%',
  },
  headerStyle: {
    alignSelf: 'flex-start',
    paddingVertical: 10,
  },
  number: {
    color: '#EC5342',
  },
});

function formatDate(fecha: string) {
  const date = new Date(fecha);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return date.toLocaleString('es-ES', options);
}

async function getServicio(id: string) {
  return getServicioAPI(id);
}
