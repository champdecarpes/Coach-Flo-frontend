// src/pages/Auth/SignUp.tsx
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks.ts';
import { signUpThunk } from '@/features/auth/authSlice.ts';
import { useNavigate, Link } from 'react-router-dom';

export default function SignUp() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useAppSelector((state) => state.auth);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'client' | 'trainer' | 'organization'>('client');
  const [parentName, setParentName] = useState<string>('');

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    await dispatch(signUpThunk({ username, email, password, role, parentName: parentName || null }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Full Name" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full border px-3 py-2 rounded" required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border px-3 py-2 rounded" required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border px-3 py-2 rounded" required />
          <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full border px-3 py-2 rounded" required />
          <select value={role} onChange={(e) => { const r = e.target.value as 'client' | 'trainer' | 'organization'; setRole(r); setParentName(''); }} className="w-full border px-3 py-2 rounded">
            <option value="client">Client</option>
            <option value="trainer">Trainer</option>
            <option value="organization">Organization</option>
          </select>
          {role !== 'organization' && (
            <input type="text" placeholder={role === 'trainer' ? 'Organization Name' : 'Trainer Name'} value={parentName} onChange={(e) => setParentName(e.target.value)} className="w-full border px-3 py-2 rounded" required />
          )}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" disabled={loading} className="w-full py-2 bg-green-600 text-white rounded">
            {loading ? 'Signing up…' : 'Sign Up'}
          </button>
        </form>
        <p className="text-sm mt-4">Already have an account? <Link to="/login" className="text-blue-500">Sign in</Link></p>
      </div>
    </div>
  );
}
