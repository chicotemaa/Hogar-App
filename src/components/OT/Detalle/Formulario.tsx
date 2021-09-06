import React from 'react';
import { Text, View } from 'react-native';
import { formularioRealizado } from '~/services/tecnicosServices';
import { Firma } from './Firma';
import { useQuery } from 'react-query';
import { formulariosStyle } from '~/theme/appTheme';

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
  console.log('data', formulario);
  return (
    <View style={formulariosStyle.TituloFormulario}>
      {formulario && (
        <>
          <TituloFormulario
            titulo={formulario?.titulo}
            descripcion={formulario?.descripcion}
          />
          <Text style={formulariosStyle.TextTitulo}>FORMULARIOS</Text>
          <View>
            {formulario.propiedadModulos.map(item => {
              return <Modulos Item={item} />;
            })}
          </View>
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

const Modulos = ({ Item }: any) => {
  return (
    <>
      <Text style={formulariosStyle.Resaltado}>{Item.paginaNombre}</Text>
      <Text style={formulariosStyle.contenido}>{Item.modulo.titulo} </Text>
      {Item.modulo.propiedadItems.map((item: { item: any }) => {
        return <Campos Item={item.item} />;
      })}
    </>
  );
};

const Campos = ({ Item }: any) => {
  return (
    <>
      <Text style={formulariosStyle.contenido}>ID {Item.id}</Text>
      <Text style={formulariosStyle.contenido}>{Item.titulo}</Text>
    </>
  );
};
