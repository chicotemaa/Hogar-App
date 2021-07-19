import React from 'react'
import { StyleSheet } from 'react-native'
import { Text, View } from 'react-native'
import { Seleccion } from './Seleccion'
import { Texto } from './Texto'

export const BaseCampo = ({item}) => {
    console.log(item)
    const ancho = item.ancho + '%'
    return (
        <View style={[styles.container, { width:ancho}]}>            
            {Item(item)}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        height:100,
        borderWidth:1,
    }
}) 

const Item = (item) => {
    let campo = null;
    switch(item.item.tipo){
        case 'texto':
            campo = (<Texto />)
            break;
        case 'foto':
            campo = <Text>Es foto</Text>
            break;
        case 'seleccion_multiple':
            campo = (<Seleccion />)
            break;
        default:
            null;
    }

    return campo;

}