import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { windowHeight, windowWidth } from '../../../../../../../App';


import { Modulo as ModuloProps } from '../interfaces';

interface Props {
    Modulo: ModuloProps;
}

export const Modulo = ({ Modulo }: Props) => {
    return (
        <View style={styles.container}>
            <Text>{Modulo.paginaNombre}</Text>
            <Text>{Modulo.paginaNombre}</Text>
            <Text>{Modulo.paginaNombre}</Text>
            <Text>{Modulo.paginaNombre}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        marginHorizontal: 0.02 * windowWidth,
        marginVertical: 0.03 * windowHeight
    },
    stepIndicator: {
        marginVertical: 10,
    },
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
