import React, {
  createContext,
  useMemo,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import {
  Resultado,
  PropiedadItem,
  PropiedadModulo,
  Formulario,
} from '~/api/types';
import { setStorageResultados, getStorageResultados } from '~/storage';

export interface FormContext {
  getResultado: (
    moduloId: number,
    propiedadItemId: number,
  ) => Resultado | undefined;
  setResultado: (
    moduloId: number,
    propiedadItem: PropiedadItem,
    resultado: Resultado,
  ) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  setCurrentPage: (page: number) => void;
  isValid: boolean;
  currentPage: number;
  moduloPages: PropiedadModulo[][];
}

function useModuloPages(formulario: Formulario): PropiedadModulo[][] {
  const pages = new Map<number, PropiedadModulo[]>();
  formulario.propiedadModulos.forEach(modulo => {
    const modulos = pages.get(modulo.pagina) ?? [];
    pages.set(modulo.pagina, [...modulos, modulo]);
  });
  const values = [...pages.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([, modulos]) => modulos);
  values.forEach(modulo => {
    modulo.sort((a, b) => a.orden - b.orden);
  });
  return values;
}

export const FormContext = createContext<FormContext>({} as any);

//Provider
export const FormProvider = ({
  children,
  otID,
  formulario,
}: {
  children: ReactNode;
  otID: number;
  formulario: Formulario;
}) => {
  const [resultados, setResultados] = useState<Resultado[]>();
  const moduloPages = useModuloPages(formulario);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const getResultado = useCallback(
    (moduloId: number, propiedadItemId: number) => {
      return resultados?.find(
        res =>
          res.idModulo === moduloId && res.idPropiedadItem === propiedadItemId,
      );
    },
    [resultados],
  );

  const setResultado = useCallback(
    async (
      moduloId: number,
      propiedadItem: PropiedadItem,
      resultado: Resultado,
    ) => {
      if (!resultados) {
        throw new Error('resultados debe existir');
      }
      let itemResIndex = resultados.findIndex(
        res =>
          res.idModulo === moduloId && res.idPropiedadItem === propiedadItem.id,
      );
      const newResultados = [...resultados];
      if (itemResIndex === -1) {
        newResultados.push(resultado);
      } else {
        newResultados[itemResIndex] = resultado;
      }
      setResultados(newResultados);
      await setStorageResultados(newResultados, otID);
    },
    [resultados, otID],
  );

  useEffect(() => {
    (async () => {
      const result = (await getStorageResultados(otID)) ?? [];
      setResultados(result);
    })();
  }, [otID]);

  const isValid = useMemo(() => {
    return formulario.propiedadModulos.every(mod => {
      return mod.modulo.propiedadItems.every(item => {
        return (
          !item.requerido || getResultado(mod.modulo.id, item.id)?.valor[0]
        );
      });
    });
  }, [formulario, getResultado]);

  const goToNextPage = useCallback(() => {
    setCurrentPage(v => v + 1);
  }, []);

  const goToPreviousPage = useCallback(() => {
    setCurrentPage(v => v - 1);
  }, []);

  const value = useMemo(
    () => ({
      getResultado,
      setResultado,
      goToNextPage,
      goToPreviousPage,
      setCurrentPage,
      isValid,
      currentPage,
      moduloPages,
    }),
    [
      getResultado,
      setResultado,
      goToNextPage,
      goToPreviousPage,
      setCurrentPage,
      isValid,
      currentPage,
      moduloPages,
    ],
  );

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};
