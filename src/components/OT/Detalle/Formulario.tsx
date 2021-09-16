import React from 'react';
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
  console.log(formulario?.resultadosList);
  let array = -1;
  const modulo = formulario?.propiedadModulos.map(modulos => {
    const propiedadModulos = modulos.modulo.propiedadItems
      .map(propiedadItems => {
        return propiedadItems;
      })
      .filter(
        campos => formulario.resultadoListArray.includes(campos?.id),
        array++,
      );

    return propiedadModulos;
  });
  console.log('modulo', modulo);

  return (
    <View style={formulariosStyle.TituloFormulario}>
      {formulario && (
        <>
          <TituloFormulario
            titulo={formulario?.titulo}
            descripcion={formulario?.descripcion}
          />
          <Text style={formulariosStyle.TextTitulo}>FORMULARIOS</Text>

          {formulario.propiedadModulos.map(propiedadModulo => {
            return (
              <Modulos
                propiedadModulo={propiedadModulo}
                formulario={formulario}
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
}: {
  propiedadModulo: PropiedadModulo;
  formulario: any;
}) => {
  return (
    <>
      <Text style={formulariosStyle.Resaltado}>
        {propiedadModulo.paginaNombre}
      </Text>
      <Text style={formulariosStyle.Resaltado}>
        {propiedadModulo.modulo.titulo},
        {formulario &&
          propiedadModulo.modulo.propiedadItems.map(propiedadItems => {
            //if (formulario.resultadoListArray[array] === propiedadItems.id) {
            //array++;
            //return <Campos Item={propiedadItems} />;
            //}
          })}
      </Text>
    </>
  );
};
