import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { formularioRealizado } from '~/services/tecnicosServices';
import { Firma } from './Firma';
import { useQuery } from 'react-query';
import { formulariosStyle } from '~/theme/appTheme';
import { PropiedadModulo } from '~/api/types';

export const Formulario = ({
  idFormulario,
  idResultado,
}: {
  idFormulario: number;
  idResultado: string;
}) => {
  const { data: formulario } = useQuery(
    ['Resultados', idFormulario, idResultado],
    () => formularioRealizado(idFormulario, idResultado),
  );
  console.log(formulario?.resultadoListArray);
  return (
    <View style={formulariosStyle.TituloFormulario}>
      {formulario && (
        <>
          <TituloFormulario
            titulo={formulario?.titulo}
            descripcion={formulario?.descripcion}
          />
          <Text style={formulariosStyle.TextTitulo}>FORMULARIOS</Text>
          {formulario.propiedadModulos.map(item => {
            let array = 0;
            return (
              <Modulos
                propiedadModulo={item}
                formulario={formulario}
                i={array}
              />
            );
          })}

          <View />
        </>
      )}
      <Firma />
    </View>
  );
};

const TituloFormulario = ({
  titulo,
  descripcion,
}: {
  titulo: string;
  descripcion: string;
}) => {
  return (
    <View style={formulariosStyle.viewTitulo}>
      <Text style={formulariosStyle.TextTitulo}>Titulo: {titulo}</Text>
      <Text style={formulariosStyle.viewTitulo}>
        Descripcion: {descripcion}
      </Text>
    </View>
  );
};

const Modulos = ({
  propiedadModulo,
  formulario,
  i,
}: {
  propiedadModulo: PropiedadModulo;
  formulario: any;
  i: number;
}) => {
  console.log({ propiedadModulo });
  return (
    <>
      <Text style={formulariosStyle.Resaltado}>
        {propiedadModulo.paginaNombre}
      </Text>
      <Text style={formulariosStyle.Resaltado}>
        {propiedadModulo.modulo.titulo},
        {formulario &&
          propiedadModulo.modulo.propiedadItems.map(item => {
            if (item.id === formulario.resultadoListArray[i]) {
              i++;
              return <Campos Item={item} />;
            }
          })}
        ,
      </Text>
    </>
  );
};

const Campos = ({ Item }: { Item: any }) => {
  return (
    <>
      {console.log('Item', Item)}
      <Text style={formulariosStyle.contenido}> ID {Item.id} </Text>
      <Text style={formulariosStyle.contenido}>{Item.item.titulo}</Text>
    </>
  );
};
