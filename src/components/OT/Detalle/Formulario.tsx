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

  const modulo = formulario?.propiedadModulos.map(modulos => {
    const propiedadModulos = modulos.modulo.propiedadItems
      .map(propiedadItems => {
        return propiedadItems;
      })
      .filter(campos => formulario.resultadoListArray.includes(campos?.id));

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
            let pagina = -1;
            let array = formulario.listModulos.slice(0, arrayModulo + 1);

            for (let i = 0; i < array.length; i++) {
              if (array[i] === propiedadModulo.modulo.id) {
                pagina++;
              } else if (pagina === 0) {
                pagina = 0;
              }
            }

            return (
              <Modulos
                propiedadModulo={propiedadModulo}
                formulario={formulario}
                modulo={modulo[arrayModulo]}
                arrayModulo={pagina}
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
  arrayModulo,
}: {
  propiedadModulo: PropiedadModulo;
  formulario: any;
  modulo: any;
}) => {
  return (
    <>
      <View>
        <Text style={formulariosStyle.Resaltado}>
          {propiedadModulo.paginaNombre}
        </Text>
        <View style={{ flex: 1, borderWidth: 1 }}>
          {formulario &&
            modulo.map(campos => {
              console.log(campos);

              return (
                <View>
                  <Campos
                    style={formulariosStyle.contenido}
                    items={campos}
                    resultados={formulario.resultadosList}
                    moduloID={arrayModulo}
                  />
                </View>
              );
            })}
        </View>
      </View>
    </>
  );
};
const Campos = ({
  items,
  resultados,
  moduloID,
}: {
  items: any;
  resultados: any;
  moduloID: number;
}) => {
  return (
    <View>
      {resultados.map(resultado => {
        if (moduloID === resultado.indiceModulo) {
          if (items.item.tipo === 'texto' || items.item.tipo === 'numero') {
            if (items.id === resultado.idPropiedadItem) {
              return (
                <View>
                  <Text style={formulariosStyle.contenidoTitulo}>
                    {items.item.titulo}: {resultado.valor}
                  </Text>
                </View>
              );
            }
          }
          if (items.item.tipo === 'seleccion_multiple') {
            const opciones = items.item.opciones.filter(
              opcion => opcion.id === parseInt(resultado.valor),
            );
            for (let i = 0; i < opciones.length; i++) {
              return (
                <View>
                  <Text style={formulariosStyle.contenidoTitulo}>
                    {items.item.titulo}: {opciones[i].nombre}
                  </Text>
                </View>
              );
            }
          }
          if (items.item.tipo === 'foto' && resultado.imageName) {
            return (
              <View>
                <Text style={formulariosStyle.contenidoTitulo}>
                  {items.item.titulo}:
                </Text>
                <Text style={formulariosStyle.contenido}>
                  {resultado.imageName}
                </Text>
              </View>
            );
          }
        }
      })}
    </View>
  );
};
