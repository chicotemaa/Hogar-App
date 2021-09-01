import React, {
  createContext,
  useMemo,
  ReactNode,
  useCallback,
  useContext,
} from 'react';
import { PropiedadModulo, Resultado, PropiedadItem } from '~/api/types';
import { FormContext } from '../formulario/FormularioContext';

export type PartialResultado = Pick<
  Resultado,
  'valor' | 'imageName' | 'imageSize'
>;

export interface ModuloContext {
  modulo: PropiedadModulo;
  moduloIndice: number;
  getResultado: (propiedadItemId: number) => Resultado | undefined;
  setResultado: (
    propiedadItem: PropiedadItem,
    resultado: PartialResultado,
  ) => void;
}

interface ProviderProps {
  children: ReactNode;
  modulo: PropiedadModulo;
  moduloIndice: number;
}

export const ModuloContext = createContext<ModuloContext>({} as any);

export const ModuloProvider = ({
  children,
  modulo,
  moduloIndice,
}: ProviderProps) => {
  const { getResultado: getFormResultado, setResultado: setFormResultado } =
    useContext(FormContext);

  const getResultado = useCallback(
    (propiedadItemId: number) => getFormResultado(modulo.id, propiedadItemId),
    [getFormResultado, modulo.id],
  );

  const setResultado = useCallback(
    (propiedadItem: PropiedadItem, resultado: PartialResultado) => {
      const indiceItem = modulo.modulo.propiedadItems.findIndex(
        item => item.id === propiedadItem.id,
      );
      setFormResultado(modulo.id, propiedadItem, {
        idModulo: modulo.id,
        idPropiedadItem: propiedadItem.id,
        indiceItem,
        indiceModulo: moduloIndice,
        isColeccionable: false,
        latitud: '',
        longitud: '',
        propiedadItem: `/api/propiedad_items/${propiedadItem.id}`,
        ...resultado,
      });
    },
    [setFormResultado, modulo.id, modulo.modulo.propiedadItems, moduloIndice],
  );

  const value = useMemo<ModuloContext>(
    () => ({
      modulo,
      moduloIndice,
      getResultado,
      setResultado,
    }),
    [modulo, moduloIndice, getResultado, setResultado],
  );

  return (
    <ModuloContext.Provider value={value}>{children}</ModuloContext.Provider>
  );
};
