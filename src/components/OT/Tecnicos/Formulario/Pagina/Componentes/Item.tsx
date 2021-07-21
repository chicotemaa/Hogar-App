import React from 'react'
import { Text, View } from 'react-native'
import { Item as ItemProps } from '../interfaces'

interface Props {
    Item: ItemProps
}

export const Item = ({ Item }: Props) => {
    console.log('componente item', Item)

    return (
        <View>
            <Text>Tipo de campo: {Item.item.tipo}</Text>
        </View>
    )
}
