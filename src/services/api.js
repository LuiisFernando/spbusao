import axios from 'axios';

const api = axios.create({
  baseURL: 'http://api.olhovivo.sptrans.com.br/v2.1',
});

export default api;
