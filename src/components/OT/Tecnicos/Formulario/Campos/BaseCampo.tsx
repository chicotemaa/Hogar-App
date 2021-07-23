import React from 'react'
import { StyleSheet } from 'react-native'
import { Text, View } from 'react-native'
import { windowWidth } from '../../../../../../App'
import { Item } from '../Pagina/interfaces'
import { Casilla } from './Casilla'
import { Desplegable } from './Desplegable'
import { Seleccion } from './Seleccion'
import { Texto } from './Texto'

interface Props {
    item : Item
}

export const BaseCampo = ({ item }:Props) => {
    return (
        <View style={styles.containerItem}>
            <Text style={styles.titleItem}>{item.id}{item.item.titulo}</Text>
            <Text style={{ color: '#B00020', fontWeight:'700' }}>{item.requerido ? 'Es requerido' : null}</Text>
            <View style={styles.campo}>
                {Campo(item)}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerItem: {
        marginVertical: 2,
        borderLeftWidth: 2,
        borderLeftColor: 'blue',
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    titleItem: {
        marginVertical: 4,
        fontSize: 0.035 * windowWidth,
        fontWeight:'bold'
    },
    campo: {
        marginVertical: 5
    }
})

const Campo = (item: Item) => {
    let campo = null;
    console.log(item.item.tipo)

    switch (item.item.tipo) {
        case 'texto':
            campo = (<Texto />)
            break;
        case 'foto':
            campo = <Text>Es foto</Text>
            break;
        case 'seleccion_multiple':
            campo = (<Casilla item={item}/>)
            break;
        case 'desplegable':            
            campo = (<Desplegable />)
            break
        case 'casilla_de_verificacion':
            campo = (<Seleccion item={item}/>)
        default:
            null;
    }

    return campo;

}