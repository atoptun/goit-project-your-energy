import axios from 'axios';
import { ICategory, IExercise, IQuote } from '../types';

axios.defaults.baseURL = 'https://your-energy.b.goit.study/api';

interface FilterParams {
  filter?: string;
  page?: number;
  limit?: number;
}

interface PaginatedResponse<T> {
  page: number;
  perPage: number;
  totalPages: number;
  results: T;
}

export async function fetchFilters(params: FilterParams = {}): Promise<PaginatedResponse<ICategory[]>> {
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

interface SubscriptionResponse {
  message: string;
}

export async function fetchExercises(
  params: ExercisesParams = {}
): Promise<PaginatedResponse<IExercise[]>> {
  const { data } = await axios.get('/exercises', {
    params: params,
  });
  return data;
}

export async function fetchExerciseById(id: string) {
  const { data } = await axios.get(`/exercises/${id}`);
  return data;
}

export async function fetchDailyQuote(): Promise<IQuote> {
  const { data } = await axios.get<IQuote>('/quote');
  return data;
}

export async function subscribeNewsletter(email: string): Promise<SubscriptionResponse> {
  const { data } = await axios.post<SubscriptionResponse>('/subscription', { email });
  return data;
}
