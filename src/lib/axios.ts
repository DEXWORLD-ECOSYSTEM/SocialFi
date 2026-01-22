import type { AxiosRequestConfig } from 'axios';

import axios from 'axios';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  // CORREÇÃO: Apontando diretamente para a API de produção
  baseURL: 'https://api.asppibra.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ----------------------------------------------------------------------
// Interceptador para adicionar o Token JWT em todas as requisições
// ----------------------------------------------------------------------
axiosInstance.interceptors.request.use(
  (config) => {
    // Verifica se está rodando no navegador antes de acessar localStorage
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ----------------------------------------------------------------------
// Interceptador de Resposta (Tratamento de Erros)
// ----------------------------------------------------------------------
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error?.response?.data?.message || error?.message || 'Something went wrong!';
    console.error('Axios error:', message);
    return Promise.reject(new Error(message));
  }
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async <T = unknown>(
  args: string | [string, AxiosRequestConfig]
): Promise<T> => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args, {}];

    const res = await axiosInstance.get<T>(url, config);

    return res.data;
  } catch (error) {
    console.error('Fetcher failed:', error);
    throw error;
  }
};

// ----------------------------------------------------------------------

export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  auth: {
    me: '/api/auth/me',
    // CORREÇÃO: Ajustado para as rotas reais da sua API
    signIn: '/api/auth/login',
    signUp: '/api/auth/register',
  },
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },
  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },
  product: {
    list: '/api/product/list',
    details: '/api/product/details',
    search: '/api/product/search',
  },
} as const;