import React, { createContext, useReducer } from "react"
import { campoReducer } from "./CampoReducer"

export interface CampoState{
    campoId?:number,
    esClonado?:boolean,
    campoValue?:string,
}

//Estado Inicial
export const campoInitialState: CampoState =  {
    campoId: undefined,
    esClonado:false,
    campoValue:undefined,
}

//Context form Props
export interface CampoContextProps {
    campoState: CampoState;
    setValue: (value:string) => void;
}

//Crear context
export const CampoContext = createContext({} as CampoContextProps)


//Provider 
export const CampoProvider = ({children}:any) => {    
    const [campoState, dispatch] = useReducer( campoReducer, campoInitialState)

    const setValue = (value:string) => {
        dispatch({type:'setValue', payload: value})
    }


    return (
        <CampoContext.Provider value={{            
            campoState,
            setValue,            
        }}>
            {children}
        </CampoContext.Provider>
    )
}