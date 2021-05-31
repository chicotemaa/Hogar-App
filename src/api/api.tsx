import axios from 'axios';

const clientId = '1_4ta05vfoy58ggoggwo08kck000kocckwgcckk8wgkck440cgcw';
const clientSecret = '176y7wqisfvkcwk8oswowksks0cocsoc00ko4k4oosc0ocwck4';

// const base = 'https://sistemas.hogarmantenimiento.com';
//const base = 'http://127.0.0.1:8000';
const base = 'http://10.0.2.2:8000';

const baseApi = base + '/api';
const baseToken = base + '/oauth/v2/token';

export const functionToGetToken = async (
  username?: string,
  password?: string,
) => {
  return axios({
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
  })
  
};

export const getProfile = async (token?: string) => {
  const query = {
    url: '/formulario_resultados',

  };
  const response = await axios({
    method: 'GET',
    url: baseApi + query.url ,
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  });
  return response;
};
