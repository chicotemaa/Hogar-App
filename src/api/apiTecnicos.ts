import { api } from './api';
import {
  FormularioResultado,
  OrdenTrabajo,
  FormularioResultadoExpress,
} from './types';

export const getOtByEstadoAPI = async (isPendientes: boolean) => {
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
export const getFormularioResultadoById = async (id: string) => {
  return base.get(id).then(formularioResultado => {
    console.log('Formulario Resultado', formularioResultado.data);
    return formularioResultado.data;
  });
};

export const getFormulariosExpressList = async () => {
  return await api.get<FormularioResultadoExpress>('/formularios/by/express');
};

export const sendFormularioExpressResultado = async data => {
  return await api.post<FormularioResultadoExpress>(
    '/formulario_resultado_expresses',
    data,
  );
};

export const modifyFormularioExpressResultado = async data => {
  return await api.put<FormularioResultadoExpress>(
    '/formulario_resultado_expresses',
    data,
  );
}

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
