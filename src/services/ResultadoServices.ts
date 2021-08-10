import { Formulario, Item, ModuloProps } from "./interfaces";

export const buildResult = (formulario: Formulario) => {
    const { propiedadModulos, id } = formulario;

    return {
        id,
        modulos: propiedadModulos.map(({ id, modulo }) => {
            return {
                moduloId: id,
                moduloItems: getModulo(modulo)
            }
        })
    }
}

const getModulo = (modulo: ModuloProps) => {
    return {
        id: modulo.id,
        items: getItems(modulo.propiedadItems)
    }
}

const getItems = (Items: Item[]) => {
    return Items.map(item => {
        return {
            id: item.id,
            itemProps: getItemProps(item)
        }
    })

}

const getItemProps = (Item) => {
    //console.log('esto tiene item', Item)
    return {
        id: Item.id,
        tipo: Item.item.tipo,
        requerido: Item.requerido,
        opciones: Item.item.opciones,
        cantidadMinima: Item.cantidadMinima,
        value: null,
    }
}


export const getResults = (values) => {
    console.log(values)
}

export const postResultado = () => {
    const body = {
        resultados: [{
            valor: [
                "resultado prueba"
            ],
            propiedadItem: "api/propiedad_items/2444",
            imageName: "string",
            imageSize: 0,
            latitud: "123",
            longitud: "456",
            indiceItem: 0,
            indiceModulo: 0,
            idModulo: 0,
            isColeccionable: false
        }
        ],
        latitud: '12345',
        longitud: '000000',
        ordenTrabajo: '/api/orden_trabajos/4897',
        minutosTrabajados: 16,
        minutosReales: 6
    }
}