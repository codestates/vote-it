import axios from 'axios';

const baseURL = 'https://localhost:8000';

const apiAxios = axios.create({
  baseURL,
  timeout: 5000,
});

export default apiAxios;
