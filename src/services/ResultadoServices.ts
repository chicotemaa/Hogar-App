import { Formulario, Item, ModuloProps } from './interfaces';

export const buildResult = (formulario: Formulario) => {
  const { propiedadModulos, id } = formulario;

  return {
    id,
    modulos: propiedadModulos.map(({ id, modulo }) => {
      return {
        moduloId: id,
        moduloItems: getModulo(modulo),
      };
    }),
  };
};

const getModulo = (modulo: ModuloProps) => {
  return {
    id: modulo.id,
    items: getItems(modulo.propiedadItems),
  };
};

const getItems = (Items: Item[]) => {
  return Items.map(item => {
    return {
      id: item.id,
      itemProps: getItemProps(item),
    };
  });
};

const getItemProps = Item => {
  //console.log('esto tiene item', Item)
  return {
    id: Item.id,
    tipo: Item.item.tipo,
    requerido: Item.requerido,
    opciones: Item.item.opciones,
    cantidadMinima: Item.cantidadMinima,
    value: null,
  };
};

export const getResults = values => {
  console.log(values);
};

// export const postResultado = () => {

// };
