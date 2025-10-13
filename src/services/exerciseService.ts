import api from '@/app/api';
import { Exercise, Section, Workout, Program } from '@/models/types';

export async function fetchExercises(): Promise<Exercise[]> {
  const res = await api.get<Exercise[]>('/api/exercises/');
  return res.data;
}

export async function createExercise(data: Exercise): Promise<Exercise> {
  const res = await api.post<Exercise>('/api/exercises/', data);
  return res.data;
}

// services/sectionService.ts
export async function fetchSections(): Promise<Section[]> {
  const res = await api.get<Section[]>('/api/sections/');
  return res.data;
}

export async function createSection(data: Section): Promise<Section> {
  return (await api.post<Section>('/api/sections/', data)).data;
}

// services/workoutService.ts
export async function fetchWorkouts(): Promise<Workout[]> {
  return (await api.get<Workout[]>('/api/workouts/')).data;
}

export async function createWorkout(data: Workout): Promise<Workout> {
  return (await api.post<Workout>('/api/workouts/', data)).data;
}

// services/programService.ts
export async function fetchPrograms(): Promise<Program[]> {
  return (await api.get<Program[]>('/api/programs/')).data;
}

export async function createProgram(data: Program): Promise<Program> {
  return (await api.post<Program>('/api/programs/', data)).data;
}
