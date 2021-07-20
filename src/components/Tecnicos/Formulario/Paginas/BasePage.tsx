import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { windowHeight } from '../../../../../App'

interface Props {
    OrdenTrabajo: OrdenTrabajo
}

interface OrdenTrabajo {
    SucursalDeCliente: string;
    cliente: Cliente;
    comentario:string;
    estado:number;
    fecha:string;
    horaDesde:string;
    horaHasta:string;
    id:number;
    latitud:string;
    latitudCierre:string;
    longitud:string;
    longitudCierre:string;
}

interface Cliente {
    id:string;
    nombre:string;
    apellido:string;
    razonSocial:string;
    street:string
}

export const BasePage = ({OrdenTrabajo}: Props) => {
    console.log(OrdenTrabajo)
    return (
        <View style={styles.page}>   
            <Text>
                {OrdenTrabajo.id}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    page:{
        borderWidth:1, flex:1, marginVertical:0.02*windowHeight
    }
})