import { Formulario, Item, ModuloProps } from './interfaces';

export const buildResult = (formulario: Formulario) => {
  const { propiedadModulos, id } = formulario;

  return {
    id,
    modulos: propiedadModulos.map(({ id: moduloId, modulo }) => {
      return {
        moduloId,
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

const getItemProps = (item: Item) => {
  //console.log('esto tiene item', Item)
  return {
    id: item.id,
    tipo: item.item.tipo,
    requerido: item.requerido,
    opciones: item.item.opciones,
    cantidadMinima: item.cantidadMinima,
    value: null,
  };
};
