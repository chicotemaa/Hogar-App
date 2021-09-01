import { api, apiFetch, baseApi, getUserInfo } from './api';
import {
  Hydra,
  Solicitudes,
  SolicitudesPostBody,
  SucursalDeCliente,
  SucursalDeClienteApiPath,
} from './types';

//consulta -> descripcion
//necesitasAyuda -> titulo

interface SolicitudPost {
  tipoServicio: string;
  nombreServicio: string;
  causa: string;
  descripcion: string;
}

export const getNombreCliente = async (
  id: string | number,
): Promise<string> => {
  const response = await api.get(`/clientes/${id}`);
  return response.data.razonSocial;
};

export const getSolicitudesAPI = async () => {
  const response = await api.get<Hydra<Solicitudes>>('/solicitud/by/user');
  return response.data['hydra:member'];
};

export const getSolicitudById = async (id: string) => {
  const response = await api.get<Solicitudes>(`/solicituds/${id}`);
  return response.data;
};

export const sendSolicitud = async ({
  tipoServicio,
  causa,
  descripcion,
}: SolicitudPost): Promise<boolean> => {
  const userInfo = await getUserInfo();

  const cliente = userInfo.data.cliente?.['@id'];
  const { Facility, SucursalDeCliente: sucursalDeClienteApiPath } =
    userInfo.data;
  const sucursalHogar = userInfo.data.sucursal;

  const data: SolicitudesPostBody = {
    cliente,
    servicio: tipoServicio === '' ? '/api/servicios/8' : tipoServicio,
    estado: 0,
    necesitasAyuda: causa,
    imageSize: 0,
    updatedImageAt: '2021-06-09T18:21:48.222Z',
    imagen: 'string',
    createdAt: '2021-06-09T18:21:48.222Z',
    numeroSucursal: null,
    pisoSector: '1',
    consulta: descripcion,
    sucursal: sucursalHogar,
    Facility,
    SucursalDeCliente: sucursalDeClienteApiPath,
  };

  return apiFetch('/solicituds', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/ld+json',
    },
    body: JSON.stringify(data),
  })
    .then(response => {
      return response.status === 201;
    })
    .catch(err => {
      console.log(err);
      return false;
    });
};

export const getSucursalesAPI = async () => {
  const user = await getUserInfo();
  // TODO corroborar que pasa si SucursalDeCliente es null
  const sucursalCliente = user.data.SucursalDeCliente!;
  const response = await baseApi.get<SucursalDeCliente>(sucursalCliente);
  return response.data.direccion;
};

export const getSucursalCliente = async (
  sucursal: SucursalDeClienteApiPath,
) => {
  const response = await baseApi.get<SucursalDeCliente>(sucursal);
  return response.data;
};
