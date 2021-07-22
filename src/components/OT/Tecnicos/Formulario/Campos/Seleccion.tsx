import * as React from 'react';
import { Text } from 'react-native';
import { Checkbox } from 'react-native-paper';

export const Seleccion = () => {
    const [checked, setChecked] = React.useState(false);
    const [checked2, setChecked2] = React.useState(false);

    return (
        <>
            <Checkbox
                status={checked ? 'checked' : 'unchecked'}
                children={(<Text>hola</Text>)}
                onPress={() => {
                    setChecked(!checked);
                }}
            />
            <Checkbox
                status={checked2 ? 'checked' : 'unchecked'}
                onPress={() => {
                    setChecked2(!checked2);
                }}
            />
        </>
    );
};