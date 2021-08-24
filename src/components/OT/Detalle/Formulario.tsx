import React from 'react';
import { Text, View } from 'react-native';
import { Firma } from './Firma';
import { Modulo } from './Modulo';
import { OrdenTrabajo } from '../../../services/interfaces';

export const Formulario = ({OrdenTrabajo}:any) => {
  const OT = OrdenTrabajo;console.log(OT)
  return (
    <View style={{ paddingHorizontal: 20 }}>
      <TituloFormulario OrdenTrabajo={OT} />
      <Modulo />
      <Firma />
    </View>
  );
};

const TituloFormulario = ({OrdenTrabajo}:any) => {
  const OT = OrdenTrabajo;
  return (
    <View style={{ marginVertical: 25,  }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
        Formulario : {OT.nombre}
      </Text>
      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
        Descripcion : {OT.descripcion}
      </Text>
    </View>
  );
};
