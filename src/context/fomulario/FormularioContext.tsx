import React, { createContext } from "react"

export interface FormState{
    formularioId?:number,
    esExpress?:boolean,
}

//Estado Inicial
export const formInitialState: FormState =  {
    formularioId: undefined,
    esExpress:false,
}

//Context form Props
export interface FormContextProps {
    formState:FormState,
}

//Crear context
export const FormContext = createContext({} as FormContextProps)

//Provider 
export const FormProvider = ({children}:any) => {
    return (
        <FormContext.Provider value={{
            formState: formInitialState,
        }}>
            {children}
        </FormContext.Provider>
    )
}