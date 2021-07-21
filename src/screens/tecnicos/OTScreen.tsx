import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Header } from '../../components/Header'
import { Casilla } from '../../components/Tecnicos/Formulario/Campos/Casilla'
import { Seleccion } from '../../components/Tecnicos/Formulario/Campos/Seleccion'
import { DateInput } from '../../components/Tecnicos/Formulario/Campos/Date'
import { styles } from '../../theme/appTheme'
import { Texto } from '../../components/Tecnicos/Formulario/Campos/Texto'
import { Desplegable } from '../../components/Tecnicos/Formulario/Campos/Desplegable'
import { Button } from '../../components/Button'
import { StackScreenProps } from '@react-navigation/stack'
import { getFormularioAPI } from '../../api/api'
import { BaseCampo } from '../../components/Tecnicos/Formulario/Campos/BaseCampo'


interface Props
  extends StackScreenProps<any, any> {}


interface PropiedadItem {
    id:number;
    requerido:boolean;
    item: Item;
}

interface Item {
    descripcion:string;
    nombre:string;
    id:number;
    tipo:string;
    opciones: Array<any>;
}
  
export const OTScreen = ({ navigation, route }:Props) => {
    const { OT } = route.params
    const [modulos, setModulos] = useState([])

    useEffect(() => {
        getFormularioAPI(OT.formulario.id).then(formulario => {
            setModulos(formulario.propiedadModulos)
        })
    }, [])

    return (
        <>
            <Header pageName="Orden de Trabajo" roleUser={'tecnico'} id={OT.id} />
            <View style={styles.container}>                
                <ScrollView>
                    { modulos != null ? (modulos.map(({modulo}) => {                  
                        const {propiedadItems} = modulo;
                        //TODO: controlar a que pagina y modulo pertenecen y darle key 
                        return propiedadItems.map((item:PropiedadItem) => {
                            return buildItem(item)
                        })
                    })) : null }            
                    
                </ScrollView>
            </View>
        </>
    )
}


const buildItem = (item:PropiedadItem) => {    
    return (<BaseCampo item={item} />)
}