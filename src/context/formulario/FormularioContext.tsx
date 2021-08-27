import React, {
  createContext,
  useMemo,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { Resultado, PropiedadItem, Formulario } from '~/api/types';
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
  isValid: boolean;
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
    // return formulario.propiedadModulos.every(modulo => {
    //   return modulo.propiedadItems.every(item => {
    //     return !item.requerido || getResultado(modulo.id, item.id)?.valor[0];
    //   });
    // });
  }, []);

  const value = useMemo(
    () => ({ getResultado, setResultado, isValid }),
    [getResultado, setResultado, isValid],
  );

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};
