import { api, apiFetch, baseApi, getUserInfo } from './api';

//consulta -> descripcion
//necesitasAyuda -> titulo

interface Solicitud {
  id: number;
  necesitasAyuda: string;
  consulta: string;
  cliente: Cliente;
  createdAt: string;
  estado: number;
  SucursalDeCliente: string;
}

interface Cliente {
  street: string;
}

interface SolicitudPost {
  tipoServicio: string;
  nombreServicio: string;
  causa: string;
  descripcion: string;
  foto: string;
}

export const getNombreCliente = async (id: string): Promise<string> => {
  const response = await api.get(`/clientes/${id}`);
  return response.data.razonSocial;
};

const getSolicitudesRequest = async () => {
  const response = await api.get('/solicitud/by/user');
  return response.data['hydra:member'];
};

export const getSolicitudesAPI = async () => {
  const array = await getSolicitudesRequest();
  const elements = array.map(
    ({
      id,
      createdAt,
      SucursalDeCliente,
      necesitasAyuda,
      estado,
    }: Solicitud) => {
      return {
        number: id,
        location: SucursalDeCliente,
        date: createdAt,
        title: necesitasAyuda,
        estado,
      };
    },
  );
  return elements.reverse();
};

export const getSolicitudById = async (id: string) => {
  const response = await api.get(`/solicituds/${id}`);
  return response.data;
};

export const sendSolicitud = async ({
  tipoServicio,
  causa,
  descripcion,
  foto,
}: SolicitudPost): Promise<boolean> => {
  const userInfo = await getUserInfo();

  const cliente = userInfo.data.cliente['@id'];
  const { Facility, SucursalDeCliente } = userInfo.data;
  const sucursalHogar = userInfo.data.sucursal;

  const data = {
    cliente: cliente,
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
    SucursalDeCliente,
  };

  //ESTE CODIGO ES UNA MASA fetch love

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
  const sucursalCliente = user.data.SucursalDeCliente;
  const response = await baseApi.get(sucursalCliente);
  return response.data.direccion;
};

export const getSucursalCliente = async (sucursal: string) => {
  const response = await baseApi.get(sucursal);
  return response.data;
};
