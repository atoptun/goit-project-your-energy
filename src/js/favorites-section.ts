import { getFavorites, removeFavorite } from './services/storage';
import { fetchExerciseById } from './services/api';
import { createExerciseItemMarkup } from './exercises/exercise-card';
import { showErrorMessage } from './utils';
import { IExercise } from './types';

export function initFavoritesSection() {
  const favoritesList = document.querySelector('.js-favorites-list') as HTMLUListElement;
  const emptyState = document.querySelector('.js-favorites-empty') as HTMLElement;

  if (!favoritesList) return;

  async function render() {
    const ids = getFavorites();

    if (ids.length === 0) {
      favoritesList.innerHTML = '';
      if (emptyState) emptyState.hidden = false;
      return;
    }

    if (emptyState) emptyState.hidden = true;

    let exercises: IExercise[];
    try {
      exercises = await Promise.all(ids.map((id): Promise<IExercise> => fetchExerciseById(id)));
    } catch {
      showErrorMessage('Failed to load favorite exercises. Please try again later.');
      return;
    }
    favoritesList.innerHTML = exercises.map(ex => createExerciseItemMarkup(ex, true)).join('');
  }

  void render();

  favoritesList.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const deleteBtn = target.closest('.js-remove-favorite') as HTMLButtonElement;
    if (deleteBtn) {
      const card = deleteBtn.closest('.exercise-card') as HTMLElement;
      const id = card?.dataset.exerciseId;
      if (id) {
        removeFavorite(id);
        void render();
      }
    }
  });
}
