import React, { useEffect, useState } from 'react'
import { ScrollView, View, RefreshControl } from 'react-native'
import { geOtByUserAPI, getFormOTAPI } from '../../../api/apiTecnicos'
import { ItemOT } from '../../ItemOT'

interface detalleOT {
    id: string,
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

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        geOtByUserAPI()
            .then((response) => {
                setListaOT(response)
                console.log('aca entro')
            })
        setTimeout(() => {
            setRefreshing(false)
        }, 2000)
    }, []);

    useEffect(() => {
        geOtByUserAPI()
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
                            <ItemOT
                                key={OT.id}
                                id={OT.id}
                                estado={OT.estado}
                                cliente={OT.cliente.razonSocial}
                                titulo={OT.formulario.descripcion}
                                location="Sarmiento 123"
                                date={OT.fecha}
                                rol="tecnico"
                                goToScreen={() => {
                                    const a = getFormOTAPI(OT.id)
                                }}
                            />
                        )
                    })

                }

            </ScrollView>
        </View>
    )
}
