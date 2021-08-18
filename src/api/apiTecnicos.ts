import { api, baseApi } from './api';
import { FormularioResultado, Resultado } from './types';

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

export const changeStateOrdenTrabajo = async (ordenTrabajo: any, data: any) => {
  const response = await api.put(`/orden_trabajos/${ordenTrabajo.id}`, data);

  console.log(response);
};

export const postResultado = async (
  idOt: number,
  minutosTrabajados: number,
  resultado: any,
) => {
  const newResult = resultado.resultados.map(resultado => {
    return {
      ...resultado,
      valor: [resultado.valor],
      propiedadItem: `/api/propiedad_items/${resultado.idPropiedadItem}`,
    };
  });
  const data = {
    resultados: newResult,
    ordenTrabajo: `/api/orden_trabajos/${idOt}`,
    latitud: '1',
    longitud: '1',
    minutosTrabajado: minutosTrabajados,
    minutosReales: minutosTrabajados,
  };

  const response = await api.post('/formulario_resultados', data);
  console.log('respuesta de resultado', response);
};
