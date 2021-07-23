import * as React from 'react';
import { RadioButton } from 'react-native-paper';
import { Item } from '../Pagina/interfaces';

interface Props{
    item: Item
}

export const Casilla = ({item}:Props) => {
    const [value, setValue] = React.useState('');
    let opciones = []

    return (
        <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
            {item.item.opciones.map((opcion) => {
                const opcionItem = opcion.id.toString()
                opciones.push(opcionItem)
                return (
                    <RadioButton.Item label={opcion.nombre} value={opcionItem} />
                )
            }
            )}
        </RadioButton.Group>
    );
};