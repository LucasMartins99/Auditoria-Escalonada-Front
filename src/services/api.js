import axios from 'axios';

const api = axios.create({
    baseURL: 'http://devfabiolima.com',
});
export default api;
