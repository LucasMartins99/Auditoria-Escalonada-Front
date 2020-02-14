import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.136.3.14:3033',
});
export default api;
