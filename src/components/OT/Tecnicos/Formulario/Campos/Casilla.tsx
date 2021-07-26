import * as React from 'react';
import { useContext } from 'react';
import { RadioButton } from 'react-native-paper';
import { CampoContext } from '../../../../../context/campo/CampoContext';
import { FormContext } from '../../../../../context/fomulario/FormularioContext';
import { Item } from '../Pagina/interfaces';

interface Props {
    item: Item
}

export const Casilla = ({ item }: Props) => {
    const [value, setValor] = React.useState('');
    let opciones = []


    const { campoState, setValue } = useContext(CampoContext)

    const handleChangeValue = (value) => {
        setValue(value)
        console.log(campoState)
        setValor(value)
    }

    return (
        <RadioButton.Group onValueChange={value => handleChangeValue(value)} value={value}>
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