import * as React from 'react';
import { View } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { PropiedadItem, ItemOpcion } from '~/api/types';
import { useContext } from 'react';
import { FormContext } from '~/context/formulario/FormularioContext';
import { ModuloContext } from '~/context/modulo/ModuloContext';

interface Props {
  propiedadItem: PropiedadItem;
}

export const SeleccionGroup = ({ propiedadItem }: Props) => {
  const { setResultado } = useContext(FormContext);
  const { modulo, moduloIndice, getIndiceItem } = useContext(ModuloContext);

  const modifyArray = (id: string, checked) => {
    console.log(id);
    handleValueChange(id.toString());
  };

  const handleValueChange = (id: string) => {
    setResultado(propiedadItem.id, {
      idModulo: modulo.id,
      idPropiedadItem: propiedadItem.id,
      indiceItem: getIndiceItem(propiedadItem.id),
      indiceModulo: moduloIndice,
      isColeccionable: false,
      latitud: '',
      longitud: '',
      valor: id,
    });
  };

  return (
    <View>
      {propiedadItem.item.opciones.map(opcion => {
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

