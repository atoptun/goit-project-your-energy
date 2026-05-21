import { initFilters } from './filters';
import { renderCategories, initCategoryList } from './category-list';
import { SELECTORS } from '../constants';

export function initExercisesSection() {
  initFilters({
    onFilterChange: (filter?: string) => renderCategories(filter),
  });

  initCategoryList({
    onSelect: (category: string) => {
      const searchInput = document.querySelector<HTMLInputElement>(SELECTORS.searchFormClass);

      searchInput?.classList.remove('hidden');
      const categoryList = document.querySelector<HTMLUListElement>(SELECTORS.categoryList);

      if (categoryList) {
        categoryList.innerHTML = '';
      }
      // Handle category selection
    },
  });

  renderCategories('Muscles');
}