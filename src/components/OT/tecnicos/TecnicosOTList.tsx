import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { ScrollView, View, RefreshControl } from 'react-native'
import { getOtByUserAPI, getFormOTAPI } from '../../../api/apiTecnicos'
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
                console.log('aca entro')
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
                            <TransitionView index={1} isOT>
                                <ItemOT
                                    key={OT.id}
                                    id={OT.id}
                                    estadoOT={OT.estado}
                                    cliente={OT.cliente.razonSocial}
                                    titulo={OT.formulario.descripcion}
                                    location="Sarmiento 123"
                                    date={OT.fecha}
                                    rol="tecnico"
                                    goToScreen={() => {
                                        console.log('va a entrar al detalle')
                                    }}
                                />
                            </TransitionView>
                        )
                    })

                }

            </ScrollView>
        </View>
    )
}
