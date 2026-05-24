const FAVORITES_KEY = 'favorites';

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
