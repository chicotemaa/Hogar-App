import { api } from './api';

export const getOtByUserAPI = async () => {
  const response = await api.get('/ordentrabajo/by/user/without-form');
  return response.data['hydra:member'];
};
