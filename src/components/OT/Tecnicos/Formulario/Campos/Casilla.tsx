import * as React from 'react';
import { useContext } from 'react';
import { Text, View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { CampoContext } from '../../../../../context/campo/CampoContext';
import { Item } from '../Pagina/interfaces';
import { BaseCampo } from './BaseCampo';

interface Props {
    item: Item
}

export const Casilla = ({ item }: Props) => {
    const [value, setValor] = React.useState('');
    let opciones = []


    const { campoState, setValue, setOpcionDepende } = useContext(CampoContext)

    const handleChangeValue = (value) => {
        setValor(value)
        //TODO: Controlar el desencadenamiento de items hijos en base a la opcion elegida
        if (!item.opcionDepende) {
            setValue(value)
            console.log(campoState)
        }

        if (item.propiedadItems.length > 0) {
            console.log('aca viene a cambiar set opcion')
            setOpcionDepende(value)
        }

    }


    return (
        <RadioButton.Group onValueChange={value => handleChangeValue(value)} value={value}>
            {item.item.opciones.map((opcion) => {
                const opcionItem = opcion.id.toString()
                opciones.push(opcionItem)
                return (
                    <RadioButton.Item key={opcion.id} label={opcion.nombre} value={opcionItem} />
                )
            }
            )}
        </RadioButton.Group>
    );
};