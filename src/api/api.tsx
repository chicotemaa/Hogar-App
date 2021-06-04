import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const clientId = '1_4ta05vfoy58ggoggwo08kck000kocckwgcckk8wgkck440cgcw';
const clientSecret = '176y7wqisfvkcwk8oswowksks0cocsoc00ko4k4oosc0ocwck4';

//const base = 'https://sistemas.hogarmantenimiento.com';
const base = 'http://10.0.2.2:8000';

export const baseApi = base + '/api';
const baseToken = base + '/oauth/v2/token';

export const api = axios.create({
  baseURL: base,
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
});

export const functionToGetToken = async (
  username?: string,
  password?: string,
) => {
  return api({
    url: baseToken,
    method: 'POST',
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
    data: {
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'password',
      username,
      password,
    },
  });
};

export const getUserInfo = async (token?: string) => {
  const query = {
    url: '/user/info',
  };

  console.log(token);
  const response = await api.get(baseApi + query.url, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  console.log(response);
};

//To save local
export const storeData = async (name: string, value: string) => {
  try {
    await AsyncStorage.setItem(name, value);
  } catch (e) {
    // saving error
  }
};

export const getData = async (name: string) => {
  try {
    const value = await AsyncStorage.getItem(name);
    if (value) {
      return value;
    }
  } catch (e) {
    return e;
  }
};
