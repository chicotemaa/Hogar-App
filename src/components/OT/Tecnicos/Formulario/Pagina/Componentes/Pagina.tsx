import React from 'react'
import { Text, View } from 'react-native'
import { Modulo } from '../interfaces'

interface Props {
    Modulos: Modulo[];
    Pagina: number;
}

export const Pagina = ({ Modulos, Pagina }: Props) => {
    return (
        <View style={{ borderWidth: 3 }}>
            <Text>Página: {Pagina}</Text>
        </View>
    )
}
