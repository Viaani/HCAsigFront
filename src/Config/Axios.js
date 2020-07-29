import axios from 'axios';

const clienteAxios =  axios.create({
    baseURL: 'https://localhost:44387/'
});

export default clienteAxios;