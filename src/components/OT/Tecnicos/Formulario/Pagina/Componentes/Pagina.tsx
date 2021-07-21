import React from 'react'
import { Text, View } from 'react-native'
import { Modulo } from '../interfaces'
import { Modulo as ModulosItem } from './Modulo'

interface Props {
    Modulos: Modulo[];
}

export const Pagina = ({ Modulos }: Props) => {
    return (
        <View style={{ borderWidth: 3 }}>
            <Text>Titulo pagina: {Modulos[0].paginaNombre}</Text>
            {Modulos.map((modulo) => {
                return (
                    <ModulosItem Items={modulo.modulo} />
                )
            })}
        </View>
    )
}
