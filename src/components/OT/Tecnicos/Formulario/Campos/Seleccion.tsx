import * as React from 'react';
import { View } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { PropiedadItem, ItemOpcion } from '~/api/types';

interface Props {
  item: PropiedadItem;
}

export const SeleccionGroup = ({ item }: Props) => {
  let arrayItems: string[] = [];
  const modifyArray = (id: string, checked: boolean) => {
    checked ? arrayItems.push(id) : (arrayItems = arrayRemove(arrayItems, id));
  };

  return (
    <View>
      {item.item.opciones.map(opcion => {
        return <Seleccion opcion={opcion} modifyArray={modifyArray} />;
      })}
    </View>
  );
};

const Seleccion = ({
  opcion,
  modifyArray,
}: {
  opcion: ItemOpcion;
  modifyArray: Function;
}) => {
  const [checked, setChecked] = React.useState(false);

  return (
    <Checkbox.Item
      key={opcion.id}
      label={opcion.nombre}
      status={checked ? 'checked' : 'unchecked'}
      onPress={() => {
        setChecked(!checked);
        modifyArray(opcion.id, !checked);
      }}
    />
  );
};

function arrayRemove(arr: string[], value: string) {
  return arr.filter(function (ele) {
    return ele !== value;
  });
}
