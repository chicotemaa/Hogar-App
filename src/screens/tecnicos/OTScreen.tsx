import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Header } from '../../components/Header'
import { styles } from '../../theme/appTheme'
import { StackScreenProps } from '@react-navigation/stack'
import { BasePage } from '../../components/OT/Tecnicos/Formulario/Pagina/BasePage'

interface Props
    extends StackScreenProps<any, any> { }


export const OTScreen = ({ navigation, route }: Props) => {
    const { OT } = route.params


    return (
        <>
            <Header pageName="Orden de Trabajo" roleUser={'tecnico'} />                                
            <View style={[styles.container, { paddingHorizontal: 0 }]}>
                <BasePage OrdenTrabajo={OT} />
            </View>                  
        </>
    )
}

