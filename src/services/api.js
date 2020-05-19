import axios from 'axios';

const api = axios.create({
    baseURL: 'https//devfabiolima.com:3000',
});
export default api;
