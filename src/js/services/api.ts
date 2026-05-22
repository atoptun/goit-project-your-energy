import axios from 'axios';
import { ICategory, IExercise } from '../types';

axios.defaults.baseURL = 'https://your-energy.b.goit.study/api';

interface FilterParams {
  filter?: string;
  page?: number;
  limit?: number;
}

interface Response<T> {
  page: number;
  perPage: number;
  totalPages: number;
  results: T;
}

export async function fetchFilters(
  params: FilterParams = {}
): Promise<Response<ICategory[]>> {
  const { data } = await axios.get('/filters', {
    params: params,
  });
  return data;
}

export interface ExercisesParams {
  bodypart?: string;
  muscles?: string;
  equipment?: string;
  keyword?: string;
  page?: number;
  limit?: number;
}

export async function fetchExercises(
  params: ExercisesParams = {}
): Promise<Response<IExercise[]>> {
  const { data } = await axios.get('/exercises', {
    params: params,
  });
  return data;
}

export async function fetchExerciseById(id: string) {
  const { data } = await axios.get(`/exercises/${id}`);
  return data;
}

export async function fetchDailyQuote() {
  const { data } = await axios.get('/quote');
  return data;
}

export async function subscribeNewsletter(email: string) {
  const { data } = await axios.post('/subscription', { email });
  return data;
}
