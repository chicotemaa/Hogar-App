import {api, baseApi} from './api';

export const getSolicitudes = (token?: string) => {
  //consulta -> descripcion
  //necesitasAyuda -> titulo
  return [
    {
      title: 'Cañeria rota',
      date: '2 Junio 2021',
      location: 'Calle 123',
      estado: 'En Revisión',
      number: '5',
    },
    {
      title: 'Cañeria rota',
      date: '2 Junio 2021',
      location: 'Calle 123',
      estado: 'Pendiente',
      number: '5',
    },
    {
      title: 'Cañeria ',
      date: '2 Junio 2021',
      location: 'Calle 123',
      estado: 'Pendiente',
      number: '5',
    },
  ];
};

interface Solicitud {
  id: number;
  necesitasAyuda: string;
  consulta: string;
  cliente: Cliente;
  createdAt: string;
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
        ({id, cliente, createdAt, necesitasAyuda}: Solicitud) => {
          return {
            number: id,
            location: cliente.street,
            date: createdAt,
            title: necesitasAyuda,
            estado: 'Pendiente',
          };
        },
      );

      return elements.reverse();
    })
    .catch(error => {
      console.log(error);
    });
};
