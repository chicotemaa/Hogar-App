import {api, base, baseApi, getData, getUserInfo} from './api';

//consulta -> descripcion
//necesitasAyuda -> titulo

interface Solicitud {
  id: number;
  necesitasAyuda: string;
  consulta: string;
  cliente: Cliente;
  createdAt: string;
  estado: number;
  SucursalDeCliente: string;
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
  let arrayResponse = response.data['hydra:member'];
  
  return arrayResponse
};



export const getSolicitudesAPI = async (token: string) => {
  return getSolicitudesRequest(token)
    .then(array => {
      const elements = array.map(({id, cliente, createdAt, SucursalDeCliente, necesitasAyuda, estado}: Solicitud) => {        
        return {
          number: id,
          location: SucursalDeCliente,
          date: createdAt,
          title: necesitasAyuda,
          estado,
        };
      });
      return elements.reverse();
    })
    .catch(error => {
      console.log(error);
    });
};

export const getSolicitudById = async (id: string, token: string) => {
  const query = {
    url: '/solicituds/' + id,
  };
  const response = await api.get(baseApi + query.url, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  return response.data;
};

interface SolicitudPost {
  tipoServicio: string;
  nombreServicio: string;
  causa: string;
  descripcion: string;
  foto: string;
}

export const sendSolicitud = async ({
  tipoServicio,
  causa,
  descripcion,  
  foto,
}: SolicitudPost) => {
  const query = {
    url: '/solicituds',
  };

  const token:string = await getData('access_token');
  const userInfo = await getUserInfo(token);

  const cliente = userInfo.data.cliente['@id'];
  const {Facility, SucursalDeCliente} = userInfo.data;
  const sucursalHogar = userInfo.data.sucursal  

  const data = {
    cliente: cliente,
    servicio: tipoServicio == '' ? '/api/servicios/8' : tipoServicio,
    estado: 0,
    necesitasAyuda: causa,
    imageSize: 0,
    updatedImageAt: '2021-06-09T18:21:48.222Z',
    imagen: 'string',
    createdAt: '2021-06-09T18:21:48.222Z',
    numeroSucursal: null,
    pisoSector: '1',    
    consulta: descripcion,
    sucursal: sucursalHogar,
    Facility,
    SucursalDeCliente,
  };

  //ESTE CODIGO ES UNA MASA fetch love
  
  return fetch(baseApi + query.url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/ld+json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify(data),
  })
    .then(response => {
      return response.status == 201;
    })
    .catch(err => {
      console.log(err);
    });
};

export const getSucursalesAPI = async () => {
  const token = await getData('access_token');
  const user = await getUserInfo(token);
  const sucursalCliente = user.data.SucursalDeCliente;
  return api
    .get(base + sucursalCliente, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    .then(response => {
      return response.data.direccion;
    })
    .catch(err => {
      return err;
    });
};

export const getSucursalCliente = async (sucursal: string) => {
  const token = await getData('access_token');

  return api
    .get(base + sucursal, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return err;
    });
};
