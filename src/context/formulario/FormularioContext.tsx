import React, {
  createContext,
  useMemo,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { FormularioResultado, Resultado } from '~/api/types';
import {
  setStorageFormularioResultado,
  getStorageFormularioResultado,
} from '~/storage';

export interface FormContext {
  getResultado: (propiedadItemId: number) => Resultado | undefined;
  setResultado: (propiedadItemId: number, resultado: Resultado) => void;
}

export const FormContext = createContext<FormContext>({} as any);

//Provider
export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formularioResultado, setFormularioResultado] =
    useState<FormularioResultado>();

  const getResultado = useCallback(
    (propiedadItemId: number) => {
      return formularioResultado?.resultados.find(
        res => res.idPropiedadItem === propiedadItemId,
      );
    },
    [formularioResultado],
  );

  const setResultado = useCallback(
    async (propiedadItemId: number, resultado: Resultado) => {
      if (!formularioResultado) {
        throw new Error('formularioResultado debe existir');
      }
      let itemResIndex = formularioResultado.resultados.findIndex(
        res => res.idPropiedadItem === propiedadItemId,
      );
      const newResultados = [...formularioResultado.resultados];
      if (itemResIndex === -1) {
        newResultados.push(resultado);
      } else {
        newResultados[itemResIndex] = resultado;
      }
      const newFormularioResultado: FormularioResultado = {
        ...formularioResultado,
        resultados: newResultados,
      };
      setFormularioResultado(newFormularioResultado);
      await setStorageFormularioResultado(newFormularioResultado);
    },
    [formularioResultado],
  );

  useEffect(() => {
    (async () => {
      let result = await getStorageFormularioResultado();
      if (!result) {
        result = {
          resultados: [],
          latitud: '',
          longitud: '',
          minutosReales: 0,
          minutosTrabajado: 0,
        };
      }
      setFormularioResultado(result);
    })();
  }, []);

  const value = useMemo(
    () => ({ getResultado, setResultado }),
    [getResultado, setResultado],
  );

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};
