import * as React from 'react';
import { RadioButton } from 'react-native-paper';

export const Casilla = () => {
    const [value, setValue] = React.useState('first');

    return (
        <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
            <RadioButton.Item label="First item" value="first" />
            <RadioButton.Item label="Second item" value="second" />
        </RadioButton.Group>
    );
};