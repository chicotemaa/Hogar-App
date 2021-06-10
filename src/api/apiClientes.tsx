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
      console.log(array);
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

  console.log(response);
  //return response.data;
};

interface SolicitudPost {
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

  //TODO: get Cliente
  //TODO: get Servicio

  console.log(solicitud);
  const data = {
    cliente: '/api/clientes/14',
    servicio: '/api/servicios/3',
    estado: 0,
    consulta: 'fetch tkm',
    imageSize: 0,
    updatedImageAt: '2021-06-09T18:21:48.222Z',
    imagen: 'string',
    createdAt: '2021-06-09T18:21:48.222Z',
    numeroSucursal: null,
    necesitasAyuda: 'necesito ayuda ya urgente',
  };

  const token = await getData('access_token');
  console.log(token);
  //ESTE CODIGO ES UNA MASA fetch love
  // const response = await fetch(baseApi + query.url, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/ld+json',
  //     Authorization: 'Bearer ' + token,
  //   },
  //   body: JSON.stringify(data),
  // });

  // console.log(await response.json());
};
