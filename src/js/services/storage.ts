import { IExercise } from '../types';

const FAVORITES_KEY = 'favorites';

export function getFavorites(): IExercise[] {
  const data = localStorage.getItem(FAVORITES_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function addFavorite(exercise: IExercise) {
  const favorites = getFavorites();
  const id = exercise._id;
  if (!favorites.some((fav: IExercise) => fav._id === id)) {
    favorites.push(exercise);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}

export function removeFavorite(id: string) {
  let favorites = getFavorites();
  favorites = favorites.filter((fav: IExercise) => fav._id !== id);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function isFavorite(id: string) {
  const favorites = getFavorites();
  return favorites.some((fav: IExercise) => fav._id === id);
}
