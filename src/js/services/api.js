import axios from 'axios';

axios.defaults.baseURL = 'https://your-energy.b.goit.study/api';

export async function fetchFilters({ filter, page = 1, limit } = {}) {
  const { data } = await axios.get('/filters', {
    params: { filter, page, limit },
  });
  return data;
}

export async function fetchExercises({
  bodypart,
  muscles,
  equipment,
  keyword,
  page = 1,
  limit,
} = {}) {
  const { data } = await axios.get('/exercises', {
    params: { bodypart, muscles, equipment, keyword, page, limit },
  });
  return data;
}

export async function fetchExerciseById(id) {
  const { data } = await axios.get(`/exercises/${id}`);
  return data;
}

export async function fetchDailyQuote() {
  const { data } = await axios.get('/quote');
  return data;
}

export async function subscribeNewsletter(email) {
  const { data } = await axios.post('/subscription', { email });
  return data;
}
