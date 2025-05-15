// Libs:
import axios from 'axios';
import Cookies from 'js-cookie';

// CONSTANTES:
import { API_CONSTANTS } from './apiConstants';
import { APP_CONSTANTS } from '../../config/appConstants';

// Utils:
import CookiesUtils from '../../utils/cookiesUtils';


// Instância base do Axios para reutilização global
const api = axios.create({
  baseURL: API_CONSTANTS.BASE_URL, // https://botireciclatest.rbiz.cc
  // timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});


// Interceptor para injetar tokens em requisições
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get(APP_CONSTANTS.COOKIE_AUTH_TOKEN_NAME);
    if(token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // console.log(config);
    return config;
  }, 
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

// Interceptor de resposta para lidar com erros globais
api.interceptors.response.use(
  (response) => response, 
  (error) => {
    if(error.response?.status === 401) {
      console.warn('REMOVE TODOS OS COOKIES');
      CookiesUtils.RemoveAll();
    }
    // console.error(error);
    return Promise.reject(error);
  }
);

export default api;