import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import { windowWidth } from '~/dimensions';
import { PropiedadItem } from '~/api/types';
import { Casilla } from './Casilla';
import { Desplegable } from './Desplegable';
import { Seleccion } from './Seleccion';
import { Texto } from './Texto';
import { DateInput } from './Date';
import { useContext } from 'react';
import { Numero } from './Numero';
import { ModuloContext } from '~/context/modulo/ModuloContext';

interface Props {
  propiedadItem: PropiedadItem;
  parentItem?: PropiedadItem;
}

function isRenderedField({
  propiedadItem,
  getResultado,
  parentItem,
}: {
  propiedadItem: PropiedadItem;
  getResultado: ModuloContext['getResultado'];
  parentItem?: PropiedadItem;
}) {
  if (!propiedadItem.opcionDepende) {
    return true;
  }

  if (!parentItem) {
    return false;
  }

  const parentValue = getResultado(parentItem.id)?.valor;

  return propiedadItem.opcionDepende.id === parentValue;
}

export const BaseCampo = ({ propiedadItem, parentItem }: Props) => {
  const { getResultado } = useContext(ModuloContext);

  if (!isRenderedField({ propiedadItem, getResultado, parentItem })) {
    return null;
  }

  return (
    <>
      <View>
        <View style={styles.containerItem}>
          <View
            style={{ borderBottomWidth: 1, padding: 1, borderColor: 'grey' }}>
            <Text style={styles.titleItem}>{propiedadItem.item.titulo}</Text>
          </View>
          {propiedadItem.item.descripcion && (
            <View>
              <Text style={styles.subtitleItem}>
                {propiedadItem.item.descripcion}
              </Text>
            </View>
          )}
          <Text style={{ color: '#B00020', fontWeight: '600' }}>
            {propiedadItem.requerido ? 'Campo obligatorio' : null}
          </Text>
          <View style={styles.campo}>{Campo(propiedadItem)}</View>
        </View>
      </View>
      {propiedadItem.propiedadItems.map(childItem => (
        <BaseCampo propiedadItem={childItem} parentItem={propiedadItem} />
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  containerItem: {
    marginVertical: 4,
    borderLeftWidth: 3,
    borderLeftColor: '#F76656',
    backgroundColor: 'white',
    paddingHorizontal: 5,
    paddingBottom: 10,
    paddingTop: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.23,
    shadowRadius: 4.62,
    paddingLeft: 0.03 * windowWidth,
    elevation: 4,
    borderRadius: 3,
  },
  titleItem: {
    fontSize: 0.05 * windowWidth,
    fontWeight: '600',
    marginVertical: 10,
  },
  subtitleItem: {
    fontSize: 0.04 * windowWidth,
    borderBottomWidth: 0,
    borderBottomColor: 'grey',
    paddingVertical: 8,
    marginVertical: 2,
    color: '#101010',
  },
  campo: {
    marginVertical: 5,
    borderTopColor: '#f2f2f2',
    borderTopWidth: 1,
  },
});

const Campo = (propiedadItem: PropiedadItem) => {
  let campo = null;
  switch (propiedadItem.item.tipo) {
    case 'texto':
      campo = <Texto propiedadItem={propiedadItem} />;
      break;
    case 'foto':
      campo = <Text>Es foto</Text>;
      break;
    case 'seleccion_multiple':
      campo = <Casilla propiedadItem={propiedadItem} />;
      break;
    case 'desplegable':
      campo = <Desplegable propiedadItem={propiedadItem} />;
      break;
    case 'casilla_de_verificacion':
      campo = <Seleccion propiedadItem={propiedadItem} />;
      break;
    case 'titulo':
      campo = <Texto propiedadItem={propiedadItem} />;
      break;
    case 'date_time':
      campo = <DateInput modo={'completo'} />;
      break;
    case 'date':
      campo = <DateInput modo={'date'} />;
      break;
    case 'time':
      campo = <DateInput modo={'time'} />;
      break;
    case 'numero':
      campo = <Numero />;
      break;
    default:
      null;
  }

  return campo;
};
