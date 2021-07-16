import React, { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { geOtByUserAPI } from '../../../api/apiTecnicos'
import { ItemOT } from '../../ItemOT'

interface detalleOT {
    id: string,
    estado: number,
    cliente: Cliente,
    fecha: string,
    sucursalStreet: string,
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

    useEffect(() => {
        geOtByUserAPI()
            .then((response) => {
                setListaOT(response)
                setLoading(false)
            })



    }, [])


    return (
        <View>
            <ScrollView>
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
                                date="13 Agosto 2020"
                                rol="tecnico"
                                goToScreen={() => {
                                    console.log('hola')
                                }}
                            />
                        )
                    })

                }

            </ScrollView>
        </View>
    )
}
