import axios from 'axios';

axios.defaults.baseURL = 'https://your-energy.b.goit.study/api';

interface FilterParams {
  filter?: string,
  page?: number,
  limit?: number,
}

export async function fetchFilters(params: FilterParams = {}) {
  const { data } = await axios.get('/filters', {
    params: params,
  });
  return data;
}

interface ExercisesParams {
  bodypart?: string;
  muscles?: string;
  equipment?: string;
  keyword?: string;
  page?: number;
  limit?: number;
}

export async function fetchExercises(params: ExercisesParams = {}) {
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
