import axios from 'axios';
import { ICategory, IExercise, IQuote } from '../types';

axios.defaults.baseURL = 'https://your-energy.b.goit.study/api';

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

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

export async function fetchFilters(
  params: FilterParams = {}
): Promise<PaginatedResponse<ICategory[]>> {
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

export async function fetchExerciseById(id: string): Promise<IExercise> {
  const { data } = await axios.get(`/exercises/${id}`);
  return data;
}

export async function fetchDailyQuote(): Promise<IQuote> {
  const { data } = await axios.get<IQuote>('/quote');
  return data;
}

export async function subscribeNewsletter(
  email: string
): Promise<SubscriptionResponse> {
  const { data } = await axios.post<SubscriptionResponse>('/subscription', {
    email,
  });
  return data;
}

export interface IRatingPayload {
  rate: number;
  email: string;
  review: string;
}

export async function sendRating(
  exerciseId: string,
  params: IRatingPayload
): Promise<IExercise> {
  try {
    const { data } = await axios.patch<IExercise>(
      `/exercises/${exerciseId}/rating`,
      { ...params }
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      let errMmessage = 'An error occurred while submitting the rating.';
      switch (status) {
        case 400:
          errMmessage = 'Bad request (invalid request body)';
          break;
        case 404:
          errMmessage = 'Such exercise not found';
          break;
        case 409:
          errMmessage = 'Such email already exists';
          break;
      }

      throw new ApiError(status, errMmessage);
    } else {
      throw new Error('An unexpected error occurred.', { cause: error });
    }
  }
}
