import React from 'react'
import { Text, View } from 'react-native'
import { Item as ItemProps } from '../interfaces'

interface Props {
    Item: ItemProps
}

export const Item = ({ Item }: Props) => {
    return (
        <View style={{ backgroundColor: 'white', padding: 5, margin: 5 }}>
            <Text>Tipo de campo: {Item.item.tipo}</Text>
        </View>
    )
}
