// src/shared/authApi.ts
import axios, {type AxiosError, type AxiosInstance, type InternalAxiosRequestConfig,} from 'axios';

/** --- Настройки окружения и ключи --- */

// Пытаемся найти baseURL и для Vite, и для CRA.
// Порядок: VITE_API_URL -> VITE_API_BASE_URL -> REACT_APP_API_URL -> '' (или ваш дефолт).
const API_BASE_URL: string =
  (typeof import.meta !== 'undefined' &&
    (import.meta as any)?.env?.VITE_API_URL) ||
  (typeof import.meta !== 'undefined' &&
    (import.meta as any)?.env?.VITE_API_BASE_URL) ||
  (typeof process !== 'undefined' &&
    (process.env as Record<string, string | undefined>)?.REACT_APP_API_URL) ||
  'http://localhost:8000';

const AUTH_TOKEN_KEY = 'authToken';
// Поддержим «легаси»-ключ из варианта (1).
const LEGACY_TOKEN_KEY = 'token';

/** --- Типы для Djoser token auth --- */

export interface LoginRequest {
  email: string;
  password: string;
}
export interface LoginResponse {
  // Djoser по умолчанию возвращает поле auth_token
  auth_token: string;
}
export type AuthToken = string | null;

/** --- Безопасный доступ к localStorage (SSR-safe) --- */

function safeGetLocalStorage(): Storage | null {
  try {
    if (typeof window !== 'undefined' && window.localStorage) return window.localStorage;
  } catch {
    // например, приватный режим Safari
  }
  return null;
}

function getToken(): AuthToken {
  const ls = safeGetLocalStorage();
  if (!ls) return null;
  // Сначала новый ключ, потом легаси
  return ls.getItem(AUTH_TOKEN_KEY) ?? ls.getItem(LEGACY_TOKEN_KEY);
}

function setToken(token: string): void {
  const ls = safeGetLocalStorage();
  if (!ls) return;
  try {
    ls.setItem(AUTH_TOKEN_KEY, token);
    // Можно почистить легаси-ключ, чтобы не путаться
    if (ls.getItem(LEGACY_TOKEN_KEY)) ls.removeItem(LEGACY_TOKEN_KEY);
  } catch {
    // ignore
  }
}

function clearToken(): void {
  const ls = safeGetLocalStorage();
  if (!ls) return;
  try {
    ls.removeItem(AUTH_TOKEN_KEY);
    ls.removeItem(LEGACY_TOKEN_KEY);
  } catch {
    // ignore
  }
}

/** --- Создание axios-инстанса --- */

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  // Включаем куки для CORS — чтобы работали Django-сессии и CSRF
  withCredentials: true,
  // Дополнительно подружим с Django CSRF (если используете samesite/lax куку csrftoken)
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
});

/** --- Request interceptor: проставляем Authorization: Token <token> --- */

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token) {
      // В Axios v1 заголовки — AxiosHeaders. Используем set, а не прямое присваивание объекта.
      config.headers.set?.('Authorization', `Token ${token}`);
      // При необходимости можно указать тип содержимого для JSON
      // config.headers.set?.('Content-Type', 'application/json');
      // config.headers.set?.('Accept', 'application/json');
    }
    return config;
  },
  (error) => Promise.reject(error),
);

/** --- Response interceptor (необязательная обработка 401) --- */

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Токен протух/невалиден — чистим локально
      clearToken();
      // здесь можно инициировать перенаправление на /login, если это уместно в вашем приложении
      // e.g., window.location.assign('/login');
    }
    return Promise.reject(error);
  },
);

/** --- Готовые функции авторизации --- */

export async function login(email: string, password: string): Promise<string> {
  const payload: LoginRequest = { email, password };
  // Путь к эндпоинту подставьте свой (ниже — типичный для Djoser)
  const { data } = await api.post<LoginResponse>('/api/v1/token/login/', payload);
  const { auth_token } = data;
  setToken(auth_token);
  return auth_token;
}

export async function logout(callServer = false): Promise<void> {
  // Опционально дергаем сервер (если у вас включён djoser token/logout)
  if (callServer) {
    try {
      await api.post('/api/v1/token/logout/');
    } catch {
      // игнорируем сетевые ошибки при логауте
    }
  }
  clearToken();
}

/** --- Вспомогательные утилиты для UI --- */

export function getAuthToken(): AuthToken {
  return getToken();
}

export function setAuthToken(token: string): void {
  setToken(token);
}

export function isAuthenticated(): boolean {
  return Boolean(getToken());
}

export default api;
