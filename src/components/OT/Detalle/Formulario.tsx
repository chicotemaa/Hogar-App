import React, { useEffect } from 'react';
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
  const ArrayFormulario = formulario?.propiedadModulos;
  const Arrayresultados = formulario?.resultados.resultados;
  const items = FormularioRes(ArrayFormulario, Arrayresultados);

  return (
    <View style={formulariosStyle.TituloFormulario}>
      {formulario && ArrayFormulario && items && (
        <>
          <TituloFormulario
            titulo={formulario?.titulo}
            descripcion={formulario?.descripcion}
          />
          <Text style={formulariosStyle.TextTitulo}>FORMULARIOS</Text>
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

const Modulos = ({ item }: any) => {
  return (
    <>
      <Text style={formulariosStyle.Resaltado}>{item.paginaNombre}</Text>
      <Text style={formulariosStyle.contenido}>{item.modulo.titulo} </Text>
      {item.modulo.propiedadItems.map((item: { item: any }) => {
        return (
          <Text>
            {item.id} {item.item.id}
          </Text>
        );
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

async function FormularioRes(ArrayFormulario: any, Arrayresultados: any) {
  let items = [];
  let count = 0;
  if (ArrayFormulario && Arrayresultados) {
    ArrayFormulario.map(item => {
      item.modulo.propiedadItems.map(campo => {
        Arrayresultados.map(resultado => {
          if (resultado.propiedadItem === campo['@id']) {
            items.push(item);
            count++;
          }
        });
      });
    });
  }
}
