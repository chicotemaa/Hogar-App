import { api, base, baseApi, getData } from './api';


export const getOtByUserAPI = async () => {
    const token = await getData('access_token');
    return api
        .get(baseApi + '/ordentrabajo/by/user/without-form', {
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


