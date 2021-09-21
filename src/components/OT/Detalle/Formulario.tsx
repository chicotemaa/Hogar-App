import React from 'react';
import { Text, View, Image } from 'react-native';
import { formularioRealizado } from '~/services/tecnicosServices';
import { Firma } from './Firma';
import { useQuery } from 'react-query';
import { formulariosStyle } from '~/theme/appTheme';
import { PropiedadModulo, FormularioResultado, Resultado } from '~/api/types';
import { TransitionView } from '~/components/TransitionView';

export const Formulario = ({
  idFormulario,
  idResultado,
  firma,
  aclaracion,
}: {
  idFormulario: number;
  idResultado: undefined | string | FormularioResultado;
  firma: string | undefined;
  aclaracion: undefined | string;
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
          <TransitionView key={formulario.resultadosList} index={0}>
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
          </TransitionView>
        </>
      )}
      <Firma firma={firma} aclaracion={aclaracion} />
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
        {propiedadModulo.paginaNombre && (
          <Text style={formulariosStyle.Resaltado}>
            {propiedadModulo.paginaNombre}
          </Text>
        )}
        <View style={{ flex: 1 }}>
          {formulario &&
            modulo.map(campos => {
              return (
                <View>
                  <Campos
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
        console.log(resultado);
        if (moduloID === resultado.indiceModulo) {
          if (
            items.item.tipo === 'texto' ||
            items.item.tipo === 'numero' ||
            items.item.tipo === 'fecha'
          ) {
            if (items.id === resultado.idPropiedadItem) {
              if (items.item.tipo === 'texto') {
                return (
                  <View>
                    <Text style={formulariosStyle.contenidoTitulo}>
                      {items.item.titulo}:
                    </Text>
                    <Text style={formulariosStyle.contenidoTexto}>
                      {resultado.valor}
                    </Text>
                  </View>
                );
              } else {
                return (
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={formulariosStyle.contenidoTitulo}>
                      {items.item.titulo}:
                    </Text>
                    <Text style={formulariosStyle.contenidoTexto}>
                      {resultado.valor}
                    </Text>
                  </View>
                );
              }
            }
          }
          if (
            items.item.tipo === 'seleccion_multiple' ||
            items.item.tipo === 'casillas_de_verificacion' ||
            items.item.tipo === 'desplegable'
          ) {
            const opciones = items.item.opciones.filter(
              opcion => opcion.id === parseInt(resultado.valor),
            );
            for (let i = 0; i < opciones.length; i++) {
              return (
                <View style={{ flex: 1 }}>
                  <Text style={formulariosStyle.contenidoTitulo}>
                    {items.item.titulo}:
                  </Text>
                  <Text style={formulariosStyle.contenidoSeleccionable}>
                    {opciones[i].nombre}
                  </Text>
                </View>
              );
            }
          }
          if (items.item.tipo === 'foto' && resultado.imageName) {
            const path =
              'https://sistemas.hogarmantenimiento.com/uploads/imagenes/resultado/' +
              resultado.imageName;
            if (items.id === resultado.idPropiedadItem) {
              return (
                <View>
                  <Text style={formulariosStyle.contenidoTitulo}>
                    {items.item.titulo}:
                  </Text>
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <Image
                      style={formulariosStyle.stretch}
                      source={{ uri: path }}
                    />
                  </View>
                </View>
              );
            }
          }
        }
      })}
    </View>
  );
};
