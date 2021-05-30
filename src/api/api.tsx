import axios from 'axios';

const clientId = '';
const clientSecret = '';

const base = 'https://sistemas.hogarmantenimiento.com';
// var base = 'https://127.0.0.1:8000'
// var base = 'https://192.168.0.223:8000'
const baseApi = base + '/api';
const baseToken = base + '/oauth/v2/token';
const dataToAccessApi = {
  method: 'POST',
  url: baseToken,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  transformRequest: function (obj) {
    const str = [];
    for (let p in obj) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
    return str.join('&');
  },
  data: {},
};

// const functionToHttpRequets = (
//   method,
//   query,
//   headers,
//   data,
//   onSuccessRequest,
//   onErrorRequest,
// ) => {
//   $axios({
//     method: method,
//     url: this.getUrl(query),
//     headers: headers,
//     data: data,
//   }).then(onSuccessRequest, response => {
//     response.response.status === 401
//       ? this.functionToRefreshToken(
//           method,
//           query,
//           headers,
//           data,
//           onSuccessRequest,
//           onErrorRequest,
//         )
//       : onErrorRequest(response);
//   });
// };

export const functionToGetToken = (username?: string, password?: string) => {
  const data = {
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'password',
    username: username,
    password: password,
  };

  dataToAccessApi.data = data;
};
