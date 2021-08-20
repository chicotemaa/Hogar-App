import axios, { AxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
global.Buffer = global.Buffer || require('buffer').Buffer;
const clientId = '1_4ta05vfoy58ggoggwo08kck000kocckwgcckk8wgkck440cgcw';
const clientSecret = '176y7wqisfvkcwk8oswowksks0cocsoc00ko4k4oosc0ocwck4';

//const baseUrl = 'https://sistemas.hogarmantenimiento.com';
//const baseUrl = 'http://10.0.2.2:8000';
const baseUrl = 'http://hogardev.tk';

export const getData = (key: string) => AsyncStorage.getItem(key);

export const setData = (key: string, value: string) =>
  AsyncStorage.setItem(key, value);

const getAccessToken = () => AsyncStorage.getItem('access_token');

const createApi = (config: AxiosRequestConfig) => {
  const instance = axios.create(config);

  instance.interceptors.request.use(async requestConfig => {
    const token = await getAccessToken();
    requestConfig.headers.Authorization = `Bearer ${token}`;
    return requestConfig;
  });

  return instance;
};

export const baseApi = createApi({ baseURL: baseUrl });

export const api = createApi({ baseURL: `${baseUrl}/api` });

export const apiFetch: typeof fetch = async (input, init) => {
  const token = await getAccessToken();
  return fetch(`${api.defaults.baseURL}${input}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      ...init?.headers,
    },
  });
};

export const login = async (username?: string, password?: string) => {
  const response = await baseApi.post(
    '/oauth/v2/token',
    {
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'password',
      username,
      password,
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      transformRequest: function (obj) {
        var str = [];
        for (var p in obj) {
          str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
        }
        return str.join('&');
      },
    },
  );
  const { access_token, expires_in, refresh_token } = response.data;
  await Promise.all([
    AsyncStorage.setItem('access_token', access_token),
    AsyncStorage.setItem('timeExpire', expires_in.toString()),
    AsyncStorage.setItem('refresh_token', refresh_token),
  ]);
};

export const logout = async () => {
  await AsyncStorage.removeItem('access_token');
};

export const getUserInfo = () => api.get('/user/info');

export const getImage = async (imagen: string | null) => {
  const response = await baseApi.get(`/uploads/imagenes/solicitud/${imagen}`, {
    responseType: 'arraybuffer',
  });
  // token siempre debería ser un string acá
  const token = (await getAccessToken())!;
  return {
    imagen: Buffer.from(response.data, 'binary').toString('base64'),
    token,
  };
};

export const getServicioAPI = async (id: string) => {
  return baseApi
    .get(id)
    .then(servicio => {
      return servicio.data.titulo;
    })
    .catch(error => {
      console.log(error);
      console.log('no existe servicio');
      return '';
    });
};

export const getAllServiciosAPI = async () => {
  return api
    .get('/servicios')
    .then(response => {
      console.log('from api servicios ', response.data);
      return response.data['hydra:member'];
    })
    .catch(error => {
      console.log(error);
      console.log('no existen servicios');
      return [];
    });
};

export const getFormularioAPI = async (id: number) => {
  const response = await api.get(`/formularios/${id}`);
  return response.data;
};
