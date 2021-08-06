import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { ScrollView, View, RefreshControl, Text } from 'react-native'
import { useQuery } from 'react-query'
import { OrdenTrabajo } from '../../../services/interfaces'
import { getOrdenesTrabajoInfo } from '../../../services/tecnicosServices'
import { ItemOT } from '../../ItemOT'
import { TransitionView } from '../../TransitionView'


export const TecnicosOTList = () => {
    const queryOrdenesTrabajo = useQuery('OTList', getOrdenesTrabajoInfo)

    const [refreshing, setRefreshing] = React.useState(false);
    const stackNavigator = useNavigation();

    const onRefresh = React.useCallback(() => {
        setRefreshing(true)
        queryOrdenesTrabajo.refetch
        setRefreshing(false)
    }, []);

    if(queryOrdenesTrabajo.isError){
        return (<View><Text>Error al obtener el listado de las ot {queryOrdenesTrabajo.error}</Text></View>)
    }

    const EmptyList = () => {return (<View><Text>No hay ot cargadas</Text></View>)}
    

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                } >
                {queryOrdenesTrabajo.data && (
                queryOrdenesTrabajo.data.length === 0 ? <EmptyList /> :
                queryOrdenesTrabajo.data.map((OT: OrdenTrabajo) => {
                        return (
                            <TransitionView key={OT.id} animation='slideInUp' index={0} isOT>
                                <ItemOT
                                    OT={OT}
                                    id={OT.id}
                                    estadoOT={OT.estado}
                                    cliente={OT.cliente.razonSocial}
                                    titulo={OT.formulario.titulo}
                                    location={OT.direccionSucursalCliente}
                                    date={OT.fecha}
                                    rol="tecnico"
                                    horaDesde={OT.horaDesde}
                                    horaHasta={OT.horaHasta}
                                    goToScreen={(estado: string) => {
                                        if (estado === 'realizarOT') {
                                            //TODO: controlar ubicacion
                                            stackNavigator.navigate('OTScreen', { OT })
                                        } else if (estado = 'detalleOTRealizada') {
                                            stackNavigator.navigate('DetalleOTScreen')
                                        }
                                    }}
                                />
                            </TransitionView>
                        )
                    })
                )}
            </ScrollView>
        </View>
    )
}

const EmptyList = () => {
    return (
        <View style={{ flex: 1 }}>
            {(<Text>No hay ot pendientes</Text>)}
        </View>)
}