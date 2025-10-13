// InviteUser.js
import {useState} from 'react';
import api from '@/api/auth.ts';

export default function InviteUser() {
  const [role, setRole] = useState('trainer');
  const [trainerId, setTrainerId] = useState<number>();
  const [inviteLink, setInviteLink] = useState('');

  async function handleInvite() {
    const payload = {invitee_role: role, trainer_id: trainerId
    };
    if (role === 'client') payload.trainer_id = trainerId;
    const res = await api.post('/accounts/invitations/', payload);
    const token = res.data.token;
    setInviteLink(`${window.location.origin}/signup?invite=${token}`);
  }

  return (
    <div>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="trainer">Trainer</option>
        <option value="client">Client</option>
      </select>
      {role === 'client' && (
        <input placeholder="Trainer ID" value={trainerId || ''} onChange={(e) => setTrainerId(parseInt(e.target.value))}/>
      )}
      <button onClick={handleInvite}>Generate Invitation</button>
      {inviteLink && <p>Share this link with the new user: {inviteLink}</p>}
    </div>
  );
}
