import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { getSolicitudById, getSucursalCliente } from '../api/apiClientes';
import { RootStackParams } from '../navigator/StackNavigator';
import { getData, getImage, getServicioAPI } from '../api/api';
import { Solicitud } from '../components/Solicitud';
import { Header } from '../components/Header';

interface Props
  extends StackScreenProps<RootStackParams, 'DetalleSolicitudScreen'> {}

interface InfoSolicitud {
  consulta: string; //description
  createdAt: string;
  estado: string;
  servicio: string;
  necesitasAyuda: string; //incidencia-title
  sector: string;
  sucursalClienteDir: string;
  imagen: string | null;
  token: string;
}

export const DetallesSolicitudScreen = ({ navigation, route }: Props) => {
  const infoSolicitud: InfoSolicitud = {
    consulta: '',
    createdAt: '',
    servicio: '',
    estado: '',
    necesitasAyuda: '',
    sector: '',
    sucursalClienteDir: '',
    imagen: '',
    token: '',
  };

  const [solicitud, setSolicitud] = useState(infoSolicitud);

  const id = route.params.codigo;
  const estados = ['Pendiente', 'Generada OT', 'Derivada'];

  useEffect(() => {
    getData('access_token').then(token => {
      getSolicitudById(id, token).then(solicitud => {
        console.log(solicitud);
        getSucursalCliente(solicitud.SucursalDeCliente).then(sucursal => {
          getImage(solicitud.imagen).then(imagen => {
            setSolicitud({
              token,
              consulta: solicitud.consulta,
              createdAt: solicitud.createdAt,
              estado: estados[solicitud.estado],
              necesitasAyuda: solicitud.necesitasAyuda,
              servicio: solicitud.servicio.titulo,
              sucursalClienteDir: sucursal.direccion,
              sector: solicitud.pisoSector,
              imagen,
            });
          });
        });
      });
    });
  }, []);

  return (
    <View style={{ backgroundColor: '#E7E1E1', flex: 1 }}>
      <Header
        pageName={'Solicitud'}
        id={id}
        title={solicitud.necesitasAyuda}
        fecha={solicitud.createdAt}
      />
      <View style={[{ flex: 8 }]}>
        <View>
          <Solicitud
            id={id}
            title={solicitud.necesitasAyuda}
            fecha={solicitud.createdAt}
            token={solicitud.token}
            consulta={solicitud.consulta}
            servicio={solicitud.servicio}
            sucursal={solicitud.sucursalClienteDir}
            sector={solicitud.sector}
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
    color: '#ef4920',
  },
});

async function getServicio(id: string) {
  return getServicioAPI(id);
}
