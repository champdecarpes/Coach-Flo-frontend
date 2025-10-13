// components/Exercises/CreateExerciseForm.tsx
import React, { useState } from 'react';
import { useAppDispatch } from '@/app/hooks';
import { createExerciseThunk } from '@/features/exercises/exerciseSlice';
import { Exercise, TrackingField } from '@/models/types';

const initialExercise: Exercise = {
  name: '',
  modality: '',
  muscle_group: '',
  movement_pattern: '',
  instructions: '',
  note: '',
  each_side: false,
  // Важно: используйте ОДНО имя поля. Если на бэке ожидается tracking_fields — держим его
  tracking_fields: [],       // <-- раньше было monitored_fields: []
  visibility: 'private',
};

const CreateExerciseForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [exercise, setExercise] = useState<Exercise>(initialExercise);
  const [trackingFields, setTrackingFields] = useState<TrackingField[]>([]);

  // Текст/селекты/textarea: value
  const handleValueChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  > = (e) => {
    const { name, value } = e.currentTarget; // у currentTarget точно есть name/value
    setExercise((prev) => ({ ...prev, [name]: value }));
  };

  // Чекбоксы: checked
  const handleCheckboxChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, checked } = e.currentTarget; // currentTarget — строго HTMLInputElement
    setExercise((prev) => ({ ...prev, [name]: checked }));
  };

  const addTrackingField = () => {
    // Заполните объект по своей модели TrackingField;
    // временно — пустой объект с принудительным кастом:
    setTrackingFields((prev) => [...prev, {} as TrackingField]);
  };

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();

    // Если тип Exercise не содержит tracking_fields, а бэк ждёт DTO,
    // выведите отдельный тип Create DTO. Здесь предположим, что поле есть.
    const data: Exercise = {
      ...exercise,
      tracking_fields: trackingFields,
    };

    dispatch(createExerciseThunk(data));
    // Reset form при необходимости
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <input
        name="name"
        placeholder="Name your exercise"
        className="input"
        value={exercise.name}
        onChange={handleValueChange}
        required
      />

      <select name="modality" value={exercise.modality} onChange={handleValueChange} className="select">
        <option value="">Modality:</option>
        <option value="activation">Activation</option>
        {/* другие опции */}
      </select>

      <select name="muscle_group" value={exercise.muscle_group} onChange={handleValueChange} className="select">
        <option value="">Select muscle group</option>
        <option value="biceps">Biceps</option>
        {/* ... */}
      </select>

      <textarea
        name="instructions"
        value={exercise.instructions}
        onChange={handleValueChange}
        placeholder="Add exercise instructions"
        className="textarea"
      />

      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="each_side"
          checked={exercise.each_side}
          onChange={handleCheckboxChange}
        />
        <span>Each side</span>
      </label>

      {/* блок для загрузки видео/фото */}

      <button type="button" onClick={addTrackingField} className="btn">Add Tracking Field</button>

      {/* динамические поля trackingFields */}

      <button type="submit" className="btn-primary">Save</button>
    </form>
  );
};

export default CreateExerciseForm;
