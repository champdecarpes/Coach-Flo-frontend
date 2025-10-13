// src/pages/Auth/SignIn.tsx
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks.ts';
import { signInThunk } from '@/features/auth/authSlice.ts';
import { useNavigate, Link } from 'react-router-dom';

export default function SignIn() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useAppSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    await dispatch(signInThunk({ email, password }));
  };

  if (isAuthenticated) {
    // перенаправляем на защищённую страницу
    navigate('/');
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-6">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border px-3 py-2 rounded" required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border px-3 py-2 rounded" required />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" disabled={loading} className="w-full py-2 bg-blue-600 text-white rounded">
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
        <p className="text-sm mt-4">Don't have an account? <Link to="/signup" className="text-blue-500">Sign up</Link></p>
      </div>
    </div>
  );
}
