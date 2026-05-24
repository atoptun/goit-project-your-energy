import { getFavorites, removeFavorite } from './services/storage';
import { fetchExerciseById } from './services/api';
import { createExerciseItemMarkup } from './exercises/exercise-card';
import { showPagination, hidePagination, initPafination } from './pagination';
import { showErrorMessage } from './utils';
import { IExercise } from './types';

export function initFavoritesSection() {
  const favoritesList = document.querySelector('.js-favorites-list') as HTMLUListElement;
  const emptyState = document.querySelector('.js-favorites-empty') as HTMLElement;

  if (!favoritesList) return;

  initPafination();

  const desktopMedia = window.matchMedia('(min-width: 1440px)');
  let currentPage = 1;
  const limit = 10;

  async function render() {
    const ids = getFavorites();

    if (ids.length === 0) {
      favoritesList.innerHTML = '';
      if (emptyState) emptyState.hidden = false;
      hidePagination();
      return;
    }

    if (emptyState) emptyState.hidden = true;

    let pageIds = ids;

    if (!desktopMedia.matches) {
      const totalPages = Math.ceil(ids.length / limit);
      const start = (currentPage - 1) * limit;
      pageIds = ids.slice(start, start + limit);

      showPagination({
        totalPages,
        currentPage,
        onChangedPage: ({ page }) => {
          currentPage = page;
          void render();
          favoritesList.scrollIntoView({ behavior: 'smooth', block: 'start' });
        },
      });
    } else {
      hidePagination();
    }

    let exercises: IExercise[];

    try {
      exercises = await Promise.all(pageIds.map((id): Promise<IExercise> => fetchExerciseById(id)));
    } catch {
      showErrorMessage('Failed to load favorite exercises. Please try again later.');
      return;
    }
    favoritesList.innerHTML = exercises.map(ex => createExerciseItemMarkup(ex, true)).join('');
  }

  void render();

  desktopMedia.addEventListener('change', () => {
    currentPage = 1;
    void render();
  });

  favoritesList.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;

    const deleteBtn = target.closest('.js-remove-favorite') as HTMLButtonElement;
    if (deleteBtn) {
      const card = deleteBtn.closest('.exercise-card') as HTMLElement;
      const id = card?.dataset.exerciseId;
      if (id) {
        removeFavorite(id);
        const totalPages = Math.ceil(getFavorites().length / limit);
        if (currentPage > totalPages && currentPage > 1) currentPage--;
        void render();
      }
    }
  });
}
