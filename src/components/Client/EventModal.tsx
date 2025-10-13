import { useState, useEffect } from 'react';
import { useAppSelector } from '@/app/hooks';

interface EventModalProps {
  date: Date;
  onClose: () => void;
  onSave: (type: 'exercise' | 'workout' | 'program', referenceId: number, start: string, end: string) => Promise<void>;
}

export default function EventModal({ date, onClose, onSave } : EventModalProps)  {
  const [type, setType] = useState<'exercise' | 'workout' | 'program'>('exercise');
  const [referenceId, setReferenceId] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<string>('09:00');
  const [duration, setDuration] = useState<number>(60); // длительность в минутах

  // Получаем списки объектов из состояния (эти списки нужно загрузить заранее в другом слайсе)
  const { exercises, workouts, programs } = useAppSelector((state) => state.data); // предполагаем наличие dataSlice

  useEffect(() => {
    // Сбрасываем выбранный объект при смене типа
    setReferenceId(null);
  }, [type]);

  const handleSubmit = async () => {
    if (!referenceId) return;
    const start = new Date(date);
    const [h, m] = startTime.split(':').map(Number);
    start.setHours(h, m);
    const end = new Date(start.getTime() + duration * 60 * 1000);
    await onSave(type, referenceId, start.toISOString(), end.toISOString());
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Add Event on {date.toDateString()}</h3>
        <div className="space-y-3">
          <div>
            <label className="block font-medium">Type</label>
            <select value={type} onChange={(e) => setType(e.target.value as any)} className="border rounded w-full p-2">
              <option value="exercise">Exercise</option>
              <option value="workout">Workout</option>
              <option value="program">Program</option>
            </select>
          </div>
          <div>
            <label className="block font-medium">{type.charAt(0).toUpperCase() + type.slice(1)}</label>
            <select value={referenceId ?? ''} onChange={(e) => setReferenceId(Number(e.target.value))} className="border rounded w-full p-2">
              <option value="">Select</option>
              {type === 'exercise' && exercises.map((ex) => (
                <option key={ex.id} value={ex.id}>{ex.name}</option>
              ))}
              {type === 'workout' && workouts.map((wo) => (
                <option key={wo.id} value={wo.id}>{wo.name}</option>
              ))}
              {type === 'program' && programs.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
          <div className="flex space-x-3">
            <div className="flex-1">
              <label className="block font-medium">Start Time</label>
              <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="border rounded w-full p-2" />
            </div>
            <div className="flex-1">
              <label className="block font-medium">Duration (min)</label>
              <input type="number" min={15} step={15} value={duration} onChange={(e) => setDuration(Number(e.target.value))} className="border rounded w-full p-2" />
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-2">
          <button onClick={onClose} className="bg-gray-200 px-4 py-2 rounded">Cancel</button>
          <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
        </div>
      </div>
    </div>
  );
};

