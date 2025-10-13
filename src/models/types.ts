// models/exercise.ts
export interface TrackingField {
  id?: number;
  strength?: number;
  bodyweight?: number;
  time?: string;    // "HH:MM:SS"
  distance?: number;
  reps?: number;
  weight?: number;
  // ... другие поля
}

export interface Exercise {
  id?: number;
  name: string;
  modality: string;
  muscle_group: string;
  movement_pattern: string;
  instructions: string;
  links?: string;
  note?: string;
  each_side: boolean;
  monitored_fields?: string[];
  tracking_fields?: TrackingField[];
  ownership?: number;    // trainer ID
  visibility: 'public' | 'private';
}

// models/section.ts
export interface Section {
  id?: number;
  name: string;
  section_type: 'regular' | 'interval' | 'amrap' | 'timed' | 'freestyle';
  exercises: number[];      // массив id упражнений
  start_time?: string;      // HH:MM:SS
  rounds?: number;
  duration?: string;        // HH:MM:SS
  rest?: string;            // HH:MM:SS
  note?: string;
}

// models/workout.ts
export interface Workout {
  id?: number;
  name: string;
  description?: string;
  created_at: string;
  sections: number[];  // id секций
  exercises: number[]; // id упражнений, добавленных напрямую
  ownership?: number;
  visibility: 'public' | 'private';
}

// models/program.ts
export interface Program {
  id?: number;
  name: string;
  description?: string;
  created_at: string;
  start_date: string;
  end_date: string;
  workouts: number[];
  sections?: number[];
  exercises?: number[];
  ownership?: number;
  visibility: 'public' | 'private';
}

export interface ClientProfile {
  id: number;
  user: {
    id: number;
    username: string;
    email: string;
    role: 'client';
  };
  trainer: number | null;        // id тренера
  organization: number | null;   // id организации
  exercises: number[];
  workouts: number[];
  programs: number[];
}

// Универсальное событие календаря
export type EventType = 'exercise' | 'workout' | 'program';

export interface CalendarEvent {
  id: string | number;
  title: string;
  start: string;         // ISO дата‑время
  end: string;           // ISO дата‑время
  type: EventType;
  referenceId: number;   // id связанной сущности
  clientId: number;
  trainerId?: number;
  createdBy: number;     // кто создал
  editable: boolean;     // можно ли редактировать
}
