import axios from 'axios';

const clienteAxios =  axios.create({
    // baseURL:'http://dquilodrntamayo-001-site1.ctempurl.com/'
    baseURL:'https://localhost:44387/'
});

export default clienteAxios;