import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'https://localhost:3000';

const apiAxios = axios.create({
  baseURL,
  timeout: 5000,
});

export default apiAxios;
