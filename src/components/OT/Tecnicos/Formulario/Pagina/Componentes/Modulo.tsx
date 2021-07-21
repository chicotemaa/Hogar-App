import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { windowHeight, windowWidth } from '../../../../../../../App';
import { ModuloProps } from '../interfaces';
import { Item } from './Item';



interface Props {
    Items: ModuloProps
}

export const Modulo = ({ Items }: Props) => {
    return (
        <>
            <View style={{ borderWidth: 1, borderColor: 'green', marginVertical: 5 }}>
                <Text>{Items.titulo}</Text>
            </View>
            <View style={{ borderWidth: 1, paddingVertical: 1, borderColor: 'blue' }}>
                {
                    Items.propiedadItems.map((item) => {
                        return (<Item Item={item} />)
                    })
                }
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        marginHorizontal: 0.02 * windowWidth,
        marginVertical: 0.03 * windowHeight
    },
    stepIndicator: {
        marginVertical: 10,
    },
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
