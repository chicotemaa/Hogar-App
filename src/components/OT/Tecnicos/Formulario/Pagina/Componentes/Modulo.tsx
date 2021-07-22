import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { windowHeight, windowWidth } from '../../../../../../../App';
import { BaseCampo } from '../../Campos/BaseCampo';
import { ModuloProps } from '../interfaces';
import { Item } from './Item';



interface Props {
    Items: ModuloProps
}

export const Modulo = ({ Items }: Props) => {
    return (

        <View>
            <View style={{ borderWidth: 1, borderColor: 'green', marginVertical: 5 }}>
                <Text>{Items.titulo}</Text>
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
    page: {
        paddingHorizontal: 0.005 * windowWidth,
    }
});
