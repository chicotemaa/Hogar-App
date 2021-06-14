import {api, baseApi, getData, getUserInfo} from './api';
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
  tipoServicio: string;
  nombreServicio: string;
  causa: string;
  descripcion: string;
  foto: string;
}

export const sendSolicitud = async ({
  tipoServicio,
  causa,
  descripcion,
  nombreServicio,
  foto,
}: SolicitudPost) => {
  const query = {
    url: '/solicituds',
  };

  /* {
  "cliente": "string",
  "servicio": "string",
  "consulta": "string",
  "imageFile": {},
  "imageSize": 0,
  "updatedImageAt": "2021-06-14T19:30:00.722Z",
  "imagen": "string",
  "pisoSector": "string",
  "sucursal": "string",
  "SucursalDeCliente": {}
} */

  const token = await getData('access_token');
  const cliente = (await getUserInfo(token)).data.cliente['@id'];

  const data = {
    cliente: cliente,
    servicio: tipoServicio,
    estado: 0,
    necesitasAyuda: causa,
    imageSize: 0,
    updatedImageAt: '2021-06-09T18:21:48.222Z',
    imagen: 'string',
    createdAt: '2021-06-09T18:21:48.222Z',
    numeroSucursal: null,
    pisoSector: '1',
    consulta: descripcion,
  };

  console.log(token);
  //ESTE CODIGO ES UNA MASA fetch love
  const response = await fetch(baseApi + query.url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/ld+json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify(data),
  });

  console.log(await response);
};
