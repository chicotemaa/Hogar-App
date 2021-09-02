import React, { useEffect, useState } from 'react';
import { formulariosStyleheet, Text, View } from 'react-native';
import { formularioRealizado } from '~/services/tecnicosServices';
import { Firma } from './Firma';
import { Modulo } from './Modulo';
import { OrdenTrabajo } from '~/api/types';
import { ListItem } from 'react-native-elements/dist/list/ListItem';
import { useQuery } from 'react-query';
import { formulariosStyle } from '~/theme/appTheme';

export const Formulario = ({
  idFormulario,
  idResultado,
}: {
  idFormulario: string;
  idResultado: string;
}) => {
  const { data } = useQuery(['Resultados', idFormulario, idResultado], () =>
    formularioRealizado(idFormulario, idResultado),
  );
  console.log('data', data);
  return (
    <View style={formulariosStyle.TituloFormulario}>
      {data && (
        <TituloFormulario
          titulo={data?.titulo}
          descripcion={data?.descripcion}
        />
      )}
      <Firma />
    </View>
  );
};

const TituloFormulario = ({ titulo, descripcion }: string) => {
  return (
    <View style={formulariosStyle.viewTitulo}>
      <Text style={formulariosStyle.TextTitulo}>Formulario: {titulo}</Text>
      <Text style={formulariosStyle.viewTitulo}>
        Descripcion: {descripcion}
      </Text>
    </View>
  );
};
