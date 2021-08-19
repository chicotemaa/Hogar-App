import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { getSolicitudById, getSucursalCliente } from '~/api/apiClientes';
import { RootStackParams } from '~/navigator/StackNavigator';
import { getImage, getServicioAPI } from '~/api/api';
import { Solicitud } from '~/components/Solicitud';
import { Header } from '~/components/Header';
import { Solicitudes } from '~/api/interfaces/types';

interface Props
  extends StackScreenProps<RootStackParams, 'DetalleSolicitudScreen'> {}

export const DetallesSolicitudScreen = ({ navigation, route }: Props) => {
  const infoSolicitud: Solicitudes = {
    consulta: '',
    createdAt: '',
    servicio: '',
    estado: '',
    necesitasAyuda: '',
    pisoSector: '',
    SucursalDeCliente: '',
  };

  const [solicitud, setSolicitud] = useState(infoSolicitud);

  const id = route.params.codigo;
  const estados = ['Pendiente', 'Generada OT', 'Derivada'];

  useEffect(() => {
    getSolicitudById(id).then(solicitud => {
      getSucursalCliente(solicitud.SucursalDeCliente).then(sucursal => {
        //getImage(solicitud.imagen).then(({ imagen, token }) => {
        setSolicitud({
          consulta: solicitud.consulta,
          createdAt: solicitud.createdAt,
          estado: estados[solicitud.estado],
          necesitasAyuda: solicitud.necesitasAyuda,
          servicio: solicitud.servicio.titulo,
          pisoSector: solicitud.pisoSector,
          SucursalDeCliente: sucursal.SucursalDeCliente,
        });
        //});
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
            createdAt={solicitud.createdAt}
            consulta={solicitud.consulta}
            servicio={solicitud.servicio}
            SucursalDeCliente={solicitud.SucursalDeCliente}
            pisoSector={solicitud.pisoSector}
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
function serialize(arg0: Promise<any>): any {
  throw new Error('Function not implemented.');
}
