import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import { windowWidth } from '~/dimensions';
import { Item } from '~/services/interfaces';
import { Casilla } from './Casilla';
import { Desplegable } from './Desplegable';
import { SeleccionGroup } from './Seleccion';
import { Texto } from './Texto';
import { DateInput } from './Date';
import { useContext } from 'react';
import { Numero } from './Numero';
import { FormContext } from '~/context/fomulario/FormularioContext';

interface Props {
  item: Item;
  styleHijo?: any;
  propiedadItem: any;
  parentItem: any;
}

function isRenderedField(item: Item) {
  if (!item.opcionDepende) {
    return true;
  }

  // const parentValue = getResultado(parentItem?.id).value;

  // return propiedadItem.opcionDepende.id === parentValue;
}

export const BaseCampo = ({ item, styleHijo }: Props) => {
  console.log();

  const { getResultado } = useContext(FormContext);

  if (!isRenderedField(item)) {
    return null;
  }

  return (
    <View>
      <View style={[styles.containerItem, styleHijo]}>
        <View style={{ borderBottomWidth: 1, padding: 1, borderColor: 'grey' }}>
          <Text style={styles.titleItem}>{item.item.titulo}</Text>
        </View>
        {item.item.descripcion && (
          <View>
            <Text style={styles.subtitleItem}>{item.item.descripcion}</Text>
          </View>
        )}
        <Text style={{ color: '#B00020', fontWeight: '600' }}>
          {item.requerido ? 'Campo obligatorio' : null}
        </Text>
        <View style={styles.campo}>{Campo(item)}</View>
      </View>
    </View>
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

const Campo = (item: Item) => {
  let campo = null;
  switch (item.item.tipo) {
    case 'texto':
      campo = <Texto />;
      break;
    case 'foto':
      campo = <Text>Es foto</Text>;
      break;
    case 'seleccion_multiple':
      campo = <Casilla item={item} />;
      break;
    case 'desplegable':
      campo = <Desplegable item={item} />;
      break;
    case 'casilla_de_verificacion':
      campo = <SeleccionGroup item={item} />;
      break;
    case 'titulo':
      campo = <Texto />;
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
