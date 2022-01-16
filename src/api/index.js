const axios = require('axios').default;
const baseURL = 'https://f07f-113-188-178-180.ngrok.io/api';
export const login = (username, password) => {
    return axios.post(baseURL + '/user/login', {username: username, password: password});
}

export const getDevices = () => {
    return axios.get(baseURL + '/thietbis');
}

export const editDevice = (id, thietbi) => {
    console.log(baseURL + '/thietbis/'+id, {thietbi})
    return axios.put(baseURL + '/thietbis/'+id, thietbi);
}

export const postFeedBack = (feedback) => {
    return axios.post(baseURL + '/phanhoithietbis', feedback);
}
