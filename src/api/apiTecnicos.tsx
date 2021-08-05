import { api, base, baseApi, getData } from './api';


export const getOtByEstadoAPI = async (isPendientes = true) => {
    const token = await getData('access_token');
    const estados = isPendientes ? [0, 1, 2] : [3, 4, 5];
    let estadosOrdenes = '';

    for (let i = 0; i < estados.length; i++) {
        estadosOrdenes += 'estado[]=' + estados[i] + (estados[i + 1] !== undefined ? '&' : '')
    }

    return api
        .get(baseApi + '/ordentrabajo/by/user/without-form?' + estadosOrdenes, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        })
        .then(response => {
            return response.data['hydra:member'];
        })
        .catch(err => {
            console.log(err)
            return err;
        });
};

export const getOtById = async (id: number) => {
    const token = await getData('access_token')

    return api.get(baseApi + '/orden_trabajos/' + id, {
        headers: {
            Authorization: 'Bearer ' + token
        },
    }).then((ordenTrabajo) => {
        console.log('ot obtenida: ', ordenTrabajo.data)
        return ordenTrabajo.data
    }).catch(err => {
        console.log(err)
        return err;
    });
}

export const changeStateOrdenTrabajo = async (ordenTrabajo: any, data: any) => {
    let headers = {
        'Content-Type': 'application/ld+json',
        'Authorization': 'Bearer ' + await getData('access_token')
    }

    return fetch(baseApi + '/orden_trabajos/' + ordenTrabajo.id, {
        method: 'PUT',
        headers,
        body: JSON.stringify(data),
    }).then((response) => {
        console.log(response)
    }).catch(error => {
        console.log(error)
    })
}

