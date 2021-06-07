import {api, baseApi} from './api';
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
