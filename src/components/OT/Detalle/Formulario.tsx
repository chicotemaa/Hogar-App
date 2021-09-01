import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FormularioRealizado } from '~/services/tecnicosServices';
import { Firma } from './Firma';
import { Modulo } from './Modulo';
import { OrdenTrabajo } from '~/api/types';
import { ListItem } from 'react-native-elements/dist/list/ListItem';
import { useQuery } from 'react-query';

export const Formulario = ({ ID }: number) => {
  const [OT, setOT] = useState();
  const { data } = useQuery(['Formulario Detalle', ID], () =>
    FormularioRealizado(ID),
  );
  useEffect(() => {
    setOT(data);
  }, []);
  return (
    <View style={styles.TituloFormulario}>
      <TituloFormulario OT={OT} />
      <Firma />
    </View>
  );
};

const TituloFormulario = ({ OT }: any) => {
  console.log('ot titulo prueba', OT);
  return (
    <View style={styles.viewTitulo}>
      <Text>Pruebas{OT.titulo}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  TituloFormulario: { paddingHorizontal: 20 },
  viewTitulo: { marginVertical: 25 },
  TextTitulo: { fontSize: 20, fontWeight: 'bold' },
});
function data(data: any) {
  throw new Error('Function not implemented.');
}
