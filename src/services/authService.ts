// src/services/authService.ts
import api from '@/app/api';

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  username: string;
  email: string;
  password: string;
  role: 'client' | 'trainer' | 'organization';
  parentName?: string | null;
}

export interface UserProfile {
  id: number;
  username: string;
  name: string;
  email: string;
  role: string;
  // дополнительные поля, если нужны
}

// Вход: возвращает полученный токен
export async function signIn(req: SignInRequest): Promise<{ token: string; user: UserProfile }> {
  const { data } = await api.post('/api/v1/token/login/', req);
  const token = data.auth_token || data.token || data.key;
  localStorage.setItem('authToken', token);
  // получаем профиль пользователя
  const userRes = await api.get<UserProfile>('/api/v1/users/me/');
  return { token, user: userRes.data };
}

// Регистрация обычная
export async function signUp(req: SignUpRequest): Promise<{ token: string; user: UserProfile }> {
  // Создаём пользователя
  await api.post('/api/v1/users/', {
    username: req.username,
    email: req.email,
    password: req.password,
  });
  // Автоматически входим и получаем токен
  const { token, user } = await signIn({ email: req.email, password: req.password });
  // Сохраняем роль и имя родителя локально, чтобы ограничивать приглашения
  localStorage.setItem('role', req.role);
  if (req.parentName) localStorage.setItem('parentName', req.parentName);
  else localStorage.removeItem('parentName');
  return { token, user };
}

// Регистрация по приглашению
export async function signUpWithInvitation(req: SignUpRequest): Promise<{ token: string; user: UserProfile }> {
  return signUp(req); // логика совпадает
}

export async function logout() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('role');
  localStorage.removeItem('parentName');
  // Можно вызвать серверный logout: await api.post('/api/v1/token/logout/');
}
