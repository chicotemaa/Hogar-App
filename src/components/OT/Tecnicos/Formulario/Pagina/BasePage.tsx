import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { windowHeight, windowWidth } from '../../../../../../App'
import { Encabezado } from './Componentes/Encabezado'
import { BodyOT } from './Componentes/BodyOT'
import { Formulario, OrdenTrabajo } from './interfaces'
import { getFormularioAPI } from '../../../../../api/api'
import { FormProvider } from '../../../../../context/fomulario/FormularioContext'
import { Button, Dialog, Portal } from 'react-native-paper'
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from '@react-navigation/native'

interface Props {
    OrdenTrabajo: OrdenTrabajo
}

export const BasePage = ({ OrdenTrabajo }: Props) => {
    const [formulario, setFormulario] = useState<Formulario>()
    const [loading, setLoading] = useState(true)
    const navigator = useNavigation()

    //Para firma
    const [visible, setVisible] = React.useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);


    const finalizadoHandler = () => {
        console.log('finalizando')
        showDialog()
        //navigator.navigate('SuccessScreen', {success:true})
    }

    const postergarHandler = () => {
        console.log('postergar')
    }

    const guardarHandler = () => {
        console.log('guardando')
    }

    useEffect(() => {
        getFormularioAPI(OrdenTrabajo.formulario.id).then((response) => {
            setFormulario(response)
            setLoading(false)
        })
    }, [])

    return (
        <>
            {loading ? (
                <View>
                    <Spinner
                        visible={loading}
                        textContent={'Cargando formulario...'}
                        textStyle={{ color: '#FFF' }}
                    />
                </View>
            ) : (
                <View style={styles.page}>
                    <Encabezado OrdenTrabajo={OrdenTrabajo} />
                    
                        <View style={{ flex: 1 }}>
                            <Portal>
                                <Dialog visible={visible} onDismiss={hideDialog}>
                                    <Dialog.Title>Alert</Dialog.Title>
                                    <Dialog.Content>
                                        <Text>Firma</Text>
                                    </Dialog.Content>
                                    <Dialog.Actions>
                                        <Button onPress={hideDialog}>Done</Button>
                                    </Dialog.Actions>
                                </Dialog>                                
                            </Portal>
                            <FormState>
                                {formulario ? <BodyOT Formulario={formulario} /> : null}
                                </FormState>
                        </View>
                        <View style={styles.footer}>
                            <Button mode="text" icon="clock" labelStyle={{ color: 'red' }} onPress={postergarHandler}>
                                Postergar
                            </Button>
                            <Button mode="text" icon="draw" labelStyle={{ color: 'blue' }} onPress={finalizadoHandler}>
                                Firmar
                            </Button>
                            <Button mode="text" labelStyle={{ color: 'green' }} onPress={guardarHandler}>
                                Guardar
                            </Button>
                        </View>
                </View>
            )
            }</>
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        marginVertical: 0.005 * windowHeight,
        marginHorizontal: 0.005 * windowWidth,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: 'red',
    }
})


const FormState = ({ children }: any) => {
    return (
        <FormProvider>
            {children}
        </FormProvider>
    )
}