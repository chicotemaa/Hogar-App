import * as React from 'react';
import { Text } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { Item } from '../Pagina/interfaces';

interface Props {
    item: Item
}

export const Seleccion = ({ item }: Props) => {
    const [checked, setChecked] = React.useState(false);
    const [valueSelected, setValueSelected] = React.useState<number>()
    console.log('seleccion', item)

    return (
        <>
            {item.item.opciones.map((opcion) => {
                return (
                    <Checkbox.Item
                        key={opcion.id}
                        label={opcion.nombre}
                        status={valueSelected == opcion.id ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setValueSelected(opcion.id)
                            setChecked(!checked);
                        }}
                    />
                )
            })}
        </>
    );
};