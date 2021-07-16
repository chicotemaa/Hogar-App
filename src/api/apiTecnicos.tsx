import { api, baseApi, getData } from './api';


export const geOtByUserAPI = async () => {
    const token = await getData('access_token');
    console.log(token)
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


export const getFormOTAPI = async (id: number) => {
    console.log('la id es', id)
}