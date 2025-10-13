// src/pages/Auth/SignUpInvitation.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks.ts';
import { signUpInvThunk } from '@/features/auth/authSlice.ts';

export default function SignUpInvitation() {
  const { token } = useParams<{ token: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useAppSelector((state) => state.auth);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'client' | 'trainer'>('client');
  const [parentName, setParentName] = useState<string>('');
  const [invalidToken, setInvalidToken] = useState(false);

  // Декодируем приглашение
  useEffect(() => {
    if (token) {
      try {
        const decoded = JSON.parse(atob(token));
        setRole(decoded.role);
        setParentName(decoded.parentName);
      } catch {
        setInvalidToken(true);
      }
    }
  }, [token]);

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    await dispatch(signUpInvThunk({ username, email, password, role, parentName }));
  };

  if (invalidToken) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="max-w-md bg-white p-8 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Invalid invitation</h2>
          <p>The invitation link is invalid or has expired.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Full Name" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full border px-3 py-2 rounded" required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border px-3 py-2 rounded" required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border px-3 py-2 rounded" required />
          <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full border px-3 py-2 rounded" required />
          {/* Показываем роль и родителя как read‑only */}
          <input type="text" value={role} readOnly className="w-full border px-3 py-2 rounded bg-gray-100" />
          {parentName && <input type="text" value={parentName} readOnly className="w-full border px-3 py-2 rounded bg-gray-100" />}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" disabled={loading} className="w-full py-2 bg-green-600 text-white rounded">
            {loading ? 'Signing up…' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
}
