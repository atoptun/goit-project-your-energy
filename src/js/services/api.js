const BASE_URL = 'https://your-energy.b.goit.study/api/v1';

export async function fetchFilters({ filter, page = 1, limit } = {}) {}

export async function fetchExercises({
  bodypart,
  muscles,
  equipment,
  keyword,
  page = 1,
  limit,
} = {}) {}

export async function fetchExerciseById(id) {}

export async function fetchDailyQuote() {}

export async function subscribeNewsletter(email) {}