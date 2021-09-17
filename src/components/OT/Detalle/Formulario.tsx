import React from 'react';
import { Text, View } from 'react-native';
import { formularioRealizado } from '~/services/tecnicosServices';
import { Firma } from './Firma';
import { useQuery } from 'react-query';
import { formulariosStyle } from '~/theme/appTheme';
import { PropiedadModulo } from '~/api/types';
import { styles } from '../../../theme/appTheme';

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
  //console.log(formulario?.resultadosList);
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
  let arrayModulo = -1;
  return (
    <View style={formulariosStyle.TituloFormulario}>
      {formulario && modulo && (
        <>
          <TituloFormulario
            titulo={formulario?.titulo}
            descripcion={formulario?.descripcion}
          />
          <Text style={formulariosStyle.TextTitulo}>FORMULARIOS</Text>

          {formulario.propiedadModulos.map(propiedadModulo => {
            arrayModulo++;
            return (
              <Modulos
                propiedadModulo={propiedadModulo}
                formulario={formulario}
                modulo={modulo[arrayModulo]}
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
}: {
  titulo: string;
  descripcion: string;
}) => {
  return (
    <View style={formulariosStyle.viewTitulo}>
      <Text style={formulariosStyle.TextTitulo}>Titulo: {titulo}</Text>
    </View>
  );
};

const Modulos = ({
  propiedadModulo,
  formulario,
  modulo,
}: {
  propiedadModulo: PropiedadModulo;
  formulario: any;
  modulo: any;
}) => {
  return (
    <>
      <Text style={formulariosStyle.Resaltado}>
        {propiedadModulo.paginaNombre}:
      </Text>
      <View>
        <Text style={formulariosStyle.Resaltado}>
          <View>
            {formulario &&
              modulo.map(campos => {
                return (
                  <View>
                    <Campos
                      style={formulariosStyle.contenido}
                      items={campos}
                      resultados={formulario.resultadosList}
                    />
                  </View>
                );
              })}
          </View>
        </Text>
      </View>
    </>
  );
};
const Campos = ({ items, resultados }: { items: any; resultados: any }) => {
  return (
    <View>
      <Text style={formulariosStyle.contenido}>
        {items.item.titulo}:{' '}
        {resultados.map(resultado => {
          if (items.item.tipo === 'texto' || items.item.tipo === 'numero') {
            if (items.id === resultado.idPropiedadItem) {
              return <Text>{resultado.valor} </Text>;
            }
          } else if (items.item.tipo === 'seleccion_multiple') {
            const opciones = items.item.opciones.filter(
              opcion => opcion.id === parseInt(resultado.valor),
            );
            if (opciones.length > 0) {
              return <Text>{opciones[0].nombre} |</Text>;
            }
          }
        })}
      </Text>
    </View>
  );
};
