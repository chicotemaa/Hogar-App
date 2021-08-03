import { changeStateOrdenTrabajo as changeStateAPI } from '../api/apiTecnicos';
import Geolocation from 'react-native-geolocation-service'
import { Platform } from 'react-native';
import { check, PERMISSIONS, PermissionStatus, request } from 'react-native-permissions';

// 'Pendiente': 0
// 'Estoy en camino': 1
// 'Me recibió': 2
// 'No me atendió': 3
// 'Finalizado': 4
// 'Postergado': 5

export const changeStateEnCamino = (OrdenTrabajo: any) => {
    changeStateAPI(OrdenTrabajo, 1)
}

export const changeStateMeRecibio = async (OrdenTrabajo: any) => {
    //TODO: controlar ubicacion antes de cambiar estado
    if (await checkLocationPermission()) {

        Geolocation.getCurrentPosition(
            (position) => {
                console.log('ubicacion', position)
            },
            (error) => {
                console.log(error.code, error.message)
            },
            {
                enableHighAccuracy: true, timeout: 14000, maximumAge: 100
            }
        )
    }

    //changeStateAPI(OrdenTrabajo,2)
}

export const changeStateNoMeRecibio = (OrdenTrabajo: any) => {
    changeStateAPI(OrdenTrabajo, 3)
    //TODO: tomar ubicacion donde marco que no me recibió
}

export const changeStateFinalizado = (OrdenTrabajo: any) => {
    changeStateAPI(OrdenTrabajo, 4)
}

export const changeStatePostergado = (OrdenTrabajo: any) => {
    changeStateAPI(OrdenTrabajo, 5)
}

const checkLocationPermission = async () => {
    let permissionStatus: PermissionStatus
    if (Platform.OS === 'ios') {

        permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
    } else {

        permissionStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
    }

    return permissionStatus === 'granted'
}