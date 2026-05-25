import { getFavorites, removeFavorite } from './services/storage';
import { fetchExerciseById } from './services/api';
import { createExerciseItemMarkup } from './exercises/exercise-card';
import { showErrorMessage } from './utils';
import { IExercise } from './types';
import { SELECTORS } from './constants';
import { openExerciseModal } from './exercises/exercise-modal';
import { startLoading, stopLoading } from './loaders';

export function initFavoritesSection() {
  const favoritesList = document.querySelector(
    '.js-favorites-list'
  ) as HTMLUListElement;
  const emptyState = document.querySelector(
    '.js-favorites-empty'
  ) as HTMLElement;

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
    startLoading(favoritesList, true);
    try {
      exercises = await Promise.all(
        ids.map((id): Promise<IExercise> => fetchExerciseById(id))
      );
    } catch {
      showErrorMessage(
        'Failed to load favorite exercises. Please try again later.'
      );
      return;
    } finally {
      stopLoading(favoritesList, true);
    }
    favoritesList.innerHTML = exercises
      .map(ex => createExerciseItemMarkup(ex, true))
      .join('');
  }

  void render();

  favoritesList.addEventListener('click', event => {
    const target = event.target as HTMLElement;
    const card = target.closest<HTMLElement>(SELECTORS.exerciseItem);
    const exerciseId = card?.dataset.exerciseId || '';
    if (!exerciseId) return;

    const deleteBtn = target.closest(
      SELECTORS.removeFavoriteBtn
    ) as HTMLButtonElement;
    if (deleteBtn) {
      // const card = deleteBtn.closest('.exercise-card') as HTMLElement;
      // const id = card?.dataset.exerciseId;
      // if (id) {
      //   removeFavorite(id);
      //   void render();
      // }
      removeFavorite(exerciseId);
      void render();
      return;
    }

    const cardBtn = target.closest<HTMLElement>(SELECTORS.showExerciseCardBtn);
    if (cardBtn) {
      openExerciseModal(exerciseId, () => {
        void render();
      });
      return;
    }
  });
}
