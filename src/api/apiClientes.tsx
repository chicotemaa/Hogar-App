import {api, baseApi, getData} from './api';
//consulta -> descripcion
//necesitasAyuda -> titulo

interface Solicitud {
  id: number;
  necesitasAyuda: string;
  consulta: string;
  cliente: Cliente;
  createdAt: string;
  estado: number;
}

interface Cliente {
  street: string;
}

const getSolicitudesRequest = async (token: string) => {
  const query = {
    url: '/solicitud/by/user',
  };
  const response = await api.get(baseApi + query.url, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  const arrayResponse = response.data['hydra:member'];

  return arrayResponse;
};

export const getSolicitudesAPI = async (token: string) => {
  return getSolicitudesRequest(token)
    .then(array => {
      const elements = array.map(
        ({id, cliente, createdAt, necesitasAyuda, estado}: Solicitud) => {
          return {
            number: id,
            location: cliente.street,
            date: createdAt,
            title: necesitasAyuda,
            estado,
          };
        },
      );

      return elements.reverse();
    })
    .catch(error => {
      console.log(error);
    });
};

export const getSolicitudById = async (id: string, token: string) => {
  const query = {
    url: '/solicituds/' + id,
  };
  const response = await api.get(baseApi + query.url, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  return response.data;
};

interface SolicitudPost {
  cliente: string;
  servicio: string;
  consulta: string;
  imageFile: {};
  imageSize: 0;
  updatedImageAt: string;
  imagen: string;
}

export const sendSolicitud = async solicitud => {
  const query = {
    url: '/solicituds',
  };

  const data = {
    id: '0',
    cliente: '12',
    servicio: '3',
    estado: 0,
    consulta: 'AS AS DAS',
    imageFile: {},
    imageSize: 0,
    updatedImageAt: '2021-06-09T18:21:48.222Z',
    imagen: 'string',
    createdAt: '2021-06-09T18:21:48.222Z',
    numeroSucursal: null,
    necesitasAyuda: 'das as',
  };

  const token = await getData('access_token');
  const response = await api.post(baseApi + query.url, {
    Headers: {
      'Content-Type': 'application/ld+json',
      Authorization: 'Bearer ' + token,
    },
    Data: data,
  });
  console.log(response);
};
