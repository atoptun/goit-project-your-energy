import { getFavorites, removeFavorite } from './services/storage';
import { createExerciseItemMarkup } from './exercises/exercise-card';
import { showPagination, hidePagination, initPafination } from './pagination';

export function initFavoritesSection() {
  const favoritesList = document.querySelector('.js-favorites-list') as HTMLUListElement;
  const emptyState = document.querySelector('.js-favorites-empty') as HTMLElement;

  if (!favoritesList) return;

  initPafination();

  const desktopMedia = window.matchMedia('(min-width: 1440px)');
  let currentPage = 1;
  const limit = 10;

  function render() {
    const favorites = getFavorites();

    if (favorites.length === 0) {
      favoritesList.innerHTML = '';
      if (emptyState) emptyState.hidden = false;
      hidePagination();
    } else {
      if (emptyState) emptyState.hidden = true;
      
      let paginatedFavorites = favorites;
      
      if (!desktopMedia.matches) {
        const totalPages = Math.ceil(favorites.length / limit);
        const start = (currentPage - 1) * limit;
        paginatedFavorites = favorites.slice(start, start + limit);
        
        showPagination({
          totalPages,
          currentPage,
          onChangedPage: ({ page }) => {
            currentPage = page;
            render();
            favoritesList.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      } else {
        hidePagination();
      }

      favoritesList.innerHTML = paginatedFavorites.map(fav => createExerciseItemMarkup(fav, true)).join('');
    }
  }

  render();

  desktopMedia.addEventListener('change', () => {
    currentPage = 1; 
    render();
  });

  favoritesList.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    
    const deleteBtn = target.closest('.js-remove-favorite') as HTMLButtonElement;
    if (deleteBtn) {
      const card = deleteBtn.closest('.exercise-card') as HTMLElement;
      const id = card?.dataset.exerciseId;
      if (id) {
        removeFavorite(id);
        const totalItemsAfterRemove = getFavorites().length;
        const totalPages = Math.ceil(totalItemsAfterRemove / limit);
        if (currentPage > totalPages && currentPage > 1) {
            currentPage--;
        }
        render();
      }
    }
  });
}
