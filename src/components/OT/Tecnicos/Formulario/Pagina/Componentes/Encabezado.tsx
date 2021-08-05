import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Divider } from 'react-native-paper'
import { windowWidth } from '../../../../../../../App'
import { OrdenTrabajo } from '../../../../../../services/interfaces'

interface Props {
    OrdenTrabajo: OrdenTrabajo
}


export const Encabezado = ({ OrdenTrabajo }: Props) => {
    return (
        <View>
            <View >
                <Text style={styles.id}>#{OrdenTrabajo.id}</Text>
                <Text style={styles.title}>{OrdenTrabajo.formulario.descripcion}</Text>
            </View>
            <Divider />
        </View>
    )
}



const styles = StyleSheet.create({
    id: {
        padding: 3,
        color: 'red',
        fontSize: 0.04 * windowWidth,
        fontWeight: 'bold'
    },
    title: {
        fontSize: 0.06 * windowWidth,
        fontWeight: '600',
        textTransform: 'capitalize',
        textAlign: 'center'
    }
})