import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { windowHeight, windowWidth } from '../../../../../../../App';
import { BaseCampo } from '../../Campos/BaseCampo';
import { ModuloProps } from '../interfaces';

interface Props {
    Items: ModuloProps
}

export const Modulo = ({ Items }: Props) => {
    return (

        <View>
            <View style={{marginTop: 0.03*windowHeight }}>
                <Text style={styles.title}>{Items.titulo}</Text>
            </View>
            <View style={styles.container}>
                {
                    Items.propiedadItems.map((item) => {
                        return (<BaseCampo item={item} />)
                    })
                }
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        marginVertical: 0.03 * windowHeight
    },
    title:{
        fontSize: 0.02 * windowHeight
    },
    page: {
        paddingHorizontal: 0.005 * windowWidth,
    }
});
