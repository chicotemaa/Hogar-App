import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { windowHeight, windowWidth } from '../../../../../../App'
import { Encabezado } from './Componentes/Encabezado'
import { BodyOT } from './Componentes/BodyOT'
import { Formulario, OrdenTrabajo } from './interfaces'
import { getFormularioAPI } from '../../../../../api/api'
import { FormProvider } from '../../../../../context/fomulario/FormularioContext'

interface Props {
    OrdenTrabajo: OrdenTrabajo
}

export const BasePage = ({ OrdenTrabajo }: Props) => {
    const [formulario, setFormulario] = useState<Formulario>(null)

    useEffect(() => {
        getFormularioAPI(OrdenTrabajo.formulario.id).then((response) => {
            setFormulario(response)
            console.log('from base page ',response)
        })
    }, [])

    return (        
        <View style={styles.page}>
            <Encabezado OrdenTrabajo={OrdenTrabajo} />
            <View style={{flex:1}}>
                <FormState>
                    {formulario ? <BodyOT Formulario={formulario} /> : null}                
                </FormState>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        marginVertical: 0.005 * windowHeight,
        marginHorizontal: 0.005 * windowWidth,
    }
})


const FormState = ({children}:any) => {
    return (
      <FormProvider>
        {children}
      </FormProvider>
    )
}