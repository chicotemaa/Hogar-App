import React, { createContext, useMemo, ReactNode, useCallback } from 'react';
import { PaginaModulo } from '~/api/types';

export interface ModuloContext {
  modulo: PaginaModulo;
  moduloIndice: number;
  getIndiceItem: (propiedadItemId: number) => number;
}

interface ProviderProps {
  children: ReactNode;
  modulo: PaginaModulo;
  moduloIndice: number;
}

export const ModuloContext = createContext<ModuloContext>({} as any);

//Provider
export const ModuloProvider = ({
  children,
  modulo,
  moduloIndice,
}: ProviderProps) => {
  const getIndiceItem = useCallback(
    (propiedadItemId: number) =>
      modulo.modulo.propiedadItems.findIndex(
        item => item.id === propiedadItemId,
      ),
    [modulo],
  );

  const value = useMemo<ModuloContext>(
    () => ({
      modulo,
      moduloIndice,
      getIndiceItem,
    }),
    [modulo, moduloIndice, getIndiceItem],
  );

  return (
    <ModuloContext.Provider value={value}>{children}</ModuloContext.Provider>
  );
};
