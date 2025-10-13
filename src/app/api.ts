import axios, {
  type AxiosInstance,
  AxiosHeaders,
} from 'axios';

// Ключ хранения токена в localStorage
const AUTH_TOKEN_KEY = 'token'; // При необходимости поменяйте на свой ключ, напр. 'authToken'

// Схема авторизации: 'Token' (Djoser) или 'Bearer' (JWT)
const AUTH_SCHEME =
  (typeof import.meta !== 'undefined' &&
    (import.meta as any).env?.VITE_AUTH_SCHEME) ||
  process.env.NEXT_PUBLIC_AUTH_SCHEME ||
  process.env.REACT_APP_AUTH_SCHEME ||
  'Token';

/** Базовый URL API: поддержка Vite / Next / CRA */
const API_BASE_URL =
  (typeof import.meta !== 'undefined' &&
    (import.meta as any).env?.VITE_API_BASE_URL) ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.REACT_APP_API_BASE_URL ||
  'http://localhost:8000';

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Аккуратно добавляем Authorization, не ломая типы Axios v1:
 * - If headers — экземпляр AxiosHeaders, используем .set()
 * - Else (сырые заголовки) — присваиваем свойство в объект
 */
api.interceptors.request.use((config) => {
  // В SSR локального хранилища нет
  const token = typeof window !== 'undefined' ? localStorage.getItem(AUTH_TOKEN_KEY) : null;

  if (token) {
    const value = `${AUTH_SCHEME} ${token}`;

    if (!config.headers) {
      // Создаём «правильный» контейнер заголовков
      config.headers = new AxiosHeaders();
    }

    config.headers.set('Authorization', value);
  }

  return config;
});

export default api;
