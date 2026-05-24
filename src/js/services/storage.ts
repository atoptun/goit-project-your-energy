const FAVORITES_KEY = 'favorites';
const USER_DATA_KEY = 'user_data';

export function getFavorites(): string[] {
  const data = localStorage.getItem(FAVORITES_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function addFavorite(id: string) {
  const favorites = getFavorites();
  if (!favorites.includes(id)) {
    favorites.push(id);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}

export function removeFavorite(id: string) {
  const favorites = getFavorites().filter(fav => fav !== id);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function isFavorite(id: string) {
  return getFavorites().includes(id);
}

interface IUserData {
  email: string;
  message: string;
}

export function saveRatingData(userData: IUserData) {
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
}

export function getRatingData(): IUserData | null {
  const data = localStorage.getItem(USER_DATA_KEY);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}
