import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Header } from '../../components/Header'
import { Casilla } from '../../components/Tecnicos/Formulario/Campos/Casilla'
import { Seleccion } from '../../components/Tecnicos/Formulario/Campos/Seleccion'
import { DateInput } from '../../components/Tecnicos/Formulario/Campos/Date'
import { styles } from '../../theme/appTheme'
import { Texto } from '../../components/Tecnicos/Formulario/Campos/Texto'
import { Desplegable } from '../../components/Tecnicos/Formulario/Campos/Desplegable'
import { Foto } from '../../components/Tecnicos/Formulario/Campos/Foto'

export const OTScreen = ({ route }) => {
    const { OT } = route.params

    return (
        <>
            <Header pageName="Orden de Trabajo" roleUser={'tecnico'} id={OT.id} />
            <View style={styles.container}>
                <Text>Orden de trabajo</Text>
                <ScrollView>
                    <Casilla />
                    <Seleccion />
                    <DateInput />
                    <Texto />
                    <Desplegable />
                    <Foto />

                </ScrollView>
            </View>
        </>
    )
}
