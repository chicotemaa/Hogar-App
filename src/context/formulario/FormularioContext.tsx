import React, {
  createContext,
  useMemo,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { Resultado, PropiedadItem } from '~/api/types';
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
}

export const FormContext = createContext<FormContext>({} as any);

//Provider
export const FormProvider = ({
  children,
  otID,
}: {
  children: ReactNode;
  otID: number;
}) => {
  const [resultados, setResultados] = useState<Resultado[]>();
  const getResultado = useCallback(
    (moduloId: number, propiedadItemId: number) => {
      //console.log('resultados value? ', resultados);
      return resultados?.resultados.find(
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
      console.log('resultados del set', resultados);
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

  const value = useMemo(
    () => ({ getResultado, setResultado }),
    [getResultado, setResultado],
  );

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};
