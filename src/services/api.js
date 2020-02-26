import axios from 'axios';

const api = axios.create({
    baseURL: 'http://devfabiolima-com.umbler.net/',
});
export default api;
