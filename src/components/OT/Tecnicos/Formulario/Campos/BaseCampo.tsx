import React from 'react'
import { StyleSheet } from 'react-native'
import { Text, View } from 'react-native'
import { Desplegable } from './Desplegable'
import { Seleccion } from './Seleccion'
import { Texto } from './Texto'

export const BaseCampo = ({ item }) => {
    console.log(item)
    const ancho = '100%'
    return (
        <View style={{ margin: 10 }}>
            <Text>{item.item.titulo}</Text>
            {Campo(item)}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 100,
        borderWidth: 1,
    }
})

const Campo = (item) => {
    let campo = null;
    switch (item.item.tipo) {
        case 'texto':
            campo = (<Texto />)
            break;
        case 'foto':
            campo = <Text>Es foto</Text>
            break;
        case 'seleccion_multiple':
            campo = (<Seleccion />)
            break;
        case 'desplegable':
            campo = (<Desplegable />)
            break
        default:
            null;
    }

    return campo;

}