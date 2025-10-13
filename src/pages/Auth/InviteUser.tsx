// src/pages/Auth/InviteUser.tsx
import {useState} from 'react';
import {useAppSelector} from '@/app/hooks';

export default function InviteUser() {
  const {role, user} = useAppSelector((state) => state.auth);
  const [inviteLink, setInviteLink] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const baseUrl = window.location.origin;

  const generateLink = () => {
    if (!user || !role) return;
    let payload: { role: 'client' | 'trainer'; parentName: string };
    if (role === 'trainer') {
      // Тренер приглашает только клиентов
      payload = {role: 'client', parentName: user.username};
    } else if (role === 'organization') {
      // Организация приглашает только тренеров
      payload = {role: 'trainer', parentName: user.username || user.name};
    } else {
      return; // клиенты не могут приглашать
    }
    const token = btoa(JSON.stringify(payload));
    setInviteLink(`${baseUrl}/signup-invitation/${token}`);
  };

  const copyLink = () => {
    if (inviteLink) navigator.clipboard.writeText(inviteLink);
  };

  if (role !== 'trainer' && role !== 'organization') {
    return <p className="p-4">You do not have permission to send invitations.</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">{role === 'trainer' ? 'Invite a Client' : 'Invite a Trainer'}</h2>
        {role === 'trainer' && (
          <div className="mb-4 w-full">
            <label htmlFor="invite-email" className="block text-sm font-medium text-gray-700 mb-1">Client email
              (optional)</label>
            <input id="invite-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                   placeholder="client@example.com" className="w-full border px-3 py-2 rounded"/>
          </div>
        )}
        <button onClick={generateLink} className="w-full py-2 bg-green-600 text-white rounded">Generate Link</button>
        {inviteLink && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Invitation Link</label>
            <div className="flex items-center">
              <input type="text" readOnly value={inviteLink} className="flex-1 border px-3 py-2 rounded mr-2 text-xs"/>
              <button onClick={copyLink} className="py-2 px-3 bg-blue-500 text-white rounded">Copy</button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Share this link with
              the {role === 'trainer' ? 'client' : 'trainer'} to let them sign up.</p>
          </div>
        )}
      </div>
    </div>
  );
}
