import React from 'react'
import { Text, View } from 'react-native'
import { windowHeight } from '../../../../../../../App'
import { Modulo } from '../interfaces'
import { Modulo as ModulosItem } from './Modulo'

interface Props {
    Modulos: Modulo[];
}

export const Pagina = ({ Modulos }: Props) => {
    //TODO: Agregar scrollview 
    console.log(Modulos)
    return (
        <View style={{ paddingHorizontal:10, paddingVertical:5 }}>
            <Text style={{ textTransform: 'uppercase', fontWeight: 'bold', fontSize: 0.022*windowHeight }}>{Modulos[0].paginaNombre}</Text>
            {Modulos.map((modulo) => {
                return (
                    <ModulosItem Modulo={modulo} Items={modulo.modulo} />
                )
            })}
        </View>
    )
}
