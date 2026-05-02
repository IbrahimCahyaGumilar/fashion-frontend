import axios from 'axios';

const api = axios.create({
    baseURL: 'https://fashion-backend-tawny.vercel.app',
    withCredentials: true,
});

export default api;