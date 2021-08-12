import { api, baseApi } from './api';

export const getOtByEstadoAPI = async (isPendientes = true) => {
  const estados = isPendientes ? [0, 1, 2] : [3, 4, 5];
  let estadosOrdenes = '';

  for (let i = 0; i < estados.length; i++) {
    estadosOrdenes +=
      'estado[]=' + estados[i] + (estados[i + 1] !== undefined ? '&' : '');
  }

  return api
    .get('/ordentrabajo/by/user/without-form?' + estadosOrdenes)
    .then(response => {
      console.log(response);
      return response.data['hydra:member'];
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

export const getOtById = async (id: number) => {
  const token = await getData('access_token');

  return api
    .get(baseApi + '/orden_trabajos/' + id, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    .then(ordenTrabajo => {
      console.log('ot obtenida: ', ordenTrabajo.data);
      return ordenTrabajo.data;
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

export const changeStateOrdenTrabajo = async (ordenTrabajo: any, data: any) => {
  let headers = {
    'Content-Type': 'application/ld+json',
    Authorization: 'Bearer ' + (await getData('access_token')),
  };

  return fetch(baseApi + '/orden_trabajos/' + ordenTrabajo.id, {
    method: 'PUT',
    headers,
    body: JSON.stringify(data),
  })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
};

export const postResultado = async () => {
  let headers = {
    'Content-Type': 'application/ld+json',
    Authorization: 'Bearer ' + (await getData('access_token')),
  };

  const data = {
    resultados: [
      {
        valor: ['asd'],
        propiedadItem: '/api/propiedad_items/2444',
        imageName: 'string',
        imageSize: 0,
        latitud: '2',
        longitud: '3',
        indiceItem: 0,
        indiceModulo: 0,
        idModulo: 0,
        isColeccionable: false,
      },
      {
        valor: [847],
        propiedadItem: '/api/propiedad_items/2459',
        imageName: 'string',
        imageSize: 0,
        latitud: '2',
        longitud: '3',
        indiceItem: 0,
        indiceModulo: 0,
        idModulo: 0,
        isColeccionable: false,
      },
      {
        valor: [847],
        propiedadItem: '/api/propiedad_items/2459',
        imageName: 'string',
        imageSize: 0,
        latitud: '2',
        longitud: '3',
        indiceItem: 0,
        indiceModulo: 0,
        idModulo: 0,
        isColeccionable: false,
      },
    ],
    latitud: '12345',
    longitud: '000000',
    ordenTrabajo: '/api/orden_trabajos/4887',
    minutosTrabajado: 16,
    minutosReales: 6,
  };

  return fetch(baseApi + '/formulario_resultados', {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  }).then(response => {
    console.log(response);
  });
};
