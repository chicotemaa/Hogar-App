import React, { createContext, useReducer } from 'react';
import { formReducer } from './FormReducer';

export interface FormState {
  formularioId?: number;
  esExpress?: boolean;
  campoValue?: string;
  page: number;
}

//Estado Inicial
export const formInitialState: FormState = {
  formularioId: undefined,
  esExpress: false,
  campoValue: undefined,
  page: 0,
};

//Context form Props
export interface FormContextProps {
  formState: FormState;
  getFormId: () => void;
  setValue: (value: string) => void;
  changePage: (value: number) => void;
  getResultado: (propiedadItemId: number) => void;
}

//Crear context
export const FormContext = createContext({} as FormContextProps);

//Provider
export const FormProvider = ({ children }: any) => {
  const [formState, dispatch] = useReducer(formReducer, formInitialState);

  const getFormId = () => {
    dispatch({ type: 'getFormId' });
  };

  const setValue = (value: string) => {
    dispatch({ type: 'setValue', payload: value });
  };

  const changePage = (page: number) => {
    dispatch({ type: 'setPage', payload: page });
  };

  const getResultado = (propiedadItemId: number) => {
    dispatch({ type: 'getResultado', payload: propiedadItemId });
  };

  return (
    <FormContext.Provider
      value={{
        formState,
        getFormId,
        setValue,
        changePage,
        getResultado,
      }}>
      {children}
    </FormContext.Provider>
  );
};
