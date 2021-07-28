import * as React from 'react';
import { Text } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { Item } from '../Pagina/interfaces';

interface Props {
    item:Item
}

export const Seleccion = ({item}:Props) => {
    const [checked, setChecked] = React.useState(false);
    const opciones = []
    //TODO: controlar que valores estan seleccionados

    return (
        <>
            {item.item.opciones.map((opcion)=> {
                return(
                    <Checkbox.Item
                        key={opcion.id}
                        label={opcion.nombre}
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => {
                            console.log(opcion.nombre)
                            setChecked(!checked);
                        }}                        
                    />
                )
            })}            
        </>
    );
};