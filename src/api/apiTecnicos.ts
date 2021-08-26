import { api } from './api';
import { FormularioResultado, OrdenTrabajo } from './types';

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
      return response.data['hydra:member'];
    })
    .catch(err => {
      return err;
    });
};

export const getOtById = async (id: number) => {
  return api
    .get('/orden_trabajos/' + id)
    .then(ordenTrabajo => {
      console.log('ot obtenida: ', ordenTrabajo.data);
      return ordenTrabajo.data;
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

export const changeStateOrdenTrabajo = async (
  ordenTrabajo: OrdenTrabajo,
  data: any,
) => {
  const response = await api.put(`/orden_trabajos/${ordenTrabajo.id}`, data);

  console.log(response);
};

export const postResultado = async (resultado: FormularioResultado) => {
  const response = await api.post<FormularioResultado>(
    '/formulario_resultados',
    resultado,
  );
  return response;
};
