import { changeStateOrdenTrabajo as changeStateAPI } from '../api/apiTecnicos';

// 'Pendiente': 0
// 'Estoy en camino': 1
// 'Me recibió': 2
// 'No me atendió': 3
// 'Finalizado': 4
// 'Postergado': 5

export const changeStateEnCamino = (OrdenTrabajo:any) => {
    changeStateAPI(OrdenTrabajo,1)
}

export const changeStateMeRecibio = (OrdenTrabajo:any) => {
    //TODO: controlar ubicacion antes de cambiar estado
    changeStateAPI(OrdenTrabajo,2)
}

export const changeStateNoMeRecibio = (OrdenTrabajo:any) => {
    changeStateAPI(OrdenTrabajo,3)
    //TODO: tomar ubicacion donde marco que no me recibió
}

export const changeStateFinalizado = (OrdenTrabajo:any) => {
    changeStateAPI(OrdenTrabajo,4)
}

export const changeStatePostergado = (OrdenTrabajo:any) => {
    changeStateAPI(OrdenTrabajo,5)
}