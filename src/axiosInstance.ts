import axios from 'axios';
import { API } from 'contants';

const axiosInstance = axios.create({
  baseURL: API,
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;
