import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FormularioRealizado } from '~/services/tecnicosServices';
import { Firma } from './Firma';
import { Modulo } from './Modulo';
import { OrdenTrabajo } from '~/api/types';
import { ListItem } from 'react-native-elements/dist/list/ListItem';

export const Formulario = ({ ID }) => {
  const [OT, setOT] = useState();

  useEffect(() => {
    FormularioRealizado(ID).then(data => {
      console.log('data ', data);
      setOT(data);
    });
  }, []);

  return (
    <View style={styles.TituloFormulario}>
      <TituloFormulario OT={OT} />
      <Firma />
    </View>
  );
};

const TituloFormulario = ({ OT }: any) => {
  const [OTF, setOTF] = useState('Cargando');
  useEffect(() => {
    setOTF(OT);
  }, [OT]);
  console.log('ot titulo prueba', OTF);
  return <View style={styles.viewTitulo} />;
};

const styles = StyleSheet.create({
  TituloFormulario: { paddingHorizontal: 20 },
  viewTitulo: { marginVertical: 25 },
  TextTitulo: { fontSize: 20, fontWeight: 'bold' },
});
