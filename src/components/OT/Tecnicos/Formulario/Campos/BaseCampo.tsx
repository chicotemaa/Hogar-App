import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import { windowWidth } from '~/dimensions';
import { ItemTipo, PropiedadItem } from '~/api/types';
import { Casilla } from './Casilla';
import { Desplegable } from './Desplegable';
import { Seleccion } from './Seleccion';
import { Texto } from './Texto';
import { DateInput } from './Date';
import { useContext } from 'react';
import { Numero } from './Numero';
import { ModuloContext } from '~/context/modulo/ModuloContext';
import { Foto } from './Foto';

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

  const parentValue = getResultado(parentItem.id)?.valor[0];

  if (parentValue) {
    return String(propiedadItem.opcionDepende.id) === parentValue;
  }
  return false;
}

export const BaseCampo = ({ propiedadItem, parentItem }: Props) => {
  const { getResultado } = useContext(ModuloContext);
  let styleChildren = parentItem ? styles.childContainer : undefined;

  if (!isRenderedField({ propiedadItem, getResultado, parentItem })) {
    return null;
  }

  return (
    <>
      <View>
        <View style={[styles.containerItem, styleChildren]}>
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
    backgroundColor: '#F0F0F0',
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
  childContainer: {
    marginHorizontal: 10,
    borderLeftColor: '#3DF56B',
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

//TODO: crear wrapper para campos
const CampoTypes = {
  [ItemTipo.TEXTO]: Texto,
  [ItemTipo.FOTO]: Foto,
  [ItemTipo.SELECCION_MULTIPLE]: Casilla,
  [ItemTipo.DESPLEGABLE]: Desplegable,
  [ItemTipo.CASILLA_DE_VERIFICACION]: Seleccion,
  [ItemTipo.TITULO]: Texto,
  [ItemTipo.DATE_TIME]: DateInput,
  [ItemTipo.DATE]: DateInput,
  [ItemTipo.TIME]: DateInput,
  [ItemTipo.NUMERO]: Numero,
};

const Campo = (propiedadItem: PropiedadItem) => {
  const Item = CampoTypes[propiedadItem.item.tipo];
  return <Item propiedadItem={propiedadItem} />;
};
