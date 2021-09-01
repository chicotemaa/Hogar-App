import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { getSolicitudById, getSucursalCliente } from '~/api/apiClientes';
import { RootStackParams } from '~/navigator/StackNavigator';
import { Header } from '~/components/Header';
import { Solicitudes, SucursalDeCliente } from '~/api/types';
import { Solicitud } from '~/components/Solicitud';

interface Props
  extends StackScreenProps<RootStackParams, 'DetalleSolicitudScreen'> {}

export const DetallesSolicitudScreen = ({ route }: Props) => {
  const [solicitud, setSolicitud] = useState<Solicitudes>();
  const [sucursal, setSucursal] = useState<SucursalDeCliente>();
  console.log(route);
  const id = route.params.codigo;

  useEffect(() => {
    (async () => {
      const sol = await getSolicitudById(id);
      const suc = await getSucursalCliente(sol.SucursalDeCliente);
      setSolicitud(sol);
      setSucursal(suc);
    })();
  }, [id]);

  return (
    <View style={{ backgroundColor: '#E7E1E1', flex: 1 }}>
      <Header pageName={'Solicitud'} id={id} />
      <View style={[{ flex: 8 }]}>
        <View>
          <Solicitud solicitud={solicitud} sucursal={sucursal} />
        </View>
      </View>
    </View>
  );
};
