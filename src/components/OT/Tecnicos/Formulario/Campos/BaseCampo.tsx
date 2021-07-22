import React from 'react'
import { StyleSheet } from 'react-native'
import { Text, View } from 'react-native'
import { windowWidth } from '../../../../../../App'
import { Desplegable } from './Desplegable'
import { Seleccion } from './Seleccion'
import { Texto } from './Texto'

export const BaseCampo = ({ item }) => {
    console.log('item', item)
    return (
        <View style={styles.containerItem}>
            <Text style={styles.titleItem}>{item.item.titulo}</Text>
            <Text style={{ color: 'red' }}>{item.requerido ? 'Es requerido' : null}</Text>
            <View style={styles.campo}>
                {Campo(item)}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerItem: {
        margin: 10,
        borderLeftWidth: 2,
        borderLeftColor: 'blue',
        backgroundColor: 'white',
        paddingHorizontal: 5,
        paddingVertical: 10,
    },
    titleItem: {
        marginVertical: 4,
        fontSize: 0.03 * windowWidth,
    },
    campo: {
        marginVertical: 5
    }
})

const Campo = (item) => {
    let campo = null;
    switch (item.item.tipo) {
        case 'texto':
            campo = (<Texto />)
            console.log('es texto')
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