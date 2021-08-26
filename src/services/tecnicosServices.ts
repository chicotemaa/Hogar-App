/* eslint-disable no-shadow */
import {
  changeStateOrdenTrabajo as changeStateOTAPI,
  getFormularioResultadoById,
  getOtByEstadoAPI,
  getOtById,
} from '../api/apiTecnicos';
import Geolocation from 'react-native-geolocation-service';
import { Platform } from 'react-native';
import {
  PERMISSIONS,
  PermissionStatus,
  request,
} from 'react-native-permissions';
import { getSucursalCliente } from '../api/apiClientes';
import { OrdenTrabajo, FormularioResultado } from '../api/types';
import { getStorageResultados } from '~/storage';
import { postResultado } from '~/api/apiTecnicos';

// 'Pendiente': 0
// 'Estoy en camino': 1
// 'Me recibió': 2
// 'No me atendió': 3
// 'Finalizado': 4
// 'Postergado': 5
const getISODate = () => {
  const date = new Date();
  return new Date(
    date.getTime() - date.getTimezoneOffset() * 60000,
  ).toISOString();
};

const getCurrentPosition = (
  options?: Geolocation.GeoOptions,
): Promise<Geolocation.GeoPosition> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(resolve, reject, options);
  });
};

export const getSucursalStreet = async (sucursalId: string) => {
  const sucursal = await getSucursalCliente(sucursalId);
  return sucursal.direccion;
};

export const getOrdenesTrabajoInfo = async (): Promise<OrdenTrabajo[]> => {
  const ordenesTrabajo: OrdenTrabajo[] = await getOtByEstadoAPI();
  return await Promise.all(
    ordenesTrabajo.map(async (ordenTrabajo: OrdenTrabajo) => {
      return {
        ...ordenTrabajo,
        direccionSucursalCliente: await getSucursalStreet(
          ordenTrabajo.SucursalDeCliente,
        ),
      };
    }),
  );
};
export const getOrdenesTrabajoRealizadasInfo = async (): Promise<
  OrdenTrabajo[]
> => {
  const ordenesTrabajoRealizadas: OrdenTrabajo[] = await getOtByEstadoAPI(
    false,
  );
  return await Promise.all(
    ordenesTrabajoRealizadas.map(async (ordenTrabajo: OrdenTrabajo) => {
      return {
        ...ordenTrabajo,
        direccionSucursalCliente: await getSucursalStreet(
          ordenTrabajo.SucursalDeCliente,
        ),
      };
    }),
  );
};

export const changeStateEnCamino = (ordenTrabajo: OrdenTrabajo) => {
  const data = {
    estado: 1,
  };
  changeStateOTAPI(ordenTrabajo, data);
};

export const changeStateMeRecibio = async (ordenTrabajo: OrdenTrabajo) => {
  //TODO: controlar ubicacion antes de cambiar estado
  if (await checkLocationPermission()) {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;

        const data = {
          estado: 2,
          latitud: latitude.toString(),
          longitud: longitude.toString(),
          horaInicio: getISODate(),
        };
        changeStateOTAPI(ordenTrabajo, data);
      },
      error => {
        console.log(error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 14000,
        maximumAge: 100,
      },
    );
    return true;
  } else {
    console.log('Permiso de ubicación denegado');
    return false;
  }
};

export const changeStateNoMeRecibio = (ordenTrabajo: OrdenTrabajo) => {
  changeStateOTAPI(ordenTrabajo, { estado: 3 });
  //TODO: tomar ubicacion donde marco que no me recibió
};

export const changeStateFinalizado = async (ordenTrabajo: OrdenTrabajo) => {
  if (await checkLocationPermission()) {
    const position = await getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 14000,
      maximumAge: 100,
    });
    const { latitude, longitude } = position.coords;
    const { horaInicio } = await getOtById(ordenTrabajo.id);
    const diffMinutes = getDiffMinutes(horaInicio);
    const resultados = await getStorageResultados(ordenTrabajo.id);

    await postResultado({
      resultados,
      ordenTrabajo: `/api/orden_trabajos/${ordenTrabajo.id}`,
      latitud: '1',
      longitud: '1',
      minutosTrabajado: diffMinutes,
      minutosReales: diffMinutes,
    });

    const data = {
      estado: 4,
      latitudCierre: latitude.toString(),
      longitudCierre: longitude.toString(),
      horaFin: getISODate(),
    };

    //crear formulario resultado con los minutos trabajados
    changeStateOTAPI(ordenTrabajo, data);

    return true;
  } else {
    return false;
  }
};

export const changeStatePostergado = (ordenTrabajo: OrdenTrabajo) => {
  changeStateOTAPI(ordenTrabajo, { estado: 5 });
};

const checkLocationPermission = async () => {
  let permissionStatus: PermissionStatus;
  if (Platform.OS === 'ios') {
    permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
  } else {
    permissionStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
  }
  return permissionStatus === 'granted';
};

const getDiffMinutes = (startTime: string) => {
  const start = new Date(startTime);
  const currentTime = new Date();

  const diffMins = currentTime.getTime() - start.getTime();

  return Math.floor(diffMins / 60000);
};

export const FormularioRealizado = async (OT: number) => {
  const OrdenTrabajo: OrdenTrabajo = await getOtById(OT);

  const TipoFormulario = OrdenTrabajo.formulario;
  const FormularioResultado = await getFormularioResultadoById(
    OrdenTrabajo.formularioResultado,
  );
  return TipoFormulario;
};
