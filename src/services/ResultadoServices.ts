import { Formulario, Item, ModuloProps } from "./interfaces";

export const buildResult = (formulario : Formulario) => {
    const {propiedadModulos, id} = formulario;
    
    return {
        id,
        modulos : propiedadModulos.map(({id,  modulo})=> {
            console.log('modulo', modulo, id)
            return getModulo(modulo)
        })
    }
}

const getModulo = ({id}: ModuloProps) => {
    return {
        id:id,
    }
}

const getItems = (Items:Item[]) => {
    return Items.map((item)=> {
        return getItemValue(item)
    })
}

const getItemValue = (Item) => {
    return Item.id
}