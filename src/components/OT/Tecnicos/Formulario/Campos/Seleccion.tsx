import * as React from 'react';
import { Text } from 'react-native';
import { View } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { Item } from '../Pagina/interfaces';

interface Props {
    item: Item
}


export const SeleccionGroup = ({ item }: Props) => {
    console.log('seleccion group',item)
    const valuesSelected = []

    const SeleccionContext = React.useContext({})

    const { item : { opciones }} = item;

    return (
        <View>
            {
                opciones.map(opcion => {
                    return (<Seleccion opcion={opcion} />)
                })
            }
        </View>
    )
}

const Seleccion = ({ opcion }) => {
    const [checked, setChecked] = React.useState(false);

    return (
        <Checkbox.Item
            key={opcion.id}
            label={opcion.nombre}
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
                setChecked(!checked);
            }}
        />
    )
};

