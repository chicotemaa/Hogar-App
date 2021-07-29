import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { ScrollView, View, RefreshControl } from 'react-native'
import { getOtByUserAPI } from '../../../api/apiTecnicos'
import { ItemOT } from '../../ItemOT'
import { TransitionView } from '../../TransitionView'

interface detalleOT {
    id: number,
    estado: number,
    cliente: Cliente,
    fecha: string,
    SucursalDeCliente: string,
    comentario?: string,
    formulario: Formulario,
}

interface Formulario {
    id: number,
    descripcion: string,
    titulo: string,
}

interface Cliente {
    razonSocial: string
}

export const TecnicosOTList = () => {
    const [listaOT, setListaOT] = useState<detalleOT[]>([])
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = React.useState(false);
    const stackNavigator = useNavigation();
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getOtByUserAPI()
            .then((response) => {
                setListaOT([])
                setListaOT(response)
            })
        setTimeout(() => {
            setRefreshing(false)
        }, 2000)
    }, []);

    useEffect(() => {
        getOtByUserAPI()
            .then((response) => {
                setListaOT(response)
                setLoading(false)
            })
    }, [])

    return (
        <View>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                } >
                {loading ? null :
                    listaOT.map((OT) => {
                        console.log(OT)
                        return (
                            <TransitionView key={OT.id} animation='slideInUp' index={0} isOT>
                                <ItemOT
                                    id={OT.id}
                                    estadoOT={OT.estado}
                                    cliente={OT.cliente.razonSocial}
                                    titulo={OT.formulario.titulo}
                                    location={'Sarmiento 123'}
                                    date={OT.fecha}
                                    rol="tecnico"
                                    goToScreen={(estado: string) => {
                                        if (estado === 'realizarOT') {
                                            //TODO: controlar ubicacion
                                            stackNavigator.navigate('OTScreen', { OT })
                                        } else if (estado = 'detalleOTRealizada') {
                                            stackNavigator.navigate('DetalleOTScreen')
                                        }
                                    }}
                                /></TransitionView>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}
